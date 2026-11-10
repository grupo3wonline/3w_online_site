/**
 * Utilitários gerais da aplicação.
 * cn() combina classes condicionais sem dependências externas pesadas.
 */
type ClassValue = string | number | null | undefined | false | Record<string, boolean> | ClassValue[]

function toVal(mix: ClassValue): string {
  if (!mix) return ''
  if (typeof mix === 'string' || typeof mix === 'number') return String(mix)
  if (Array.isArray(mix)) return mix.map(toVal).filter(Boolean).join(' ')
  if (typeof mix === 'object') {
    return Object.keys(mix)
      .filter((k) => (mix as Record<string, boolean>)[k])
      .join(' ')
  }
  return ''
}

/** Junta classes CSS de forma condicional. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.map(toVal).filter(Boolean).join(' ')
}

/** Copia texto para a área de transferência com fallback seguro. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
    // Fallback para contextos não seguros
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

/** Aguarda um número de milissegundos (usado para simular processamento/UX de loading). */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Remove qualquer caractere que não seja dígito. */
export function onlyDigits(value: string): string {
  return value.replace(/\D+/g, '')
}
