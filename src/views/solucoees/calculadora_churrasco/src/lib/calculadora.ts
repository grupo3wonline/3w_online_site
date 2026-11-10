import { z } from 'zod'

/**
 * Módulo de cálculo do churrasco.
 *
 * Responsabilidade única (SRP): converter os dados de entrada (número de
 * pessoas por perfil, duração e apetite) em uma lista de quantidades e um
 * custo estimado. Funções puras, sem efeitos colaterais e sem dependência
 * de UI, o que torna a lógica trivialmente testável (Vitest).
 */

// ---------------------------------------------------------------------------
// Constantes de consumo (documentadas para a spec)
// Taxas em gramas por pessoa, referência de meia hora de evento.
// ---------------------------------------------------------------------------
export const TAXA_CARNE = {
  /** Consumo base de carne por homem (g / meia hora) */
  homens: 373,
  /** Consumo base de carne por mulher (g / meia hora) */
  mulheres: 278,
  /** Consumo base de carne por criança (g / meia hora) */
  criancas: 157,
} as const

/** Fator de folga/desperdício aplicado ao total (10%). */
export const FATOR_DESPERDICIO = 0.1

/** Limites aceitos pelo formulário. */
export const LIMITES = {
  pessoasMax: 1000,
  duracaoMin: 1,
  duracaoMax: 24,
} as const

/**
 * Perfil de apetite do grupo. Multiplica as quantidades calculadas para
 * refletir grupos que comem menos ou mais que a média.
 */
export const APETITE = {
  leve: 0.8,
  normal: 1,
  reforcado: 1.25,
} as const

export type Apetite = keyof typeof APETITE

// ---------------------------------------------------------------------------
// Schema de validação (Zod) — fonte única de verdade das regras de entrada.
// ---------------------------------------------------------------------------
const pessoas = z
  .number({ invalid_type_error: 'Informe um número válido' })
  .int('Use apenas números inteiros')
  .min(0, 'O valor não pode ser negativo')
  .max(LIMITES.pessoasMax, `Máximo de ${LIMITES.pessoasMax} pessoas por categoria`)

export const churrascoSchema = z
  .object({
    homens: pessoas,
    mulheres: pessoas,
    criancas: pessoas,
    duracao: z
      .number({ invalid_type_error: 'Informe a duração em horas' })
      .min(LIMITES.duracaoMin, `Mínimo de ${LIMITES.duracaoMin} hora`)
      .max(LIMITES.duracaoMax, `Máximo de ${LIMITES.duracaoMax} horas`),
    apetite: z.enum(['leve', 'normal', 'reforcado']).default('normal'),
  })
  .refine((d) => d.homens + d.mulheres + d.criancas > 0, {
    message: 'Informe ao menos uma pessoa',
    path: ['homens'],
  })

export type ChurrascoInput = z.infer<typeof churrascoSchema>

// ---------------------------------------------------------------------------
// Tipos de saída
// ---------------------------------------------------------------------------
export interface ItemQuantidade {
  label: string
  value: string
  /** Quantidade numérica (unidades, Kg, latas...) para cálculo de custo. */
  qtd: number
  /** Unidade base para precificação: 'kg' | 'unidade'. */
  base: 'kg' | 'unidade'
}

export interface ResultadoChurrasco {
  adultos: number
  criancas: number
  duracao: number
  apetite: Apetite
  carneMin: string
  carneMax: string
  carneMediaKg: number
  acompanhamentos: ItemQuantidade[]
  bebidas: ItemQuantidade[]
  destilados: ItemQuantidade[]
}

// ---------------------------------------------------------------------------
// Presets rápidos (atalhos comuns de preenchimento)
// ---------------------------------------------------------------------------
export interface PresetChurrasco {
  id: string
  label: string
  icone: string
  input: Omit<ChurrascoInput, 'apetite'>
}

export const PRESETS: PresetChurrasco[] = [
  {
    id: 'familia',
    label: 'Família (10)',
    icone: 'fa-solid fa-house-chimney',
    input: { homens: 4, mulheres: 4, criancas: 2, duracao: 4 },
  },
  {
    id: 'amigos',
    label: 'Amigos (15)',
    icone: 'fa-solid fa-users',
    input: { homens: 9, mulheres: 6, criancas: 0, duracao: 5 },
  },
  {
    id: 'festa',
    label: 'Festa (30)',
    icone: 'fa-solid fa-champagne-glasses',
    input: { homens: 14, mulheres: 12, criancas: 4, duracao: 6 },
  },
]

