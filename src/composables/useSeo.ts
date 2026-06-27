import { useHead } from '@unhead/vue'

import { absoluteUrl } from '@/config/site'
import { SEO, type SeoRouteKey } from '@/config/seo'

/**
 * 按路由 key 声明该页 head:title、description、canonical;
 * noindex 页额外输出 robots=noindex。Task 3 将在此扩展 OG/Twitter/JSON-LD。
 */
export function useSeo(key: SeoRouteKey): void {
  const entry = SEO[key]
  const canonical = absoluteUrl(entry.path)

  const meta = [
    { name: 'description', content: entry.description },
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
