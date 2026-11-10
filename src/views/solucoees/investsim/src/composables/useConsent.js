/**
 * Composable para gerenciar consentimento de cookies e dados (LGPD)
 * @module useConsent
 */

import { ref, computed } from 'vue'

const CONSENT_KEY = 'investsim_consent'
const CONSENT_VERSION = '1.0'

// Estado reativo compartilhado
const consentState = ref(null)
const showBanner = ref(false)

/**
 * Composable para gerenciar consentimento LGPD
 */
export function useConsent() {
  /**
   * Carrega o consentimento do localStorage
   */
  const loadConsent = () => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored) {
        const consent = JSON.parse(stored)
        // Verifica se a versão do consentimento é atual
        if (consent.version === CONSENT_VERSION) {
          consentState.value = consent
          showBanner.value = false
          return consent
        }
      }
      // Se não há consentimento ou versão desatualizada, mostra banner
      showBanner.value = true
      return null
    } catch (error) {
      console.error('Erro ao carregar consentimento:', error)
      showBanner.value = true
      return null
    }
  }

  /**
   * Salva o consentimento no localStorage
   */
  const saveConsent = (preferences) => {
    try {
      const consent = {
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        preferences: {
          essential: true, // Sempre true
          analytics: preferences.analytics || false,
          marketing: preferences.marketing || false,
        },
      }
      
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
      consentState.value = consent
      showBanner.value = false
      
      // Aplica as preferências
      applyConsentPreferences(consent.preferences)
      
      return consent
    } catch (error) {
      console.error('Erro ao salvar consentimento:', error)
      return null
    }
  }

  /**
   * Aceita todos os cookies
   */
  const acceptAll = () => {
    return saveConsent({
      analytics: true,
      marketing: true,
    })
  }

  /**
   * Aceita apenas cookies essenciais
   */
  const acceptEssentialOnly = () => {
    return saveConsent({
      analytics: false,
      marketing: false,
    })
  }

  /**
   * Aceita cookies personalizados
   */
  const acceptCustom = (preferences) => {
    return saveConsent(preferences)
  }

  /**
   * Revoga o consentimento
   */
  const revokeConsent = () => {
    try {
      localStorage.removeItem(CONSENT_KEY)
      consentState.value = null
      showBanner.value = true
      
      // Desabilita todos os cookies não essenciais
      disableNonEssentialCookies()
      
      return true
    } catch (error) {
      console.error('Erro ao revogar consentimento:', error)
      return false
    }
  }

  /**
   * Aplica as preferências de consentimento
   */
  const applyConsentPreferences = (preferences) => {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      if (preferences.analytics) {
        // Habilita Google Analytics
        gtag('consent', 'update', {
          analytics_storage: 'granted',
        })
      } else {
        // Desabilita Google Analytics
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        })
      }
    }

    // Outros cookies de marketing/publicidade podem ser configurados aqui
    if (!preferences.marketing) {
      // Remove cookies de marketing se existirem
      // Exemplo: removeCookie('_fbp'), removeCookie('_gcl_au'), etc.
    }
  }

  /**
   * Desabilita todos os cookies não essenciais
   */
  const disableNonEssentialCookies = () => {
    applyConsentPreferences({
      essential: true,
      analytics: false,
      marketing: false,
    })
  }

  /**
   * Verifica se há consentimento para um tipo específico
   */
  const hasConsent = (type = 'analytics') => {
    if (!consentState.value) {
      return false
    }
    return consentState.value.preferences[type] === true
  }

  /**
   * Obtém o timestamp do consentimento
   */
  const getConsentTimestamp = () => {
    return consentState.value?.timestamp || null
  }

  /**
   * Verifica se o banner deve ser exibido
   */
  const shouldShowBanner = computed(() => {
    return showBanner.value && !consentState.value
  })

  /**
   * Obtém as preferências atuais
   */
  const getCurrentPreferences = () => {
    return consentState.value?.preferences || null
  }

  /**
   * Verifica se existe consentimento salvo
   */
  const hasStoredConsent = () => {
    return consentState.value !== null
  }

  // Carrega o consentimento ao inicializar
  if (consentState.value === null && typeof window !== 'undefined') {
    loadConsent()
  }

  return {
    // Estado
    showBanner: shouldShowBanner,
    consentState,
    
    // Métodos
    loadConsent,
    saveConsent,
    acceptAll,
    acceptEssentialOnly,
    acceptCustom,
    revokeConsent,
    hasConsent,
    getConsentTimestamp,
    getCurrentPreferences,
    hasStoredConsent,
  }
}
