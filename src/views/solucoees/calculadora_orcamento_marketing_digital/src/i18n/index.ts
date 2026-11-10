import { createI18n } from 'vue-i18n'
import ptBR from './pt-BR'

/**
 * Configuração de i18n. A aplicação é 100% pt-BR por padrão;
 * a estrutura fica pronta para novos idiomas quando necessário.
 */
export const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
  },
})

export default i18n
