# 🚀 推送代码到 GitHub 指南

## ✅ 已完成的配置

- ✅ Git 用户信息已更新为：EazyLee30 (2491233873@qq.com)
- ✅ 远程仓库已配置：git@github.com:EazyLee30/EBYZ.git
- ✅ 当前分支：main

## 方法 1：使用 SSH（推荐）

### 步骤 1: 添加 SSH 公钥到 GitHub

1. **复制你的 SSH 公钥**（已在剪贴板）：
   ```
   ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOkFrkRHAz+Ft5rLySJRh38+FWT17aCoe2JAGNDN/RdR eazylee@users.noreply.github.com
   ```

2. **打开 GitHub SSH 设置**：
   - https://github.com/settings/keys

3. **添加密钥**：
   - 点击 "New SSH key"
   - Title: `EBYZ-MacBook-Air`
   - Key: 粘贴上面的公钥
   - 点击 "Add SSH key"

### 步骤 2: 测试 SSH 连接

```bash
ssh -T git@github.com
```

应该看到：`Hi EazyLee30! You've successfully authenticated...`

### 步骤 3: 创建 GitHub 仓库并推送

**在 GitHub 网站上创建仓库：**

1. 访问：https://github.com/new
2. Repository name: `EBYZ`
3. Description: `EveryBody YingZheng - 人均嬴政白皮书 智能棺材全栈物联网教学平台`
4. 选择 Public 或 Private
5. **⚠️ 不要**勾选任何初始化选项（README、.gitignore、license）
6. 点击 "Create repository"

**然后推送代码：**

```bash
git push -u origin main
```

## 方法 2：使用 HTTPS + Personal Access Token（如果 SSH 不方便）

GitHub 已不再支持密码认证，需要使用 Personal Access Token。

### 步骤 1: 创建 Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 填写信息：
   - Note: `EBYZ项目访问`
   - Expiration: 选择过期时间（如 90 days）
   - Select scopes: 勾选 `repo`（包含所有仓库权限）
4. 点击 "Generate token"
5. **⚠️ 立即复制 token**（只显示一次！）

### 步骤 2: 切换远程仓库为 HTTPS

```bash
git remote set-url origin https://github.com/EazyLee30/EBYZ.git
```

### 步骤 3: 推送代码

```bash
git push -u origin main
```

当提示输入用户名时：输入 `EazyLee30`
当提示输入密码时：**粘贴 Personal Access Token**（不是你的 GitHub 密码）

## 快速推送命令

如果你已经完成 SSH 密钥配置，直接运行：

```bash
# 确保在项目目录
cd "/Users/eazylee/build/人均嬴政白皮书---智能棺材全栈物联网教学平台"

# 推送代码
git push -u origin main
```

## 当前仓库状态

```bash
# 查看远程仓库
git remote -v

# 查看当前分支
git branch

# 查看提交历史
git log --oneline
```

## 常见问题

### 如果推送失败 "repository not found"

- 确保已在 GitHub 上创建了 `EBYZ` 仓库
- 检查仓库名称拼写是否正确

### 如果 SSH 连接失败

- 确认 SSH 公钥已添加到 GitHub
- 测试连接：`ssh -T git@github.com`
- 检查 SSH 配置：`cat ~/.ssh/config`

### 如果需要更新代码

之后每次更新代码只需：

```bash
git add .
git commit -m "更新说明"
git push
```

