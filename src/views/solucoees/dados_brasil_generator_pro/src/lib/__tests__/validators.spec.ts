import { describe, it, expect } from 'vitest'
import {
  validateCPF,
  validateCNPJ,
  validateCreditCard,
  validateEmail,
  validatePIS,
  validateRenavam,
  validateCertidao,
  validateContaBancaria,
} from '../validators'

describe('validateCPF', () => {
  it('aceita CPFs válidos conhecidos', () => {
    expect(validateCPF('529.982.247-25')).toBe(true)
    expect(validateCPF('52998224725')).toBe(true)
  })
  it('rejeita CPFs inválidos', () => {
    expect(validateCPF('111.111.111-11')).toBe(false)
    expect(validateCPF('123.456.789-00')).toBe(false)
    expect(validateCPF('123')).toBe(false)
    expect(validateCPF('')).toBe(false)
  })
})

describe('validateCNPJ', () => {
  it('aceita CNPJs válidos conhecidos', () => {
    expect(validateCNPJ('11.222.333/0001-81')).toBe(true)
  })
  it('rejeita CNPJs inválidos', () => {
    expect(validateCNPJ('11.111.111/1111-11')).toBe(false)
    expect(validateCNPJ('00.000.000/0000-00')).toBe(false)
    expect(validateCNPJ('123')).toBe(false)
  })
})

describe('validateCreditCard (Luhn)', () => {
  it('aceita números válidos pelo Luhn', () => {
    expect(validateCreditCard('4111 1111 1111 1111')).toBe(true)
    expect(validateCreditCard('5500005555555559')).toBe(true)
  })
  it('rejeita números inválidos', () => {
    expect(validateCreditCard('1234 5678 9012 3456')).toBe(false)
    expect(validateCreditCard('4111')).toBe(false)
  })
})

describe('validateEmail', () => {
  it('aceita e-mails válidos', () => {
    expect(validateEmail('contato@3wonline.com.br')).toBe(true)
    expect(validateEmail('user.name+tag@dominio.io')).toBe(true)
  })
  it('rejeita e-mails inválidos', () => {
    expect(validateEmail('sem-arroba.com')).toBe(false)
    expect(validateEmail('a@b')).toBe(false)
    expect(validateEmail('')).toBe(false)
  })
})

describe('validatePIS', () => {
  it('rejeita tamanho incorreto', () => {
    expect(validatePIS('123')).toBe(false)
  })
})

describe('validateRenavam', () => {
  it('rejeita tamanho incorreto', () => {
    expect(validateRenavam('123')).toBe(false)
  })
})

describe('validateCertidao', () => {
  it('aceita exatamente 32 dígitos', () => {
    expect(validateCertidao('1'.repeat(32))).toBe(true)
    expect(validateCertidao('1'.repeat(31))).toBe(false)
  })
})

describe('validateContaBancaria', () => {
  it('exige agência e conta com dígitos', () => {
    expect(validateContaBancaria('1234', '56789-0')).toBe(true)
    expect(validateContaBancaria('', '')).toBe(false)
  })
})
