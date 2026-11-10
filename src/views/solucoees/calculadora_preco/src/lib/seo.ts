export const SITE_URL =
  import.meta.env.VITE_SITE_URL || 'https://app.3wonline.com.br/calculadora_preco'
export const SITE_NAME = 'Calculadora de Preços Profissional'
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export interface RouteSeo {
  title: string
  description: string
  keywords?: string
  path: string
}

/** Metadados SEO por rota (usados por useSeo + useHead). */
export const routeSeo: Record<string, RouteSeo> = {
  home: {
    title: 'Calculadora de Preços Profissional | Descubra o Valor Justo do Seu Trabalho',
    description:
      'Calcule preços de produtos e serviços com precisão profissional. Ferramenta gratuita, rápida e segura para empreendedores, freelancers e empresas.',
    keywords:
      'calculadora de preços, precificação, margem de lucro, custos, empreendedorismo, freelancer, pequenas empresas, calculadora gratuita',
    path: '/',
  },
  calculadora: {
    title: 'Calculadora de Preços | Ferramenta de Cálculo Gratuita',
    description:
      'Preencha custos fixos, variáveis, margem de lucro e impostos e descubra o preço ideal do seu produto ou serviço. Cálculo instantâneo e seguro.',
    keywords:
      'calculadora, preço de venda, markup, margem de lucro, impostos, custo fixo, custo variável',
    path: '/calculadora',
  },
  termos: {
    title: 'Termos de Uso | Calculadora de Preços',
    description: 'Termos de uso da Calculadora de Preços desenvolvida pelo Grupo 3w Online.',
    path: '/termos',
  },
  privacidade: {
    title: 'Política de Privacidade | Calculadora de Preços',
    description:
      'Política de privacidade em conformidade com LGPD, GDPR, CCPA e POPIA. Saiba como tratamos seus dados.',
    path: '/privacidade',
  },
  notFound: {
    title: 'Página não encontrada | Calculadora de Preços',
    description: 'A página que você procura não existe ou foi removida.',
    path: '/404',
  },
  erro: {
    title: 'Ocorreu um erro | Calculadora de Preços',
    description: 'Ocorreu um erro inesperado na aplicação.',
    path: '/erro',
  },
}

/** Structured Data JSON-LD (WebApplication). */
export function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    description: routeSeo.home.description,
    url: SITE_URL,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    author: {
      '@type': 'Organization',
      name: 'Grupo 3w Online',
      url: 'https://www.3wonline.com.br',
    },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '1850' },
    featureList: [
      'Cálculo preciso de margem de lucro',
      'Análise completa de custos',
      '100% gratuito e sem limites',
      'Interface moderna e intuitiva',
      'Processamento local e seguro',
      'Modo claro e escuro',
    ],
    keywords: routeSeo.home.keywords,
    inLanguage: 'pt-BR',
  }
}
