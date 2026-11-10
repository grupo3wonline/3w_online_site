/**
 * Utilitários de Sanitização
 * Funções para limpar e sanitizar entradas de usuário
 */

/**
 * Sanitiza string removendo caracteres perigosos
 * @param {string} str - String a ser sanitizada
 * @returns {string} - String sanitizada
 */
export const sanitizeString = (str) => {
  if (!str || typeof str !== 'string') return ''
  
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers (onclick=, onload=, etc)
    .slice(0, 1000) // Limita tamanho
}

/**
 * Sanitiza HTML removendo tags e scripts
 * @param {string} html - HTML a ser sanitizado
 * @returns {string} - Texto sem HTML
 */
export const sanitizeHTML = (html) => {
  if (!html || typeof html !== 'string') return ''
  
  const div = document.createElement('div')
  div.textContent = html
  return div.innerHTML
}

/**
 * Sanitiza URL removendo protocolos perigosos
 * @param {string} url - URL a ser sanitizada
 * @returns {string} - URL sanitizada ou string vazia se inválida
 */
export const sanitizeUrl = (url) => {
  if (!url || typeof url !== 'string') return ''
  
  const trimmed = url.trim()
  
  // Remove protocolos perigosos
  const dangerousProtocols = [
    'javascript:',
    'data:',
    'vbscript:',
    'file:',
    'about:'
  ]
  
  const lowerUrl = trimmed.toLowerCase()
  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return ''
    }
  }
  
  // Só permite http e https
  try {
    const urlObj = new URL(trimmed)
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return ''
    }
    return urlObj.href
  } catch {
    // Se não é URL válida, retorna vazio
    return ''
  }
}

/**
 * Sanitiza nome de arquivo
 * @param {string} filename - Nome do arquivo
 * @returns {string} - Nome sanitizado
 */
export const sanitizeFilename = (filename) => {
  if (!filename || typeof filename !== 'string') return 'download'
  
  return filename
    .trim()
    .replace(/[<>:"|?*\x00-\x1F]/g, '') // Remove caracteres inválidos
    .replace(/^\.+/, '') // Remove pontos iniciais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .slice(0, 200) // Limita tamanho
    || 'download'
}

/**
 * Sanitiza input de texto para prevenir XSS
 * @param {string} input - Input do usuário
 * @returns {string} - Input sanitizado
 */
export const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/[<>'"]/g, (char) => {
      const entities = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      }
      return entities[char] || char
    })
    .slice(0, 1000)
}

/**
 * Remove scripts e eventos de uma string
 * @param {string} str - String a ser limpa
 * @returns {string} - String sem scripts
 */
export const removeScripts = (str) => {
  if (!str || typeof str !== 'string') return ''
  
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
}

/**
 * Sanitiza objeto recursivamente
 * @param {object} obj - Objeto a ser sanitizado
 * @returns {object} - Objeto sanitizado
 */
export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return {}
  
  const sanitized = {}
  
  for (const [key, value] of Object.entries(obj)) {
    const sanitizedKey = sanitizeString(key)
    
    if (typeof value === 'string') {
      sanitized[sanitizedKey] = sanitizeString(value)
    } else if (typeof value === 'object' && value !== null) {
      sanitized[sanitizedKey] = sanitizeObject(value)
    } else {
      sanitized[sanitizedKey] = value
    }
  }
  
  return sanitized
}

/**
 * Escapa caracteres especiais para uso em RegExp
 * @param {string} str - String a ser escapada
 * @returns {string} - String com caracteres escapados
 */
export const escapeRegExp = (str) => {
  if (!str || typeof str !== 'string') return ''
  
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Limita tamanho de string
 * @param {string} str - String a ser limitada
 * @param {number} maxLength - Tamanho máximo
 * @returns {string} - String limitada
 */
export const truncate = (str, maxLength = 100) => {
  if (!str || typeof str !== 'string') return ''
  
  const trimmed = str.trim()
  if (trimmed.length <= maxLength) return trimmed
  
  return trimmed.slice(0, maxLength - 3) + '...'
}

/**
 * Remove espaços extras e normaliza
 * @param {string} str - String a ser normalizada
 * @returns {string} - String normalizada
 */
export const normalizeWhitespace = (str) => {
  if (!str || typeof str !== 'string') return ''
  
  return str
    .trim()
    .replace(/\s+/g, ' ')
}

export default {
  sanitizeString,
  sanitizeHTML,
  sanitizeUrl,
  sanitizeFilename,
  sanitizeInput,
  removeScripts,
  sanitizeObject,
  escapeRegExp,
  truncate,
  normalizeWhitespace
}
