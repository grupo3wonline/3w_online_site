import { z } from 'zod'
import { ELECTRICAL_CONSTANTS } from '@/utils/constants'

const { LIMITS } = ELECTRICAL_CONSTANTS

/** Schema de validação dos dados de entrada da calculadora. */
export const calculatorSchema = z.object({
  width: z
    .number({ invalid_type_error: 'Informe a largura em metros' })
    .positive('A largura deve ser positiva')
    .min(LIMITS.MIN_WIDTH, `A largura deve ser no mínimo ${LIMITS.MIN_WIDTH} m`)
    .max(LIMITS.MAX_WIDTH, `A largura deve ser no máximo ${LIMITS.MAX_WIDTH} m`),
  length: z
    .number({ invalid_type_error: 'Informe o comprimento em metros' })
    .positive('O comprimento deve ser positivo')
    .min(LIMITS.MIN_LENGTH, `O comprimento deve ser no mínimo ${LIMITS.MIN_LENGTH} m`)
    .max(LIMITS.MAX_LENGTH, `O comprimento deve ser no máximo ${LIMITS.MAX_LENGTH} m`),
  ceilingHeight: z
    .number({ invalid_type_error: 'Informe o pé-direito em metros' })
    .min(
      LIMITS.MIN_CEILING_HEIGHT,
      `O pé-direito deve ser no mínimo ${LIMITS.MIN_CEILING_HEIGHT} m`,
    )
    .max(
      LIMITS.MAX_CEILING_HEIGHT,
      `O pé-direito deve ser no máximo ${LIMITS.MAX_CEILING_HEIGHT} m`,
    ),
  roomType: z.enum(['LIVING', 'KITCHEN', 'BATHROOM', 'LAUNDRY', 'GARAGE', 'OFFICE'], {
    errorMap: () => ({ message: 'Selecione um tipo de ambiente válido' }),
  }),
})

export type CalculatorInput = z.infer<typeof calculatorSchema>
