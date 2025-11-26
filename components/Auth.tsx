import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { Github, Mail, Wallet, ArrowRight, Skull } from 'lucide-react';

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<'social' | 'email'>('social');

  useEffect(() => {
    // 获取当前会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 监听认证状态变化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: window.location.href, // Redirect back to the current page
        }
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: window.location.href, // Redirect back to the current page
        }
      });
      if (error) throw error;
      alert('登录链接已发送到您的邮箱！请查收邮件。');
      setMode('social'); // Reset to main view
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWalletLogin = () => {
    alert("冥界通道（Wallet Connect）正在维护中，请暂用肉身（Web2）账号登录。");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
  };

  if (user) {
    return (
      <div className="p-4 border rounded-lg bg-gray-900/50 backdrop-blur border-emperor-gold/30">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-emperor-gold truncate max-w-[200px]">
            已登入生死簿: {user.email || '冥界使者'}
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-xs text-red-400 hover:text-red-300 border border-red-500/30 rounded transition-colors"
          >
            注销
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm p-8 space-y-8 border rounded-xl bg-[#0a0a0a] border-white/10 shadow-2xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-emperor-gold/10 rounded-full blur-[50px] pointer-events-none"></div>
      
      <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-full bg-white/5 text-emperor-gold mb-2 border border-emperor-gold/20">
            <Skull size={24} />
          </div>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emperor-gold to-yellow-200 tracking-wide">
            登入冥府终端
      </h2>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
            Access The Eternal Database
          </p>
      </div>
      
      {mode === 'social' ? (
        <div className="space-y-3 animate-fade-in">
        {/* Google Login */}
        <button
                onClick={() => handleOAuthLogin('google')}
          disabled={loading}
                className="relative group flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-bold text-white transition-all bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-emperor-gold/30 hover:text-emperor-gold disabled:opacity-50"
        >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
            </svg>
                <span>Google 账号</span>
            </button>

            {/* GitHub Login */}
            <button
                onClick={() => handleOAuthLogin('github')}
                disabled={loading}
                className="relative group flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-bold text-white transition-all bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-emperor-gold/30 hover:text-emperor-gold disabled:opacity-50"
            >
                <Github className="w-5 h-5" />
                <span>GitHub 账号</span>
            </button>

            {/* Email Login (Prominent) */}
            <button
                onClick={() => setMode('email')}
                disabled={loading}
                className="relative group flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-bold text-black transition-all bg-jade-green rounded-lg hover:bg-emerald-400 disabled:opacity-50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
                <Mail className="w-5 h-5" />
                <span>使用邮箱登录 (Magic Link)</span>
        </button>

            <div className="relative flex items-center py-3">
                <div className="flex-grow border-t border-gray-800"></div>
                <span className="flex-shrink-0 mx-4 text-[10px] text-gray-600 font-mono uppercase">OR</span>
                <div className="flex-grow border-t border-gray-800"></div>
            </div>

            {/* Wallet Login (Secondary) */}
            <button
                onClick={handleWalletLogin}
                disabled={loading}
                className="relative group flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-bold text-gray-500 transition-all bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-500/30 hover:text-purple-400 disabled:opacity-50"
            >
                <Wallet className="w-5 h-5" />
                <span>连接法器 (Wallet)</span>
            </button>
        </div>
      ) : (
        <form onSubmit={handleMagicLinkLogin} className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Email Protocol</label>
            <input
              className="w-full px-4 py-3 text-sm text-white bg-[#151515] border border-gray-800 rounded-lg focus:outline-none focus:border-emperor-gold focus:ring-1 focus:ring-emperor-gold placeholder-gray-600 transition-all font-mono"
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>
          <button
            className="w-full px-4 py-3 text-sm font-bold text-black transition-all bg-emperor-gold rounded-lg hover:bg-yellow-600 disabled:opacity-50 shadow-[0_0_15px_rgba(180,83,9,0.2)] flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? '通讯建立中...' : '发送召集令'}
            {!loading && <ArrowRight size={16} />}
          </button>
          
          <button
            type="button"
            onClick={() => setMode('social')}
            className="w-full text-xs text-gray-500 hover:text-gray-300 mt-2"
          >
            返回
          </button>
        </form>
      )}
    </div>
  );
}
