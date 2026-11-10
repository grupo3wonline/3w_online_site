/**
 * Constantes globais da aplicação.
 * Centraliza dados da empresa desenvolvedora e canais de contato (Single Source of Truth).
 */

export const COMPANY = {
  name: '3W Online',
  legalName: 'Grupo 3W Online',
  tagline: 'Desenvolvimento de sites e sistemas personalizados sob demanda',
  site: 'https://www.3wonline.com.br',
  ctaUrl: 'https://www.3wonline.com.br',
  email: 'contato@3wonline.com.br',
  privacyEmail: 'privacidade@3wonline.com.br',
  whatsappDisplay: '(41) 99692-4829',
  whatsappLink: 'https://wa.me/5541996924829',
  location: 'Curitiba, Paraná, Brasil',
} as const

export const DEVELOPER = {
  credit: 'HOTWYL | WILLFROMBRASIL',
} as const

export const SOCIAL_LINKS = [
  { icon: 'fab fa-facebook-f', name: 'Facebook', url: 'https://www.facebook.com/3wonline' },
  { icon: 'fab fa-instagram', name: 'Instagram', url: 'https://www.instagram.com/3wonline' },
  {
    icon: 'fab fa-linkedin-in',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/3wonline',
  },
  { icon: 'fab fa-youtube', name: 'YouTube', url: 'https://youtube.com/@3wonline' },
] as const

export const APP = {
  name: 'Calculadora Freelancer',
  version: '1.0.0',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://app.3wonline.com.br/calculadora_freelance',
} as const
