/**
 * Composable para formatação de valores
 * @module useFormat
 */

export function useFormat() {
  /**
   * Formata um número como moeda brasileira
   * @param {number} value - Valor a ser formatado
   * @param {boolean} showSymbol - Se deve mostrar o símbolo R$
   * @returns {string} Valor formatado
   */
  const formatCurrency = (value, showSymbol = false) => {
    const formatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
    
    return showSymbol ? `R$ ${formatted}` : formatted
  }

  /**
   * Formata um número com separadores de milhar
   * @param {number} value - Valor a ser formatado
   * @returns {string} Número formatado
   */
  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  /**
   * Formata uma porcentagem
   * @param {number} value - Valor a ser formatado
   * @param {number} decimals - Número de casas decimais
   * @returns {string} Porcentagem formatada
   */
  const formatPercent = (value, decimals = 2) => {
    return `${value.toFixed(decimals)}%`
  }

  /**
   * Formata uma data
   * @param {Date|string} date - Data a ser formatada
   * @param {string} format - Formato desejado (short, long, full)
   * @returns {string} Data formatada
   */
  const formatDate = (date, format = 'short') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    const options = {
      short: { day: '2-digit', month: '2-digit', year: 'numeric' },
      long: { day: '2-digit', month: 'long', year: 'numeric' },
      full: { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }
    }
    
    return new Intl.DateTimeFormat('pt-BR', options[format]).format(dateObj)
  }

  /**
   * Abrevia números grandes (1000 -> 1k, 1000000 -> 1M)
   * @param {number} value - Valor a ser abreviado
   * @returns {string} Número abreviado
   */
  const abbreviateNumber = (value) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + 'B'
    }
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M'
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k'
    }
    return value.toString()
  }

  /**
   * Remove formatação de moeda e retorna número
   * @param {string} value - Valor formatado
   * @returns {number} Número limpo
   */
  const parseCurrency = (value) => {
    if (typeof value === 'number') return value
    return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')) || 0
  }

  return {
    formatCurrency,
    formatNumber,
    formatPercent,
    formatDate,
    abbreviateNumber,
    parseCurrency
  }
}
