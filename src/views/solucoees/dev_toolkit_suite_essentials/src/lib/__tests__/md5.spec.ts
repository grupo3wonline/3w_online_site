import { describe, it, expect } from 'vitest'
import { md5 } from '../md5'

describe('md5', () => {
  it('gera o hash conhecido para string vazia', () => {
    expect(md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e')
  })

  it('gera o hash conhecido para "abc"', () => {
    expect(md5('abc')).toBe('900150983cd24fb0d6963f7d28e17f72')
  })

  it('gera o hash conhecido para a frase padrão RFC', () => {
    expect(md5('The quick brown fox jumps over the lazy dog')).toBe(
      '9e107d9d372bb6826bd81d3542a419d6'
    )
  })

  it('é determinístico (mesma entrada, mesmo hash)', () => {
    expect(md5('3w online')).toBe(md5('3w online'))
  })

  it('produz hashes diferentes para entradas diferentes', () => {
    expect(md5('a')).not.toBe(md5('b'))
  })

  it('suporta caracteres acentuados (UTF-8)', () => {
    expect(md5('ação')).toHaveLength(32)
  })
})
