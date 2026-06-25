#!/usr/bin/env bash
# 发版收口脚本：改版本号 → 提交 → 打 tag → 推送。
# 用法：mise run release <版本号> [本次更新说明]
#   例：mise run release 0.2.0 "修复登录跳转，新增用量看板"
#   - 有「更新说明」→ 打 annotated tag（注释会被 GitHub Release 正文置顶取用）
#   - 无「更新说明」→ 打轻量 tag（Release 正文只含自动 changelog）
set -euo pipefail

VERSION="${1:-}"
NOTES="${2:-}"

if [ -z "$VERSION" ]; then
  echo "用法: mise run release <版本号> [本次更新说明]" >&2
  echo '例:   mise run release 0.2.0 "修复登录跳转"' >&2
  exit 1
fi

# 去掉可能误带的 v 前缀，统一成纯版本号；tag 再补 v
VERSION="${VERSION#v}"
TAG="v${VERSION}"

# 必须在干净工作区发版，避免把无关改动一起带上
if [ -n "$(git status --porcelain)" ]; then
  echo "工作区有未提交改动，请先提交或暂存后再发版。" >&2
  exit 1
fi

if git rev-parse -q --verify "refs/tags/${TAG}" >/dev/null; then
  echo "tag ${TAG} 已存在，请换一个版本号。" >&2
  exit 1
fi

# 写入 package.json 版本号（不打 git tag、不动依赖）
npm version "$VERSION" --no-git-tag-version --allow-same-version >/dev/null

# 版本号若有变化才提交；与当前一致（如首发）则直接对 HEAD 打 tag
if [ -n "$(git status --porcelain)" ]; then
  git add package.json
  git commit -m "chore: release ${TAG}"
fi

if [ -n "$NOTES" ]; then
  git tag -a "$TAG" -m "$NOTES"
else
  git tag "$TAG"
fi

git push origin HEAD
git push origin "$TAG"

echo "已发版 ${TAG}，GitHub Actions 将构建并推送镜像、创建 GitHub Release。"
