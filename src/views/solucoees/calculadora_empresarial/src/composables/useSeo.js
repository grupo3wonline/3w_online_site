import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { SITE } from '@/config/site'

/**
 * Composable de SEO por rota (SEO/SEM/GEO/AEO).
 * Gera title, meta description/keywords, Open Graph, Twitter Card,
 * canonical e dados estruturados JSON-LD específicos de cada página.
 *
 * @param {object} options
 * @param {string} options.title            Título da página (sem sufixo do site).
 * @param {string} [options.description]    Descrição para meta/OG.
 * @param {string} [options.keywords]       Palavras-chave.
 * @param {string} [options.image]          Imagem OG absoluta ou relativa.
 * @param {object} [options.jsonLd]         Objeto JSON-LD adicional (schema.org).
 * @param {'website'|'article'} [options.type]
 */
export function useSeo(options = {}) {
  const route = useRoute()

  const fullTitle = computed(() =>
    options.title ? `${options.title} | ${SITE.name}` : `${SITE.name} - Ferramentas Gratuitas para Empreendedores`
  )
  const description = computed(() => options.description || SITE.description)
  const keywords = computed(() => options.keywords || SITE.keywords)
  const canonical = computed(() => `${SITE.origin}${route.path === '/' ? '/' : route.path}`)
  const image = computed(() => {
    const img = options.image || SITE.ogImage
    return img.startsWith('http') ? img : `${SITE.baseUrl}${img}`
  })

  const head = {
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: SITE.author },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      // Open Graph
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: options.type || 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: SITE.locale },
      { property: 'og:image', content: image },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ],
    link: [{ rel: 'canonical', href: canonical }]
  }

  // Dados estruturados JSON-LD específicos da página (AEO / rich results)
  if (options.jsonLd) {
    head.script = [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(options.jsonLd)
      }
    ]
  }

  useHead(head)
}

/**
 * Helper para schema.org de uma ferramenta/calculadora (SoftwareApplication).
 */
export function calculatorJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${SITE.origin}${path}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    author: { '@type': 'Organization', name: SITE.company.name, url: SITE.company.url }
  }
}

/**
 * Schema FAQPage para AEO (respostas diretas em buscadores/assistentes).
 * @param {{question:string, answer:string}[]} faqs
 */
export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  }
}
