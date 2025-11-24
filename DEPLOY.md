# 🚀 部署到公网指南

本项目支持多种部署平台，推荐使用 **Vercel**（最简单快速）。

## 方法 1: Vercel 部署（推荐 ⭐）

### 步骤 1: 安装 Vercel CLI（可选）

```bash
npm install -g vercel
```

### 步骤 2: 登录 Vercel

```bash
vercel login
```

### 步骤 3: 部署项目

在项目根目录运行：

```bash
vercel
```

首次部署会提示：
- Set up and deploy? `Y`
- Which scope? 选择你的账户
- Link to existing project? `N`
- What's your project's name? `ebyz` 或任意名称
- In which directory is your code located? `./`
- Want to override the settings? `N`

### 步骤 4: 配置环境变量

部署后需要设置环境变量：

1. 访问 Vercel 控制台：https://vercel.com/dashboard
2. 选择你的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加环境变量：
   - **Key**: `GEMINI_API_KEY`
   - **Value**: 你的 Gemini API 密钥
   - **Environment**: 选择 `Production`, `Preview`, `Development`（全选）
5. 点击 **Save**

### 步骤 5: 重新部署

环境变量配置后，需要重新部署：

```bash
vercel --prod
```

或在 Vercel 控制台点击 **Redeploy**

### 通过 GitHub 自动部署（推荐）

1. 访问 https://vercel.com/new
2. 点击 **Import Git Repository**
3. 选择 `EazyLee30/EBYZ` 仓库
4. 配置项目：
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. 添加环境变量 `GEMINI_API_KEY`
6. 点击 **Deploy**

之后每次推送到 GitHub，Vercel 会自动重新部署！

## 方法 2: Netlify 部署

### 步骤 1: 安装 Netlify CLI

```bash
npm install -g netlify-cli
```

### 步骤 2: 登录并部署

```bash
netlify login
netlify deploy --prod
```

### 步骤 3: 配置环境变量

在 Netlify 控制台：
1. 进入 **Site settings** → **Environment variables**
2. 添加 `GEMINI_API_KEY`

### 通过 GitHub 自动部署

1. 访问 https://app.netlify.com/start
2. 选择 **Import from Git**
3. 选择 GitHub 仓库 `EazyLee30/EBYZ`
4. 构建设置（会自动检测）：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 添加环境变量 `GEMINI_API_KEY`
6. 点击 **Deploy site**

## 方法 3: GitHub Pages 部署

### 步骤 1: 安装 gh-pages

```bash
npm install --save-dev gh-pages
```

### 步骤 2: 添加部署脚本到 package.json

```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

### 步骤 3: 配置 vite.config.ts

```typescript
export default defineConfig({
  base: '/EBYZ/', // 替换为你的仓库名
  // ... 其他配置
})
```

### 步骤 4: 部署

```bash
npm run deploy
```

## 🔐 环境变量说明

本项目需要以下环境变量：

- `GEMINI_API_KEY`: Google Gemini API 密钥（必需）

### 获取 Gemini API 密钥

1. 访问 https://makersuite.google.com/app/apikey
2. 创建新的 API 密钥
3. 复制密钥并配置到部署平台

## 📝 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] 环境变量 `GEMINI_API_KEY` 已配置
- [ ] 构建命令正确：`npm run build`
- [ ] 输出目录正确：`dist`
- [ ] 已测试本地构建：`npm run build`

## 🌐 部署后的访问

部署成功后，你会获得一个公网访问地址，例如：
- Vercel: `https://ebyz.vercel.app`
- Netlify: `https://ebyz.netlify.app`

## 🛠️ 故障排除

### 构建失败

- 检查 `npm run build` 是否在本地正常运行
- 查看部署平台的构建日志

### API 调用失败

- 确认环境变量 `GEMINI_API_KEY` 已正确配置
- 检查 API 密钥是否有效
- 查看浏览器控制台的错误信息

### 页面空白

- 检查路由配置是否正确
- 确认构建输出目录为 `dist`
- 查看网络请求是否正常

## 💡 推荐配置

**最佳实践**：使用 **Vercel + GitHub 自动部署**

优势：
- ✅ 自动部署（每次 git push 自动部署）
- ✅ 免费 HTTPS 证书
- ✅ 全球 CDN 加速
- ✅ 简单易用
- ✅ 免费额度充足

