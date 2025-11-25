import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User, Save, LogOut, ArrowRight, Skull } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const Profile: React.FC<Props> = ({ onBack }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setProfile(data);
        setNickname(data.nickname || '');
      }
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          nickname: nickname,
          avatar_url: user.user_metadata.avatar_url,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      alert('名号已刻录至生死簿！');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert('更新失败，可能是判官笔没墨了。');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onBack(); // Go back to home after logout
  };

  if (loading) return <div className="fixed inset-0 z-[5000] bg-[#050505] flex items-center justify-center text-white">读取档案中...</div>;

  return (
    <div className="fixed inset-0 z-[5000] overflow-y-auto bg-[#050505] text-white p-4 md:p-8">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
             backgroundSize: '40px 40px'
           }}>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
            <button 
                onClick={onBack}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-emperor-gold transition-colors flex items-center gap-2 px-4"
            >
                <ArrowRight className="rotate-180" size={18} />
                <span className="text-sm font-bold">返回阳间</span>
            </button>
            <h1 className="text-2xl font-serif font-bold text-emperor-gold flex items-center gap-3">
                <Skull />
                入殓师档案
            </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emperor-gold/5 rounded-full blur-[100px] -mr-20 -mt-20"></div>

            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emperor-gold to-yellow-700 p-1 mb-4">
                    <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                        {user?.user_metadata?.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-4xl font-bold text-emperor-gold">
                                {user?.email?.[0].toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
                <div className="text-gray-500 text-sm font-mono">{user?.email}</div>
            </div>

            <div className="space-y-6 max-w-md mx-auto">
                <div>
                    <label className="block text-xs font-bold text-emperor-gold uppercase tracking-widest mb-2">
                        冥府尊号 (Nickname)
                    </label>
                    <input 
                        type="text" 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emperor-gold focus:ring-1 focus:ring-emperor-gold transition-all placeholder-gray-600"
                        placeholder="给自己起个响亮的名号..."
                    />
                    <p className="text-xs text-gray-600 mt-2">
                        此名号将显示在封神榜上。如果不改，你就是无名氏。
                    </p>
                </div>

                <div className="pt-6 flex gap-4">
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 bg-emperor-gold text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {saving ? '刻录中...' : (
                            <>
                                <Save size={18} /> 保存档案
                            </>
                        )}
                    </button>
                    
                    <button 
                        onClick={handleLogout}
                        className="px-6 py-3 border border-red-900/50 text-red-500 font-bold rounded-lg hover:bg-red-900/20 transition-colors flex items-center gap-2"
                    >
                        <LogOut size={18} /> 退出登录
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

