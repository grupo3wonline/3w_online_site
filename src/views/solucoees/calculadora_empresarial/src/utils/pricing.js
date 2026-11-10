/**
 * Funções puras de precificação e orçamento.
 * Isoladas da UI (SOLID) e testáveis. Todas assumem números já validados.
 */

/**
 * Preço por horas trabalhadas + custos adicionais.
 * Base para projetos, serviços, sites, design, dev, social media, etc.
 * @param {number} horas
 * @param {number} valorHora
 * @param {number} [custosAdicionais=0]
 * @returns {{ maoDeObra:number, custos:number, total:number }}
 */
export function precoPorHora(horas, valorHora, custosAdicionais = 0) {
  if (horas < 0 || valorHora < 0 || custosAdicionais < 0) {
    throw new Error('Valores não podem ser negativos')
  }
  const maoDeObra = horas * valorHora
  return { maoDeObra, custos: custosAdicionais, total: maoDeObra + custosAdicionais }
}

/**
 * Salário líquido = bruto - (bruto * inss%) - outros descontos.
 * @param {number} bruto
 * @param {number} inssPercent
 * @param {number} [outrosDescontos=0]
 * @returns {{ bruto:number, descontoInss:number, outros:number, liquido:number }}
 */
export function salarioLiquido(bruto, inssPercent, outrosDescontos = 0) {
  if (bruto < 0 || inssPercent < 0 || inssPercent > 100 || outrosDescontos < 0) {
    throw new Error('Valores inválidos para cálculo de salário')
  }
  const descontoInss = bruto * (inssPercent / 100)
  const liquido = bruto - descontoInss - outrosDescontos
  return { bruto, descontoInss, outros: outrosDescontos, liquido }
}

/**
 * Quanto um autônomo precisa faturar para atingir a renda líquida desejada,
 * cobrindo impostos (sobre o faturamento) e despesas fixas.
 * faturamento = (renda + despesas) / (1 - impostos/100)
 * @param {number} rendaDesejada
 * @param {number} impostosPercent
 * @param {number} [despesasFixas=0]
 * @returns {{ faturamentoNecessario:number, impostos:number, despesas:number }}
 */
export function faturamentoAutonomo(rendaDesejada, impostosPercent, despesasFixas = 0) {
  if (rendaDesejada < 0 || impostosPercent < 0 || impostosPercent >= 100 || despesasFixas < 0) {
    throw new Error('Valores inválidos para cálculo de autônomo')
  }
  const faturamentoNecessario = (rendaDesejada + despesasFixas) / (1 - impostosPercent / 100)
  const impostos = faturamentoNecessario * (impostosPercent / 100)
  return { faturamentoNecessario, impostos, despesas: despesasFixas }
}

/**
 * Orçamento com margem: preço = (materiais + mãoDeObra) / (1 - margem/100).
 * @param {number} materiais
 * @param {number} maoDeObra
 * @param {number} margemPercent
 * @returns {{ custo:number, preco:number, lucro:number }}
 */
export function orcamentoComMargem(materiais, maoDeObra, margemPercent) {
  if (materiais < 0 || maoDeObra < 0 || margemPercent < 0 || margemPercent >= 100) {
    throw new Error('Valores inválidos para orçamento')
  }
  const custo = materiais + maoDeObra
  const preco = custo / (1 - margemPercent / 100)
  return { custo, preco, lucro: preco - custo }
}

/**
 * Campanha de mídia paga: cliques, conversões e custo por aquisição (CPA).
 * @param {number} orcamento
 * @param {number} cpc  Custo por clique.
 * @param {number} taxaConversaoPercent
 * @returns {{ cliques:number, conversoes:number, cpa:number }}
 */
export function campanhaMidia(orcamento, cpc, taxaConversaoPercent) {
  if (orcamento < 0 || cpc <= 0 || taxaConversaoPercent < 0) {
    throw new Error('Valores inválidos para campanha')
  }
  const cliques = orcamento / cpc
  const conversoes = cliques * (taxaConversaoPercent / 100)
  const cpa = conversoes > 0 ? orcamento / conversoes : 0
  return { cliques, conversoes, cpa }
}

/**
 * Retorno de investimento em marketing digital.
 * retorno = investimento * (1 + roi/100); lucro = retorno - investimento - custosFixos.
 * @param {number} investimento
 * @param {number} roiPercent
 * @param {number} [custosFixos=0]
 * @returns {{ retornoBruto:number, lucroLiquido:number }}
 */
export function retornoMarketing(investimento, roiPercent, custosFixos = 0) {
  if (investimento < 0 || roiPercent < 0 || custosFixos < 0) {
    throw new Error('Valores inválidos para marketing digital')
  }
  const retornoBruto = investimento * (1 + roiPercent / 100)
  const lucroLiquido = retornoBruto - investimento - custosFixos
  return { retornoBruto, lucroLiquido }
}

/**
 * Custo total de gestão de tráfego: investimento + fee de gestão + custos operacionais.
 * @param {number} investimento
 * @param {number} feeGestaoPercent
 * @param {number} [custosOperacionais=0]
 * @returns {{ fee:number, total:number }}
 */
export function custoGestaoTrafego(investimento, feeGestaoPercent, custosOperacionais = 0) {
  if (investimento < 0 || feeGestaoPercent < 0 || custosOperacionais < 0) {
    throw new Error('Valores inválidos para gestão de tráfego')
  }
  const fee = investimento * (feeGestaoPercent / 100)
  return { fee, total: investimento + fee + custosOperacionais }
}

/**
 * Estimativa de cachê de influenciador com base em alcance engajado.
 * alcance = seguidores * engajamento/100; valor sugerido ~ custoPost + alcance * fator.
 * @param {number} seguidores
 * @param {number} engajamentoPercent
 * @param {number} custoPost  Valor base por publicação.
 * @param {number} [fatorAlcance=0.01]  Valor por pessoa alcançada engajada.
 * @returns {{ alcanceEngajado:number, valorSugerido:number }}
 */
export function cacheInfluencer(seguidores, engajamentoPercent, custoPost, fatorAlcance = 0.01) {
  if (seguidores < 0 || engajamentoPercent < 0 || custoPost < 0) {
    throw new Error('Valores inválidos para influencer')
  }
  const alcanceEngajado = seguidores * (engajamentoPercent / 100)
  const valorSugerido = custoPost + alcanceEngajado * fatorAlcance
  return { alcanceEngajado, valorSugerido }
}
