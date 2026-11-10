import { watchEffect } from 'vue'
import { site } from '@/config/site'

export interface HeadOptions {
  title?: string
  description?: string
  keywords?: string
  /** Caminho canônico relativo à raiz do site (ex.: "/ferramentas") */
  path?: string
  image?: string
  type?: string
  /** JSON-LD (structured data) adicional para a página */
  jsonLd?: Record<string, unknown>
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const JSONLD_ID = 'route-jsonld'

/**
 * Gerencia as meta tags de <head> de forma reativa por rota.
 * Cobre SEO (title/description/keywords/canonical), SEM (robots),
 * GEO/AEO (Open Graph, Twitter, structured data JSON-LD).
 */
export function useHead(options: HeadOptions | (() => HeadOptions)) {
  watchEffect(() => {
    const opts = typeof options === 'function' ? options() : options
    const fullTitle = opts.title ? `${opts.title} | ${site.name}` : `${site.name} — ${site.shortDescription}`
    const description = opts.description ?? site.description
    const keywords = opts.keywords ?? site.keywords
    const canonical = opts.path ? `${site.url}${opts.path}` : site.url
    const image = opts.image ?? '/dev_playground/og-image.jpg'
    const type = opts.type ?? 'website'

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'keywords', keywords)
    setMeta(
      'name',
      'robots',
      opts.noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    )
    setLink('canonical', canonical)

    // Open Graph
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:site_name', site.name)
    setMeta('property', 'og:locale', site.locale)
    setMeta('property', 'og:image', image)

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    // JSON-LD estruturado por rota
    const existing = document.getElementById(JSONLD_ID)
    if (existing) existing.remove()
    if (opts.jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = JSONLD_ID
      script.textContent = JSON.stringify(opts.jsonLd)
      document.head.appendChild(script)
    }
  })
}
