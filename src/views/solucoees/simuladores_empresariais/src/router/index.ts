import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Simuladores Empresariais Pro - Análise Financeira Gratuita',
      description:
        'Simuladores empresariais gratuitos: orçamento empresarial, marketing e saúde financeira. Calcule ROI, CAC, LTV, EBITDA e +40 indicadores.',
      breadcrumb: 'Início',
    },
  },
  {
    path: '/termos-de-uso',
    name: 'termos',
    component: () => import('@/views/TermosView.vue'),
    meta: {
      title: 'Termos de Uso - Simuladores Empresariais Pro',
      description: 'Termos de uso dos simuladores empresariais.',
      breadcrumb: 'Termos de Uso',
    },
  },
  {
    path: '/politica-de-privacidade',
    name: 'privacidade',
    component: () => import('@/views/PrivacidadeView.vue'),
    meta: {
      title: 'Política de Privacidade - Simuladores Empresariais Pro',
      description: 'Política de privacidade em conformidade com LGPD, GDPR, CCPA e POPIA.',
      breadcrumb: 'Política de Privacidade',
    },
  },
  // Redirecionamentos de rotas legadas para a landing unificada (âncoras)
  { path: '/sobre', redirect: '/#sobre' },
  { path: '/servicos', redirect: '/#servicos' },
  { path: '/ferramenta', redirect: '/#ferramentas' },
  { path: '/contato', redirect: '/#contato' },
  { path: '/simuladores', redirect: '/#ferramentas' },
  {
    path: '/:pathMatch(.*)*',
    name: 'nao-encontrado',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Página não encontrada (404)',
      description: 'A página que você procura não foi encontrada.',
      breadcrumb: 'Erro 404',
    },
  },
]

// Base padrão do Vue Router: usa import.meta.env.BASE_URL, preenchido pelo Vite
// a partir da opção `base` do vite.config (dev e build).
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
