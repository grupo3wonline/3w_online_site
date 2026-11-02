/**
 * useDebounce — adia a execução de uma função até que o delay expire.
 * Impede chamadas duplicadas em sequência rápida (ex.: inputs, submits).
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>): void {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}
