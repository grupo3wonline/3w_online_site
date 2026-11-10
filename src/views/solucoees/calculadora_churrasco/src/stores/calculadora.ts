import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { calcularChurrasco, type ChurrascoInput, type ResultadoChurrasco } from '@/lib/calculadora'

/**
 * Store do estado da calculadora.
 * Mantém o último resultado e o último input calculado (persistidos
 * localmente, sem servidor, respeitando a política privacy-first) e delega
 * o cálculo ao módulo puro `@/lib/calculadora`.
 */
export const useCalculadoraStore = defineStore('calculadora', () => {
  const serializer = {
    read: <T>(v: string): T | null => (v ? JSON.parse(v) : null),
    write: <T>(v: T): string => JSON.stringify(v),
  }

  // Persistência apenas no dispositivo do usuário (localStorage).
  const resultado = useStorage<ResultadoChurrasco | null>(
    'churrasco:ultimo-resultado',
    null,
    localStorage,
    { serializer },
  )

  const ultimoInput = useStorage<ChurrascoInput | null>(
    'churrasco:ultimo-input',
    null,
    localStorage,
    { serializer },
  )

  function calcular(input: ChurrascoInput): ResultadoChurrasco {
    ultimoInput.value = input
    resultado.value = calcularChurrasco(input)
    return resultado.value
  }

  function limpar(): void {
    resultado.value = null
    ultimoInput.value = null
  }

  return { resultado, ultimoInput, calcular, limpar }
})
