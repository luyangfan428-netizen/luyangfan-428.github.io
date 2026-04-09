# 个人主页

这是一个纯静态个人主页项目，可直接上传到 GitHub 仓库，或部署到 GitHub Pages。
当前页面支持从 `content.xlsx` 读取内容，适合后续用 Excel 维护文案。

## 文件结构

- `index.html`：主页入口
- `styles.css`：页面样式
- `script.js`：轻量交互脚本
- `assets/profile-photo.jpg`：个人照片
- `content.xlsx`：网页内容主数据表，优先读取
- `content.csv`：网页文案参考表

## 本地预览

推荐使用本地服务器预览，这样页面可以正常读取 `content.xlsx`：

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

- 修改网页文案：直接编辑 `content.xlsx`，保存后刷新页面
- 备选表格：`content.csv`
- 更换照片：替换 `assets/profile-photo.jpg`

## 注意

- 直接用浏览器打开 `file://` 页面时，部分浏览器可能会限制读取本地 Excel 文件
- 本地编辑后请优先通过 `http://127.0.0.1:4173` 这类本地服务器地址预览
