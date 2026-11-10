import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { applyRouteSeo, type RouteSeo } from '@/lib/seo/meta'

declare module 'vue-router' {
  interface RouteMeta {
    seo?: RouteSeo
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      seo: {
        title: 'Analisador de Texto · Análise e Comparação Online Grátis',
        description:
          'Ferramenta gratuita para analisar e comparar textos: conte caracteres, palavras, sentenças, parágrafos e linhas. 100% local, privado e sem cadastro.',
        path: ''
      }
    }
  },
  {
    path: '/ferramenta',
    name: 'ferramenta',
    component: () => import('@/pages/FerramentaPage.vue'),
    meta: {
      seo: {
        title: 'Ferramenta de Análise · Analisador de Texto',
        description:
          'Analise e compare dois textos lado a lado com métricas em tempo real. Filtre espaços, pontuação e números. Importe arquivos .txt. Tudo no seu navegador.',
        path: 'ferramenta'
      }
    }
  },
  // Rotas institucionais foram unificadas na landing (home). Mantidas como
  // redirecionamentos para preservar links antigos, SEO e favoritos.
  { path: '/sobre', redirect: { path: '/', hash: '#sobre' } },
  { path: '/servicos', redirect: { path: '/', hash: '#servicos' } },
  { path: '/contato', redirect: { path: '/', hash: '#contato' } },
  {
    path: '/erro',
    name: 'erro',
    component: () => import('@/pages/ErrorPage.vue'),
    meta: {
      seo: {
        title: 'Erro · Analisador de Texto',
        description: 'Ocorreu um erro inesperado no Analisador de Texto.',
        path: 'erro'
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {
      seo: {
        title: 'Página não encontrada · Analisador de Texto',
        description: 'A página que você procura não existe ou foi movida.',
        path: '404'
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory('/analisador_texto/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  if (to.meta.seo) applyRouteSeo(to.meta.seo)
})

export default router
