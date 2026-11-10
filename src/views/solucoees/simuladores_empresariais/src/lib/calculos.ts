/**
 * Módulo puro de cálculos financeiros dos simuladores.
 * Sem dependências de UI — facilita testes unitários (Vitest) e reuso.
 * A lógica reproduz fielmente a versão original da aplicação.
 */

/* ============================ Orçamento Empresarial ============================ */

export type SetorEmpresarial = 'servicos' | 'comercio' | 'industria' | 'tecnologia' | 'consultoria'

export const setoresFatores: Record<
  SetorEmpresarial,
  { vendas: number; operacional: number; producao: number }
> = {
  servicos: { vendas: 0.35, operacional: 0.3, producao: 0.35 },
  comercio: { vendas: 0.28, operacional: 0.32, producao: 0.4 },
  industria: { vendas: 0.25, operacional: 0.25, producao: 0.5 },
  tecnologia: { vendas: 0.4, operacional: 0.35, producao: 0.25 },
  consultoria: { vendas: 0.45, operacional: 0.35, producao: 0.2 },
}

export interface EntradaEmpresarial {
  faturamento: number
  custoFixo: number
  custoVariavel: number
  setor: SetorEmpresarial
}

export interface ResultadoEmpresarial {
  faturamento: number
  divisao: { vendas: number; operacional: number; producao: number }
  margemBruta: number
  pontoEquilibrio: number
  lucratividade: number
  projecaoAnual: number
  eficienciaCustos: number
  reservaEmergencia: number
}

export function calcularOrcamentoEmpresarial(e: EntradaEmpresarial): ResultadoEmpresarial {
  const fatores = setoresFatores[e.setor]
  const vendas = e.faturamento * fatores.vendas
  const operacional = e.faturamento * fatores.operacional
  const producao = e.faturamento * fatores.producao

  const custoTotal = e.custoFixo + e.custoVariavel + operacional + producao
  const margemContribuicaoUnit = (e.faturamento - e.custoVariavel) / e.faturamento
  const margemBruta = margemContribuicaoUnit * 100
  // Se o custo variável consome todo o faturamento, o ponto de equilíbrio é
  // matematicamente indefinido (divisão por zero/negativo): retornamos Infinity
  // de forma controlada para a UI sinalizar em vez de exibir NaN.
  const pontoEquilibrio =
    margemContribuicaoUnit > 0 ? e.custoFixo / margemContribuicaoUnit : Infinity
  const lucratividade = ((e.faturamento - custoTotal) / e.faturamento) * 100
  const projecaoAnual = e.faturamento * 12
  const eficienciaCustos = (custoTotal / e.faturamento) * 100
  const reservaEmergencia = e.custoFixo * 6

  return {
    faturamento: e.faturamento,
    divisao: { vendas, operacional, producao },
    margemBruta,
    pontoEquilibrio,
    lucratividade,
    projecaoAnual,
    eficienciaCustos,
    reservaEmergencia,
  }
}

/* ============================ Orçamento de Marketing ============================ */

export type TipoNegocio = 'online' | 'servicos' | 'hibrido' | 'fisico'

export interface EntradaMarketing {
  faturamento: number
  tipo: TipoNegocio
  ticketMedio: number
  metaClientes: number
}

export interface ResultadoMarketing {
  tipo: TipoNegocio
  faturamento: number
  orcamento: { tecnologia: number; midia: number; total: number }
  metricas: {
    cac: number
    roas: number
    cpm: number
    ctr: number
    conversao: number
    ltv: number
    budgetSeo: number
    budgetPago: number
    budgetSocial: number
    budgetEmail: number
  }
}

