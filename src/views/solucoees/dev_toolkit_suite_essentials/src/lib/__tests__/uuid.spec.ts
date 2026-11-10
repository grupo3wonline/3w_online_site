import { describe, it, expect } from 'vitest'
import { uuidV4, uuidList, isUuid } from '../uuid'

describe('uuid', () => {
  it('gera um UUID v4 válido', () => {
    const u = uuidV4()
    expect(isUuid(u)).toBe(true)
    expect(u).toHaveLength(36)
  })

  it('marca a versão 4 corretamente', () => {
    expect(uuidV4()[14]).toBe('4')
  })

  it('gera UUIDs únicos', () => {
    const list = uuidList(50)
    expect(new Set(list).size).toBe(50)
  })

  it('respeita os limites de quantidade (1 a 100)', () => {
    expect(uuidList(0)).toHaveLength(1)
    expect(uuidList(999)).toHaveLength(100)
  })

  it('isUuid rejeita valores inválidos', () => {
    expect(isUuid('não-é-uuid')).toBe(false)
    expect(isUuid('')).toBe(false)
  })
})
