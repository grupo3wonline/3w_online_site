import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'

// Recria a tabela de rotas para validar navegação e fluxo (sem montar componentes pesados)
const routes = [
  { path: '/', name: 'home', component: { template: '<div>home</div>' } },
  { path: '/playground', name: 'playground', component: { template: '<div>pg</div>' } },
  { path: '/termos', name: 'termos', component: { template: '<div>t</div>' } },
  { path: '/privacidade', name: 'privacidade', component: { template: '<div>p</div>' } },
  { path: '/403', name: 'forbidden', component: { template: '<div>403</div>' } },
  { path: '/500', name: 'server-error', component: { template: '<div>500</div>' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: '<div>404</div>' } },
]

describe('navegação de rotas', () => {
  beforeEach(() => setActivePinia(createPinia()))

  function makeRouter() {
    return createRouter({ history: createMemoryHistory(), routes })
  }

  it('resolve a rota inicial', async () => {
    const router = makeRouter()
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('navega para o playground', async () => {
    const router = makeRouter()
    await router.push('/playground')
    expect(router.currentRoute.value.name).toBe('playground')
  })

  it('navega para páginas legais', async () => {
    const router = makeRouter()
    await router.push('/termos')
    expect(router.currentRoute.value.name).toBe('termos')
    await router.push('/privacidade')
    expect(router.currentRoute.value.name).toBe('privacidade')
  })

  it('cai no catch-all 404 para rota inexistente', async () => {
    const router = makeRouter()
    await router.push('/rota-que-nao-existe')
    expect(router.currentRoute.value.name).toBe('not-found')
  })
})
