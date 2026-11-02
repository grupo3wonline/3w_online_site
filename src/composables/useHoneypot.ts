/**
 * useHoneypot — campo invisível ao usuário real.
 * Se preenchido, o envio provavelmente é de um bot.
 */
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'

export function useHoneypot(): {
  hpField: Ref<string>
  isBot: ComputedRef<boolean>
  resetHoneypot: () => void
} {
  const hpField: Ref<string> = ref('')

  /** Retorna true quando o campo honeypot foi preenchido (comportamento de bot). */
  const isBot: ComputedRef<boolean> = computed(() => hpField.value !== '')

  function resetHoneypot(): void {
    hpField.value = ''
  }

  return { hpField, isBot, resetHoneypot }
}
