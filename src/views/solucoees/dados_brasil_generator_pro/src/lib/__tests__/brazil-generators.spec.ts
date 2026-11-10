import { describe, it, expect } from 'vitest'
import {
  generateCPF,
  generateCNPJ,
  generatePIS,
  generateRenavam,
  generateCreditCard,
  generateCEP,
  generatePlate,
} from '../brazil-generators'
import { validateCPF, validateCNPJ, validatePIS, validateRenavam, validateCreditCard } from '../validators'

describe('geradores produzem valores válidos', () => {
  it('generateCPF sempre gera CPF válido', () => {
    for (let i = 0; i < 200; i++) {
      expect(validateCPF(generateCPF())).toBe(true)
    }
  })

  it('generateCNPJ sempre gera CNPJ válido', () => {
    for (let i = 0; i < 200; i++) {
      expect(validateCNPJ(generateCNPJ())).toBe(true)
    }
  })

  it('generatePIS sempre gera PIS válido', () => {
    for (let i = 0; i < 100; i++) {
      expect(validatePIS(generatePIS())).toBe(true)
    }
  })

  it('generateRenavam sempre gera RENAVAM válido', () => {
    for (let i = 0; i < 100; i++) {
      expect(validateRenavam(generateRenavam())).toBe(true)
    }
  })

  it('generateCreditCard passa no Luhn para todas as bandeiras', () => {
    for (const brand of ['visa', 'mastercard', 'amex', 'elo']) {
      for (let i = 0; i < 50; i++) {
        expect(validateCreditCard(generateCreditCard(true, brand))).toBe(true)
      }
    }
  })
})

describe('formatação', () => {
  it('CPF formatado tem máscara e sem formatação só dígitos', () => {
    expect(generateCPF(true)).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    expect(generateCPF(false)).toMatch(/^\d{11}$/)
  })
  it('CEP formatado', () => {
    expect(generateCEP(true)).toMatch(/^\d{5}-\d{3}$/)
  })
  it('placa Mercosul e antiga', () => {
    expect(generatePlate(true)).toMatch(/^[A-Z]{3}\d[A-Z]\d{2}$/)
    expect(generatePlate(false)).toMatch(/^[A-Z]{3}-\d{4}$/)
  })
})
