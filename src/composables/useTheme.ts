import { readonly, ref } from 'vue'

/**
 * 主题枚举：成员名与持久化字符串取值统一用 SCREAMING_SNAKE_CASE。
 */
export const Theme = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
} as const

export type Theme = (typeof Theme)[keyof typeof Theme]

const STORAGE_KEY_THEME = 'mint-theme'
const DEFAULT_ACCENT = '#14C28A'

// 模块级单例状态：整个应用共享同一份主题，避免多组件各持一份导致不同步
// 初始值固定为 LIGHT —— 与 SSG 预渲染产物保持一致，避免水合 mismatch；
// 真实主题在客户端 onMounted 后通过 syncTheme() 同步。
const theme = ref<Theme>(Theme.LIGHT)
const accent = ref<string>(DEFAULT_ACCENT)

/** 读取初始主题:SSR 阶段无浏览器全局,回退浅色;客户端按 localStorage→系统偏好→浅色 */
function resolveInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return Theme.LIGHT
  }
  const saved = localStorage.getItem(STORAGE_KEY_THEME)
  if (saved === Theme.LIGHT || saved === Theme.DARK) {
    return saved
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? Theme.DARK : Theme.LIGHT
}

/** 把当前主题与主题色同步到 :root 上(CSS 变量驱动整页配色);SSR 阶段无 document,直接跳过 */
function applyToDocument(): void {
  if (typeof document === 'undefined') {
    return
  }
  const root = document.documentElement
  root.dataset.theme = theme.value
  root.style.setProperty('--accent', accent.value)
}

/** 切换浅色 / 深色，并持久化记忆 */
function toggleTheme(): void {
  theme.value = theme.value === Theme.DARK ? Theme.LIGHT : Theme.DARK
  localStorage.setItem(STORAGE_KEY_THEME, theme.value)
  applyToDocument()
}

/** 设置可配置的主题色 accent */
function setAccent(value: string): void {
  accent.value = value
  applyToDocument()
}

/**
 * 读取真实主题并写入 DOM —— 只在客户端 onMounted 后调用，SSR 阶段不触发。
 * 解决方案：SSG 预渲染以 LIGHT 为基线，客户端挂载后再同步真实主题，
 * 此时 inline 防闪烁脚本已提前把 data-theme 写好，图标/词标随之更新即可。
 */
function syncTheme(): void {
  theme.value = resolveInitialTheme()
  applyToDocument()
}

/**
 * 主题 composable：其余组件直接复用单例状态。
 * 注意：不在 setup 阶段调用 applyToDocument，避免覆盖 inline 防闪烁脚本已写好的 data-theme。
 */
export function useTheme() {
  return {
    theme: readonly(theme),
    accent: readonly(accent),
    /** 当前是否深色，模板里常用 */
    isDark: () => theme.value === Theme.DARK,
    toggleTheme,
    setAccent,
    syncTheme,
  }
}
