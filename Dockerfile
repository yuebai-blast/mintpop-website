# syntax=docker/dockerfile:1
# ============================================================================
# Mint AI 前端生产镜像（多阶段）
#   - 构建阶段：干净 slim 底座 + curl 装 mise，按根 mise.toml 装 node/pnpm，产出 dist
#   - 运行阶段：nginx 仅托管静态产物，构建工具链不进最终镜像
#   工具链版本只认根 mise.toml 的 [tools]；Dockerfile 里唯一钉死的版本是 mise 自身。
# ============================================================================

# ---- 构建阶段 ----
FROM debian:13-slim AS build

# mise 自身版本（自举工具无法由 mise.toml 管，唯一允许在此钉死的版本）
ENV MISE_VERSION=v2026.6.0
ENV MISE_DATA_DIR=/mise \
    MISE_CONFIG_DIR=/mise \
    MISE_CACHE_DIR=/mise/cache \
    MISE_INSTALL_PATH=/usr/local/bin/mise \
    PATH=/mise/shims:$PATH
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl git ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && curl https://mise.run | sh

WORKDIR /app

# 只装该镜像需要的工具（node + pnpm），不 mise install 全装
COPY mise.toml ./
RUN mise trust && mise install node pnpm

# 先 COPY 依赖清单并安装（层缓存：改源码不重装依赖；改清单才重装）
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# 再 COPY 源码与构建配置，执行类型检查 + 构建
COPY . .
RUN pnpm build

# ---- 运行阶段 ----
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
