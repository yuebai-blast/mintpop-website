# mintpop 品牌物料

围绕 mintpop 的核心标记（「pop」中那个 `o`）整理的一套品牌物料。

> **图标 = 原图标，未做任何修改。** 标记本体（绿色半色调圆盘 + 上下「pop」爆裂短线）是从 `brand/mintpop-avatar.png` 中**像素级精确抠出**的真实图标（取分辨率最高的一处，圆盘直径约 208px），仅去除背景做成透明，未改动任何设计。词标直接沿用 `brand/` 原始资产。

总览板见 `brand/mintpop-brand-board.png`（矢量版式 `.svg`，其中图标/词标为内嵌原图）。

## 配色

| 名称 | HEX | 用途 |
|---|---|---|
| Mint | `#17D1A7` | 主色（取自图标实采样） |
| Mint Bright | `#1FE3AD` | 渐变高光端 |
| Mint Deep | `#0FB389` | 渐变深色端 |
| Ink | `#0B0B0C` | 文字 / 深色底 |
| Cloud | `#F4F8F6` | 浅色底 / 浅色瓦片 |

## 字体

- **Fredoka**（SemiBold）— 词标与展示标题（与原 logo 字形一致的圆润几何无衬线）。
- **Inter** — UI 与正文（Regular / Medium / SemiBold）。

## 物料清单

- `icon/` — 真实图标本体（透明底）：`mintpop-icon.png`（原生 238×420）、`-square`（420×420 居中，供方形场景）、`-256/-128/-64`（下采样档，清晰）。
- `wordmark/` — 词标锁版（原始资产）：`mintpop-wordmark-dark`（深字，浅背景用）、`mintpop-wordmark-light`（白字，深背景用）。
- `app-icon/` — 应用图标瓦片 @512：`-cloud`（浅灰底）、`-white`（白底）、`avatar-round`（圆形头像）。
- `favicon/` — 16/32/48/180/192/256 PNG 及 `apple-touch-icon.png`（180，白底圆角）。

## 关于分辨率（重要）

图标的「真身」只有约 208px（源自 avatar），因此 **favicon / 应用瓦片 / 网页用途都很清晰（均为下采样）**。但 **1024 应用商店图标或大尺寸印刷**会需要放大、产生模糊——真正无损放大的唯一办法是把图标重绘成矢量（那等于重新画一遍）。若需要可分辨率无关的矢量版本，可另行据此图标做一次「逐点矢量描摹」。

## 背景为何只配浅色

原图标的爆裂短线是**黑色**、专为浅背景设计（与原始 avatar 一致）。深色背景请改用 `wordmark/mintpop-wordmark-light.png`（白字白线版）。
