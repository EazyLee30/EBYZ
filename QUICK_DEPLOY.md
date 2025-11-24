# ⚡ 快速部署到 Vercel

## 最简单的方式（5 分钟）

### 1. 通过 GitHub 自动部署（推荐）

1. **访问 Vercel**：https://vercel.com/new
2. **登录**：使用 GitHub 账号登录
3. **导入仓库**：
   - 点击 **Import Git Repository**
   - 选择 `EazyLee30/EBYZ`
4. **配置项目**（通常会自动检测，检查一下即可）：
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `./`
5. **添加环境变量**：
   - 点击 **Environment Variables**
   - 添加：
     - Name: `GEMINI_API_KEY`
     - Value: 你的 Gemini API 密钥
     - 勾选所有环境（Production, Preview, Development）
6. **点击 Deploy** 🚀

### 2. 获取部署地址

部署完成后，你会获得一个地址，例如：
- `https://ebyz-xxxxx.vercel.app`

也可以自定义域名！

### 3. 自动部署

之后每次你 `git push` 代码到 GitHub，Vercel 会自动重新部署！

---

## 使用命令行部署

如果你已安装 Vercel CLI：

```bash
# 登录
vercel login

# 部署（首次会配置，之后直接部署）
vercel

# 生产环境部署
vercel --prod
```

---

## 获取 Gemini API 密钥

如果还没有 API 密钥：

1. 访问：https://makersuite.google.com/app/apikey
2. 点击 **Create API Key**
3. 复制密钥并添加到 Vercel 环境变量

---

## ✅ 完成后

你的项目将在公网可访问，例如：
- 🔗 https://ebyz.vercel.app

每次更新代码后，访问地址自动更新！

