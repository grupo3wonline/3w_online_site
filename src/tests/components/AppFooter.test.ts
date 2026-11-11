import { describe, it, expect, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import AppFooter from '@/components/layout/AppFooter.vue'

// Mock do composable de privacidade usado no Footer
vi.mock('@/composables/usePrivacyConsent', () => ({
  usePrivacyConsent: () => ({
    openPreferences: vi.fn(),
  }),
}))

const globalOptions = {
  global: {
    stubs: {
      RouterLink: RouterLinkStub,
      Icon: { template: '<span />' },
    },
  },
}

/** Todos os caminhos de RouterLink que o footer deve conter */
const expectedNavLinks = ['/', '/servicos', '/ferramentas']
const expectedLegalLinks = ['/privacidade', '/termos', '/cookies', '/regulamento', '/pagamento']
const expectedServiceLinks = [
  '/servicos/criacao-sites',
  '/servicos/criacao-sistemas',
  '/servicos/automacao-ia',
  '/servicos/gestao-anuncios',
  '/servicos/gestao-redes-sociais',
  '/servicos/marketing-digital',
  '/servicos/desenvolvimento-apps',
  '/servicos/design-grafico',
]

describe('AppFooter', () => {
  it('renderiza sem erros', () => {
    const wrapper = mount(AppFooter, globalOptions)
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe o elemento footer com role="contentinfo"', () => {
    const wrapper = mount(AppFooter, globalOptions)
    const footer = wrapper.find('footer[role="contentinfo"]')
    expect(footer.exists()).toBe(true)
  })

  it('links de navegação principais estão presentes e apontam para rotas corretas', () => {
    const wrapper = mount(AppFooter, globalOptions)
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)
    const paths = routerLinks.map((l) => l.props('to')).filter(Boolean)

    for (const path of expectedNavLinks) {
      expect(paths, `Link de navegação "${path}" não encontrado no footer`).toContain(path)
    }
  })

  it('links legais (privacidade, termos, cookies, etc.) estão presentes', () => {
    const wrapper = mount(AppFooter, globalOptions)
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)
    const paths = routerLinks.map((l) => l.props('to')).filter(Boolean)

    for (const path of expectedLegalLinks) {
      expect(paths, `Link legal "${path}" não encontrado no footer`).toContain(path)
    }
  })

  it('links de serviços em destaque estão presentes e corretos', () => {
    const wrapper = mount(AppFooter, globalOptions)
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)
    const paths = routerLinks.map((l) => l.props('to')).filter(Boolean)

    for (const path of expectedServiceLinks) {
      expect(paths, `Link de serviço "${path}" não encontrado no footer`).toContain(path)
    }
  })

  it('link de WhatsApp tem target="_blank" e rel="noopener noreferrer"', () => {
    const wrapper = mount(AppFooter, globalOptions)
    const whatsappLinks = wrapper.findAll('a[href*="wa.me"]')
    expect(whatsappLinks.length).toBeGreaterThan(0)

    for (const link of whatsappLinks) {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }
  })

  it('link de WhatsApp contém o número correto', () => {
    const wrapper = mount(AppFooter, globalOptions)
    const whatsappLinks = wrapper.findAll('a[href*="wa.me"]')
    for (const link of whatsappLinks) {
      expect(link.attributes('href')).toContain('5541996924829')
    }
  })

  it('links de redes sociais têm target="_blank" e rel="noopener noreferrer"', () => {
    const wrapper = mount(AppFooter, globalOptions)
    // Links externos são os <a> com target="_blank"
    const externalLinks = wrapper.findAll('a[target="_blank"]')
    expect(externalLinks.length).toBeGreaterThan(0)

    for (const link of externalLinks) {
      expect(
        link.attributes('rel'),
        `Link externo "${link.attributes('href')}" não tem rel="noopener noreferrer"`,
      ).toBe('noopener noreferrer')
    }
  })

  it('link de telefone aponta para tel: com o número correto', () => {
    const wrapper = mount(AppFooter, globalOptions)
    const telLink = wrapper.find('a[href^="tel:"]')
    expect(telLink.exists()).toBe(true)
    expect(telLink.attributes('href')).toContain('5541996924829')
  })

  it('link de e-mail aponta para mailto: correto', () => {
    const wrapper = mount(AppFooter, globalOptions)
    const mailLink = wrapper.find('a[href^="mailto:"]')
    expect(mailLink.exists()).toBe(true)
    expect(mailLink.attributes('href')).toBe('mailto:contato@3wonline.com.br')
  })

  it('exibe o ano atual no copyright', () => {
    const wrapper = mount(AppFooter, globalOptions)
    const currentYear = new Date().getFullYear().toString()
    expect(wrapper.text()).toContain(currentYear)
  })

  it('botão de preferências de privacidade está presente', () => {
    const wrapper = mount(AppFooter, globalOptions)
    // O botão tem texto "Preferências de Privacidade"
    const btn = wrapper.find('button')
    expect(btn.exists()).toBe(true)
  })

  it('links de redes sociais incluem Instagram, Facebook e WhatsApp', () => {
    const wrapper = mount(AppFooter, globalOptions)
    const externalLinks = wrapper.findAll('a[target="_blank"]')
    const hrefs = externalLinks.map((l) => l.attributes('href') ?? '')

    const hasInstagram = hrefs.some((h) => h.includes('instagram.com'))
    const hasFacebook = hrefs.some((h) => h.includes('facebook.com'))
    const hasWhatsApp = hrefs.some((h) => h.includes('wa.me'))

    expect(hasInstagram, 'Link do Instagram não encontrado').toBe(true)
    expect(hasFacebook, 'Link do Facebook não encontrado').toBe(true)
    expect(hasWhatsApp, 'Link do WhatsApp não encontrado').toBe(true)
  })

  it('links sociais têm aria-label acessível', () => {
    const wrapper = mount(AppFooter, globalOptions)
    // Links sociais são os <a> de redes sociais com aria-label
    const socialLinks = wrapper.findAll('a[aria-label]')
    expect(socialLinks.length).toBeGreaterThan(0)
  })
})
