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
const theme = ref<Theme>(resolveInitialTheme())
const accent = ref<string>(DEFAULT_ACCENT)

/** 读取初始主题：localStorage 记忆优先，其次跟随系统偏好，最后回退浅色 */
function resolveInitialTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY_THEME)
  if (saved === Theme.LIGHT || saved === Theme.DARK) {
    return saved
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? Theme.DARK : Theme.LIGHT
}

/** 把当前主题与主题色同步到 :root 上（CSS 变量驱动整页配色） */
function applyToDocument(): void {
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
 * 主题 composable：在应用入口调用一次完成首屏挂载，其余组件直接复用单例状态。
 */
export function useTheme() {
  // 首屏（或任意组件首次使用）即把状态落到 DOM 上
  applyToDocument()

  return {
    theme: readonly(theme),
    accent: readonly(accent),
    /** 当前是否深色，模板里常用 */
    isDark: () => theme.value === Theme.DARK,
    toggleTheme,
    setAccent,
  }
}
