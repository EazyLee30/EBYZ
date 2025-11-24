import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from './components/Header';
import CurriculumCard from './components/CurriculumCard';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import Oracle from './components/Oracle';
import LessonDetail from './components/LessonDetail';
import GradeTabs from './components/GradeTabs';
import SpotlightOverlay from './components/ui/SpotlightOverlay';
import BlurText from './components/ui/BlurText';
import ShinyText from './components/ui/ShinyText';
import CyberSarcophagus from './components/ui/CyberSarcophagus';
import { curriculumData } from './data';
import { Lesson, GradeLevel } from './types';
import { Cpu, Wifi, Shield, Zap, Github } from 'lucide-react';

const App: React.FC = () => {
  // Navigation Refs
  const blueprintRef = useRef<HTMLDivElement>(null);
  const curriculumRef = useRef<HTMLDivElement>(null);
  const protocolRef = useRef<HTMLDivElement>(null);
  
  // Scroll Progress for Global Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hero Parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

  // Product Showcase Parallax
  const showcaseRef = useRef(null);
  const { scrollYProgress: showcaseProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"]
  });
  const sarcophagusScale = useTransform(showcaseProgress, [0.2, 0.5, 0.8], [0.8, 1.2, 1]);
  const sarcophagusY = useTransform(showcaseProgress, [0.2, 0.8], [100, -100]);

  // State
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(GradeLevel.Six);
  
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

  const currentModule = React.useMemo(() => {
    return curriculumData.find(m => m.grade === selectedGrade);
  }, [selectedGrade]);

  // Scroll handler
  const scrollToSection = (section: 'blueprint' | 'list' | 'protocol' | 'whitepaper') => {
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
    document.body.style.overflow = 'hidden';
  };

  const handleBack = () => {
    setSelectedLessonId(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-emperor-gold selection:text-black overflow-x-hidden relative group cursor-default">
      {/* Replaced SplashCursor with SpotlightOverlay */}
      <SpotlightOverlay />
      
      {/* Portal: Render LessonDetail outside the root hierarchy */}
      {selectedLessonModulePair && createPortal(
         <LessonDetail 
            lesson={selectedLessonModulePair.lesson} 
            module={selectedLessonModulePair.module}
            onBack={handleBack} 
         />,
         document.getElementById('modal-root') || document.body
      )}
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emperor-gold via-yellow-500 to-emperor-gold origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Global Enhanced Background with Moving Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[#050505]"></div>
          <motion.div 
              animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.03, 0.08, 0.03],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-gradient-radial from-emperor-gold/20 to-transparent rounded-full blur-[100px]"
          />
          <motion.div 
              animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.02, 0.05, 0.02],
                  x: ["0%", "10%", "0%"]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-gradient-radial from-purple-900/20 to-transparent rounded-full blur-[120px]"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>

      <div className={`relative z-10 transition-opacity duration-300 ${selectedLessonId ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
          
          <Header onNavClick={scrollToSection} onDownload={handleDownload} />

          <main>
            {/* 1. Hero Section - Immersive & Parallax */}
            <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-6">
              <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="px-4 py-1 rounded-full border border-emperor-gold/20 bg-emperor-gold/5 backdrop-blur-md">
                        <span className="text-emperor-gold text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase">Est. 221 BC</span>
                    </div>
                </div>
                
                <h1 className="text-5xl sm:text-6xl md:text-9xl font-serif font-bold mb-6 tracking-tighter relative z-50">
                   <BlurText 
                      text="人均 嬴政 白皮书" 
                      className="justify-center"
                      textClassName="text-transparent bg-clip-text bg-gradient-to-b from-[#F9F295] via-[#E0AA3E] to-[#8B6F20] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] px-1 leading-tight"
                   />
                </h1>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <ShinyText 
                        text="智能棺材全栈物联网教学平台" 
                        className="text-lg sm:text-xl md:text-2xl font-light tracking-widest uppercase mb-8 text-center" 
                        speed={5}
                    />
                    
                    <p className="max-w-xl text-gray-400 text-sm md:text-base leading-relaxed mb-10 text-center">
                        重构义务教育信息科技课程 (6-8年级)。<br className="hidden md:inline"/>
                        基于 <strong className="text-white">OpenWrt</strong> 与 <strong className="text-white">Home Assistant</strong>，<br className="md:hidden"/>
                        打造永不掉线的数字陵墓，让您的身后事尽在掌握。
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <button 
                            onClick={() => scrollToSection('list')}
                            className="group relative px-6 py-3 md:px-8 bg-white text-black rounded-full font-bold overflow-hidden transition-transform hover:scale-105 shadow-lg hover:shadow-white/20 text-sm md:text-base"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                浏览产品系列
                            </span>
                        </button>

                        <a 
                            href="https://github.com/EazyLee30/EBYZ"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative px-6 py-3 md:px-8 bg-white/5 text-white border border-white/20 rounded-full font-bold overflow-hidden transition-all hover:scale-105 hover:bg-white/10 hover:border-white/40 flex items-center gap-2 backdrop-blur-sm text-sm md:text-base"
                        >
                            <Github size={20} />
                            <span>GitHub 仓库</span>
                        </a>
                    </div>
                </motion.div>
              </motion.div>
              
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
            </section>

            {/* 2. Product Showcase - Scroll Driven Animation */}
            <section ref={showcaseRef} className="relative min-h-[150vh] py-16 md:py-24 px-4 md:px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center sticky top-24">
                    {/* Left: Text Content */}
                    <div className="space-y-8 md:space-y-12">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4 text-center md:text-left"
                        >
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                                坚如磐石。<br/>
                                <span className="text-emperor-gold">智如丞相。</span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-md mx-auto md:mx-0">
                                搭载最新的 <strong>OpenWrt</strong> 嵌入式系统，结合 <strong>Home Assistant</strong> 智能中枢。
                                无论您身在何处（或何时），您的数字陵墓始终在线。
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-center md:text-left">
                                <Cpu className="text-emperor-gold mb-2 mx-auto md:mx-0" size={24} />
                                <div className="text-xl md:text-2xl font-bold text-white">4 Core</div>
                                <div className="text-xs text-gray-500">RISC-V 处理器</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-center md:text-left">
                                <Wifi className="text-emperor-gold mb-2 mx-auto md:mx-0" size={24} />
                                <div className="text-xl md:text-2xl font-bold text-white">Wi-Fi 7</div>
                                <div className="text-xs text-gray-500">全冥界覆盖</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-center md:text-left">
                                <Shield className="text-emperor-gold mb-2 mx-auto md:mx-0" size={24} />
                                <div className="text-xl md:text-2xl font-bold text-white">IP68</div>
                                <div className="text-xs text-gray-500">防尘防水防盗墓</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-center md:text-left">
                                <Zap className="text-emperor-gold mb-2 mx-auto md:mx-0" size={24} />
                                <div className="text-xl md:text-2xl font-bold text-white">∞ mAh</div>
                                <div className="text-xs text-gray-500">核聚变电池</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual Core */}
                    <div className="relative flex justify-center items-center h-[400px] md:h-[600px] order-first md:order-last">
                        <motion.div style={{ scale: sarcophagusScale, y: sarcophagusY }} className="relative z-10 w-full h-full flex justify-center items-center">
                            <CyberSarcophagus />
                        </motion.div>
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-emperor-gold/10 blur-[100px] rounded-full -z-10"></div>
                    </div>
                </div>
            </section>

            {/* 3. Blueprint Section - Sticky Headers */}
            <div id="blueprint" className="py-16 md:py-24 bg-[#080808]">
                <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">系统架构</h2>
                    <p className="text-gray-500 text-sm md:text-base">全栈物联网解决方案，从传感器到云端。</p>
                </div>
                <ArchitectureDiagram ref={blueprintRef} />
            </div>

            {/* 4. Curriculum Section - Apple Style Grid */}
            <section ref={curriculumRef} id="curriculum" className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                 <h2 className="text-3xl md:text-6xl font-serif font-bold text-white mb-6">陪葬品清单</h2>
                 <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                    不仅仅是课程，更是一套完整的身后事解决方案。<br/>
                    选择您的年级，开始定制您的数字地宫。
                 </p>
              </div>

              <GradeTabs selectedGrade={selectedGrade} onSelect={setSelectedGrade} />
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-8 md:mt-12"
              >
                {currentModule && (
                  <CurriculumCard 
                    key={currentModule.id} 
                    module={currentModule} 
                    onLessonClick={handleLessonSelect}
                    defaultExpanded={true}
                  />
                )}
              </motion.div>
            </section>

            {/* 5. Interactive AI (Oracle) */}
            <section ref={protocolRef} id="protocol" className="py-24 md:py-32 px-4 md:px-6 bg-gradient-to-b from-[#050505] to-black">
               <div className="max-w-4xl mx-auto text-center mb-12">
                   <h2 className="text-3xl font-serif text-white mb-4">Oracle Protocol</h2>
                   <p className="text-gray-500">与您的数字灵魂对话。基于 Gemini Pro。</p>
               </div>
               <Oracle />
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-16 md:py-24 bg-black relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emperor-gold/50 to-transparent"></div>
              <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                 <div className="mb-8 p-4 border border-white/10 rounded-full bg-white/5">
                    <div className="text-2xl font-serif text-emperor-gold">EBYZ</div>
                 </div>
                 <p className="text-gray-500 text-base md:text-lg mb-8 font-serif italic max-w-md">
                   "Death is not the end. It's just a migration to a more stable server."
                 </p>
                 <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[10px] md:text-xs text-gray-600 uppercase tracking-widest font-mono mb-12">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Afterlife</a>
                    <a href="#" className="hover:text-white transition-colors">Firmware Update</a>
                    <a href="#" className="hover:text-white transition-colors">Contact Medium</a>
                 </div>
                 <p className="text-gray-700 text-[10px] md:text-xs">
                   &copy; 2025 沪上嘻嘻生 | Designed in Qin Dynasty, Assembled in Hell.
                 </p>
              </div>
            </footer>
          </main>
      </div>
    </div>
  );
};

export default App;
