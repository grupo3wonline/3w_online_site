// Tipos do domínio de cálculo de saúde (IMC e metas).
// Módulo puro, sem dependência de UI.

export type Sexo = 'male' | 'female'

export interface DadosUsuario {
  /** Altura em metros (ex.: 1.75) */
  altura: number
  /** Peso em quilogramas */
  peso: number
  /** Idade em anos */
  idade: number
  sexo: Sexo
  /** Fator de atividade (1.2 a 1.9) */
  atividade: number
}

export interface FaixaPeso {
  min: number
  max: number
}

export interface Hidratacao {
  necessidadeHidrica: number
  litros: string
  garrafas: string
  copos: string
  nota: string
}

export interface MacroDetalhe {
  necessidade: number
  nota: string
  indicacao: string
}

export interface GastoCalorico {
  calorias: MacroDetalhe
  proteinas: MacroDetalhe
  carboidratos: MacroDetalhe
  gorduras: MacroDetalhe
}

export interface PesoIdeal {
  pesoMin: number
  pesoMed: number
  pesoMax: number
  nota: string
}

export interface Refeicao {
  calorias: number
  proteina: number
  carboidrato: number
}

export interface Refeicoes {
  cafe: Refeicao
  almoco: Refeicao
  jantar: Refeicao
  lanches: Refeicao
}

export interface RemedioNatural {
  recomendacao: string
  exemplo: string
}

export interface ResultadoIMC {
  imc: number
  imcCategoria: string
  pesoIdealFaixa: FaixaPeso
  hidratacao: Hidratacao
  calorias: number
  proteina: number
  carboidrato: number
  refeicoes: Refeicoes
  gastoCalorico: GastoCalorico
  pesoIdeal: PesoIdeal
  percentualGordura: { percentual: number; nota: string }
  tmb: { valor: number; nota: string }
  get: { valor: number; nota: string }
  nutrientes: Record<string, string>
  remediosNaturais: Record<string, RemedioNatural>
}
