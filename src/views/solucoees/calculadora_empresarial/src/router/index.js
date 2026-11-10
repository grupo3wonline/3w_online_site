import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/calculadoras',
    name: 'Calculadoras',
    component: () => import('@/views/CalculadorasView.vue')
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: () => import('@/views/SobreView.vue')
  },
  {
    path: '/contato',
    name: 'Contato',
    component: () => import('@/views/ContatoView.vue')
  },
  {
    path: '/termos',
    name: 'Termos',
    component: () => import('@/views/TermosView.vue')
  },
  {
    path: '/privacidade',
    name: 'Privacidade',
    component: () => import('@/views/PrivacidadeView.vue')
  },
  {
    path: '/calculadora-juros',
    name: 'CalculadoraJuros',
    component: () => import('@/views/calculadoras/CalculadoraJuros.vue')
  },
  {
    path: '/calculadora-produto',
    name: 'CalculadoraProduto',
    component: () => import('@/views/calculadoras/CalculadoraProduto.vue')
  },
  {
    path: '/calculadora-hora',
    name: 'CalculadoraHora',
    component: () => import('@/views/calculadoras/CalculadoraHora.vue')
  },
  {
    path: '/calculadora-parcelas',
    name: 'CalculadoraParcelas',
    component: () => import('@/views/calculadoras/CalculadoraParcelas.vue')
  },
  {
    path: '/calculadora-projeto',
    name: 'CalculadoraProjeto',
    component: () => import('@/views/calculadoras/CalculadoraProjeto.vue')
  },
  {
    path: '/calculadora-salario',
    name: 'CalculadoraSalario',
    component: () => import('@/views/calculadoras/CalculadoraSalario.vue')
  },
  {
    path: '/calculadora-marketing',
    name: 'CalculadoraMarketing',
    component: () => import('@/views/calculadoras/CalculadoraMarketing.vue')
  },
  {
    path: '/calculadora-orcamento',
    name: 'CalculadoraOrcamento',
    component: () => import('@/views/calculadoras/CalculadoraOrcamento.vue')
  },
  {
    path: '/calculadora-servico',
    name: 'CalculadoraServico',
    component: () => import('@/views/calculadoras/CalculadoraServico.vue')
  },
  {
    path: '/calculadora-autonomo',
    name: 'CalculadoraAutonomo',
    component: () => import('@/views/calculadoras/CalculadoraAutonomo.vue')
  },
  {
    path: '/calculadora-site',
    name: 'CalculadoraSite',
    component: () => import('@/views/calculadoras/CalculadoraSite.vue')
  },
  {
    path: '/calculadora-videomaker',
    name: 'CalculadoraVideomaker',
    component: () => import('@/views/calculadoras/CalculadoraVideomaker.vue')
  },
  {
    path: '/calculadora-web-designer',
    name: 'CalculadoraWebDesigner',
    component: () => import('@/views/calculadoras/CalculadoraWebDesigner.vue')
  },
  {
    path: '/calculadora-web-developer',
    name: 'CalculadoraWebDeveloper',
    component: () => import('@/views/calculadoras/CalculadoraWebDeveloper.vue')
  },
  {
    path: '/calculadora-social-media',
    name: 'CalculadoraSocialMedia',
    component: () => import('@/views/calculadoras/CalculadoraSocialMedia.vue')
  },
  {
    path: '/calculadora-trafego',
    name: 'CalculadoraTrafego',
    component: () => import('@/views/calculadoras/CalculadoraTrafego.vue')
  },
  {
    path: '/calculadora-copywriter',
    name: 'CalculadoraCopywriter',
    component: () => import('@/views/calculadoras/CalculadoraCopywriter.vue')
  },
  {
    path: '/calculadora-marketing-digital',
    name: 'CalculadoraMarketingDigital',
    component: () => import('@/views/calculadoras/CalculadoraMarketingDigital.vue')
  },
  {
    path: '/calculadora-influencer',
    name: 'CalculadoraInfluencer',
    component: () => import('@/views/calculadoras/CalculadoraInfluencer.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/calculadora_empresarial/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Volta para a posição anterior ao usar voltar/avançar do navegador.
    if (savedPosition) return savedPosition
    // Âncoras da landing (ex: #sobre) com rolagem suave e offset do header sticky.
    if (to.hash) {
      return { el: to.hash, top: 88, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router
