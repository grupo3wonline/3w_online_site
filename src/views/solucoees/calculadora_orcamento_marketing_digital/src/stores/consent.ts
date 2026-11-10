import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ConsentLevel = 'all' | 'essential' | null

/**
 * Store de consentimento de cookies (LGPD/GDPR/CCPA/POPIA).
 * Controla o carregamento de analytics conforme a escolha do usuário.
 */
export const useConsentStore = defineStore('consent', () => {
  const level = ref<ConsentLevel>(null)
  const decidedAt = ref<string | null>(null)

  function init() {
    const saved = localStorage.getItem('cookieConsent') as ConsentLevel
    level.value = saved ?? null
    decidedAt.value = localStorage.getItem('cookieConsentDate')
    if (level.value) applyGtagConsent(level.value)
  }

  function applyGtagConsent(next: Exclude<ConsentLevel, null>) {
    const granted = next === 'all'
    window.gtag?.('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
    })
  }

  function decide(next: Exclude<ConsentLevel, null>) {
    level.value = next
    decidedAt.value = new Date().toISOString()
    localStorage.setItem('cookieConsent', next)
    localStorage.setItem('cookieConsentDate', decidedAt.value)
    applyGtagConsent(next)
  }

  function reset() {
    level.value = null
    decidedAt.value = null
    localStorage.removeItem('cookieConsent')
    localStorage.removeItem('cookieConsentDate')
  }

  return { level, decidedAt, init, decide, reset }
})
