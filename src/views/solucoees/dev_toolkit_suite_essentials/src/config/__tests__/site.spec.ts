import { describe, it, expect } from 'vitest'
import { TOOLS, COMPANY, NAV_LINKS } from '../site'

describe('config/site', () => {
  it('define as 9 ferramentas', () => {
    expect(TOOLS).toHaveLength(9)
  })

  it('cada ferramenta tem os campos obrigatórios', () => {
    for (const t of TOOLS) {
      expect(t.slug).toBeTruthy()
      expect(t.path.startsWith('/')).toBe(true)
      expect(t.title).toBeTruthy()
      expect(t.icon).toBeTruthy()
      expect(t.keywords).toBeTruthy()
    }
  })

  it('slugs das ferramentas são únicos', () => {
    const slugs = TOOLS.map((t) => t.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('dados da empresa desenvolvedora corretos', () => {
    expect(COMPANY.developer).toBe('HOTWYL | WILLFROMBRASIL')
    expect(COMPANY.email).toBe('contato@3wonline.com.br')
    expect(COMPANY.whatsapp).toBe('(41) 99692-4829')
    expect(COMPANY.site).toContain('3wonline.com.br')
  })

  it('navegação principal não está vazia', () => {
    expect(NAV_LINKS.length).toBeGreaterThan(0)
  })
})
