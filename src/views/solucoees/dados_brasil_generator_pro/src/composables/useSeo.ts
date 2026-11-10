import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { siteConfig } from '@/config/site'
import { tools } from '@/data/tools'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id: string, data: Record<string, unknown>) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Aplica SEO/AEO por rota: title, description, OG, Twitter, canonical, breadcrumb JSON-LD.
 */
export function useSeo() {
  const route = useRoute()

  function update() {
    const meta = route.meta as { title?: string; description?: string; breadcrumb?: { label: string; to?: string }[] }
    const title = meta.title || siteConfig.name
    const description = meta.description || siteConfig.description
    const canonical = `${siteConfig.url}${route.path === '/' ? '' : route.path}`

    document.title = title
    setMeta('name', 'description', description)

    // Keywords por rota de ferramenta (SEO)
    const toolSlug = (route.meta as { tool?: string }).tool
    if (toolSlug) {
      const tool = tools.find((t) => t.slug === toolSlug)
      if (tool) setMeta('name', 'keywords', tool.keywords.join(', '))
    }

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setCanonical(canonical)

    // Breadcrumb estruturado (AEO/GEO — ajuda motores e IA a entenderem a hierarquia)
    const crumbs = meta.breadcrumb || []
    if (crumbs.length > 0) {
      setJsonLd('ld-breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.label,
          ...(c.to ? { item: `${siteConfig.url}${c.to === '/' ? '' : c.to}` } : {}),
        })),
      })
    }
  }

  watch(() => route.fullPath, update, { immediate: true })

  return { update }
}
