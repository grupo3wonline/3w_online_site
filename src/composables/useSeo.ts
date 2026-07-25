/**
 * Composable para SEO e dados estruturados (Schema.org).
 * Injeta JSON-LD e meta tags dinamicamente.
 */
export function useSeo() {
  /** Injeta JSON-LD no head para dados estruturados */
  function injectJsonLd(schema: Record<string, unknown>) {
    if (typeof document === 'undefined') return

    const existing = document.querySelector('script[data-seo-jsonld]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-jsonld', '')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  }

  /** Schema.org para a organização */
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '3W Online',
    url: 'https://www.3wonline.com.br',
    logo: 'https://www.3wonline.com.br/favicon.svg',
    description: 'Agência de marketing digital e desenvolvimento em Curitiba, PR',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'PR',
      addressLocality: 'Curitiba',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-41-99692-4829',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
    sameAs: [
      'https://www.facebook.com/grupo3wonline',
      'https://www.instagram.com/grupo3wonline',
    ],
  }

  /** Schema.org para serviços */
  function serviceSchema(name: string, description: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: name,
      description,
      provider: {
        '@type': 'Organization',
        name: '3W Online',
      },
      areaServed: { '@type': 'Country', name: 'Brazil' },
    }
  }

  /** Schema.org para FAQ */
  function faqSchema(faqs: { question: string; answer: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    }
  }

  /** Atualiza meta tags dinamicamente */
  function setMeta(name: string, content: string) {
    if (typeof document === 'undefined') return
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = name
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  return {
    injectJsonLd,
    organizationSchema,
    serviceSchema,
    faqSchema,
    setMeta,
  }
}
