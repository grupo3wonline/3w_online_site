import { useHead } from '@unhead/vue'

export interface SEOOptions {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? 'https://app.3wonline.com.br/calculadora_ponto_eletrico'
const SITE_NAME = 'Calculadora de Pontos Elétricos'

/**
 * Define as meta tags de SEO da rota atual (título, descrição, canonical, OG, Twitter).
 */
export function useSEO(options: SEOOptions = {}): void {
  const {
    title = SITE_NAME,
    description = 'Calculadora profissional de pontos elétricos baseada na NBR 5410.',
    keywords = 'calculadora elétrica, pontos elétricos, NBR 5410',
    image = '/og-image.jpg',
    url = '',
    type = 'website',
  } = options

  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  useHead({
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:type', content: type },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: fullUrl },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:image', content: fullImage },
      { property: 'og:locale', content: 'pt_BR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: fullImage },
    ],
    link: [{ rel: 'canonical', href: fullUrl }],
  })
}

/** Presets de SEO por página. */
export const SEO_PRESETS: Record<string, SEOOptions> = {
  HOME: {
    title: 'Calculadora de Pontos Elétricos NBR 5410',
    description:
      'Calculadora profissional de pontos elétricos, metragem de cabos, demanda e disjuntores. Gratuita e precisa, baseada na NBR 5410 para eletricistas, engenheiros e arquitetos.',
    keywords:
      'calculadora elétrica, pontos elétricos, NBR 5410, instalação elétrica, dimensionamento elétrico, grupo 3w online',
    url: '/',
  },
}
