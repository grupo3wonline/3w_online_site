/**
 * Tipos do domínio de análise de texto.
 * Camada pura, sem dependência de Vue — facilita testes e reutilização.
 */

export interface TextFilters {
  /** Remove todos os espaços em branco antes de contar. */
  ignoreSpaces: boolean
  /** Remove pontuação, preservando letras acentuadas. */
  ignorePunctuation: boolean
  /** Remove dígitos numéricos. */
  ignoreNumbers: boolean
}

export interface TextAnalysis {
  characters: number
  /** Caracteres desconsiderando espaços em branco. */
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  lines: number
  /** Tempo de leitura estimado em minutos (200 ppm). */
  readingTimeMinutes: number
  /** Média de palavras por sentença. */
  avgWordsPerSentence: number
}

export type MetricKey = keyof Pick<
  TextAnalysis,
  'characters' | 'charactersNoSpaces' | 'words' | 'sentences' | 'paragraphs' | 'lines'
>

export interface MetricDiff {
  a: number
  b: number
  diff: number
  pct: number
  direction: 'up' | 'down' | 'equal'
}

export interface ComparisonResult {
  identical: boolean
  metrics: Record<MetricKey, MetricDiff>
}

export const DEFAULT_FILTERS: TextFilters = {
  ignoreSpaces: false,
  ignorePunctuation: false,
  ignoreNumbers: false
}
