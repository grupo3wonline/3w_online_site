/**
 * Composable para gerenciamento de SEO
 * @module useSEO
 */

import { watch } from 'vue'
import { useRoute } from 'vue-router'

export function useSEO() {
  const route = useRoute()

  /**
   * Atualiza o título da página
   * @param {string} title - Novo título
   */
  const setTitle = (title) => {
    document.title = title || 'Simulador de Investimentos - InvestSim'
  }

  /**
   * Atualiza uma meta tag
   * @param {string} name - Nome ou propriedade da meta tag
   * @param {string} content - Conteúdo da meta tag
   * @param {string} attr - Atributo (name ou property)
   */
  const setMetaTag = (name, content, attr = 'name') => {
    let element = document.querySelector(`meta[${attr}="${name}"]`)
    
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attr, name)
      document.head.appendChild(element)
    }
    
    element.setAttribute('content', content)
  }

  /**
   * Atualiza múltiplas meta tags de uma vez
   * @param {Object} metaTags - Objeto com pares chave-valor de meta tags
   */
  const setMetaTags = (metaTags) => {
    Object.entries(metaTags).forEach(([key, value]) => {
      if (key.startsWith('og:') || key.startsWith('twitter:')) {
        setMetaTag(key, value, 'property')
      } else {
        setMetaTag(key, value, 'name')
      }
    })
  }

  /**
   * Define link canonical
   * @param {string} url - URL canonical
   */
  const setCanonical = (url) => {
    let link = document.querySelector('link[rel="canonical"]')
    
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    
    link.setAttribute('href', url)
  }

  /**
   * Adiciona structured data (JSON-LD)
   * @param {Object} data - Dados estruturados
   */
  const setStructuredData = (data) => {
    let script = document.querySelector('script[type="application/ld+json"]#dynamic-structured-data')
    
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'dynamic-structured-data'
      document.head.appendChild(script)
    }
    
    script.textContent = JSON.stringify(data)
  }

  /**
   * Configura SEO completo para uma página
   * @param {Object} config - Configuração de SEO
   */
  const setSEO = (config = {}) => {
    const {
      title,
      description,
      keywords,
      image,
      url,
      type = 'website',
      structuredData
    } = config

    if (title) {
      setTitle(title)
      setMetaTags({
        'og:title': title,
        'twitter:title': title
      })
    }

    if (description) {
      setMetaTags({
        'description': description,
        'og:description': description,
        'twitter:description': description
      })
    }

    if (keywords) {
      setMetaTag('keywords', keywords)
    }

    if (image) {
      setMetaTags({
        'og:image': image,
        'twitter:image': image
      })
    }

    if (url) {
      setCanonical(url)
      setMetaTags({
        'og:url': url
      })
    }

    setMetaTags({
      'og:type': type,
      'og:locale': 'pt_BR',
      'twitter:card': 'summary_large_image'
    })

    if (structuredData) {
      setStructuredData(structuredData)
    }
  }

  // Observa mudanças na rota e atualiza SEO se houver meta tags
  watch(
    () => route.meta,
    (meta) => {
      if (meta.title) setTitle(meta.title)
      if (meta.description) setMetaTag('description', meta.description)
    },
    { immediate: true }
  )

  return {
    setTitle,
    setMetaTag,
    setMetaTags,
    setCanonical,
    setStructuredData,
    setSEO
  }
}
