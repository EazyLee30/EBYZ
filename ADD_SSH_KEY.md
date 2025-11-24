# 🔑 将 SSH 公钥添加到 GitHub

## 你的 SSH 公钥（已在剪贴板）

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOkFrkRHAz+Ft5rLySJRh38+FWT17aCoe2JAGNDN/RdR eazylee@users.noreply.github.com
```

## 添加步骤

1. **打开 GitHub SSH 设置**：
   - 直接访问：https://github.com/settings/keys
   - 或者：点击头像 → Settings → SSH and GPG keys

2. **添加新的 SSH 密钥**：
   - 点击绿色的 **"New SSH key"** 按钮
   - **Title**: 填写 `EBYZ-MacBook-Air` 或任意名称
   - **Key type**: 选择 `Authentication Key`
   - **Key**: 粘贴上面的公钥（已在剪贴板中，直接 Cmd+V 即可）
   - 点击 **"Add SSH key"** 按钮

3. **验证添加成功**：
   - 应该能看到新添加的密钥出现在列表中

## 测试 SSH 连接

添加完密钥后，在终端运行：

```bash
ssh -T git@github.com
```

如果成功，会看到：
```
Hi EazyLee30! You've successfully authenticated, but GitHub does not provide shell access.
```

## 下一步

添加完 SSH 密钥后，告诉我，我会帮你推送代码到 GitHub！

