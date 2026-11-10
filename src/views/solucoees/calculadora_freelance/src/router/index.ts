import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useLoadingStore } from '@/stores/loading'

/**
 * Metadados de SEO por rota. Consumidos pelo composable useSeo no App.
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    breadcrumb?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Calculadora Freelancer — Calcule Valor/Hora, Projetos e Prazos',
      description:
        'Ferramenta gratuita e profissional para freelancers calcularem valor/hora, orçamentos, prazos e gerarem propostas. Rápida, segura e no seu navegador.',
      breadcrumb: 'Início',
    },
  },
  {
    path: '/calculadora',
    name: 'calculator',
    component: () => import('@/views/CalculatorView.vue'),
    meta: {
      title: 'Calculadora — Valor/Hora, Projeto, Prazo e Orçamento',
      description:
        'Calcule seu valor/hora ideal, orçamentos de projetos, prazos de entrega e gere propostas comerciais profissionais gratuitamente.',
      breadcrumb: 'Calculadora',
    },
  },
  {
    path: '/termos',
    name: 'terms',
    component: () => import('@/views/TermsView.vue'),
    meta: {
      title: 'Termos de Uso — Calculadora Freelancer',
      description:
        'Termos e condições de uso da Calculadora Freelancer desenvolvida pela 3W Online.',
      breadcrumb: 'Termos de Uso',
    },
  },
  {
    path: '/privacidade',
    name: 'privacy',
    component: () => import('@/views/PrivacyView.vue'),
    meta: {
      title: 'Política de Privacidade — LGPD, GDPR, CCPA e POPIA',
      description:
        'Política de privacidade em conformidade com LGPD, GDPR, CCPA e POPIA. Saiba como tratamos e protegemos seus dados.',
      breadcrumb: 'Política de Privacidade',
    },
  },
  {
    // Compatibilidade: /contato agora é uma seção da home
    path: '/contato',
    redirect: '/#contato',
  },
  {
    path: '/500',
    name: 'server-error',
    component: () => import('@/views/ServerErrorView.vue'),
    meta: { title: 'Erro no servidor — 500', breadcrumb: 'Erro 500' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página não encontrada — 404', breadcrumb: 'Erro 404' },
  },
]

const router = createRouter({
  history: createWebHistory('/calculadora_freelance/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

// Loading global durante transições de rota (componentes lazy)
router.beforeEach((_to, _from, next) => {
  const loading = useLoadingStore()
  loading.start()
  next()
})

router.afterEach(() => {
  const loading = useLoadingStore()
  // Pequeno atraso para o loader ser perceptível em transições rápidas
  window.setTimeout(() => loading.stop(), 150)
})

export default router
