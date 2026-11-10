import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { APP } from '@/lib/constants'

/**
 * Atualiza dinamicamente title, meta description, canonical e OG tags
 * conforme a rota ativa. Melhora SEO/AEO em SPA sem SSR.
 */
export function useSeo() {
  const route = useRoute()

  function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, name)
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

  function apply() {
    const title = route.meta.title ? `${route.meta.title}` : 'Calculadora Freelancer — 3W Online'
    const description =
      route.meta.description ||
      'Ferramenta gratuita e profissional para freelancers calcularem valor/hora, orçamentos e prazos.'
    const url = `${APP.siteUrl}${route.path === '/' ? '' : route.path}`

    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', url, 'property')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setCanonical(url)

    // Notifica GA4/GTM da mudança de página virtual (SPA)
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'page_view', page_path: url, page_title: title })
    }
  }

  watch(() => route.fullPath, apply, { immediate: true })
}
