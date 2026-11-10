export interface CalculatorInput {
  custoFixo: number
  custoVariavel: number
  margem: number
  impostos: number
}

export interface CalculatorResult {
  custoTotal: number
  precoFinal: number
  lucroEstimado: number
  valorImpostos: number
}

/**
 * Lógica pura de precificação (testável isoladamente).
 * Fórmula: preço = (custoFixo + custoVariável) × (1 + margem/100) / (1 - impostos/100)
 */
export function calcularPreco(input: CalculatorInput): CalculatorResult {
  const custoFixo = Math.max(0, Number(input.custoFixo) || 0)
  const custoVariavel = Math.max(0, Number(input.custoVariavel) || 0)
  const margem = Math.max(0, Number(input.margem) || 0)
  const impostos = Math.min(99.99, Math.max(0, Number(input.impostos) || 0))

  const custoTotal = custoFixo + custoVariavel
  const precoComMargem = custoTotal * (1 + margem / 100)
  const precoFinal = precoComMargem / (1 - impostos / 100)
  const valorImpostos = precoFinal - precoComMargem
  const lucroEstimado = precoComMargem - custoTotal

  return {
    custoTotal: round(custoTotal),
    precoFinal: round(precoFinal),
    lucroEstimado: round(lucroEstimado),
    valorImpostos: round(valorImpostos),
  }
}

function round(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

/** true se houver ao menos um custo informado. */
export function hasCost(input: Pick<CalculatorInput, 'custoFixo' | 'custoVariavel'>): boolean {
  return (Number(input.custoFixo) || 0) > 0 || (Number(input.custoVariavel) || 0) > 0
}
