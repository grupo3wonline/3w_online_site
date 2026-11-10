/**
 * Funções puras de cálculo financeiro.
 * Isoladas da UI (SOLID: Single Responsibility) para serem testáveis
 * e reutilizáveis entre as calculadoras.
 */

/**
 * Converte entrada do usuário em número seguro.
 * Aceita vírgula como separador decimal (padrão pt-BR).
 * @param {string|number} value
 * @returns {number} NaN se inválido.
 */
export function parseNumber(value) {
  if (typeof value === 'number') return value
  if (value === null || value === undefined || value === '') return NaN
  const normalized = String(value).replace(/\s/g, '').replace(/\./g, '').replace(',', '.')
  // Se o usuário já usou ponto como decimal (ex: "1.5"), tenta os dois formatos.
  const asIs = Number(String(value).replace(',', '.'))
  const parsed = Number(normalized)
  return Number.isNaN(asIs) ? parsed : asIs
}

/**
 * Juros compostos. Montante = capital * (1 + taxa)^periodo.
 * @param {number} capital  Valor inicial (>0).
 * @param {number} taxaPercent  Taxa por período em % (ex: 1.5).
 * @param {number} periodos  Número de períodos (>0).
 * @returns {{ montante:number, juros:number }}
 */
export function jurosCompostos(capital, taxaPercent, periodos) {
  if (capital <= 0 || periodos <= 0 || taxaPercent < 0) {
    throw new Error('Valores inválidos para juros compostos')
  }
  const montante = capital * Math.pow(1 + taxaPercent / 100, periodos)
  return { montante, juros: montante - capital }
}

/**
 * Juros simples. Montante = capital * (1 + taxa * periodo).
 */
export function jurosSimples(capital, taxaPercent, periodos) {
  if (capital <= 0 || periodos <= 0 || taxaPercent < 0) {
    throw new Error('Valores inválidos para juros simples')
  }
  const juros = capital * (taxaPercent / 100) * periodos
  return { montante: capital + juros, juros }
}

/**
 * Preço de venda a partir do custo e margem desejada (markup sobre o preço).
 * preco = custo / (1 - margem/100)
 * @param {number} custo
 * @param {number} margemPercent  Margem de lucro desejada em % (<100).
 * @returns {{ preco:number, lucro:number }}
 */
export function precoComMargem(custo, margemPercent) {
  if (custo < 0 || margemPercent < 0 || margemPercent >= 100) {
    throw new Error('Margem deve ser entre 0 e 100 e custo não-negativo')
  }
  const preco = custo / (1 - margemPercent / 100)
  return { preco, lucro: preco - custo }
}

/**
 * Valor da hora de trabalho.
 * @param {number} custosMensais  Custos fixos + pró-labore desejado.
 * @param {number} horasPorMes    Horas produtivas no mês (>0).
 * @returns {number} Valor da hora.
 */
export function valorHora(custosMensais, horasPorMes) {
  if (horasPorMes <= 0) throw new Error('Horas por mês deve ser maior que zero')
  return custosMensais / horasPorMes
}

/**
 * Valor de cada parcela por quantidade (sem juros).
 */
export function valorParcela(total, quantidade) {
  if (quantidade <= 0) throw new Error('Quantidade de parcelas inválida')
  return total / quantidade
}

/**
 * Parcelamento com juros compostos (tabela Price).
 * Quando a taxa é zero, divide igualmente. Caso contrário usa a fórmula PMT.
 * @param {number} valorTotal  Valor à vista (principal).
 * @param {number} numParcelas  Quantidade de parcelas (>0).
 * @param {number} taxaPercent  Taxa de juros por parcela em % (>=0).
 * @returns {{ valorParcela:number, totalPago:number, jurosTotal:number }}
 */
export function parcelamento(valorTotal, numParcelas, taxaPercent) {
  if (valorTotal <= 0 || numParcelas <= 0 || taxaPercent < 0) {
    throw new Error('Valores inválidos para parcelamento')
  }
  const i = taxaPercent / 100
  let valorParcela
  if (i === 0) {
    valorParcela = valorTotal / numParcelas
  } else {
    valorParcela = (valorTotal * (i * Math.pow(1 + i, numParcelas))) / (Math.pow(1 + i, numParcelas) - 1)
  }
  const totalPago = valorParcela * numParcelas
  return { valorParcela, totalPago, jurosTotal: totalPago - valorTotal }
}

/**
 * Formata número como moeda BRL.
 * @param {number} value
 * @returns {string}
 */
export function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number.isFinite(value) ? value : 0)
}
