// Configuração central do site (marca, contatos, URLs, analytics)

export const SITE = {
  name: 'CableCal',
  fullName: 'Calculadora de Metragem de Cabos',
  shortName: 'CableCal',
  description:
    'Ferramenta profissional 100% gratuita para cálculo preciso de metragem de cabos elétricos em instalações. Rápida, confiável e sem cadastro.',
  url: import.meta.env.VITE_APP_URL || 'https://app.3wonline.com/calculadora_metragem_cabo',
  base: import.meta.env.VITE_APP_BASE_URL || '/calculadora_metragem_cabo/',
  locale: 'pt_BR',
  themeColor: '#16a34a',
} as const

export const DEVELOPER = {
  name: 'HOTWYL | WILLFROMBRASIL',
  person: 'William Camargo',
  github: 'https://github.com/willfrombrasil',
  linkedin: 'https://www.linkedin.com/in/william-camargo-50aab85b/',
} as const

export const COMPANY = {
  name: 'Grupo 3W Online',
  tagline: 'Sites e sistemas personalizados sob demanda',
  url: 'https://www.3wonline.com.br',
  whatsapp: '(41) 99692-4829',
  whatsappLink: 'https://wa.me/5541996924829',
  email: 'contato@3wonline.com.br',
  emailLink: 'mailto:contato@3wonline.com.br',
} as const

export const ANALYTICS = {
  gaId: import.meta.env.VITE_GA_ID || '',
  gtmId: import.meta.env.VITE_GTM_ID || '',
} as const
