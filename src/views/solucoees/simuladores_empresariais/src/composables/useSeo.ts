import { watch } from 'vue'
import { useRouter } from 'vue-router'

const BASE_URL = 'https://app.3wonline.com.br/simuladores_empresariais'
const SITE_NAME = 'Simuladores Empresariais Pro'

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

/**
 * Atualiza title, description, canonical, Open Graph e Twitter a cada troca de rota.
 * Contribui para SEO, SEM, GEO e AEO ao manter metadados coerentes por página.
 */
export function useSeo() {
  const router = useRouter()

  const aplicar = () => {
    const route = router.currentRoute.value
    const title = (route.meta.title as string) ?? SITE_NAME
    const description = (route.meta.description as string) ?? ''
    const url = `${BASE_URL}${route.path === '/' ? '/' : route.path}`

    document.title = title
    setMeta('name', 'description', description)
    setCanonical(url)

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'pt_BR')

    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    // GA4: dispara page_view em navegação SPA
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'page_view', {
        page_title: title,
        page_location: url,
        page_path: route.path,
      })
    }
  }

  watch(() => router.currentRoute.value.fullPath, aplicar, { immediate: true })
}
