import { watch } from 'vue'
import { useRoute } from 'vue-router'

const SITE_URL = 'https://app.3wonline.com.br/dev_toolkit_suite_essentials'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

export interface SeoMeta {
  title?: string
  description?: string
  keywords?: string
  image?: string
  type?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown>
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

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Aplica metatags de SEO/SEM/GEO/AEO dinamicamente conforme a rota atual.
 */
export function applySeo(meta: SeoMeta, path = '/') {
  const fullTitle = meta.title
    ? `${meta.title} | Dev Toolkit Suite Essentials`
    : 'Dev Toolkit Suite Essentials | Ferramentas Essenciais para Desenvolvedores'
  const description =
    meta.description ??
    'Suíte gratuita de ferramentas para desenvolvedores: JSON/XML, Base64, MD5, Markdown, strings e conversor de arquivos. 100% no navegador.'
  const image = meta.image ?? DEFAULT_IMAGE
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`
  const type = meta.type ?? 'website'

  document.title = fullTitle
  upsertMeta('name', 'description', description)
  if (meta.keywords) upsertMeta('name', 'keywords', meta.keywords)
  upsertMeta(
    'name',
    'robots',
    meta.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  )

  // Open Graph
  upsertMeta('property', 'og:title', fullTitle)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:url', canonical)
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:locale', 'pt_BR')

  // Twitter
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', fullTitle)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', image)

  upsertLink('canonical', canonical)

  if (meta.jsonLd) {
    upsertJsonLd('route-jsonld', meta.jsonLd)
  }
}

interface Crumb {
  label: string
  to?: string
}

/** Gera JSON-LD BreadcrumbList a partir da trilha da rota (bom para AEO/GEO). */
function applyBreadcrumbJsonLd(crumbs: Crumb[] | undefined, path: string) {
  const all: Crumb[] = [{ label: 'Início', to: '/' }, ...(crumbs ?? [])]
  const itemList = all.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    item: `${SITE_URL}${c.to ?? path}`,
  }))
  upsertJsonLd('breadcrumb-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemList,
  })
}

/**
 * Observa a rota e aplica automaticamente o SEO definido em route.meta.seo.
 */
export function useSeoFromRoute() {
  const route = useRoute()
  watch(
    () => route.fullPath,
    () => {
      const seo = (route.meta.seo as SeoMeta) ?? {}
      applySeo(seo, route.path)
      applyBreadcrumbJsonLd(route.meta.breadcrumb as Crumb[] | undefined, route.path)
    },
    { immediate: true }
  )
}
