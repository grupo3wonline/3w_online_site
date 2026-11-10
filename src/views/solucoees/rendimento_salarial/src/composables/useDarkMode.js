import { ref, watch, onMounted } from 'vue';

/**
 * Composable para gerenciamento de Dark Mode
 * @returns {Object} Estado e funções para dark mode
 */
export function useDarkMode() {
  const isDark = ref(false);
  const STORAGE_KEY = 'theme-preference';

  /**
   * Detecta preferência do sistema
   */
  const getSystemPreference = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  /**
   * Carrega preferência salva
   */
  const loadPreference = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        return saved === 'dark';
      }
      return getSystemPreference();
    } catch (error) {
      console.error('Erro ao carregar preferência de tema:', error);
      return false;
    }
  };

  /**
   * Salva preferência
   */
  const savePreference = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light');
    } catch (error) {
      console.error('Erro ao salvar preferência de tema:', error);
    }
  };

  /**
   * Aplica o tema
   */
  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  /**
   * Alterna entre light e dark
   */
  const toggle = () => {
    isDark.value = !isDark.value;
  };

  /**
   * Define o modo escuro
   */
  const setDarkMode = (value) => {
    isDark.value = value;
  };

  /**
   * Inicializa o dark mode
   */
  const initialize = () => {
    isDark.value = loadPreference();
    applyTheme(isDark.value);

    // Observa mudanças na preferência do sistema
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (localStorage.getItem(STORAGE_KEY) === null) {
          isDark.value = e.matches;
        }
      });
    }
  };

  // Watchers
  watch(isDark, (newValue) => {
    applyTheme(newValue);
    savePreference(newValue);
  });

  // Auto-inicializa quando montado
  onMounted(() => {
    initialize();
  });

  return {
    isDark,
    toggle,
    setDarkMode,
    initialize
  };
}