// ---------------------------------------------------------------------------
// Preços médios de referência (R$) — editáveis pelo usuário na UI.
// Valores aproximados de mercado; o usuário ajusta conforme sua região.
// ---------------------------------------------------------------------------
export const PRECOS_PADRAO: Record<string, number> = {
  Carne: 45, // R$/Kg (média de cortes)
  'Pão de Alho': 12, // R$/pacote
  'Asa de Frango': 18,
  'Coxa de Frango': 16,
  'Peito de Frango': 22,
  Linguiça: 25,
  Refrigerante: 9, // R$/garrafa 2L
  Suco: 8,
  Energético: 12,
  Cerveja: 4, // R$/lata
  Vinho: 35, // R$/garrafa
  Espumante: 40,
  Champanhe: 60,
  Gin: 70,
  Vodka: 45,
  Tequila: 90,
  Whisky: 80,
  Cachaça: 20,
  Conhaque: 55,
  Rum: 50,
}

// ---------------------------------------------------------------------------
// Helpers puros
// ---------------------------------------------------------------------------
const unidades = (ml: number, capacidade: number, unidade: string): ItemQuantidade => {
  const qtd = Math.max(0, Math.ceil(ml / capacidade))
  return { label: '', value: `${qtd} ${unidade}`, qtd, base: 'unidade' }
}

const kg = (valorKg: number): ItemQuantidade => ({
  label: '',
  value: `${valorKg.toFixed(2)} Kg`,
  qtd: valorKg,
  base: 'kg',
})

const nomear = (item: ItemQuantidade, label: string): ItemQuantidade => ({ ...item, label })

/** Calcula a faixa (mínimo / recomendado) de carne em quilos. */
export function calcularCarne(input: ChurrascoInput): { min: number; max: number; media: number } {
  const { homens, mulheres, criancas, duracao } = input
  const adultos = homens + mulheres
  const meiaHora = duracao / 2
  const fatorApetite = APETITE[input.apetite ?? 'normal']

  const porMulher = TAXA_CARNE.mulheres * meiaHora
  const porHomem = TAXA_CARNE.homens * meiaHora
  const porCrianca = TAXA_CARNE.criancas * meiaHora

  const total1 = porMulher + porHomem + porCrianca
  const total2 = porMulher + porHomem

  const val1 = (((total1 + total1 * FATOR_DESPERDICIO) * 5) / 1000) * fatorApetite
  const val2 = ((total2 * adultos + (total2 / 2) * criancas) / 1000) * fatorApetite

  const max = Math.max(val1, val2)
  const min = Math.min(val1, val2)
  return { min, max, media: (min + max) / 2 }
}

/**
 * Calcula a lista completa do churrasco.
 * @throws ZodError se a entrada for inválida.
 */
