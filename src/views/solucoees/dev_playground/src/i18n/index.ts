import { createI18n } from 'vue-i18n'
import ptBR from './locales/pt-BR'

/**
 * i18n configurado com pt-BR como idioma padrão e de fallback.
 * A aplicação é entregue integralmente em português do Brasil.
 */
export const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  globalInjection: true,
  messages: {
    'pt-BR': ptBR,
  },
})

export default i18n
