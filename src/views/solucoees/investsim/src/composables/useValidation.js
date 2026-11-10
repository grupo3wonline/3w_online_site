/**
 * Composable para validações de formulários
 * @module useValidation
 */

import { ref, computed } from 'vue'

export function useValidation() {
  /**
   * Valida se um valor é um número positivo
   * @param {*} value - Valor a validar
   * @returns {Object} Resultado da validação
   */
  const isPositiveNumber = (value) => {
    const num = parseFloat(value)
    return {
      valid: !isNaN(num) && num > 0,
      message: 'O valor deve ser um número maior que zero'
    }
  }

  /**
   * Valida se um valor está dentro de um intervalo
   * @param {number} value - Valor a validar
   * @param {number} min - Valor mínimo
   * @param {number} max - Valor máximo
   * @returns {Object} Resultado da validação
   */
  const isInRange = (value, min, max) => {
    const num = parseFloat(value)
    return {
      valid: !isNaN(num) && num >= min && num <= max,
      message: `O valor deve estar entre ${min} e ${max}`
    }
  }

  /**
   * Valida email
   * @param {string} email - Email a validar
   * @returns {Object} Resultado da validação
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return {
      valid: emailRegex.test(email),
      message: 'Email inválido'
    }
  }

  /**
   * Valida telefone brasileiro
   * @param {string} phone - Telefone a validar
   * @returns {Object} Resultado da validação
   */
  const isValidPhone = (phone) => {
    const phoneRegex = /^(\+55\s?)?(\(?\d{2}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/
    return {
      valid: phoneRegex.test(phone),
      message: 'Telefone inválido'
    }
  }

  /**
   * Valida CPF
   * @param {string} cpf - CPF a validar
   * @returns {Object} Resultado da validação
   */
  const isValidCPF = (cpf) => {
    const cleanCPF = cpf.replace(/[^\d]/g, '')
    
    if (cleanCPF.length !== 11) {
      return { valid: false, message: 'CPF deve ter 11 dígitos' }
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return { valid: false, message: 'CPF inválido' }
    }

    // Validação dos dígitos verificadores
    let sum = 0
    let remainder

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i)
    }

    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
      return { valid: false, message: 'CPF inválido' }
    }

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i)
    }

    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
      return { valid: false, message: 'CPF inválido' }
    }

    return { valid: true, message: 'CPF válido' }
  }

  /**
   * Sanitiza string removendo HTML e scripts
   * @param {string} str - String a sanitizar
   * @returns {string} String sanitizada
   */
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return ''
    
    return str
      .replace(/[<>]/g, '') // Remove < e >
      .replace(/javascript:/gi, '') // Remove javascript:
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim()
  }

  /**
   * Sanitiza número permitindo apenas dígitos, ponto e vírgula
   * @param {string} str - String a sanitizar
   * @returns {string} String sanitizada
   */
  const sanitizeNumber = (str) => {
    if (typeof str !== 'string') return ''
    return str.replace(/[^\d.,]/g, '')
  }

  /**
   * Hook para gerenciar validação de formulário
   * @param {Object} initialRules - Regras de validação iniciais
   * @returns {Object} Estado e métodos de validação
   */
  const useForm = (initialRules = {}) => {
    const errors = ref({})
    const touched = ref({})
    const isValid = computed(() => Object.keys(errors.value).length === 0)

    const validate = (field, value, rules) => {
      if (!rules) return

      for (const rule of rules) {
        const result = rule(value)
        if (!result.valid) {
          errors.value[field] = result.message
          return false
        }
      }

      delete errors.value[field]
      return true
    }

    const validateAll = (formData, rules) => {
      errors.value = {}
      
      Object.entries(formData).forEach(([field, value]) => {
        if (rules[field]) {
          validate(field, value, rules[field])
        }
      })

      return isValid.value
    }

    const touch = (field) => {
      touched.value[field] = true
    }

    const reset = () => {
      errors.value = {}
      touched.value = {}
    }

    const getError = (field) => {
      return touched.value[field] ? errors.value[field] : null
    }

    return {
      errors,
      touched,
      isValid,
      validate,
      validateAll,
      touch,
      reset,
      getError
    }
  }

  return {
    isPositiveNumber,
    isInRange,
    isValidEmail,
    isValidPhone,
    isValidCPF,
    sanitizeString,
    sanitizeNumber,
    useForm
  }
}
