import { describe, it, expect } from 'vitest'
import router from './index'

/**
 * Testes de navegação/fluxo de rotas.
 * Garante que todas as rotas registradas resolvem para um componente
 * e que rotas inexistentes caem no NotFound (404).
 */
describe('router', () => {
  const routes = router.getRoutes()

  it('registra as rotas principais', () => {
    const names = routes.map((r) => r.name)
    expect(names).toContain('Home')
    expect(names).toContain('Calculadoras')
    expect(names).toContain('Sobre')
    expect(names).toContain('Contato')
    expect(names).toContain('NotFound')
  })

  it('registra as 19 calculadoras', () => {
    const calcRoutes = routes.filter((r) => r.path.startsWith('/calculadora-'))
    expect(calcRoutes.length).toBe(19)
  })

  it('toda rota nomeada possui componente carregável', () => {
    for (const route of routes) {
      const comp = route.components?.default
      expect(comp, `rota ${route.path} sem componente`).toBeTruthy()
    }
  })

  it('usa base path /calculadora_empresarial/', () => {
    expect(router.options.history.base).toBe('/calculadora_empresarial')
  })

  it('resolve rota desconhecida para NotFound', () => {
    const resolved = router.resolve('/rota-que-nao-existe-123')
    expect(resolved.name).toBe('NotFound')
  })

  it('resolve a home', () => {
    expect(router.resolve('/').name).toBe('Home')
  })
})
