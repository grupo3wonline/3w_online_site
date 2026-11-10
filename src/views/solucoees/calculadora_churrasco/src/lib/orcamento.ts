import { z } from 'zod'

/**
 * Módulo de domínio da calculadora manual de orçamento.
 *
 * Responsabilidade única (SRP): dada uma lista de itens (nome, quantidade e
 * valor unitário) e um número de participantes, calcular subtotais, total e
 * o rateio por pessoa. Funções puras e testáveis, sem dependência de UI.
 */

// ---------------------------------------------------------------------------
// Limites
// ---------------------------------------------------------------------------
export const LIMITES_ORCAMENTO = {
  quantidadeMax: 100000,
  valorMax: 10000000,
  participantesMax: 10000,
} as const

// ---------------------------------------------------------------------------
// Schema de validação (Zod)
// ---------------------------------------------------------------------------
export const itemOrcamentoSchema = z.object({
  id: z.string(),
  nome: z.string().trim().min(1, 'Informe o nome do item').max(60, 'Máximo de 60 caracteres'),
  quantidade: z
    .number({ invalid_type_error: 'Informe a quantidade' })
    .positive('A quantidade deve ser maior que zero')
    .max(LIMITES_ORCAMENTO.quantidadeMax, 'Quantidade muito alta'),
  valorUnitario: z
    .number({ invalid_type_error: 'Informe o valor unitário' })
    .min(0, 'O valor não pode ser negativo')
    .max(LIMITES_ORCAMENTO.valorMax, 'Valor muito alto'),
})

export type ItemOrcamento = z.infer<typeof itemOrcamentoSchema>

export interface ResumoOrcamento {
  total: number
  participantes: number
  porPessoa: number
  quantidadeItens: number
}

// ---------------------------------------------------------------------------
// Funções puras
// ---------------------------------------------------------------------------
/** Subtotal de um item = quantidade × valor unitário. */
export function subtotalItem(item: Pick<ItemOrcamento, 'quantidade' | 'valorUnitario'>): number {
  const q = Number.isFinite(item.quantidade) ? item.quantidade : 0
  const v = Number.isFinite(item.valorUnitario) ? item.valorUnitario : 0
  return Math.max(0, q) * Math.max(0, v)
}

/** Soma dos subtotais de todos os itens. */
export function calcularTotal(itens: Pick<ItemOrcamento, 'quantidade' | 'valorUnitario'>[]): number {
  return itens.reduce((acc, item) => acc + subtotalItem(item), 0)
}

/**
 * Calcula o resumo do orçamento, incluindo o rateio por participante.
 * Participantes < 1 são tratados como 1 para evitar divisão por zero.
 */
export function calcularOrcamento(
  itens: Pick<ItemOrcamento, 'quantidade' | 'valorUnitario'>[],
  participantes: number,
): ResumoOrcamento {
  const total = calcularTotal(itens)
  const pessoas = Math.max(1, Math.floor(participantes) || 1)
  return {
    total,
    participantes: pessoas,
    porPessoa: total / pessoas,
    quantidadeItens: itens.length,
  }
}

// ---------------------------------------------------------------------------
// Formatação (moeda BRL)
// ---------------------------------------------------------------------------
export const formatarBRL = (v: number): string =>
  (Number.isFinite(v) ? v : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

/** Gera um identificador simples para novos itens (client-side). */
export function novoId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

/** Cria um item vazio pronto para edição. */
export function itemVazio(): ItemOrcamento {
  return { id: novoId(), nome: '', quantidade: 1, valorUnitario: 0 }
}

/**
 * Gera um resumo em texto puro do orçamento (para baixar/compartilhar).
 */
export function gerarResumoOrcamento(itens: ItemOrcamento[], participantes: number): string {
  const { total, porPessoa, participantes: pessoas } = calcularOrcamento(itens, participantes)
  const linhas = itens.map(
    (i) =>
      `  - ${i.nome || 'Item'}: ${i.quantidade} x ${formatarBRL(i.valorUnitario)} = ${formatarBRL(subtotalItem(i))}`,
  )

  return [
    'ORÇAMENTO DO CHURRASCO',
    '======================',
    'ITENS:',
    ...(linhas.length ? linhas : ['  (nenhum item)']),
    '',
    `TOTAL: ${formatarBRL(total)}`,
    `PARTICIPANTES: ${pessoas}`,
    `VALOR POR PESSOA: ${formatarBRL(porPessoa)}`,
    '',
    'Gerado em app.3wonline.com/calculadora_churrasco',
  ].join('\n')
}
