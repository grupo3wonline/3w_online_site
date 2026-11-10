import { useColorMode } from "@vueuse/core";
import { computed } from "vue";

export type ThemeMode = "light" | "dark" | "auto";

/**
 * Gerencia o tema claro/escuro/sistema.
 * Usa VueUse useColorMode que aplica a classe .dark no <html> e persiste em localStorage.
 */
export function useTheme() {
  const mode = useColorMode({
    selector: "html",
    attribute: "class",
    storageKey: "empreenda-facil-theme",
    modes: { light: "", dark: "dark" },
  });

  const isDark = computed(() => mode.value === "dark");

  const cycle = () => {
    const order: ThemeMode[] = ["light", "dark", "auto"];
    const current = mode.value as ThemeMode;
    const idx = order.indexOf(current);
    mode.value = order[(idx + 1) % order.length];
  };

  const toggle = () => {
    mode.value = isDark.value ? "light" : "dark";
  };

  return { mode, isDark, cycle, toggle };
}
