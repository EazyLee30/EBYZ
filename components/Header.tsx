import React from 'react';
import { Skull, Download, Book, Shield, Map, Github } from 'lucide-react';

interface Props {
  onNavClick: (section: 'blueprint' | 'list' | 'protocol' | 'whitepaper') => void;
  onDownload: () => void;
}

const Header: React.FC<Props> = ({ onNavClick, onDownload }) => {
  return (
    <header className="bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => onNavClick('whitepaper')}
        >
          <div className="text-emperor-gold group-hover:rotate-12 transition-transform duration-500">
            <Skull size={28} />
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-gray-200 tracking-wider group-hover:text-white">人均嬴政白皮书</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-1 md:space-x-6">
            <button 
                onClick={() => onNavClick('blueprint')}
                className="px-3 py-2 text-sm text-gray-400 hover:text-emperor-gold transition-colors flex items-center gap-2"
            >
                <Map size={16} className="hidden sm:block" />
                <span>墓室蓝图</span>
            </button>

            <button 
                onClick={() => onNavClick('list')}
                className="px-3 py-2 text-sm text-gray-400 hover:text-emperor-gold transition-colors flex items-center gap-2"
            >
                <Book size={16} className="hidden sm:block" />
                <span>陪葬品清单</span>
            </button>

            <button 
                onClick={() => onNavClick('protocol')}
                className="px-3 py-2 text-sm text-gray-400 hover:text-emperor-gold transition-colors flex items-center gap-2"
            >
                <Shield size={16} className="hidden sm:block" />
                <span>守陵协议</span>
            </button>
        </nav>

        {/* Action */}
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
      </div>
    </header>
  );
};

export default Header;
