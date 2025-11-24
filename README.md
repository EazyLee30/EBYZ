# 《人均嬴政白皮书》

**智能棺材全栈物联网教学平台**

> **编者**：沪上嘻嘻生
>
> **座右铭**：讲好棺材故事，贡献棺材方案，享受棺材人生

---

## ⚰️ 序言：向死而生 (Prologue)

### 1. 棺材板盖不住继续盖
**实时监控棺材板，讨论信息社会责任：**
*   有摄像头监控棺材好不好？
*   棺材内部温湿度是否合理？
*   是否需要加入继电器控制空调？

有人问：“私人还要监管内部吗，这不合理。”
**那我请问了，秦始皇陵墓怎么造的？** 智能棺材要建立防御机制，从而引出物联网核心概念——**反馈机制**：
`输入 (Input) → 处理 (Process) → 输出 (Output) → 反馈 (Feedback)`

### 2. 价值观的终极思考
有人又要说了，天天棺材的不符合积极向上的价值观。
那我说“天天向上”，停下来就要掉下来了。上句“奋力一跃”，下句“直笔笔落地成盒”。
所以要有**危机意识**，有**长远的发展规划**，用发展的眼光看待世界，**直接看到终点，世界的尽头**。

---

## 📚 教学指南重构 (Curriculum Guide)

本项目重新构建了义务教育 **六年级、七年级、八年级** 的信息科技教学指南。

*   **核心主线**：以 **智能棺材** 为主线，贯穿六七八年级。
*   **概念替换**：**智能家居 (Smart Home) → 智能棺材 (Smart Coffin)**。用“棺材”指代所有智能家居设备，构建终极庇护所。
*   **技术架构**：基于 **OpenWrt** (软路由/网关) 和 **Home Assistant** (智能中枢)。
*   **智能棺材方案全解**：涵盖 **Zigbee**、**MQTT**、**蓝牙 (Bluetooth)** 等物联网技术以及网络协议。
*   **最终形态**：将系统完整应用到 **米家 (Mi Home)** 和 **Apple Home** 生态中。

---

## 🧠 技术原理与创新 (Technical Innovation)

本项目不仅仅是一个前端展示页面，更集成了前沿的 AI 与物联网技术概念。

### 1. RAG (检索增强生成) 驱动的智能教案
我们构建了一个本地知识库，包含教育部发布的**义务教育信息科技课程标准**（6-8年级）。当用户请求生成教案时，系统会：
1.  **检索 (Retrieve)**：根据当前课程的年级和知识点，从 `knowledge.json` 中检索对应的教学目标、核心素养要求。
2.  **增强 (Augment)**：将检索到的官方标准作为“上下文”注入到 Prompt 中。
3.  **生成 (Generate)**：调用 **Google Gemini 2.5 Flash** 模型，生成一份既符合官方标准，又带有“智能棺材”暗黑幽默风格的教案。

### 2. 全栈物联网架构隐喻
我们将复杂的物联网技术栈映射到“陵墓”场景中，帮助学生理解：
*   **OpenWrt (软路由)** = **陵墓网关**：确保在断网（阴阳两隔）情况下，局域网（地宫内部）依然存活。
*   **Home Assistant (中枢)** = **守陵人/大脑**：统筹管理所有 Zigbee/WiFi 设备（陪葬品）。
*   **MQTT (协议)** = **通灵符咒**：轻量级发布/订阅协议，即使在网络极差的环境下也能传递消息（遗嘱）。
*   **Zigbee (协议)** = **红绳/长明灯**：低功耗、Mesh组网，确保传感器千年不掉线。

---

## 👁️ 页面预览 (Visual Tour)

### 1. 首页概览 (The Mausoleum)
赛博朋克风格的视觉入口，动态光标与流体背景。
<div align="center">
  <img src="assets/screenshots/home-hero.png" alt="Home Page" width="800" style="border-radius: 10px; border: 1px solid #333;">
</div>

### 2. 课程大纲 (Curriculum Matrix)
左侧 Spotlight 视觉索引，右侧详情列表，一一对应的物理布局。
<div align="center">
  <img src="assets/screenshots/curriculum-overview.png" alt="Curriculum Overview" width="800" style="border-radius: 10px; border: 1px solid #333;">
</div>

### 3. 课程详情 (Lesson Detail)
沉浸式教学详情页，包含 **RAG 增强** 的 AI 教案生成功能。支持一键生成 PDF 格式的“通灵卷轴”。
<div align="center">
  <img src="assets/screenshots/lesson-detail.png" alt="Lesson Detail" width="800" style="border-radius: 10px; border: 1px solid #333;">
</div>

### 4. 问政殿 (The Oracle)
集成 Google Gemini 的 AI 智能助手，解答关于 OpenWrt 与 Zigbee 的“生死难题”。
<div align="center">
  <img src="assets/screenshots/oracle-interface.png" alt="Oracle Interface" width="800" style="border-radius: 10px; border: 1px solid #333;">
</div>

---

## 🛠️ 运行项目

**环境要求：** Node.js

### 本地开发

1. 安装依赖：
   ```bash
   npm install
   ```
2. 设置环境变量：
   - 创建 `.env.local` 文件
   - 设置 `GEMINI_API_KEY` 为你的 Gemini API 密钥 (用于 AI 功能)
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
3. 运行开发服务器：
   ```bash
   npm run dev
   ```

### 构建知识库 (RAG)
如果更新了 `knowledge_base/` 下的 PDF 文件，需要重新生成索引：
```bash
npm run extract
```

### 构建生产版本
```bash
npm run build
```

## 🧱 技术栈

- **Core**: React 19, TypeScript, Vite
- **AI & RAG**: 
  - Google Generative AI SDK (Gemini 2.5 Flash)
  - PDF Parsing & Text Extraction
  - Context Injection
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **Utilities**: html2pdf.js (PDF Export), React Markdown

## 📄 许可证

[MIT License](LICENSE)
