import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading de páginas para melhor performance
const HomePage = () => import('../pages/HomePage.vue')
const SobrePage = () => import('../pages/SobrePage.vue')
const ContatoPage = () => import('../pages/ContatoPage.vue')
const TermosPage = () => import('../pages/TermosPage.vue')
const PrivacidadePage = () => import('../pages/PrivacidadePage.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Entity Converter Pro - Conversor de Caracteres para HTML Entities',
      description: 'Converta caracteres especiais em HTML Entities profissionalmente e gratuitamente.'
    }
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: SobrePage,
    meta: {
      title: 'Sobre - Entity Converter Pro',
      description: 'Conheça o Entity Converter Pro e a empresa desenvolvedora Grupo 3W Online.'
    }
  },
  {
    path: '/contato',
    name: 'Contato',
    component: ContatoPage,
    meta: {
      title: 'Contato - Entity Converter Pro',
      description: 'Entre em contato conosco. Desenvolvemos sites e sistemas personalizados sob demanda.'
    }
  },
  {
    path: '/termos-de-uso',
    name: 'Termos',
    component: TermosPage,
    meta: {
      title: 'Termos de Uso - Entity Converter Pro',
      description: 'Termos de uso da ferramenta Entity Converter Pro.'
    }
  },
  {
    path: '/politica-de-privacidade',
    name: 'Privacidade',
    component: PrivacidadePage,
    meta: {
      title: 'Política de Privacidade - Entity Converter Pro',
      description: 'Política de privacidade e proteção de dados em conformidade com a LGPD.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory('/entity_converter_pro/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Atualizar título e meta description em cada navegação
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Entity Converter Pro'
  
  // Atualizar meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }

  // Google Analytics page view
  if (window.gtag) {
    window.gtag('config', 'G-J06THXX0MW', {
      page_path: to.fullPath,
      page_title: to.meta.title
    })
  }

  next()
})

export default router
