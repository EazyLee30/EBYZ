
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 加载环境变量 (本地开发用)
dotenv.config();

export default async function handler(req, res) {
  // 1. 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, grade, content, user_id, parent_id } = req.body;

    if (!title || !content || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 2. 初始化 Supabase (使用服务端密钥，或者转发用户的 Token)
    // 为了安全，我们这里验证一下用户的 session，或者简单点直接信任前端传来的 user_id ( MVP阶段)
    // *更好的做法*：从 req.headers.authorization 拿到 token，用 supabase.auth.getUser(token) 验证身份
    
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY 
    );

    // 3. 获取 IP 属地 (Vercel Header)
    // x-vercel-ip-city 是城市，x-vercel-ip-country 是国家代码
    const city = req.headers['x-vercel-ip-city'];
    const country = req.headers['x-vercel-ip-country'];
    
    let location = 'Unknown';
    if (city && country) {
      location = `${city}, ${country}`;
    } else if (country) {
      location = country;
    }

    // 本地开发时可能拿不到 Vercel Header，给个默认值方便调试
    if (process.env.NODE_ENV === 'development' && location === 'Unknown') {
        location = 'Local Dev';
    }

    // 4. 插入数据
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          grade,
          content, // JSONB
          user_id, // UUID
          parent_id: parent_id || null, // 如果是二创，这里会有值
          location
        }
      ])
      .select();

    if (error) {
      console.error('Supabase Insert Error:', error);
      throw error;
    }

    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Publish Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

