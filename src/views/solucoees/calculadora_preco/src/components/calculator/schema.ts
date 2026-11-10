import { z } from 'zod'

const nonNegative = z
  .number({ invalid_type_error: 'Informe um número válido' })
  .min(0, 'O valor não pode ser negativo')

export const calculatorSchema = z
  .object({
    custoFixo: nonNegative,
    custoVariavel: nonNegative,
    margem: nonNegative.max(1000, 'Margem muito alta'),
    impostos: nonNegative.max(99.99, 'Impostos devem ser menores que 100%'),
  })
  .refine((data) => data.custoFixo > 0 || data.custoVariavel > 0, {
    message: 'Informe pelo menos um custo (fixo ou variável).',
    path: ['custoFixo'],
  })

export type CalculatorSchema = z.infer<typeof calculatorSchema>
