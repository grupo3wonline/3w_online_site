/**
 * Validation utilities for input sanitization and validation
 */

export interface ValidationRule {
  validator: (value: string) => boolean
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

/**
 * Validate if text has minimum length
 */
export function minLength(min: number): ValidationRule {
  return {
    validator: (value: string) => value.length >= min,
    message: `O texto deve ter no mínimo ${min} caracteres`,
  }
}

/**
 * Validate if text has maximum length
 */
export function maxLength(max: number): ValidationRule {
  return {
    validator: (value: string) => value.length <= max,
    message: `O texto deve ter no máximo ${max} caracteres`,
  }
}

/**
 * Validate if text is not empty
 */
export function required(): ValidationRule {
  return {
    validator: (value: string) => value.trim().length > 0,
    message: 'Este campo é obrigatório',
  }
}

/**
 * Validate email format
 */
export function email(): ValidationRule {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return {
    validator: (value: string) => emailRegex.test(value),
    message: 'Por favor, insira um e-mail válido',
  }
}

/**
 * Validate if text contains only alphanumeric characters
 */
export function alphanumeric(): ValidationRule {
  const alphanumericRegex = /^[a-zA-Z0-9\s]+$/
  return {
    validator: (value: string) => alphanumericRegex.test(value),
    message: 'O texto deve conter apenas letras e números',
  }
}

/**
 * Validate minimum word count
 */
export function minWords(min: number): ValidationRule {
  return {
    validator: (value: string) => {
      const words = value.trim().split(/\s+/).filter(Boolean)
      return words.length >= min
    },
    message: `O texto deve ter no mínimo ${min} palavras`,
  }
}

/**
 * Validate maximum word count
 */
export function maxWords(max: number): ValidationRule {
  return {
    validator: (value: string) => {
      const words = value.trim().split(/\s+/).filter(Boolean)
      return words.length <= max
    },
    message: `O texto deve ter no máximo ${max} palavras`,
  }
}

/**
 * Validate text against multiple rules
 */
export function validate(value: string, rules: ValidationRule[]): ValidationResult {
  const errors: string[] = []

  for (const rule of rules) {
    if (!rule.validator(value)) {
      errors.push(rule.message)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Sanitize HTML to prevent XSS attacks (basic version)
 */
export function sanitizeHTML(html: string): string {
  const div = document.createElement('div')
  div.textContent = html
  return div.innerHTML
}

/**
 * Escape special characters for regex
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Check if string contains potentially dangerous content
 */
export function containsDangerousContent(str: string): boolean {
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ]

  return dangerousPatterns.some(pattern => pattern.test(str))
}

/**
 * Remove dangerous content from string
 */
export function removeDangerousContent(str: string): string {
  let cleaned = str

  // Remove script tags
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  
  // Remove javascript: protocol
  cleaned = cleaned.replace(/javascript:/gi, '')
  
  // Remove event handlers
  cleaned = cleaned.replace(/on\w+\s*=/gi, '')
  
  // Remove iframe, object, embed tags
  cleaned = cleaned.replace(/<(iframe|object|embed)[^>]*>/gi, '')

  return cleaned
}

/**
 * Validate file size
 */
export function validateFileSize(size: number, maxSizeMB: number = 10): ValidationResult {
  const maxBytes = maxSizeMB * 1024 * 1024
  const valid = size <= maxBytes

  return {
    valid,
    errors: valid ? [] : [`O arquivo deve ter no máximo ${maxSizeMB}MB`],
  }
}

/**
 * Validate file type
 */
export function validateFileType(filename: string, allowedTypes: string[]): ValidationResult {
  const extension = filename.split('.').pop()?.toLowerCase()
  const valid = extension ? allowedTypes.includes(extension) : false

  return {
    valid,
    errors: valid ? [] : [`Tipo de arquivo não permitido. Use: ${allowedTypes.join(', ')}`],
  }
}
