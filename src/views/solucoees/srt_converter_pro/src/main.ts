import { createApp } from 'vue'
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import App from './App.vue'
import './assets/style.css'
import { trackPageView } from './utils/analytics'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faMoon, 
  faSun, 
  faAdjust, 
  faCircleQuestion, 
  faBars, 
  faTimes,
  faHome,
  faEnvelope,
  faInfoCircle,
  faBolt,
  faRocket,
  faBullseye,
  faSave,
  faLock,
  faQuestionCircle,
  faBook,
  faPen,
  faCheckCircle,
  faCookie
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
  faMoon, 
  faSun, 
  faAdjust, 
  faCircleQuestion, 
  faBars, 
  faTimes,
  faHome,
  faEnvelope,
  faInfoCircle,
  faBolt,
  faRocket,
  faBullseye,
  faSave,
  faLock,
  faQuestionCircle,
  faBook,
  faPen,
  faCheckCircle,
  faCookie
)

// Import views with lazy loading for better performance
const HomeView = () => import('./views/HomeView.vue')
const ConverterView = () => import('./views/ConverterView.vue')
const ContactView = () => import('./views/ContactView.vue')
const AboutView = () => import('./views/AboutView.vue')
const PrivacyPolicyView = () => import('./views/PrivacyPolicyView.vue')
const TermsOfServiceView = () => import('./views/TermsOfServiceView.vue')

// Route meta type
interface RouteMeta {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'SRT Converter Pro - Conversor de Roteiro para SRT Grátis e Profissional',
      description: 'Converta roteiros em legendas SRT profissionais gratuitamente. Ferramenta rápida, precisa e segura para YouTubers, produtores e criadores de conteúdo.',
      keywords: 'conversor srt, roteiro para srt, legendas srt, criador de conteúdo, youtube legendas, srt generator',
      ogImage: '/og-home.jpg'
    }
  },
  {
    path: '/converter',
    name: 'Converter',
    component: ConverterView,
    meta: {
      title: 'Conversor SRT Online - Transforme Roteiros em Legendas Instantly',
      description: 'Use nossa ferramenta gratuita para converter roteiros em legendas SRT profissionais com formatação automática e timing perfeito.',
      keywords: 'conversor srt online, legendas profissionais, srt converter, roteiro para legenda, ferramenta srt',
      ogImage: '/og-converter.jpg'
    }
  },
  {
    path: '/contato',
    name: 'Contact',
    component: ContactView,
    meta: {
      title: 'Contato - SRT Converter Pro | Suporte e Atendimento',
      description: 'Entre em contato conosco para suporte, dúvidas ou sugestões sobre o SRT Converter Pro. Atendimento rápido e gratuito.',
      keywords: 'contato srt converter, suporte legendas, atendimento gratuito, ajuda srt, fale conosco',
      ogImage: '/og-contact.jpg'
    }
  },
  {
    path: '/sobre',
    name: 'About',
    component: AboutView,
    meta: {
      title: 'Sobre - Grupo 3w Online | SRT Converter Pro',
      description: 'Conheça o Grupo 3w Online, desenvolvedor do SRT Converter Pro. Soluções web, consultoria e ferramentas para criadores de conteúdo.',
      keywords: 'sobre 3wonline, agência digital, soluções web, desenvolvedor srt converter',
      ogImage: '/og-about.jpg'
    }
  },
  {
    path: '/privacidade',
    name: 'Privacy',
    component: PrivacyPolicyView,
    meta: {
      title: 'Política de Privacidade - SRT Converter Pro | LGPD',
      description: 'Conheça nossa política de privacidade em conformidade com a LGPD. Saiba como protegemos seus dados pessoais.',
      keywords: 'política de privacidade, lgpd, proteção de dados, privacidade, dados pessoais',
      ogImage: '/og-privacy.jpg'
    }
  },
  {
    path: '/termos',
    name: 'Terms',
    component: TermsOfServiceView,
    meta: {
      title: 'Termos de Uso - SRT Converter Pro',
      description: 'Leia nossos termos de uso e condições de utilização do SRT Converter Pro.',
      keywords: 'termos de uso, condições de uso, termos de serviço, regulamento',
      ogImage: '/og-terms.jpg'
    }
  }
]

const router = createRouter({
  history: createWebHistory('/srt_converter_pro/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    
    // Scroll to top for new routes
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    
    return { top: 0, behavior: 'smooth' }
  }
})

/**
 * Update meta tags dynamically
 */
function updateMetaTags(route: RouteLocationNormalized) {
  const meta = route.meta as RouteMeta
  
  // Update title
  document.title = meta?.title || 'SRT Converter Pro'
  
  // Helper function to update or create meta tag
  const updateOrCreateMeta = (selector: string, attribute: string, content: string) => {
    let element = document.querySelector(selector)
    if (!element) {
      element = document.createElement('meta')
      if (attribute.includes('property')) {
        element.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''))
      } else {
        element.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''))
      }
      document.head.appendChild(element)
    }
    element.setAttribute('content', content)
  }
  
  // Update meta description
  if (meta?.description) {
    updateOrCreateMeta('meta[name="description"]', 'name', meta.description)
  }
  
  // Update meta keywords
  if (meta?.keywords) {
    updateOrCreateMeta('meta[name="keywords"]', 'name', meta.keywords)
  }
  
  // Update og:title
  if (meta?.title) {
    updateOrCreateMeta('meta[property="og:title"]', 'property', meta.title)
  }
  
  // Update og:description
  if (meta?.description) {
    updateOrCreateMeta('meta[property="og:description"]', 'property', meta.description)
  }
  
  // Update og:url
  const fullUrl = `https://app.3wonline.com/srt_converter_pro${route.path}`
  updateOrCreateMeta('meta[property="og:url"]', 'property', fullUrl)
  
  // Update og:image
  if (meta?.ogImage) {
    updateOrCreateMeta('meta[property="og:image"]', 'property', meta.ogImage)
  }
  
  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', fullUrl)
}

// Router guards
router.beforeEach((to, _from, next) => {
  // Update meta tags
  updateMetaTags(to)
  
  // Track page view
  trackPageView(to.path, (to.meta as RouteMeta)?.title)
  
  next()
})

// Create and mount app
const app = createApp(App)

// Register Font Awesome component globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Global error handler
app.config.errorHandler = (err, _instance, info) => {
  console.error('Global error:', err, info)
}

// Global warning handler (development only)
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, _instance, trace) => {
    console.warn('Warning:', msg, trace)
  }
}

app.use(router)
app.mount('#app')