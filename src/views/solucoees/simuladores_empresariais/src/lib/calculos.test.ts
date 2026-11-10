import { describe, it, expect } from 'vitest'
import {
  calcularOrcamentoEmpresarial,
  calcularOrcamentoMarketing,
  calcularSaudeEmpresa,
  calcularPrecificacao,
  diagnosticarPrecificacao,
  setoresFatores,
  type DadosEmpresa,
} from './calculos'

describe('calcularOrcamentoEmpresarial', () => {
  it('divide o faturamento conforme os fatores do setor de serviços', () => {
    const r = calcularOrcamentoEmpresarial({
      faturamento: 100000,
      custoFixo: 20000,
      custoVariavel: 30000,
      setor: 'servicos',
    })
    expect(r.divisao.vendas).toBeCloseTo(100000 * setoresFatores.servicos.vendas)
    expect(r.divisao.operacional).toBeCloseTo(100000 * setoresFatores.servicos.operacional)
    expect(r.divisao.producao).toBeCloseTo(100000 * setoresFatores.servicos.producao)
  })

  it('calcula margem bruta corretamente', () => {
    const r = calcularOrcamentoEmpresarial({
      faturamento: 100000,
      custoFixo: 0,
      custoVariavel: 40000,
      setor: 'comercio',
    })
    // (100000 - 40000) / 100000 * 100 = 60
    expect(r.margemBruta).toBeCloseTo(60)
  })

  it('projeta o faturamento anual e a reserva de emergência', () => {
    const r = calcularOrcamentoEmpresarial({
      faturamento: 10000,
      custoFixo: 5000,
      custoVariavel: 2000,
      setor: 'tecnologia',
    })
    expect(r.projecaoAnual).toBe(120000)
    expect(r.reservaEmergencia).toBe(30000) // 6 x custoFixo
  })
})

describe('calcularOrcamentoMarketing', () => {
  it('aplica 20% do faturamento para negócio online', () => {
    const r = calcularOrcamentoMarketing({
      faturamento: 50000,
      tipo: 'online',
      ticketMedio: 150,
      metaClientes: 50,
    })
    expect(r.orcamento.total).toBeCloseTo(50000 * 0.2)
    // online: 30% tecnologia, 70% mídia
    expect(r.orcamento.tecnologia).toBeCloseTo(10000 * 0.3)
    expect(r.orcamento.midia).toBeCloseTo(10000 * 0.7)
  })

  it('calcula CAC como orçamento / meta de clientes', () => {
    const r = calcularOrcamentoMarketing({
      faturamento: 50000,
      tipo: 'servicos',
      ticketMedio: 200,
      metaClientes: 40,
    })
    const orcamento = 50000 * 0.17
    expect(r.metricas.cac).toBeCloseTo(orcamento / 40)
  })

  it('usa valores padrão quando ticket/meta são zero', () => {
    const r = calcularOrcamentoMarketing({
      faturamento: 10000,
      tipo: 'fisico',
      ticketMedio: 0,
      metaClientes: 0,
    })
    // não deve gerar NaN/Infinity
    expect(Number.isFinite(r.metricas.cac)).toBe(true)
    expect(Number.isFinite(r.metricas.roas)).toBe(true)
  })
})

describe('calcularSaudeEmpresa', () => {
  const base: DadosEmpresa = {
    faturamento: 50000,
    capital: 25000,
    estoque: 15000,
    custo: 800,
    ticket: 2500,
    pedidos: 50,
    vendas: 90,
    clientes: 100,
    frequenciaCompra: 3,
    novosClientes: 20,
    retencao: 70,
    midia_impressa: 2000,
    redes_sociais: 3000,
    site_blog: 1500,
    anuncios: 4000,
    loja_virtual: 800,
    marketplace: 1200,
    materia_prima: 8000,
    fabricacao: 5000,
    logistica: 2000,
    maquinario: 50000,
    mobiliario: 8000,
    imoveis: 200000,
    automoveis: 30000,
    eletronicos: 5000,
    equipamentosAdicionais: 3000,
    folha_pagamento: 18000,
    aluguel: 3000,
    luz: 800,
    agua: 300,
    telefonia: 400,
    internet: 200,
    papelaria: 150,
    limpeza: 300,
    sistemas: 500,
    treinamento: 800,
    seguranca: 600,
    servicos: 1200,
    despesaAdicionais: 800,
    custos_juridicos: 500,
    custos_contabeis: 800,
  }

  it('soma o patrimônio corretamente', () => {
    const r = calcularSaudeEmpresa(base)
    expect(r.calc_patrimonio).toBe(50000 + 8000 + 200000 + 30000 + 5000 + 3000)
  })

  it('valuation é 8x o EBITDA', () => {
    const r = calcularSaudeEmpresa(base)
    expect(r.calc_valuation_multiplo).toBeCloseTo(r.calc_ebitda * 8)
  })

  it('não retorna valores não finitos (proteção contra divisão por zero)', () => {
    const r = calcularSaudeEmpresa({ ...base, novosClientes: 0, faturamento: 50000 })
    Object.entries(r).forEach(([, valor]) => {
      if (typeof valor === 'number') expect(Number.isFinite(valor)).toBe(true)
    })
  })
})

describe('calcularOrcamentoEmpresarial — proteções', () => {
  it('retorna ponto de equilíbrio Infinity quando custo variável consome o faturamento', () => {
    const r = calcularOrcamentoEmpresarial({
      faturamento: 10000,
      custoFixo: 5000,
      custoVariavel: 10000,
      setor: 'servicos',
    })
    expect(r.pontoEquilibrio).toBe(Infinity)
  })
})

describe('calcularPrecificacao', () => {
  it('usa markup divisor: percentuais incidem sobre o preço de venda', () => {
    const r = calcularPrecificacao({
      custo: 50,
      frete: 0,
      margemDesejada: 20,
      impostos: 0,
      taxas: 0,
      despesasOperacionais: 0,
    })
    // preço = 50 / (1 - 0.20) = 62.5
    expect(r.precoVenda).toBeCloseTo(62.5)
    expect(r.composicao.lucro).toBeCloseTo(12.5)
    expect(r.markup).toBeCloseTo(1.25)
    expect(r.viavel).toBe(true)
  })

  it('inclui frete no custo base', () => {
    const r = calcularPrecificacao({
      custo: 40,
      frete: 10,
      margemDesejada: 0,
      impostos: 0,
      taxas: 0,
      despesasOperacionais: 0,
    })
    expect(r.precoVenda).toBeCloseTo(50)
  })

  it('marca como inviável quando os percentuais somam 100% ou mais', () => {
    const r = calcularPrecificacao({
      custo: 50,
      frete: 0,
      margemDesejada: 60,
      impostos: 30,
      taxas: 10,
      despesasOperacionais: 5,
    })
    expect(r.viavel).toBe(false)
    expect(r.precoVenda).toBe(0)
    const diag = diagnosticarPrecificacao(r)
    expect(diag[0].nivel).toBe('critico')
  })

  it('soma dos componentes do preço reconstrói o preço de venda', () => {
    const r = calcularPrecificacao({
      custo: 80,
      frete: 5,
      margemDesejada: 15,
      impostos: 8,
      taxas: 4,
      despesasOperacionais: 12,
    })
    const soma =
      r.composicao.custo +
      r.composicao.frete +
      r.composicao.impostos +
      r.composicao.taxas +
      r.composicao.despesasOperacionais +
      r.composicao.lucro
    expect(soma).toBeCloseTo(r.precoVenda, 1)
  })
})
