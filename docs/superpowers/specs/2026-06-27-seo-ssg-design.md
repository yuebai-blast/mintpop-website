# mintpop 官网 SEO 优化(SSG 预渲染)设计

- 日期:2026-06-27
- 范围:为 mintpop 落地页做 SEO 优化,采用构建期预渲染(SSG)而非运行时 SSR
- 现状:Vue 3 + Vite 纯 SPA,构建为静态文件,由 nginx 在 Docker 中托管;路由为 `/`、`/legal`、`/login`、`/register`

## 1. 目标与非目标

### 目标

- 爬虫与首屏拿到的是预渲染好的**真实 HTML**,而非空 `<div id="app">`。
- 每个路由有独立的 `title` / `description` / `canonical`。
- 链接在微信 / X / Slack / 飞书等分享时有 OG / Twitter 大图卡片。
- 提供 schema.org 结构化数据(JSON-LD),提升搜索引擎对品牌与产品的理解。
- 生成 `sitemap.xml` 与 `robots.txt`,引导收录。

### 非目标(YAGNI)

- **不引入运行时 SSR**:不改成 Node 服务部署。
- **不做多语言**:站点内容为英文,`<html lang="en">`,本轮不做 i18n。
- **不做按页动态 OG 图生成**:用一张统一的品牌 OG 图即可。

## 2. 关键决策(已与用户确认)

| 决策点 | 结论 |
|---|---|
| 渲染方式 | SSG 预渲染(`vite-ssg`),**部署模式不变,仍纯静态 nginx** |
| SEO 范围 | 每页 Meta + OG/Twitter 卡片 + JSON-LD 结构化数据 + sitemap/robots,全做 |
| 生产域名 | `https://mintpop.ai` |
| 收录范围 | `/` 与 `/legal` 进 sitemap 并允许收录;`/login`、`/register` 加 `noindex` 且不进 sitemap |
| 防闪烁脚本 | 做(在 `index.html` head 内联,首屏 paint 前定主题) |
| OG 图 | 基于 `brand/` 素材合成一张 1200×630 的 `public/og-image.png` |

## 3. 总体架构

构建期用 `vite-ssg` 替换渲染方式:`mise run build`(底层 `vite-ssg build`)对每个路由跑一遍 Vue 渲染,产出带完整 HTML 的 `dist/<route>/index.html`。

- **部署零改动**:`nginx.conf`、`Dockerfile`、`docker-compose.yml`、`mise.toml`、CI 一律不动,产物仍是 `dist/` 静态文件。
- `vite-ssg` 在客户端自动 hydration,交互(主题切换、路由、锚点滚动)与现状一致。

域名等站点级常量集中到 `src/config/site.ts`,canonical / sitemap / OG 绝对 URL 全从此取,改一处全站生效。

## 4. SSR 安全改造(前置必做)

`vite-ssg build` 在 Node 中执行,任何在**模块加载期或组件 setup 期**直接访问浏览器全局(`window` / `document` / `localStorage` / `matchMedia`)的代码都会让构建崩溃。

当前 `src/composables/useTheme.ts` 存在该问题:

- 模块加载即执行 `ref<Theme>(resolveInitialTheme())`,内部调用 `localStorage.getItem` 与 `window.matchMedia`。
- `useTheme()` 在 `App.vue` 的 setup 调用 `applyToDocument()`,访问 `document.documentElement`。

改造:

- `resolveInitialTheme()`:加 `typeof window === 'undefined'` 守卫,SSR 阶段返回默认 `Theme.LIGHT`。
- `applyToDocument()`:加 `typeof document === 'undefined'` 守卫,SSR 阶段直接返回。
- 客户端 hydration 后(`onMounted` 或入口客户端分支)再依据真实 localStorage / 系统偏好同步一次主题,保证交互不变。
- 验收:`mise run build` 不再因浏览器全局缺失而报错;`mise run preview` 下主题记忆与系统偏好行为与改造前一致。

## 5. 防闪烁(FOUC)内联脚本

预渲染产物默认是浅色;深色偏好用户首屏会先闪一下浅色再切深色。

- 在 `index.html` 的 `<head>` 注入一小段内联脚本:paint 前读取 `localStorage['mint-theme']`(回退系统 `prefers-color-scheme`),立即把 `data-theme` 写到 `<html>`。
- 该脚本与 `useTheme` 的 `STORAGE_KEY_THEME`、枚举取值保持一致(`LIGHT`/`DARK`),避免漂移。

