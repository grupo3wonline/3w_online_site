import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { useHistoryStore } from './history'

function novoRegistro(overrides = {}) {
  return {
    altura: 1.75,
    peso: 70,
    idade: 30,
    sexo: 'male' as const,
    imc: 22.9,
    categoria: 'Peso normal',
    ...overrides,
  }
}

describe('useHistoryStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('começa vazio', () => {
    const store = useHistoryStore()
    expect(store.isEmpty).toBe(true)
    expect(store.count).toBe(0)
  })

  it('adiciona um registro com id e data gerados', () => {
    const store = useHistoryStore()
    store.add(novoRegistro())
    expect(store.count).toBe(1)
    const entry = store.entries[0]
    expect(entry.id).toBeTruthy()
    expect(entry.data).toBeTruthy()
    expect(entry.imc).toBe(22.9)
    expect(entry.categoria).toBe('Peso normal')
  })

  it('coloca o registro mais recente primeiro', () => {
    const store = useHistoryStore()
    store.add(novoRegistro({ categoria: 'Primeiro' }))
    store.add(novoRegistro({ categoria: 'Segundo' }))
    expect(store.entries[0].categoria).toBe('Segundo')
    expect(store.entries[1].categoria).toBe('Primeiro')
  })

  it('remove um registro por id', () => {
    const store = useHistoryStore()
    store.add(novoRegistro())
    const id = store.entries[0].id
    store.remove(id)
    expect(store.count).toBe(0)
  })

  it('limpa todo o histórico', () => {
    const store = useHistoryStore()
    store.add(novoRegistro())
    store.add(novoRegistro())
    store.clear()
    expect(store.isEmpty).toBe(true)
  })

  it('persiste no localStorage', async () => {
    const store = useHistoryStore()
    store.add(novoRegistro())
    // useStorage (VueUse) grava de forma assíncrona no flush do watcher
    await nextTick()
    const raw = localStorage.getItem('imc-history')
    expect(raw).toBeTruthy()
    expect(JSON.parse(raw as string)).toHaveLength(1)
  })

  it('limita a 50 itens', () => {
    const store = useHistoryStore()
    for (let i = 0; i < 55; i++) store.add(novoRegistro({ peso: i }))
    expect(store.count).toBe(50)
  })
})
