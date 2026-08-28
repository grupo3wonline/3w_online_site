/**
 * Composable para SEO, SEM, GEO e AEO (Answer Engine Optimization).
 * Gerencia meta tags, dados estruturados (Schema.org/JSON-LD),
 * Open Graph, Twitter Cards, canonical URLs, geo-targeting, AEO para IA e SEM.
 */

const BASE_URL = 'https://www.3wonline.com.br'
const SITE_NAME = '3W Online'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`
const GEO_REGION = 'BR-PR'
const GEO_PLACE = 'Curitiba'
const GEO_POSITION = '-25.4284;-49.2733'

export interface FaqItem {
  question: string
  answer: string
}

export interface StepItem {
  name: string
  text: string
}

export interface SeoConfig {
  title: string
  description: string
  path?: string
  image?: string
  type?: string
  keywords?: string
  noindex?: boolean
  faqs?: FaqItem[]
  steps?: StepItem[]
  serviceType?: string
  servicePrice?: string
}

export function useSeo() {
  /** Set or update a meta tag by name */
  function setMetaName(name: string, content: string) {
    if (typeof document === 'undefined') return
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = name
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  /** Set or update a meta tag by property (OG/Twitter) */
  function setMetaProperty(property: string, content: string) {
    if (typeof document === 'undefined') return
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  /** Set canonical URL */
  function setCanonical(url: string) {
    if (typeof document === 'undefined') return
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
  }

  /** Inject JSON-LD structured data */
  function injectJsonLd(schema: Record<string, unknown>, id = 'seo-jsonld') {
    if (typeof document === 'undefined') return
    const existing = document.querySelector(`script[data-seo="${id}"]`)
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo', id)
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  }

  /** Schema.org — Organization (site-wide) */
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '3W Online',
    alternateName: 'Grupo 3W Online',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description: 'Agência de marketing digital, criação de sites, sistemas sob medida e automação com IA em Curitiba/PR.',
    foundingDate: '2019',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'PR',
      addressLocality: 'Curitiba',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -25.4284,
      longitude: -49.2733,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-41-99692-4829',
      contactType: 'customer service',
      availableLanguage: ['Portuguese', 'English'],
      areaServed: ['BR', 'US', 'EU'],
    },
    sameAs: [
      'https://www.facebook.com/grupo3wonline',
      'https://www.instagram.com/grupo3wonline',
    ],
  }

  /** Schema.org — LocalBusiness (GEO) */
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: '3W Online',
    image: `${BASE_URL}/favicon.svg`,
    url: BASE_URL,
    telephone: '+55-41-99692-4829',
    email: 'contato@3wonline.com.br',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Curitiba',
      addressRegion: 'PR',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -25.4284,
      longitude: -49.2733,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    priceRange: '$$',
    areaServed: [
      { '@type': 'City', name: 'Curitiba' },
      { '@type': 'State', name: 'Paraná' },
      { '@type': 'Country', name: 'Brasil' },
    ],
  }

  /** Schema.org — WebSite with SearchAction (AEO) */
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: 'Agência de marketing digital e desenvolvimento em Curitiba. Sites, sistemas, apps, automação com IA.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/servicos?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  /** Schema.org — BreadcrumbList */
  function breadcrumbSchema(items: { name: string; url: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
      })),
    }
  }

  /** Schema.org — FAQPage (AEO - Answer Engine Optimization) */
  function faqSchema(faqs: FaqItem[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }
  }

  /** Schema.org — Speakable (AEO para IA e Voice Search) */
  function speakableSchema(url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.page-hero-subtitle', '.section-title', '.section-subtitle'],
      },
    }
  }

  /** Schema.org — Service (SEM / SEO) */
  function serviceSchema(name: string, description: string, url: string, price?: string) {
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: name,
      name,
      description,
      url: `${BASE_URL}${url}`,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
      },
      areaServed: { '@type': 'Country', name: 'Brazil' },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${BASE_URL}${url}`,
        servicePhone: '+55-41-99692-4829',
      },
    }

    if (price) {
      schema.offers = {
        '@type': 'Offer',
        price,
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
      }
    }

    return schema
  }

  /** Schema.org — HowTo (AEO) */
  function howToSchema(name: string, description: string, steps: StepItem[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name,
      description,
      step: steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    }
  }

  /** Apply full SEO configuration to current page */
  function applySeo(config: SeoConfig) {
    const {
      title,
      description,
      path = '/',
      image = DEFAULT_IMAGE,
      type = 'website',
      keywords,
      noindex,
      faqs,
      steps,
      serviceType,
      servicePrice,
    } = config

    const fullUrl = `${BASE_URL}${path}`

    // Title
    document.title = title

    // Basic meta
    setMetaName('description', description)
    setMetaName('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
    if (keywords) setMetaName('keywords', keywords)

    // Open Graph
    setMetaProperty('og:title', title)
    setMetaProperty('og:description', description)
    setMetaProperty('og:url', fullUrl)
    setMetaProperty('og:type', type)
    setMetaProperty('og:image', image)
    setMetaProperty('og:image:width', '1200')
    setMetaProperty('og:image:height', '630')
    setMetaProperty('og:site_name', SITE_NAME)
    setMetaProperty('og:locale', 'pt_BR')

    // Twitter Cards
    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:title', title)
    setMetaName('twitter:description', description)
    setMetaName('twitter:image', image)

    // GEO targeting (Curitiba / PR / Brasil)
    setMetaName('geo.region', GEO_REGION)
    setMetaName('geo.placename', GEO_PLACE)
    setMetaName('geo.position', GEO_POSITION)
    setMetaName('ICBM', GEO_POSITION.replace(';', ', '))

    // AEO & Voice Search Meta
    setMetaName('ai-search-bot', 'index, follow')
    setMetaName('format-detection', 'telephone=no')

    // Canonical
    setCanonical(fullUrl)

    // Injeção de Schemas Dinâmicos para AEO e SEO
    injectJsonLd(organizationSchema, 'schema-org')
    injectJsonLd(localBusinessSchema, 'schema-local')
    injectJsonLd(speakableSchema(fullUrl), 'schema-speakable')

    if (faqs && faqs.length > 0) {
      injectJsonLd(faqSchema(faqs), 'schema-faq')
    }

    if (steps && steps.length > 0) {
      injectJsonLd(howToSchema(title, description, steps), 'schema-howto')
    }

    if (serviceType) {
      injectJsonLd(serviceSchema(serviceType, description, path, servicePrice), 'schema-service')
    }
  }

  return {
    applySeo,
    injectJsonLd,
    setMetaName,
    setMetaProperty,
    setCanonical,
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    breadcrumbSchema,
    serviceSchema,
    faqSchema,
    howToSchema,
    speakableSchema,
    BASE_URL,
  }
}
