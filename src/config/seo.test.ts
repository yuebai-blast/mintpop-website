import { describe, expect, it } from 'vitest'

import { SEO, type SeoRouteKey } from './seo'

const ALL_KEYS: SeoRouteKey[] = ['HOME', 'LEGAL', 'LOGIN', 'REGISTER']

describe('SEO 配置', () => {
  it('四个路由 key 齐全', () => {
    expect(Object.keys(SEO).sort()).toEqual([...ALL_KEYS].sort())
  })

  it('每条都有非空 path/title/description', () => {
    for (const key of ALL_KEYS) {
      const entry = SEO[key]
      expect(entry.path).toMatch(/^\//)
      expect(entry.title.length).toBeGreaterThan(0)
      expect(entry.description.length).toBeGreaterThan(0)
    }
  })

  it('login/register 标了 noindex,home/legal 未标', () => {
    expect(SEO.LOGIN.noindex).toBe(true)
    expect(SEO.REGISTER.noindex).toBe(true)
    expect(SEO.HOME.noindex).toBeUndefined()
    expect(SEO.LEGAL.noindex).toBeUndefined()
  })

  it('path 互不重复', () => {
    const paths = ALL_KEYS.map((k) => SEO[k].path)
    expect(new Set(paths).size).toBe(paths.length)
  })
})
