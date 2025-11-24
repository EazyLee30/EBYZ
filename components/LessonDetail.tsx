import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Cpu, Skull, Sparkles, AlertTriangle, Share2, Download, Terminal } from 'lucide-react';
import { Lesson, CurriculumModule } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props {
  lesson: Lesson;
  module: CurriculumModule; // Pass parent module for context
  onBack: () => void;
}

const LessonDetail: React.FC<Props> = ({ lesson, module, onBack }) => {
  const [aiContent, setAiContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generateLessonPlan = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const model = 'gemini-2.5-flash';
      
      const prompt = `
      Create a humorous, dark-tech "Teaching Plan" for a middle school IoT class.
      Theme: "Smart Coffin" (Intelligent Tomb).
      
      Lesson Title: ${lesson.coffinTitle}
      Original Curriculum Title: ${lesson.originalTitle}
      Description: ${lesson.description}
      Module Tech Stack: ${module.techStack.join(', ')}
      
      Structure the response in Markdown:
      1. **Teaching Objective (The Dark Purpose)**: Funny but technical goal.
      2. **Hardware Preparation (Grave Goods)**: List sensors/devices needed.
      3. **Step-by-Step Procedure (Ritual)**: How to teach this concept using the coffin metaphor.
      4. **Classroom Warning**: A safety warning about "accidental resurrection" or "curse triggers".
      
      Keep it short, witty, and technical. Use emojis.
      `;

      const result = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });

      setAiContent(result.text || 'The spirits are silent today...');
    } catch (error) {
      console.error(error);
      setAiContent('Connection to the underworld (API) failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#050505] z-[100] overflow-y-auto animate-slide-up">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Navbar for Detail Page */}
      <div className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-emperor-gold group-hover:text-black transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="font-medium tracking-wide text-sm">返回陵墓大厅</span>
        </button>
        <div className="flex items-center gap-2">
             <button className="p-2.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-emperor-gold transition-colors" title="Share Curse">
                <Share2 size={18} />
             </button>
             <button className="p-2.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-emperor-gold transition-colors" title="Download Scrolls">
                <Download size={18} />
             </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 pb-32 relative z-10">
        {/* Hero Section */}
        <div className="mb-16 relative">
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-emperor-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="flex items-start justify-between">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-6 animate-fade-in">
                        <span className="inline-block px-3 py-1 rounded-full bg-jade-green/10 text-jade-green text-xs font-mono border border-jade-green/20">
                            {module.grade}
                        </span>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs font-mono border border-white/10">
                            MODULE: {module.id.split('-')[1].toUpperCase()}
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight animate-slide-up">
                        {lesson.coffinTitle}
                    </h1>
                    
                    <h2 className="text-xl text-gray-500 font-light flex items-center gap-3 mt-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <span className="w-8 h-[1px] bg-gray-600"></span>
                        原课题：{lesson.originalTitle}
                    </h2>
                </div>
                <div className="hidden md:block opacity-10">
                    <Skull size={180} />
                </div>
            </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Context (8 cols) */}
            <div className="lg:col-span-8 space-y-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                {/* Scenario Card */}
                <div className="bg-[#0f0f0f] p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden group hover:border-gray-700 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <BookOpen size={150} />
                    </div>
                    <h3 className="text-lg font-bold text-emperor-gold mb-6 flex items-center gap-3 uppercase tracking-wider">
                        <span className="w-2 h-2 bg-emperor-gold rounded-full"></span>
                        场景描述 (Scenario)
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed font-light">
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

                {/* AI Generated Content Area */}
                <div className="min-h-[400px] bg-[#0f0f0f] rounded-2xl border border-dashed border-gray-800 p-1 relative transition-all duration-500 hover:border-gray-700">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                    <div className="h-full w-full rounded-xl bg-[#0f0f0f] p-8 relative overflow-hidden">
                    
                    {!aiContent ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12">
                            <div className="bg-emperor-gold/5 p-6 rounded-full mb-6 animate-pulse-slow">
                                <Sparkles className="text-emperor-gold" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">唤醒秦大爷 (AI)</h3>
                            <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                                让赛博守陵人为您撰写一份独一无二的、充满黑色幽默的教学教案。
                            </p>
                            <button 
                                onClick={generateLessonPlan}
                                disabled={loading}
                                className="group relative bg-white text-black font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-emperor-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative z-10 flex items-center gap-2">
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                            正在通灵...
                                        </>
                                    ) : (
                                        <>
                                            <Terminal size={18} />
                                            生成教案 (Generate Plan)
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emperor-gold to-white flex items-center gap-2">
                                    <Sparkles size={18} className="text-emperor-gold" />
                                    智能教案 (AI Generated)
                                </h3>
                                <button onClick={() => setAiContent('')} className="text-xs text-gray-500 hover:text-white transition-colors border border-gray-800 px-3 py-1 rounded hover:border-gray-600">
                                    清除重置
                                </button>
                            </div>
                            <div className="prose prose-invert prose-emperor max-w-none">
                                {aiContent.split('\n').map((line, i) => {
                                    if (line.startsWith('##')) return <h3 key={i} className="text-xl font-bold text-white mt-8 mb-4 border-l-2 border-emperor-gold pl-4">{line.replace('##', '')}</h3>;
                                    if (line.startsWith('**')) return <div key={i} className="bg-[#1a1a1a] p-4 rounded-lg my-4 border border-gray-800"><strong className="block text-emperor-gold mb-1">{line.replace(/\*\*/g, '').split(':')[0]}</strong><span className="text-gray-400 text-sm">{line.split(':')[1]}</span></div>;
                                    if (line.startsWith('-')) return <li key={i} className="text-gray-400 ml-4 list-disc mb-2">{line.replace('-', '')}</li>;
                                    return <p key={i} className="text-gray-300 mb-3 leading-relaxed">{line}</p>;
                                })}
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
                        教学要点 (Key Points)
                    </h4>
                    <div className="relative border-l border-gray-800 ml-2 space-y-8 pl-6 pb-2">
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-[#121212] border-2 border-jade-green"></span>
                            <h5 className="text-gray-200 text-sm font-bold mb-1">输入 (Input)</h5>
                            <p className="text-gray-500 text-xs">外部触发条件监测，如盗墓震动、光线变化。</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-[#121212] border-2 border-jade-green"></span>
                            <h5 className="text-gray-200 text-sm font-bold mb-1">处理 (Process)</h5>
                            <p className="text-gray-500 text-xs">微控制器逻辑判断，执行IF-THEN规则。</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-[#121212] border-2 border-jade-green"></span>
                            <h5 className="text-gray-200 text-sm font-bold mb-1">输出 (Output)</h5>
                            <p className="text-gray-500 text-xs">物理世界执行反馈，如机关触发、警报发送。</p>
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