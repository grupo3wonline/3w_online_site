import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// vi.hoisted garante que estas variáveis estejam disponíveis antes do vi.mock (hoisting)
const { mockAcceptAll, mockGetStoredConsent, mockClosePreferences } = vi.hoisted(() => ({
  mockAcceptAll: vi.fn(),
  mockGetStoredConsent: vi.fn(),
  mockClosePreferences: vi.fn(),
}))

// Mock do composable antes do import do componente (exigido pelo hoisting do vi.mock)
vi.mock('@/composables/usePrivacyConsent', async () => {
  const { ref } = await import('vue')
  const isPreferencesModalOpen = ref(false)

  return {
    isPreferencesModalOpen,
    consentPreferences: ref({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: '',
      frameworks: [],
    }),
    usePrivacyConsent: () => ({
      isPreferencesModalOpen,
      getStoredConsent: mockGetStoredConsent,
      saveConsent: vi.fn(),
      acceptAll: mockAcceptAll,
      rejectNonEssential: vi.fn(),
      openPreferences: vi.fn(),
      closePreferences: mockClosePreferences,
    }),
  }
})

import CookieBanner from '@/components/ui/CookieBanner.vue'

const globalStubs = {
  global: {
    stubs: {
      Icon: { template: '<span />' },
      RouterLink: { template: '<a><slot /></a>' },
      Transition: { template: '<div><slot /></div>' },
    },
  },
}

describe('CookieBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('banner está visível quando getStoredConsent() retorna null', async () => {
    mockGetStoredConsent.mockReturnValue(null)

    const wrapper = mount(CookieBanner, globalStubs)
    await nextTick()

    expect(
      wrapper.find('[aria-label="Gerenciamento Global de Privacidade e Cookies"]').exists(),
    ).toBe(true)
  })

  it('banner está oculto quando getStoredConsent() retorna objeto de consentimento', async () => {
    mockGetStoredConsent.mockReturnValue({
      necessary: true,
      analytics: true,
      marketing: false,
      timestamp: new Date().toISOString(),
      frameworks: ['LGPD', 'GDPR'],
    })

    const wrapper = mount(CookieBanner, globalStubs)
    await nextTick()

    expect(
      wrapper.find('[aria-label="Gerenciamento Global de Privacidade e Cookies"]').exists(),
    ).toBe(false)
  })

  it('clicar em "Aceitar Todos" chama acceptAll()', async () => {
    mockGetStoredConsent.mockReturnValue(null)

    const wrapper = mount(CookieBanner, globalStubs)
    await nextTick()

    const buttons = wrapper.findAll('button')
    const acceptBtn = buttons.find((b) => b.text().includes('Aceitar Todos'))
    expect(acceptBtn).toBeDefined()

    await acceptBtn!.trigger('click')

    expect(mockAcceptAll).toHaveBeenCalledOnce()
  })
})
