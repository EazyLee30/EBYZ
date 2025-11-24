# GitHub 发布指南

## 步骤 1: 在 GitHub 上创建仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `EBYZ`
   - **Description**: `EveryBody YingZheng - 人均嬴政白皮书 智能棺材全栈物联网教学平台`
   - **Visibility**: 选择 Public 或 Private（根据你的需要）
   - **不要**勾选 "Add a README file"、"Add .gitignore" 或 "Choose a license"（因为我们已经有了这些文件）
4. 点击 "Create repository"

## 步骤 2: 连接本地仓库到 GitHub

在创建仓库后，GitHub 会显示命令提示。执行以下命令：

```bash
# 添加远程仓库（将 YOUR_USERNAME 替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/EBYZ.git

# 或者使用 SSH（如果你配置了 SSH 密钥）
# git remote add origin git@github.com:YOUR_USERNAME/EBYZ.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

## 步骤 3: 验证

推送完成后，访问 `https://github.com/YOUR_USERNAME/EBYZ` 确认代码已成功上传。

## 快速命令（一次性执行）

如果你想快速执行，可以使用以下命令（记得替换 YOUR_USERNAME）：

```bash
cd "/Users/eazylee/build/人均嬴政白皮书---智能棺材全栈物联网教学平台"
git remote add origin https://github.com/YOUR_USERNAME/EBYZ.git
git branch -M main
git push -u origin main
```

## 后续更新

之后如果需要更新代码，只需：

```bash
git add .
git commit -m "你的提交信息"
git push
```

## 注意事项

- 确保 `.env.local` 文件已被 `.gitignore` 忽略（包含敏感信息如 API 密钥）
- 如果遇到推送权限问题，可能需要配置 GitHub 认证（Personal Access Token 或 SSH 密钥）

