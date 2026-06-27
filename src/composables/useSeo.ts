import { useHead } from '@unhead/vue'

import { SEO, type SeoRouteKey } from '@/config/seo'
import { absoluteUrl, OG_IMAGE_PATH, SITE_NAME } from '@/config/site'

/**
 * 按路由 key 声明该页 head:基础 Meta + canonical + OG + Twitter 卡片。
 * noindex 页额外输出 robots=noindex。
 */
export function useSeo(key: SeoRouteKey): void {
  const entry = SEO[key]
  const canonical = absoluteUrl(entry.path)
  const ogImage = absoluteUrl(OG_IMAGE_PATH)

  const meta = [
    { name: 'description', content: entry.description },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:title', content: entry.title },
    { property: 'og:description', content: entry.description },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: ogImage },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: entry.title },
    { name: 'twitter:description', content: entry.description },
    { name: 'twitter:image', content: ogImage },
  ]
  if (entry.noindex) {
    meta.push({ name: 'robots', content: 'noindex' })
  }

  useHead({
    title: entry.title,
    meta,
    link: [{ rel: 'canonical', href: canonical }],
  })
}
