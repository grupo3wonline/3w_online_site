/**
 * Catálogo de mensagens em Português (Brasil).
 * Locale único do produto. A estrutura está pronta para receber outros
 * idiomas no futuro sem alterar os componentes que consomem as chaves.
 */
export default {
  nav: {
    inicio: 'Início',
    calculadora: 'Calculadora',
    sobre: 'Sobre',
    contato: 'Contato',
    calcularAgora: 'Calcular Agora',
  },
  actions: {
    calcular: 'Calcular Custos',
    calculando: 'Calculando...',
    limpar: 'Limpar',
    recarregar: 'Recarregar Página',
    voltarInicio: 'Voltar ao Início',
  },
  calculator: {
    titulo: 'Dados do Evento',
    resultado: 'Resultado do Cálculo',
    aguardando: 'Aguardando Cálculo',
    totalGeral: 'Total Geral do Evento',
    valorParcela: 'Valor por Parcela/Pessoa',
    participantes: 'Participantes',
    dias: 'Dias',
    pagantes: 'Pagantes',
    parcelas: 'Parcelas',
  },
  consent: {
    titulo: 'Sua Privacidade é Importante',
    aceitarTodos: 'Aceitar Todos',
    rejeitar: 'Rejeitar',
    preferencias: 'Preferências',
    salvar: 'Salvar Preferências',
  },
  common: {
    gratuito: '100% Gratuito',
    semCadastro: 'Sem Cadastro',
  },
} as const
