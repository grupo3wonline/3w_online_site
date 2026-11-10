<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import { useThemeStore } from "@/stores/theme";

const theme = useThemeStore();

const isDark = computed(() => {
  if (theme.mode === "dark") return true;
  if (theme.mode === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
});
</script>

<template>
  <button
    type="button"
    class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent"
    :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
    :title="isDark ? 'Tema claro' : 'Tema escuro'"
    @click="theme.toggle()"
  >
    <Icon
      v-if="isDark"
      icon="lucide:sun"
      class="h-5 w-5"
    />
    <Icon
      v-else
      icon="lucide:moon"
      class="h-5 w-5"
    />
  </button>
</template>
