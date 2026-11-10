import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import ptBR from '@/i18n/locales/pt-BR'

const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR } })

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/playground', component: { template: '<div />' } },
  ],
})

describe('BaseButton', () => {
  it('renderiza o slot e aplica variante primária por padrão', () => {
    const wrapper = mount(BaseButton, { slots: { default: 'Clique' } })
    expect(wrapper.text()).toContain('Clique')
    expect(wrapper.classes().join(' ')).toContain('gradient-brand')
  })

  it('aplica classe de bloco quando block=true', () => {
    const wrapper = mount(BaseButton, { props: { block: true } })
    expect(wrapper.classes()).toContain('w-full')
  })

  it('fica desabilitado quando disabled=true', () => {
    const wrapper = mount(BaseButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})

describe('ErrorState', () => {
  it('exibe o código e o título do erro', () => {
    const wrapper = mount(ErrorState, {
      props: { code: '404', title: 'Não encontrada', message: 'Rota inexistente' },
      global: { plugins: [createPinia(), i18n, router] },
    })
    expect(wrapper.text()).toContain('404')
    expect(wrapper.text()).toContain('Não encontrada')
    expect(wrapper.text()).toContain('Rota inexistente')
  })
})
