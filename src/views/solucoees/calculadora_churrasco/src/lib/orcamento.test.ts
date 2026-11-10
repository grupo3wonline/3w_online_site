import { describe, it, expect } from 'vitest'
import { ZodError } from 'zod'
import {
  subtotalItem,
  calcularTotal,
  calcularOrcamento,
  itemOrcamentoSchema,
  gerarResumoOrcamento,
  itemVazio,
  novoId,
  formatarBRL,
  type ItemOrcamento,
} from './orcamento'

const itens: ItemOrcamento[] = [
  { id: '1', nome: 'Picanha', quantidade: 3, valorUnitario: 50 },
  { id: '2', nome: 'Cerveja', quantidade: 24, valorUnitario: 4 },
  { id: '3', nome: 'Carvão', quantidade: 2, valorUnitario: 15 },
]

describe('subtotalItem', () => {
  it('multiplica quantidade por valor unitário', () => {
    expect(subtotalItem({ quantidade: 3, valorUnitario: 50 })).toBe(150)
  })

  it('trata valores inválidos como zero', () => {
    expect(subtotalItem({ quantidade: NaN, valorUnitario: 10 })).toBe(0)
    expect(subtotalItem({ quantidade: 5, valorUnitario: NaN })).toBe(0)
  })

  it('não retorna negativo', () => {
    expect(subtotalItem({ quantidade: -3, valorUnitario: 50 })).toBe(0)
  })
})

describe('calcularTotal', () => {
  it('soma os subtotais', () => {
    expect(calcularTotal(itens)).toBe(150 + 96 + 30)
  })

  it('lista vazia resulta em zero', () => {
    expect(calcularTotal([])).toBe(0)
  })
})

describe('calcularOrcamento (rateio)', () => {
  it('divide o total pelos participantes', () => {
    const r = calcularOrcamento(itens, 4)
    expect(r.total).toBe(276)
    expect(r.participantes).toBe(4)
    expect(r.porPessoa).toBe(69)
    expect(r.quantidadeItens).toBe(3)
  })

  it('trata participantes zero como 1 (evita divisão por zero)', () => {
    const r = calcularOrcamento(itens, 0)
    expect(r.participantes).toBe(1)
    expect(r.porPessoa).toBe(276)
  })

  it('trata participantes negativos como 1', () => {
    const r = calcularOrcamento(itens, -5)
    expect(r.participantes).toBe(1)
  })

  it('arredonda participantes fracionários para baixo', () => {
    const r = calcularOrcamento(itens, 4.9)
    expect(r.participantes).toBe(4)
  })
})

describe('itemOrcamentoSchema (validação)', () => {
  it('aceita item válido', () => {
    expect(() => itemOrcamentoSchema.parse(itens[0])).not.toThrow()
  })

  it('rejeita nome vazio', () => {
    expect(() => itemOrcamentoSchema.parse({ ...itens[0], nome: '' })).toThrow(ZodError)
  })

  it('rejeita quantidade zero ou negativa', () => {
    expect(() => itemOrcamentoSchema.parse({ ...itens[0], quantidade: 0 })).toThrow(ZodError)
  })

  it('rejeita valor negativo', () => {
    expect(() => itemOrcamentoSchema.parse({ ...itens[0], valorUnitario: -1 })).toThrow(ZodError)
  })
})

describe('helpers', () => {
  it('itemVazio cria item com id e valores padrão', () => {
    const item = itemVazio()
    expect(item.id).toBeTruthy()
    expect(item.quantidade).toBe(1)
    expect(item.valorUnitario).toBe(0)
  })

  it('novoId gera identificadores distintos', () => {
    expect(novoId()).not.toBe(novoId())
  })

  it('formatarBRL formata em reais', () => {
    expect(formatarBRL(69)).toContain('69,00')
    expect(formatarBRL(NaN)).toContain('0,00')
  })
})

describe('gerarResumoOrcamento', () => {
  it('inclui itens, total e valor por pessoa', () => {
    const texto = gerarResumoOrcamento(itens, 4)
    expect(texto).toContain('ORÇAMENTO DO CHURRASCO')
    expect(texto).toContain('Picanha')
    expect(texto).toContain('TOTAL')
    expect(texto).toContain('VALOR POR PESSOA')
  })

  it('lida com lista vazia', () => {
    const texto = gerarResumoOrcamento([], 2)
    expect(texto).toContain('(nenhum item)')
  })
})
