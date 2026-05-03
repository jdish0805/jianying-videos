# 剪映零基础入门 APP

## 📁 文件说明

```
jianying-app/
├── index.html      ← 首页（章节列表）
├── video.html      ← 视频播放页
├── css/
│   └── style.css   ← 所有样式
├── js/
│   └── app.js      ← 核心逻辑
├── assets/         ← 放封面图、图标
└── videos/         ← 📹 把视频放在这里
```

## 🎬 配置视频路径

打开 `js/app.js`，找到第8~19行的 `chapters` 数据，把视频路径填进去：

```js
// 方式一：视频放在项目里（打包进APP）
video: 'videos/chapter1.mp4'

// 方式二：视频放在网上（推荐，APK体积小）
video: 'https://你的域名/视频/chapter1.mp4'
```

## 📹 第1章视频

把 `D:\hope\1.mp4` 复制到：
```
jianying-app/videos/1.mp4
```
然后在 `js/app.js` 里把第1章的 `video` 改为：
```js
video: 'videos/1.mp4'
```

## 📦 用 HBuilderX 打包 APK

1. 下载安装 HBuilderX → https://www.dcloud.net.cn/
2. 打开 HBuilderX → 文件 → 打开目录 → 选择 `jianying-app` 文件夹
3. 右键项目 → 发行 → 原生App-云打包
4. 选择 Android，填写包名（随便写，如 `com.jianying.app`）
5. 点击打包，等待下载APK

## ✅ 完成！

装到手机上就能用了 📱
