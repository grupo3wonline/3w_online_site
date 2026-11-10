import { ref, computed } from 'vue'

export interface ConsentPreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const CONSENT_KEY = 'srt-converter-consent'

export function useConsent() {
  const showBanner = ref(false)
  const consentPreferences = ref<ConsentPreferences | null>(null)

  /**
   * Load consent preferences from localStorage
   */
  const loadConsent = () => {
    try {
      const item = window.localStorage.getItem(CONSENT_KEY)
      if (item) {
        const stored = JSON.parse(item) as ConsentPreferences
        consentPreferences.value = stored
        showBanner.value = false
        applyConsent(stored)
        return stored
      }
      showBanner.value = true
      return null
    } catch (error) {
      console.error('Error loading consent preferences:', error)
      showBanner.value = true
      return null
    }
  }

  /**
   * Save consent preferences
   */
  const saveConsent = (preferences: Omit<ConsentPreferences, 'timestamp'>) => {
    const consent: ConsentPreferences = {
      ...preferences,
      timestamp: Date.now(),
    }
    consentPreferences.value = consent
    
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
    } catch (error) {
      console.error('Error saving consent preferences:', error)
    }
    
    showBanner.value = false
    
    // Apply consent preferences
    applyConsent(consent)
  }

  /**
   * Accept all cookies
   */
  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    })
  }

  /**
   * Accept only necessary cookies
   */
  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    })
  }

  /**
   * Reject all non-necessary cookies
   */
  const rejectAll = () => {
    acceptNecessary()
  }

  /**
   * Apply consent preferences (enable/disable tracking)
   */
  const applyConsent = (consent: ConsentPreferences) => {
    // Disable analytics if not consented
    if (!consent.analytics) {
      // Disable analytics tracking
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
        })
      }
    } else if (window.gtag) {
      // Enable analytics tracking
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }

    // Disable marketing cookies if not consented
    if (!consent.marketing && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
    }
  }

  /**
   * Clear all consent preferences
   */
  const clearConsent = () => {
    try {
      window.localStorage.removeItem(CONSENT_KEY)
    } catch (error) {
      console.error('Error clearing consent preferences:', error)
    }
    consentPreferences.value = null
    showBanner.value = true
  }

  /**
   * Check if user has given consent
   */
  const hasConsent = computed(() => consentPreferences.value !== null)

  /**
   * Check if analytics is enabled
   */
  const analyticsEnabled = computed(() => consentPreferences.value?.analytics ?? false)

  /**
   * Check if marketing is enabled
   */
  const marketingEnabled = computed(() => consentPreferences.value?.marketing ?? false)

  return {
    showBanner,
    consentPreferences,
    hasConsent,
    analyticsEnabled,
    marketingEnabled,
    loadConsent,
    saveConsent,
    acceptAll,
    acceptNecessary,
    rejectAll,
    clearConsent,
  }
}

// Extend window for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