export function calcularChurrasco(entrada: unknown): ResultadoChurrasco {
  const input = churrascoSchema.parse(entrada)
  const { homens, mulheres, criancas, duracao } = input
  const apetite = input.apetite ?? 'normal'
  const adultos = homens + mulheres
  const fator = APETITE[apetite]

  const { min, max, media } = calcularCarne(input)

  // Acompanhamentos
  const paoAlho = Math.ceil((adultos * 0.9 + criancas * 0.75) * fator)
  const fatorFrango = adultos * 0.5 + criancas * 0.25
  const asaFrango = fatorFrango * 0.09 * media
  const coxaFrango = fatorFrango * 0.11 * media
  const peitoFrango = fatorFrango * 0.15 * media
  const linguica = fatorFrango * 0.19 * media

  // Bebidas (ml por adulto por escala de duração), ajustadas pelo apetite
  const refri = Math.ceil((1000 * duracao) / 2)
  const suco = Math.ceil((500 * duracao) / 3)
  const energetico = Math.ceil((500 * duracao) / 5)
  const cerveja = Math.ceil((2000 * duracao) / 2)
  const vinho = Math.ceil((500 * duracao) / 6)
  const gin = Math.ceil((500 * duracao) / 5)
  const espumante = Math.ceil((390 * duracao) / 3)
  const champanhe = Math.ceil((360 * duracao) / 3)

  // Destilados
  const vodka = Math.ceil((500 * duracao) / 9)
  const tequila = Math.ceil((410 * duracao) / 7)
  const whisky = Math.ceil((500 * duracao) / 10)
  const cachaca = Math.ceil((500 * duracao) / 9)
  const conhaque = Math.ceil((300 * duracao) / 7)
  const rum = Math.ceil((250 * duracao) / 7)

  const b = (ml: number) => ml * fator

  return {
    adultos,
    criancas,
    duracao,
    apetite,
    carneMin: min.toFixed(2),
    carneMax: max.toFixed(2),
    carneMediaKg: media,
    acompanhamentos: [
      { label: 'Pão de Alho', value: `${paoAlho} pacote(s)`, qtd: paoAlho, base: 'unidade' },
      nomear(kg(asaFrango), 'Asa de Frango'),
      nomear(kg(coxaFrango), 'Coxa de Frango'),
      nomear(kg(peitoFrango), 'Peito de Frango'),
      nomear(kg(linguica), 'Linguiça'),
    ],
    bebidas: [
      nomear(unidades(b(refri * adultos + (refri / 2) * criancas), 2000, 'garrafa(s) 2L'), 'Refrigerante'),
      nomear(unidades(b(suco * adultos + (suco / 2) * criancas), 1000, 'garrafa(s) 1L'), 'Suco'),
      nomear(unidades(b(energetico * adultos), 1000, 'garrafa(s) 2L'), 'Energético'),
      nomear(unidades(b(cerveja * adultos), 355, 'lata(s) 350ml'), 'Cerveja'),
      nomear(unidades(b(vinho * adultos), 750, 'garrafa(s) 750ml'), 'Vinho'),
      nomear(unidades(b(espumante * adultos), 750, 'garrafa(s) 750ml'), 'Espumante'),
      nomear(unidades(b(champanhe * adultos), 750, 'garrafa(s) 750ml'), 'Champanhe'),
      nomear(unidades(b(gin * adultos), 750, 'garrafa(s) 750ml'), 'Gin'),
    ],
    destilados: [
      nomear(unidades(b(vodka * adultos), 700, 'garrafa(s) 700ml'), 'Vodka'),
      nomear(unidades(b(tequila * adultos), 750, 'garrafa(s) 750ml'), 'Tequila'),
      nomear(unidades(b(whisky * adultos), 1000, 'garrafa(s) 1L'), 'Whisky'),
      nomear(unidades(b(cachaca * adultos), 750, 'garrafa(s) 750ml'), 'Cachaça'),
      nomear(unidades(b(conhaque * adultos), 700, 'garrafa(s) 700ml'), 'Conhaque'),
      nomear(unidades(b(rum * adultos), 980, 'garrafa(s) 980ml'), 'Rum'),
    ],
  }
}

/**
 * Estima o custo total do churrasco a partir de uma tabela de preços.
 * A carne usa a média recomendada (R$/Kg); os demais itens usam o preço
 * por unidade/pacote/lata. Itens sem preço definido são ignorados.
 */
export function calcularCusto(
  r: ResultadoChurrasco,
  precos: Record<string, number> = PRECOS_PADRAO,
): { total: number; itens: { label: string; subtotal: number }[] } {
  const itens: { label: string; subtotal: number }[] = []

  const precoCarne = precos['Carne'] ?? 0
  itens.push({ label: 'Carne', subtotal: precoCarne * r.carneMediaKg })

  for (const item of [...r.acompanhamentos, ...r.bebidas, ...r.destilados]) {
    const preco = precos[item.label]
    if (preco == null) continue
    itens.push({ label: item.label, subtotal: preco * item.qtd })
  }

  const total = itens.reduce((acc, i) => acc + i.subtotal, 0)
  return { total, itens }
}

const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

/**
 * Gera um resumo do resultado em texto puro, útil para copiar/compartilhar
 * ou baixar como .txt. Mantido aqui (camada de domínio) por ser lógica pura.
 */
export function gerarResumoTexto(r: ResultadoChurrasco, custoTotal?: number): string {
  const linhas = (itens: ItemQuantidade[]) =>
    itens.map((i) => `  - ${i.label}: ${i.value}`).join('\n')

  const partes = [
    'CALCULADORA DE CHURRASCO',
    '========================',
    `Adultos: ${r.adultos} | Crianças: ${r.criancas} | Duração: ${r.duracao}h | Apetite: ${r.apetite}`,
    '',
    `CARNES: ${r.carneMin} a ${r.carneMax} Kg (recomendado)`,
    '',
    'ACOMPANHAMENTOS:',
    linhas(r.acompanhamentos),
    '',
    'BEBIDAS:',
    linhas(r.bebidas),
    '',
    'DESTILADOS:',
    linhas(r.destilados),
  ]

  if (custoTotal != null) {
    partes.push('', `CUSTO ESTIMADO: ${brl(custoTotal)}`)
  }

  partes.push('', 'Gerado em app.3wonline.com/calculadora_churrasco')
  return partes.join('\n')
}

export { brl }
