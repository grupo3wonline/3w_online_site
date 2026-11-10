import { describe, it, expect } from 'vitest'
import { renderMarkdown } from '../markdown'

describe('renderMarkdown', () => {
  it('renderiza cabeçalhos', () => {
    expect(renderMarkdown('# Título')).toContain('<h1')
  })

  it('renderiza negrito e itálico', () => {
    const html = renderMarkdown('**forte** e *ênfase*')
    expect(html).toContain('<strong>forte</strong>')
    expect(html).toContain('<em>ênfase</em>')
  })

  it('retorna string vazia para entrada vazia', () => {
    expect(renderMarkdown('')).toBe('')
  })

  // --- Testes de segurança (anti-XSS) ---
  it('NÃO executa tags <script> injetadas', () => {
    const html = renderMarkdown('<script>alert("xss")</script>')
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('NÃO permite atributos de evento maliciosos (onerror)', () => {
    const html = renderMarkdown('<img src=x onerror="alert(1)">')
    expect(html).not.toMatch(/<img[^>]*onerror/i)
  })

  it('escapa iframes injetados', () => {
    const html = renderMarkdown('<iframe src="evil.com"></iframe>')
    expect(html).not.toContain('<iframe')
  })
})
