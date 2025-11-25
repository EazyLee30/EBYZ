import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, BookOpen, Cpu, Skull, Sparkles, AlertTriangle, Share2, Download, Terminal, Scroll, Send } from 'lucide-react';
import { Lesson, CurriculumModule } from '../types';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { supabase } from '../lib/supabase';
import { Auth } from './Auth';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  lesson: Lesson;
  module: CurriculumModule;
  onBack: () => void;
}

const LessonDetail: React.FC<Props> = ({ lesson, module, onBack }) => {
  const [aiContent, setAiContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if we have preset content
  const hasPreset = !!lesson.content;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setShowAuthModal(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const generateLessonPlan = async () => {
    setLoading(true);
    
    try {
      // Safe API key access for Vite
      // @ts-ignore
      const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY || ''; 
      if (!apiKey) {
          setAiContent('（通灵失败：未配置 API Key，请联系管理员焚烧相关凭证）');
          return;
      }
      
      const ai = new GoogleGenAI({ apiKey });
      const model = 'gemini-2.5-flash';
      
      // RAG Context: Retrieve relevant info from knowledge base using dynamic import
      let knowledgeContext = '';
      try {
         // @ts-ignore
         const kb = await import('@/src/data/knowledge.json');
         const data = kb.default || kb;
         knowledgeContext = (data as any[] || []).map(k => {
            if (k.content.includes(module.grade) || k.content.includes('物联网') || k.content.includes('控制')) {
                return `[参考资料: ${k.filename}]\n${k.content.substring(0, 3000)}...`; // Truncate to avoid token limits
            }
            return '';
         }).filter(Boolean).join('\n\n');
      } catch (e) {
         console.warn('Failed to load knowledge base', e);
      }

      const prompt = `
      请为初中信息科技课程生成一份**高度专业、结构严谨且风格独特**的教案。
      主题：“智能棺材”（智能陵墓），以此作为智能家居的隐喻。
      
      【参考知识库 (RAG Context)】：
      ${knowledgeContext}
      
      课程标题: ${lesson.coffinTitle}
      原课程标题: ${lesson.originalTitle}
      所在年级: ${module.grade}
      描述: ${lesson.description}
      模块技术栈: ${module.techStack.join(', ')}
      
      请遵循以下规则：
      1. **核心素养融合**：必须明确体现【信息意识】、【计算思维】、【数字化学习与创新】、【信息社会责任】四个维度。
      
      2. **教学目标编写规范 (Strict Requirement)**：
         - **严禁**使用“学生能够”、“学生”等词汇作为主语。
         - **必须**严格遵循以下句式模板（三要素）：
           **“经历/通过……（学习过程或方法），习得/理解……（结果/知识技能），完成/形成……（表现/作品）”**
         - 请确保生成的每一条教学目标都符合上述句式。
         
      3. **结构化输出**（Markdown）：
         - **# 课题名称**
         - **## 一、核心素养指向**
         - **## 二、教学目标** (请严格按照上述“经历...习得...完成...”的句式列出 3-4 条)
         - **## 三、教学重难点**
           - **重点**：...
           - **难点**：...
         - **## 四、教学创新点** (结合智能棺材/陵墓场景的创新之处)
         - **## 五、法器准备 (教学资源)**
         - **## 六、教学仪式 (教学过程)** (包含环节、教师活动、学生活动、设计意图)
         - **## 七、代码符咒 (核心代码示例)**
         - **## 八、防诈尸警告 (安全与伦理)**
         
      4. **风格要求**：在保持教案专业性的同时，使用“陵墓”、“陪葬品”、“符咒”等词汇进行幽默隐喻，但逻辑必须严密，技术必须准确。
      `;

      // Use Vercel Serverless Proxy to avoid Network/Region blocks
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setAiContent(result.text || '冥界信号微弱，请稍后再试...');
    } catch (error: any) {
      console.error(error);
      setAiContent(`通灵仪式中断：${error.message || '未知错误'}。请检查 Vercel 环境变量或网络连接。`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!contentRef.current) return;
    const element = contentRef.current;
    
    const opt = {
      margin:       [10, 10, 10, 10] as [number, number, number, number],
      filename:     `${lesson.coffinTitle}_Lesson_Plan.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#1a1a1a' },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Temporary style adjustment for PDF generation
    const originalStyle = element.style.cssText;
    element.style.color = 'black';
    element.style.backgroundColor = 'white';
    
    // Clone the element to modify styles for PDF without affecting UI
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.padding = '20px';
    clone.style.color = '#000';
    clone.style.background = '#fff';
    
    // Find all text elements in clone and force black color
    const allElements = clone.querySelectorAll('*');
    allElements.forEach((el: any) => {
        el.style.color = '#000';
        if (el.classList.contains('text-emperor-gold')) {
            el.style.color = '#b45309'; // Darker gold for white paper
        }
        // Fix code blocks
        if (el.tagName === 'PRE' || el.tagName === 'CODE') {
            el.style.background = '#f3f4f6';
            el.style.color = '#1f2937';
            el.style.border = '1px solid #e5e7eb';
        }
    });

    html2pdf().from(clone).set(opt).save().then(() => {
        // Clean up if needed, though we used a clone
    });
  };

  const handlePublish = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!aiContent) {
      alert('请先生成一份教案再进行发布！');
      return;
    }

    setPublishing(true);
    try {
      // 直接在前端插入数据库，利用 RLS 策略
      const { error } = await supabase.from('posts').insert([
        {
          title: lesson.coffinTitle,
          grade: module.grade,
          content: { markdown: aiContent },
          user_id: user.id,
          location: 'Unknown (Web)', // 暂时写死，后续可优化
          // parent_id: null 
        }
      ]);

      if (error) throw error;

      alert('发布成功！你的教案已进入冥界档案库。');
    } catch (error: any) {
      console.error('Publish failed:', error);
      
      let errorMsg = error.message || '未知错误';
      if (errorMsg.includes('Failed to fetch')) {
          errorMsg = '网络请求被拦截。请检查：\n1. 网络连接是否正常\n2. 是否开启了广告拦截插件(AdBlock)\n3. Vercel 环境变量配置';
      }
      
      alert(`发布失败：${errorMsg}`);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#050505] z-[9999] overflow-y-auto animate-slide-up text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Navbar */}
      <div className="sticky top-0 z-50 glass-panel border-b border-white/5 px-4 md:px-6 py-4 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 md:gap-3 text-gray-400 hover:text-white transition-colors"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-emperor-gold group-hover:text-black transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="font-medium tracking-wide text-sm hidden md:inline">返回课程目录</span>
          <span className="font-medium tracking-wide text-sm md:hidden">返回</span>
        </button>
        <div className="flex items-center gap-2">
             <button className="p-2.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-emperor-gold transition-colors" title="Share Curse">
                <Share2 size={18} />
             </button>
             {aiContent && (
                <>
                 <button 
                    onClick={handlePublish}
                    disabled={publishing}
                    className="p-2.5 rounded-lg bg-jade-green/10 text-jade-green hover:bg-jade-green hover:text-black transition-all flex items-center gap-2 border border-jade-green/30" 
                    title="Publish to Leaderboard"
                 >
                    {publishing ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Send size={18} />
                    )}
                    <span className="text-xs font-bold hidden md:inline">发布到排行榜</span>
                 </button>
                 <button 
                    onClick={handleDownloadPdf}
                    className="p-2.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-emperor-gold transition-colors flex items-center gap-2" 
                    title="Download PDF"
                 >
                    <Download size={18} />
                    <span className="text-xs font-bold hidden md:inline">下载教案</span>
                 </button>
                </>
             )}
        </div>
      </div>

      {/* Auth Modal Overlay with Portal */}
      {showAuthModal && createPortal(
        <AnimatePresence>
            <div 
                className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={(e) => {
                    if (e.target === e.currentTarget) setShowAuthModal(false);
                }}
            >
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-md"
                >
                    <button 
                        onClick={() => setShowAuthModal(false)}
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

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16 pb-32 relative z-10">
        {/* Hero Section */}
        <div className="mb-10 md:mb-16 relative">
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-emperor-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="max-w-3xl w-full">
                    <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in">
                        <span className="inline-block px-3 py-1 rounded-full bg-jade-green/10 text-jade-green text-xs font-mono border border-jade-green/20">
                            {module.grade.split('：')[0]}
                        </span>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs font-mono border border-white/10">
                            MODULE: {module.id.split('-')[1].toUpperCase()}
                        </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight animate-slide-up break-words">
                        {lesson.coffinTitle}
                    </h1>
                    
                    <h2 className="text-lg md:text-xl text-gray-500 font-light flex flex-col md:flex-row md:items-center gap-3 mt-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <span className="hidden md:block w-8 h-[1px] bg-gray-600"></span>
                        <span>原课题：{lesson.originalTitle}</span>
                    </h2>
                </div>
                <div className="hidden md:block opacity-10 text-white shrink-0">
                    <Skull size={180} />
                </div>
            </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Context (8 cols) */}
            <div className="lg:col-span-8 space-y-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                
                {/* 1. Scenario Card */}
                <div className="bg-[#0f0f0f] p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden group hover:border-gray-700 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-white">
                        <BookOpen size={100} className="md:w-[150px] md:h-[150px]" />
                    </div>
                    <h3 className="text-lg font-bold text-emperor-gold mb-6 flex items-center gap-3 uppercase tracking-wider">
                        <span className="w-2 h-2 bg-emperor-gold rounded-full"></span>
                        场景描述 (Scenario)
                    </h3>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                        {lesson.description}
                    </p>
                    <div className="mt-8 pt-6 border-t border-gray-800 flex flex-wrap gap-2">
                        {module.techStack.map(tech => (
                            <span key={tech} className="px-3 py-1.5 bg-[#151515] text-gray-400 text-xs rounded-md border border-gray-800 flex items-center gap-2 hover:text-white transition-colors">
                                <Cpu size={14} /> {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 2. Preset Lesson Plan */}
                {hasPreset && !aiContent && (
                    <div className="bg-[#0f0f0f] rounded-2xl border border-gray-800 p-6 md:p-8 relative overflow-hidden animate-fade-in">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emperor-gold to-transparent opacity-50"></div>
                         
                         <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                            <Scroll className="text-emperor-gold" size={20} />
                            预设教案 (Standard Protocol)
                         </h3>

                         <div className="space-y-8">
                            {/* Objectives */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">教学目标</h4>
                                <ul className="space-y-2">
                                    {lesson.content?.objectives.map((obj, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm md:text-base">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-jade-green shrink-0"></span>
                                            {obj}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Materials */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">所需法器 (Materials)</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {lesson.content?.materials.map((mat, i) => (
                                        <div key={i} className="bg-[#1a1a1a] px-4 py-2 rounded border border-gray-800 text-gray-400 text-sm flex items-center gap-2">
                                            <div className="w-1 h-4 bg-gray-700 rounded-full"></div>
                                            {mat}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Procedure */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">教学仪式 (Procedure)</h4>
                                <div className="space-y-4">
                                    {lesson.content?.procedure.map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center text-xs font-mono text-emperor-gold shrink-0">
                                                    {i + 1}
                                                </div>
                                                {i < (lesson.content?.procedure.length || 0) - 1 && (
                                                    <div className="w-[1px] h-full bg-gray-800 my-1"></div>
                                                )}
                                            </div>
                                            <div className="pb-4">
                                                <h5 className="text-white font-bold text-sm mb-1">{step.step}</h5>
                                                <p className="text-gray-400 text-sm leading-relaxed">{step.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Warning */}
                            <div className="mt-6 bg-red-900/10 border border-red-900/30 p-4 rounded-lg flex gap-3 items-start">
                                <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
                                <p className="text-red-400 text-sm font-medium">
                                    {lesson.content?.safetyWarning}
                                </p>
                            </div>
                         </div>
                    </div>
                )}

                {/* 3. AI Generator (Optional Override) */}
                <div className="bg-[#0f0f0f] rounded-2xl border border-dashed border-gray-800 p-1 relative transition-all duration-500 hover:border-gray-700">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                    <div className="h-full w-full rounded-xl bg-[#0f0f0f] p-6 md:p-8 relative overflow-hidden">
                    
                    {!aiContent ? (
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-lg font-bold text-white mb-1 flex items-center justify-center md:justify-start gap-2">
                                    <Sparkles className="text-purple-400" size={18} />
                                    教案不够阴间？(AI Override)
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    召唤秦大爷重写一份更具“特色”的教案（RAG知识库增强版）。
                                </p>
                            </div>
                            <button 
                                onClick={generateLessonPlan}
                                disabled={loading}
                                className="w-full md:w-auto whitespace-nowrap bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> : <Terminal size={16} />}
                                {loading ? '通灵中...' : 'AI 生成教案'}
                            </button>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-800 pb-4 gap-4">
                                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white flex items-center gap-2">
                                    <Sparkles size={18} className="text-purple-400" />
                                    AI 生成结果 (Generated Plan)
                                </h3>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button onClick={handleDownloadPdf} className="flex-1 md:flex-none justify-center text-xs text-emperor-gold hover:text-white transition-colors border border-emperor-gold/50 px-3 py-2 md:py-1 rounded hover:border-emperor-gold flex items-center gap-1">
                                        <Download size={12} /> PDF
                                    </button>
                                    <button onClick={() => setAiContent('')} className="flex-1 md:flex-none justify-center text-xs text-gray-500 hover:text-white transition-colors border border-gray-800 px-3 py-2 md:py-1 rounded hover:border-gray-600">
                                        恢复预设
                                    </button>
                                </div>
                            </div>
                            {/* Content to print */}
                            <div ref={contentRef} className="prose prose-invert prose-emperor max-w-none prose-headings:text-emperor-gold prose-ul:list-disc prose-ul:ml-4 prose-ol:list-decimal prose-ol:ml-4 prose-a:text-jade-green hover:prose-a:text-white prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-purple-300 prose-pre:bg-[#080808] prose-pre:border prose-pre:border-white/10 overflow-x-auto">
                                <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]} 
                                    rehypePlugins={[rehypeHighlight]}
                                >
                                    {aiContent}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>

            {/* Right Column: Meta Info (4 cols) */}
            <div className="lg:col-span-4 space-y-6 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                 <div className="bg-[#121212] p-6 rounded-xl border border-gray-800 shadow-lg">
                    <h4 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                        <AlertTriangle size={16} className="text-jade-green" />
                        核心逻辑 (Core Logic)
                    </h4>
                    <div className="relative border-l border-gray-800 ml-2 space-y-8 pl-6 pb-2">
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-[#121212] border-2 border-jade-green"></span>
                            <h5 className="text-gray-200 text-sm font-bold mb-1">Input</h5>
                            <p className="text-gray-500 text-xs">感知阴阳两界的数据变化</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-[#121212] border-2 border-jade-green"></span>
                            <h5 className="text-gray-200 text-sm font-bold mb-1">Process</h5>
                            <p className="text-gray-500 text-xs">执行预设的守陵算法</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-[#121212] border-2 border-jade-green"></span>
                            <h5 className="text-gray-200 text-sm font-bold mb-1">Output</h5>
                            <p className="text-gray-500 text-xs">触发机关或发送冥府通知</p>
                        </div>
                    </div>
                 </div>

                 <div className="bg-gradient-to-br from-[#121212] to-[#252010] p-6 rounded-xl border border-emperor-gold/10">
                    <h4 className="text-emperor-gold font-bold mb-4 text-sm">白皮书哲学</h4>
                    <blockquote className="text-gray-400 text-lg font-serif italic leading-relaxed">
                        "{module.metaphor}"
                    </blockquote>
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                            DESIGNED FOR ETERNITY
                        </p>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
