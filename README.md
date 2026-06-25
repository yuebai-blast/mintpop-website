# Mint AI 官网前端

Mint AI 落地页的前端实现，依据设计稿 `Mint Website.dc.html` 还原，采用 Vue3 生态。

## 技术栈

- **Vite** — 构建与开发服务器
- **Vue 3**（`<script setup>` + TypeScript）
- **Vue Router** — 页面路由
- 纯 CSS + CSS 变量驱动的主题系统（无 UI 组件库）

## 工具链与命令（统一走 mise）

工具链版本锁定在 `mise.toml` 的 `[tools]`（Node + pnpm），所有命令以 mise task 形式提供：

```bash
mise run install     # 安装/更新全部依赖
mise run run         # 启动开发服务器
mise run build       # 类型检查 + 生产构建
mise run preview     # 预览生产构建产物
mise run typecheck   # 仅类型检查
mise run lint        # ESLint 代码检查（本地修复加 --fix）
mise run image       # 本地构建生产镜像
mise run up          # docker compose 拉起部署容器（nginx 暴露 80）
mise run down        # 停止并移除部署容器
mise run release 0.2.0 "本次更新说明"   # 发版：改版本号→提交→打 tag→推送
```

### docker compose 部署

部署机只拉取 CI 已发布的镜像运行（`docker-compose.yml` 不含 `build:`，本地构建用 `mise run image`）：

```bash
docker login ghcr.io                         # 私有镜像，先登录
MINT_TAG=0.1.0 docker compose up -d          # 拉指定版本（默认 latest），宿主端口可用 MINT_PORT 覆盖
```

镜像内为 nginx 托管的静态站点，容器暴露 `80`；构建上下文裁剪走 `Dockerfile.dockerignore`
（per-Dockerfile ignore，BuildKit 优先于仓库根的通用 `.dockerignore`）。

## 部署与发版

- **镜像**：多阶段 `Dockerfile` 产出 nginx 静态镜像，暴露 `80` 端口；单 amd64，私有部署型。
- **CI 门禁**（`ci.yml`）：PR / push main 跑 lint + 类型检查 + 构建。
- **发版**（`release.yml`）：打 `vX.Y.Z` tag 触发 → 过质量门禁 → 构建并推送镜像到 GHCR
  （`ghcr.io/<owner>/mint-ai-club`，非预发布版自动带 `latest`）→ 创建 GitHub Release。
- **GitHub Release 正文** = annotated tag 注释（本次重点，置顶）+ 按提交类型过滤的 changelog
  （只收录 `feat`/`fix`/`perf`/`refactor`/`revert`，过滤 docs/chore/ci 等噪声）。
- 发版统一走 `mise run release <版本号> [说明]`，带「说明」会打 annotated tag 让重点置顶。

## 目录结构

```
src/
├── components/
│   ├── AppHeader.vue          # 顶部导航（含主题切换）
│   ├── AppFooter.vue          # 页脚
│   ├── BrandLogo.vue          # Mint·AI 品牌标识
│   ├── PlaceholderPage.vue    # 占位页通用组件
│   └── sections/
│       ├── HeroSection.vue          # 首屏 Hero
│       ├── CapabilitiesSection.vue  # 能力卡片
│       └── ModalitiesSection.vue    # 模态卡片
├── composables/
│   └── useTheme.ts            # 主题（Light/Dark + accent）单例
├── router/
│   └── index.ts              # 路由：/ 落地页，其余为占位
├── styles/
│   ├── theme.css             # Light/Dark 主题变量
│   └── base.css              # 全局基础样式
├── views/
│   ├── HomeView.vue          # 落地页
│   ├── LegalView.vue         # 占位
│   ├── LoginView.vue         # 占位
│   └── RegisterView.vue      # 占位
├── App.vue
└── main.ts
```

## 说明

- 设计稿引用的 Legal / Login / Register 三页设计文件暂未提供，当前以占位视图承接对应路由，后续补设计再填充。
- 主题系统完整还原设计稿：支持 Light / Dark 切换（跟随系统偏好并用 `localStorage` 记忆），主题色 `accent` 通过 CSS 变量 `--accent` 可配置。
