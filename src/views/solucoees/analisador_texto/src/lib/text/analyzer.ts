/**
 * Núcleo de análise de texto. Funções puras e determinísticas — fáceis de testar.
 */
import type { ComparisonResult, MetricDiff, MetricKey, TextAnalysis, TextFilters } from './types'
import { applyFilters, sanitizeText } from './sanitize'

const WORDS_PER_MINUTE = 200

/** Métricas comparáveis entre dois textos (numéricas absolutas). */
export const COMPARABLE_METRICS: MetricKey[] = [
  'characters',
  'charactersNoSpaces',
  'words',
  'sentences',
  'paragraphs',
  'lines'
]

/**
 * Analisa um texto aplicando os filtros informados.
 * Sanitiza a entrada internamente para garantir segurança do resultado.
 */
export function analyzeText(rawText: string, filters: TextFilters): TextAnalysis {
  const original = sanitizeText(rawText)
  const processed = applyFilters(original, filters)
  const trimmed = processed.trim()

  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0
  const sentences = trimmed
    ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0)
    : 0
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0
  const lines = original ? original.split(/\n/).length : 0

  return {
    characters: processed.length,
    charactersNoSpaces: processed.replace(/\s/g, '').length,
    words,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes: words > 0 ? Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)) : 0,
    avgWordsPerSentence: sentences > 0 ? Math.round((words / sentences) * 10) / 10 : 0
  }
}

function diffMetric(a: number, b: number): MetricDiff {
  const diff = a - b
  const pct = b === 0 ? (a > 0 ? 100 : 0) : Math.round((diff / b) * 100)
  const direction: MetricDiff['direction'] = diff === 0 ? 'equal' : diff > 0 ? 'up' : 'down'
  return { a, b, diff, pct, direction }
}

/**
 * Compara duas análises métrica a métrica.
 * `identical` só é verdadeiro quando todas as métricas comparáveis coincidem.
 */
export function compareAnalyses(a: TextAnalysis, b: TextAnalysis): ComparisonResult {
  const metrics = {} as Record<MetricKey, MetricDiff>
  let identical = true

  for (const key of COMPARABLE_METRICS) {
    const result = diffMetric(a[key], b[key])
    metrics[key] = result
    if (result.diff !== 0) identical = false
  }

  return { identical, metrics }
}
