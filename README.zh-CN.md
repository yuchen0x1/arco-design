<div align="center">
  <a href="https://arco.design" target="_blank">
    <img alt="Arco Design Logo" width="200" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>

<div align="center">
  <h1>Arco Design</h1>
</div>

<div align="center">

基于 [Arco Design](https://arco.design/) 的 React UI 组件库。

本仓库是 [`arco-design/arco-design`](https://github.com/arco-design/arco-design) 的独立增强 Fork。项目保持 Arco 的 API 与视觉体系，同时加入无障碍、React 兼容性、CI 与发布安全方面的增强。它不是官方 npm 发布渠道。

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/arco-design/arco-design/blob/main/LICENSE)
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/arco-design/awesome-arco)

</div>

<div align="center">

[English](./README.md) | 简体中文

</div>

https://user-images.githubusercontent.com/19399269/141435899-e453cf75-d50f-4549-b8d0-37daebe46c36.mp4

# 特性

## 全面

60多个开箱即用的高质量组件, 可以覆盖绝大部分的业务场景。

## 主题配置

海量的设计 tokens, 支持全局以及组件级别的主题配置。有以下2种方式可以定制主题：

* [Less-loader](https://arco.design/react/docs/theme)
* [风格配置平台](https://arco.design/themes) - 推荐!

## 可复用的定制化物料 

[物料平台](https://arco.design/material/) 提供了一站式的物料管理方案。 沉淀可复用的定制化业务模块, 让效率突破猛进。

## TypeScript 友好

所有组件都是用 TypeScript 编写的，所以天然的类型友好。


# 安装

Fork 版本通过 GitHub Release 发布校验过的压缩包。同名 npm 包属于上游项目，版本可能不同。

```bash
npm install https://github.com/yuchen0x1/arco-design/releases/download/v2.66.21/arco-design-web-react-2.66.21.tgz
```

生产环境使用前，请从 Release 页面校验 `SHA256SUMS` 和构建来源证明。

# 例子

```typescript
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';

function App() {
  return (
    <Button type='secondary'>
      Hello World
    </Button>
  );
}

const container = document.getElementById('app');

if (container) {
  createRoot(container).render(<App />);
}
```

React 16/17 使用 `ReactDOM.render`；React 18/19 使用 `createRoot`。在 React 19 中以命令式方式调用 `Message`、`Notification` 或 `Modal` 时，必须引入 `@arco-design/web-react/es/_util/react-19-adapter`。

# 本地开发

```bash
corepack yarn install --frozen-lockfile
corepack yarn icon
corepack yarn build
corepack yarn test:client
corepack yarn test:node
```

CI 会执行构建、单元测试、包归档和消费者安装检查。正式版本由经过验证的 `v*` Tag 创建，附带 SHA256 校验和与构建来源证明；详见 [SECURITY.md](./SECURITY.md) 和 [docs/platforms.md](./docs/platforms.md)。

# 相关链接

* [官网](https://arco.design/)
* [组件文档](https://arco.design/react/components/overview)
* [暗黑模式](https://arco.design/react/docs/dark)
* [主题配置](https://arco.design/react/docs/theme)
* [Figma 设计资源](https://www.figma.com/file/M66cTiLXHa4SVyZIlfY5Pb/arco-Design-System?node-id=7945%3A44563)
* [Awesome Arco](https://github.com/arco-design/awesome-arco)
* [构建插件](https://github.com/arco-design/arco-plugins)

# 生态

| 项目               | 介绍                                             |
| --------------------- | ------------------------------------------------------- |
| [Vue 组件库] | 基于 [Arco Design](https://arco.design/) 的 Vue UI 组件库。 |
| [风格配置平台] | 精确到组件级的主题视觉配置平台 |
| [物料平台] | 丰富可共享的业务定制物料，让效率突破猛进 |
| [图标平台] | 一站式图标管理平台 |
| [Arco Pro] | 快速构建中后台的前端解决方案 |

[Vue 组件库]: https://arco.design/vue/docs/start
[风格配置平台]: https://arco.design/themes
[物料平台]: https://arco.design/material
[图标平台]: https://arco.design/iconbox
[Arco Pro]: https://arco.design/pro/

# 浏览器兼容性

| [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/08095282566ac4e0fd98f89aed934b65.png~tplv-uwbnlip3yd-png.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40ad73571879dd8d9fd3fd524e0e45a4.png~tplv-uwbnlip3yd-png.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4f59d35f6d6837b042c8badd95871b1d.png~tplv-uwbnlip3yd-png.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/eee2667f837a9c2ed531805850bf43ec.png~tplv-uwbnlip3yd-png.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3240334d3967dd263c8f4cdd2d93c525.png~tplv-uwbnlip3yd-png.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f2454685df95a1a557a61861c5bec256.png~tplv-uwbnlip3yd-png.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge 16| 31| 49 | 31 | 36 | last 2 versions |

# 参与贡献

贡献之前请先阅读 [行为准则](./CODE_OF_CONDUCT.md) 和 [贡献指南](./CONTRIBUTING.zh-CN.md)。

感谢所有为 ArcoDesign 做过贡献的人!

<a href="https://github.com/arco-design/arco-design/graphs/contributors"><img src="https://contrib.rocks/image?repo=arco-design/arco-design" /></a>

# License

[MIT 协议](./LICENSE)
