/**
 * Configuração central do site.
 * Fonte única de verdade para dados da empresa, contato, links e SEO base.
 */

export const site = {
  name: 'DevPlayground',
  shortDescription: 'Editor de Código Online Grátis, Rápido e Profissional',
  description:
    'Editor de código online gratuito e profissional para HTML, CSS, JavaScript e PHP. Escreva, teste e compartilhe código em tempo real com preview ao vivo, console integrado e interface moderna.',
  url: import.meta.env.VITE_SITE_URL || 'https://app.3wonline.com.br/dev_playground',
  locale: 'pt_BR',
  themeColor: '#7c3aed',
  version: '2.0.0',
  keywords:
    'editor de código online, playground javascript, editor html css, testar código php, codepen alternativa, editor web, desenvolvimento web, programação online, ide online, 3w online',
} as const

export const company = {
  name: 'Grupo 3w Online',
  tagline: 'Desenvolvemos sites e sistemas personalizados sob demanda',
  site: 'https://www.3wonline.com.br',
  whatsapp: {
    display: '(41) 99692-4829',
    number: '5541996924829',
    link: 'https://wa.me/5541996924829',
  },
  email: 'contato@3wonline.com.br',
  emailLink: 'mailto:contato@3wonline.com.br',
  yearsExperience: '10+',
  social: {
    facebook: 'https://www.facebook.com/3wonline',
    instagram: 'https://www.instagram.com/3wonline',
    linkedin: 'https://www.linkedin.com/company/3wonline',
  },
} as const

export const developer = {
  label: 'HOTWYL | WILLFROMBRASIL',
  credit: 'Sistema desenvolvido pelo desenvolvedor HOTWYL | WILLFROMBRASIL',
} as const

export const analytics = {
  gaId: import.meta.env.VITE_GA_ID || 'G-J06THXX0MW',
  gtmId: import.meta.env.VITE_GTM_ID || 'GTM-WVMJV7G6',
} as const
