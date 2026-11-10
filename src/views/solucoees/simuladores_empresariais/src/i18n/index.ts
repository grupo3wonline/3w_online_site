import { createI18n } from 'vue-i18n'

const ptBR = {
  common: {
    startNow: 'Começar Agora',
    free: '100% Gratuito',
    help: 'Ajuda',
    print: 'Imprimir',
    calculate: 'Calcular',
    contact: 'Fale Conosco',
    knowMore: 'Saiba Mais',
  },
  nav: {
    home: 'Início',
    tools: 'Ferramentas',
    about: 'Sobre',
    services: 'Serviços',
    contact: 'Contato',
  },
}

export type MessageSchema = typeof ptBR

const i18n = createI18n<[MessageSchema], 'pt-BR'>({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: { 'pt-BR': ptBR },
})

export default i18n
