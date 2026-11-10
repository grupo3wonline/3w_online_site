import { describe, it, expect } from 'vitest'
import {
  formatNumber,
  formatArea,
  formatVolume,
  formatLength,
  formatPower,
  formatPhone,
  truncateText,
  capitalize,
  pluralize,
} from './formatters'

describe('formatters', () => {
  it('formatNumber trata nulos/NaN', () => {
    expect(formatNumber(null)).toBe('0')
    expect(formatNumber(undefined)).toBe('0')
    expect(formatNumber(Number.NaN)).toBe('0')
    expect(formatNumber(3.14159, 2)).toBe('3.14')
  })

  it('formata unidades de domínio', () => {
    expect(formatArea(12.5)).toBe('12.50 m²')
    expect(formatVolume(30)).toBe('30.00 m³')
    expect(formatLength(4.25)).toBe('4.3 m')
  })

  it('formatPower converte para kVA acima de 1000', () => {
    expect(formatPower(500)).toBe('500 VA')
    expect(formatPower(2500)).toBe('2.50 kVA')
  })

  it('formatPhone formata número brasileiro', () => {
    expect(formatPhone('41996924829')).toBe('(41) 99692-4829')
  })

  it('utilitários de texto', () => {
    expect(truncateText('abcdef', 3)).toBe('abc...')
    expect(capitalize('teste')).toBe('Teste')
    expect(pluralize(1, 'ponto', 'pontos')).toBe('ponto')
    expect(pluralize(2, 'ponto', 'pontos')).toBe('pontos')
  })
})
