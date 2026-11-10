import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
        meta: { breadcrumb: 'Início' },
      },
      {
        path: 'ferramentas',
        name: 'ferramentas',
        component: () => import('@/pages/FerramentasPage.vue'),
        meta: { breadcrumb: 'Ferramentas' },
      },
      {
        // A página de Contato foi unificada na Home. Mantemos o redirect
        // para preservar links antigos e SEO.
        path: 'contato',
        redirect: { name: 'home', hash: '#contato' },
      },
      {
        path: 'termos',
        name: 'termos',
        component: () => import('@/pages/TermosPage.vue'),
        meta: { breadcrumb: 'Termos de Uso' },
      },
      {
        path: 'privacidade',
        name: 'privacidade',
        component: () => import('@/pages/PrivacidadePage.vue'),
        meta: { breadcrumb: 'Privacidade' },
      },
      {
        path: 'erro/:code',
        name: 'erro',
        component: () => import('@/pages/ErrorPage.vue'),
        meta: { breadcrumb: 'Erro' },
        props: true,
      },
      {
        path: ':pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/NotFoundPage.vue'),
        meta: { breadcrumb: 'Página não encontrada' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory('/calculadora_social_midia/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
