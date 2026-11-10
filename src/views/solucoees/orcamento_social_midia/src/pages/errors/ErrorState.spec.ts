import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import ErrorState from './ErrorState.vue'

describe('ErrorState', () => {
  const factory = () =>
    mount(ErrorState, {
      props: {
        code: '404',
        title: 'Página não encontrada',
        message: 'Rota inexistente.',
        icon: 'fa6-solid:compass',
      },
      global: {
        stubs: { RouterLink: RouterLinkStub, Icon: true },
      },
    })

  it('exibe código e título', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('404')
    expect(wrapper.text()).toContain('Página não encontrada')
  })

  it('possui links funcionais para Início e Calculadora', () => {
    const wrapper = factory()
    const links = wrapper.findAllComponents(RouterLinkStub)
    const targets = links.map((l) => l.props('to'))
    expect(targets).toContain('/')
    expect(targets).toContain('/calculadora')
  })
})
