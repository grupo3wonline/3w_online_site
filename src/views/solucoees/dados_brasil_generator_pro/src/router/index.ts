import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { tools } from '@/data/tools'
import { siteConfig } from '@/config/site'

// Páginas principais (lazy)
const HomeView = () => import('@/pages/HomeView.vue')
const PrivacyView = () => import('@/pages/legal/PrivacyView.vue')
const TermsView = () => import('@/pages/legal/TermsView.vue')
const CookiesView = () => import('@/pages/legal/CookiesView.vue')
const NotFoundView = () => import('@/pages/errors/NotFoundView.vue')
const ForbiddenView = () => import('@/pages/errors/ForbiddenView.vue')
const ServerErrorView = () => import('@/pages/errors/ServerErrorView.vue')

// Mapa de componentes de ferramentas (glob dinâmico — lazy por rota)
const toolModules = import.meta.glob('@/pages/tools/*.vue')

interface RouteMeta {
  title: string
  description: string
  breadcrumb: { label: string; to?: string }[]
}

const toolRoutes: RouteRecordRaw[] = tools.map((tool) => {
  const path = `/pages/tools/${tool.component}.vue`
  const importer =
    toolModules[Object.keys(toolModules).find((k) => k.endsWith(`/tools/${tool.component}.vue`)) || path]

  return {
    path: `/ferramentas/${tool.slug}`,
    name: `tool-${tool.slug}`,
    component: importer,
    meta: {
      title: `${tool.title} | ${siteConfig.shortName}`,
      description: tool.description,
      breadcrumb: [
        { label: 'Início', to: '/' },
        { label: 'Ferramentas', to: '/#ferramentas' },
        { label: tool.title },
      ],
      tool: tool.slug,
    } satisfies RouteMeta & { tool: string },
  }
})

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: `${siteConfig.name} — Gerar e Validar Documentos Brasileiros`,
      description: siteConfig.description,
      breadcrumb: [{ label: 'Início' }],
    },
  },
  // Páginas individuais de cada ferramenta (mantidas)
  ...toolRoutes,
  // Páginas unificadas no hotsite da home — redirects para não quebrar links antigos.
  { path: '/ferramentas', redirect: '/#ferramentas' },
  { path: '/sobre', redirect: '/#sobre' },
  { path: '/servicos', redirect: '/#servicos' },
  { path: '/contato', redirect: '/#contato' },
  {
    path: '/privacidade',
    name: 'privacy',
    component: PrivacyView,
    meta: {
      title: `Política de Privacidade | ${siteConfig.shortName}`,
      description: 'Política de privacidade em conformidade com LGPD, GDPR, CCPA e POPIA.',
      breadcrumb: [{ label: 'Início', to: '/' }, { label: 'Privacidade' }],
    },
  },
  {
    path: '/termos',
    name: 'terms',
    component: TermsView,
    meta: {
      title: `Termos de Uso | ${siteConfig.shortName}`,
      description: 'Termos e condições de uso da plataforma.',
      breadcrumb: [{ label: 'Início', to: '/' }, { label: 'Termos de Uso' }],
    },
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: CookiesView,
    meta: {
      title: `Política de Cookies | ${siteConfig.shortName}`,
      description: 'Como utilizamos cookies e como você pode gerenciá-los.',
      breadcrumb: [{ label: 'Início', to: '/' }, { label: 'Cookies' }],
    },
  },
  {
    path: '/403',
    name: 'forbidden',
    component: ForbiddenView,
    meta: { title: 'Acesso negado', description: 'Acesso não autorizado.', breadcrumb: [] },
  },
  {
    path: '/500',
    name: 'server-error',
    component: ServerErrorView,
    meta: { title: 'Erro interno', description: 'Erro interno do servidor.', breadcrumb: [] },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Página não encontrada', description: 'Página não encontrada.', breadcrumb: [] },
  },
]

const router = createRouter({
  history: createWebHistory(siteConfig.basePath),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
