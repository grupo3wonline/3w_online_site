import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { site } from '@/config/site'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Início', breadcrumb: 'Início' },
  },
  // Redirecionamentos das rotas antigas (agora unificadas na landing) para preservar SEO/links.
  { path: '/sobre', redirect: { name: 'home', hash: '#sobre' } },
  { path: '/servicos', redirect: { name: 'home', hash: '#servicos' } },
  { path: '/ferramenta', redirect: { name: 'home', hash: '#calculadora' } },
  { path: '/contato', redirect: { name: 'home', hash: '#contato' } },
  {
    path: '/termos-de-uso',
    name: 'termos',
    component: () => import('@/views/TermosView.vue'),
    meta: { title: 'Termos de Uso', breadcrumb: 'Termos de Uso' },
  },
  {
    path: '/politica-de-privacidade',
    name: 'privacidade',
    component: () => import('@/views/PrivacidadeView.vue'),
    meta: { title: 'Política de Privacidade', breadcrumb: 'Política de Privacidade' },
  },
  {
    path: '/erro',
    name: 'erro',
    component: () => import('@/views/ErrorView.vue'),
    meta: { title: 'Erro', breadcrumb: 'Erro' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página não encontrada', breadcrumb: '404' },
  },
]

const router = createRouter({
  history: createWebHistory(site.basePath),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
