import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/ConsolidatorPage.vue'),
    meta: { title: 'Consolidador', breadcrumb: 'Início' },
  },
  {
    path: '/privacidade',
    name: 'privacy',
    component: () => import('@/pages/LgpdPage.vue'),
    meta: { title: 'Política de Privacidade', breadcrumb: 'Política de Privacidade' },
  },
  {
    path: '/erro',
    name: 'error',
    component: () => import('@/pages/ErrorPage.vue'),
    meta: { title: 'Erro', breadcrumb: 'Erro' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: 'Página não encontrada', breadcrumb: 'Página não encontrada' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

/** Atualizar título da página a cada navegação */
router.beforeEach((to) => {
  const baseTitle = 'Consolidador Excel'
  const pageTitle = to.meta.title as string | undefined
  document.title = pageTitle ? `${pageTitle} — ${baseTitle}` : baseTitle
})

export default router
