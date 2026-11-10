export const financingTypes: Record<string, any> = {
  sfh: { name: 'SFH (Sistema Financeiro da Habitação)', maxLTV: 80, maxTerm: 35 },
  sfi: { name: 'SFI (Sistema Financeiro Imobiliário)', maxLTV: 90, maxTerm: 35 },
  consorcio: { name: 'Consórcio Imobiliário', maxLTV: 100, maxTerm: 25 },
  direto_construtora: { name: 'Direto com Construtora', maxLTV: 95, maxTerm: 30 }
}

export const regionalFinancing: Record<string, any> = {
  sudeste: { name: 'Sudeste (SP, RJ, MG, ES)', defaultRate: 9.5, cartorioFee: 0.8, itbiRate: 2.0 },
  sul: { name: 'Sul (RS, SC, PR)', defaultRate: 9.8, cartorioFee: 0.7, itbiRate: 2.5 },
  centro_oeste: { name: 'Centro-Oeste (MT, MS, GO, DF)', defaultRate: 10.2, cartorioFee: 0.9, itbiRate: 2.0 },
  nordeste: { name: 'Nordeste', defaultRate: 10.5, cartorioFee: 0.6, itbiRate: 3.0 },
  norte: { name: 'Norte', defaultRate: 11.0, cartorioFee: 0.5, itbiRate: 2.5 }
}

export const propertyFinancing: Record<string, any> = {
  residencial_novo: { name: 'Residencial Novo', riskMultiplier: 1.0, maxLTV: 90 },
  residencial_usado: { name: 'Residencial Usado', riskMultiplier: 1.1, maxLTV: 80 },
  comercial: { name: 'Comercial', riskMultiplier: 1.3, maxLTV: 70 },
  terreno: { name: 'Terreno', riskMultiplier: 1.5, maxLTV: 50 },
  casa_campo: { name: 'Casa de Campo/Veraneio', riskMultiplier: 1.2, maxLTV: 70 }
}

export const insurance = {
  mip: { rate: 0.5, description: 'Seguro contra morte e invalidez permanente' },
  dfi: { rate: 0.25, description: 'Seguro contra danos físicos do imóvel' }
}

export const financingPhases = [
  { phase: 'Análise de Crédito', description: 'Avaliação da capacidade de pagamento', estimatedDays: 7, requirements: ['Documentos pessoais', 'Comprovantes de renda'] },
  { phase: 'Avaliação do Imóvel', description: 'Perícia técnica do imóvel', estimatedDays: 15, requirements: ['Documentação do imóvel', 'Matrícula atualizada'] },
  { phase: 'Aprovação Jurídica', description: 'Análise da documentação', estimatedDays: 10, requirements: ['Certidões negativas', 'Matrícula limpa'] },
  { phase: 'Assinatura do Contrato', description: 'Formalização do financiamento', estimatedDays: 5, requirements: ['Todas as aprovações', 'Seguro contratado'] },
  { phase: 'Registro em Cartório', description: 'Transferência da propriedade', estimatedDays: 20, requirements: ['Contrato assinado', 'ITBI pago'] },
  { phase: 'Liberação dos Recursos', description: 'Transferência do valor', estimatedDays: 3, requirements: ['Registro concluído', 'Apólice de seguro'] }
]
