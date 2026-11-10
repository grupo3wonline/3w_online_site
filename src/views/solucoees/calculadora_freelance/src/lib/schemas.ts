import { z } from 'zod'

/** Coerção segura de string de input numérico para número. */
const numericField = (label: string, min = 0) =>
  z.coerce
    .number({ invalid_type_error: `Informe um número válido em "${label}".` })
    .refine((v) => !Number.isNaN(v), `Informe um número válido em "${label}".`)
    .refine((v) => v >= min, `"${label}" deve ser maior ou igual a ${min}.`)

const percentField = (label: string) =>
  numericField(label, 0).refine((v) => v <= 100, `"${label}" não pode exceder 100%.`)

export const hourlyRateSchema = z.object({
  monthlyGoal: numericField('Receita mensal', 1),
  dailyHours: numericField('Horas por dia', 1).refine(
    (v) => v <= 24,
    'Horas por dia não pode exceder 24.'
  ),
  workDays: numericField('Dias por semana', 1).refine(
    (v) => v <= 7,
    'Dias por semana não pode exceder 7.'
  ),
  vacationDays: numericField('Dias de férias', 0),
  profitMargin: numericField('Margem de lucro', 0),
  taxRate: percentField('Impostos'),
  platformFee: percentField('Taxa de plataforma'),
})

export const projectSchema = z.object({
  projectHours: numericField('Horas do projeto', 1),
  hourlyRate: numericField('Valor por hora', 1),
  complexity: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Selecione a complexidade do projeto.' }),
  }),
  discount: percentField('Desconto'),
})

export const deadlineSchema = z.object({
  totalHours: numericField('Total de horas', 1),
  dailyAvailability: numericField('Horas por dia', 1),
})

export type HourlyRateForm = z.infer<typeof hourlyRateSchema>
export type ProjectForm = z.infer<typeof projectSchema>
export type DeadlineForm = z.infer<typeof deadlineSchema>
