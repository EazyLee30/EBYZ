import React from 'react';
import { ArrowLeft, Scroll, Scale, AlertTriangle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const TermsOfAfterlife: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-[6000] overflow-y-auto bg-[#050505] text-white p-4 md:p-8">
       {/* Background Pattern */}
       <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
             backgroundSize: '40px 40px'
           }}>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 pt-12">
        <div className="mb-12">
            <button 
                onClick={onBack}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-emperor-gold transition-colors flex items-center gap-2 px-4 mb-6"
            >
                <ArrowLeft size={18} />
                <span className="text-sm font-bold">返回</span>
            </button>
            <h1 className="text-4xl font-serif font-bold text-white mb-4 flex items-center gap-3">
                <Scroll className="text-emperor-gold" size={36} />
                冥界条款 (Terms of Afterlife)
            </h1>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                AGREEMENT ID: QIN-001
            </p>
        </div>

        <div className="space-y-12 text-gray-300 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Scale className="text-purple-400" size={24} />
                    1. 服务接纳 (Acceptance)
                </h2>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <p>
                        当您点击“登录”或开始生成教案时，即表示您已阅读并同意本协议。
                        本协议在您肉身消亡后依然有效，直至您的数字意识彻底消散。
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-purple-400" size={24} />
                    2. 免责声明 (Disclaimer)
                </h2>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 space-y-4">
                    <p>
                        <strong>AI 幻觉：</strong> 本平台的“通灵”功能（AI 生成）基于 Google Gemini 模型。
                        如果 AI 生成了关于“秦始皇打钱”或“兵马俑复活”的内容，请将其视为赛博朋克文学创作，而非历史事实。
                    </p>
                    <p>
                        <strong>硬件兼容性：</strong> 我们提供的 OpenWrt 固件教程仅供参考。
                        如果您在刷机过程中导致路由器变砖（Brick），本平台概不负责（但建议将其作为陪葬品之一）。
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                    3. 社区准则 (Code of Conduct)
                </h2>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>禁止亵渎：</strong> 请勿上传包含暴力、色情或恶意攻击的教案内容。</li>
                        <li><strong>尊重先烈：</strong> 二创时请保持对原作者的尊重，不得恶意篡改核心逻辑。</li>
                        <li><strong>刷票行为：</strong> 严禁使用脚本进行刷票（Likes）。违者将被打入数字冷宫（Ban IP）。</li>
                    </ul>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfAfterlife;
