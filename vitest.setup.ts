import { vi } from 'vitest'

// jsdom 未实现 window.matchMedia —— useTheme.resolveInitialTheme() 在无 localStorage 记录时
// 会读取系统深色偏好,直接调用会抛错。这里 stub 成"不偏好深色",让测试可控制其返回。
vi.stubGlobal(
  'matchMedia',
  vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
)
