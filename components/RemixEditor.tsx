import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, BookOpen, Cpu, Skull, Sparkles, AlertTriangle, Share2, Download, Terminal, Scroll, Send, Copy, FileText, Edit2, Save } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { supabase } from '../lib/supabase';
import { Auth } from './Auth';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  initialContent?: string;
  initialTitle?: string;
  initialGrade?: string;
  onBack: () => void;
}

const RemixEditor: React.FC<Props> = ({ initialContent = '', initialTitle = '', initialGrade = '', onBack }) => {
  const [aiContent, setAiContent] = useState<string>(initialContent);
  const [customPrompt, setCustomPrompt] = useState('');
  const [title, setTitle] = useState(initialTitle || '我的二创教案');
  const [grade, setGrade] = useState(initialGrade || '六年级');
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const generateRemix = async () => {
    if (!user) {
        setShowAuthModal(true);
        return;
    }

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
      
      const prompt = `
      请基于以下教案内容进行**二创（Remix）**或优化。
      目标：保持原教案的核心主题，但根据用户的新要求进行调整。
      
      【原教案内容】：
      ${aiContent.substring(0, 5000)}... (截断以防过长)
      
      【当前标题】：${title}
      【适用年级】：${grade}
      
      【用户二创要求 (Custom Prompt)】：
      ${customPrompt ? customPrompt : '请优化语言，增加更多互动环节，使其更加生动有趣。'}

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
         - **## 二、教学目标**
         - **## 三、教学重难点**
         - **## 四、教学创新点**
         - **## 五、法器准备 (教学资源)**
         - **## 六、教学仪式 (教学过程)**
         - **## 七、代码符咒 (核心代码示例)**
         - **## 八、防诈尸警告 (安全与伦理)**
         
      4. **风格要求**：保持“智能棺材/陵墓”的阴间风格隐喻。
      `;

      // Use Vercel Serverless Proxy
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      setAiContent(`通灵仪式中断：${error.message || '未知错误'}。`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!aiContent) return;
    navigator.clipboard.writeText(aiContent).then(() => {
        alert("教案内容已复制到剪贴板（法器）！");
    });
  };

  const handleDownloadMarkdown = () => {
    if (!aiContent) return;
    const blob = new Blob([aiContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}_Remix.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePublish = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!aiContent) {
      alert('内容为空，无法发布！');
      return;
    }

    setPublishing(true);
    try {
      const { error } = await supabase.from('posts').insert([
        {
          title: title,
          grade: grade,
          content: { markdown: aiContent, published: true, is_remix: true },
          user_id: user.id,
          location: 'Unknown (Web)',
        }
      ]);

      if (error) throw error;
      alert('二创发布成功！已进入冥界封神榜。');
    } catch (error: any) {
      console.error('Publish failed:', error);
      alert(`发布失败：${error.message}`);
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
      if (!user) return setShowAuthModal(true);
      try {
          const { error } = await supabase.from('posts').insert([
              {
                  title: title,
                  grade: grade,
                  content: { markdown: aiContent, published: false, is_remix: true },
                  user_id: user.id,
                  location: 'Unknown (Web)',
              }
          ]);
          if (error) throw error;
          alert('已保存草稿到个人档案！');
      } catch (e: any) {
          console.error(e);
          alert('保存失败：' + e.message);
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
        <div className="flex items-center gap-4">
            <button 
            onClick={onBack}
            className="group flex items-center gap-2 md:gap-3 text-gray-400 hover:text-white transition-colors"
            >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-emperor-gold group-hover:text-black transition-all">
                <ArrowLeft size={18} />
            </div>
            <span className="font-medium tracking-wide text-sm hidden md:inline">放弃二创</span>
            </button>
            <span className="text-emperor-gold font-bold text-sm tracking-widest border border-emperor-gold/30 px-3 py-1 rounded-full bg-emperor-gold/5">
                REMIX MODE
            </span>
        </div>

        <div className="flex items-center gap-2">
            <button 
                onClick={handlePublish}
                disabled={publishing}
                className="p-2.5 rounded-lg bg-jade-green/10 text-jade-green hover:bg-jade-green hover:text-black transition-all flex items-center gap-2 border border-jade-green/30" 
            >
                {publishing ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    <Send size={18} />
                )}
                <span className="text-xs font-bold hidden md:inline">发布二创</span>
            </button>
            
            <button 
                onClick={handleSaveDraft}
                className="p-2.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-emperor-gold transition-colors flex items-center gap-2" 
            >
                <Save size={18} />
                <span className="text-xs font-bold hidden md:inline">存草稿</span>
            </button>

            <button 
                onClick={handleDownloadMarkdown}
                className="p-2.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-emperor-gold transition-colors flex items-center gap-2" 
            >
                <FileText size={18} />
            </button>
        </div>
      </div>

      {/* Auth Modal Overlay */}
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
        
        {/* Editor Header */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-end border-b border-white/10 pb-10">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    课题名称 (Title)
                </label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent text-3xl md:text-5xl font-serif font-bold text-white border-none focus:ring-0 p-0 placeholder-gray-700"
                    placeholder="输入课题名称..."
                />
            </div>
            <div className="flex gap-4">
                 <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                        适用年级 (Grade)
                    </label>
                    <input 
                        type="text" 
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emperor-gold transition-colors"
                        placeholder="例如：七年级"
                    />
                 </div>
            </div>
        </div>

        {/* AI Control Panel */}
        <div className="mb-10 bg-[#0f0f0f] rounded-2xl border border-dashed border-gray-800 p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="text-purple-400" size={18} />
                二创咒语 (Remix Prompt)
            </h3>
            <textarea 
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="你想如何修改这份教案？例如：'增加更多关于传感器的小组讨论'，或者 '把风格变得更加赛博朋克'..."
                className="w-full bg-[#151515] border border-gray-800 rounded-lg p-4 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-emperor-gold/50 focus:ring-1 focus:ring-emperor-gold/50 transition-all min-h-[100px] resize-y mb-6"
            />
            <button 
                onClick={generateRemix}
                disabled={loading}
                className="w-full md:w-auto bg-purple-900/20 hover:bg-purple-900/40 text-purple-200 border border-purple-500/30 px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
                {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> : <Terminal size={16} />}
                {loading ? 'AI 正在重构现实...' : '生成二创内容 (AI Remix)'}
            </button>
        </div>

        {/* Content Editor/Preview */}
        <div className="bg-[#0f0f0f] rounded-xl border border-white/10 p-6 md:p-8 min-h-[500px]">
            <div ref={contentRef} className="prose prose-invert prose-emperor max-w-none prose-headings:text-emperor-gold prose-ul:list-disc prose-ul:ml-4 prose-ol:list-decimal prose-ol:ml-4 prose-a:text-jade-green hover:prose-a:text-white prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-purple-300 prose-pre:bg-[#080808] prose-pre:border prose-pre:border-white/10 overflow-x-auto">
                {aiContent ? (
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {aiContent}
                    </ReactMarkdown>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-600">
                        <p>暂无内容，请点击上方按钮生成。</p>
                    </div>
                )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button 
                    onClick={handleCopyMarkdown}
                    className="text-xs text-gray-500 hover:text-white flex items-center gap-2 transition-colors"
                >
                    <Copy size={12} /> 手动复制原始内容
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default RemixEditor;
