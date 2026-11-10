import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Store de estado global de UI: overlay de carregamento ofuscado.
 */
export const useUiStore = defineStore("ui", () => {
  const isLoading = ref(false);
  const loadingMessage = ref("Carregando...");
  let pending = 0;

  function startLoading(message = "Carregando...") {
    pending += 1;
    loadingMessage.value = message;
    isLoading.value = true;
  }

  function stopLoading() {
    pending = Math.max(0, pending - 1);
    if (pending === 0) isLoading.value = false;
  }

  /** Executa uma acao assincrona exibindo o overlay ate finalizar. */
  async function withLoading<T>(fn: () => Promise<T>, message?: string): Promise<T> {
    startLoading(message);
    try {
      return await fn();
    } finally {
      stopLoading();
    }
  }

  return { isLoading, loadingMessage, startLoading, stopLoading, withLoading };
});
