/**
 * Gestão de meta tags por rota (SEO / SEM / GEO / AEO).
 * Atualiza title, description, canonical, Open Graph e Twitter Card em tempo de navegação.
 */

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.3wonline.com.br/analisador_texto/').replace(
  /\/+$/,
  '/'
)

export interface RouteSeo {
  title: string
  description: string
  /** Caminho relativo à base, ex.: 'ferramenta'. Vazio = home. */
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

export function applyRouteSeo(seo: RouteSeo): void {
  const url = SITE_URL + (seo.path ? `${seo.path}` : '')

  document.title = seo.title

  upsertMeta('name', 'description', seo.description)
  upsertCanonical(url)

  upsertMeta('property', 'og:title', seo.title)
  upsertMeta('property', 'og:description', seo.description)
  upsertMeta('property', 'og:url', url)

  upsertMeta('name', 'twitter:title', seo.title)
  upsertMeta('name', 'twitter:description', seo.description)
}
