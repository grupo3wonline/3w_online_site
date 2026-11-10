import { describe, it, expect } from 'vitest'
import { parseNumber, formatBRL, cn } from './utils'

describe('parseNumber', () => {
  it('converte string pt-BR com vírgula', () => {
    expect(parseNumber('1.234,56')).toBe(1234.56)
  })
  it('converte string simples', () => {
    expect(parseNumber('100')).toBe(100)
  })
  it('remove R$ e espaços', () => {
    expect(parseNumber('R$ 50,00')).toBe(50)
  })
  it('retorna 0 para vazio', () => {
    expect(parseNumber('')).toBe(0)
  })
  it('mantém number', () => {
    expect(parseNumber(42)).toBe(42)
  })
})

describe('formatBRL', () => {
  it('formata como moeda BRL', () => {
    const s = formatBRL(1234.5)
    expect(s).toContain('1.234,50')
    expect(s).toContain('R$')
  })
  it('trata valores não finitos como 0', () => {
    expect(formatBRL(Number.NaN)).toContain('0,00')
  })
})

describe('cn', () => {
  it('mescla classes e resolve conflitos do tailwind', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})
