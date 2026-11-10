import { ref, computed } from 'vue';

/**
 * Composable para cálculos de rendimento salarial
 * @returns {Object} Funções e estado para cálculo salarial
 */
export function useCalculator() {
  const salaryInput = ref('');
  const isCalculating = ref(false);
  const salaryData = ref({
    base: 0,
    hourly: 0,
    daily: 0,
    weekly: 0,
    biweekly: 0,
    monthly: 0,
    quarterly: 0,
    semester: 0,
    yearly: 0
  });

  // Constantes de cálculo
  const WORKING_HOURS_PER_MONTH = 220; // 220 horas trabalhadas por mês (média brasileira)
  const DAYS_PER_MONTH = 30;
  const WEEKS_PER_MONTH = 4.33;
  const BIWEEKS_PER_MONTH = 2;

  /**
   * Sanitiza o input removendo caracteres não numéricos
   */
  const sanitizeInput = (value) => {
    if (!value) return '';
    return value.toString().replace(/[^\d.,]/g, '').replace(',', '.');
  };

  /**
   * Valida se o input é um valor válido
   */
  const isValidInput = computed(() => {
    const sanitized = sanitizeInput(salaryInput.value);
    const value = parseFloat(sanitized);
    return !isNaN(value) && value > 0;
  });

  /**
   * Calcula todos os rendimentos baseado no salário mensal
   */
  const calculateSalary = async () => {
    if (!isValidInput.value) {
      throw new Error('Por favor, insira um valor válido para o salário.');
    }

    isCalculating.value = true;

    // Simula um pequeno delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 600));

    const sanitized = sanitizeInput(salaryInput.value);
    const salary = parseFloat(sanitized);

    salaryData.value = {
      base: salary,
      hourly: salary / WORKING_HOURS_PER_MONTH,
      daily: salary / DAYS_PER_MONTH,
      weekly: salary / WEEKS_PER_MONTH,
      biweekly: salary / BIWEEKS_PER_MONTH,
      monthly: salary,
      quarterly: salary * 3,
      semester: salary * 6,
      yearly: salary * 12
    };

    isCalculating.value = false;

    return salaryData.value;
  };

  /**
   * Reseta o calculador para o estado inicial
   */
  const resetCalculator = () => {
    salaryInput.value = '';
    isCalculating.value = false;
    salaryData.value = {
      base: 0,
      hourly: 0,
      daily: 0,
      weekly: 0,
      biweekly: 0,
      monthly: 0,
      quarterly: 0,
      semester: 0,
      yearly: 0
    };
  };

  /**
   * Calcula quanto você ganha em um período customizado
   */
  const calculateCustomPeriod = (days) => {
    if (!salaryData.value.daily) return 0;
    return salaryData.value.daily * days;
  };

  /**
   * Salva o cálculo no histórico (localStorage)
   */
  const saveToHistory = () => {
    try {
      const history = JSON.parse(localStorage.getItem('salaryHistory') || '[]');
      const newEntry = {
        ...salaryData.value,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      history.unshift(newEntry);
      // Mantém apenas os últimos 10 cálculos
      const limitedHistory = history.slice(0, 10);
      localStorage.setItem('salaryHistory', JSON.stringify(limitedHistory));
      return limitedHistory;
    } catch (error) {
      console.error('Erro ao salvar no histórico:', error);
      return [];
    }
  };

  /**
   * Recupera o histórico de cálculos
   */
  const getHistory = () => {
    try {
      return JSON.parse(localStorage.getItem('salaryHistory') || '[]');
    } catch (error) {
      console.error('Erro ao recuperar histórico:', error);
      return [];
    }
  };

  /**
   * Limpa o histórico
   */
  const clearHistory = () => {
    try {
      localStorage.removeItem('salaryHistory');
      return true;
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
      return false;
    }
  };

  return {
    salaryInput,
    isCalculating,
    salaryData,
    isValidInput,
    calculateSalary,
    resetCalculator,
    calculateCustomPeriod,
    saveToHistory,
    getHistory,
    clearHistory,
    sanitizeInput
  };
}
