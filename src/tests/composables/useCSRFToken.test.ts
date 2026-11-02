import { describe, it, expect, beforeEach } from 'vitest'
import { useCSRFToken } from '@/composables/useCSRFToken'

describe('useCSRFToken', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('getToken() retorna string não-vazia', () => {
    const { getToken } = useCSRFToken()
    const token = getToken()

    expect(token).toBeTruthy()
    expect(typeof token).toBe('string')
    expect(token.length).toBeGreaterThan(0)
  })

  it('duas chamadas consecutivas retornam o mesmo token', () => {
    const { getToken } = useCSRFToken()
    const token1 = getToken()
    const token2 = getToken()

    expect(token1).toBe(token2)
  })

  it('validateToken() retorna true para o token correto', () => {
    const { getToken, validateToken } = useCSRFToken()
    const token = getToken()

    expect(validateToken(token)).toBe(true)
  })

  it('validateToken() retorna false para string diferente do token armazenado', () => {
    const { getToken, validateToken } = useCSRFToken()
    getToken() // garante que o token está no localStorage

    expect(validateToken('token-invalido-qualquer')).toBe(false)
  })
})
