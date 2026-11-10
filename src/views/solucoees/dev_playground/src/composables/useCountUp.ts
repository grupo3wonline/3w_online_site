import { ref, type Ref } from 'vue'

/**
 * Anima um número de 0 até o valor alvo quando disparado (ex.: ao entrar na viewport).
 * Preserva sufixos/prefixos (ex.: "1.500+", "4.9/5").
 */
export function useCountUp(target: string, duration = 1500): { display: Ref<string>; start: () => void } {
  const display = ref('0')
  const match = target.match(/([\d.,]+)/)

  function start() {
    if (!match) {
      display.value = target
      return
    }
    const token = match[1]
    const numericStr = token.replace(/\./g, '').replace(',', '.')
    const end = parseFloat(numericStr)
    if (Number.isNaN(end)) {
      display.value = target
      return
    }
    const hasDecimal = /[.,]\d/.test(target) && !target.includes('+')
    const startTime = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = end * eased
      const formatted = hasDecimal
        ? current.toFixed(1)
        : Math.round(current).toLocaleString('pt-BR')
      display.value = target.replace(token, formatted)
      if (progress < 1) requestAnimationFrame(tick)
      else display.value = target
    }
    requestAnimationFrame(tick)
  }

  return { display, start }
}
