import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/calculadora-aluguel',
    name: 'RentCalculator',
    component: () => import('@/pages/RentCalculatorPage.vue')
  },
  {
    path: '/calculadora-financiamento',
    name: 'FinancingCalculator',
    component: () => import('@/pages/FinancingCalculatorPage.vue')
  },
  {
    path: '/calculadora-construcao',
    name: 'ConstructionCalculator',
    component: () => import('@/pages/ConstructionCalculatorPage.vue')
  },
  {
    path: '/comparador',
    name: 'Comparison',
    component: () => import('@/pages/ComparisonPage.vue')
  },
  // Páginas unificadas na landing page (redirecionam para âncoras da Home)
  { path: '/ferramentas', redirect: { path: '/', hash: '#ferramentas' } },
  { path: '/sobre', redirect: { path: '/', hash: '#sobre' } },
  { path: '/contato', redirect: { path: '/', hash: '#contato' } },
  { path: '/servicos', redirect: { path: '/', hash: '#contato' } },
  { path: '/faq', redirect: { path: '/', hash: '#faq' } },
  {
    path: '/termos-de-uso',
    name: 'TermosDeUso',
    component: () => import('@/pages/TermosDeUsoPage.vue')
  },
  {
    path: '/politica-de-privacidade',
    name: 'PoliticaDePrivacidade',
    component: () => import('@/pages/PoliticaDePrivacidadePage.vue')
  },
  {
    path: '/erro',
    name: 'Error',
    component: () => import('@/pages/ErrorPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/calculadora_aluguel_facil/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Track page views (GA4)
router.afterEach((to) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: to.name as string,
      page_path: to.fullPath
    })
  }
})

// Recupera de falhas de carregamento de módulos lazy (ex.: após novo deploy)
router.onError((error) => {
  const msg = String(error?.message || '')
  if (/dynamically imported module|Importing a module script failed|Failed to fetch/i.test(msg)) {
    window.location.reload()
  }
})

export default router
