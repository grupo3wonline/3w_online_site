import type { RouteRecordRaw } from 'vue-router'

export const solucoesRoutes: RouteRecordRaw[] = [
  {
    path: '/solucoes',
    name: 'Solucoes',
    component: () => import('@/views/Solucoes.vue'),
    meta: {
      title: 'Soluções Digitais Gratuitas | Aplicações Web Profissionais | 3W Online',
      description:
        'Suite com 62+ aplicações web profissionais e gratuitas: calculadoras, simuladores, geradores, ferramentas de design e dev tools. 100% client-side e privadas.',
      keywords:
        'soluções digitais, aplicações web grátis, calculadoras online, ferramentas dev, design tools, 3w online',
    },
  },
  {
    path: '/solucoes/:slug',
    name: 'SolucaoView',
    component: () => import('@/views/SolucaoView.vue'),
    meta: {
      // SEO dinâmico definido no componente via useSeo()
      title: 'Solução Digital | 3W Online',
      description: 'Acesse gratuitamente esta solução digital profissional da 3W Online.',
    },
  },
]
