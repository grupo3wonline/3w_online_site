/**
 * Composable de Segurança
 * Hooks e utilitários para segurança da aplicação
 */

import { ref, computed } from 'vue'
import { sanitizeString, sanitizeUrl, sanitizeInput } from '../utils/sanitize.js'
import { isValidYouTubeUrl } from '../utils/validation.js'

// Rate limiting simples (cliente)
const requestTimestamps = ref([])
const MAX_REQUESTS_PER_MINUTE = 30
const RATE_LIMIT_WINDOW = 60000 // 1 minuto

export function useSecurity() {
  /**
   * Verifica se o rate limit foi excedido
   * @returns {boolean} - true se dentro do limite
   */
  const checkRateLimit = () => {
    const now = Date.now()
    
    // Remove timestamps antigos (fora da janela)
    requestTimestamps.value = requestTimestamps.value.filter(
      timestamp => now - timestamp < RATE_LIMIT_WINDOW
    )
    
    // Verifica se excedeu o limite
    if (requestTimestamps.value.length >= MAX_REQUESTS_PER_MINUTE) {
      return false
    }
    
    // Adiciona novo timestamp
    requestTimestamps.value.push(now)
    return true
  }

  /**
   * Valida e sanitiza URL do YouTube
   * @param {string} url - URL a ser validada
   * @returns {object} - { isValid, sanitized, error }
   */
  const validateYouTubeUrl = (url) => {
    try {
      // Sanitiza primeiro
      const sanitized = sanitizeUrl(url)
      
      if (!sanitized) {
        return {
          isValid: false,
          sanitized: '',
          error: 'URL inválida ou contém caracteres perigosos'
        }
      }
      
      // Valida se é YouTube
      if (!isValidYouTubeUrl(sanitized)) {
        return {
          isValid: false,
          sanitized: '',
          error: 'Por favor, insira uma URL válida do YouTube'
        }
      }
      
      return {
        isValid: true,
        sanitized,
        error: null
      }
    } catch (error) {
      return {
        isValid: false,
        sanitized: '',
        error: 'Erro ao validar URL'
      }
    }
  }

  /**
   * Sanitiza input do usuário de forma segura
   * @param {string} input - Input a ser sanitizado
   * @returns {string} - Input sanitizado
   */
  const sanitizeUserInput = (input) => {
    return sanitizeInput(input)
  }

  /**
   * Previne ataques de clickjacking
   */
  const preventClickjacking = () => {
    // X-Frame-Options: DENY (via meta tag não funciona, mas documentamos)
    // Isso deve ser configurado no servidor
    if (window.self !== window.top) {
      console.warn('Possível tentativa de clickjacking detectada')
      window.top.location = window.self.location
    }
  }

  /**
   * Verifica se está em contexto seguro (HTTPS)
   * @returns {boolean} - true se seguro
   */
  const isSecureContext = computed(() => {
    return window.isSecureContext || 
           window.location.protocol === 'https:' ||
           window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1'
  })

  /**
   * Gera um nonce para CSP (Content Security Policy)
   * @returns {string} - Nonce aleatório
   */
  const generateNonce = () => {
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Valida origem de mensagens postMessage
   * @param {string} origin - Origem a ser validada
   * @param {array} allowedOrigins - Lista de origens permitidas
   * @returns {boolean} - true se permitida
   */
  const isAllowedOrigin = (origin, allowedOrigins = []) => {
    if (!origin) return false
    
    try {
      const originUrl = new URL(origin)
      return allowedOrigins.some(allowed => {
        const allowedUrl = new URL(allowed)
        return originUrl.origin === allowedUrl.origin
      })
    } catch {
      return false
    }
  }

  /**
   * Sanitiza dados antes de armazenar no localStorage
   * @param {string} key - Chave
   * @param {any} value - Valor
   * @returns {boolean} - true se armazenado com sucesso
   */
  const secureLocalStorageSet = (key, value) => {
    try {
      const sanitizedKey = sanitizeString(key)
      const sanitizedValue = typeof value === 'string' 
        ? sanitizeString(value) 
        : JSON.stringify(value)
      
      localStorage.setItem(sanitizedKey, sanitizedValue)
      return true
    } catch (error) {
      console.error('Erro ao armazenar no localStorage:', error)
      return false
    }
  }

  /**
   * Recupera dados do localStorage de forma segura
   * @param {string} key - Chave
   * @returns {any} - Valor ou null
   */
  const secureLocalStorageGet = (key) => {
    try {
      const sanitizedKey = sanitizeString(key)
      const value = localStorage.getItem(sanitizedKey)
      
      if (!value) return null
      
      try {
        return JSON.parse(value)
      } catch {
        return sanitizeString(value)
      }
    } catch (error) {
      console.error('Erro ao recuperar do localStorage:', error)
      return null
    }
  }

  /**
   * Remove dados do localStorage de forma segura
   * @param {string} key - Chave
   */
  const secureLocalStorageRemove = (key) => {
    try {
      const sanitizedKey = sanitizeString(key)
      localStorage.removeItem(sanitizedKey)
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error)
    }
  }

  /**
   * Limpa localStorage de forma segura
   */
  const secureLocalStorageClear = () => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error)
    }
  }

  /**
   * Verifica se há tentativa de injeção de código
   * @param {string} input - Input a ser verificado
   * @returns {boolean} - true se seguro
   */
  const isSafeInput = (input) => {
    if (!input || typeof input !== 'string') return true
    
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /eval\(/i,
      /expression\(/i
    ]
    
    return !dangerousPatterns.some(pattern => pattern.test(input))
  }

  /**
   * Log de segurança (apenas em desenvolvimento)
   * @param {string} message - Mensagem
   * @param {string} level - Nível (info, warn, error)
   */
  const securityLog = (message, level = 'info') => {
    if (import.meta.env.DEV) {
      console[level](`[Security] ${message}`)
    }
  }

  // Executa prevenção de clickjacking ao iniciar
  preventClickjacking()

  return {
    checkRateLimit,
    validateYouTubeUrl,
    sanitizeUserInput,
    preventClickjacking,
    isSecureContext,
    generateNonce,
    isAllowedOrigin,
    secureLocalStorageSet,
    secureLocalStorageGet,
    secureLocalStorageRemove,
    secureLocalStorageClear,
    isSafeInput,
    securityLog
  }
}

export default useSecurity
