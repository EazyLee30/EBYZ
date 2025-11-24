import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import CurriculumCard from './components/CurriculumCard';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import Oracle from './components/Oracle';
import LessonDetail from './components/LessonDetail';
import { curriculumData } from './data';
import { Lesson, CurriculumModule } from './types';

const App: React.FC = () => {
  // Navigation Refs
  const blueprintRef = useRef<HTMLDivElement>(null);
  const curriculumRef = useRef<HTMLDivElement>(null);
  const protocolRef = useRef<HTMLDivElement>(null);
  
  // State
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  
  // Computed helpers
  const selectedLessonModulePair = React.useMemo(() => {
    if (!selectedLessonId) return null;
    for (const mod of curriculumData) {
        for (const unit of mod.units) {
            const lesson = unit.lessons.find(l => l.id === selectedLessonId);
            if (lesson) return { lesson, module: mod };
        }
    }
    return null;
  }, [selectedLessonId]);

  // Scroll handler
  const scrollToSection = (section: 'blueprint' | 'list' | 'protocol' | 'whitepaper') => {
    // If we are in detail view, close it first then scroll
    if (selectedLessonId) {
        setSelectedLessonId(null);
        setTimeout(() => performScroll(section), 100);
    } else {
        performScroll(section);
    }
  };

  const performScroll = (section: 'blueprint' | 'list' | 'protocol' | 'whitepaper') => {
    if (section === 'whitepaper') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const refs = {
      blueprint: blueprintRef,
      list: curriculumRef,
      protocol: protocolRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = () => {
    const confirmation = window.confirm("确认识别码：QIN-DYNASTY-V3\n\n下载固件需要连接冥府私有云。是否继续？");
    if (confirmation) {
        alert("连接超时。请检查您是否焚烧了正确的 5G 基站模型。");
    }
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLessonId(lesson.id);
    // Disable body scroll when modal/page is open
    document.body.style.overflow = 'hidden';
  };

  const handleBack = () => {
    setSelectedLessonId(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-emperor-gold selection:text-black">
      {/* 
         If a lesson is selected, we render the LessonDetail ON TOP of everything.
         We do not unmount the main app to preserve scroll position state.
      */}
      
      {selectedLessonModulePair && (
        <LessonDetail 
            lesson={selectedLessonModulePair.lesson} 
            module={selectedLessonModulePair.module}
            onBack={handleBack} 
        />
      )}

      {/* Main App Content - hidden visually or interacting when detail is open, 
          but kept in DOM to maintain scroll position */}
      <div className={`transition-opacity duration-300 ${selectedLessonId ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
          
          <Header onNavClick={scrollToSection} onDownload={handleDownload} />

          <main>
            {/* Hero Section */}
            <section className="relative py-28 px-6 text-center overflow-hidden min-h-[80vh] flex flex-col justify-center items-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emperor-gold rounded-full blur-[180px] opacity-[0.05] -z-10 animate-pulse-slow"></div>
              
              <div className="inline-block border border-emperor-gold/30 rounded-full px-4 py-1 mb-8 bg-emperor-gold/5 backdrop-blur-md animate-fade-in">
                <span className="text-emperor-gold text-xs font-mono tracking-[0.3em]">EST. 221 BC • DIGITAL AFTERLIFE</span>
              </div>

              <div className="mb-8">
                  <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-4 tracking-tight leading-tight justify-center animate-slide-up">
                    人均嬴政白皮书
                  </h1>
                  
                  <div className="h-2"></div>
                  
                  <p className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 font-sans font-light justify-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    智能棺材全栈物联网教学平台
                  </p>
              </div>
              
              <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                重构义务教育信息科技课程 (6-8年级)。<br/>
                基于 <strong className="text-white">OpenWrt</strong> 与 <strong className="text-white">Home Assistant</strong>，
                打造永不掉线的数字陵墓，让您的身后事尽在掌握。
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <button 
                  onClick={() => scrollToSection('list')}
                  className="group relative bg-emperor-gold text-black px-10 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)] overflow-hidden"
                >
                  <span className="relative z-10">浏览课程目录</span>
                  <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
                <button 
                  onClick={handleDownload}
                  className="group border border-gray-700 bg-gray-900/50 text-gray-300 px-10 py-4 rounded-full font-bold hover:bg-gray-800 hover:border-gray-500 transition-all backdrop-blur-sm"
                >
                  <span className="group-hover:text-white transition-colors">下载 IoT 固件</span>
                </button>
              </div>
            </section>

            {/* Tech Architecture (Blueprint) */}
            <div id="blueprint">
                <ArchitectureDiagram ref={blueprintRef} />
            </div>

            {/* Curriculum Grid (List) */}
            <section ref={curriculumRef} id="curriculum" className="py-24 px-6 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div className="relative">
                   <div className="absolute -left-6 -top-6 w-20 h-20 bg-emperor-gold/10 rounded-full blur-xl"></div>
                   <h2 className="relative text-4xl font-serif font-bold text-white mb-2">陪葬品清单</h2>
                   <p className="text-gray-500 mt-1 max-w-md">
                    点击下方卡片展开单元，选择课程查看 <span className="text-emperor-gold border-b border-emperor-gold/30">AI 教学方案</span>。
                   </p>
                </div>
                <div className="flex gap-2">
                    <span className="text-xs font-mono bg-[#1a1a1a] border border-gray-800 px-3 py-1 rounded text-gray-400">Total Lessons: 90</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {curriculumData.map((module) => (
                  <CurriculumCard 
                    key={module.id} 
                    module={module} 
                    onLessonClick={handleLessonSelect}
                  />
                ))}
              </div>
            </section>

            {/* Interactive AI (Protocol) */}
            <section ref={protocolRef} id="protocol" className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#050505]">
               <Oracle />
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-16 mt-12 bg-black relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="max-w-7xl mx-auto px-6 text-center">
                 <p className="text-gray-500 text-sm mb-6 font-serif italic opacity-70">
                   "Death is just a latency issue."
                 </p>
                 <p className="text-gray-600 text-xs mb-8">
                   &copy; 2025 沪上嘻嘻生 | 智能棺材解决方案 V3.0
                 </p>
                 <div className="flex justify-center gap-8 text-[10px] text-gray-700 uppercase tracking-widest font-mono">
                    <span className="hover:text-emperor-gold cursor-pointer transition-colors">Zigbee 3.0</span>
                    <span className="hover:text-emperor-gold cursor-pointer transition-colors">Matter</span>
                    <span className="hover:text-emperor-gold cursor-pointer transition-colors">Thread</span>
                    <span className="hover:text-emperor-gold cursor-pointer transition-colors">MQTT</span>
                 </div>
              </div>
            </footer>
          </main>
      </div>
    </div>
  );
};

export default App;