import { watch } from 'vue'
import { useRouter } from 'vue-router'

export function useSEO() {
  const router = useRouter()

  const setMetaTags = (meta = {}) => {
    // Title
    if (meta.title) {
      document.title = meta.title
    }

    // Meta Description
    updateMetaTag('name', 'description', meta.description)

    // Keywords
    if (meta.keywords) {
      updateMetaTag('name', 'keywords', meta.keywords)
    }

    // Open Graph
    updateMetaTag('property', 'og:title', meta.title || document.title)
    updateMetaTag('property', 'og:description', meta.description)
    updateMetaTag('property', 'og:type', meta.type || 'website')
    updateMetaTag('property', 'og:url', meta.url || window.location.href)
    if (meta.image) {
      updateMetaTag('property', 'og:image', meta.image)
    }

    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    updateMetaTag('name', 'twitter:title', meta.title || document.title)
    updateMetaTag('name', 'twitter:description', meta.description)
    if (meta.image) {
      updateMetaTag('name', 'twitter:image', meta.image)
    }

    // Canonical
    if (meta.canonical) {
      updateCanonical(meta.canonical)
    }
  }

  const updateMetaTag = (attribute, key, content) => {
    if (!content) return

    let element = document.querySelector(`meta[${attribute}="${key}"]`)
    
    if (element) {
      element.setAttribute('content', content)
    } else {
      element = document.createElement('meta')
      element.setAttribute(attribute, key)
      element.setAttribute('content', content)
      document.head.appendChild(element)
    }
  }

  const updateCanonical = (url) => {
    let link = document.querySelector('link[rel="canonical"]')
    
    if (link) {
      link.setAttribute('href', url)
    } else {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      link.setAttribute('href', url)
      document.head.appendChild(link)
    }
  }

  const addStructuredData = (data) => {
    let script = document.querySelector('script[type="application/ld+json"]')
    
    if (script) {
      script.textContent = JSON.stringify(data)
    } else {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
    }
  }

  // Auto-update SEO on route change
  watch(
    () => router.currentRoute.value,
    (route) => {
      if (route.meta) {
        setMetaTags({
          title: route.meta.title,
          description: route.meta.description,
          keywords: route.meta.keywords,
          canonical: route.meta.canonical
        })
      }
    },
    { immediate: true }
  )

  return {
    setMetaTags,
    addStructuredData
  }
}
