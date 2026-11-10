import { defineStore } from 'pinia'
import { ref } from 'vue'

/** Store de estado de carregamento global (overlay ofuscado). */
export const useLoadingStore = defineStore('loading', () => {
  const ativo = ref(false)
  const mensagem = ref('Processando...')

  function iniciar(msg = 'Processando...') {
    mensagem.value = msg
    ativo.value = true
  }

  function parar() {
    ativo.value = false
  }

  /** Executa uma ação assíncrona exibindo o overlay durante a execução. */
  async function comLoading<T>(fn: () => Promise<T> | T, msg?: string): Promise<T> {
    iniciar(msg)
    try {
      return await fn()
    } finally {
      parar()
    }
  }

  return { ativo, mensagem, iniciar, parar, comLoading }
})
