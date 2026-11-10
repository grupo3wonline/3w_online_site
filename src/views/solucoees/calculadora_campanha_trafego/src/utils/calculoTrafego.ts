/**
 * Lógica pura de cálculo de campanhas de tráfego pago.
 *
 * Mantida isolada da camada de UI (SOLID: responsabilidade única) para permitir
 * reuso na página da Ferramenta e cobertura por testes automatizados (Vitest).
 */

export interface ParametrosCampanha {
  /** Orçamento total investido na campanha (R$). */
  orcamento: number
  /** Custo por clique médio (R$). */
  cpc: number
  /** Taxa de cliques esperada, em porcentagem (ex.: 2.5 = 2,5%). */
  ctr: number
  /** Taxa de conversão, em porcentagem (ex.: 3 = 3%). */
  taxaConversao: number
  /** Valor médio de cada venda/contrato (R$). */
  ticketMedio: number
}

export interface ResultadosCampanha {
  cliques: number
  impressoes: number
  conversoes: number
  custoConversao: number
  receita: number
  roi: number
  pontoEquilibrio: number
}

/** Campos obrigatórios que precisam ser maiores que zero para o cálculo ser válido. */
const CAMPOS_OBRIGATORIOS: Array<keyof ParametrosCampanha> = [
  'orcamento',
  'cpc',
  'ctr',
  'taxaConversao',
  'ticketMedio',
]

/**
 * Valida se todos os parâmetros numéricos obrigatórios são finitos e positivos.
 */
export function parametrosValidos(p: ParametrosCampanha): boolean {
  return CAMPOS_OBRIGATORIOS.every((campo) => {
    const valor = p[campo]
    return Number.isFinite(valor) && valor > 0
  })
}

/** Arredonda para 2 casas decimais evitando erros de ponto flutuante. */
function arredondar2(valor: number): number {
  return Math.round(valor * 100) / 100
}

/**
 * Calcula as projeções de uma campanha de tráfego pago.
 *
 * @throws {RangeError} quando os parâmetros são inválidos (use parametrosValidos antes).
 */
export function calcularCampanha(p: ParametrosCampanha): ResultadosCampanha {
  if (!parametrosValidos(p)) {
    throw new RangeError('Parâmetros inválidos: todos os campos devem ser maiores que zero.')
  }

  const cliques = p.orcamento / p.cpc
  const impressoes = cliques / (p.ctr / 100)
  const conversoes = cliques * (p.taxaConversao / 100)
  const custoConversao = p.orcamento / conversoes
  const receita = conversoes * p.ticketMedio
  const roi = ((receita - p.orcamento) / p.orcamento) * 100
  const pontoEquilibrio = p.orcamento / p.ticketMedio

  return {
    cliques: Math.round(cliques),
    impressoes: Math.round(impressoes),
    conversoes: arredondar2(conversoes),
    custoConversao: arredondar2(custoConversao),
    receita: arredondar2(receita),
    roi: arredondar2(roi),
    pontoEquilibrio: arredondar2(pontoEquilibrio),
  }
}

/** Retorna uma recomendação textual conforme o ROI projetado. */
export function recomendacaoPorRoi(roi: number): string {
  if (roi > 200) return 'Excelente projeção de ROI. Campanha altamente recomendada.'
  if (roi > 100) return 'Boa projeção de ROI. Campanha recomendada.'
  if (roi > 0) return 'ROI positivo, mas baixo. Considere otimizações antes de escalar.'
  return 'ROI negativo. Revisar estratégia antes de iniciar.'
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatarNumero(valor: number): string {
  return valor.toLocaleString('pt-BR')
}
