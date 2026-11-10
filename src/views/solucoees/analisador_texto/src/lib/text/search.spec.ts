import { describe, it, expect } from 'vitest'
import { fuzzyFindWords } from './search'

describe('fuzzyFindWords', () => {
  it('retorna vazio para texto ou consulta vazios', () => {
    expect(fuzzyFindWords('', 'termo')).toEqual([])
    expect(fuzzyFindWords('algum texto', '')).toEqual([])
  })

  it('encontra correspondência exata', () => {
    const r = fuzzyFindWords('gato cachorro peixe', 'cachorro')
    expect(r.length).toBeGreaterThan(0)
    expect(r[0].word).toBe('cachorro')
  })

  it('encontra correspondência aproximada com erro de digitação', () => {
    const r = fuzzyFindWords('cachorro gato peixe', 'cachoro')
    expect(r.some((m) => m.word === 'cachorro')).toBe(true)
  })

  it('respeita o limite de resultados', () => {
    const text = Array.from({ length: 50 }, () => 'teste').join(' ')
    const r = fuzzyFindWords(text, 'teste', 5)
    expect(r.length).toBeLessThanOrEqual(5)
  })
})
