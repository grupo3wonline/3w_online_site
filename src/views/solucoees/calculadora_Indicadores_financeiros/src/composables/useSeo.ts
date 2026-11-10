import { watchEffect } from 'vue'

const SITE_URL = import.meta.env.VITE_SITE_URL || ''
const BASE_TITLE = 'Calculadora de Indicadores Financeiros'

export interface SeoOptions {
  title?: string
  description?: string
  path?: string
  keywords?: string
  ogType?: string
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/**
 * Atualiza título, meta description, Open Graph, Twitter e canonical por rota.
 * Cobre SEO/SEM/GEO/AEO com dados estruturados e canonical consistentes.
 */
export function useSeo(options: SeoOptions | (() => SeoOptions)) {
  watchEffect(() => {
    const opts = typeof options === 'function' ? options() : options
    const fullTitle = opts.title ? `${opts.title} | ${BASE_TITLE}` : BASE_TITLE
    const description = opts.description ?? ''
    const url = `${SITE_URL}${opts.path ?? '/'}`.replace(/\/+$/, '/') // normaliza

    document.title = fullTitle

    setMeta('meta[name="description"]', 'name', 'description', description)
    if (opts.keywords) setMeta('meta[name="keywords"]', 'name', 'keywords', opts.keywords)

    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', opts.ogType ?? 'website')

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

    setCanonical(url)
  })
}
