import { formatCurrency } from './calculations'

export interface QuoteData {
  name: string
  description: string
  observations: string
  projectHours: string
  hourlyRate: number
  gross: number
  discountAmount: number
  estimatedDays: number
  deliveryDate: string
  total: number
  installments: number[]
}

/**
 * Monta o texto do orçamento em formato legível para copiar/compartilhar.
 */
export function buildQuoteText(q: QuoteData, company: string): string {
  const installmentsLine =
    q.installments.length > 1
      ? `Parcelamento: ${q.installments.length}x de ${formatCurrency(q.installments[0], true)}`
      : ''

  const lines = [
    `ORÇAMENTO — ${q.name}`,
    '',
    q.description ? `Descrição: ${q.description}` : '',
    '',
    `Horas estimadas: ${q.projectHours || '-'} h`,
    `Valor/hora: ${formatCurrency(q.hourlyRate)}`,
    q.discountAmount > 0 ? `Subtotal: ${formatCurrency(q.gross)}` : '',
    q.discountAmount > 0 ? `Desconto: -${formatCurrency(q.discountAmount)}` : '',
    `Valor total: ${formatCurrency(q.total)}`,
    installmentsLine,
    q.estimatedDays ? `Prazo estimado: ${q.estimatedDays} dias úteis` : '',
    q.deliveryDate ? `Entrega prevista: ${q.deliveryDate}` : '',
    '',
    q.observations ? `Observações: ${q.observations}` : '',
    '',
    `Emitido por ${company}`,
  ]
  return lines.filter((l) => l !== '').join('\n')
}
