import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

export type ConsentValue = 'accepted' | 'rejected' | null

/**
 * Consentimento de cookies/analytics conforme LGPD, GDPR, CCPA e POPIA.
 * Enquanto o usuário não decide, o analytics permanece com consentimento negado.
 */
export const useConsentStore = defineStore('consent', () => {
  const status = useStorage<ConsentValue>('dtse-consent', null)
  const decided = computed(() => status.value !== null)

  function updateGtagConsent(granted: boolean) {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    if (typeof w.gtag === 'function') {
      w.gtag('consent', 'update', {
        ad_storage: granted ? 'granted' : 'denied',
        analytics_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
      })
    }
  }

  function accept() {
    status.value = 'accepted'
    updateGtagConsent(true)
  }

  function reject() {
    status.value = 'rejected'
    updateGtagConsent(false)
  }

  return { status, decided, accept, reject }
})
