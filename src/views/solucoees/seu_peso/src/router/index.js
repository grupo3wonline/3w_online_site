import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Calculator from '../views/Calculator.vue'
import Sobre from '../views/Sobre.vue'
import Contato from '../views/Contato.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import TermsOfService from '../views/TermsOfService.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Seu Peso - Calculadora de Saúde Corporal Grátis',
      description: 'Calculadora completa e gratuita para calcular IMC, metabolismo basal, calorias diárias, peso ideal e necessidades nutricionais. Resultados instantâneos e precisos.',
      keywords: 'calculadora IMC, metabolismo basal, calorias diárias, peso ideal, calculadora saúde'
    }
  },
  {
    path: '/calculadora',
    name: 'Calculator',
    component: Calculator,
    meta: {
      title: 'Calculadora de Saúde - IMC, Metabolismo e Calorias | Seu Peso',
      description: 'Calcule gratuitamente seu IMC, peso ideal, metabolismo basal, necessidades calóricas e nutricionais. Ferramenta completa baseada em fórmulas científicas.',
      keywords: 'calcular IMC, calcular metabolismo basal, calcular calorias, calculadora nutricional'
    }
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: Sobre,
    meta: {
      title: 'Sobre - Seu Peso',
      description: 'Conheça o Seu Peso, a calculadora de saúde corporal mais completa e confiável. Saiba como funcionam nossos cálculos.'
    }
  },
  {
    path: '/contato',
    name: 'Contato',
    component: Contato,
    meta: {
      title: 'Contato - Seu Peso',
      description: 'Entre em contato conosco para dúvidas, sugestões ou feedback sobre a calculadora Seu Peso.'
    }
  },
  {
    path: '/privacidade',
    name: 'Privacy',
    component: PrivacyPolicy,
    meta: {
      title: 'Política de Privacidade - Seu Peso',
      description: 'Leia nossa política de privacidade e saiba como protegemos seus dados de acordo com a LGPD.'
    }
  },
  {
    path: '/termos',
    name: 'Terms',
    component: TermsOfService,
    meta: {
      title: 'Termos de Uso - Seu Peso',
      description: 'Leia os termos de uso do Seu Peso. Informações importantes sobre o uso da calculadora de saúde.'
    }
  }
]

const router = createRouter({
  history: createWebHistory('/seu_peso/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Seu Peso'
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }
  
  next()
})

export default router
