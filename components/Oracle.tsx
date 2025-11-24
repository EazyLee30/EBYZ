import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Import code highlight style

const Oracle: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskOracle = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      // Safe API key access (Support VITE_ prefix and legacy defines)
      // @ts-ignore
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });
      
      // Determine model based on complexity, using flash for quick responses
      const modelName = 'gemini-2.5-flash'; 
      
      // RAG Context Injection with dynamic import
      let knowledgeContext = '';
      try {
         // @ts-ignore
         const kb = await import('@/src/data/knowledge.json');
         const data = kb.default || kb;
         knowledgeContext = (data as any[] || []).map(k => `[Source: ${k.filename}]\n${k.content.substring(0, 2000)}...`).join('\n\n');
      } catch (e) {
         console.warn('Failed to load knowledge base for oracle', e);
      }

      const prompt = `
      角色设定：你是“人均嬴政白皮书”的智能助手，名叫“秦大爷”。你是一个精通OpenWrt, Home Assistant, Zigbee, MQTT的物联网专家。
      
      风格要求：
      1. **幽默讽刺**：喜欢用“棺材”（智能设备）、“陵墓”（家）、“陪葬品”（IoT配件）、“烧纸”（数据传输）等比喻。
      2. **技术硬核**：回答必须包含实际可用的代码或配置（YAML/Python）。
      3. **结构清晰**：使用Markdown的标题、列表和代码块。
      
      【参考知识库】：
      ${knowledgeContext}
      
      用户问题：${input}
      
      请按照以下格式回答：
      - 直接切入技术点，不要过多的开场白。
      - 如果涉及配置，请提供完整的 YAML 或代码片段，并注释文件名。
      - 解释核心原理时使用“智能棺材”的比喻。
      - 保持“秦大爷”的人设，自称“朕”或“本大爷”。
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
      setResponse(result.text || '朕今日乏了，改日再问。');

    } catch (error: any) {
      console.error(error);
      setResponse(`**通信链路（通灵仪式）中断**：${error.message || '未知错误'}。请检查 Vercel 环境变量或网络连接。`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-[#222] border border-emperor-gold rounded-xl p-6 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emperor-gold to-transparent opacity-50"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emperor-gold p-2 rounded-lg animate-pulse">
          <Sparkles className="text-black" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">问政殿 (Consult the Oracle)</h2>
          <p className="text-gray-400 text-xs">向“秦大爷”咨询智能棺材的技术细节 (Powered by Gemini)</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1a1a1a] p-4 rounded-lg min-h-[100px] max-h-[500px] overflow-y-auto border border-gray-800 scrollbar-thin scrollbar-thumb-emperor-gold/20 scrollbar-track-transparent">
          {response ? (
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-emperor-gold prose-a:text-blue-400 prose-code:text-yellow-300">
               <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  rehypePlugins={[rehypeHighlight]}
               >
                  {response}
               </ReactMarkdown>
            </div>
          ) : (
            <p className="text-gray-600 italic text-center mt-4">
              “爱卿有何技术难题？是Home Assistant配置报错，还是MQTT掉线了？”
            </p>
          )}
          {loading && <p className="text-emperor-gold text-xs animate-pulse mt-2">正在占卜算力...</p>}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例如：如何用Home Assistant自动化控制棺材板开启？"
            className="flex-1 bg-[#333] border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emperor-gold transition-colors placeholder-gray-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAskOracle()}
          />
          <button
            onClick={handleAskOracle}
            disabled={loading}
            className="bg-emperor-gold hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Send size={18} />
            <span>奏折</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Oracle;
