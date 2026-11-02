import { describe, it, expect } from 'vitest'
import { useHoneypot } from '@/composables/useHoneypot'

describe('useHoneypot', () => {
  it('isBot.value é false quando hpField.value é string vazia', () => {
    const { hpField, isBot } = useHoneypot()
    hpField.value = ''

    expect(isBot.value).toBe(false)
  })

  it('isBot.value é true quando hpField.value contém qualquer string não-vazia', () => {
    const { hpField, isBot } = useHoneypot()
    hpField.value = 'preenchido-por-bot'

    expect(isBot.value).toBe(true)
  })

  it('resetHoneypot() volta hpField para "" e isBot para false', () => {
    const { hpField, isBot, resetHoneypot } = useHoneypot()

    hpField.value = 'bot'
    expect(isBot.value).toBe(true)

    resetHoneypot()

    expect(hpField.value).toBe('')
    expect(isBot.value).toBe(false)
  })
})
