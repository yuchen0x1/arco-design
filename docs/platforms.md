# 平台与交付边界

公共产物是供应用导入的 React DOM 组件、图标、hooks、Less、CSS、类型以及浏览器 UMD 文件。消费者拥有应用数据、权限、宿主路由和部署策略。组件库自身没有数据库、账号或需要迁移的用户记录。文档网站另有登录态查询、语言、RTL 和 Service Worker。

| 平台 | 级别 | 核心能力、成本与分发 |
| --- | --- | --- |
| 桌面 Web、响应式 Web | A | 表单、表格、键盘交互及主题随宿主 React 应用交付。发布一个 npm 格式压缩包即可，布局由宿主决定。 |
| 移动 Web，Android 手机、Android 平板、折叠屏、iOS 和 iPadOS 浏览器 | B | HTML/CSS、触控和辅助技术可复用。复杂表格、拖放、悬停菜单与断点需要在目标应用逐项验证。按 Web 包更新。 |
| Windows 10、Windows 11 | A（Web），C（原生） | 浏览器中使用；原生托盘、安装器和 Windows 通知缺少独立业务场景。 |
| Linux，包括 Ubuntu、Debian、Fedora、Arch | A（Web），C（原生） | 浏览器消费同一产物，DEB、RPM、Flatpak 和 AppImage 会重复分发浏览器和运行时。 |
| macOS Intel、Apple Silicon | A（Web），C（原生） | Web 包与 CPU 无关；DMG、公证和 Keychain 只在拥有本地业务的宿主中有价值。 |
| Android、iOS、iPadOS 原生和平板、折叠屏原生 | D | React DOM、Less、浏览器事件、SVG 和 portal 需要另一套原生视图、手势和读屏实现；APK 和 IPA 无法直接复用核心渲染契约。 |
| PWA | B（文档缓存更新），C（新增独立安装产品） | 文档有 Workbox 预缓存、语言路由和更新确认。宿主控制其安装图标、离线数据及权限。 |
| Chrome、Edge、Firefox 扩展 | C | 可用于扩展自己的弹窗或选项页。组件库没有独立的跨站功能，单独扩展会引入额外商店维护。 |
| Docker、NAS、私有化、云服务器 | C（独立产品） | 已构建的宿主静态资源可部署到这些环境；本库没有监听端口的后端或硬件依赖。 |
| CLI | C | 包管理器完成安装，现有构建脚本服务于贡献者。独立 CLI 与组件消费者的使用路径重叠。 |

上述结论描述适用性。实际运行证据见交付报告；操作系统 runner 验证包安装与 SSR，浏览器与真机验证另行记录。
