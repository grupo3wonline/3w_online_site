import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const STORAGE_KEY = 'darkMode';

function getInitialDarkMode(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return JSON.parse(saved);
  } catch {
    /* noop */
  }
  // Sem preferência salva: respeita o sistema, com fallback para escuro.
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches || true;
  }
  return true;
}

function applyTheme(dark: boolean): void {
  const root = document.documentElement;
  if (dark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export const useThemeStore = defineStore('theme', () => {
  const darkMode = ref<boolean>(getInitialDarkMode());

  applyTheme(darkMode.value);

  watch(darkMode, (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      /* noop */
    }
    applyTheme(value);
  });

  function toggleDarkMode(): void {
    darkMode.value = !darkMode.value;
  }

  return { darkMode, toggleDarkMode };
});
