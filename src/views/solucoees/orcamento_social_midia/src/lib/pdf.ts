import jsPDF from 'jspdf'
import type { ServiceItem } from '@/composables/useCalculator'
import { formatCurrency } from '@/lib/format'
import { sanitizeText } from '@/lib/security'
import { company } from '@/config/site'

export interface BudgetInput {
  budgetNumber: string
  clientName: string
  clientEmail: string
  observations: string
  providerName: string
  providerContact: string
  validityDays: number
  services: ServiceItem[]
  subtotal: number
  discountAmount: number
  total: number
}

const PURPLE: [number, number, number] = [124, 58, 237]
const GRAY: [number, number, number] = [90, 90, 90]

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR')
}

/**
 * Gera o PDF do orçamento a partir de dados já validados/sanitizados.
 * Isolado da UI para facilitar testes e reuso (SRP).
 */
export function generateBudgetPdf(input: BudgetInput): void {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const left = 20
  let y = 22

  const now = new Date()
  const validUntil = new Date(now)
  validUntil.setDate(validUntil.getDate() + (input.validityDays || 15))

  // ---- Cabeçalho ----
  doc.setFillColor(...PURPLE)
  doc.rect(0, 0, pageWidth, 4, 'F')

  doc.setFontSize(20)
  doc.setTextColor(...PURPLE)
  doc.text('ORÇAMENTO - SOCIAL MÍDIA', left, y)

  doc.setFontSize(10)
  doc.setTextColor(...GRAY)
  y += 8
  doc.text(`Nº ${input.budgetNumber}`, left, y)
  doc.text(`Emissão: ${formatDate(now)}`, pageWidth - left, y, { align: 'right' })
  y += 6
  doc.text(`Válido até: ${formatDate(validUntil)} (${input.validityDays} dias)`, left, y)

  // ---- Prestador ----
  const provider = sanitizeText(input.providerName, 120)
  const providerContact = sanitizeText(input.providerContact, 120)
  if (provider || providerContact) {
    y += 12
    doc.setFontSize(11)
    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'bold')
    doc.text('DE (Prestador)', left, y)
    doc.setFont('helvetica', 'normal')
    y += 6
    if (provider) {
      doc.text(provider, left, y)
      y += 6
    }
    if (providerContact) {
      doc.text(providerContact, left, y)
      y += 6
    }
  }

  // ---- Cliente ----
  const name = sanitizeText(input.clientName, 120)
  const email = sanitizeText(input.clientEmail, 254)
  if (name || email) {
    y += 6
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('PARA (Cliente)', left, y)
    doc.setFont('helvetica', 'normal')
    y += 6
    if (name) {
      doc.text(name, left, y)
      y += 6
    }
    if (email) {
      doc.text(email, left, y)
      y += 6
    }
  }

  // ---- Serviços agrupados por categoria ----
  y += 8
  doc.setFontSize(12)
  doc.setTextColor(...PURPLE)
  doc.setFont('helvetica', 'bold')
  doc.text('SERVIÇOS', left, y)
  doc.setFont('helvetica', 'normal')
  y += 4
  doc.setDrawColor(220, 220, 220)
  doc.line(left, y, pageWidth - left, y)
  y += 8

  const enabled = input.services.filter((s) => s.enabled)
  const categories = [...new Set(enabled.map((s) => s.category))]

  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)

  for (const category of categories) {
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...PURPLE)
    doc.text(category, left, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)
    y += 7

    for (const s of enabled.filter((i) => i.category === category)) {
      doc.text(`• ${sanitizeText(s.name, 160)}`, left + 4, y)
      y += 6
      doc.setTextColor(...GRAY)
      doc.text(
        `Qtd: ${s.quantity}  |  Unit.: ${formatCurrency(s.price)}  |  Subtotal: ${formatCurrency(
          s.price * s.quantity,
        )}`,
        left + 8,
        y,
      )
      doc.setTextColor(0, 0, 0)
      y += 9
      if (y > 250) {
        doc.addPage()
        y = 24
      }
    }
    y += 2
  }

  // ---- Totais ----
  y += 4
  doc.setDrawColor(220, 220, 220)
  doc.line(pageWidth / 2, y, pageWidth - left, y)
  y += 8

  const totalsX = pageWidth / 2
  doc.setFontSize(11)
  doc.setTextColor(0, 0, 0)
  doc.text('Subtotal:', totalsX, y)
  doc.text(formatCurrency(input.subtotal), pageWidth - left, y, { align: 'right' })
  y += 7

  if (input.discountAmount > 0) {
    doc.setTextColor(200, 60, 60)
    doc.text('Desconto:', totalsX, y)
    doc.text(`- ${formatCurrency(input.discountAmount)}`, pageWidth - left, y, { align: 'right' })
    doc.setTextColor(0, 0, 0)
    y += 7
  }

  doc.setFontSize(14)
  doc.setTextColor(...PURPLE)
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL:', totalsX, y)
  doc.text(formatCurrency(input.total), pageWidth - left, y, { align: 'right' })
  doc.setFont('helvetica', 'normal')

  // ---- Observações ----
  const obs = sanitizeText(input.observations, 1000)
  if (obs) {
    y += 16
    if (y > 250) {
      doc.addPage()
      y = 24
    }
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'bold')
    doc.text('OBSERVAÇÕES', left, y)
    doc.setFont('helvetica', 'normal')
    y += 7
    doc.text(doc.splitTextToSize(obs, pageWidth - 2 * left), left, y)
  }

  // ---- Rodapé ----
  doc.setFontSize(8)
  doc.setTextColor(...GRAY)
  doc.text(`Orçamento gerado por ${company.name} - www.3wonline.com.br`, pageWidth / 2, 289, {
    align: 'center',
  })

  const safeFile = name ? name.replace(/[^a-zA-Z0-9-_]/g, '_') : 'cliente'
  doc.save(`orcamento-${input.budgetNumber}-${safeFile}.pdf`)
}
