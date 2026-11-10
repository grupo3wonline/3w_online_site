import { defineStore } from "pinia";
import { ref, computed } from "vue";

/**
 * Store de loading global. Suporta múltiplas requisições simultâneas
 * via contador, evitando que o overlay pisque entre operações.
 */
export const useLoadingStore = defineStore("loading", () => {
  const pending = ref(0);
  const message = ref("Processando...");

  const isLoading = computed(() => pending.value > 0);

  const start = (msg = "Processando...") => {
    message.value = msg;
    pending.value += 1;
  };

  const stop = () => {
    pending.value = Math.max(0, pending.value - 1);
  };

  /** Executa uma função assíncrona exibindo o overlay durante a execução. */
  const withLoading = async <T>(fn: () => Promise<T> | T, msg?: string): Promise<T> => {
    start(msg);
    try {
      return await fn();
    } finally {
      stop();
    }
  };

  return { pending, message, isLoading, start, stop, withLoading };
});
