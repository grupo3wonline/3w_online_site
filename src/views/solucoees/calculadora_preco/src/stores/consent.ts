import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { grantAnalyticsConsent, denyAnalyticsConsent } from '@/lib/analytics'

export type ConsentStatus = 'accepted' | 'declined' | null

/**
 * Consentimento de cookies conforme LGPD/GDPR/CCPA/POPIA.
 * Controla o carregamento dos scripts de analytics (consent mode).
 */
export const useConsentStore = defineStore('consent', () => {
  const status = useStorage<ConsentStatus>('cookieConsent', null)
  const decidedAt = useStorage<string | null>('cookieConsentDate', null)

  const hasDecided = computed(() => status.value !== null)
  const analyticsAllowed = computed(() => status.value === 'accepted')

  function accept() {
    status.value = 'accepted'
    decidedAt.value = new Date().toISOString()
    grantAnalyticsConsent()
  }

  function decline() {
    status.value = 'declined'
    decidedAt.value = new Date().toISOString()
    denyAnalyticsConsent()
  }

  /** Reaplica o estado de consentimento salvo (chamado no bootstrap). */
  function syncConsent() {
    if (status.value === 'accepted') grantAnalyticsConsent()
    else denyAnalyticsConsent()
  }

  return { status, decidedAt, hasDecided, analyticsAllowed, accept, decline, syncConsent }
})
