import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { trackPageView } from '@/lib/analytics'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: 'Início', breadcrumb: 'Início' },
      },
      {
        path: 'calculadora',
        name: 'calculator',
        component: () => import('@/views/CalculatorView.vue'),
        meta: { title: 'Calculadora', breadcrumb: 'Calculadora' },
      },
      {
        path: 'privacidade',
        name: 'privacy',
        component: () => import('@/views/PrivacyView.vue'),
        meta: { title: 'Política de Privacidade', breadcrumb: 'Privacidade' },
      },
      {
        path: ':pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
        meta: { title: 'Página não encontrada', breadcrumb: 'Erro 404' },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory('/calculadora_indicadores_financeiros/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  const title = (to.meta.title as string) ?? 'Calculadora de Indicadores Financeiros'
  trackPageView(to.fullPath, title)
})

export default router
