/** Configuração global do site — usada em SEO, footer, contato e CTAs. */
export const siteConfig = {
  name: 'Dados Brasil Generator Pro',
  shortName: 'Gerador Brasil',
  description:
    'Plataforma gratuita para gerar e validar documentos brasileiros (CPF, CNPJ, RG, CNH e mais). Dados sintéticos para testes de software e desenvolvimento.',
  url: import.meta.env.VITE_APP_URL || 'https://www.3wonline.com.br/dados_brasil_generator_pro',
  basePath: '/dados_brasil_generator_pro/',
  locale: 'pt_BR',
  themeColor: '#7c3aed',
  version: '1.0.0',
  author: 'willfrombrasil | hotwyl',
  developer: {
    name: 'HOTWYL | WILLFROMBRASIL',
    company: 'Grupo 3w Online',
    companyDescription: 'Desenvolvimento de sites e sistemas personalizados sob demanda.',
    site: 'https://www.3wonline.com.br',
    whatsapp: '(41) 99692-4829',
    whatsappLink: 'https://wa.me/5541996924829',
    email: 'contato@3wonline.com.br',
  },
  analytics: {
    ga4: import.meta.env.VITE_GA4_ID || 'G-J06THXX0MW',
    gtm: import.meta.env.VITE_GTM_ID || 'GTM-WVMJV7G6',
  },
} as const

export type SiteConfig = typeof siteConfig
