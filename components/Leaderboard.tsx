import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Skull, Trophy, Clock, GitFork, Star, User, ArrowRight, X, Copy, RefreshCw, Heart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface Post {
  id: string;
  title: string;
  grade: string;
  content: any;
  location: string;
  likes_count: number;
  remix_count: number;
  created_at: string;
  profiles: {
    nickname: string;
    avatar_url: string;
  } | null; 
}

interface Props {
  onBack: () => void;
  onRemix?: (content: string) => void;
}

const Leaderboard: React.FC<Props> = ({ onBack, onRemix }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'hot' | 'new' | 'remix'>('hot');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load liked posts from local storage
    const savedLikes = localStorage.getItem('liked_posts');
    if (savedLikes) {
        setLikedPosts(new Set(JSON.parse(savedLikes)));
    }
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            nickname,
            avatar_url
          )
        `);

      if (filter === 'hot') {
        query = query.order('likes_count', { ascending: false });
      } else if (filter === 'new') {
        query = query.order('created_at', { ascending: false });
      } else if (filter === 'remix') {
        query = query.order('remix_count', { ascending: false });
      }

      // Filter only published posts
      query = query.not('content->>published', 'eq', 'false');

      const { data, error } = await query.limit(20);

      if (error) {
          console.error("Supabase query error:", error);
          throw error;
      }
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching leaderboard:', error);
      setError(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
        alert("教案内容已复制到剪贴板！");
    }).catch(() => {
        alert("复制失败，请手动复制。");
    });
  };

  const handleRemixClick = (post: Post) => {
      const markdown = post.content?.markdown || '';
      if (onRemix) {
          // @ts-ignore
          onRemix({
              content: markdown,
              title: `二创：${post.title}`,
              grade: post.grade
          });
      } else {
          // Fallback if no remix handler provided
          handleCopyContent(markdown);
          alert("已复制该教案内容。");
      }
  };

  const handleLike = async (e: React.MouseEvent, post: Post) => {
      e.stopPropagation();
      
      if (likedPosts.has(post.id)) {
          // Already liked (client-side check only for now)
          return; 
      }

      // Optimistic update
      const newLikesCount = (post.likes_count || 0) + 1;
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, likes_count: newLikesCount } : p));
      if (selectedPost && selectedPost.id === post.id) {
          setSelectedPost(prev => prev ? { ...prev, likes_count: newLikesCount } : null);
      }

      // Update local storage
      const newLikedPosts = new Set(likedPosts).add(post.id);
      setLikedPosts(newLikedPosts);
      localStorage.setItem('liked_posts', JSON.stringify(Array.from(newLikedPosts)));

      try {
          // Increment in Supabase
          // Since we don't have a dedicated increment RPC set up yet, we fetch fresh then update to be safer, 
          // or just blindly update with our optimistic value (less safe for concurrency but okay for now).
          // Best effort with current permissions:
          const { error } = await supabase
            .from('posts')
            .update({ likes_count: newLikesCount })
            .eq('id', post.id);

          if (error) throw error;
      } catch (error) {
          console.error('Failed to update like count', error);
          // Revert on error? Maybe too jarring. Let's just keep it optimistic for the user session.
      }
  };

  if (error) {
      return (
        <div className="fixed inset-0 z-[5000] overflow-y-auto bg-[#050505] text-white p-8 flex flex-col items-center justify-center">
            <Skull size={64} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-red-500 mb-2">冥界数据连接断开</h2>
            <p className="text-gray-500 mb-6 text-center max-w-md">
                {error === 'Failed to fetch' ? '网络连接失败，请检查您的网络或法器。' : `错误详情: ${error}`}
            </p>
            <button 
                onClick={onBack}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-colors"
            >
                返回阳间
            </button>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 z-[5000] overflow-y-auto bg-[#050505] text-white p-4 md:p-8">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-emperor-gold transition-colors"
                >
                    <ArrowRight className="rotate-180" />
                </button>
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-emperor-gold to-yellow-200 flex items-center gap-3">
                        <Trophy className="text-emperor-gold" />
                        冥界封神榜
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        ETERNAL HALL OF FAME
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                <button
                    onClick={() => setFilter('hot')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'hot' ? 'bg-emperor-gold text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <Star size={16} /> 人气榜
                </button>
                <button
                    onClick={() => setFilter('remix')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'remix' ? 'bg-emperor-gold text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <GitFork size={16} /> 二创榜
                </button>
                <button
                    onClick={() => setFilter('new')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'new' ? 'bg-emperor-gold text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <Clock size={16} /> 最新出土
                </button>
            </div>
        </div>

        {/* List */}
        {loading ? (
            <div className="flex justify-center py-20">
                <div className="animate-spin w-12 h-12 border-4 border-emperor-gold border-t-transparent rounded-full"></div>
            </div>
        ) : posts.length === 0 ? (
            // Empty State
            <div className="text-center py-24 bg-[#0a0a0a] border border-white/5 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emperor-gold/20 to-transparent"></div>
                <div className="flex justify-center mb-6 opacity-50">
                    <Skull size={80} className="text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">冥府档案库空空如也</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                    似乎还没有先驱者将他们的智慧结晶刻录在赛博墓碑上。
                    <br />你是那个注定要开启新纪元的人吗？
                </p>
                <button 
                    onClick={onBack}
                    className="px-6 py-3 bg-white/5 hover:bg-emperor-gold hover:text-black text-white font-bold rounded-full transition-all border border-white/10"
                >
                    去生成第一份教案
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-6">
                {posts.map((post, index) => (
                    <div 
                        key={post.id}
                        className="group bg-[#0a0a0a] border border-white/10 rounded-xl p-6 hover:border-emperor-gold/50 transition-all relative overflow-hidden cursor-pointer"
                        onClick={() => setSelectedPost(post)}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emperor-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emperor-gold/10 transition-all"></div>
                        
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            {/* Rank Number */}
                            <div className={`
                                flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full font-serif font-bold text-xl border
                                ${index === 0 ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' : ''}
                                ${index === 1 ? 'bg-gray-400/20 text-gray-400 border-gray-400/50' : ''}
                                ${index === 2 ? 'bg-orange-700/20 text-orange-700 border-orange-700/50' : ''}
                                ${index > 2 ? 'bg-white/5 text-gray-500 border-white/10' : ''}
                            `}>
                                {index + 1}
                            </div>

                            {/* Content Info */}
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-emperor-gold transition-colors">
                                        {post.title}
                                    </h3>
                                    <span className="px-2 py-0.5 rounded bg-white/5 text-xs text-gray-500 border border-white/10">
                                        {post.grade}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-6 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <User size={14} />
                                        <span className="text-gray-300">{post.profiles?.nickname || '无名氏'}</span>
                                    </div>
                                    {post.location && (
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="w-1.5 h-1.5 rounded-full bg-jade-green"></span>
                                            {post.location}
                                        </div>
                                    )}
                                    <div className="text-gray-600 text-xs">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-6 flex-shrink-0">
                                <div className="text-center group/likes">
                                    <button 
                                        onClick={(e) => handleLike(e, post)}
                                        className={`flex flex-col items-center transition-colors ${likedPosts.has(post.id) ? 'text-red-500' : 'text-white hover:text-red-500'}`}
                                    >
                                        <Heart 
                                            size={24} 
                                            fill={likedPosts.has(post.id) ? "currentColor" : "none"} 
                                            className={`transition-transform ${likedPosts.has(post.id) ? '' : 'group-hover/likes:scale-110'}`}
                                        />
                                        <span className="text-2xl font-bold mt-1">{post.likes_count || 0}</span>
                                    </button>
                                    <div className="text-xs text-gray-500 uppercase">Likes</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{post.remix_count || 0}</div>
                                    <div className="text-xs text-gray-500 uppercase">Remixes</div>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPost(post);
                                    }}
                                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-emperor-gold hover:text-black transition-colors border border-white/10 text-sm font-bold"
                                >
                                    查看详情
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
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
                    {/* Modal Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0f0f0f]">
                        <div>
                            <div className="flex items-center gap-4 mb-1">
                                <h2 className="text-2xl font-serif font-bold text-white">{selectedPost.title}</h2>
                                <button 
                                    onClick={(e) => handleLike(e, selectedPost)}
                                    className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${likedPosts.has(selectedPost.id) ? 'border-red-500/50 bg-red-500/10 text-red-500' : 'border-white/10 bg-white/5 text-gray-400 hover:text-red-500 hover:border-red-500/30'}`}
                                >
                                    <Heart size={16} fill={likedPosts.has(selectedPost.id) ? "currentColor" : "none"} />
                                    <span className="text-sm font-bold">{selectedPost.likes_count || 0} Likes</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span className="px-2 py-0.5 bg-emperor-gold/10 text-emperor-gold rounded text-xs border border-emperor-gold/20">{selectedPost.grade}</span>
                                <span>作者: {selectedPost.profiles?.nickname || '无名氏'}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setSelectedPost(null)}
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-[#050505]">
                        <div className="prose prose-invert prose-emperor max-w-none prose-headings:text-emperor-gold prose-ul:list-disc prose-ul:ml-4 prose-ol:list-decimal prose-ol:ml-4 prose-a:text-jade-green hover:prose-a:text-white prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-purple-300 prose-pre:bg-[#080808] prose-pre:border prose-pre:border-white/10">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]} 
                                rehypePlugins={[rehypeHighlight]}
                            >
                                {selectedPost.content?.markdown || '无法读取该教案内容，可能是数据已损坏。'}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 border-t border-white/10 bg-[#0f0f0f] flex justify-end gap-4">
                        <button 
                            onClick={() => handleCopyContent(selectedPost.content?.markdown || '')}
                            className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-white font-bold flex items-center gap-2 transition-colors"
                        >
                            <Copy size={16} />
                            复制内容
                        </button>
                        <button 
                            onClick={() => handleRemixClick(selectedPost)}
                            className="px-6 py-2 rounded-lg bg-emperor-gold hover:bg-yellow-500 text-black font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emperor-gold/20"
                        >
                            <RefreshCw size={16} />
                            以此为基础二创 (Remix)
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Leaderboard;