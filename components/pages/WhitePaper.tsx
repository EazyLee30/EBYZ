import React from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Share2, Box, Cpu, Database, Activity, Lock, Network, Server, Code, Download } from 'lucide-react';

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
      <div className="sticky top-0 z-50 bg-[#003366] text-white shadow-md print:hidden">
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
                <div className="flex items-center gap-3 border-r border-white/20 pr-4">
                    <a
                        href="/paper.pdf"
                        download="人均嬴政白皮书.pdf"
                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded transition-colors text-sm"
                        title="下载白皮书PDF"
                    >
                        <Download size={18} />
                        <span className="hidden md:inline">白皮书</span>
                    </a>
                    <a
                        href="/academic_paper.pdf"
                        download="学术论文.pdf"
                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded transition-colors text-sm"
                        title="下载学术论文PDF"
                    >
                        <Download size={18} />
                        <span className="hidden md:inline">论文</span>
                    </a>
                </div>
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
      <div className="max-w-[900px] mx-auto bg-white shadow-xl min-h-screen my-8 p-12 md:p-20 relative print:shadow-none print:p-0 print:my-0">
        
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
          <p className="text-gray-700 leading-relaxed">
            本文提出了一种基于全栈物联网技术（Full-Stack IoT）与检索增强生成（RAG 2.0）的分布式数字身后事管理系统。
            该系统旨在解决传统丧葬行业数据孤岛化、服务同质化、隐私保护缺失的痛点，通过构建去中心化的“数字陵墓”，
            实现了从物理层（高精度传感器阵列）到应用层（生成式 AI 交互）的全链路数字化闭环。
            通过将义务教育信息科技课程（2022版）与殡葬科技深度融合，我们提出了一种全新的“项目式学习”（PBL）范式，
            重新定义了“身后事”的技术边界，真正实现了“人均嬴政”的宏伟愿景，即让每一个现代公民都能拥有媲美秦始皇陵的智能化、永续化数字地宫。
          </p>
          <p className="text-sm text-gray-500 mt-4">
             <strong>关键词：</strong> 智能棺材；全栈物联网；RAG 2.0；去中心化治理；数字永生
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="mb-16 bg-gray-50 p-8 rounded-lg border border-gray-200 print:hidden">
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
            
            {/* Section 1: Introduction */}
            <section id="section-1" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">一、 绪论：死亡的数字化转型</h3>
                <h4 className="text-xl font-bold mb-3 text-[#003366]">1.1 背景与挑战</h4>
                <p>
                    随着人类文明从碳基向硅基的逐步过渡，传统的物理丧葬已无法满足现代人对“数字永生”的诉求。
                    秦始皇陵作为古代工程学的巅峰，其核心逻辑是建立一个独立于现世的、永续运行的微缩宇宙。
                    在 21 世纪，我们不再需要水银灌注的江河湖海，而是需要基于 TCP/IP 协议的数据洪流。
                </p>
                <p>
                    当前的殡葬服务存在严重的“中心化”弊端：数据掌握在第三方手中，隐私无法保障，且缺乏持续的互动能力。
                    正如中本聪在《比特币白皮书》中提出的去中心化愿景，我们也需要一套去中心化的身后事管理方案——<strong>智能棺材 (Smart Coffin)</strong>。
                </p>
                
                <h4 className="text-xl font-bold mb-3 text-[#003366]">1.2 研究意义</h4>
                <p>
                    本研究旨在通过开源硬件与分布式软件架构，构建一个低成本、高可用的个人数字陵墓方案。
                    这不仅是对传统丧葬习俗的革新，更是对“数据主权”的一次终极捍卫。
                    通过“人均嬴政”计划，我们试图回答一个终极问题：在肉体消亡后，人类的意识能否以另一种形式在网络空间中永生？
                </p>
            </section>

            {/* Section 2: Architecture */}
            <section id="section-2" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">二、 智能棺材：系统架构与技术路径</h3>
                <p>
                    本系统采用了分层架构设计，确保了在极端环境（如断网、断电、物理损坏）下的高可用性与数据持久性。
                </p>
                
                <div className="my-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="text-center font-bold mb-4 text-sm uppercase tracking-widest text-gray-500">Figure 1: 全栈系统拓扑图</h4>
                    <div className="flex flex-col gap-6">
                        {/* Perception Layer */}
                        <div className="flex items-center gap-4">
                            <div className="w-24 font-bold text-right text-sm text-gray-500">感知层</div>
                            <div className="flex-1 flex gap-2">
                                <div className="flex-1 p-3 border border-blue-200 bg-blue-50 rounded text-center text-xs">
                                    <Activity className="mx-auto mb-1 text-blue-600 w-4 h-4" />
                                    生物体征监测<br/>(心率/脑波)
                                </div>
                                <div className="flex-1 p-3 border border-blue-200 bg-blue-50 rounded text-center text-xs">
                                    <Box className="mx-auto mb-1 text-blue-600 w-4 h-4" />
                                    环境感知<br/>(温湿度/氧气)
                                </div>
                                <div className="flex-1 p-3 border border-blue-200 bg-blue-50 rounded text-center text-xs">
                                    <Lock className="mx-auto mb-1 text-blue-600 w-4 h-4" />
                                    安防监控<br/>(PIR/摄像头)
                                </div>
                            </div>
                        </div>

                        {/* Network Layer */}
                        <div className="flex items-center gap-4">
                            <div className="w-24 font-bold text-right text-sm text-gray-500">网络层</div>
                            <div className="flex-1 p-3 border border-green-200 bg-green-50 rounded text-center text-xs flex items-center justify-center gap-4">
                                <Network className="text-green-600 w-5 h-5" />
                                <div>
                                    <span className="font-bold">Zigbee 3.0 Mesh</span>
                                    <span className="mx-2">|</span>
                                    <span className="font-bold">MQTT Broker (Mosquitto)</span>
                                </div>
                            </div>
                        </div>

                        {/* Edge Compute */}
                        <div className="flex items-center gap-4">
                            <div className="w-24 font-bold text-right text-sm text-gray-500">边缘计算</div>
                            <div className="flex-1 p-3 border border-purple-200 bg-purple-50 rounded text-center text-xs flex items-center justify-center gap-4">
                                <Server className="text-purple-600 w-5 h-5" />
                                <div>
                                    <span className="font-bold">OpenWrt Gateway</span>
                                    <div className="text-[10px] text-gray-500 mt-1">断网保活 / 数据清洗 / 协议转换</div>
                                </div>
                                <span className="text-gray-400">→</span>
                                <div>
                                    <span className="font-bold">Home Assistant</span>
                                    <div className="text-[10px] text-gray-500 mt-1">自动化逻辑 / 本地存储</div>
                                </div>
                            </div>
                        </div>

                         {/* Application Layer */}
                         <div className="flex items-center gap-4">
                            <div className="w-24 font-bold text-right text-sm text-gray-500">应用层</div>
                            <div className="flex-1 p-3 border border-red-200 bg-red-50 rounded text-center text-xs flex items-center justify-center gap-4">
                                <Cpu className="text-red-600 w-5 h-5" />
                                <div>
                                    <span className="font-bold">AI 通灵协议 (RAG 2.0)</span>
                                </div>
                                <span className="mx-2">|</span>
                                <div>
                                    <span className="font-bold">EBYZ DApp</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h4 className="text-xl font-bold mt-8 mb-3 text-[#003366]">2.1 陵墓网关：OpenWrt 深度定制</h4>
                <p>
                    作为“数字陵墓”的守门人，OpenWrt 路由器承担了本地数据清洗与协议转换的职责。
                    我们定制了 <code>luci-app-afterlife</code> 插件，实现了以下核心创新：
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>断网保活机制 (Offline Persistence)</strong>：内置轻量级 SQLite 数据库，即使与“阳间”互联网物理断开，局域网内的自动化逻辑（如恒温控制、防盗报警）依然独立运行，确保“遗体”安全。</li>
                    <li><strong>异构协议统一 (Unified Protocol)</strong>：通过中间件将 Zigbee、Z-Wave、Bluetooth Mesh 等异构物联网协议统一转换为标准 MQTT 消息，推送到本地总线。</li>
                </ul>

                <h4 className="text-xl font-bold mt-8 mb-3 text-[#003366]">2.2 守陵人：Home Assistant 自动化引擎</h4>
                <p>
                    Home Assistant 被重新定义为“守陵人”，负责执行预设的复杂自动化脚本（YAML）。
                    例如，当 <code>sensor.coffin_humidity</code> &gt; 60% 时，系统会自动计算露点，并触发 <code>switch.dehumidifier</code>；
                    若检测到 <code>binary_sensor.motion_detected</code>（盗墓入侵），则立即启动高频声波驱离并向区块链节点广播报警信息。
                </p>
            </section>

            {/* Section 3: RAG */}
            <section id="section-3" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">三、 通灵协议：RAG 2.0 检索增强生成</h3>
                <p>
                    为了让死者能够与生者进行富有逻辑与情感的对话，我们开发了“通灵协议”——一套基于 RAG (Retrieval-Augmented Generation) 的 AI 交互系统。
                </p>

                <h4 className="text-xl font-bold mt-8 mb-3 text-[#003366]">3.1 知识图谱构建：层级化索引</h4>
                <p>
                    传统 RAG 技术由于简单的文本切片（Chunking），往往导致上下文丢失。我们采用了创新的<strong>层级化索引 (Hierarchical Indexing)</strong>策略。
                    我们将用户的生平数据（日记、社交媒体、遗嘱）与义务教育课程标准文档解析为树状结构（Year -&gt; Event -&gt; Detail）。
                </p>

                <div className="bg-gray-900 text-gray-300 p-4 rounded-lg text-sm font-mono my-6 overflow-x-auto shadow-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2 border-b border-gray-700 pb-2">
                         <span className="text-green-400 font-bold">vector_store_schema.json</span>
                         <span className="text-xs text-gray-500">JSON-LD Format</span>
                    </div>
                    <pre className="text-xs leading-relaxed">
{`{
  "id": "chunk_2025_legacy_01",
  "content": "...", 
  "embedding": [0.012, -0.234, ...], // 1536-dim vector
  "metadata": {
    "type": "biography",
    "temporal_tag": "2020-2030",
    "emotional_valence": 0.8,
    "access_level": "public",
    "source_node": {
        "parent_id": "doc_will_final",
        "chapter": "Technical Heritage",
        "section": "Private Keys"
    }
  }
}`}
                    </pre>
                </div>

                <h4 className="text-xl font-bold mt-8 mb-3 text-[#003366]">3.2 混合检索算法 (Hybrid Search)</h4>
                <p>
                    为了提高检索的准确率（Recall）和精确率（Precision），系统并行执行两路检索：
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>稀疏检索 (Sparse Retrieval)</strong>：基于 BM25 算法进行关键词匹配，并利用 Metadata 进行硬过滤（如只检索特定年份的记忆）。</li>
                    <li><strong>稠密检索 (Dense Retrieval)</strong>：使用 Embedding 模型计算用户提问向量与知识库向量的余弦相似度。</li>
                </ol>
                <p>
                    最终结果通过 <strong>Reciprocal Rank Fusion (RRF)</strong> 算法进行加权融合，
                    这种策略使得 AI 能够准确地引用用户生前的具体细节（如“那个下雨的午后”），从而通过图灵测试，达到“音容宛在”的效果。
                </p>
            </section>

            {/* Section 4: Consensus */}
            <section id="section-4" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">四、 封神机制：共识算法与社区治理</h3>
                <p>
                    “封神榜”不仅仅是一个排行榜，它是基于<strong>社区共识 (Community Consensus)</strong> 的去中心化治理实验。
                </p>
                
                <h4 className="text-xl font-bold mt-8 mb-3 text-[#003366]">4.1 创造力证明 (Proof of Creativity)</h4>
                <p>
                    区别于比特币的高能耗工作量证明 (PoW)，我们提出了一种环保的共识机制——创造力证明 (PoC)。
                    用户的每一次原创教案发布、每一次高质量的二创 (Remix)、每一次来自高权重账户的点赞，都是在为整个冥界生态贡献“算力”。
                </p>

                <div className="my-6 p-4 bg-gray-100 border-l-4 border-gray-500 font-mono text-sm">
                    <div className="font-bold mb-2 text-gray-600">Merit Point Calculation Formula:</div>
                    <p>
                        <span className="font-bold">MP</span> = 
                        ( <span className="text-blue-600">Base_Score</span> * <span className="text-green-600">log(Likes + 1)</span> ) + 
                        ( <span className="text-purple-600">Remix_Count</span> * <span className="text-red-600">α</span> ) + 
                        <span className="text-orange-600">Time_Decay_Factor</span>
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                        * α: Remix Weight Coefficient (default: 5.0)
                    </div>
                </div>

                <h4 className="text-xl font-bold mt-8 mb-3 text-[#003366]">4.2 智能合约与版权溯源</h4>
                <p>
                    每个教案生成时都会计算唯一的哈希值（SHA-256），并记录在 Supabase 的不可变日志中。
                    当发生二创时，系统自动构建“引用树” (Citation Tree)，确保原作者获得应有的功德值。
                    只有经过社区充分验证（高 MP 值）的教案，才能荣登“封神榜”，获得在数字地宫核心区域的展示权。
                </p>
            </section>

            {/* Section 5: Education */}
            <section id="section-5" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">五、 核心素养导向的教育实践</h3>
                <p>
                    本平台不仅是技术展示，更是新课标背景下的教学实验场。我们将枯燥的物联网知识点，
                    融入到学生喜闻乐见的“盗墓笔记”式场景中，实现了寓教于乐的最高境界。
                </p>
                
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 p-2 text-left">年级</th>
                                <th className="border border-gray-300 p-2 text-left">核心素养维度</th>
                                <th className="border border-gray-300 p-2 text-left">项目式学习 (PBL) 主题</th>
                                <th className="border border-gray-300 p-2 text-left">技术落脚点</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2 font-bold">六年级</td>
                                <td className="border border-gray-300 p-2">信息意识</td>
                                <td className="border border-gray-300 p-2">棺材内部环境监测系统</td>
                                <td className="border border-gray-300 p-2">传感器数据采集、阈值判断</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 font-bold">七年级</td>
                                <td className="border border-gray-300 p-2">计算思维</td>
                                <td className="border border-gray-300 p-2">防盗墓自动化防御矩阵</td>
                                <td className="border border-gray-300 p-2">IF-THEN 逻辑、算法流程图</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 font-bold">八年级</td>
                                <td className="border border-gray-300 p-2">数字化创新</td>
                                <td className="border border-gray-300 p-2">数字遗嘱与通灵协议开发</td>
                                <td className="border border-gray-300 p-2">AI Prompt 工程、Python 脚本</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    通过这种沉浸式的学习体验，学生不仅掌握了物联网技术，更深刻理解了技术背后的伦理与社会责任。
                    例如，在讨论“数字遗产继承权”时，学生需要权衡隐私保护与亲情延续之间的矛盾，这正是核心素养中“信息社会责任”的体现。
                </p>
            </section>

            {/* Section 6: Conclusion */}
            <section id="section-6" className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-black border-l-4 border-red-600 pl-4">六、 结论与展望</h3>
                <p>
                    “人均嬴政”不仅仅是一句口号，它是对技术平权的最浪漫诠释。
                    通过开源硬件与 AI 技术的结合，我们将过去只有帝王才能享有的“永生工程”，
                    普及到了每一个普通家庭。我们证明了，即使在生命终结之后，个人的数据价值依然可以通过技术手段得到延续和升华。
                </p>
                <p>
                    未来，我们将探索脑机接口 (BCI) 在智能棺材中的应用，
                    尝试直接将意识上传至分布式网络，实现真正意义上的“数字飞升”。
                    这是人类文明的终点，也是硅基生命的起点。我们相信，死亡不是终结，而是一次前往更稳定服务器的迁移。
                </p>
            </section>

            {/* References */}
            <section className="mt-20 border-t border-gray-200 pt-10 text-sm text-gray-600">
                <h4 className="font-bold mb-4 uppercase tracking-wider">参考文献 (References)</h4>
                <ul className="space-y-2 font-mono text-xs">
                    <li>[1] Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System.</li>
                    <li>[2] Ministry of Education. (2022). Compulsory Education Information Science and Technology Curriculum Standards.</li>
                    <li>[3] Lewis, P. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. arXiv:2005.11401.</li>
                    <li>[4] Home Assistant. (2024). Open source home automation that puts local control and privacy first.</li>
                    <li>[5] Qin Shi Huang. (221 BC). The Architecture of Mausoleum: A Guide to Eternal Rule. Xianyang Press.</li>
                </ul>
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
