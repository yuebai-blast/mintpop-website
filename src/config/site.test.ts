import { describe, expect, it } from 'vitest'

import { SEO } from './seo'
import { absoluteUrl, INDEXABLE_ROUTES, SITE_URL } from './site'

describe('absoluteUrl', () => {
  it('把站内相对路径拼到站点域名后', () => {
    expect(absoluteUrl('/legal')).toBe(`${SITE_URL}/legal`)
  })

  it('根路径拼出站点根 URL', () => {
    expect(absoluteUrl('/')).toBe(`${SITE_URL}/`)
  })
})

describe('INDEXABLE_ROUTES', () => {
  it('只包含未标 noindex 的路由,与 SEO 配置派生一致', () => {
    const expected = Object.values(SEO)
      .filter((e) => !e.noindex)
      .map((e) => e.path)
    expect(INDEXABLE_ROUTES).toEqual(expected)
  })

  it('排除所有 noindex 路由(login/register 不进 sitemap)', () => {
    expect(INDEXABLE_ROUTES).not.toContain(SEO.LOGIN.path)
    expect(INDEXABLE_ROUTES).not.toContain(SEO.REGISTER.path)
  })

  it('包含可收录路由(home/legal)', () => {
    expect(INDEXABLE_ROUTES).toContain(SEO.HOME.path)
    expect(INDEXABLE_ROUTES).toContain(SEO.LEGAL.path)
  })
})
