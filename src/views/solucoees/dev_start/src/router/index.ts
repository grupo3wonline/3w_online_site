import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUiStore } from '@/stores/ui'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'DevStart Academy | Aprenda Programação de Forma Gamificada',
      description:
        'Plataforma educacional gamificada para aprender lógica de programação, algoritmos, PHP e desenvolvimento web. Grátis e em português.',
      breadcrumb: [{ label: 'Início' }],
    },
  },
  {
    path: '/ferramentas',
    name: 'tools',
    component: () => import('@/views/ToolsView.vue'),
    meta: {
      title: 'Ferramentas Interativas | DevStart Academy',
      description:
        'Explore fluxograma, circuitos lógicos, blocos, Portugol, PHP e playground web. Aprenda praticando.',
      breadcrumb: [{ label: 'Início', to: '/' }, { label: 'Ferramentas' }],
    },
  },
  {
    path: '/ferramentas/fluxograma',
    name: 'tool-flowchart',
    component: () => import('@/views/tools/FlowchartView.vue'),
    meta: {
      title: 'Fluxograma Interativo | DevStart',
      description: 'Editor visual de fluxogramas com simulação passo a passo.',
      breadcrumb: [
        { label: 'Início', to: '/' },
        { label: 'Ferramentas', to: '/ferramentas' },
        { label: 'Fluxograma' },
      ],
    },
  },
  {
    path: '/ferramentas/logica',
    name: 'tool-logic',
    component: () => import('@/views/tools/LogicView.vue'),
    meta: {
      title: 'Simulador Lógico | DevStart',
      description: 'Monte circuitos digitais e veja os sinais em tempo real.',
      breadcrumb: [
        { label: 'Início', to: '/' },
        { label: 'Ferramentas', to: '/ferramentas' },
        { label: 'Simulador Lógico' },
      ],
    },
  },
  {
    path: '/ferramentas/blocos',
    name: 'tool-scratch',
    component: () => import('@/views/tools/BlockCodingView.vue'),
    meta: {
      title: 'Programação em Blocos | DevStart',
      description: 'Programe um personagem arrastando blocos, estilo Scratch.',
      breadcrumb: [
        { label: 'Início', to: '/' },
        { label: 'Ferramentas', to: '/ferramentas' },
        { label: 'Blocos' },
      ],
    },
  },
  {
    path: '/ferramentas/portugol',
    name: 'tool-portugol',
    component: () => import('@/views/tools/CodeEditorView.vue'),
    props: { language: 'portugol', title: 'Portugol Studio' },
    meta: {
      title: 'Portugol Studio | DevStart',
      description: 'Editor de Portugol com execução simulada e snippets.',
      breadcrumb: [
        { label: 'Início', to: '/' },
        { label: 'Ferramentas', to: '/ferramentas' },
        { label: 'Portugol' },
      ],
    },
  },
  {
    path: '/ferramentas/visualg',
    name: 'tool-visualg',
    component: () => import('@/views/tools/CodeEditorView.vue'),
    props: { language: 'visualg', title: 'VisualG IDE' },
    meta: {
      title: 'VisualG | DevStart',
      description: 'Ambiente de algoritmos no estilo VisualG.',
      breadcrumb: [
        { label: 'Início', to: '/' },
        { label: 'Ferramentas', to: '/ferramentas' },
        { label: 'VisualG' },
      ],
    },
  },
  {
    path: '/ferramentas/php',
    name: 'tool-php',
    component: () => import('@/views/tools/CodeEditorView.vue'),
    props: { language: 'php', title: 'PHP Sandbox' },
    meta: {
      title: 'PHP Sandbox | DevStart',
      description: 'Escreva PHP e veja a saída simulada.',
      breadcrumb: [
        { label: 'Início', to: '/' },
        { label: 'Ferramentas', to: '/ferramentas' },
        { label: 'PHP' },
      ],
    },
  },
  {
    path: '/ferramentas/web',
    name: 'tool-web',
    component: () => import('@/views/tools/WebPlaygroundView.vue'),
    meta: {
      title: 'Playground Web | DevStart',
      description: 'HTML, CSS e JS ao vivo, com preview automático.',
      breadcrumb: [
        { label: 'Início', to: '/' },
        { label: 'Ferramentas', to: '/ferramentas' },
        { label: 'Playground Web' },
      ],
    },
  },
  {
    path: '/ferramentas/desafios',
    name: 'tool-challenges',
    component: () => import('@/views/tools/ChallengeView.vue'),
    meta: {
      title: 'Desafios & Cursos | DevStart',
      description: 'Desafios semanais e cursos gratuitos de programação.',
      breadcrumb: [
        { label: 'Início', to: '/' },
        { label: 'Ferramentas', to: '/ferramentas' },
        { label: 'Desafios' },
      ],
    },
  },
  {
    path: '/privacidade',
    name: 'privacy',
    component: () => import('@/views/PrivacyView.vue'),
    meta: {
      title: 'Política de Privacidade | DevStart Academy',
      description: 'Como tratamos seus dados em conformidade com LGPD, GDPR, CCPA e POPIA.',
      breadcrumb: [{ label: 'Início', to: '/' }, { label: 'Política de Privacidade' }],
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/NotFoundView.vue'),
    meta: {
      title: 'Página não encontrada (404) | DevStart',
      description: 'A página que você procura não existe.',
      breadcrumb: [{ label: 'Início', to: '/' }, { label: 'Erro 404' }],
    },
  },
]

const router = createRouter({
  history: createWebHistory('/dev_start/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((_to, _from, next) => {
  const ui = useUiStore()
  ui.startLoading('Carregando página...')
  next()
})

router.afterEach((to) => {
  const ui = useUiStore()
  // Pequeno atraso para transição suave do overlay.
  window.setTimeout(() => ui.stopLoading(), 150)
  if (to.meta.title) document.title = String(to.meta.title)
})

export default router
