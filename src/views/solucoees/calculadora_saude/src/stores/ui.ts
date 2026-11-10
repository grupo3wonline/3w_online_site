import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Estado de interface global: overlay de carregamento e modais de conteúdo legal.
 */
export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false);
  const loadingMessage = ref('Processando...');
  const showTermsModal = ref(false);
  const showPrivacyModal = ref(false);

  function startLoading(message = 'Processando...'): void {
    loadingMessage.value = message;
    isLoading.value = true;
  }

  function stopLoading(): void {
    isLoading.value = false;
  }

  function openTerms(): void {
    showTermsModal.value = true;
  }

  function closeTerms(): void {
    showTermsModal.value = false;
  }

  function openPrivacy(): void {
    showPrivacyModal.value = true;
  }

  function closePrivacy(): void {
    showPrivacyModal.value = false;
  }

  return {
    isLoading,
    loadingMessage,
    showTermsModal,
    showPrivacyModal,
    startLoading,
    stopLoading,
    openTerms,
    closeTerms,
    openPrivacy,
    closePrivacy,
  };
});
