import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'

const mountOptions = {
  global: {
    stubs: {
      RouterLink: RouterLinkStub,
      Icon: { template: '<span />' },
    },
  },
}

describe('AppBreadcrumb', () => {
  const items = [
    { label: 'Início', path: '/' },
    { label: 'Contato' },
  ]

  it('renderiza dois itens de breadcrumb', () => {
    const wrapper = mount(AppBreadcrumb, {
      props: { items },
      ...mountOptions,
    })

    const listItems = wrapper.findAll('li')
    expect(listItems.length).toBe(2)
  })

  it('o último item não tem RouterLink — é span com aria-current="page"', () => {
    const wrapper = mount(AppBreadcrumb, {
      props: { items },
      ...mountOptions,
    })

    const currentSpans = wrapper.findAll('[aria-current="page"]')
    expect(currentSpans.length).toBe(1)
    expect(currentSpans[0].text()).toBe('Contato')
  })

  it('o primeiro item tem RouterLink apontando para "/"', () => {
    const wrapper = mount(AppBreadcrumb, {
      props: { items },
      ...mountOptions,
    })

    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.exists()).toBe(true)
    expect(link.props('to')).toBe('/')
  })
})
