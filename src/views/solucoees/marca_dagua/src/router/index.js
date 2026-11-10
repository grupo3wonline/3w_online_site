import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import AppPage from '@/views/AppPage.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import TermsPage from '@/views/TermsPage.vue'
import PrivacyPage from '@/views/PrivacyPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
    meta: {
      title: 'Marca D\'água Pro - Adicione Marca D\'água Profissional',
      description: 'Adicione marca d\'água profissional em suas imagens gratuitamente. Rápido, fácil e 100% seguro.'
    }
  },
  {
    path: '/app',
    name: 'App',
    component: AppPage,
    meta: {
      title: 'Editor - Marca D\'água Pro',
      description: 'Editor online de marca d\'água profissional. Adicione texto ou logo em suas imagens.'
    }
  },
  {
    path: '/sobre',
    name: 'About',
    component: About,
    meta: {
      title: 'Sobre - Marca D\'água Pro | Proteção Profissional de Imagens',
      description: 'Conheça o Marca D\'água Pro: solução gratuita e segura para proteger suas imagens. 100% privado e profissional.'
    }
  },
  {
    path: '/contato',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contato - Marca D\'água Pro | Entre em Contato Conosco',
      description: 'Entre em contato com o Marca D\'água Pro. Tire suas dúvidas e envie sugestões.'
    }
  },
  {
    path: '/termos-de-uso',
    name: 'Terms',
    component: TermsPage,
    meta: {
      title: 'Termos de Uso - Marca D\'água Pro',
      description: 'Termos de Uso do Marca D\'água Pro. Leia nossas condições de uso.'
    }
  },
  {
    path: '/politica-de-privacidade',
    name: 'Privacy',
    component: PrivacyPage,
    meta: {
      title: 'Política de Privacidade - Marca D\'água Pro',
      description: 'Política de Privacidade em conformidade com a LGPD. Seus dados estão seguros.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory('/marca_dagua/'),
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

// Navigation guards for analytics, page titles, etc.
router.beforeEach((to, from, next) => {
  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  next()
})

export default router
