import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useHoneypot } from '@/composables/useHoneypot'
import { useCSRFToken } from '@/composables/useCSRFToken'
import { debounce } from '@/composables/useDebounce'

describe('Segurança de Formulários', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('(a) submit é bloqueado quando isBot.value é true (honeypot preenchido)', () => {
    const { hpField, isBot } = useHoneypot()
    const submitFn = vi.fn()

    hpField.value = 'preenchido-por-bot'

    // Simulação do guard que deve existir antes de qualquer submit
    const guardedSubmit = (): void => {
      if (!isBot.value) {
        submitFn()
      }
    }

    guardedSubmit()

    expect(submitFn).not.toHaveBeenCalled()
  })

  it('(b) debounce previne segunda chamada disparada dentro do delay', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn()
    debouncedFn() // segunda chamada dentro do delay → reinicia o timer

    vi.advanceTimersByTime(300)

    // Apenas uma chamada deve ter ocorrido
    expect(fn).toHaveBeenCalledOnce()
  })

  it('(c) validateToken() retorna false para token incorreto', () => {
    const { getToken, validateToken } = useCSRFToken()
    getToken() // persiste o token real no localStorage

    expect(validateToken('token-forjado-pelo-atacante')).toBe(false)
  })
})
