import { z } from 'zod'
import type { CalculoInput, CalculoResultado } from '@/types'

/** Schema de validação dos parâmetros do cálculo (Zod) */
export const calculoSchema = z.object({
  lanceLongo: z.number({ invalid_type_error: 'Informe um número válido.' }).positive(),
  lanceCurto: z.number({ invalid_type_error: 'Informe um número válido.' }).positive(),
  numeroPontos: z.number({ invalid_type_error: 'Informe um número válido.' }).int().positive(),
  peDireito: z.number({ invalid_type_error: 'Informe um número válido.' }).positive(),
})

/** Arredonda para no máximo 2 casas decimais, evitando ruído de ponto flutuante. */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

/**
 * Calcula a metragem de cabos a partir dos parâmetros da instalação.
 * Função pura — não depende de estado externo, facilitando testes.
 */
export function calcularMetragem(input: CalculoInput): CalculoResultado {
  const { lanceLongo, lanceCurto, numeroPontos, peDireito } = input

  const maiorDistancia = Math.max(lanceLongo, lanceCurto)
  const menorDistancia = Math.min(lanceLongo, lanceCurto)
  const alturaMaxima = peDireito * numeroPontos
  const metragemMinima = menorDistancia * numeroPontos
  const metragemMaxima = maiorDistancia * numeroPontos

  return {
    maiorDistancia: round2(maiorDistancia),
    menorDistancia: round2(menorDistancia),
    alturaMaxima: round2(alturaMaxima),
    quantidadePontos: numeroPontos,
    metragemMinima: round2(metragemMinima),
    metragemMaxima: round2(metragemMaxima),
  }
}

/**
 * Valida os campos e retorna a lista de chaves de erro (para i18n).
 * Retorna [] quando todos os campos são válidos.
 */
export function validarCampos(input: CalculoInput): Array<keyof CalculoInput> {
  const erros: Array<keyof CalculoInput> = []
  if (!(input.lanceLongo > 0)) erros.push('lanceLongo')
  if (!(input.lanceCurto > 0)) erros.push('lanceCurto')
  if (!(input.numeroPontos > 0)) erros.push('numeroPontos')
  if (!(input.peDireito > 0)) erros.push('peDireito')
  return erros
}
