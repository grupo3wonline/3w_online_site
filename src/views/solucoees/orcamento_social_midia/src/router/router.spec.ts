import { describe, expect, it } from 'vitest'
import router from './index'

describe('router', () => {
  const paths = router.getRoutes().map((r) => r.path)

  it('registra as páginas próprias', () => {
    expect(paths).toContain('/')
    expect(paths).toContain('/calculadora')
    expect(paths).toContain('/politica-privacidade')
    expect(paths).toContain('/termos-uso')
  })

  it('registra páginas de erro', () => {
    expect(paths).toContain('/403')
    expect(paths).toContain('/500')
  })

  it('possui rota catch-all para 404', () => {
    expect(paths.some((p) => p.includes('pathMatch'))).toBe(true)
  })

  it('mantém as páginas unificadas como redirecionamentos para seções da Home', () => {
    const expected: Record<string, string> = {
      '/sobre': '#sobre',
      '/servicos': '#servicos',
      '/ferramentas': '#ferramentas',
      '/contato': '#contato',
    }
    for (const [path, hash] of Object.entries(expected)) {
      const route = router.getRoutes().find((r) => r.path === path)
      expect(route?.redirect, `rota ${path}`).toEqual({ name: 'home', hash })
    }
  })

  it('usa base path do subdiretório', () => {
    expect(router.options.history.base).toBe('/orcamento_social_midia')
  })

  it('cada rota renderizável define título para SEO', () => {
    // Ignora rotas de redirecionamento (sem componente próprio)
    const renderable = router.getRoutes().filter((r) => r.components && !r.redirect)
    for (const route of renderable) {
      expect(route.meta.title, `rota ${route.path} sem title`).toBeTruthy()
    }
  })
})
