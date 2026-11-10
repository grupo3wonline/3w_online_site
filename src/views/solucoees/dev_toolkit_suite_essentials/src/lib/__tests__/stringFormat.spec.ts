import { describe, it, expect } from 'vitest'
import { escapeString, unescapeString, toAscii, toUnicode, formatString } from '../stringFormat'

describe('stringFormat', () => {
  it('escapa nova linha e tab', () => {
    expect(escapeString('a\nb\tc')).toBe('a\\nb\\tc')
  })

  it('faz o inverso do escape', () => {
    expect(unescapeString('a\\nb\\tc')).toBe('a\nb\tc')
  })

  it('escape e unescape são simétricos', () => {
    const original = 'linha1\nlinha2\t"aspas"'
    expect(unescapeString(escapeString(original))).toBe(original)
  })

  it('converte para códigos ASCII', () => {
    expect(toAscii('AB')).toBe('65 66')
  })

  it('converte acentos para unicode escape', () => {
    expect(toUnicode('á')).toBe('\\u00e1')
    expect(toUnicode('a')).toBe('a')
  })

  it('formatString: text -> escaped', () => {
    expect(formatString('x\ny', 'text', 'escaped')).toBe('x\\ny')
  })

  it('formatString: escaped -> text', () => {
    expect(formatString('x\\ny', 'escaped', 'text')).toBe('x\ny')
  })
})
