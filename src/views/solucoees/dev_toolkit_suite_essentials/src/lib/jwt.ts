/**
 * Decodificação de JWT (JSON Web Token) — apenas leitura de header e payload.
 * NÃO verifica a assinatura (isso exige a chave secreta/pública no servidor).
 * Todo o processamento é local, no navegador.
 */

export interface DecodedJwt {
  header: Record<string, unknown>
  payload: Record<string, unknown>
  signature: string
  expiresAt: Date | null
  issuedAt: Date | null
  isExpired: boolean
}

function base64UrlDecode(input: string): string {
  // base64url -> base64
  let b64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = b64.length % 4
  if (pad) b64 += '='.repeat(4 - pad)
  const decoded = atob(b64)
  // Trata UTF-8
  try {
    return decodeURIComponent(
      Array.from(decoded, (c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
    )
  } catch {
    return decoded
  }
}

export function decodeJwt(token: string): DecodedJwt {
  const parts = token.trim().split('.')
  if (parts.length !== 3) {
    throw new Error('Token JWT inválido: são esperadas 3 partes separadas por ponto.')
  }

  const header = JSON.parse(base64UrlDecode(parts[0])) as Record<string, unknown>
  const payload = JSON.parse(base64UrlDecode(parts[1])) as Record<string, unknown>

  const exp = typeof payload.exp === 'number' ? new Date(payload.exp * 1000) : null
  const iat = typeof payload.iat === 'number' ? new Date(payload.iat * 1000) : null

  return {
    header,
    payload,
    signature: parts[2],
    expiresAt: exp,
    issuedAt: iat,
    isExpired: exp ? exp.getTime() < Date.now() : false,
  }
}
