/**
 * Configuração centralizada do site (fonte única de verdade).
 * Usada por SEO, footer, contato e dados estruturados.
 */
export const SITE = {
  name: 'Calculadora Empresarial',
  shortName: 'Calc. Empresarial',
  baseUrl: 'https://www.3wonline.com.br',
  basePath: '/calculadora_empresarial/',
  get origin() {
    return `${this.baseUrl}${this.basePath}`.replace(/\/$/, '')
  },
  description:
    'Calculadoras profissionais gratuitas para empreendedores, freelancers e gestores. Calcule preços, juros, orçamentos e tome decisões financeiras inteligentes.',
  keywords:
    'calculadora empresarial, calculadora de preços, calculadora de juros, precificação, orçamento, freelancer, empreendedor, gestão financeira',
  locale: 'pt_BR',
  themeColor: '#2563eb',
  ogImage: '/calculadora_empresarial/og-image.jpg',
  author: 'willfrombrasil | hotwyl',
  developer: 'HOTWYL | WILLFROMBRASIL',
  company: {
    name: 'Grupo 3W Online',
    url: 'https://www.3wonline.com.br',
    whatsapp: '5541996924829',
    whatsappDisplay: '(41) 99692-4829',
    email: 'contato@3wonline.com.br'
  },
  social: {
    facebook: 'https://facebook.com/3wonline',
    instagram: 'https://instagram.com/3wonline',
    linkedin: 'https://linkedin.com/company/3wonline',
    whatsapp: 'https://wa.me/5541996924829'
  }
}

export const WHATSAPP_LINK = SITE.social.whatsapp
export const EMAIL_LINK = `mailto:${SITE.company.email}`
