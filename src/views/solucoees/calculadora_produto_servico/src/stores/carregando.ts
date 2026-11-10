import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Store de carregamento global. Controla o overlay ofuscado exibido
 * enquanto operações estão em processamento em qualquer página.
 */
export const useCarregandoStore = defineStore('carregando', () => {
  const ativo = ref(false)
  const mensagem = ref('Processando...')
  let contador = 0

  function mostrar(msg = 'Processando...') {
    contador++
    mensagem.value = msg
    ativo.value = true
  }

  function esconder() {
    contador = Math.max(0, contador - 1)
    if (contador === 0) ativo.value = false
  }

  /** Executa uma ação assíncrona exibindo o overlay durante o processamento. */
  async function comCarregamento<T>(acao: () => Promise<T> | T, msg?: string): Promise<T> {
    mostrar(msg)
    try {
      return await acao()
    } finally {
      esconder()
    }
  }

  return { ativo, mensagem, mostrar, esconder, comCarregamento }
})
