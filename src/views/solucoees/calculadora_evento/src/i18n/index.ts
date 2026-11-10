import { createI18n } from 'vue-i18n'
import ptBR from './pt-BR'

/**
 * Instância do vue-i18n com pt-BR como locale padrão e de fallback.
 * Usa a Composition API (legacy: false). Novos idiomas podem ser
 * adicionados em `messages` sem tocar nos componentes.
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
