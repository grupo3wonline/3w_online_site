/**
 * Testes de useRequestGuard — evita requisições concorrentes e duplicate-submit.
 */
import { describe, it, expect, vi } from 'vitest'
import { useRequestGuard } from '@/composables/useRequestGuard'

describe('useRequestGuard — controle de concorrência', () => {
  it('pending começa como false', () => {
    const { pending } = useRequestGuard()
    expect(pending.value).toBe(false)
  })

  it('pending fica true durante a execução e false após', async () => {
    const { pending, run } = useRequestGuard()

    let resolvePromise!: () => void
    const longTask = () =>
      new Promise<void>((resolve) => {
        resolvePromise = resolve
      })

    const runPromise = run(longTask)

    // Durante a execução: pending deve ser true
    expect(pending.value).toBe(true)

    resolvePromise()
    await runPromise

    // Após conclusão: pending deve ser false
    expect(pending.value).toBe(false)
  })

  it('segunda chamada durante execução retorna undefined (bloqueada)', async () => {
    const { run } = useRequestGuard()

    let resolveFirst!: (v: string) => void
    const firstTask = () =>
      new Promise<string>((resolve) => {
        resolveFirst = resolve
      })

    const firstRun = run(firstTask)
    const secondRun = run(() => Promise.resolve('segunda'))

    // Segunda chamada bloqueada → undefined
    const secondResult = await secondRun
    expect(secondResult).toBeUndefined()

    resolveFirst('primeira')
    const firstResult = await firstRun
    expect(firstResult).toBe('primeira')
  })

  it('após conclusão, nova chamada é aceita normalmente', async () => {
    const { run } = useRequestGuard()

    await run(() => Promise.resolve('primeiro'))

    const result = await run(() => Promise.resolve('segundo'))
    expect(result).toBe('segundo')
  })

  it('reset() força pending para false (útil após erro externo)', async () => {
    const { pending, run, reset } = useRequestGuard()

    // Simula uma execução que "trava" para testar reset manual
    let resolveTask!: () => void
    const frozenTask = () =>
      new Promise<void>((r) => {
        resolveTask = r
      })

    run(frozenTask) // não awaita — deixa pendente

    expect(pending.value).toBe(true)

    reset()

    expect(pending.value).toBe(false)

    // Libera a promise para não vazar no teste
    resolveTask()
  })

  it('erros na fn são relançados e pending volta a false', async () => {
    const { pending, run } = useRequestGuard()

    await expect(
      run(async () => {
        throw new Error('erro-simulado')
      }),
    ).rejects.toThrow('erro-simulado')

    expect(pending.value).toBe(false)
  })

  it('AbortError silenciado — pending volta a false sem relançar', async () => {
    const { pending, run } = useRequestGuard()

    const abortError = new DOMException('Aborted', 'AbortError')

    const result = await run(async () => {
      throw abortError
    })

    expect(result).toBeUndefined()
    expect(pending.value).toBe(false)
  })

  it('duas instâncias de useRequestGuard são independentes', async () => {
    const guardA = useRequestGuard()
    const guardB = useRequestGuard()

    let resolveA!: () => void
    const frozenTask = () =>
      new Promise<void>((r) => {
        resolveA = r
      })

    guardA.run(frozenTask) // A em execução

    // B não deve ser afetado pelo estado de A
    expect(guardA.pending.value).toBe(true)
    expect(guardB.pending.value).toBe(false)

    resolveA()
  })
})
