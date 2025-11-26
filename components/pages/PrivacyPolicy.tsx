import React from 'react';
import { ArrowLeft, Shield, Skull, Eye, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<Props> = ({ onBack }) => {
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
                <Shield className="text-emperor-gold" size={36} />
                隐私政策 (Privacy Policy)
            </h1>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                LAST UPDATED: 221 BC
            </p>
        </div>

        <div className="space-y-12 text-gray-300 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Eye className="text-jade-green" size={24} />
                    1. 数据收集 (Data Collection)
                </h2>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <p className="mb-4">
                        当您使用“人均嬴政白皮书”平台时，我们将收集以下信息以确保您的数字陵墓正常运转：
                    </p>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>灵魂标识 (Identity):</strong> 您的邮箱地址、GitHub 账号或 Google 账号信息。</li>
                        <li><strong>行为轨迹 (Behavior):</strong> 您生成的教案内容、点赞记录以及二创历史。</li>
                        <li><strong>生物特征 (Biometrics):</strong> 暂不收集您的面部数据（兵马俑生成功能尚未上线）。</li>
                    </ul>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Lock className="text-jade-green" size={24} />
                    2. 数据存储与安全 (Storage & Security)
                </h2>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <p className="mb-4">
                        所有数据均存储于 <strong>Supabase</strong> 提供的加密服务器中（代号：地宫一号）。
                    </p>
                    <p className="mb-4">
                        我们承诺：
                    </p>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li>绝不向阳间任何第三方广告商出售您的个人信息。</li>
                        <li>只有经过授权的守陵人（管理员）和您自己拥有修改档案的权限（RLS 策略保护）。</li>
                        <li>一旦您点击“销毁”按钮，数据将在物理层面被彻底抹除，无法复活。</li>
                    </ul>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Skull className="text-jade-green" size={24} />
                    3. 逝者权利 (Rights of the Deceased)
                </h2>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <p>您拥有以下绝对权利：</p>
                    <ul className="list-disc ml-6 space-y-2 mt-4 text-gray-400">
                        <li><strong>访问权：</strong>随时查看您的“生死簿”档案。</li>
                        <li><strong>遗忘权：</strong>要求彻底删除您的所有账号信息和生成内容。</li>
                        <li><strong>抗议权：</strong>如果您觉得 AI 生成的教案不够阴间，有权要求重写。</li>
                    </ul>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
