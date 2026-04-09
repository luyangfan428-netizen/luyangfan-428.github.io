# 个人主页

这是一个纯静态个人主页项目，可直接上传到 GitHub 仓库，或部署到 GitHub Pages。

## 文件结构

- `index.html`：主页入口
- `styles.css`：页面样式
- `script.js`：轻量交互脚本
- `assets/profile-photo.png`：个人照片
- `content.csv`：网页文案参考表

## 本地预览

直接打开 `index.html` 即可查看。

如果你想用本地服务器预览，也可以在项目目录运行：

```bash
python3 -m http.server 4173
```

然后访问：

`http://127.0.0.1:4173`

## 上传到 GitHub

1. 新建一个 GitHub 仓库
2. 把当前目录文件上传到仓库根目录
3. 保持 `index.html` 位于仓库根目录
4. 如果使用 GitHub Pages，可在仓库设置中启用 Pages

## 更新内容

- 修改网页文案：编辑 `content.csv` 后，再同步到 `index.html`
- 更换照片：替换 `assets/profile-photo.png`
