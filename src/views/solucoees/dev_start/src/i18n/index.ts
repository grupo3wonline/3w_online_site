import { createI18n } from 'vue-i18n'
import ptBR from './locales/pt-BR'

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
