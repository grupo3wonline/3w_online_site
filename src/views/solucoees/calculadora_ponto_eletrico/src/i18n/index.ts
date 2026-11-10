import { createI18n } from 'vue-i18n'
import ptBR from './locales/pt-BR'

export const DEFAULT_LOCALE = 'pt-BR'

const messages = {
  'pt-BR': ptBR,
}

export type MessageSchema = typeof ptBR

export const i18n = createI18n<[MessageSchema], 'pt-BR'>({
  legacy: false,
  globalInjection: true,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})

export default i18n
