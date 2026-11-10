/**
 * Configuração central do site.
 * Fonte única de verdade para metadados, contatos e URLs institucionais.
 * Valores sensíveis/variáveis podem vir de variáveis de ambiente (import.meta.env).
 */

const env = import.meta.env

export const siteConfig = {
  name: 'Calculadora de Orçamento para Social Mídia',
  shortName: 'Orçamento Social Mídia',
  description:
    'Crie orçamentos profissionais para social mídia em minutos. Ferramenta gratuita, rápida e segura com interface moderna e responsiva. Gere PDFs e impressione seus clientes.',
  url: env.VITE_APP_URL || 'https://app.3wonline.com/orcamento_social_midia/',
  basePath: '/orcamento_social_midia/',
  locale: 'pt-BR',
  themeColor: '#7c3aed',
  version: '2.0.0',
  keywords: [
    'orçamento social media',
    'calculadora social media',
    'preços social media',
    'freelancer social media',
    'orçamento instagram',
    'orçamento facebook',
    'precificação social media',
  ],
} as const

/** Empresa desenvolvedora */
export const company = {
  name: 'Grupo 3w Online',
  legalName: 'Grupo 3w Online',
  tagline: 'Desenvolvemos sites e sistemas personalizados sob demanda',
  website: 'https://www.3wonline.com.br',
  cta: 'https://www.3wonline.com.br',
  email: env.VITE_EMAIL || 'contato@3wonline.com.br',
  whatsapp: env.VITE_WHATSAPP || '(41) 99692-4829',
  whatsappLink: 'https://wa.me/5541996924829',
  developer: 'HOTWYL | WILLFROMBRASIL',
} as const

/** IDs de rastreamento (geomarketing) */
export const tracking = {
  gtmId: env.VITE_GTM_ID || 'GTM-WVMJV7G6',
  ga4Id: env.VITE_GA4_ID || 'G-J06THXX0MW',
  sentryDsn: env.VITE_SENTRY_DSN || '',
} as const

/** Redes sociais institucionais */
export const socialLinks = [
  { name: 'Facebook', icon: 'fa-brands fa-facebook', url: 'https://facebook.com' },
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://instagram.com' },
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: 'https://linkedin.com' },
] as const
