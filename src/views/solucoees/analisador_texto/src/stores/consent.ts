/**
 * Store de consentimento de privacidade.
 * Atende LGPD (BR), GDPR (UE), CCPA/CPRA (Califórnia) e POPIA (África do Sul):
 * consentimento explícito, granular e revogável, integrado ao Google Consent Mode v2.
 */
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

const STORAGE_KEY = 'analisador-consent'

export interface ConsentState {
  /** Cookies estritamente necessários — sempre ativos, não configuráveis. */
  necessary: true
  /** Cookies de análise/estatística (GA4). */
  analytics: boolean
  /** Cookies de marketing/publicidade. */
  marketing: boolean
  /** Momento da decisão (ISO), para auditoria/expiração. */
  decidedAt: string | null
}

const DEFAULT_STATE: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  decidedAt: null
}

/** Reflete a decisão no Google Consent Mode v2. */
function pushConsentToGoogle(state: ConsentState) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: state.marketing ? 'granted' : 'denied'
  })
}

export const useConsentStore = defineStore('consent', () => {
  const state = useStorage<ConsentState>(STORAGE_KEY, { ...DEFAULT_STATE }, localStorage, {
    mergeDefaults: true
  })

  const hasDecided = computed(() => state.value.decidedAt !== null)
  const bannerVisible = computed(() => !hasDecided.value)

  function persistDecision(analytics: boolean, marketing: boolean) {
    state.value = {
      necessary: true,
      analytics,
      marketing,
      decidedAt: new Date().toISOString()
    }
    pushConsentToGoogle(state.value)
  }

  /** Aceita todos os cookies opcionais. */
  function acceptAll() {
    persistDecision(true, true)
  }

  /** Rejeita todos os cookies opcionais (mantém apenas os necessários). */
  function rejectAll() {
    persistDecision(false, false)
  }

  /** Salva preferências granulares escolhidas pelo usuário. */
  function savePreferences(prefs: { analytics: boolean; marketing: boolean }) {
    persistDecision(prefs.analytics, prefs.marketing)
  }

  /** Reabre o banner permitindo revogar/alterar o consentimento (direito garantido por lei). */
  function reopen() {
    state.value = { ...state.value, decidedAt: null }
  }

  /** Reaplica ao Google o estado atual (ex.: no carregamento inicial). */
  function syncToGoogle() {
    if (hasDecided.value) pushConsentToGoogle(state.value)
  }

  return {
    state,
    hasDecided,
    bannerVisible,
    acceptAll,
    rejectAll,
    savePreferences,
    reopen,
    syncToGoogle
  }
})
