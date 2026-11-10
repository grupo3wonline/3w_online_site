import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: 'Calculadora de Pontos Elétricos NBR 5410',
      description:
        'Calculadora profissional de pontos elétricos e metragem de cabos. Ferramenta gratuita e moderna para eletricistas, engenheiros e arquitetos.',
    },
  },
  // Rotas antigas agora são seções da landing — redireciona para as âncoras.
  { path: '/calculadora', redirect: '/#calculadora' },
  { path: '/sobre', redirect: '/#sobre' },
  { path: '/contato', redirect: '/#contato' },
  { path: '/servicos', redirect: '/#servicos' },
  { path: '/ferramentas', redirect: '/#ferramentas' },
  {
    path: '/politica-privacidade',
    name: 'PrivacyPolicy',
    component: () => import('@/pages/PrivacyPolicy.vue'),
    meta: {
      title: 'Política de Privacidade',
      description:
        'Conheça nossa política de privacidade e como protegemos seus dados conforme a LGPD.',
      breadcrumb: 'Política de Privacidade',
    },
  },
  {
    path: '/termos-uso',
    name: 'TermsOfService',
    component: () => import('@/pages/TermsOfService.vue'),
    meta: {
      title: 'Termos de Uso',
      description: 'Leia nossos termos e condições de uso do serviço.',
      breadcrumb: 'Termos de Uso',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: { title: 'Página não encontrada' },
  },
]

const router = createRouter({
  history: createWebHistory('/calculadora_ponto_eletrico/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

// Atualiza o título como fallback (o SEO por rota é feito via useSEO nas páginas).
router.afterEach((to) => {
  const base = 'Calculadora de Pontos Elétricos'
  const title = to.meta.title as string | undefined
  document.title = title && title !== base ? `${title} | ${base}` : base
})

// Falha ao carregar um chunk dinâmico (ex.: assets antigos após novo deploy):
// recarrega a página uma única vez para buscar os arquivos atualizados.
router.onError((error, to) => {
  const isChunkError =
    /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
      error?.message ?? '',
    )
  if (isChunkError) {
    const reloadKey = 'chunk-reload'
    if (!sessionStorage.getItem(reloadKey)) {
      sessionStorage.setItem(reloadKey, '1')
      window.location.assign(to.fullPath)
    }
  }
})

// Limpa a trava de reload após uma navegação bem-sucedida.
router.afterEach(() => {
  sessionStorage.removeItem('chunk-reload')
})

export default router
