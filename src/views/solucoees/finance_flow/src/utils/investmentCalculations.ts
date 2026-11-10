export interface InvestmentData {
  montanteInicial: number;
  tempoInvestimento: number;
  aporteMensal: number;
  jurosAnuais: number;
  jurosMensais: number;
}

export interface InvestmentResult {
  valorInvestido: string;
  montanteAcumulado: string;
  lucroObtido: string;
  rendimentoMensal: string;
  rendimentoAnual: string;
  percentualLucro: string;
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const calculateInvestment = (data: InvestmentData): InvestmentResult => {
  const { montanteInicial, tempoInvestimento, aporteMensal, jurosAnuais, jurosMensais } = data;
  
  const jurosMensaisDecimal = jurosMensais / 100;
  const jurosAnuaisDecimal = jurosAnuais / 100;
  const tempoInvestimentoMeses = tempoInvestimento * 12;

  let montanteAtual = montanteInicial;
  let montanteInvestido = montanteInicial;
  let lucroTotal = 0;

  for (let i = 1; i <= tempoInvestimentoMeses; i++) {
    const jurosAcumulados = (montanteAtual + aporteMensal) * jurosMensaisDecimal;
    const jurosAnuaisAcumulados = (montanteAtual + aporteMensal) * jurosAnuaisDecimal / 12;

    montanteAtual += aporteMensal + jurosAcumulados;
    montanteInvestido += aporteMensal;
    lucroTotal += jurosAcumulados + jurosAnuaisAcumulados;
  }

  const percentualLucro = montanteInvestido > 0 ? lucroTotal / montanteInvestido : 0;
  const rendimentoMensal = lucroTotal / tempoInvestimentoMeses;
  const rendimentoAnual = rendimentoMensal * 12;

  return {
    valorInvestido: formatCurrency(montanteInvestido),
    montanteAcumulado: formatCurrency(montanteAtual),
    lucroObtido: formatCurrency(lucroTotal),
    rendimentoMensal: formatCurrency(rendimentoMensal),
    rendimentoAnual: formatCurrency(rendimentoAnual),
    percentualLucro: formatPercentage(percentualLucro),
  };
};