import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import Contato from './Contato.vue'
import Termos from './Termos.vue'
import Privacidade from './Privacidade.vue'
import NaoEncontrado from './NaoEncontrado.vue'

function criarRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/contato', component: Contato },
      { path: '/termos-de-uso', component: Termos },
      { path: '/politica-de-privacidade', component: Privacidade },
    ],
  })
}

describe('Renderização das páginas', () => {
  let router: ReturnType<typeof criarRouter>
  let pinia: ReturnType<typeof createPinia>

  beforeEach(() => {
    router = criarRouter()
    pinia = createPinia()
  })

  it('Contato renderiza sem erro', async () => {
    const w = mount(Contato, { global: { plugins: [router, pinia] } })
    expect(w.text()).toContain('Fale')
    expect(w.text()).toContain('99692-4829')
  })

  it('Termos renderiza sem erro', () => {
    const w = mount(Termos, { global: { plugins: [router, pinia] } })
    expect(w.text()).toContain('Termos de')
  })

  it('Privacidade renderiza sem erro', () => {
    const w = mount(Privacidade, { global: { plugins: [router, pinia] } })
    expect(w.text()).toContain('Privacidade')
  })

  it('NaoEncontrado renderiza sem erro', () => {
    const w = mount(NaoEncontrado, { global: { plugins: [router, pinia] } })
    expect(w.text()).toContain('404')
  })
})
