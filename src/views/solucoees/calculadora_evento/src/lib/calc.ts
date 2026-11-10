import { z } from 'zod'
import { formatCurrency } from './utils'

/**
 * Constantes de regra de negócio do EventCalc.
 * - Alimentação: R$ 42,83 por pessoa/refeição, 2 refeições/dia (RN-001)
 * - Reserva de emergência: 11% sobre o subtotal (RN-002)
 */
export const MEAL_COST = 42.83
export const MEALS_PER_DAY = 2
export const RESERVE_RATE = 0.11

/**
 * Schema de validação dos dados do evento.
 * Todos os valores numéricos ≥ 0; dias e parcelas ≥ 1;
 * pagantes não podem exceder o total de participantes (RN-004, RN-005).
 */
export const eventSchema = z
  .object({
    vlr_diaria: z.number({ invalid_type_error: 'Informe um valor válido.' }).min(0, 'O valor não pode ser negativo.'),
    duracao_dias: z.number({ invalid_type_error: 'Informe um valor válido.' }).int('Use um número inteiro de dias.').min(1, 'A duração deve ser de pelo menos 1 dia.'),
    qtd_pessoas: z.number({ invalid_type_error: 'Informe um valor válido.' }).int('Use um número inteiro de pessoas.').min(1, 'Deve haver ao menos 1 participante.'),
    qtd_pagante: z.number({ invalid_type_error: 'Informe um valor válido.' }).int('Use um número inteiro de pagantes.').min(1, 'Deve haver ao menos 1 pagante.'),
    outras_despesas: z.number({ invalid_type_error: 'Informe um valor válido.' }).min(0, 'O valor não pode ser negativo.'),
    n_vezes: z.number({ invalid_type_error: 'Informe um valor válido.' }).int('Use um número inteiro de parcelas.').min(1, 'O número de parcelas deve ser ao menos 1.'),
  })
  .refine((d) => d.qtd_pagante <= d.qtd_pessoas, {
    message: 'Os pagantes não podem ser mais que os participantes.',
    path: ['qtd_pagante'],
  })

export type EventInput = z.infer<typeof eventSchema>

export interface EventResult {
  participantes: number
  dias: number
  valor_diaria: number
  total_estadia: number
  total_alimentacao: number
  valor_reserva: number
  gastos_adicionais: number
  total_geral: number
  pagantes: number
  parcelas: number
  valor_parcela: number
}

/**
 * Calcula o custo total do evento e a divisão entre pagantes.
 * Função pura — sem efeitos colaterais, fácil de testar.
 */
export function calculateEvent(input: EventInput): EventResult {
  const { vlr_diaria, qtd_pessoas, qtd_pagante, duracao_dias, outras_despesas, n_vezes } = input

  const total_estadia = vlr_diaria * duracao_dias
  const total_alimentacao = qtd_pessoas * MEAL_COST * duracao_dias * MEALS_PER_DAY
  const subtotal = total_estadia + total_alimentacao + outras_despesas
  const valor_reserva = subtotal * RESERVE_RATE
  const total_geral = subtotal + valor_reserva
  // Valor por parcela arredondado para cima (RN-003)
  const valor_parcela = Math.ceil(total_geral / qtd_pagante / n_vezes)

  return {
    participantes: qtd_pessoas,
    dias: duracao_dias,
    valor_diaria: vlr_diaria,
    total_estadia,
    total_alimentacao,
    valor_reserva,
    gastos_adicionais: outras_despesas,
    total_geral,
    pagantes: qtd_pagante,
    parcelas: n_vezes,
    valor_parcela,
  }
}

/**
 * Gera um resumo em texto (pt-BR) do resultado, pronto para copiar/compartilhar.
 * Função pura — não depende de DOM nem de clipboard.
 */
export function formatResultSummary(r: EventResult): string {
  return [
    'Orçamento do Evento — EventCalc',
    '',
    `Participantes: ${r.participantes}`,
    `Duração: ${r.dias} dia(s)`,
    `Valor da diária: ${formatCurrency(r.valor_diaria)}`,
    `Total estadia: ${formatCurrency(r.total_estadia)}`,
    `Total alimentação: ${formatCurrency(r.total_alimentacao)}`,
    `Gastos adicionais: ${formatCurrency(r.gastos_adicionais)}`,
    `Reserva de emergência (11%): ${formatCurrency(r.valor_reserva)}`,
    `Total geral: ${formatCurrency(r.total_geral)}`,
    '',
    `Pagantes: ${r.pagantes}`,
    `Parcelas: ${r.parcelas}x`,
    `Valor por parcela/pessoa: ${formatCurrency(r.valor_parcela)}`,
    '',
    'Calculado em app.3wonline.com/calculadora_evento',
  ].join('\n')
}
