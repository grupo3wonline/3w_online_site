/**
 * Configuração do vue-i18n. Aplicação 100% pt-BR, com estrutura pronta
 * para novos idiomas no futuro.
 */
import { createI18n } from 'vue-i18n'
import ptBR from './locales/pt-BR'

export type MessageSchema = typeof ptBR

export const i18n = createI18n<[MessageSchema], 'pt-BR'>({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  globalInjection: true,
  messages: {
    'pt-BR': ptBR
  }
})
