# XINGJI 工作室文档站

这是 XINGJI 工作室的静态文档站。`docs/` 是文档源目录：构建时直接读取其中的 Markdown，生成完整 HTML，无需服务器运行时或浏览器联网加载 Markdown。

## 本地开发

需要 Node.js 20.19 或更新版本（建议使用 Node.js 22 或 24）：

```bash
npm ci
npm run dev
```

打开终端提示的 `http://localhost:5173`；如果端口被占用，服务会自动尝试下一个端口。修改 `docs/` 下的文档、`docs/_sidebar.md`、`src/` 下的样式或前端脚本，以及 `scripts/build.mjs` 中的页面模板后，开发服务器会自动重新生成并刷新浏览器；新增或删除文档也会生效。开发模式使用独立的临时目录，不会覆盖正式构建产物。按 `Ctrl+C` 停止服务，修改开发服务器本身后需重启。可通过 `PORT=端口号 npm run dev` 指定起始端口；WSL 会自动使用轮询来检测 Windows 编辑器保存的文件。

## 构建和预览

```bash
npm run build
npm run preview
```

打开终端提示的 `http://127.0.0.1:4173`。`npm run preview` 只预览已有构建产物；更改文档、侧边栏或站点代码后，重新执行 `npm run build`。可通过 `PORT=端口号 npm run preview` 指定预览端口。

构建结果位于根目录的 `dist/`。它只包含静态 HTML、CSS、JavaScript 和文档资源，可以直接部署。

页面模板和生成逻辑在 `scripts/build.mjs`，样式与交互在 `src/`；旧的 `docs/index.html` 不参与构建。
页头使用 `src/logo/XINGJI.png`，浏览器图标使用 `src/logo/XINGJI_rect.png`。

## Cloudflare Pages 部署

将仓库连接到 Cloudflare Pages 后，在构建设置中填写：

| 设置 | 值 |
| --- | --- |
| 框架预设 | 无 / None |
| 根目录 | `/`（仓库根目录，或留空） |
| 构建命令 | `npm run build` |
| 构建输出目录 | `dist` |
| 环境变量 | `NODE_VERSION=22`（推荐） |

Cloudflare Pages 会根据 `package-lock.json` 安装依赖，然后执行构建。后续将文档或代码的修改推送到部署分支，即会触发重新构建。若使用本地直接上传，先执行 `npm ci && npm run build`，再上传 `dist/`，或运行 `npx wrangler pages deploy dist` 并按提示选择 Pages 项目。

Cloudflare Pages 会将生成的 `.html` 页面映射到不带扩展名的地址，详见 [Cloudflare 的页面路由说明](https://developers.cloudflare.com/pages/configuration/serving-pages/)。

## 编写文档与目录

- 将 Markdown 文件放在 `docs/` 下，可以有任意层级。每个 `.md` 文件都会生成对应的页面，无须先加入侧边栏。例如 `docs/develop/xj380/XJ380_API_Spec_1_3.md` 对应 `/develop/xj380/XJ380_API_Spec_1_3`。`docs/README.md` 同时用于网站首页 `/` 和 `/README`。
- 编辑 `docs/_sidebar.md` 控制侧边栏：标题用于组织分组，列表项用于目录条目，嵌套列表或更低级的标题会生成可折叠的子级，支持继续嵌套。带子级的链接本身仍可打开对应文档，点击条目右侧的箭头或空白区域可以折叠。
- 目录默认只展开一级分组和当前文档的路径；展开某一级时，其下级目录默认收起。筛选目录时会临时展开匹配项的路径。
- 文档中的相对 `.md` 链接会转换成对应页面地址，并保留查询参数和标题锚点；图片等其他文件放在 `docs/` 中即可随构建复制。支持常见 Markdown 和 GitHub 风格的表格、任务列表、删除线及脚注；文档中的原始 HTML 也会保留。
- 文档源文件不会被构建过程修改。开发模式会自动重新构建；正式部署需要在内容变更后重新构建。

## Markdown 扩展

完整写法和页面效果见 [Markdown 编写指南](docs/markdown-guide.md)，构建后访问 `/markdown-guide`。

- **代码高亮**：围栏代码块标注语言即可，支持 C、C++、Java、C#、Bash、JavaScript、TypeScript、Python、Go、Rust、SQL 等语言，以及 `c++`、`c#`、`js`、`ts`、`sh` 等别名。高亮在构建时生成；未标注或未知语言保留为纯文本。浏览器支持剪贴板访问时提供复制按钮。
- **图表**：使用 `mermaid` 代码块，支持流程图、时序图、类图、状态图等 Mermaid 语法。浏览器仅在有图表的页面加载组件，渲染失败时显示提示并保留源码；成功后可展开查看源码。
- **公式**：使用 `$...$` 和独占一行的 `$$` 包围 LaTeX 公式，构建时用 KaTeX 渲染。普通文本的美元符号可用 `\$` 转义。
- **提示块**：支持 GitHub 风格的 `> [!NOTE]`、`TIP`、`IMPORTANT`、`WARNING`、`CAUTION`，保留块内的 Markdown 格式。
- **其他**：标题锚点链接、中文脚注标签、`<details>` 折叠内容及 `<kbd>` 等 HTML 排版样式；文档开头的 YAML Front matter 会被识别并从正文中省略，页面标题仍由正文一级标题决定。

Mermaid 脚本、KaTeX 样式和字体在构建时从锁定版本的 npm 依赖复制到 `dist/_site/vendor/`，不依赖外部 CDN。更新相关依赖后需重新构建。

可运行 `npm test` 检查路由、Markdown 渲染和多层目录等核心行为。
