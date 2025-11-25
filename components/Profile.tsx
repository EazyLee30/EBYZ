import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User, Save, LogOut, ArrowRight, Skull, Clock, FileText, Eye, Trash2, Upload, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Copy } from 'lucide-react';

interface Props {
  onBack: () => void;
  onRemix?: (content: string) => void;
}

const Profile: React.FC<Props> = ({ onBack, onRemix }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);

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

      fetchUserPosts(user.id);
    }
    setLoading(false);
  };

  const fetchUserPosts = async (userId: string) => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (data) {
          setUserPosts(data);
      }
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

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
        alert("教案内容已复制到剪贴板！");
    });
  };

  const handleDeletePost = async (postId: string) => {
      if (!confirm('确认要将此教案从冥府档案中永久抹除吗？')) return;
      
      try {
          const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId)
            .eq('user_id', user.id); // Ensure we only delete our own post

          if (error) throw error;
          
          // Remove from local state immediately
          setUserPosts(prev => prev.filter(p => p.id !== postId));
          setSelectedPost(null);
          alert('已销毁。');
      } catch (error: any) {
          console.error('Delete error:', error);
          alert('销毁失败：请检查您的网络或权限。' + (error.message || ''));
      }
  };

  const handlePublishDraft = async (post: any) => {
      if (!confirm('确认发布到封神榜（排行榜）？')) return;

      try {
          const { error } = await supabase
            .from('posts')
            .update({ 
                content: { ...post.content, published: true },
                created_at: new Date().toISOString() // Refresh timestamp to show as new
            })
            .eq('id', post.id);
            
          if (error) throw error;

          // Update local state
          setUserPosts(prev => prev.map(p => 
              p.id === post.id 
              ? { ...p, content: { ...p.content, published: true }, created_at: new Date().toISOString() } 
              : p
          ));
          setSelectedPost(prev => prev ? { ...prev, content: { ...prev.content, published: true } } : null);
          
          alert('发布成功！');
      } catch (error: any) {
          console.error(error);
          alert('发布失败：' + error.message);
      }
  };

  const handleRemixPost = (post: any) => {
      const markdown = post.content?.markdown || '';
      if (onRemix) {
          // @ts-ignore
          onRemix({
              content: markdown,
              title: post.title, // Editing own post, keep title (or user can change)
              grade: post.grade
          });
      }
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

      <div className="max-w-4xl mx-auto relative z-10 pt-12">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Profile Card */}
            <div className="md:col-span-1">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden sticky top-24">
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

                    <div className="space-y-6">
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
                        </div>

                        <div className="pt-4 flex flex-col gap-3">
                            <button 
                                onClick={handleSave}
                                disabled={saving}
                                className="w-full bg-emperor-gold text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {saving ? '刻录中...' : (
                                    <>
                                        <Save size={18} /> 保存档案
                                    </>
                                )}
                            </button>
                            
                            <button 
                                onClick={handleLogout}
                                className="w-full px-6 py-3 border border-red-900/50 text-red-500 font-bold rounded-lg hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                            >
                                <LogOut size={18} /> 退出登录
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: User Posts */}
            <div className="md:col-span-2">
                <div className="mb-6 flex items-center gap-3">
                    <FileText className="text-emperor-gold" />
                    <h2 className="text-xl font-bold text-white">我的陪葬品 (My Posts)</h2>
                </div>

                {userPosts.length === 0 ? (
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 text-center text-gray-500">
                        <p>暂无生成记录，快去生成你的第一份教案吧。</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {userPosts.map((post) => (
                            <div 
                                key={post.id} 
                                className="group bg-[#0a0a0a] border border-white/10 rounded-xl p-5 hover:border-emperor-gold/30 transition-all relative overflow-hidden cursor-pointer"
                                onClick={() => setSelectedPost(post)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emperor-gold transition-colors">{post.title}</h3>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="px-2 py-0.5 bg-white/5 rounded border border-white/5">{post.grade}</span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </span>
                                            {post.content?.published === false && (
                                                <span className="text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded">草稿 (Draft)</span>
                                            )}
                                            {(post.content?.published === true || post.content?.published === undefined) && (
                                                <span className="text-jade-green border border-jade-green/30 px-2 py-0.5 rounded">已发布 (Published)</span>
                                            )}
                                        </div>
                                    </div>
                                    <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
                                        <Eye size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[6000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setSelectedPost(null)}
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="bg-[#0a0a0a] w-full max-w-4xl max-h-[90vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0f0f0f]">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-serif font-bold text-white">{selectedPost.title}</h2>
                            {selectedPost.content?.published === false ? (
                                <span className="px-2 py-0.5 text-xs bg-yellow-500/10 text-yellow-500 rounded border border-yellow-500/20">草稿</span>
                            ) : (
                                <span className="px-2 py-0.5 text-xs bg-jade-green/10 text-jade-green rounded border border-jade-green/20">已发布</span>
                            )}
                        </div>
                        <button 
                            onClick={() => setSelectedPost(null)}
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-[#050505]">
                        <div className="prose prose-invert prose-emperor max-w-none prose-headings:text-emperor-gold prose-ul:list-disc prose-ul:ml-4 prose-ol:list-decimal prose-ol:ml-4 prose-a:text-jade-green hover:prose-a:text-white prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-purple-300 prose-pre:bg-[#080808] prose-pre:border prose-pre:border-white/10">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]} 
                                rehypePlugins={[rehypeHighlight]}
                            >
                                {selectedPost.content?.markdown || '无法读取内容'}
                            </ReactMarkdown>
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/10 bg-[#0f0f0f] flex flex-wrap justify-end gap-4">
                        <button 
                            onClick={() => handleDeletePost(selectedPost.id)}
                            className="px-4 py-2 rounded-lg border border-red-900/50 hover:bg-red-900/20 text-red-500 font-bold flex items-center gap-2 transition-colors mr-auto"
                        >
                            <Trash2 size={16} />
                            销毁
                        </button>

                        <button 
                            onClick={() => handleCopyContent(selectedPost.content?.markdown || '')}
                            className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-white font-bold flex items-center gap-2 transition-colors"
                        >
                            <Copy size={16} />
                            复制
                        </button>

                        <button 
                            onClick={() => handleRemixPost(selectedPost)}
                            className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-white font-bold flex items-center gap-2 transition-colors"
                        >
                            <RefreshCw size={16} />
                            编辑/二创
                        </button>

                        {selectedPost.content?.published === false && (
                            <button 
                                onClick={() => handlePublishDraft(selectedPost)}
                                className="px-6 py-2 rounded-lg bg-jade-green hover:bg-emerald-400 text-black font-bold flex items-center gap-2 transition-colors shadow-lg shadow-jade-green/20"
                            >
                                <Upload size={16} />
                                正式发布
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;