import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// Componentes das páginas
import Home from './components/Home.vue'
import ThumbnailExtractor from './components/ThumbnailExtractor.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import TermsOfService from './components/TermsOfService.vue'
import FAQ from './components/FAQ.vue'
import Testimonials from './components/Testimonials.vue'

const routes = [
  { 
    path: '/', 
    component: Home,
    meta: { title: 'ThumbnailPro - Extrator de Thumbnails do YouTube Grátis e Profissional' }
  },
  { 
    path: '/extractor', 
    component: ThumbnailExtractor,
    meta: { title: 'Ferramenta Extratora - ThumbnailPro' }
  },
  { 
    path: '/sobre', 
    component: About,
    meta: { title: 'Sobre Nós - ThumbnailPro | Grupo 3w Online' }
  },
  { 
    path: '/contato', 
    component: Contact,
    meta: { title: 'Contato - ThumbnailPro | Fale Conosco' }
  },
  { 
    path: '/privacidade', 
    component: PrivacyPolicy,
    meta: { title: 'Política de Privacidade - ThumbnailPro' }
  },
  { 
    path: '/termos', 
    component: TermsOfService,
    meta: { title: 'Termos de Uso - ThumbnailPro' }
  },
  { 
    path: '/faq', 
    component: FAQ,
    meta: { title: 'Perguntas Frequentes - ThumbnailPro' }
  },
  { 
    path: '/depoimentos', 
    component: Testimonials,
    meta: { title: 'Depoimentos - ThumbnailPro' }
  }
]

const router = createRouter({
  history: createWebHistory('/thumbnail_pro/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  }
})

// Atualiza título da página baseado na rota
router.afterEach((to) => {
  document.title = to.meta.title || 'ThumbnailPro'
})

const app = createApp(App)
app.use(router)
app.mount('#app')
