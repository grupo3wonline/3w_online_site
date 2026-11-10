import { createI18n } from 'vue-i18n'
import ptBR from './locales/pt-BR'

/**
 * Configuração de internacionalização.
 * O idioma padrão e de fallback é pt-BR, conforme requisito do projeto.
 * A estrutura permite adicionar novos idiomas futuramente sem refatoração.
 */
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  // Evita XSS: escapa parâmetros HTML em interpolações
  warnHtmlMessage: true,
  messages: {
    'pt-BR': ptBR
  }
})

export default i18n
