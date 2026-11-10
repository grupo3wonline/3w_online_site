/**
 * Utilitários de Validação
 * Funções para validar entradas de usuário e URLs
 */

/**
 * Valida se uma string é uma URL válida do YouTube
 * @param {string} url - URL a ser validada
 * @returns {boolean} - true se válida, false caso contrário
 */
export const isValidYouTubeUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  
  try {
    const urlObj = new URL(url.trim())
    const hostname = urlObj.hostname.toLowerCase()
    
    // Aceita youtube.com, www.youtube.com, m.youtube.com, youtu.be
    const validHosts = [
      'youtube.com',
      'www.youtube.com',
      'm.youtube.com',
      'youtu.be'
    ]
    
    return validHosts.some(host => hostname === host || hostname.endsWith('.' + host))
  } catch {
    return false
  }
}

/**
 * Extrai o ID do vídeo de uma URL do YouTube
 * @param {string} url - URL do YouTube
 * @returns {string|null} - ID do vídeo ou null se inválido
 */
export const extractYouTubeVideoId = (url) => {
  if (!isValidYouTubeUrl(url)) return null
  
  try {
    const urlObj = new URL(url.trim())
    
    // Para youtu.be/VIDEO_ID
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1).split('?')[0]
    }
    
    // Para youtube.com/watch?v=VIDEO_ID
    const videoId = urlObj.searchParams.get('v')
    if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return videoId
    }
    
    // Para youtube.com/embed/VIDEO_ID
    const embedMatch = urlObj.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{11})/)
    if (embedMatch) {
      return embedMatch[1]
    }
    
    // Para youtube.com/v/VIDEO_ID
    const vMatch = urlObj.pathname.match(/^\/v\/([a-zA-Z0-9_-]{11})/)
    if (vMatch) {
      return vMatch[1]
    }
    
    return null
  } catch {
    return null
  }
}

/**
 * Valida formato de email
 * @param {string} email - Email a ser validado
 * @returns {boolean} - true se válido
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Valida string não-vazia
 * @param {string} str - String a ser validada
 * @param {number} minLength - Comprimento mínimo (padrão: 1)
 * @param {number} maxLength - Comprimento máximo (padrão: 1000)
 * @returns {boolean} - true se válida
 */
export const isValidString = (str, minLength = 1, maxLength = 1000) => {
  if (!str || typeof str !== 'string') return false
  
  const trimmed = str.trim()
  return trimmed.length >= minLength && trimmed.length <= maxLength
}

/**
 * Valida se uma URL é segura (HTTP/HTTPS apenas)
 * @param {string} url - URL a ser validada
 * @returns {boolean} - true se segura
 */
export const isSecureUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  
  try {
    const urlObj = new URL(url.trim())
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

/**
 * Valida nome de arquivo
 * @param {string} filename - Nome do arquivo
 * @returns {boolean} - true se válido
 */
export const isValidFilename = (filename) => {
  if (!filename || typeof filename !== 'string') return false
  
  // Não permite caracteres especiais perigosos
  const invalidChars = /[<>:"|?*\x00-\x1F]/
  const trimmed = filename.trim()
  
  return trimmed.length > 0 && 
         trimmed.length <= 255 && 
         !invalidChars.test(trimmed) &&
         !trimmed.startsWith('.') &&
         trimmed !== '.' &&
         trimmed !== '..'
}

/**
 * Valida número dentro de um range
 * @param {number} num - Número a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} - true se válido
 */
export const isValidNumber = (num, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  return typeof num === 'number' && 
         !isNaN(num) && 
         isFinite(num) && 
         num >= min && 
         num <= max
}

/**
 * Valida objeto não-vazio
 * @param {object} obj - Objeto a validar
 * @returns {boolean} - true se válido
 */
export const isValidObject = (obj) => {
  return obj !== null && 
         typeof obj === 'object' && 
         !Array.isArray(obj) &&
         Object.keys(obj).length > 0
}

export default {
  isValidYouTubeUrl,
  extractYouTubeVideoId,
  isValidEmail,
  isValidString,
  isSecureUrl,
  isValidFilename,
  isValidNumber,
  isValidObject
}
