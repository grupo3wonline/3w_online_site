// Tipos de domínio da aplicação

/** Parâmetros de entrada do cálculo de metragem de cabos */
export interface CalculoInput {
  lanceLongo: number
  lanceCurto: number
  numeroPontos: number
  peDireito: number
}

/** Resultado do cálculo de metragem de cabos */
export interface CalculoResultado {
  maiorDistancia: number
  menorDistancia: number
  alturaMaxima: number
  quantidadePontos: number
  metragemMinima: number
  metragemMaxima: number
}

/** Item persistido no histórico de cálculos */
export interface HistoricoItem extends CalculoInput, CalculoResultado {
  id: number
  timestamp: string
}

/** Preferências de consentimento de cookies (LGPD/GDPR/CCPA/POPIA) */
export interface ConsentPreferences {
  essential: true
  analytics: boolean
  preferences: boolean
}

/** Metadados de SEO por rota */
export interface SeoMeta {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export type ThemeMode = 'light' | 'dark'
