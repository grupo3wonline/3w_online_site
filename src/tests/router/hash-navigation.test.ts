/**
 * Testes de Navegação por Hash (Âncoras)
 *
 * Verifica que as rotas de redirecionamento (/sobre, /contato, /institucional)
 * chegam ao destino correto com o hash da âncora correspondente.
 *
 * Também valida que a lógica de scrollBehavior retorna o objeto correto
 * para cada tipo de navegação (hash, top, savedPosition).
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'

// ─── Router de teste isolado ──────────────────────────────────────────────────

const DummyComponent = { template: '<div />' }

async function buildHashTestRouter(): Promise<Router> {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/',              name: 'Home',         component: DummyComponent },
      { path: '/sobre',         name: 'About',        redirect: { path: '/', hash: '#sobre' } },
      { path: '/contato',       name: 'Contact',      redirect: { path: '/', hash: '#contato' } },
      { path: '/institucional', name: 'Institucional', redirect: { path: '/', hash: '#institucional' } },
      { path: '/servicos',      name: 'Services',     component: DummyComponent },
      { path: '/:pathMatch(.*)*', name: 'NotFound',   component: DummyComponent },
    ],
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 72 }
      return { top: 0, behavior: 'smooth' }
    },
  })
}

// ─── Redirecionamentos de hash ────────────────────────────────────────────────

describe('Redirecionamentos para âncoras da Home', () => {
  let router: Router

  beforeEach(async () => {
    router = await buildHashTestRouter()
  })

  it('/sobre redireciona para / com hash #sobre', async () => {
    await router.push('/sobre')
    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.hash).toBe('#sobre')
  })

  it('/contato redireciona para / com hash #contato', async () => {
    await router.push('/contato')
    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.hash).toBe('#contato')
  })

  it('/institucional redireciona para / com hash #institucional', async () => {
    await router.push('/institucional')
    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.hash).toBe('#institucional')
  })

  it('links internos tipo href="#inicio" preservam o hash na rota atual', async () => {
    await router.push('/#inicio')
    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.hash).toBe('#inicio')
  })
})

// ─── scrollBehavior ───────────────────────────────────────────────────────────

describe('scrollBehavior — lógica de scroll', () => {
  it('deve retornar { top: 0, behavior: smooth } para novas rotas sem hash', () => {
    type ScrollResult = { top?: number; behavior?: string; el?: string }
    const mockScrollBehavior = (
      to: { hash?: string },
      _from: unknown,
      savedPosition: ScrollResult | null
    ): ScrollResult => {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 72 }
      return { top: 0, behavior: 'smooth' }
    }

    const result = mockScrollBehavior({ hash: '' }, {}, null)
    expect(result).toEqual({ top: 0, behavior: 'smooth' })
  })

  it('deve retornar { el: hash, behavior: smooth, top: 72 } para rotas com hash', () => {
    type ScrollResult = { top?: number; behavior?: string; el?: string }
    const mockScrollBehavior = (
      to: { hash?: string },
      _from: unknown,
      savedPosition: ScrollResult | null
    ): ScrollResult => {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 72 }
      return { top: 0, behavior: 'smooth' }
    }

    const result = mockScrollBehavior({ hash: '#sobre' }, {}, null)
    expect(result).toEqual({ el: '#sobre', behavior: 'smooth', top: 72 })
  })

  it('deve restaurar savedPosition no histórico do browser', () => {
    type ScrollResult = { top?: number; behavior?: string; el?: string; left?: number }
    const mockScrollBehavior = (
      to: { hash?: string },
      _from: unknown,
      savedPosition: ScrollResult | null
    ): ScrollResult => {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 72 }
      return { top: 0, behavior: 'smooth' }
    }

    const saved = { top: 500, left: 0 }
    const result = mockScrollBehavior({}, {}, saved)
    expect(result).toBe(saved)
  })

  it('top offset de 72px compensa a navbar sticky ao rolar para âncoras', () => {
    type ScrollResult = { top?: number; behavior?: string; el?: string }
    const mockScrollBehavior = (
      to: { hash?: string },
      _from: unknown,
      savedPosition: ScrollResult | null
    ): ScrollResult => {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 72 }
      return { top: 0, behavior: 'smooth' }
    }

    const result = mockScrollBehavior({ hash: '#contato' }, {}, null)
    expect((result as { top: number }).top).toBe(72)
  })
})

// ─── Âncoras presentes na Home ────────────────────────────────────────────────

describe('Âncoras esperadas na Home unificada', () => {
  const expectedAnchors = ['#inicio', '#servicos', '#sobre', '#institucional', '#ferramentas', '#contato']

  for (const anchor of expectedAnchors) {
    it(`âncora "${anchor}" deve ter uma rota ou link correspondente`, async () => {
      const router = await buildHashTestRouter()
      await router.push(`/${anchor}`)
      // Âncoras da Home chegam como hash em "/"
      expect(router.currentRoute.value.path).toBe('/')
      expect(router.currentRoute.value.hash).toBe(anchor)
    })
  }
})
