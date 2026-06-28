// 每个路由的 SEO 文案:title / description / 路径 / 是否禁止收录
export type SeoRouteKey = 'HOME' | 'LEGAL' | 'LOGIN' | 'REGISTER'

export interface SeoEntry {
  path: string
  title: string
  description: string
  /** 为 true 时输出 robots=noindex,且不进 sitemap */
  noindex?: boolean
}

export const SEO: Record<SeoRouteKey, SeoEntry> = {
  HOME: {
    path: '/',
    title: 'MintPop — One API for text, vision, and voice',
    description:
      'MintPop — multimodal AI infrastructure for developers. Build text, vision, and voice into your product through a single, unified endpoint.',
  },
  LEGAL: {
    path: '/legal',
    title: 'Legal — MintPop',
    description:
      'Terms of Service, Privacy Policy, Refund Policy, Acceptable Use and contact details for MintPop.',
  },
  LOGIN: {
    path: '/login',
    title: 'Login — MintPop',
    description: 'Sign in to your MintPop account.',
    noindex: true,
  },
  REGISTER: {
    path: '/register',
    title: 'Get Started — MintPop',
    description: 'Create a MintPop account and start building multimodal AI.',
    noindex: true,
  },
}
