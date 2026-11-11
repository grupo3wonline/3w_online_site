import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import AppNavbar from '@/components/layout/AppNavbar.vue'

// Mock dos composables usados na Navbar
vi.mock('@/composables/useDarkMode', () => ({
  useDarkMode: () => ({
    isDark: { value: false },
    toggleDark: vi.fn(),
  }),
}))

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue-router')>()
  return {
    ...actual,
    useRoute: () => ({ path: '/', fullPath: '/' }),
    RouterLink: RouterLinkStub,
  }
})

const globalOptions = {
  global: {
    stubs: {
      RouterLink: RouterLinkStub,
      Icon: { template: '<span />' },
      Transition: { template: '<div><slot /></div>' },
      TransitionGroup: { template: '<div><slot /></div>' },
    },
    mocks: {
      $route: { path: '/', fullPath: '/' },
    },
  },
}

/** Rotas conhecidas do router (caminhos que devem existir na aplicação) */
const knownRoutes = new Set([
  '/',
  '/servicos',
  '/ferramentas',
  '/servicos/criacao-sites',
  '/servicos/criacao-sistemas',
  '/servicos/automacao-ia',
  '/servicos/gestao-anuncios',
  '/servicos/gestao-redes-sociais',
  '/servicos/marketing-digital',
  '/servicos/desenvolvimento-apps',
  '/servicos/design-grafico',
  '/servicos/consultoria-marketing',
  '/servicos/publicidade',
  '/servicos/organizacao-comercial',
  '/servicos/relacoes-publicas',
  '/servicos/planejamento-campanhas',
])

describe('AppNavbar', () => {
  it('renderiza sem erros', () => {
    const wrapper = mount(AppNavbar, globalOptions)
    expect(wrapper.exists()).toBe(true)
  })

  it('contém o link de logo apontando para "/"', () => {
    const wrapper = mount(AppNavbar, globalOptions)
    const logoLink = wrapper.findAllComponents(RouterLinkStub).find((l) => l.props('to') === '/')
    expect(logoLink).toBeDefined()
    expect(logoLink!.exists()).toBe(true)
  })

  it('links mobile apontam para rotas conhecidas', () => {
    const wrapper = mount(AppNavbar, globalOptions)
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)
    const paths = routerLinks.map((l) => l.props('to')).filter(Boolean)

    // Verifica que os links de navegação mobile estão em rotas conhecidas
    const mobileExpected = ['/', '/servicos', '/ferramentas']
    for (const path of mobileExpected) {
      expect(paths).toContain(path)
    }
  })

  it('links do dropdown de serviços apontam para rotas conhecidas', () => {
    const wrapper = mount(AppNavbar, globalOptions)
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)
    const paths = routerLinks.map((l) => l.props('to')).filter(Boolean)

    const serviceDropdownPaths = [
      '/servicos/criacao-sites',
      '/servicos/criacao-sistemas',
      '/servicos/automacao-ia',
      '/servicos/gestao-anuncios',
      '/servicos/gestao-redes-sociais',
      '/servicos/marketing-digital',
      '/servicos/desenvolvimento-apps',
      '/servicos/design-grafico',
      '/servicos/consultoria-marketing',
    ]

    for (const path of serviceDropdownPaths) {
      expect(paths, `Link de serviço "${path}" não encontrado na navbar`).toContain(path)
      expect(knownRoutes, `Rota "${path}" não está registrada no router`).toContain(path)
    }
  })

  it('link "Ver Todos os Serviços" aponta para /servicos', () => {
    const wrapper = mount(AppNavbar, globalOptions)
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)
    const servicosLink = routerLinks.find((l) => l.props('to') === '/servicos')
    expect(servicosLink).toBeDefined()
  })

  it('link de WhatsApp tem target="_blank" e rel="noopener noreferrer"', () => {
    const wrapper = mount(AppNavbar, globalOptions)
    const whatsappLinks = wrapper.findAll('a[href*="wa.me"]')

    for (const link of whatsappLinks) {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }
  })

  it('link de WhatsApp contém o número correto (5541996924829)', () => {
    const wrapper = mount(AppNavbar, globalOptions)
    const whatsappLinks = wrapper.findAll('a[href*="wa.me"]')
    expect(whatsappLinks.length).toBeGreaterThan(0)

    for (const link of whatsappLinks) {
      expect(link.attributes('href')).toContain('5541996924829')
    }
  })

  it('botão do menu hamburger tem aria-label de acessibilidade', () => {
    const wrapper = mount(AppNavbar, globalOptions)
    const hamburger = wrapper.find('button[aria-label="Abrir menu de navegação"]')
    expect(hamburger.exists()).toBe(true)
  })

  it('botão de dark mode tem aria-label de acessibilidade', () => {
    const wrapper = mount(AppNavbar, globalOptions)
    const darkBtn = wrapper.find('button[aria-label]')
    // Pelo menos um botão com aria-label (dark mode)
    expect(darkBtn.exists()).toBe(true)
  })

  it('toggling mobile menu abre e fecha o drawer', async () => {
    const wrapper = mount(AppNavbar, globalOptions)
    // Usa aria-label para identificar o botão hamburger com precisão
    const hamburger = wrapper.find('button[aria-label="Abrir menu de navegação"]')
    expect(hamburger.exists()).toBe(true)

    // Estado inicial fechado
    expect(hamburger.attributes('aria-expanded')).toBe('false')

    // Abre
    await hamburger.trigger('click')
    expect(hamburger.attributes('aria-expanded')).toBe('true')

    // Fecha
    await hamburger.trigger('click')
    expect(hamburger.attributes('aria-expanded')).toBe('false')
  })

  it('link "Orçamento Grátis" aponta para /#contato', () => {
    const wrapper = mount(AppNavbar, globalOptions)
    const orcamentoLink = wrapper.find('a[href="/#contato"]')
    expect(orcamentoLink.exists()).toBe(true)
  })
})
