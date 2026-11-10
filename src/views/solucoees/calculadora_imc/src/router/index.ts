import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Calculadora de IMC Online Grátis | Metas de Saúde',
      description:
        'Calcule seu IMC, taxa metabólica, hidratação e metas nutricionais personalizadas. Ferramenta gratuita, rápida e 100% privada.',
      breadcrumb: 'Início',
    },
  },
  {
    path: '/calculadora',
    name: 'calculator',
    component: () => import('@/views/CalculatorView.vue'),
    meta: {
      title: 'Calculadora | Calculadora de IMC',
      description:
        'Preencha altura, peso, idade, sexo e nível de atividade para calcular seu IMC e metas diárias de saúde.',
      breadcrumb: 'Calculadora',
    },
  },
  {
    path: '/termos-de-uso',
    name: 'terms',
    component: () => import('@/views/TermsView.vue'),
    meta: {
      title: 'Termos de Uso | Calculadora de IMC',
      description: 'Termos de uso da aplicação Calculadora de IMC.',
      breadcrumb: 'Termos de Uso',
    },
  },
  {
    path: '/politica-de-privacidade',
    name: 'privacy',
    component: () => import('@/views/PrivacyView.vue'),
    meta: {
      title: 'Política de Privacidade | Calculadora de IMC',
      description:
        'Política de privacidade e conformidade com LGPD, GDPR, CCPA e POPIA.',
      breadcrumb: 'Política de Privacidade',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Página não encontrada | Calculadora de IMC',
      description: 'A página que você procura não foi encontrada.',
      breadcrumb: 'Erro 404',
    },
  },
]

const router = createRouter({
  history: createWebHistory('/calculadora_imc/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'smooth' }
    }
    return savedPosition ?? { top: 0, behavior: 'smooth' }
  },
})

// Atualiza título e meta description por rota (SEO client-side)
router.afterEach((to) => {
  const title = (to.meta.title as string) ?? 'Calculadora de IMC'
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
})

export default router
