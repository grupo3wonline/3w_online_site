<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useTheme } from "@/composables/useTheme";

const { mode, cycle } = useTheme();

const iconFor = (m: string) =>
  m === "dark" ? "lucide:moon" : m === "light" ? "lucide:sun" : "lucide:monitor";
const labelFor = (m: string) =>
  m === "dark" ? "Tema escuro" : m === "light" ? "Tema claro" : "Tema do sistema";
</script>

<template>
  <button
    type="button"
    class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    :aria-label="`Alternar tema. Atual: ${labelFor(mode)}`"
    :title="`Alternar tema (${labelFor(mode)})`"
    @click="cycle"
  >
    <Icon :icon="iconFor(mode)" class="h-5 w-5" />
  </button>
</template>
