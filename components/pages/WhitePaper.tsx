import React from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Share2 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const WhitePaper: React.FC<Props> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[5000] bg-[#f5f5f5] overflow-y-auto text-gray-900 font-serif"
    >
      {/* Official Header Bar - Imitating Government Style */}
      <div className="sticky top-0 z-50 bg-[#003366] text-white shadow-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-yellow-400 flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-xs">秦</span>
                </div>
                <h1 className="text-lg md:text-xl font-bold tracking-widest font-sans">
                    人均嬴政白皮书 <span className="opacity-60 text-sm font-normal ml-2">| 智能棺材全栈物联网教学平台</span>
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => window.print()}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="打印全文"
                >
                    <Printer size={20} />
                </button>
                <button 
                    onClick={onBack}
                    className="p-2 hover:bg-red-600 rounded-full transition-colors"
                    title="关闭"
                >
                    <X size={24} />
                </button>
            </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-[900px] mx-auto bg-white shadow-xl min-h-screen my-8 p-12 md:p-20 relative">
        
        {/* Watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden">
            <div className="text-[200px] font-bold rotate-[-45deg] select-none">EBYZ</div>
        </div>

        {/* Document Header */}
        <header className="text-center mb-16 border-b-2 border-red-600 pb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-black leading-tight">
                新时代人均嬴政的成功实践白皮书
            </h1>
            <div className="flex flex-col items-center gap-2 text-gray-600">
                <p className="text-lg">（2025年11月）</p>
                <p className="font-bold text-black">冥界特别行政区 · 沪上嘻嘻生</p>
                <p>冥府最高新闻发布署 发布</p>
            </div>
        </header>

        {/* Table of Contents */}
        <nav className="mb-16 bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-center">目录</h3>
            <ul className="space-y-3 text-base leading-relaxed">
                <li><a href="#preface" className="hover:text-[#003366] hover:underline">前言</a></li>
                <li><a href="#section-1" className="hover:text-[#003366] hover:underline">一、 历史上秦始皇陵与现代智能家居的辩证统一</a></li>
                <li><a href="#section-2" className="hover:text-[#003366] hover:underline">二、 智能棺材全栈物联网架构解析</a></li>
                <li><a href="#section-3" className="hover:text-[#003366] hover:underline">三、 RAG 2.0：检索增强生成的教育应用实践</a></li>
                <li><a href="#section-4" className="hover:text-[#003366] hover:underline">四、 核心素养导向的身后事管理</a></li>
                <li><a href="#section-5" className="hover:text-[#003366] hover:underline">五、 结束语</a></li>
            </ul>
        </nav>

        {/* Content Body */}
        <article className="prose prose-lg max-w-none text-justify text-gray-800">
            
            <section id="preface" className="mb-12">
                <h3 className="text-2xl font-bold mb-4 text-black">前言</h3>
                <p>
                    随着老龄化社会的到来与物联网技术的飞速发展，如何将“生前事”与“身后事”进行数字化打通，成为新时代面临的重要课题。
                    秦始皇作为“人均嬴政”精神的图腾，其陵墓建设体现了古代最高的工程学成就与对永生的终极追求。
                    本白皮书旨在阐述如何利用现代全栈物联网技术（OpenWrt, Home Assistant, Supabase），重构义务教育信息科技课程，
                    打造一套“永不掉线”的数字陵墓系统，实现每个人的“嬴政梦”。
                </p>
            </section>

            <section id="section-1" className="mb-12">
                <h3 className="text-2xl font-bold mb-4 text-black">一、 历史上秦始皇陵与现代智能家居的辩证统一</h3>
                <p>
                    把治理新疆置于国家治理全局，正如把治理身后事置于人生规划全局。
                    有人问：“私人还要监管内部吗，这不合理。” 那我请问了，秦始皇陵墓怎么造的？
                    智能棺材要建立防御机制，从而引出物联网核心概念——<strong>反馈机制</strong>：
                    <span className="block bg-gray-100 p-2 my-2 text-center font-mono text-sm">输入 (Input) → 处理 (Process) → 输出 (Output) → 反馈 (Feedback)</span>
                </p>
                <p>
                    通过实时监控棺材板，讨论信息社会责任：有摄像头监控好不好？内部温湿度是否合理？是否需要加入继电器控制空调？
                    这不仅是技术问题，更是价值观的终极思考。我们要有危机意识，用发展的眼光看待世界，直接看到终点——世界的尽头。
                </p>
            </section>

            <section id="section-2" className="mb-12">
                <h3 className="text-2xl font-bold mb-4 text-black">二、 智能棺材全栈物联网架构解析</h3>
                <p>
                    我们将复杂的物联网技术栈映射到“陵墓”场景中，构建了坚不可摧的数字地宫：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>陵墓网关 (OpenWrt)</strong>：作为地宫的咽喉，确保在断网（阴阳两隔）情况下，局域网内部依然存活，数据不丢失。</li>
                    <li><strong>守陵人 (Home Assistant)</strong>：智能中枢大脑，统筹管理所有 Zigbee/WiFi 设备（陪葬品），执行自动化逻辑。</li>
                    <li><strong>通灵符咒 (MQTT)</strong>：轻量级发布/订阅协议，即使在网络环境极差的情况下也能可靠传递消息（遗嘱）。</li>
                    <li><strong>长明灯 (Zigbee)</strong>：低功耗、Mesh组网技术，确保传感器千年不掉线，守护地宫安宁。</li>
                </ul>
            </section>

            <section id="section-3" className="mb-12">
                <h3 className="text-2xl font-bold mb-4 text-black">三、 RAG 2.0：检索增强生成的教育应用实践</h3>
                <p>
                    本项目创新性地引入了 RAG 2.0 (Retrieval-Augmented Generation) 技术，摒弃千篇一律的模板，每一份教案都是现场“通灵”生成。
                </p>
                <p>
                    <strong>层级化索引 (Hierarchical Indexing)</strong>：不再使用传统的全文切片，而是基于 PDF 文档结构（年级-单元-课）构建知识图谱。
                    结合 <strong>元数据硬过滤 (Metadata Filtering)</strong>，生成教案时，系统会瞬间锁定对应年级和单元的教科书内容，排除 90% 的无关干扰。
                    这种双重检索算法，确保了 AI 获得的上下文既精准又完整，生成速度提升 300%。
                </p>
            </section>

            <section id="section-4" className="mb-12">
                <h3 className="text-2xl font-bold mb-4 text-black">四、 核心素养导向的身后事管理</h3>
                <p>
                    每一份教案都紧扣信息科技学科的四个核心素养：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>信息意识</strong>：对信息的敏感度与价值判断（例如：为何要监测棺内温湿度？）。</li>
                    <li><strong>计算思维</strong>：运用计算机科学领域的思想方法解决问题（例如：如何设计防盗墓的逻辑算法？）。</li>
                    <li><strong>数字化学习与创新</strong>：利用数字化工具进行探究与创作（例如：使用 Home Assistant 搭建自动化流程）。</li>
                    <li><strong>信息社会责任</strong>：在信息社会中的文化修养与道德规范（例如：数字遗产的隐私保护与伦理）。</li>
                </ul>
            </section>

            <section id="section-5" className="mb-12">
                <h3 className="text-2xl font-bold mb-4 text-black">五、 结束语</h3>
                <p>
                    人均嬴政白皮书的发布，标志着智能棺材全栈物联网教学平台进入了新的发展阶段。
                    我们将继续秉持“讲好棺材故事，贡献棺材方案，享受棺材人生”的座右铭，
                    推动信息科技教育与身后事管理的深度融合，为实现中华民族伟大复兴的数字永生梦贡献力量。
                </p>
            </section>

        </article>
        
        {/* Footer Seal */}
        <div className="mt-20 flex justify-end">
            <div className="relative">
                <div className="text-center space-y-2 z-10 relative">
                    <p className="font-bold text-lg">冥府最高新闻发布署</p>
                    <p className="text-gray-600">2025年11月26日</p>
                </div>
                {/* Red Seal Stamp */}
                <div className="absolute top-[-20px] left-[-20px] w-32 h-32 border-4 border-red-600 rounded-full flex items-center justify-center opacity-80 rotate-[-15deg] pointer-events-none mix-blend-multiply">
                    <div className="w-24 h-24 border-2 border-red-600 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-xs text-center leading-none block transform scale-x-75">
                            人均嬴政<br/>白皮书<br/>专用章
                        </span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </motion.div>
  );
};

export default WhitePaper;

