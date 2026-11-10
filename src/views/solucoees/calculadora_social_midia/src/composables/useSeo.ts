import { watchEffect } from 'vue'
import { SITE } from '@/lib/utils'

export interface SeoMeta {
  title: string
  description: string
  keywords?: string
  /** Caminho relativo da rota, ex: "/ferramentas". */
  path?: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Atualiza título e meta tags de SEO por página (SEO/SEM/GEO/AEO).
 * Mantém sincronia reativa quando os dados mudam.
 */
export function useSeo(meta: () => SeoMeta) {
  watchEffect(() => {
    const data = meta()
    const url = data.path ? `${SITE.baseUrl.replace(/\/$/, '')}${data.path}` : SITE.baseUrl

    document.title = data.title
    upsertMeta('name', 'description', data.description)
    if (data.keywords) upsertMeta('name', 'keywords', data.keywords)

    upsertMeta('property', 'og:title', data.title)
    upsertMeta('property', 'og:description', data.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('name', 'twitter:title', data.title)
    upsertMeta('name', 'twitter:description', data.description)

    upsertCanonical(url)
  })
}
