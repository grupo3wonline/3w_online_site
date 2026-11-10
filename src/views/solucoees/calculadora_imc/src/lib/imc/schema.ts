// Schema de validação dos dados do formulário (Zod).
import { z } from 'zod'

export const imcFormSchema = z.object({
  altura: z
    .number({ invalid_type_error: 'Informe a altura em metros' })
    .positive('A altura deve ser maior que zero')
    .min(0.5, 'Altura mínima de 0,5 m')
    .max(2.6, 'Altura máxima de 2,6 m'),
  peso: z
    .number({ invalid_type_error: 'Informe o peso em kg' })
    .positive('O peso deve ser maior que zero')
    .min(2, 'Peso mínimo de 2 kg')
    .max(500, 'Peso máximo de 500 kg'),
  idade: z
    .number({ invalid_type_error: 'Informe a idade' })
    .int('A idade deve ser um número inteiro')
    .min(1, 'Idade mínima de 1 ano')
    .max(120, 'Idade máxima de 120 anos'),
  sexo: z.enum(['male', 'female'], { required_error: 'Selecione o sexo' }),
  atividade: z
    .number({ invalid_type_error: 'Selecione o nível de atividade' })
    .min(1.2)
    .max(1.9),
})

export type ImcFormValues = z.infer<typeof imcFormSchema>
