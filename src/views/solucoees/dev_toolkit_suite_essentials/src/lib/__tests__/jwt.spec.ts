import { describe, it, expect } from 'vitest'
import { decodeJwt } from '../jwt'

// JWT de exemplo (HS256) — payload: sub=1234567890, name=John Doe, iat=1516239022
const SAMPLE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

describe('decodeJwt', () => {
  it('decodifica header e payload', () => {
    const d = decodeJwt(SAMPLE)
    expect(d.header.alg).toBe('HS256')
    expect(d.header.typ).toBe('JWT')
    expect(d.payload.sub).toBe('1234567890')
    expect(d.payload.name).toBe('John Doe')
  })

  it('extrai a data de emissão (iat)', () => {
    const d = decodeJwt(SAMPLE)
    expect(d.issuedAt).toBeInstanceOf(Date)
    expect(d.issuedAt?.getTime()).toBe(1516239022 * 1000)
  })

  it('detecta token expirado', () => {
    // exp no passado (2018)
    const payload = btoa(JSON.stringify({ exp: 1516239022 }))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
    const token = `eyJhbGciOiJIUzI1NiJ9.${payload}.sig`
    const d = decodeJwt(token)
    expect(d.isExpired).toBe(true)
  })

  it('lança erro para token malformado', () => {
    expect(() => decodeJwt('abc')).toThrow()
    expect(() => decodeJwt('a.b')).toThrow()
  })
})