export function calcularOrcamentoMarketing(e: EntradaMarketing): ResultadoMarketing {
  let percNegocio = 0.2
  let baseTec = 0.6
  let baseMidia = 0.4

  switch (e.tipo) {
    case 'online':
      percNegocio = 0.2
      baseTec = 0.3
      baseMidia = 0.7
      break
    case 'servicos':
      percNegocio = 0.17
      baseTec = 0.3
      baseMidia = 0.7
      break
    case 'hibrido':
      percNegocio = 0.15
      baseTec = 0.35
      baseMidia = 0.65
      break
    case 'fisico':
      percNegocio = 0.12
      baseTec = 0.6
      baseMidia = 0.4
      break
  }

  const orcamentoTotal = e.faturamento * percNegocio
  const tecnologia = orcamentoTotal * baseTec
  const midia = orcamentoTotal * baseMidia

  const ticket = e.ticketMedio || 100
  const meta = e.metaClientes || 50

  const cac = orcamentoTotal / meta
  const roas = ticket / cac
  const cpm = e.tipo === 'online' ? 15 : e.tipo === 'servicos' ? 25 : 35
  const ctr = e.tipo === 'online' ? 2.5 : e.tipo === 'servicos' ? 1.8 : 1.2
  const conversao = e.tipo === 'online' ? 3.5 : e.tipo === 'servicos' ? 5.2 : 2.8
  const ltv = ticket * (e.tipo === 'online' ? 3 : e.tipo === 'servicos' ? 5 : 2)

  const budgetSeo = tecnologia * 0.4
  const budgetPago = midia * 0.6
  const budgetSocial = midia * 0.25
  const budgetEmail = tecnologia * 0.2

  return {
    tipo: e.tipo,
    faturamento: e.faturamento,
    orcamento: { tecnologia, midia, total: orcamentoTotal },
    metricas: {
      cac,
      roas,
      cpm,
      ctr,
      conversao,
      ltv,
      budgetSeo,
      budgetPago,
      budgetSocial,
      budgetEmail,
    },
  }
}

/* ============================ Saúde da Empresa ============================ */

export interface DadosEmpresa {
  faturamento: number
  capital: number
  estoque: number
  custo: number
  ticket: number
  pedidos: number
  vendas: number
  clientes: number
  frequenciaCompra: number
  novosClientes: number
  retencao: number
  midia_impressa: number
  redes_sociais: number
  site_blog: number
  anuncios: number
  loja_virtual: number
  marketplace: number
  materia_prima: number
  fabricacao: number
  logistica: number
  maquinario: number
  mobiliario: number
  imoveis: number
  automoveis: number
  eletronicos: number
  equipamentosAdicionais: number
  folha_pagamento: number
  aluguel: number
  luz: number
  agua: number
  telefonia: number
  internet: number
  papelaria: number
  limpeza: number
  sistemas: number
  treinamento: number
  seguranca: number
  servicos: number
  despesaAdicionais: number
  custos_juridicos: number
  custos_contabeis: number
}

export interface ResultadoSaude {
  calc_patrimonio: number
  calc_orc_mkt: number
  calc_orc_vendas: number
  calc_orc_producao: number
  calc_orc_operacional: number
  calc_despesas: number
  calc_lucro: number
  calc_capital_gito: number
  calc_roi: { roi1: number; roi2: number }
  calc_cac: number
  calc_ltv: number
  calc_roe: number
  calc_ebitda: number
  calc_ebit: number
  calc_margem_ebitda: number
  calc_margem_ebit: number
  calc_margem_liquida: number
  calc_valuation_multiplo: number
  calc_valuation_dcf: number
  calc_debt_equity: number
  calc_current_ratio: number
  calc_quick_ratio: number
  calc_working_capital: number
  calc_asset_turnover: number
  calc_gross_margin: number
  calc_operating_margin: number
  calc_debt_service: number
  calc_interest_coverage: number
  calc_price_earnings: number
  calc_enterprise_value: number
  calc_book_value: number
  calc_market_cap: number
  calc_financial_leverage: number
}

