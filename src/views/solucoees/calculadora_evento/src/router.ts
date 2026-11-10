import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const HomePage = () => import('./pages/HomePage.vue')
const TermosPage = () => import('./pages/TermosDeUsoPage.vue')
const PoliticaPage = () => import('./pages/PoliticaDePrivacidadePage.vue')
const NotFoundPage = () => import('./pages/NotFoundPage.vue')
const ErrorPage = () => import('./pages/ErrorPage.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage, meta: { title: 'Início' } },
  // Rotas antigas consolidadas na landing — redirecionam para as âncoras
  { path: '/ferramenta', redirect: { path: '/', hash: '#calculadora' } },
  { path: '/sobre', redirect: { path: '/', hash: '#sobre' } },
  { path: '/contato', redirect: { path: '/', hash: '#contato' } },
  { path: '/termos-de-uso', name: 'termos', component: TermosPage, meta: { title: 'Termos de Uso' } },
  { path: '/politica-de-privacidade', name: 'politica', component: PoliticaPage, meta: { title: 'Política de Privacidade' } },
  { path: '/erro', name: 'erro', component: ErrorPage, meta: { title: 'Erro' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage, meta: { title: 'Página Não Encontrada' } },
]

const router = createRouter({
  history: createWebHistory('/calculadora_evento/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to) => {
  const baseTitle = 'EventCalc - Calculadora de Eventos'
  document.title = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle
})

// Falhas ao carregar chunks lazy costumam ocorrer após um novo deploy
// (o hash do arquivo mudou). Recarrega a página uma única vez para buscar
// o chunk atualizado; se ainda assim falhar, envia para a página de erro.
const RELOAD_KEY = 'eventcalc-chunk-reload'
router.onError((error, to) => {
  const isChunkError = /dynamically imported module|Loading chunk|Importing a module script failed/i.test(
    error?.message ?? '',
  )
  if (!isChunkError) {
    router.push({ name: 'erro' }).catch(() => {})
    return
  }
  if (!sessionStorage.getItem(RELOAD_KEY)) {
    sessionStorage.setItem(RELOAD_KEY, '1')
    window.location.assign(to.fullPath)
  } else {
    router.push({ name: 'erro' }).catch(() => {})
  }
})

// Limpa a trava de recarga após uma navegação bem-sucedida
router.afterEach(() => {
  sessionStorage.removeItem(RELOAD_KEY)
})

export default router
