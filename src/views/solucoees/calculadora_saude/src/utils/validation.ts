import { z } from 'zod';

/**
 * Schema de validação dos dados da calculadora.
 * Os limites replicam as regras originais e protegem contra entradas
 * fora de faixa fisiológica (defesa contra dados maliciosos/absurdos).
 */
export const userDataSchema = z.object({
  // coerce converte a string vinda do input em número antes de validar.
  height: z.coerce
    .number({ invalid_type_error: 'Informe sua altura em centímetros.' })
    .min(100, 'Altura deve estar entre 100 e 250 cm.')
    .max(250, 'Altura deve estar entre 100 e 250 cm.'),
  weight: z.coerce
    .number({ invalid_type_error: 'Informe seu peso em quilogramas.' })
    .min(30, 'Peso deve estar entre 30 e 300 kg.')
    .max(300, 'Peso deve estar entre 30 e 300 kg.'),
  age: z.coerce
    .number({ invalid_type_error: 'Informe sua idade em anos.' })
    .int('A idade deve ser um número inteiro.')
    .min(10, 'Idade deve estar entre 10 e 120 anos.')
    .max(120, 'Idade deve estar entre 10 e 120 anos.'),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Por favor, selecione seu sexo.' }),
  }),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very-active'], {
    errorMap: () => ({ message: 'Selecione seu nível de atividade física.' }),
  }),
  goal: z.enum(['lose', 'maintain', 'gain'], {
    errorMap: () => ({ message: 'Selecione seu objetivo.' }),
  }),
});

export type UserDataInput = z.infer<typeof userDataSchema>;

/**
 * Sanitização de texto para prevenção de XSS.
 * Remove tags e caracteres perigosos de qualquer string exibida.
 */
export const sanitizeText = (value: string): string => {
  return value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

/**
 * Garante que um valor numérico esteja dentro de limites seguros.
 */
export const clampNumber = (value: number, min: number, max: number): number => {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};
