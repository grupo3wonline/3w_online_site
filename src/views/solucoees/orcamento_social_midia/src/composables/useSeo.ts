import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { siteConfig } from '@/config/site'

/**
 * Gerencia SEO por rota de forma reativa (SPA):
 * - <title>, meta description/keywords
 * - Open Graph e Twitter Cards
 * - canonical dinâmico
 * Complementa o SEO estático do index.html (SEO/SEM/GEO/AEO).
 */

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

export function useSeo() {
  const route = useRoute()

  const apply = () => {
    const pageTitle = route.meta.title || siteConfig.name
    const fullTitle = route.name === 'home' ? pageTitle : `${pageTitle} | ${siteConfig.shortName}`
    const description = route.meta.description || siteConfig.description
    const canonical = new URL(route.fullPath, siteConfig.url).href

    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', 'description', description)

    // Open Graph
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical)

    // Twitter
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

    setCanonical(canonical)
  }

  watch(() => route.fullPath, apply, { immediate: true })

  return { apply }
}
