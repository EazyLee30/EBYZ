import React, { useState } from 'react';
import { Skull, Download, Book, Shield, Map, Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onNavClick: (section: 'blueprint' | 'list' | 'protocol' | 'whitepaper') => void;
  onDownload: () => void;
}

const Header: React.FC<Props> = ({ onNavClick, onDownload }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavClick = (section: 'blueprint' | 'list' | 'protocol' | 'whitepaper') => {
    onNavClick(section);
    setIsMobileMenuOpen(false);
  };

  return (
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
                    </nav>

                    <div className="h-[1px] bg-white/10 w-full my-4"></div>

                    <div className="flex flex-col gap-4">
                         <a
                            href="https://github.com/EazyLee30/EBYZ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors px-2"
                         >
                            <Github size={20} />
                            <span>GitHub 仓库</span>
                         </a>

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
  );
};

export default Header;
