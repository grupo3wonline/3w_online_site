import { toValue, type MaybeRefOrGetter } from 'vue'
import { useHead } from '@unhead/vue'
import { OG_IMAGE, SITE_NAME, SITE_URL, type RouteSeo } from '@/lib/seo'

/**
 * Aplica title/description/canonical/OG/Twitter para uma rota.
 * Aceita valor estático ou reativo (ref/computed/getter) e reage a mudanças.
 */
export function useSeo(source: MaybeRefOrGetter<RouteSeo>) {
  const canonical = () => {
    const seo = toValue(source)
    return `${SITE_URL}${seo.path === '/' ? '' : seo.path}`
  }

  useHead({
    title: () => toValue(source).title,
    meta: [
      { name: 'description', content: () => toValue(source).description },
      { name: 'keywords', content: () => toValue(source).keywords ?? '' },
      { property: 'og:title', content: () => toValue(source).title },
      { property: 'og:description', content: () => toValue(source).description },
      { property: 'og:url', content: canonical },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'pt_BR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: () => toValue(source).title },
      { name: 'twitter:description', content: () => toValue(source).description },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    link: [{ rel: 'canonical', href: canonical }],
  })
}
