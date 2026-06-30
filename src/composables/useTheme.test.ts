import { beforeEach, describe, expect, it, vi } from 'vitest'

// useTheme 是模块级单例(theme/accent 为模块内 ref)。为避免测试间状态串扰,
// 每个用例都 resetModules 后重新 import,拿到全新的单例。
async function freshTheme() {
  vi.resetModules()
  const mod = await import('./useTheme')
  return mod
}

// 控制 matchMedia 的系统深色偏好返回值(jsdom 无此 API,setup 已 stub,这里按用例覆盖)
function stubPrefersDark(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  // 默认"不偏好深色",个别用例再覆盖
  stubPrefersDark(false)
})

describe('Theme 枚举', () => {
  it('成员名与字符串取值统一为 SCREAMING_SNAKE_CASE 且逐字一致', async () => {
    const { Theme } = await freshTheme()
    expect(Theme.LIGHT).toBe('LIGHT')
    expect(Theme.DARK).toBe('DARK')
  })
})

describe('toggleTheme', () => {
  it('从浅色切到深色,持久化到 localStorage 并写入 document', async () => {
    const { useTheme } = await freshTheme()
    const { theme, toggleTheme } = useTheme()

    expect(theme.value).toBe('LIGHT')
    toggleTheme()

    expect(theme.value).toBe('DARK')
    expect(localStorage.getItem('mint-theme')).toBe('DARK')
    expect(document.documentElement.dataset.theme).toBe('DARK')
  })

  it('再次切换回浅色', async () => {
    const { useTheme } = await freshTheme()
    const { theme, toggleTheme } = useTheme()

    toggleTheme()
    toggleTheme()

    expect(theme.value).toBe('LIGHT')
    expect(localStorage.getItem('mint-theme')).toBe('LIGHT')
  })
})

describe('syncTheme / resolveInitialTheme', () => {
  it('localStorage 有有效记录时优先采用', async () => {
    localStorage.setItem('mint-theme', 'DARK')
    const { useTheme } = await freshTheme()
    const { theme, syncTheme } = useTheme()

    syncTheme()
    expect(theme.value).toBe('DARK')
  })

  it('无记录且系统偏好深色时取深色', async () => {
    stubPrefersDark(true)
    const { useTheme } = await freshTheme()
    const { theme, syncTheme } = useTheme()

    syncTheme()
    expect(theme.value).toBe('DARK')
  })

  it('无记录且系统不偏好深色时回退浅色', async () => {
    const { useTheme } = await freshTheme()
    const { theme, syncTheme } = useTheme()

    syncTheme()
    expect(theme.value).toBe('LIGHT')
  })

  it('localStorage 记录非法值时忽略,回退系统偏好', async () => {
    localStorage.setItem('mint-theme', 'PURPLE')
    const { useTheme } = await freshTheme()
    const { theme, syncTheme } = useTheme()

    syncTheme()
    expect(theme.value).toBe('LIGHT')
  })
})
