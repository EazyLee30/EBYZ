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

## 👁️ 页面预览 (Visual Tour)

*(以下为概念演示，实际效果请运行项目查看)*

### 1. 首页概览 (The Mausoleum)
赛博朋克风格的视觉入口，动态光标与流体背景。
<div align="center">
  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" alt="Home Page Concept" width="800" style="border-radius: 10px; border: 1px solid #333;">
</div>

### 2. 课程大纲 (Curriculum Matrix)
左侧 Spotlight 视觉索引，右侧详情列表，一一对应的物理布局。
<div align="center">
  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" alt="Curriculum Page Concept" width="800" style="border-radius: 10px; border: 1px solid #333;">
</div>

### 3. 问政殿 (The Oracle)
集成 Google Gemini 的 AI 智能助手，解答关于 OpenWrt 与 Zigbee 的“生死难题”。
<div align="center">
  <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200&auto=format&fit=crop" alt="Oracle Interface Concept" width="800" style="border-radius: 10px; border: 1px solid #333;">
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

### 构建生产版本

```bash
npm run build
```

## 🧱 技术栈

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **AI Integration**: Google Generative AI SDK (Gemini 2.5 Flash)
- **Icons**: Lucide React

## 📄 许可证

本项目为私有项目。禁止用于非教学用途的盗墓活动。
