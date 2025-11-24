<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# EBYZ - EveryBody YingZheng

**人均嬴政白皮书 - 智能棺材全栈物联网教学平台**

> "Where IoT meets Immortality." —— 当物联网遇到赛博永生。

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-orange?logo=google-gemini)](https://deepmind.google/technologies/gemini/)

## 📜 项目简介

这是一个基于 **OpenWrt** 与 **Home Assistant** 架构的沉浸式物联网教学平台。我们以**“智能棺材”**（终极智能家居）为主线，重构了义务教育信息科技课程（6-8年级），涵盖过程控制、互联网协议及 IoT 实战。

**核心特色：**
*   🏺 **沉浸式叙事**：将枯燥的技术点包装为“陵墓防御”、“数字墓志铭”、“诈尸预警”等趣味场景。
*   ✨ **赛博美学**：黑金配色，融合 Glitch 故障风与流体光效，打造庄严而诡秘的视觉体验。
*   🔮 **AI 助教**：“秦大爷” (Oracle) 在线答疑，用幽默讽刺的语言风格解答技术难题。

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
