import { ref, readonly } from 'vue';

const CONSENT_KEY = 'lgpd_consent';
const CONSENT_VERSION = '1.0';

// Estado compartilhado entre todas as instâncias
const consentGiven = ref(false);
const consentDetails = ref({
  necessary: true, // Sempre true, não pode ser desabilitado
  analytics: false,
  marketing: false,
  preferences: false,
});
const showBanner = ref(false);

/**
 * Composable para gerenciar consentimento LGPD
 */
export function useConsent() {
  /**
   * Inicializa o estado do consentimento
   */
  const initialize = () => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        
        // Verifica se a versão do consentimento é atual
        if (data.version === CONSENT_VERSION) {
          consentGiven.value = data.given || false;
          consentDetails.value = {
            necessary: true,
            analytics: data.details?.analytics || false,
            marketing: data.details?.marketing || false,
            preferences: data.details?.preferences || false,
          };
          showBanner.value = !data.given;
        } else {
          // Versão diferente, solicita novo consentimento
          showBanner.value = true;
        }
      } else {
        // Primeira visita
        showBanner.value = true;
      }
    } catch (error) {
      console.error('Erro ao carregar consentimento:', error);
      showBanner.value = true;
    }
  };

  /**
   * Salva o consentimento
   */
  const saveConsent = (details) => {
    try {
      const data = {
        version: CONSENT_VERSION,
        given: true,
        timestamp: new Date().toISOString(),
        details: {
          necessary: true,
          analytics: details.analytics || false,
          marketing: details.marketing || false,
          preferences: details.preferences || false,
        },
      };

      localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
      
      consentGiven.value = true;
      consentDetails.value = data.details;
      showBanner.value = false;

      // Aplica as configurações de cookies
      applyCookieSettings(data.details);
    } catch (error) {
      console.error('Erro ao salvar consentimento:', error);
    }
  };

  /**
   * Aceita todos os cookies
   */
  const acceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  /**
   * Aceita apenas cookies necessários
   */
  const acceptNecessary = () => {
    saveConsent({
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  /**
   * Revoga o consentimento
   */
  const revokeConsent = () => {
    try {
      localStorage.removeItem(CONSENT_KEY);
      consentGiven.value = false;
      consentDetails.value = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
      };
      showBanner.value = true;
      
      // Remove cookies opcionais
      clearOptionalCookies();
    } catch (error) {
      console.error('Erro ao revogar consentimento:', error);
    }
  };

  /**
   * Aplica configurações de cookies
   */
  const applyCookieSettings = (details) => {
    // Aqui você pode integrar com ferramentas de analytics, etc.
    if (details.analytics) {
      // Inicializar Google Analytics, etc.
      console.log('Analytics habilitado');
    }

    if (details.marketing) {
      // Inicializar pixels de marketing
      console.log('Marketing habilitado');
    }

    if (details.preferences) {
      // Salvar preferências do usuário
      console.log('Preferências habilitadas');
    }
  };

  /**
   * Remove cookies opcionais
   */
  const clearOptionalCookies = () => {
    // Remove cookies de analytics, marketing, etc.
    // Mantém apenas cookies necessários
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
      const name = cookie.split('=')[0].trim();
      
      // Lista de cookies essenciais que não devem ser removidos
      const essentialCookies = [CONSENT_KEY, 'dark_mode'];
      
      if (!essentialCookies.includes(name)) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    }
  };

  /**
   * Verifica se um tipo específico de cookie está permitido
   */
  const canUseCookie = (type) => {
    if (type === 'necessary') return true;
    return consentDetails.value[type] || false;
  };

  /**
   * Mostra o banner novamente
   */
  const openBanner = () => {
    showBanner.value = true;
  };

  return {
    // Estado (readonly para evitar modificação direta)
    consentGiven: readonly(consentGiven),
    consentDetails: readonly(consentDetails),
    showBanner: readonly(showBanner),
    
    // Métodos
    initialize,
    saveConsent,
    acceptAll,
    acceptNecessary,
    revokeConsent,
    canUseCookie,
    openBanner,
  };
}
