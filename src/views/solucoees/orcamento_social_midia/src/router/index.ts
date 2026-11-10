import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { siteConfig } from '@/config/site'

/**
 * Metadados de rota tipados para SEO por página.
 * `title`/`description` alimentam o composable useSeo.
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    breadcrumb?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      title: 'Calculadora de Orçamento para Social Mídia Grátis, Rápida e Profissional',
      description: siteConfig.description,
      breadcrumb: 'Início',
    },
  },
  {
    path: '/calculadora',
    name: 'calculadora',
    component: () => import('@/pages/CalculatorPage.vue'),
    meta: {
      title: 'Calculadora de Orçamento',
      description:
        'Configure seus serviços de social mídia e gere orçamentos profissionais em PDF em minutos.',
      breadcrumb: 'Calculadora',
    },
  },
  {
    // Páginas Sobre, Serviços, Ferramentas e Contato foram unificadas na Home
    // (landing page hotsite). Mantemos redirecionamentos para as seções
    // correspondentes, preservando links antigos e SEO.
    path: '/sobre',
    redirect: { name: 'home', hash: '#sobre' },
  },
  {
    path: '/servicos',
    redirect: { name: 'home', hash: '#servicos' },
  },
  {
    path: '/ferramentas',
    redirect: { name: 'home', hash: '#ferramentas' },
  },
  {
    path: '/contato',
    redirect: { name: 'home', hash: '#contato' },
  },
  {
    path: '/politica-privacidade',
    name: 'politica-privacidade',
    component: () => import('@/pages/PrivacyPolicyPage.vue'),
    meta: {
      title: 'Política de Privacidade',
      description:
        'Política de Privacidade em conformidade com LGPD, GDPR, CCPA e POPIA. Saiba como tratamos e protegemos seus dados.',
      breadcrumb: 'Política de Privacidade',
    },
  },
  {
    path: '/termos-uso',
    name: 'termos-uso',
    component: () => import('@/pages/TermsPage.vue'),
    meta: {
      title: 'Termos de Uso',
      description: 'Termos de Uso da Calculadora de Orçamento para Social Mídia.',
      breadcrumb: 'Termos de Uso',
    },
  },
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('@/pages/errors/ForbiddenPage.vue'),
    meta: { title: 'Acesso Negado (403)', breadcrumb: 'Acesso Negado' },
  },
  {
    path: '/500',
    name: 'server-error',
    component: () => import('@/pages/errors/ServerErrorPage.vue'),
    meta: { title: 'Erro do Servidor (500)', breadcrumb: 'Erro do Servidor' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/errors/NotFoundPage.vue'),
    meta: { title: 'Página não encontrada (404)', breadcrumb: 'Não encontrada' },
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
