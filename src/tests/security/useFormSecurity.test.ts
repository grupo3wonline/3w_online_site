/**
 * Testes de useFormSecurity — sanitização XSS/injeção e guard de submissão.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useFormSecurity } from '@/composables/useFormSecurity'

describe('useFormSecurity — sanitizeText', () => {
  it('retorna texto puro sem tags HTML', () => {
    const { sanitizeText } = useFormSecurity()
    expect(sanitizeText('<b>Olá</b>')).toBe('Olá')
  })

  it('remove script tags (XSS básico)', () => {
    const { sanitizeText } = useFormSecurity()
    const result = sanitizeText('<script>alert("xss")</script>Texto')
    expect(result).not.toContain('<script>')
    expect(result).toContain('Texto')
  })

  it('remove atributos event handler (XSS via onerror)', () => {
    const { sanitizeText } = useFormSecurity()
    const result = sanitizeText('<img src=x onerror=alert(1)>')
    expect(result).not.toContain('onerror')
    expect(result).not.toContain('<img')
  })

  it('retorna string vazia para valor vazio', () => {
    const { sanitizeText } = useFormSecurity()
    expect(sanitizeText('')).toBe('')
  })

  it('preserva texto normal sem alterações', () => {
    const { sanitizeText } = useFormSecurity()
    const text = 'Olá, preciso de um site profissional para minha empresa!'
    expect(sanitizeText(text)).toBe(text)
  })

  it('faz trim do espaço em branco nas bordas', () => {
    const { sanitizeText } = useFormSecurity()
    expect(sanitizeText('  Carlos Silva  ')).toBe('Carlos Silva')
  })
})

describe('useFormSecurity — sanitizeHtml', () => {
  it('permite tags seguras: b, i, em, strong, br, p', () => {
    const { sanitizeHtml } = useFormSecurity()
    const html = '<b>Negrito</b> <em>itálico</em> <p>parágrafo</p>'
    expect(sanitizeHtml(html)).toContain('<b>Negrito</b>')
    expect(sanitizeHtml(html)).toContain('<em>itálico</em>')
  })

  it('remove tags não permitidas (script, div, span)', () => {
    const { sanitizeHtml } = useFormSecurity()
    expect(sanitizeHtml('<div>conteúdo</div>')).not.toContain('<div>')
    expect(sanitizeHtml('<script>xss</script>')).not.toContain('<script>')
  })
})

describe('useFormSecurity — looksLikeInjection', () => {
  it('detecta DROP TABLE (SQL injection)', () => {
    const { looksLikeInjection } = useFormSecurity()
    expect(looksLikeInjection("'; DROP TABLE users; --")).toBe(true)
  })

  it('detecta SELECT (SQL injection)', () => {
    const { looksLikeInjection } = useFormSecurity()
    expect(looksLikeInjection('SELECT * FROM users')).toBe(true)
  })

  it('detecta script tag (XSS)', () => {
    const { looksLikeInjection } = useFormSecurity()
    expect(looksLikeInjection('<script>alert(1)</script>')).toBe(true)
  })

  it('detecta javascript: (XSS via URL)', () => {
    const { looksLikeInjection } = useFormSecurity()
    expect(looksLikeInjection('javascript:void(0)')).toBe(true)
  })

  it('detecta template injection ({{ }})', () => {
    const { looksLikeInjection } = useFormSecurity()
    expect(looksLikeInjection('{{7*7}}')).toBe(true)
  })

  it('detecta path traversal (../)', () => {
    const { looksLikeInjection } = useFormSecurity()
    expect(looksLikeInjection('../../etc/passwd')).toBe(true)
  })

  it('não detecta texto normal como injeção', () => {
    const { looksLikeInjection } = useFormSecurity()
    expect(looksLikeInjection('Olá, preciso de um site')).toBe(false)
    expect(looksLikeInjection('carlos@empresa.com.br')).toBe(false)
    expect(looksLikeInjection('(41) 99999-9999')).toBe(false)
  })
})

describe('useFormSecurity — sanitizeFormData', () => {
  it('sanitiza todos os campos string do formulário', () => {
    const { sanitizeFormData } = useFormSecurity()
    const form = {
      name: '<b>Carlos</b>',
      email: 'carlos@empresa.com',
      message: '<script>xss</script>Mensagem',
      count: 3,
    }
    const sanitized = sanitizeFormData(form)
    expect(sanitized.name).toBe('Carlos')
    expect(sanitized.email).toBe('carlos@empresa.com')
    expect(sanitized.message).toBe('Mensagem')
    expect(sanitized.count).toBe(3) // número não é alterado
  })
})

describe('useFormSecurity — detectInjectionAttempt', () => {
  it('retorna campos suspeitos quando há injeção', () => {
    const { detectInjectionAttempt } = useFormSecurity()
    const form = {
      name: 'Carlos',
      email: "' OR '1'='1",
      message: 'texto normal',
    }
    const suspicious = detectInjectionAttempt(form)
    expect(suspicious).toContain('email')
    expect(suspicious).not.toContain('name')
    expect(suspicious).not.toContain('message')
  })

  it('retorna array vazio para dados limpos', () => {
    const { detectInjectionAttempt } = useFormSecurity()
    const form = { name: 'Carlos', email: 'carlos@test.com', message: 'Olá!' }
    expect(detectInjectionAttempt(form)).toHaveLength(0)
  })
})

describe('useFormSecurity — useSubmitGuard (cooldown de sessão)', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    sessionStorage.clear()
  })

  it('wasSubmittedRecently() retorna false se nunca enviado', () => {
    const { useSubmitGuard } = useFormSecurity()
    const { wasSubmittedRecently } = useSubmitGuard('test-form')
    expect(wasSubmittedRecently()).toBe(false)
  })

  it('wasSubmittedRecently() retorna true logo após markAsSubmitted()', () => {
    const { useSubmitGuard } = useFormSecurity()
    const { wasSubmittedRecently, markAsSubmitted } = useSubmitGuard('test-form')
    markAsSubmitted()
    expect(wasSubmittedRecently()).toBe(true)
  })

  it('wasSubmittedRecently() retorna false após o cooldown expirar', () => {
    const { useSubmitGuard } = useFormSecurity()
    const { wasSubmittedRecently, markAsSubmitted } = useSubmitGuard('test-form')
    markAsSubmitted()
    // Avança 16 segundos (além do cooldown de 15s)
    vi.advanceTimersByTime(16_000)
    expect(wasSubmittedRecently()).toBe(false)
  })

  it('clearSubmitMark() remove o cooldown imediatamente', () => {
    const { useSubmitGuard } = useFormSecurity()
    const { wasSubmittedRecently, markAsSubmitted, clearSubmitMark } = useSubmitGuard('test-form')
    markAsSubmitted()
    clearSubmitMark()
    expect(wasSubmittedRecently()).toBe(false)
  })

  it('formulários diferentes têm cooldowns independentes', () => {
    const { useSubmitGuard } = useFormSecurity()
    const guardA = useSubmitGuard('form-a')
    const guardB = useSubmitGuard('form-b')

    guardA.markAsSubmitted()

    expect(guardA.wasSubmittedRecently()).toBe(true)
    expect(guardB.wasSubmittedRecently()).toBe(false)
  })

  it('isSubmitting começa como false', () => {
    const { useSubmitGuard } = useFormSecurity()
    const { isSubmitting } = useSubmitGuard('test-form')
    expect(isSubmitting.value).toBe(false)
  })
})
