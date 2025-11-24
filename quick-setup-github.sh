#!/bin/bash

echo "🚀 GitHub 快速配置脚本"
echo "======================"
echo ""

# 1. 配置 Git 用户信息
echo "📝 配置 Git 用户信息..."
echo ""

# 获取当前用户信息
CURRENT_USER=$(whoami)
DEFAULT_NAME="Eazy Lee"

read -p "GitHub 用户名/姓名 [默认: $DEFAULT_NAME]: " GIT_NAME
GIT_NAME=${GIT_NAME:-$DEFAULT_NAME}

read -p "GitHub 邮箱: " GIT_EMAIL
if [ -z "$GIT_EMAIL" ]; then
    echo "❌ 邮箱不能为空，使用默认邮箱格式"
    GIT_EMAIL="${CURRENT_USER}@users.noreply.github.com"
    echo "   使用: $GIT_EMAIL"
fi

git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"

echo "✓ Git 用户信息已设置: $GIT_NAME <$GIT_EMAIL>"
echo ""

# 2. 检查并创建 SSH 密钥
echo "🔑 配置 SSH 密钥..."
echo ""

SSH_KEY_FILE=~/.ssh/id_ed25519_github
SSH_KEY_PUB=$SSH_KEY_FILE.pub

if [ -f "$SSH_KEY_PUB" ]; then
    echo "✓ 发现现有 SSH 密钥: $SSH_KEY_PUB"
    read -p "是否重新生成? (y/n) [默认: n]: " REGEN
    REGEN=${REGEN:-n}
else
    REGEN="y"
fi

if [ "$REGEN" = "y" ]; then
    echo "正在生成新的 SSH 密钥..."
    ssh-keygen -t ed25519 -C "$GIT_EMAIL" -f "$SSH_KEY_FILE" -N "" <<EOF

EOF
    
    # 确保 .ssh 目录权限正确
    chmod 700 ~/.ssh
    chmod 600 "$SSH_KEY_FILE"
    chmod 644 "$SSH_KEY_PUB"
    
    echo "✓ SSH 密钥已生成"
fi

# 3. 配置 SSH config
echo ""
echo "⚙️  配置 SSH config..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh

if [ ! -f ~/.ssh/config ]; then
    touch ~/.ssh/config
    chmod 600 ~/.ssh/config
fi

# 检查是否已存在 GitHub 配置
if ! grep -q "Host github.com" ~/.ssh/config 2>/dev/null; then
    cat >> ~/.ssh/config <<EOF

# GitHub configuration
Host github.com
    HostName github.com
    User git
    IdentityFile $SSH_KEY_FILE
    IdentitiesOnly yes
EOF
    echo "✓ SSH config 已更新"
else
    echo "✓ SSH config 已存在 GitHub 配置"
fi

# 4. 添加密钥到 ssh-agent
echo ""
echo "🔐 添加密钥到 ssh-agent..."
eval "$(ssh-agent -s)" > /dev/null 2>&1
ssh-add "$SSH_KEY_FILE" 2>/dev/null
echo "✓ 密钥已添加到 ssh-agent"

# 5. 显示公钥
echo ""
echo "=" | tr '=' '-'
echo "📋 请将以下公钥添加到 GitHub:"
echo "=" | tr '=' '-'
echo ""
cat "$SSH_KEY_PUB"
echo ""
echo "=" | tr '=' '-'
echo ""

# 6. 复制公钥到剪贴板（macOS）
if command -v pbcopy > /dev/null 2>&1; then
    cat "$SSH_KEY_PUB" | pbcopy
    echo "✓ 公钥已自动复制到剪贴板（macOS）"
    echo ""
fi

# 7. 打开 GitHub 设置页面
echo "📌 下一步操作:"
echo "   1. 打开: https://github.com/settings/keys"
echo "   2. 点击 'New SSH key'"
echo "   3. 标题填写: EBYZ-$(hostname)"
echo "   4. 粘贴上面的公钥（已复制到剪贴板）"
echo "   5. 点击 'Add SSH key'"
echo ""

read -p "完成后按 Enter 继续测试连接..."

# 8. 测试连接
echo ""
echo "🧪 测试 GitHub SSH 连接..."
ssh -T git@github.com -o StrictHostKeyChecking=no -o ConnectTimeout=5 2>&1 | head -1

echo ""
echo "✨ 配置完成！"
echo ""
echo "📦 下一步：创建 GitHub 仓库并推送代码"
echo ""
echo "   1. 在 GitHub 创建名为 'EBYZ' 的仓库"
echo "   2. 运行以下命令："
echo ""
echo "      git remote add origin git@github.com:YOUR_USERNAME/EBYZ.git"
echo "      git branch -M main"
echo "      git push -u origin main"
echo ""

