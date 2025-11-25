
import { createClient } from '@supabase/supabase-js';

// 兼容 VITE_ 和 NEXT_PUBLIC_ 前缀
// Vercel 的 Supabase 集成通常会自动注入 NEXT_PUBLIC_ 开头的变量
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase 环境变量未设置。请确保：\n1. 在 .env 文件中配置了 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY\n2. 或者在 Vercel 中完成了 Supabase 集成');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
