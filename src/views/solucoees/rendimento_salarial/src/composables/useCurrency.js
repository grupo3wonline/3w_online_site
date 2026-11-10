import { ref } from 'vue';

/**
 * Composable para formatação de moeda e valores numéricos
 * @returns {Object} Funções para formatação de valores
 */
export function useCurrency() {
  const locale = ref('pt-BR');
  const currency = ref('BRL');

  /**
   * Formata um valor como moeda brasileira
   */
  const formatCurrency = (value, options = {}) => {
    const defaultOptions = {
      style: 'currency',
      currency: currency.value,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    try {
      return new Intl.NumberFormat(locale.value, {
        ...defaultOptions,
        ...options
      }).format(value || 0);
    } catch (error) {
      console.error('Erro ao formatar moeda:', error);
      return `R$ ${(value || 0).toFixed(2)}`;
    }
  };

  /**
   * Formata um número sem símbolo de moeda
   */
  const formatNumber = (value, decimals = 2) => {
    try {
      return new Intl.NumberFormat(locale.value, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value || 0);
    } catch (error) {
      console.error('Erro ao formatar número:', error);
      return (value || 0).toFixed(decimals);
    }
  };

  /**
   * Formata como porcentagem
   */
  const formatPercentage = (value, decimals = 1) => {
    try {
      return new Intl.NumberFormat(locale.value, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value / 100);
    } catch (error) {
      console.error('Erro ao formatar porcentagem:', error);
      return `${(value || 0).toFixed(decimals)}%`;
    }
  };

  /**
   * Converte string de moeda para número
   */
  const parseCurrency = (value) => {
    if (typeof value === 'number') return value;
    
    const cleaned = value
      .toString()
      .replace(/[^\d,.-]/g, '')
      .replace(',', '.');
    
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  /**
   * Formata valor compacto (ex: 1.5K, 2.3M)
   */
  const formatCompact = (value) => {
    try {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return formatNumber(value, 0);
    } catch (error) {
      console.error('Erro ao formatar valor compacto:', error);
      return value.toString();
    }
  };

  /**
   * Formata diferença entre valores (com sinal + ou -)
   */
  const formatDifference = (current, previous) => {
    const diff = current - previous;
    const sign = diff >= 0 ? '+' : '';
    return `${sign}${formatCurrency(diff)}`;
  };

  /**
   * Calcula e formata porcentagem de diferença
   */
  const formatPercentageDifference = (current, previous) => {
    if (previous === 0) return '+0%';
    const diff = ((current - previous) / previous) * 100;
    const sign = diff >= 0 ? '+' : '';
    return `${sign}${diff.toFixed(1)}%`;
  };

  /**
   * Formata valor extenso (ex: dois mil reais)
   */
  const formatExtensive = (value) => {
    // Implementação simplificada
    const rounded = Math.round(value);
    const thousands = Math.floor(rounded / 1000);
    const remainder = rounded % 1000;

    let text = '';
    if (thousands > 0) {
      text += `${thousands} mil`;
      if (remainder > 0) {
        text += ` e ${remainder}`;
      }
    } else {
      text = rounded.toString();
    }

    return `${text} ${rounded === 1 ? 'real' : 'reais'}`;
  };

  return {
    locale,
    currency,
    formatCurrency,
    formatNumber,
    formatPercentage,
    parseCurrency,
    formatCompact,
    formatDifference,
    formatPercentageDifference,
    formatExtensive
  };
}
