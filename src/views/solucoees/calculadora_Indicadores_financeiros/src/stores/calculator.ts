import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  calculateIndicators,
  financialInputsSchema,
  type FinancialInputs,
  type IndicatorResult,
} from '@/lib/calculator'

/**
 * Estado dos resultados do cálculo. Os dados de entrada vivem no formulário;
 * aqui guardamos apenas os resultados processados.
 */
export const useCalculatorStore = defineStore('calculator', () => {
  const results = ref<IndicatorResult[]>([])
  const calculatedAt = ref<Date | null>(null)
  const hasResults = computed(() => results.value.length > 0)

  /**
   * Valida (Zod) e calcula. Retorna erro estruturado quando inválido.
   */
  function compute(inputs: FinancialInputs): { ok: boolean; error?: string } {
    const parsed = financialInputsSchema.safeParse(inputs)
    if (!parsed.success) {
      return { ok: false, error: parsed.error.issues[0]?.message ?? 'Dados inválidos' }
    }
    results.value = calculateIndicators(parsed.data)
    calculatedAt.value = new Date()
    return { ok: true }
  }

  function reset() {
    results.value = []
    calculatedAt.value = null
  }

  return { results, calculatedAt, hasResults, compute, reset }
})
