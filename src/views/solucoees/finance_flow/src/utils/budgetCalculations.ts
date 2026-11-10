export interface BudgetBreakdown {
  salario_base_informado: string;
  sugentao_divisao: {
    plano_aposentadoria: string;
    reserva_emergencia: string;
    educacao_profissional: string;
    sonhos_aspiracoes: string;
    gastos_essenciais: string;
    gastos_extras: string;
  };
  rendimento_salarial: {
    hora: string;
    dia: string;
    semana: string;
    mes: string;
    trimestre: string;
    semestre: string;
    ano: string;
  };
}

export interface BudgetMethod {
  titulo: string;
  [key: string]: string;
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const calculateOrcamentoPessoal = (budget: number): BudgetBreakdown => {
  return {
    salario_base_informado: formatCurrency(budget),
    sugentao_divisao: {
      plano_aposentadoria: formatCurrency(budget * 0.05),
      reserva_emergencia: formatCurrency(budget * 0.05),
      educacao_profissional: formatCurrency(budget * 0.15),
      sonhos_aspiracoes: formatCurrency(budget * 0.15),
      gastos_essenciais: formatCurrency(budget * 0.5),
      gastos_extras: formatCurrency(budget * 0.1),
    },
    rendimento_salarial: {
      hora: formatCurrency(budget / 900),
      dia: formatCurrency(budget / 30),
      semana: formatCurrency(budget / 4),
      mes: formatCurrency(budget),
      trimestre: formatCurrency(budget * 3),
      semestre: formatCurrency(budget * 6),
      ano: formatCurrency(budget * 12),
    },
  };
};

export interface FamilyBudgetBreakdown {
  salario_base_informado: string;
  sugentao_divisao: {
    alimentacao: string;
    poupanca: string;
    contas: string;
    transporte: string;
    outros_gastos: string;
  };
}

export const calculateOrcamentoFamiliar = (budget: number): FamilyBudgetBreakdown => {
  return {
    salario_base_informado: formatCurrency(budget),
    sugentao_divisao: {
      alimentacao: formatCurrency(budget * 0.25),
      poupanca: formatCurrency(budget * 0.10),
      contas: formatCurrency(budget * 0.35),
      transporte: formatCurrency(budget * 0.20),
      outros_gastos: formatCurrency(budget * 0.10),
    },
  };
};

export const getBudgetMethods = (salary: number): BudgetMethod[] => {
  return [
    {
      titulo: 'Divisão Padrão Convencional',
      salarioBase: formatCurrency(salary),
      planoAposentadoria: formatCurrency(salary * 0.11),
      reservaEmergencia: formatCurrency(salary * 0.09),
      educacaoProfissional: formatCurrency(salary * 0.16),
      gastosEssenciais: formatCurrency(salary * 0.60),
      gastosExtras: formatCurrency(salary * 0.04),
    },
    {
      titulo: 'Método 50-15-35',
      despesasFixas: formatCurrency(salary * 0.5),
      saudeFinanceira: formatCurrency(salary * 0.15),
      gastosLivre: formatCurrency(salary * 0.35),
    },
    {
      titulo: 'Método 50-30-20',
      despesasRegulares: formatCurrency(salary * 0.5),
      gastosEventuais: formatCurrency(salary * 0.3),
      poupancaInvestimento: formatCurrency(salary * 0.2),
    },
    {
      titulo: 'Método 70-20-10',
      despesasRegulares: formatCurrency(salary * 0.7),
      dividas: formatCurrency(salary * 0.2),
      investimentos: formatCurrency(salary * 0.1),
    },
    {
      titulo: 'Método 60-10-10-20',
      despesasRegulares: formatCurrency(salary * 0.6),
      investimentosCurtoPrazo: formatCurrency(salary * 0.1),
      investimentosLongoPrazo: formatCurrency(salary * 0.1),
      gastosLivre: formatCurrency(salary * 0.2),
    },
    {
      titulo: 'Método 50-10-10-10-10-10',
      despesasRegulares: formatCurrency(salary * 0.5),
      doacao: formatCurrency(salary * 0.1),
      diversao: formatCurrency(salary * 0.1),
      saudeFinanceira: formatCurrency(salary * 0.1),
      poupanca: formatCurrency(salary * 0.1),
      investimento: formatCurrency(salary * 0.1),
    },
    {
      titulo: 'Método 55-10-10-10-10-5',
      despesasRegulares: formatCurrency(salary * 0.55),
      lazer: formatCurrency(salary * 0.1),
      reservaFinanceira: formatCurrency(salary * 0.1),
      desenvolvimentoPessoal: formatCurrency(salary * 0.1),
      previdenciaAposentadoria: formatCurrency(salary * 0.1),
      doacao: formatCurrency(salary * 0.05),
    },
  ];
};