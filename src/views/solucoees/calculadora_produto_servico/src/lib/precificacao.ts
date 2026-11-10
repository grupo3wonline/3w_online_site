/**
 * Lógica de precificação (independente de UI).
 * Mantém as regras de negócio testáveis e desacopladas dos componentes.
 */

// ===== Produtos =====
export interface DadosProduto {
  custoMaterial: number
  custoOperacional: number
  tempoProducao: number
  valorHora: number
  margemLucro: number
  impostos: number
}

export interface ComparativoProduto {
  margem: number
  lucro: number
  precoFinal: number
}

export interface ResultadoProduto {
  custoTotal: number
  custoMaoObra: number
  lucro: number
  impostoValor: number
  precoFinal: number
  precoMinimo: number
  precoPremium: number
  comparativos: ComparativoProduto[]
}

export function calcularProduto(dados: DadosProduto): ResultadoProduto {
  const custoMaoObra = dados.tempoProducao * dados.valorHora
  const custoTotal = dados.custoMaterial + dados.custoOperacional + custoMaoObra
  const lucro = (custoTotal * dados.margemLucro) / 100
  const precoAntesImposto = custoTotal + lucro
  const impostoValor = (precoAntesImposto * dados.impostos) / 100
  const precoFinal = precoAntesImposto + impostoValor

  const comparativos: ComparativoProduto[] = [10, 15, 20, 25, 30, 40].map((margem) => {
    const cLucro = (custoTotal * margem) / 100
    const cPreco = custoTotal + cLucro
    const cImposto = (cPreco * dados.impostos) / 100
    return { margem, lucro: cLucro, precoFinal: cPreco + cImposto }
  })

  const precoMinimo = custoTotal * 1.1 * (1 + dados.impostos / 100)
  const precoPremium = custoTotal * 1.4 * (1 + dados.impostos / 100)

  return {
    custoTotal,
    custoMaoObra,
    lucro,
    impostoValor,
    precoFinal,
    precoMinimo,
    precoPremium,
    comparativos,
  }
}

// ===== Serviços =====
export type Complexidade = 'simples' | 'medio' | 'avancado'
export type Urgencia = 'normal' | 'urgente' | 'express'

export interface DadosServico {
  horasEstimadas: number
  valorHora: number
  custosOperacionais: number
  complexidade: Complexidade
  urgencia: Urgencia
  margemLucro: number
}

export interface ComparativoServico {
  margem: number
  lucro: number
  precoFinal: number
  porHora: number
}

export interface ResultadoServico {
  custoBaseTrabalho: number
  custoAjustado: number
  custoTotal: number
  lucro: number
  precoFinal: number
  precoPorHora: number
  precoPorDia: number
  precoPorSemana: number
  precoMinimo: number
  precoPremium: number
  multiplicadorComplexidade: number
  multiplicadorUrgencia: number
  comparativos: ComparativoServico[]
}

export const MULTIPLICADORES_COMPLEXIDADE: Record<Complexidade, number> = {
  simples: 1,
  medio: 1.3,
  avancado: 1.6,
}

export const MULTIPLICADORES_URGENCIA: Record<Urgencia, number> = {
  normal: 1,
  urgente: 1.2,
  express: 1.5,
}

export function calcularServico(dados: DadosServico): ResultadoServico {
  const multComp = MULTIPLICADORES_COMPLEXIDADE[dados.complexidade]
  const multUrg = MULTIPLICADORES_URGENCIA[dados.urgencia]
  const custoBaseTrabalho = dados.horasEstimadas * dados.valorHora
  const custoAjustado = custoBaseTrabalho * multComp * multUrg
  const custoTotal = custoAjustado + dados.custosOperacionais
  const lucro = (custoTotal * dados.margemLucro) / 100
  const precoFinal = custoTotal + lucro

  const precoPorHora = precoFinal / dados.horasEstimadas
  const precoPorDia = precoPorHora * 8
  const precoPorSemana = precoPorDia * 5
  const precoMinimo = custoTotal * 1.15
  const precoPremium = custoTotal * 1.5

  const comparativos: ComparativoServico[] = [15, 20, 25, 30, 40, 50].map((margem) => {
    const cLucro = (custoTotal * margem) / 100
    const cPreco = custoTotal + cLucro
    return { margem, lucro: cLucro, precoFinal: cPreco, porHora: cPreco / dados.horasEstimadas }
  })

  return {
    custoBaseTrabalho,
    custoAjustado,
    custoTotal,
    lucro,
    precoFinal,
    precoPorHora,
    precoPorDia,
    precoPorSemana,
    precoMinimo,
    precoPremium,
    multiplicadorComplexidade: multComp,
    multiplicadorUrgencia: multUrg,
    comparativos,
  }
}

/** Formata número em moeda brasileira (sem símbolo). */
export function fmt(n: number): string {
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
