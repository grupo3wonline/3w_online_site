import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { TOOLS } from '@/config/site'
import type { SeoMeta } from '@/composables/useSeo'

interface Crumb {
  label: string
  to?: string
}

declare module 'vue-router' {
  interface RouteMeta {
    seo?: SeoMeta
    breadcrumb?: Crumb[]
  }
}

function slugToComponent(slug: string): string {
  // json-xml-formatter -> JsonXmlFormatter
  return slug
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('')
}

// Vite resolve os módulos de ferramentas em tempo de build via glob
const toolModules = import.meta.glob('../views/tools/*.vue')

// Rotas das ferramentas geradas a partir do registro único (Clean Code, DRY)
const toolRoutes: RouteRecordRaw[] = TOOLS.map((tool) => ({
  path: tool.path,
  name: tool.slug,
  component: toolModules[`../views/tools/${slugToComponent(tool.slug)}.vue`],
  meta: {
    breadcrumb: [{ label: 'Ferramentas', to: '/ferramentas' }, { label: tool.title }],
    seo: {
      title: tool.title,
      description: tool.description,
      keywords: tool.keywords,
      type: 'website',
    },
  },
}))

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      seo: {
        title: '',
        description:
          'Suíte gratuita de ferramentas para desenvolvedores: JSON/XML, Base64, MD5, Markdown, strings e conversor de arquivos. 100% no navegador.',
        keywords:
          'ferramentas desenvolvedor, formatador json, base64, md5, markdown, conversor arquivos, 3w online',
      },
    },
  },
  {
    path: '/ferramentas',
    name: 'tools',
    component: () => import('../views/ToolsView.vue'),
    meta: {
      breadcrumb: [{ label: 'Ferramentas' }],
      seo: {
        title: 'Ferramentas',
        description:
          'Todas as ferramentas de desenvolvimento em um só lugar: formatação, codificação, hash, markdown e conversão de arquivos.',
        keywords: 'ferramentas dev, toolkit desenvolvedor, utilitários web',
      },
    },
  },
  ...toolRoutes,
  {
    path: '/termos',
    name: 'terms',
    component: () => import('../views/legal/TermsView.vue'),
    meta: {
      breadcrumb: [{ label: 'Termos de Uso' }],
      seo: { title: 'Termos de Uso', description: 'Termos de uso do Dev Toolkit Suite Essentials.' },
    },
  },
  {
    path: '/privacidade',
    name: 'privacy',
    component: () => import('../views/legal/PrivacyView.vue'),
    meta: {
      breadcrumb: [{ label: 'Política de Privacidade' }],
      seo: {
        title: 'Política de Privacidade',
        description:
          'Política de privacidade em conformidade com LGPD, GDPR, CCPA e POPIA.',
      },
    },
  },
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('../views/errors/ForbiddenView.vue'),
    meta: {
      breadcrumb: [{ label: 'Acesso negado' }],
      seo: { title: 'Acesso negado', noindex: true },
    },
  },
  {
    path: '/500',
    name: 'server-error',
    component: () => import('../views/errors/ServerErrorView.vue'),
    meta: {
      breadcrumb: [{ label: 'Erro do servidor' }],
      seo: { title: 'Erro interno', noindex: true },
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/errors/NotFoundView.vue'),
    meta: { seo: { title: 'Página não encontrada', noindex: true } },
  },
]

const router = createRouter({
  history: createWebHistory('/dev_toolkit_suite_essentials/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

// Overlay de carregamento durante a navegação (chunks lazy)
router.beforeEach((_to, _from, next) => {
  const ui = useUiStore()
  ui.startLoading('Carregando...')
  next()
})

router.afterEach(() => {
  const ui = useUiStore()
  // pequeno atraso para suavizar transição
  setTimeout(() => ui.stopLoading(), 150)
})

router.onError(() => {
  const ui = useUiStore()
  ui.stopLoading()
})

export default router
