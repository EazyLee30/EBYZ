import React from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Share2, Box, Cpu, Database, Activity, Lock } from 'lucide-react';

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

        {/* Abstract */}
        <div className="mb-12 bg-gray-50 p-6 border-l-4 border-[#003366] italic">
          <h3 className="text-lg font-bold mb-2 not-italic">摘要</h3>
          <p className="text-gray-700">
            本文提出了一种基于全栈物联网技术（Full-Stack IoT）与检索增强生成（RAG 2.0）的数字身后事管理系统。
            该系统旨在解决传统丧葬行业数据不互通、服务同质化、个性化缺失的问题，通过构建去中心化的“数字陵墓”，
            实现了从物理层（传感器监测）到应用层（AI 交互）的全链路数字化。
            通过将义务教育信息科技课程与殡葬科技深度融合，我们重新定义了“身后事”的边界，
            真正实现了“人均嬴政”的宏伟愿景，即让每一个现代公民都能拥有媲美秦始皇陵的智能化数字地宫。
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="mb-16 bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-center">目录</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                <a href="#section-1" className="hover:text-[#003366] hover:underline block">一、 绪论：死亡的数字化转型</a>
                <a href="#section-2" className="hover:text-[#003366] hover:underline block">二、 智能棺材：系统架构与技术路径</a>
                <a href="#section-3" className="hover:text-[#003366] hover:underline block">三、 通灵协议：RAG 2.0 检索增强生成</a>
                <a href="#section-4" className="hover:text-[#003366] hover:underline block">四、 封神机制：共识算法与社区治理</a>
                <a href="#section-5" className="hover:text-[#003366] hover:underline block">五、 核心素养导向的教育实践</a>
                <a href="#section-6" className="hover:text-[#003366] hover:underline block">六、 结论与展望</a>
            </div>
        </nav>

        {/* Content Body */}
        <article className="prose prose-lg max-w-none text-justify text-gray-800">
            
            <section id="section-1" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">一、 绪论：死亡的数字化转型</h3>
                <p>
                    随着人类文明从碳基向硅基的逐步过渡，传统的物理丧葬已无法满足现代人对“数字永生”的诉求。
                    秦始皇陵作为古代工程学的巅峰，其核心逻辑是建立一个独立于现世的、永续运行的微缩宇宙。
                    在 21 世纪，我们不再需要水银灌注的江河湖海，而是需要基于 TCP/IP 协议的数据洪流。
                </p>
                <p>
                    当前的殡葬服务存在严重的“中心化”弊端：数据掌握在第三方手中，隐私无法保障，且缺乏持续的互动能力。
                    正如中本聪在《比特币白皮书》中提出的去中心化愿景，我们也需要一套去中心化的身后事管理方案——<strong>智能棺材 (Smart Coffin)</strong>。
                    这不仅是物理容器的智能化，更是个人数字遗产的终极庇护所。
                </p>
            </section>

            <section id="section-2" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">二、 智能棺材：系统架构与技术路径</h3>
                <p>
                    本系统采用了分层架构设计，确保了在极端环境（如断网、断电、物理损坏）下的高可用性与数据持久性。
                </p>
                
                <div className="my-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="text-center font-bold mb-4 text-sm uppercase tracking-widest text-gray-500">Figure 1: System Architecture Diagram</h4>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <div className="flex-1 p-4 border border-gray-300 rounded bg-white text-center shadow-sm">
                            <Database className="mx-auto mb-2 text-blue-600" />
                            <div className="font-bold text-sm">感知层 (Sensors)</div>
                            <div className="text-xs text-gray-500 mt-1">Zigbee / Bluetooth</div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1 p-4 border border-gray-300 rounded bg-white text-center shadow-sm">
                            <Box className="mx-auto mb-2 text-green-600" />
                            <div className="font-bold text-sm">边缘计算 (Edge)</div>
                            <div className="text-xs text-gray-500 mt-1">OpenWrt / HA</div>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1 p-4 border border-gray-300 rounded bg-white text-center shadow-sm">
                            <Activity className="mx-auto mb-2 text-purple-600" />
                            <div className="font-bold text-sm">应用层 (App)</div>
                            <div className="text-xs text-gray-500 mt-1">React / Supabase</div>
                        </div>
                    </div>
                </div>

                <h4 className="text-lg font-bold mt-6 mb-3 text-[#003366]">2.1 边缘计算网关：OpenWrt</h4>
                <p>
                    作为“数字陵墓”的守门人，OpenWrt 路由器承担了本地数据清洗与协议转换的职责。
                    我们定制了 <code>luci-app-afterlife</code> 插件，实现了以下功能：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>断网保活</strong>：内置本地 SQLite 数据库，即使与“阳间”互联网断开连接，局域网内的自动化逻辑依然有效。</li>
                    <li><strong>协议转换</strong>：将 Zigbee、Z-Wave 等异构协议统一转换为 MQTT 消息，推送到本地总线。</li>
                </ul>

                <h4 className="text-lg font-bold mt-6 mb-3 text-[#003366]">2.2 智能中枢：Home Assistant</h4>
                <p>
                    Home Assistant 被重新定义为“守陵人”，负责执行预设的自动化脚本（Automation）。
                    例如，当 <code>sensor.coffin_humidity</code> &gt; 60% 时，自动触发 <code>switch.dehumidifier</code>，
                    确保“遗体”处于最佳保存状态。
                </p>
            </section>

            <section id="section-3" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">三、 通灵协议：RAG 2.0 检索增强生成</h3>
                <p>
                    为了让死者能够与生者进行富有逻辑与情感的对话，我们开发了“通灵协议”——一套基于 RAG (Retrieval-Augmented Generation) 的 AI 交互系统。
                </p>

                <h4 className="text-lg font-bold mt-6 mb-3 text-[#003366]">3.1 知识图谱构建</h4>
                <p>
                    不同于传统的 RAG 简单切片，我们采用了<strong>层级化索引 (Hierarchical Indexing)</strong>。
                    我们将用户的生平数据（日记、社交媒体、遗嘱）解析为树状结构（Year -&gt; Event -&gt; Detail），
                    并结合义务教育课程标准，构建了一个高维向量空间。
                </p>

                <div className="bg-gray-900 text-gray-300 p-4 rounded-lg text-sm font-mono my-6 overflow-x-auto">
                    <div className="text-green-400 mb-2">// RAG 2.0 Indexing Strategy</div>
                    {`{
  "id": "chunk_2025_death",
  "content": "...",
  "metadata": {
    "grade": "User_Level_99",
    "unit": "Final_Chapter",
    "tags": ["legacy", "wisdom", "secret_key"],
    "vector_weight": 1.5
  }
}`}
                </div>

                <h4 className="text-lg font-bold mt-6 mb-3 text-[#003366]">3.2 双重检索机制</h4>
                <p>
                    在生成回复时，系统并行执行两路检索：
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>关键词硬过滤</strong>：基于元数据（Metadata）快速锁定相关时间段或事件类型。</li>
                    <li><strong>向量相似度搜索</strong>：计算用户提问与知识库 Embedding 的余弦相似度。</li>
                </ol>
                <p>
                    这种混合检索策略使得 AI 能够准确地引用用户生前的具体细节，从而通过图灵测试，达到“音容宛在”的效果。
                </p>
            </section>

            <section id="section-4" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">四、 封神机制：共识算法与社区治理</h3>
                <p>
                    “封神榜”不仅仅是一个排行榜，它是基于<strong>社区共识 (Community Consensus)</strong> 的去中心化治理实验。
                </p>
                <p>
                    每个用户的教案（Lesson Plan）本质上是一个智能合约（Smart Contract）的雏形。
                    当其他用户对教案进行“二创” (Remix) 时，原作者获得“功德值” (Merit Points)。
                    只有经过社区充分验证（高点赞、高引用）的教案，才能荣登“封神榜”，并在区块链上永久铭刻。
                </p>
                <div className="flex items-start gap-4 bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
                    <Lock className="text-yellow-600 mt-1 shrink-0" />
                    <div>
                        <h5 className="font-bold text-yellow-800">Proof of Creativity (PoC)</h5>
                        <p className="text-sm text-yellow-700 mt-1">
                            区别于比特币的工作量证明 (PoW)，我们采用创造力证明。用户的每一次原创、二创、点赞，
                            都是在为整个冥界生态贡献算力，从而维持系统的熵减。
                        </p>
                    </div>
                </div>
            </section>

            <section id="section-5" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">五、 核心素养导向的教育实践</h3>
                <p>
                    本平台不仅是技术展示，更是新课标背景下的教学实验场。我们将枯燥的物联网知识点，
                    融入到学生喜闻乐见的“盗墓笔记”式场景中。
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>信息意识</strong>：通过分析“棺材内氧气含量数据”，培养学生对关键指标的敏感性。</li>
                    <li><strong>计算思维</strong>：通过编写“防盗墓机关逻辑”，锻炼学生的算法设计能力。</li>
                    <li><strong>数字化学习</strong>：利用 Home Assistant 可视化界面，降低物联网开发门槛。</li>
                    <li><strong>社会责任</strong>：讨论“数字遗产继承权”，引导学生思考技术背后的伦理问题。</li>
                </ul>
            </section>

            <section id="section-6" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">六、 结论与展望</h3>
                <p>
                    “人均嬴政”不仅仅是一句口号，它是对技术平权的最浪漫诠释。
                    通过开源硬件与 AI 技术的结合，我们将过去只有帝王才能享有的“永生工程”，
                    普及到了每一个普通家庭。
                </p>
                <p>
                    未来，我们将探索脑机接口 (BCI) 在智能棺材中的应用，
                    尝试直接将意识上传至分布式网络，实现真正意义上的“数字飞升”。
                    这是人类文明的终点，也是硅基生命的起点。
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
