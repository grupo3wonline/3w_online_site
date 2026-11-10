import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LandingPage from '@/pages/Landing.vue'
import { SITE } from '@/config/site'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: LandingPage,
    meta: {
      title: 'Calculadora de Metragem de Cabos - Gratuita, Rápida e Profissional',
      breadcrumb: [],
    },
  },
  {
    path: '/calculadora',
    name: 'calculadora',
    component: () => import('@/pages/Calculator.vue'),
    meta: {
      title: 'Calculadora - Metragem de Cabos Elétricos Online',
      breadcrumb: [{ labelKey: 'nav.calculator' }],
    },
  },
  {
    path: '/termos-de-uso',
    name: 'termos',
    component: () => import('@/pages/TermosDeUso.vue'),
    meta: {
      title: 'Termos de Uso',
      breadcrumb: [{ labelKey: 'nav.terms' }],
    },
  },
  {
    path: '/politica-de-privacidade',
    name: 'privacidade',
    component: () => import('@/pages/PoliticaPrivacidade.vue'),
    meta: {
      title: 'Política de Privacidade',
      breadcrumb: [{ labelKey: 'nav.privacy' }],
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      title: '404 - Página Não Encontrada',
      breadcrumb: [{ labelKey: 'notFound.subtitle' }],
    },
  },
]

const router = createRouter({
  history: createWebHistory(SITE.base),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _from, next) => {
  document.title = `${(to.meta.title as string) || SITE.fullName} | ${SITE.name}`
  window.dispatchEvent(new Event('close-mobile-menu'))
  next()
})

export default router