## 6. Meta 标签管理(@unhead/vue)

- 引入 `@unhead/vue`(`vite-ssg` 原生集成),在入口安装。
- `src/config/seo.ts`:集中放每个路由的 SEO 数据(`title` / `description` / `path`)。
- 提供 `src/composables/useSeo.ts`,导出 `buildSeoHead(routeKey)`,一次性组装基础 Meta + canonical + OG + Twitter,供各 view 调用,消除样板重复。
- 各 `views/*.vue` 调用 `useSeo` / `useHead` 声明本页 head:
  - `title`、`meta[name=description]`、`link[rel=canonical]`(绝对 URL,来自 `site.ts`)。
  - `/login`、`/register` 额外输出 `meta[name=robots][content=noindex]`。
- `index.html` 中写死的 `<title>` 与 `description` 改由首页 head 提供,避免两处漂移(保留一份兜底以防 JS 未执行,内容与首页一致)。

## 7. OG / Twitter 卡片

- 合成 `public/og-image.png`(1200×630),取自 `brand/` 的 wordmark + 品牌色 `#14C28A` + slogan。
- `buildSeoHead` 为每页输出:
  - Open Graph:`og:title`、`og:description`、`og:url`、`og:image`、`og:type=website`、`og:site_name=mintpop`、`og:locale=en_US`。
  - Twitter:`twitter:card=summary_large_image`、`twitter:title`、`twitter:description`、`twitter:image`。
- 图片 URL 为绝对地址(`SITE_URL + /og-image.png`)。

## 8. 结构化数据(JSON-LD)

首页通过 `useHead({ script: [...] })` 注入两段 `application/ld+json`:

- `Organization`:品牌名、`url`、`logo`(绝对 URL,用品牌 icon)。
- `WebSite`:站点名、`url`、`description`(多模态 AI API)。

内容均由 `site.ts` / `seo.ts` 常量生成,不写魔法字符串。

## 9. sitemap.xml + robots.txt + 基础优化

- **sitemap.xml**:构建期生成(用 `vite-ssg` 的 `onFinished` 钩子或内置 sitemap 能力),仅含「允许收录路由」清单(`/`、`/legal`),URL 用绝对地址。产物写入 `dist/sitemap.xml`。
- **robots.txt**:`public/robots.txt`,`Allow: /`、`Disallow: /login`、`Disallow: /register`,并 `Sitemap: https://mintpop.ai/sitemap.xml`。
- **基础优化**:确认 `<html lang="en">`;补 `og:locale`;保留字体 preconnect;核对各 section 语义化标签(首页唯一 `<h1>`、`<main>`/`<section>` 结构合理)。

## 10. 交付物清单

| 文件 | 动作 |
|---|---|
| `package.json` | 加 `vite-ssg`、`@unhead/vue`;`build` 改为 `vue-tsc -b && vite-ssg build` |
| `src/main.ts` | 改用 `ViteSSG` 包装导出 `createApp`,挂载 router 与 head |
| `src/composables/useTheme.ts` | SSR 安全守卫 + 客户端同步 |
| `src/config/site.ts` | 新增:`SITE_URL` 等站点常量 |
| `src/config/seo.ts` | 新增:每路由 SEO 数据 |
| `src/composables/useSeo.ts` | 新增:`buildSeoHead` 组装 head |
| `src/views/*.vue` | 调用 `useSeo`/`useHead`,login/register 加 noindex |
| `index.html` | 精简写死 meta + 加防闪烁内联脚本 |
| `public/robots.txt` | 新增 |
| `public/og-image.png` | 新增(品牌素材合成) |
| sitemap 生成 | 接入 `vite-ssg` 配置 |
| `vite.config.ts` | 加 `ssgOptions` 等所需配置 |

**部署链路(nginx / Dockerfile / docker-compose / mise / CI)零改动。**

## 11. 测试与验收

- `mise run typecheck` 通过。
- `mise run lint` 通过。
- `mise run build` 成功产出预渲染 HTML:`dist/index.html`、`dist/legal/index.html` 等含真实正文(非空 `#app`)。
- 抽查产物 HTML:每页 `<title>`/`description`/`canonical` 正确;首页含 OG/Twitter/JSON-LD;login/register 含 `noindex`。
- `dist/sitemap.xml` 仅含 `/`、`/legal`;`dist/robots.txt` 正确。
- `mise run preview`:页面交互(主题切换 + 记忆、路由、锚点滚动)与改造前一致,无明显主题闪烁。
