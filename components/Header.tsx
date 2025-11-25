import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Skull, Download, Book, Shield, Map, Github, Menu, X, User, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Auth } from './Auth';
import { supabase } from '../lib/supabase';

interface Props {
  onNavClick: (section: 'blueprint' | 'list' | 'protocol' | 'whitepaper' | 'leaderboard' | 'profile') => void;
  onDownload: () => void;
}

const Header: React.FC<Props> = ({ onNavClick, onDownload }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  React.useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
          setIsAuthModalOpen(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleMobileNavClick = (section: 'blueprint' | 'list' | 'protocol' | 'whitepaper' | 'leaderboard' | 'profile') => {
    onNavClick(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <header className="bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group z-50 relative" 
          onClick={() => handleMobileNavClick('whitepaper')}
        >
          <div className="text-emperor-gold group-hover:rotate-12 transition-transform duration-500">
            <Skull size={28} />
          </div>
          <div className="block">
            <h1 className="text-lg font-bold text-gray-200 tracking-wider group-hover:text-white">人均嬴政白皮书</h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
            <button 
                onClick={() => onNavClick('blueprint')}
                className="px-3 py-2 text-sm text-gray-400 hover:text-emperor-gold transition-colors flex items-center gap-2"
            >
                <Map size={16} />
                <span>墓室蓝图</span>
            </button>

            <button 
                onClick={() => onNavClick('list')}
                className="px-3 py-2 text-sm text-gray-400 hover:text-emperor-gold transition-colors flex items-center gap-2"
            >
                <Book size={16} />
                <span>陪葬品清单</span>
            </button>

            <button 
                onClick={() => onNavClick('protocol')}
                className="px-3 py-2 text-sm text-gray-400 hover:text-emperor-gold transition-colors flex items-center gap-2"
            >
                <Shield size={16} />
                <span>守陵协议</span>
            </button>

            <button 
                onClick={() => onNavClick('leaderboard')}
                className="px-3 py-2 text-sm text-gray-400 hover:text-emperor-gold transition-colors flex items-center gap-2"
            >
                <Trophy size={16} />
                <span>封神榜</span>
            </button>
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:flex items-center gap-3">
             <button 
                onClick={() => onNavClick('whitepaper')}
                className="text-xs text-gray-500 hover:text-white transition-colors"
             >
                阅读白皮书
             </button>
             
             <a
                href="https://github.com/EazyLee30/EBYZ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                title="GitHub Repository"
             >
                <Github size={20} />
             </a>

             <button 
                onClick={onDownload}
                className="bg-white/10 hover:bg-emperor-gold hover:text-black text-white text-xs font-bold py-2 px-4 rounded-full transition-all flex items-center gap-2"
             >
                <Download size={14} />
                下载固件
             </button>

             {/* Auth Button */}
             {user ? (
                 <button
                    onClick={() => onNavClick('profile')}
                    className="relative group flex items-center gap-2 p-1 pl-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-emperor-gold/50 transition-all"
                 >
                    <span className="text-xs text-gray-300 max-w-[100px] truncate">
                        {user.email?.split('@')[0]}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emperor-gold to-yellow-600 border border-white/20 cursor-pointer overflow-hidden">
                        {user.user_metadata?.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-xs font-bold text-black">
                                {user.email?.[0].toUpperCase()}
                            </div>
                        )}
                    </div>
                 </button>
             ) : (
                 <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-xs font-bold text-emperor-gold border border-emperor-gold/30 px-3 py-1.5 rounded hover:bg-emperor-gold/10 transition-colors flex items-center gap-1"
                 >
                    <User size={14} />
                    登录
                 </button>
             )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 top-16 bg-[#0a0a0a] z-40 md:hidden flex flex-col p-6 space-y-6 border-t border-white/10"
                >
                    <nav className="flex flex-col space-y-4">
                        <button 
                            onClick={() => handleMobileNavClick('blueprint')}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 text-gray-200 hover:bg-white/10 hover:text-emperor-gold transition-colors"
                        >
                            <Map size={20} />
                            <span className="text-lg font-bold">墓室蓝图</span>
                        </button>

                        <button 
                            onClick={() => handleMobileNavClick('list')}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 text-gray-200 hover:bg-white/10 hover:text-emperor-gold transition-colors"
                        >
                            <Book size={20} />
                            <span className="text-lg font-bold">陪葬品清单</span>
                        </button>

                        <button 
                            onClick={() => handleMobileNavClick('protocol')}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 text-gray-200 hover:bg-white/10 hover:text-emperor-gold transition-colors"
                        >
                            <Shield size={20} />
                            <span className="text-lg font-bold">守陵协议</span>
                        </button>

                        <button 
                            onClick={() => handleMobileNavClick('leaderboard')}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 text-gray-200 hover:bg-white/10 hover:text-emperor-gold transition-colors"
                        >
                            <Trophy size={20} />
                            <span className="text-lg font-bold">封神榜</span>
                        </button>
                    </nav>

                    <div className="h-[1px] bg-white/10 w-full my-4"></div>

                    <div className="flex flex-col gap-4">
                         {user ? (
                             <button 
                                onClick={() => handleMobileNavClick('profile')}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-xl w-full"
                             >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emperor-gold overflow-hidden">
                                        {user.user_metadata?.avatar_url && <img src={user.user_metadata.avatar_url} className="w-full h-full" />}
                                    </div>
                                    <span className="text-sm text-white truncate max-w-[150px]">{user.email}</span>
                                </div>
                                <span className="text-xs text-emperor-gold">档案管理</span>
                             </button>
                         ) : (
                             <button 
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsAuthModalOpen(true);
                                }}
                                className="w-full bg-emperor-gold/10 border border-emperor-gold/30 text-emperor-gold font-bold py-4 rounded-xl flex items-center justify-center gap-2"
                             >
                                登录账户
                             </button>
                         )}
                         
                         <button 
                            onClick={() => {
                                onDownload();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full bg-emperor-gold text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors"
                         >
                            <Download size={20} />
                            下载固件
                         </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </header>

    {/* Portal for Auth Modal */}
    {isAuthModalOpen && createPortal(
        <AnimatePresence>
            <div 
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={(e) => {
                    if (e.target === e.currentTarget) setIsAuthModalOpen(false);
                }}
            >
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-md"
                >
                    <button 
                        onClick={() => setIsAuthModalOpen(false)}
                        className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
                        title="Close"
                    >
                        <X size={24} />
                    </button>
                    <Auth />
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    )}
    </>
  );
};

export default Header;
