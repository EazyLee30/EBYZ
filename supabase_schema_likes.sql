-- 1. 创建点赞关联表 (联合主键确保每人每文章只能点赞一次)
create table public.post_likes (
  user_id uuid references auth.users not null,
  post_id uuid references public.posts not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, post_id)
);

-- 2. 启用行级安全 (RLS)
alter table public.post_likes enable row level security;

-- 3. 设置安全策略
-- 允许用户查看所有点赞 (用于前端显示状态)
create policy "Everyone can view likes" on public.post_likes
  for select using (true);

-- 允许用户给自己点赞
create policy "Users can like posts" on public.post_likes
  for insert with check (auth.uid() = user_id);

-- 允许用户取消自己的点赞
create policy "Users can unlike posts" on public.post_likes
  for delete using (auth.uid() = user_id);

-- 4. 创建自动更新计数器的函数
create or replace function public.handle_new_like()
returns trigger as $$
begin
  update public.posts
  set likes_count = coalesce(likes_count, 0) + 1
  where id = new.post_id;
  return new;
end;
$$ language plpgsql security definer;

create or replace function public.handle_unlike()
returns trigger as $$
begin
  update public.posts
  set likes_count = greatest(coalesce(likes_count, 0) - 1, 0)
  where id = old.post_id;
  return old;
end;
$$ language plpgsql security definer;

-- 5. 绑定触发器 (Trigger)
create trigger on_like_added
  after insert on public.post_likes
  for each row execute procedure public.handle_new_like();

create trigger on_like_removed
  after delete on public.post_likes
  for each row execute procedure public.handle_unlike();
