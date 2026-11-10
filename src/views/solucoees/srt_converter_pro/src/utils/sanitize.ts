/**
 * String sanitization and formatting utilities
 */

/**
 * Sanitize user input by removing potentially dangerous content
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''

  let sanitized = input

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '')

  // Normalize whitespace
  sanitized = sanitized.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  // Trim excessive whitespace but preserve structure
  sanitized = sanitized.replace(/[ \t]+$/gm, '') // Remove trailing spaces on each line
  sanitized = sanitized.replace(/^\s+$/gm, '') // Remove lines with only whitespace

  // Remove dangerous HTML/Script tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  sanitized = sanitized.replace(/javascript:/gi, '')
  sanitized = sanitized.replace(/on\w+\s*=/gi, '')

  return sanitized
}

/**
 * Escape HTML special characters
 */
export function escapeHTML(str: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return str.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char])
}

/**
 * Unescape HTML special characters
 */
export function unescapeHTML(str: string): string {
  const htmlUnescapeMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
  }

  return str.replace(/&(?:amp|lt|gt|quot|#x27|#x2F);/g, (entity) => htmlUnescapeMap[entity])
}

/**
 * Sanitize filename for safe file download
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and potentially dangerous characters
  let sanitized = filename.replace(/[/\\?%*:|"<>]/g, '-')
  
  // Remove leading/trailing dots and spaces
  sanitized = sanitized.replace(/^[.\s]+/g, '').replace(/[.\s]+$/g, '')
  
  // Limit length
  if (sanitized.length > 255) {
    const ext = sanitized.split('.').pop()
    const name = sanitized.substring(0, 250 - (ext?.length || 0))
    sanitized = ext ? `${name}.${ext}` : name
  }
  
  return sanitized || 'arquivo'
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Strip HTML tags from string
 */
export function stripHTML(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

/**
 * Normalize line breaks to Unix style (LF)
 */
export function normalizeLineBreaks(text: string): string {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
}

/**
 * Remove excessive blank lines (more than 2 consecutive)
 */
export function removeExcessiveBlankLines(text: string): string {
  return text.replace(/\n{3,}/g, '\n\n')
}

/**
 * Sanitize URL to prevent open redirect vulnerabilities
 */
export function sanitizeURL(url: string): string {
  try {
    const parsed = new URL(url, window.location.origin)
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return ''
    }
    
    return parsed.toString()
  } catch {
    return ''
  }
}

/**
 * Clean text for SRT conversion (remove excessive formatting)
 */
export function cleanTextForSRT(text: string): string {
  let cleaned = sanitizeInput(text)
  
  // Normalize line breaks
  cleaned = normalizeLineBreaks(cleaned)
  
  // Remove excessive blank lines
  cleaned = removeExcessiveBlankLines(cleaned)
  
  // Trim leading and trailing whitespace
  cleaned = cleaned.trim()
  
  return cleaned
}
