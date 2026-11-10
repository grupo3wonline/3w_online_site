/**
 * Busca aproximada (fuzzy) dentro de um texto, palavra a palavra, usando Fuse.js.
 * Útil para localizar termos com pequenas variações de digitação.
 */
import Fuse from 'fuse.js'

export interface WordMatch {
  word: string
  index: number
  score: number
}

interface IndexedWord {
  word: string
  index: number
}

/**
 * Retorna as ocorrências aproximadas de `query` nas palavras de `text`.
 * @param limit número máximo de resultados retornados.
 */
export function fuzzyFindWords(text: string, query: string, limit = 20): WordMatch[] {
  const trimmedQuery = query.trim()
  if (!text.trim() || !trimmedQuery) return []

  const words: IndexedWord[] = text
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => ({ word, index }))

  const fuse = new Fuse(words, {
    keys: ['word'],
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: Math.min(2, trimmedQuery.length)
  })

  return fuse
    .search(trimmedQuery, { limit })
    .map((r) => ({ word: r.item.word, index: r.item.index, score: r.score ?? 0 }))
}
