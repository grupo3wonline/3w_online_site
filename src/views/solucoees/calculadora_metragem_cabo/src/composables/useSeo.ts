import { watchEffect, type MaybeRefOrGetter, toValue } from 'vue'
import { SITE, COMPANY } from '@/config/site'
import type { SeoMeta } from '@/types'

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  if (!content) return
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string): void {
  if (!href) return
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Aplica metadados de SEO (title, description, Open Graph, Twitter, canonical)
 * de forma reativa. Cobre SEO, SEM, GEO e AEO com dados estruturados no index.html.
 */
export function useSeo(meta: MaybeRefOrGetter<SeoMeta>): void {
  watchEffect(() => {
    const m = toValue(meta)
    const fullTitle = m.title.includes(SITE.name) ? m.title : `${m.title} | ${SITE.name}`
    const url = m.url || SITE.url
    const image = m.image || `${SITE.url}/og-image.jpg`

    document.title = fullTitle
    upsertMeta('name', 'description', m.description)
    if (m.keywords) upsertMeta('name', 'keywords', m.keywords)
    upsertMeta('name', 'author', COMPANY.name)

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', m.description)
    upsertMeta('property', 'og:type', m.type || 'website')
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SITE.fullName)
    upsertMeta('property', 'og:locale', SITE.locale)
    upsertMeta('property', 'og:image', image)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', m.description)
    upsertMeta('name', 'twitter:image', image)

    upsertLink('canonical', url)
  })
}
