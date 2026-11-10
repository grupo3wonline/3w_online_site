/**
 * Configuração de rotas da aplicação
 * @module router
 */

import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading de componentes para melhor performance
const Home = () => import('../views/Home.vue')
const Simulator = () => import('../views/Simulator.vue')
const About = () => import('../views/About.vue')
const Contact = () => import('../views/Contact.vue')
const TermsOfUse = () => import('../views/TermsOfUse.vue')
const PrivacyPolicy = () => import('../views/PrivacyPolicy.vue')

/**
 * Definição de rotas
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'InvestSim - Simulador de Investimentos | Planeje seu Futuro Financeiro',
      description: 'Simule seus investimentos de forma intuitiva e descubra o potencial de crescimento do seu patrimônio com nossa ferramenta avançada e gratuita.',
      keywords: 'simulador investimentos, calculadora financeira, planejamento financeiro, juros compostos',
      requiresAuth: false
    }
  },
  {
    path: '/simulador',
    name: 'Simulator',
    component: Simulator,
    meta: {
      title: 'Simulador - Calculadora de Investimentos Avançada | InvestSim',
      description: 'Use nossa calculadora avançada para simular diferentes cenários de investimento e planejar suas metas financeiras com precisão.',
      keywords: 'calculadora investimentos, simulação financeira, aportes mensais, rentabilidade',
      requiresAuth: false
    }
  },
  {
    path: '/sobre',
    name: 'About',
    component: About,
    meta: {
      title: 'Sobre - Conheça o InvestSim | Ferramenta de Simulação',
      description: 'Saiba mais sobre a ferramenta InvestSim, suas características, funcionalidades e como pode ajudar você a planejar seu futuro financeiro.',
      keywords: 'sobre investsim, ferramenta financeira, simulador gratuito',
      requiresAuth: false
    }
  },
  {
    path: '/contato',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contato - Fale Conosco | InvestSim',
      description: 'Entre em contato conosco através do formulário. Estamos aqui para ajudar você com suas dúvidas sobre investimentos e simulações.',
      keywords: 'contato, suporte, ajuda, dúvidas investimentos',
      requiresAuth: false
    }
  },
  {
    path: '/termos-de-uso',
    name: 'TermsOfUse',
    component: TermsOfUse,
    meta: {
      title: 'Termos de Uso | InvestSim',
      description: 'Leia os Termos de Uso do InvestSim. Conheça as regras e condições para utilização da nossa plataforma de simulação de investimentos.',
      keywords: 'termos de uso, condições de uso, regulamento, investsim, legal',
      requiresAuth: false
    }
  },
  {
    path: '/politica-de-privacidade',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    meta: {
      title: 'Política de Privacidade | InvestSim - LGPD',
      description: 'Conheça como o InvestSim protege seus dados pessoais em conformidade com a LGPD. Transparência e segurança no tratamento de suas informações.',
      keywords: 'política de privacidade, lgpd, proteção de dados, privacidade, investsim',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

/**
 * Criação da instância do router
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

/**
 * Navigation Guards - Executados antes de cada navegação
 */
router.beforeEach((to, from, next) => {
  // Atualiza o título da página
  document.title = to.meta?.title || 'InvestSim - Simulador de Investimentos'
  
  // Atualiza meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta?.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }
  
  // Atualiza meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]')
  if (metaKeywords && to.meta?.keywords) {
    metaKeywords.setAttribute('content', to.meta.keywords)
  }

  // Atualiza Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle && to.meta?.title) {
    ogTitle.setAttribute('content', to.meta.title)
  }

  const ogDescription = document.querySelector('meta[property="og:description"]')
  if (ogDescription && to.meta?.description) {
    ogDescription.setAttribute('content', to.meta.description)
  }

  // Google Analytics - Track page view
  if (typeof gtag !== 'undefined') {
    gtag('config', 'G-J06THXX0MW', {
      page_path: to.path,
      page_title: to.meta?.title
    })
  }

  // Adiciona classe ao body para animações de página
  document.body.classList.add('page-transitioning')
  
  next()
})

/**
 * After Each - Executado após cada navegação
 */
router.afterEach(() => {
  // Remove classe de transição após animação
  setTimeout(() => {
    document.body.classList.remove('page-transitioning')
  }, 300)
})

/**
 * Error Handler
 */
router.onError((error) => {
  console.error('Router error:', error)
  // Você pode adicionar notificação de erro aqui
})

export default router
