import { createI18n } from 'vue-i18n'

/**
 * Configuração de i18n. A aplicação é pt-BR por padrão.
 * A estrutura permite adicionar outros idiomas facilmente no futuro.
 */
const messages = {
  'pt-BR': {
    common: {
      calculate: 'Calcular',
      clear: 'Limpar',
      export: 'Exportar Resultado',
      loading: 'Carregando...',
      backToTop: 'Voltar ao topo',
      toggleTheme: 'Alternar tema',
    },
    nav: {
      home: 'Início',
      tools: 'Ferramentas',
      contact: 'Contato',
    },
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages,
})
