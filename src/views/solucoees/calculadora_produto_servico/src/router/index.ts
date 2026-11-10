import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Home continua lazy (é a maior página, contém as calculadoras).
const Home = () => import('@/pages/Home.vue')
// Páginas leves são importadas estaticamente para evitar falha de chunk
// (tela branca) após novos deploys em hospedagem compartilhada.
import Contato from '@/pages/Contato.vue'
import Termos from '@/pages/Termos.vue'
import Privacidade from '@/pages/Privacidade.vue'
import NaoEncontrado from '@/pages/NaoEncontrado.vue'

declare module 'vue-router' {
  interface RouteMeta {
    titulo?: string
    descricao?: string
    breadcrumb?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'inicio',
    component: Home,
    meta: {
      titulo: 'Calculadora de Preço para Produto e Serviço Grátis, Rápida e Profissional',
      descricao:
        'Calculadora gratuita e profissional para definir preços ideais de produtos e serviços. Considere custos, tempo, margem de lucro e impostos.',
      breadcrumb: 'Início',
    },
  },
  {
    path: '/contato',
    name: 'contato',
    component: Contato,
    meta: {
      titulo: 'Contato - Calculadora de Preços | Grupo 3w Online',
      descricao:
        'Fale com o Grupo 3w Online por WhatsApp ou e-mail. Desenvolvemos sites e sistemas personalizados sob demanda.',
      breadcrumb: 'Contato',
    },
  },
  {
    path: '/termos-de-uso',
    name: 'termos',
    component: Termos,
    meta: {
      titulo: 'Termos de Uso - Calculadora de Preços',
      descricao: 'Termos de Uso da Calculadora de Preço para Produto e Serviço.',
      breadcrumb: 'Termos de Uso',
    },
  },
  {
    path: '/politica-de-privacidade',
    name: 'privacidade',
    component: Privacidade,
    meta: {
      titulo: 'Política de Privacidade - Calculadora de Preços',
      descricao:
        'Política de Privacidade em conformidade com LGPD, GDPR, CCPA e POPIA. Saiba como protegemos seus dados.',
      breadcrumb: 'Política de Privacidade',
    },
  },
  // Rotas antigas unificadas na landing page (mantém links funcionando)
  { path: '/sobre', redirect: { name: 'inicio', hash: '#sobre' } },
  { path: '/servicos', redirect: { name: 'inicio', hash: '#servicos' } },
  { path: '/ferramentas', redirect: { name: 'inicio', hash: '#calculadora' } },
  {
    path: '/:pathMatch(.*)*',
    name: 'nao-encontrado',
    component: NaoEncontrado,
    meta: {
      titulo: 'Página não encontrada (404) - Calculadora de Preços',
      descricao: 'A página que você procura não existe ou foi movida.',
      breadcrumb: 'Página não encontrada',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      // Aguarda o elemento-alvo existir no DOM (as seções da Home são
      // montadas de forma assíncrona ao vir de outra rota). Faz algumas
      // tentativas antes de desistir para evitar o aviso de seletor não encontrado.
      return new Promise((resolve) => {
        let tentativas = 0
        const buscar = () => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve({ el: to.hash, behavior: 'smooth', top: 80 })
          } else if (tentativas < 20) {
            tentativas++
            setTimeout(buscar, 50)
          } else {
            resolve({ top: 0 })
          }
        }
        buscar()
      })
    }

    return { top: 0, behavior: 'smooth' }
  },
})

/**
 * Recuperação de falha ao carregar um chunk lazy (comum após novo deploy,
 * quando o navegador tem em cache um index.html que referencia assets antigos
 * já removidos do servidor). Em vez de tela branca, recarrega a página uma vez.
 */
router.onError((erro, to) => {
  const msg = erro?.message || ''
  const falhaChunk =
    /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
      msg
    )
  if (falhaChunk) {
    const chave = 'recarregou-chunk'
    if (!sessionStorage.getItem(chave)) {
      sessionStorage.setItem(chave, '1')
      window.location.assign(to.fullPath)
    }
  }
})

// Limpa a flag de recarga quando uma navegação conclui com sucesso.
router.afterEach(() => {
  sessionStorage.removeItem('recarregou-chunk')
})

export default router
