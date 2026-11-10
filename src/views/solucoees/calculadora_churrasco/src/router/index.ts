import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useLoading } from '@/composables/useLoading'

const Home = () => import('@/pages/HomePage.vue')
const Ferramenta = () => import('@/pages/FerramentaPage.vue')
const Orcamento = () => import('@/pages/OrcamentoPage.vue')
const Privacidade = () => import('@/pages/PrivacidadePage.vue')
const NotFound = () => import('@/pages/NotFoundPage.vue')
const Erro = () => import('@/pages/ErroPage.vue')

const SITE_NAME = 'Calculadora de Churrasco'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: `${SITE_NAME} - Planeje seu churrasco perfeito`,
      description:
        'Calculadora de churrasco gratuita: calcule carnes, bebidas e acompanhamentos por número de convidados e duração. Rápida, precisa e sem cadastro.',
    },
  },
  {
    path: '/calculadora',
    name: 'ferramenta',
    component: Ferramenta,
    // Mantém compatibilidade com o link antigo /ferramenta
    alias: ['/ferramenta'],
    meta: {
      title: `Calculadora - ${SITE_NAME}`,
      description:
        'Use a ferramenta para calcular a quantidade exata de carne, frango, linguiça, bebidas e destilados do seu churrasco.',
    },
  },
  {
    path: '/orcamento',
    name: 'orcamento',
    component: Orcamento,
    meta: {
      title: `Orçamento e Rateio - ${SITE_NAME}`,
      description:
        'Calculadora manual de orçamento: adicione itens e valores, veja o total e divida o custo do churrasco entre os participantes (vaquinha).',
    },
  },
  {
    path: '/privacidade',
    name: 'privacidade',
    component: Privacidade,
    alias: ['/sobre'],
    meta: {
      title: `Privacidade - ${SITE_NAME}`,
      description:
        'Política de Privacidade da Calculadora de Churrasco em conformidade com LGPD, GDPR, CCPA e POPIA.',
    },
  },
  {
    path: '/erro',
    name: 'erro',
    component: Erro,
    meta: { title: `Erro - ${SITE_NAME}`, description: 'Ocorreu um erro inesperado.' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { title: `404 - Página não encontrada`, description: 'Página não encontrada.' },
  },
]

const router = createRouter({
  history: createWebHistory('/calculadora_churrasco/'),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

const { iniciar, finalizar } = useLoading()

router.beforeEach(() => {
  iniciar('Carregando página...')
})

router.afterEach((to) => {
  // Atualiza título e meta description para SEO por rota.
  const title = (to.meta.title as string) || SITE_NAME
  document.title = title

  const desc = to.meta.description as string | undefined
  if (desc) {
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', desc)
  }

  // Atualiza canonical por rota.
  const canonicalBase = 'https://app.3wonline.com/calculadora_churrasco'
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', `${canonicalBase}${to.path === '/' ? '' : to.path}`)

  finalizar()
})

router.onError(() => {
  finalizar()
})

export default router
