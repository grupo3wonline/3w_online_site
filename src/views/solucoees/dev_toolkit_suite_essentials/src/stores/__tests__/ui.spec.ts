import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUiStore } from '../ui'

describe('useUiStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inicia sem carregamento', () => {
    const ui = useUiStore()
    expect(ui.loading).toBe(false)
  })

  it('ativa e desativa o carregamento', () => {
    const ui = useUiStore()
    ui.startLoading('Teste')
    expect(ui.loading).toBe(true)
    expect(ui.loadingText).toBe('Teste')
    ui.stopLoading()
    expect(ui.loading).toBe(false)
  })

  it('conta chamadas aninhadas (só desativa quando todas terminam)', () => {
    const ui = useUiStore()
    ui.startLoading()
    ui.startLoading()
    ui.stopLoading()
    expect(ui.loading).toBe(true)
    ui.stopLoading()
    expect(ui.loading).toBe(false)
  })

  it('withLoading executa a tarefa e limpa o estado', async () => {
    const ui = useUiStore()
    const result = await ui.withLoading(async () => 42)
    expect(result).toBe(42)
    expect(ui.loading).toBe(false)
  })

  it('withLoading limpa o estado mesmo em erro', async () => {
    const ui = useUiStore()
    await expect(
      ui.withLoading(async () => {
        throw new Error('falha')
      })
    ).rejects.toThrow('falha')
    expect(ui.loading).toBe(false)
  })
})
