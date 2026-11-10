import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loadAnalytics } from '@/lib/analytics'

const STORAGE_KEY = 'privacy_consent'
const DATE_KEY = 'privacy_consent_date'

type ConsentValue = 'accepted' | 'rejected' | null

function readStored(): ConsentValue {
  try {
    return (localStorage.getItem(STORAGE_KEY) as ConsentValue) ?? null
  } catch {
    return null
  }
}

/**
 * Gerencia o consentimento de privacidade. Analytics só carrega após "accepted".
 */
export const useConsentStore = defineStore('consent', () => {
  const status = ref<ConsentValue>(readStored())
  const decided = ref(status.value !== null)

  function persist(value: Exclude<ConsentValue, null>) {
    status.value = value
    decided.value = true
    try {
      localStorage.setItem(STORAGE_KEY, value)
      localStorage.setItem(DATE_KEY, new Date().toISOString())
    } catch {
      /* localStorage indisponível */
    }
  }

  function accept() {
    persist('accepted')
    loadAnalytics()
  }

  function reject() {
    persist('rejected')
  }

  /** Chamado no boot: se já havia aceite salvo, recarrega o analytics. */
  function init() {
    if (status.value === 'accepted') loadAnalytics()
  }

  return { status, decided, accept, reject, init }
})
