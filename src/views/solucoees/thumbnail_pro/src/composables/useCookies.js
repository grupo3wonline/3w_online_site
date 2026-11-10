/**
 * Composable de Cookies
 * Gerenciamento de cookies com conformidade LGPD
 */

import { ref, computed } from 'vue'

// Estado global de consentimento de cookies
const cookieConsent = ref({
  necessary: true, // Sempre true (cookies essenciais)
  analytics: false,
  marketing: false,
  preferences: false,
  hasConsented: false,
  consentDate: null
})

// Carrega consentimento salvo
const loadConsent = () => {
  try {
    const saved = localStorage.getItem('cookie_consent')
    if (saved) {
      const parsed = JSON.parse(saved)
      cookieConsent.value = { ...cookieConsent.value, ...parsed }
    }
  } catch (error) {
    console.error('Erro ao carregar consentimento:', error)
  }
}

// Carrega ao iniciar
loadConsent()

export function useCookies() {
  /**
   * Define o consentimento de cookies
   * @param {object} consent - Objeto com preferências de cookies
   */
  const setConsent = (consent) => {
    cookieConsent.value = {
      necessary: true, // Sempre necessário
      analytics: consent.analytics || false,
      marketing: consent.marketing || false,
      preferences: consent.preferences || false,
      hasConsented: true,
      consentDate: new Date().toISOString()
    }
    
    // Salva no localStorage
    try {
      localStorage.setItem('cookie_consent', JSON.stringify(cookieConsent.value))
    } catch (error) {
      console.error('Erro ao salvar consentimento:', error)
    }
    
    // Aplica configurações de analytics se permitido
    applyAnalyticsConsent()
  }

  /**
   * Aceita todos os cookies
   */
  const acceptAll = () => {
    setConsent({
      analytics: true,
      marketing: true,
      preferences: true
    })
  }

  /**
   * Aceita apenas cookies necessários
   */
  const acceptNecessaryOnly = () => {
    setConsent({
      analytics: false,
      marketing: false,
      preferences: false
    })
  }

  /**
   * Revoga consentimento
   */
  const revokeConsent = () => {
    cookieConsent.value = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      hasConsented: false,
      consentDate: null
    }
    
    try {
      localStorage.removeItem('cookie_consent')
    } catch (error) {
      console.error('Erro ao remover consentimento:', error)
    }
    
    // Remove cookies de analytics se existirem
    removeAnalyticsCookies()
  }

  /**
   * Aplica configurações de analytics baseado no consentimento
   */
  const applyAnalyticsConsent = () => {
    if (cookieConsent.value.analytics) {
      // Ativa Google Analytics se permitido
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        })
      }
    } else {
      // Desativa analytics
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'denied'
        })
      }
      removeAnalyticsCookies()
    }
  }

  /**
   * Remove cookies de analytics
   */
  const removeAnalyticsCookies = () => {
    const analyticsCookies = ['_ga', '_gid', '_gat', '_gat_gtag']
    
    analyticsCookies.forEach(cookieName => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`
    })
  }

  /**
   * Verifica se o usuário já consentiu
   */
  const hasConsented = computed(() => cookieConsent.value.hasConsented)

  /**
   * Verifica se analytics está permitido
   */
  const analyticsEnabled = computed(() => cookieConsent.value.analytics)

  /**
   * Verifica se marketing está permitido
   */
  const marketingEnabled = computed(() => cookieConsent.value.marketing)

  /**
   * Verifica se preferências está permitido
   */
  const preferencesEnabled = computed(() => cookieConsent.value.preferences)

  /**
   * Retorna estado completo do consentimento
   */
  const consent = computed(() => cookieConsent.value)

  /**
   * Define um cookie com segurança
   * @param {string} name - Nome do cookie
   * @param {string} value - Valor
   * @param {number} days - Dias para expirar
   */
  const setCookie = (name, value, days = 365) => {
    try {
      const expires = new Date()
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
      
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`
    } catch (error) {
      console.error('Erro ao definir cookie:', error)
    }
  }

  /**
   * Obtém valor de um cookie
   * @param {string} name - Nome do cookie
   * @returns {string|null} - Valor do cookie ou null
   */
  const getCookie = (name) => {
    try {
      const nameEQ = name + '='
      const ca = document.cookie.split(';')
      
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length))
        }
      }
      return null
    } catch (error) {
      console.error('Erro ao obter cookie:', error)
      return null
    }
  }

  /**
   * Remove um cookie
   * @param {string} name - Nome do cookie
   */
  const deleteCookie = (name) => {
    try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    } catch (error) {
      console.error('Erro ao remover cookie:', error)
    }
  }

  return {
    consent,
    hasConsented,
    analyticsEnabled,
    marketingEnabled,
    preferencesEnabled,
    setConsent,
    acceptAll,
    acceptNecessaryOnly,
    revokeConsent,
    setCookie,
    getCookie,
    deleteCookie
  }
}

export default useCookies
