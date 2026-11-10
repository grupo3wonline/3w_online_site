import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUiStore } from '@/stores/ui'

/**
 * Rotas da aplicação. As páginas são carregadas de forma preguiçosa
 * (lazy loading) para melhor performance e code splitting.
 * A landing page (`/`) unifica Home, Sobre, Serviços, Ferramentas e Contato.
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/LandingPage.vue'),
    meta: { title: 'Início', breadcrumb: 'Início' },
  },
  {
    path: '/playground',
    name: 'playground',
    component: () => import('@/pages/PlaygroundPage.vue'),
    meta: { title: 'Editor', breadcrumb: 'Playground', fullScreen: true },
  },
  {
    path: '/termos',
    name: 'termos',
    component: () => import('@/pages/TermosUso.vue'),
    meta: { title: 'Termos de Uso', breadcrumb: 'Termos de Uso' },
  },
  {
    path: '/privacidade',
    name: 'privacidade',
    component: () => import('@/pages/PoliticaPrivacidade.vue'),
    meta: { title: 'Política de Privacidade', breadcrumb: 'Política de Privacidade' },
  },
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('@/pages/errors/ForbiddenPage.vue'),
    meta: { title: 'Acesso Negado', breadcrumb: 'Acesso Negado' },
  },
  {
    path: '/500',
    name: 'server-error',
    component: () => import('@/pages/errors/ServerErrorPage.vue'),
    meta: { title: 'Erro Interno', breadcrumb: 'Erro' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/errors/NotFoundPage.vue'),
    meta: { title: 'Página não encontrada' },
  },
]

const router = createRouter({
  // Base path do subdiretório (HostGator): /dev_playground/
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

// Overlay de carregamento durante transições de rota
router.beforeEach((_to, _from, next) => {
  const ui = useUiStore()
  ui.startLoading('Carregando página...')
  next()
})

router.afterEach(() => {
  const ui = useUiStore()
  // pequeno atraso para suavizar o overlay entre chunks
  window.setTimeout(() => ui.stopLoading(), 120)
})

export default router
