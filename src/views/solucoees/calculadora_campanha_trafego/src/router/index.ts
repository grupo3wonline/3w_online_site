import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/calculadora_campanha_trafego/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/ferramenta',
      name: 'Ferramenta',
      component: () => import('@/pages/FerramentaPage.vue'),
    },
    // Rotas antigas unificadas na landing: redirecionam para as âncoras da Home.
    { path: '/sobre', redirect: '/#sobre' },
    { path: '/servicos', redirect: '/#servicos' },
    { path: '/contato', redirect: '/#contato' },
    {
      path: '/termos-de-uso',
      name: 'Termos',
      component: () => import('@/pages/TermosPage.vue'),
    },
    {
      path: '/politica-de-privacidade',
      name: 'Privacidade',
      component: () => import('@/pages/PrivacidadePage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NaoEncontrado',
      component: () => import('@/pages/NaoEncontradoPage.vue'),
    },
  ],
  scrollBehavior(to: RouteLocationNormalized) {
    // Rola suavemente até a âncora (#secao) quando presente.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

export default router