export function calcularSaudeEmpresa(d: DadosEmpresa): ResultadoSaude {
  const calc_mediaVendasAno = d.vendas * 12
  const calc_patrimonio =
    d.maquinario +
    d.mobiliario +
    d.imoveis +
    d.automoveis +
    d.eletronicos +
    d.equipamentosAdicionais
  const calc_orc_mkt =
    d.midia_impressa + d.redes_sociais + d.site_blog + d.anuncios + d.loja_virtual + d.marketplace
  const calc_orc_vendas = d.vendas + calc_orc_mkt
  const calc_orc_producao = d.materia_prima + d.fabricacao + d.logistica
  const calc_orc_operacional =
    d.folha_pagamento +
    d.aluguel +
    d.luz +
    d.agua +
    d.telefonia +
    d.internet +
    d.papelaria +
    d.limpeza +
    d.sistemas +
    d.treinamento
  const calc_despesas =
    calc_orc_vendas +
    calc_orc_producao +
    calc_orc_operacional +
    d.seguranca +
    d.servicos +
    d.despesaAdicionais +
    d.custos_juridicos +
    d.custos_contabeis
  const calc_lucro = d.faturamento - calc_despesas
  const calc_capital_gito = d.capital + d.estoque + d.faturamento - calc_despesas

  const calc_roi = {
    roi1: (d.faturamento - calc_despesas) / calc_despesas,
    roi2: (d.faturamento / calc_despesas) * 100,
  }

  const calc_cac = (calc_orc_mkt + calc_orc_vendas) / (d.novosClientes || 1)
  const calc_ltv = d.ticket * calc_mediaVendasAno * (d.retencao / 100)
  const calc_roe = calc_lucro / (calc_patrimonio || 1)

  const depreciation = calc_patrimonio * 0.05
  const calc_ebitda = calc_lucro + depreciation
  const calc_ebit = calc_lucro
  const calc_margem_ebitda = (calc_ebitda / d.faturamento) * 100
  const calc_margem_ebit = (calc_ebit / d.faturamento) * 100
  const calc_margem_liquida = (calc_lucro / d.faturamento) * 100
  const calc_gross_margin = ((d.faturamento - calc_orc_producao) / d.faturamento) * 100
  const calc_operating_margin = (calc_ebit / d.faturamento) * 100

  const calc_valuation_multiplo = calc_ebitda * 8
  const free_cash_flow = calc_lucro + depreciation - calc_patrimonio * 0.1
  const calc_valuation_dcf = free_cash_flow * 10

  const current_assets = d.capital + d.estoque
  const current_liabilities = calc_orc_operacional || 1
  const calc_current_ratio = current_assets / current_liabilities
  const calc_quick_ratio = d.capital / current_liabilities
  const calc_working_capital = current_assets - current_liabilities
  const calc_asset_turnover = d.faturamento / (calc_patrimonio || 1)

  const total_debt = calc_orc_operacional * 3
  const calc_debt_equity = total_debt / (calc_patrimonio || 1)
  const calc_debt_service = total_debt * 0.12
  const calc_interest_coverage = calc_ebit / (total_debt * 0.1 || 1)

  const calc_market_cap = calc_valuation_multiplo
  const calc_enterprise_value = calc_market_cap + total_debt - d.capital
  const calc_book_value = calc_patrimonio
  const calc_price_earnings = calc_market_cap / (calc_lucro || 1)
  const calc_financial_leverage = calc_patrimonio / (calc_patrimonio - total_debt || 1)

  return {
    calc_patrimonio,
    calc_orc_mkt,
    calc_orc_vendas,
    calc_orc_producao,
    calc_orc_operacional,
    calc_despesas,
    calc_lucro,
    calc_capital_gito,
    calc_roi,
    calc_cac,
    calc_ltv,
    calc_roe,
    calc_ebitda,
    calc_ebit,
    calc_margem_ebitda,
    calc_margem_ebit,
    calc_margem_liquida,
    calc_valuation_multiplo,
    calc_valuation_dcf,
    calc_debt_equity,
    calc_current_ratio,
    calc_quick_ratio,
    calc_working_capital,
    calc_asset_turnover,
    calc_gross_margin,
    calc_operating_margin,
    calc_debt_service,
    calc_interest_coverage,
    calc_price_earnings,
    calc_enterprise_value,
    calc_book_value,
    calc_market_cap,
    calc_financial_leverage,
  }
}

/* ============================ Precificação / Markup ============================ */

export interface EntradaPrecificacao {
  /** Custo direto do produto/serviço (matéria-prima, aquisição). */
  custo: number
  /** Margem de lucro líquida desejada, em % sobre o preço de venda. */
  margemDesejada: number
  /** Impostos sobre a venda, em % (ex.: Simples, ICMS, ISS). */
  impostos: number
  /** Taxas de cartão/marketplace/gateway, em %. */
  taxas: number
  /** Custos operacionais rateados por unidade, em % sobre o preço. */
  despesasOperacionais: number
  /** Frete/embalagem por unidade, em valor absoluto (R$). */
  frete: number
}

export interface ResultadoPrecificacao {
  precoVenda: number
  markup: number
  lucroValor: number
  /** Composição do preço em valores absolutos. */
  composicao: {
    custo: number
    frete: number
    impostos: number
    taxas: number
    despesasOperacionais: number
    lucro: number
  }
  /** Percentual do preço que sobra como margem de contribuição. */
  margemContribuicao: number
  /** Indica se a soma dos percentuais é viável (< 100%). */
  viavel: boolean
}

/**
 * Precificação por markup divisor: preço = (custo + frete) / (1 - somaPercentuais).
 * Todos os percentuais incidem sobre o PREÇO DE VENDA (padrão de mercado),
 * o que evita o erro comum de "somar margem por cima do custo".
 */
