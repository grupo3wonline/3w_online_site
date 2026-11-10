import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'

const COOKIE_KEY = 'eventcalc-consent'
const COOKIE_EXPIRY_DAYS = 180

export interface ConsentState {
  /** Cookies essenciais — sempre ativos, não podem ser desligados. */
  necessary: true
  /** Cookies de análise (GA4/GTM). */
  analytics: boolean
  /** Cookies de marketing/publicidade. */
  marketing: boolean
  /** Data ISO em que o consentimento foi registrado. */
  timestamp: string
}

/**
 * Store de consentimento de cookies.
 * Cobre LGPD (BR), GDPR (UE), CCPA (EUA-CA) e POPIA (ZA):
 * - Opt-in explícito e granular (GDPR/LGPD/POPIA)
 * - Opção de recusar/opt-out (CCPA)
 * - Estado padrão "negado" até decisão do usuário (Consent Mode v2)
 */
export const useConsentStore = defineStore('consent', () => {
  const analytics = ref(false)
  const marketing = ref(false)
  const decided = ref(false)

  /** Sincroniza o Google Consent Mode v2 com o estado atual. */
  function syncGtag() {
    window.gtag?.('consent', 'update', {
      analytics_storage: analytics.value ? 'granted' : 'denied',
      ad_storage: marketing.value ? 'granted' : 'denied',
      ad_user_data: marketing.value ? 'granted' : 'denied',
      ad_personalization: marketing.value ? 'granted' : 'denied',
    })
  }

  function persist() {
    const state: ConsentState = {
      necessary: true,
      analytics: analytics.value,
      marketing: marketing.value,
      timestamp: new Date().toISOString(),
    }
    Cookies.set(COOKIE_KEY, JSON.stringify(state), {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:',
    })
    decided.value = true
    syncGtag()
  }

  function acceptAll() {
    analytics.value = true
    marketing.value = true
    persist()
  }

  function rejectAll() {
    analytics.value = false
    marketing.value = false
    persist()
  }

  function savePreferences(prefs: { analytics: boolean; marketing: boolean }) {
    analytics.value = prefs.analytics
    marketing.value = prefs.marketing
    persist()
  }

  /** Reabre o gerenciador (usado pelo link no rodapé). */
  function reopen() {
    decided.value = false
  }

  function init() {
    const raw = Cookies.get(COOKIE_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as Partial<ConsentState>
      analytics.value = Boolean(parsed.analytics)
      marketing.value = Boolean(parsed.marketing)
      decided.value = true
      syncGtag()
    } catch {
      Cookies.remove(COOKIE_KEY)
    }
  }

  return { analytics, marketing, decided, acceptAll, rejectAll, savePreferences, reopen, init }
})
