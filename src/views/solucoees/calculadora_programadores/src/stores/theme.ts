import { defineStore } from "pinia";
import { ref, watch } from "vue";

export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "calc-prog-theme";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = mode === "dark" || (mode === "system" && prefersDark);
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

/**
 * Store de tema (claro/escuro/sistema) com persistencia em localStorage.
 */
export const useThemeStore = defineStore("theme", () => {
  const stored = (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? "system";
  const mode = ref<ThemeMode>(stored);

  function setMode(next: ThemeMode) {
    mode.value = next;
  }

  function toggle() {
    // Alterna diretamente entre claro e escuro para o botao do header.
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = mode.value === "dark" || (mode.value === "system" && prefersDark);
    mode.value = isDark ? "light" : "dark";
  }

  function init() {
    applyTheme(mode.value);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (mode.value === "system") applyTheme("system");
      });
  }

  watch(mode, (next) => {
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  return { mode, setMode, toggle, init };
});
