import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLoadingStore } from './loading'

describe('useLoadingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inicia sem carregamento', () => {
    const store = useLoadingStore()
    expect(store.isLoading).toBe(false)
  })

  it('suporta requisições simultâneas via contador', () => {
    const store = useLoadingStore()
    store.start()
    store.start()
    expect(store.isLoading).toBe(true)
    store.stop()
    expect(store.isLoading).toBe(true) // ainda há 1 pendente
    store.stop()
    expect(store.isLoading).toBe(false)
  })

  it('não fica negativo ao chamar stop em excesso', () => {
    const store = useLoadingStore()
    store.stop()
    store.stop()
    expect(store.pending).toBe(0)
  })

  it('reset zera o contador', () => {
    const store = useLoadingStore()
    store.start()
    store.start()
    store.reset()
    expect(store.isLoading).toBe(false)
  })
})
