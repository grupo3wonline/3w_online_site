import { z } from 'zod'

/**
 * Schema de validação da campanha.
 * Regras: todos os valores devem ser numéricos e maiores que zero.
 */
export const campaignSchema = z.object({
  followers: z
    .number({ invalid_type_error: 'Informe um número válido de seguidores.' })
    .positive('A quantidade de seguidores deve ser maior que zero.'),
  rateInCents: z
    .number({ invalid_type_error: 'Informe uma taxa válida.' })
    .positive('A taxa deve ser maior que zero.'),
  durationDays: z
    .number({ invalid_type_error: 'Informe uma duração válida.' })
    .positive('A duração deve ser de pelo menos 1 dia.'),
})

export type CampaignInput = z.infer<typeof campaignSchema>

/**
 * Calcula o orçamento estimado de uma campanha.
 * Fórmula: seguidores × (taxaEmCentavos ÷ 100) × duração (dias).
 */
export function calculateBudget(input: CampaignInput): number {
  const { followers, rateInCents, durationDays } = campaignSchema.parse(input)
  return followers * (rateInCents / 100) * durationDays
}

/** Converte um valor de input (string com vírgula, ou número) em número seguro. */
export function parseNumber(value: string | number | null | undefined): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (value == null) return 0
  const normalized = String(value).replace(/\s/g, '').replace(',', '.')
  const n = Number.parseFloat(normalized)
  return Number.isFinite(n) ? n : 0
}

/** Formata um valor numérico como moeda brasileira (R$). */
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/** Formata número inteiro no padrão pt-BR (separador de milhar). */
export function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR')
}
