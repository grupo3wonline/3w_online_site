import { beforeEach, describe, expect, it } from 'vitest'
import { useCalculator, generateBudgetNumber } from './useCalculator'
import { formatCurrency } from '@/lib/format'

// Limpa o rascunho persistido para isolar cada teste
beforeEach(() => {
  localStorage.clear()
})

describe('useCalculator', () => {
  it('inicia sem serviços selecionados e total zero', () => {
    const calc = useCalculator()
    expect(calc.hasSelection.value).toBe(false)
    expect(calc.total.value).toBe(0)
  })

  it('calcula o subtotal e total dos serviços habilitados', () => {
    const calc = useCalculator()
    calc.services.value[0].enabled = true // 800 x 1
    calc.services.value[2].enabled = true // 80 x 1
    expect(calc.hasSelection.value).toBe(true)
    expect(calc.subtotal.value).toBe(880)
    expect(calc.total.value).toBe(880)
  })

  it('multiplica preço pela quantidade', () => {
    const calc = useCalculator()
    calc.services.value[0].enabled = true
    calc.updateService(0, 'quantity', 3)
    expect(calc.total.value).toBe(2400)
  })

  it('impede quantidade menor que 1 (safeNumber)', () => {
    const calc = useCalculator()
    calc.updateService(0, 'quantity', 0)
    expect(calc.services.value[0].quantity).toBe(1)
  })

  it('impede preço negativo', () => {
    const calc = useCalculator()
    calc.updateService(0, 'price', -100)
    expect(calc.services.value[0].price).toBe(0)
  })

  it('aplica desconto percentual', () => {
    const calc = useCalculator()
    calc.services.value[0].enabled = true // 800
    calc.discountType.value = 'percent'
    calc.discountValue.value = 10
    expect(calc.discountAmount.value).toBe(80)
    expect(calc.total.value).toBe(720)
  })

  it('limita desconto percentual a 100%', () => {
    const calc = useCalculator()
    calc.services.value[0].enabled = true // 800
    calc.discountType.value = 'percent'
    calc.discountValue.value = 150
    expect(calc.total.value).toBe(0)
  })

  it('aplica desconto fixo sem ultrapassar o subtotal', () => {
    const calc = useCalculator()
    calc.services.value[2].enabled = true // 80
    calc.discountType.value = 'fixed'
    calc.discountValue.value = 200
    expect(calc.discountAmount.value).toBe(80)
    expect(calc.total.value).toBe(0)
  })

  it('valida e-mail inválido do cliente', () => {
    const calc = useCalculator()
    calc.client.clientEmail = 'nao-eh-email'
    const result = calc.validateClient()
    expect(result.success).toBe(false)
  })

  it('aceita dados válidos e sanitiza nome', () => {
    const calc = useCalculator()
    calc.client.clientName = '<b>Cliente</b> Teste'
    calc.client.clientEmail = 'cliente@teste.com'
    const result = calc.validateClient()
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.clientName).toBe('Cliente Teste')
    }
  })

  it('adiciona serviço personalizado com categoria e soma no total', () => {
    const calc = useCalculator()
    const ok = calc.addCustomService('Consultoria extra', 500, 'Consultoria')
    expect(ok).toBe(true)
    expect(calc.hasSelection.value).toBe(true)
    expect(calc.total.value).toBe(500)
    expect(calc.services.value[calc.services.value.length - 1].category).toBe('Consultoria')
  })

  it('não adiciona serviço com nome vazio', () => {
    const calc = useCalculator()
    const before = calc.services.value.length
    expect(calc.addCustomService('   ', 100)).toBe(false)
    expect(calc.services.value.length).toBe(before)
  })

  it('sanitiza nome do serviço personalizado (mitiga XSS)', () => {
    const calc = useCalculator()
    calc.addCustomService('<img src=x>Extra', 100)
    const last = calc.services.value[calc.services.value.length - 1]
    expect(last.name).toBe('Extra')
  })

  it('agrupa serviços habilitados por categoria', () => {
    const calc = useCalculator()
    calc.services.value[0].enabled = true // Gestão
    calc.services.value[2].enabled = true // Conteúdo
    const groups = calc.groupedEnabled.value
    expect(groups.get('Gestão')?.length).toBe(1)
    expect(groups.get('Conteúdo')?.length).toBe(1)
  })

  it('remove serviço pelo índice', () => {
    const calc = useCalculator()
    const before = calc.services.value.length
    calc.removeService(0)
    expect(calc.services.value.length).toBe(before - 1)
  })

  it('reset restaura catálogo padrão e limpa cliente e desconto', () => {
    const calc = useCalculator()
    calc.services.value[0].enabled = true
    calc.client.clientName = 'Fulano'
    calc.discountValue.value = 50
    calc.reset()
    expect(calc.hasSelection.value).toBe(false)
    expect(calc.client.clientName).toBe('')
    expect(calc.discountValue.value).toBe(0)
    expect(calc.services.value.length).toBe(10)
  })

  it('gera resumo em texto com total', () => {
    const calc = useCalculator()
    calc.services.value[0].enabled = true // 800
    const summary = calc.textSummary(formatCurrency)
    expect(summary).toContain('Orçamento nº')
    expect(summary).toContain('Total:')
  })

  it('gera número de orçamento no formato AAAAMMDD-XXXX', () => {
    const n = generateBudgetNumber(new Date('2026-09-24T10:00:00'))
    expect(n).toMatch(/^20260924-\d{4}$/)
  })
})
