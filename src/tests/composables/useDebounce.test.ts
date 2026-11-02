import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce } from '@/composables/useDebounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('não dispara antes do delay expirar', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn()
    vi.advanceTimersByTime(299)

    expect(fn).not.toHaveBeenCalled()
  })

  it('dispara após avançar o timer pelo delay completo', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn()
    vi.advanceTimersByTime(300)

    expect(fn).toHaveBeenCalledOnce()
  })

  it('chamadas repetidas reiniciam o contador e disparam apenas uma vez', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn()
    vi.advanceTimersByTime(150)
    debouncedFn()
    vi.advanceTimersByTime(150)

    // Ainda não deve ter disparado (reset aconteceu no meio)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(150)

    // Agora disparou exatamente uma vez
    expect(fn).toHaveBeenCalledOnce()
  })
})
