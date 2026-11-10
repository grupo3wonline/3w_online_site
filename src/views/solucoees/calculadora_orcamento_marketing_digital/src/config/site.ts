/**
 * Configurações centrais do site (fonte única da verdade).
 * Evita repetição de dados de contato, empresa e SEO pelo código.
 */
export const site = {
  name: 'Calculadora de Orçamento de Marketing Digital',
  shortName: 'Calc Marketing',
  description:
    'Calculadora gratuita para orçamentos de marketing digital. Ideal para influenciadores, agências e criadores de conteúdo. Calcule o valor ideal para suas campanhas de forma rápida e profissional.',
  url:
    import.meta.env.VITE_APP_URL ||
    'https://app.3wonline.com/calculadora_orcamento_marketing_digital',
  basePath: '/calculadora_orcamento_marketing_digital/',
  locale: 'pt_BR',
  themeColor: '#4F46E5',
  keywords:
    'calculadora marketing digital, orçamento marketing, calculadora influenciador, precificar campanha, marketing de influência, agência digital, criador de conteúdo, ROI marketing',
  version: '2.0.0',
  developer: {
    person: 'HOTWYL | WILLFROMBRASIL',
    company: 'Grupo 3w Online',
    companyUrl: 'https://www.3wonline.com.br',
    description:
      'Empresa especializada em desenvolvimento de sites e sistemas personalizados sob demanda.',
  },
  contact: {
    whatsapp: '(41) 99692-4829',
    whatsappLink: 'https://wa.me/5541996924829',
    email: 'contato@3wonline.com.br',
    emailLink: 'mailto:contato@3wonline.com.br',
    website: 'www.3wonline.com.br',
    websiteLink: 'https://www.3wonline.com.br',
    instagram: 'https://www.instagram.com/grupo3wonline',
    linkedin: 'https://www.linkedin.com/company/grupo3wonline',
  },
  analytics: {
    ga4: import.meta.env.VITE_GA4_ID || 'G-J06THXX0MW',
    gtm: import.meta.env.VITE_GTM_ID || 'GTM-WVMJV7G6',
  },
} as const

export type SiteConfig = typeof site
