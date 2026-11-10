import { describe, it, expect } from 'vitest'
import { analyzeText, compareAnalyses, COMPARABLE_METRICS } from './analyzer'
import { sanitizeText, applyFilters, MAX_TEXT_LENGTH } from './sanitize'
import { DEFAULT_FILTERS } from './types'

const noFilters = { ...DEFAULT_FILTERS }

describe('sanitizeText', () => {
  it('retorna string vazia para entrada vazia', () => {
    expect(sanitizeText('')).toBe('')
  })

  it('corta no limite máximo de caracteres', () => {
    const huge = 'a'.repeat(MAX_TEXT_LENGTH + 100)
    expect(sanitizeText(huge).length).toBe(MAX_TEXT_LENGTH)
  })

  it('remove caracteres de controle mas preserva quebras de linha e tabs', () => {
    expect(sanitizeText('a\u0000b\tc\nd')).toBe('ab\tc\nd')
  })
})

describe('applyFilters', () => {
  it('ignora espaços', () => {
    expect(applyFilters('a b c', { ...noFilters, ignoreSpaces: true })).toBe('abc')
  })

  it('ignora pontuação preservando acentos', () => {
    expect(applyFilters('olá, mundo!', { ...noFilters, ignorePunctuation: true })).toBe('olá mundo')
  })

  it('ignora números', () => {
    expect(applyFilters('abc123', { ...noFilters, ignoreNumbers: true })).toBe('abc')
  })

  it('combina múltiplos filtros', () => {
    const out = applyFilters('a1, b2!', {
      ignoreSpaces: true,
      ignorePunctuation: true,
      ignoreNumbers: true
    })
    expect(out).toBe('ab')
  })
})

describe('analyzeText', () => {
  it('conta métricas básicas corretamente', () => {
    const r = analyzeText('O rápido raposo pula. O cão dorme.', noFilters)
    expect(r.words).toBe(7)
    expect(r.sentences).toBe(2)
    expect(r.characters).toBe(34)
  })

  it('retorna zeros para texto vazio', () => {
    const r = analyzeText('', noFilters)
    expect(r).toMatchObject({ characters: 0, words: 0, sentences: 0, paragraphs: 0, lines: 0 })
  })

  it('conta parágrafos separados por linha em branco', () => {
    const r = analyzeText('Parágrafo um.\n\nParágrafo dois.', noFilters)
    expect(r.paragraphs).toBe(2)
  })

  it('conta linhas usando o texto original (sem filtros)', () => {
    const r = analyzeText('linha1\nlinha2\nlinha3', { ...noFilters, ignoreSpaces: true })
    expect(r.lines).toBe(3)
  })

  it('estima tempo de leitura e média de palavras por sentença', () => {
    const text = Array.from({ length: 400 }, () => 'palavra').join(' ') + '.'
    const r = analyzeText(text, noFilters)
    expect(r.readingTimeMinutes).toBe(2)
    expect(r.avgWordsPerSentence).toBe(400)
  })
})

describe('compareAnalyses', () => {
  it('detecta textos idênticos', () => {
    const a = analyzeText('mesmo texto aqui.', noFilters)
    const b = analyzeText('mesmo texto aqui.', noFilters)
    const c = compareAnalyses(a, b)
    expect(c.identical).toBe(true)
    for (const key of COMPARABLE_METRICS) {
      expect(c.metrics[key].direction).toBe('equal')
    }
  })

  it('calcula diferença e direção quando A tem mais palavras', () => {
    const a = analyzeText('uma duas tres quatro.', noFilters)
    const b = analyzeText('uma duas.', noFilters)
    const c = compareAnalyses(a, b)
    expect(c.identical).toBe(false)
    expect(c.metrics.words.diff).toBe(2)
    expect(c.metrics.words.direction).toBe('up')
  })

  it('trata divisão por zero no percentual', () => {
    const a = analyzeText('texto aqui.', noFilters)
    const b = analyzeText('', noFilters)
    const c = compareAnalyses(a, b)
    expect(c.metrics.words.pct).toBe(100)
  })
})
