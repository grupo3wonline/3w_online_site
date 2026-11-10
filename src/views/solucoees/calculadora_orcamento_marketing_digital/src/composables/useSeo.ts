import { watchEffect } from 'vue'
import { site } from '@/config/site'

export interface SeoMeta {
  title?: string
  description?: string
  keywords?: string
  path?: string
  ogType?: string
  image?: string
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
 * Aplica metadados de SEO/SMO reativos para a página atual.
 * Cobre SEO clássico, Open Graph, Twitter Card e canonical (base para SEM/GEO/AEO).
 */
export function useSeo(meta: () => SeoMeta) {
  watchEffect(() => {
    const m = meta()
    const fullTitle = m.title ? `${m.title} | ${site.shortName}` : site.name
    const description = m.description ?? site.description
    const keywords = m.keywords ?? site.keywords
    const url = m.path ? `${site.url}${m.path}` : site.url
    const image = m.image ?? `${site.basePath}og-image.jpg`

    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', keywords)
    upsertCanonical(url)

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', m.ogType ?? 'website')
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)

    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)
  })
}
