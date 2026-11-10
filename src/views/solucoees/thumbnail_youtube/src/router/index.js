import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ThumbnailDownloader from '../views/ThumbnailDownloader.vue'

const AboutPage = () => import('../views/About.vue')
const ContactPage = () => import('../views/Contact.vue')
const PrivacyPolicy = () => import('../views/PrivacyPolicy.vue')
const TermsOfService = () => import('../views/TermsOfService.vue')

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    meta: {
      title: 'YouTube Thumbnail Downloader - Baixe Miniaturas em Alta Qualidade',
      description: 'Baixe miniaturas do YouTube em alta qualidade, rápido e gratuito. Ferramenta moderna, responsiva e sem anúncios.',
      keywords: 'thumbnail youtube, baixar thumbnail, download miniatura'
    }
  },
  {
    path: '/tool',
    name: 'ThumbnailDownloader',
    component: ThumbnailDownloader,
    meta: {
      title: 'Ferramenta - YouTube Thumbnail Downloader',
      description: 'Use nossa ferramenta gratuita para baixar thumbnails do YouTube em alta qualidade.',
      keywords: 'ferramenta youtube, download thumbnail, baixar miniatura'
    }
  },
  {
    path: '/sobre',
    name: 'AboutPage',
    component: AboutPage,
    meta: {
      title: 'Sobre - YouTube Thumbnail Downloader',
      description: 'Conheça mais sobre nossa ferramenta de download de thumbnails do YouTube.',
      keywords: 'sobre, informações, thumbnail youtube'
    }
  },
  {
    path: '/contato',
    name: 'ContactPage',
    component: ContactPage,
    meta: {
      title: 'Contato - YouTube Thumbnail Downloader',
      description: 'Entre em contato conosco. Envie suas dúvidas, sugestões ou feedback.',
      keywords: 'contato, suporte, ajuda'
    }
  },
  {
    path: '/politica-privacidade',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    meta: {
      title: 'Política de Privacidade - YouTube Thumbnail Downloader',
      description: 'Conheça nossa política de privacidade e como tratamos seus dados conforme a LGPD.',
      keywords: 'política de privacidade, lgpd, proteção de dados'
    }
  },
  {
    path: '/termos-uso',
    name: 'TermsOfService',
    component: TermsOfService,
    meta: {
      title: 'Termos de Uso - YouTube Thumbnail Downloader',
      description: 'Leia os termos de uso do nosso serviço de download de thumbnails do YouTube.',
      keywords: 'termos de uso, termos de serviço, condições'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Página Não Encontrada - YouTube Thumbnail Downloader',
      description: 'A página que você procura não foi encontrada.',
      keywords: '404, página não encontrada'
    }
  }
]

const router = createRouter({
  history: createWebHistory('/thumbnail_youtube/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Navigation guard for meta tags
router.beforeEach((to, from, next) => {
  // Update document title
  document.title = to.meta.title || 'YouTube Thumbnail Downloader'
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description || '')
  }
  
  // Update meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]')
  if (metaKeywords) {
    metaKeywords.setAttribute('content', to.meta.keywords || '')
  }
  
  next()
})

export default router
