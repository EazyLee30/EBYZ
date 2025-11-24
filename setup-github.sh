#!/bin/bash

echo "=========================================="
echo "GitHub 配置脚本 - EBYZ 项目"
echo "=========================================="
echo ""

# 1. 配置 Git 用户信息
echo "步骤 1: 配置 Git 用户信息"
echo "----------------------------------------"

# 检查是否已配置
CURRENT_NAME=$(git config --global user.name 2>/dev/null)
CURRENT_EMAIL=$(git config --global user.email 2>/dev/null)

if [ -n "$CURRENT_NAME" ] && [ -n "$CURRENT_EMAIL" ]; then
    echo "✓ Git 用户信息已配置:"
    echo "  姓名: $CURRENT_NAME"
    echo "  邮箱: $CURRENT_EMAIL"
    read -p "是否要更新? (y/n): " UPDATE_CONFIG
    if [ "$UPDATE_CONFIG" != "y" ]; then
        echo "跳过用户信息配置..."
        SKIP_USER_CONFIG=true
    fi
fi

if [ "$SKIP_USER_CONFIG" != "true" ]; then
    if [ -z "$CURRENT_NAME" ]; then
        read -p "请输入你的 GitHub 用户名 (或姓名): " GIT_NAME
    else
        read -p "请输入你的 GitHub 用户名 (或姓名) [默认: $CURRENT_NAME]: " GIT_NAME
        GIT_NAME=${GIT_NAME:-$CURRENT_NAME}
    fi
    
    if [ -z "$CURRENT_EMAIL" ]; then
        read -p "请输入你的 GitHub 邮箱: " GIT_EMAIL
    else
        read -p "请输入你的 GitHub 邮箱 [默认: $CURRENT_EMAIL]: " GIT_EMAIL
        GIT_EMAIL=${GIT_EMAIL:-$CURRENT_EMAIL}
    fi
    
    git config --global user.name "$GIT_NAME"
    git config --global user.email "$GIT_EMAIL"
    echo "✓ Git 用户信息已设置"
fi

echo ""

# 2. 检查 SSH 密钥
echo "步骤 2: 配置 SSH 密钥用于 GitHub"
echo "----------------------------------------"

if [ -f ~/.ssh/id_ed25519.pub ] || [ -f ~/.ssh/id_rsa.pub ]; then
    echo "✓ 检测到现有的 SSH 密钥"
    if [ -f ~/.ssh/id_ed25519.pub ]; then
        SSH_KEY_FILE=~/.ssh/id_ed25519.pub
    else
        SSH_KEY_FILE=~/.ssh/id_rsa.pub
    fi
    echo "  密钥文件: $SSH_KEY_FILE"
    echo ""
    echo "你的公钥内容:"
    echo "----------------------------------------"
    cat $SSH_KEY_FILE
    echo "----------------------------------------"
    echo ""
    read -p "是否要为 GitHub 创建新的 SSH 密钥? (y/n) [默认: n]: " CREATE_NEW
    CREATE_NEW=${CREATE_NEW:-n}
else
    CREATE_NEW=y
fi

if [ "$CREATE_NEW" = "y" ]; then
    read -p "请输入你的 GitHub 邮箱用于 SSH 密钥: " SSH_EMAIL
    if [ -z "$SSH_EMAIL" ]; then
        SSH_EMAIL=$(git config --global user.email)
    fi
    
    echo "正在生成 SSH 密钥..."
    ssh-keygen -t ed25519 -C "$SSH_EMAIL" -f ~/.ssh/id_ed25519_github -N ""
    
    # 配置 SSH config
    if [ ! -f ~/.ssh/config ]; then
        touch ~/.ssh/config
        chmod 600 ~/.ssh/config
    fi
    
    cat >> ~/.ssh/config << EOF

# GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github
    IdentitiesOnly yes
EOF
    
    SSH_KEY_FILE=~/.ssh/id_ed25519_github.pub
    echo "✓ SSH 密钥已生成"
    echo ""
    echo "你的公钥内容:"
    echo "----------------------------------------"
    cat $SSH_KEY_FILE
    echo "----------------------------------------"
fi

echo ""
echo "步骤 3: 将 SSH 公钥添加到 GitHub"
echo "----------------------------------------"
echo "请按照以下步骤操作:"
echo ""
echo "1. 复制上面显示的公钥内容"
echo "2. 打开 https://github.com/settings/keys"
echo "3. 点击 'New SSH key'"
echo "4. 标题填写: EBYZ-$(hostname)"
echo "5. 将公钥粘贴到 'Key' 字段"
echo "6. 点击 'Add SSH key'"
echo ""
read -p "完成后按 Enter 继续..."

# 4. 测试 SSH 连接
echo ""
echo "步骤 4: 测试 GitHub SSH 连接"
echo "----------------------------------------"
echo "正在测试连接..."

if ssh -T git@github.com -o StrictHostKeyChecking=no 2>&1 | grep -q "successfully authenticated"; then
    echo "✓ GitHub SSH 连接成功!"
elif ssh -T git@github.com -o StrictHostKeyChecking=no 2>&1 | grep -q "Hi"; then
    echo "✓ GitHub SSH 连接成功!"
else
    echo "⚠ SSH 连接测试失败，但可能只是因为这是第一次连接"
    echo "  如果后续推送代码时出现问题，请检查 SSH 密钥是否已添加到 GitHub"
fi

echo ""
echo "=========================================="
echo "配置完成!"
echo "=========================================="
echo ""
echo "下一步: 创建 GitHub 仓库并推送代码"
echo ""
echo "1. 在 GitHub 上创建名为 'EBYZ' 的新仓库"
echo "2. 然后运行以下命令:"
echo ""
echo "   git remote add origin git@github.com:YOUR_USERNAME/EBYZ.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "（记得将 YOUR_USERNAME 替换为你的 GitHub 用户名）"

