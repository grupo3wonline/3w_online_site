import { z } from 'zod'

/**
 * Schemas de validação com Zod.
 * Centralizam as regras de negócio de entrada, separando validação
 * da apresentação (Clean Code / responsabilidade única).
 */

const positiveMoney = z
  .number({ invalid_type_error: 'Informe um número válido' })
  .positive('O valor deve ser maior que zero')
  .max(1_000_000_000, 'Valor acima do máximo permitido')

const positiveArea = z
  .number({ invalid_type_error: 'Informe um número válido' })
  .positive('A área deve ser maior que zero')
  .max(100_000, 'Área acima do máximo permitido')

/** Validação mínima da Calculadora de Aluguel */
export const rentInputSchema = z.object({
  propertyValue: positiveMoney,
  propertySize: positiveArea,
  propertyType: z.string().min(1, 'Selecione o tipo de imóvel'),
  location: z.string().min(1, 'Selecione a localização'),
  condition: z.string().min(1, 'Selecione a conservação'),
  furnished: z.string().min(1, 'Selecione a mobília')
})

/** Validação mínima da Calculadora de Financiamento */
export const financingInputSchema = z.object({
  propertyValue: positiveMoney,
  downPayment: z.number().min(0, 'A entrada não pode ser negativa'),
  interestRate: z.number().positive('A taxa deve ser maior que zero').max(100, 'Taxa inválida'),
  termYears: z.number().int().positive('O prazo deve ser maior que zero').max(50, 'Prazo máximo de 50 anos')
})

/** Validação mínima do Comparador Comprar vs Alugar */
export const comparisonInputSchema = z.object({
  propertyValue: positiveMoney,
  monthlyRent: positiveMoney,
  downPayment: z.number().min(0, 'A entrada não pode ser negativa'),
  years: z.number().int().positive().max(50)
})

export type RentInput = z.infer<typeof rentInputSchema>
export type FinancingInput = z.infer<typeof financingInputSchema>
export type ComparisonInput = z.infer<typeof comparisonInputSchema>
