import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/LandingPage.vue'),
        meta: { seo: 'home', breadcrumb: 'Início' },
      },
      {
        path: 'calculadora',
        name: 'calculadora',
        component: () => import('@/pages/CalculadoraPage.vue'),
        meta: { seo: 'calculadora', breadcrumb: 'Calculadora' },
      },
      {
        path: 'termos',
        name: 'termos',
        component: () => import('@/pages/TermosPage.vue'),
        meta: { seo: 'termos', breadcrumb: 'Termos de Uso' },
      },
      {
        path: 'privacidade',
        name: 'privacidade',
        component: () => import('@/pages/PrivacidadePage.vue'),
        meta: { seo: 'privacidade', breadcrumb: 'Política de Privacidade' },
      },
      {
        path: 'erro',
        name: 'erro',
        component: () => import('@/pages/ErrorPage.vue'),
        meta: { seo: 'erro', breadcrumb: 'Erro' },
      },
      {
        path: ':pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/NotFoundPage.vue'),
        meta: { seo: 'notFound', breadcrumb: 'Não encontrado' },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory('/calculadora_preco/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})
