# 📟 拟真单数位段码屏模拟器 (7-Segment Display)

一个基于原生 Web 技术（HTML5 / SVG / CSS3 / ES Modules）打造的高拟真 7 段数码管硬件模拟器。
支持任意输入一位数（0-9），通过硬件级管脚映射实时点亮对应的 a~g 段，并提供引脚电平指示与 16 进制状态总线遥测。

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License-MIT](https://img.shields.io/badge/License-MIT-green.svg)

---

## 📱 在线体验与扫码访问

- **在线访问链接**：[https://lumingya.github.io/seven-segment-display/](https://lumingya.github.io/seven-segment-display/)
- **扫码直接体验**：

<div align="center">
  <img src="qrcode.png" width="220" alt="扫码访问在线段码屏" />
  <p><em>手机微信 / 浏览器扫码即可打开交互式段码屏</em></p>
</div>

---

## ✨ 核心特性

- 🎯 **单数位即时驱动**：输入框严格限定单数字（0-9），输入立即驱动段码映射，非法字符自动过滤与防御。
- 💡 **多种硬件拟真质感**：
  - **经典红光 LED**：柔和弥散发光与外光晕滤镜效果。
  - **翠绿荧光 LED**：工业仪表风格绿光。
  - **黑白液晶 LCD**：经典段码反显液晶面板风格。
- 📊 **硬件级引脚与总线遥测**：
  - 实时反映 a, b, c, d, e, f, g 七个物理管脚高/低电平状态。
  - 输出当前点亮段数与十六进制总线控制字（例如 `8` 对应 `0x7F`）。
- ⌨️ **多维交互方式**：
  - 支持键盘 0-9 键全局无缝直通输入。
  - 支持虚拟数字按键点击。
  - 支持输入框直接输入或清空。
- 🧪 **自动化测试完备**：内置 Node.js 原生测试套件，全面覆盖 0-9 段位映射与边界防御。

---

## 📐 7 段数码管布局与编码表

```text
       -- a --
     |         |
     f         b
     |         |
       -- g --
     |         |
     e         c
     |         |
       -- d --    (dp)
```

| 字符 | a | b | c | d | e | f | g | 十六进制编码 (Hex) | 点亮段数 |
| :--: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :----------------: | :------: |
| **0** | 1 | 1 | 1 | 1 | 1 | 1 | 0 | `0x3F` | 6 |
| **1** | 0 | 1 | 1 | 0 | 0 | 0 | 0 | `0x06` | 2 |
| **2** | 1 | 1 | 0 | 1 | 1 | 0 | 1 | `0x5B` | 5 |
| **3** | 1 | 1 | 1 | 1 | 0 | 0 | 1 | `0x4F` | 5 |
| **4** | 0 | 1 | 1 | 0 | 0 | 1 | 1 | `0x66` | 4 |
| **5** | 1 | 0 | 1 | 1 | 0 | 1 | 1 | `0x6D` | 5 |
| **6** | 1 | 0 | 1 | 1 | 1 | 1 | 1 | `0x7D` | 6 |
| **7** | 1 | 1 | 1 | 0 | 0 | 0 | 0 | `0x07` | 3 |
| **8** | 1 | 1 | 1 | 1 | 1 | 1 | 1 | `0x7F` | 7 |
| **9** | 1 | 1 | 1 | 1 | 0 | 1 | 1 | `0x6F` | 6 |

---

## 🚀 快速启动

本项目采用无打包工具的原生 ES Modules，开箱即用。

### 1. 运行本地静态服务器
```bash
# 使用任意静态服务器（例如 serve / http-server / Python 内置服务器）
npx serve -l 3000 .
# 或者
python -m http.server 3000
```
在浏览器中打开 `http://localhost:3000` 即可体验。

### 2. 运行自动化测试
```bash
npm test
```

---

## 📂 项目结构

```text
seven-segment-display/
├── index.html               # 交互主页面与 SVG 段码屏结构
├── style.css                # 拟真发光材质与响应式样式
├── package.json             # 项目元信息与自动化脚本
├── README.md                # 详细项目与硬件引脚技术文档
├── src/
│   ├── segmentDisplay.js    # 核心 7 段映射算法与独立纯函数库
│   └── app.js               # UI 控制层、键盘监听与遥测绑定
└── test/
    └── segmentDisplay.test.js # Node.js 单元测试套件
```

---

## 📄 开源许可证

本项目基于 [MIT 许可证](LICENSE) 开源。