export function calcularPrecificacao(e: EntradaPrecificacao): ResultadoPrecificacao {
  const somaPerc = (e.margemDesejada + e.impostos + e.taxas + e.despesasOperacionais) / 100

  const custoBase = e.custo + e.frete
  const viavel = somaPerc < 1

  // Se inviável (percentuais >= 100%), retorna preço 0 sinalizando o problema.
  const precoVenda = viavel ? custoBase / (1 - somaPerc) : 0

  const impostosValor = precoVenda * (e.impostos / 100)
  const taxasValor = precoVenda * (e.taxas / 100)
  const despesasValor = precoVenda * (e.despesasOperacionais / 100)
  const lucroValor = precoVenda * (e.margemDesejada / 100)

  const markup = e.custo > 0 && precoVenda > 0 ? precoVenda / e.custo : 0
  const margemContribuicao =
    precoVenda > 0 ? ((precoVenda - e.custo - e.frete - taxasValor) / precoVenda) * 100 : 0

  return {
    precoVenda,
    markup,
    lucroValor,
    composicao: {
      custo: e.custo,
      frete: e.frete,
      impostos: impostosValor,
      taxas: taxasValor,
      despesasOperacionais: despesasValor,
      lucro: lucroValor,
    },
    margemContribuicao,
    viavel,
  }
}

/* ============================ Diagnósticos automáticos ============================ */

export type NivelDiagnostico = 'positivo' | 'atencao' | 'critico'

export interface Diagnostico {
  nivel: NivelDiagnostico
  mensagem: string
}

/** Gera diagnósticos interpretativos para o orçamento empresarial. */
export function diagnosticarEmpresarial(r: ResultadoEmpresarial): Diagnostico[] {
  const out: Diagnostico[] = []
  if (r.margemBruta >= 40)
    out.push({ nivel: 'positivo', mensagem: 'Margem bruta saudável (≥ 40%).' })
  else if (r.margemBruta >= 20)
    out.push({
      nivel: 'atencao',
      mensagem: 'Margem bruta mediana — busque reduzir custos variáveis.',
    })
  else
    out.push({
      nivel: 'critico',
      mensagem: 'Margem bruta baixa (< 20%) — risco de sustentabilidade.',
    })

  if (r.lucratividade >= 15)
    out.push({ nivel: 'positivo', mensagem: 'Lucratividade excelente para reinvestimento.' })
  else if (r.lucratividade >= 5)
    out.push({ nivel: 'atencao', mensagem: 'Lucratividade apertada — monitore os custos fixos.' })
  else out.push({ nivel: 'critico', mensagem: 'Lucratividade insuficiente ou negativa.' })

  return out
}

/** Gera diagnósticos interpretativos para o orçamento de marketing. */
export function diagnosticarMarketing(r: ResultadoMarketing): Diagnostico[] {
  const out: Diagnostico[] = []
  const ratio = r.metricas.cac > 0 ? r.metricas.ltv / r.metricas.cac : 0
  if (ratio >= 3)
    out.push({
      nivel: 'positivo',
      mensagem: `LTV/CAC de ${ratio.toFixed(1)}:1 — aquisição eficiente.`,
    })
  else if (ratio >= 1)
    out.push({
      nivel: 'atencao',
      mensagem: `LTV/CAC de ${ratio.toFixed(1)}:1 — melhore retenção ou reduza o CAC.`,
    })
  else out.push({ nivel: 'critico', mensagem: 'CAC maior que o LTV — modelo insustentável.' })

  if (r.metricas.roas >= 4)
    out.push({ nivel: 'positivo', mensagem: 'ROAS alvo forte para o investimento planejado.' })
  else
    out.push({
      nivel: 'atencao',
      mensagem: 'ROAS alvo modesto — valide o ticket médio e a conversão.',
    })

  return out
}

/** Gera diagnósticos interpretativos para a precificação. */
export function diagnosticarPrecificacao(r: ResultadoPrecificacao): Diagnostico[] {
  const out: Diagnostico[] = []
  if (!r.viavel) {
    out.push({
      nivel: 'critico',
      mensagem:
        'A soma de margem, impostos, taxas e despesas atinge ou passa de 100%. Reduza os percentuais.',
    })
    return out
  }
  if (r.markup >= 2)
    out.push({ nivel: 'positivo', mensagem: `Markup de ${r.markup.toFixed(2)}x sobre o custo.` })
  else if (r.markup >= 1.3)
    out.push({
      nivel: 'atencao',
      mensagem: `Markup de ${r.markup.toFixed(2)}x — margem de manobra limitada.`,
    })
  else
    out.push({
      nivel: 'critico',
      mensagem: 'Markup muito baixo — revise custos ou margem desejada.',
    })

  if (r.margemContribuicao >= 30)
    out.push({ nivel: 'positivo', mensagem: 'Boa margem de contribuição por unidade.' })
  else
    out.push({
      nivel: 'atencao',
      mensagem: 'Margem de contribuição baixa — cuidado com o volume mínimo.',
    })

  return out
}
