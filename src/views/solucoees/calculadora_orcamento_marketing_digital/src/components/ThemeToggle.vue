<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const isDark = computed(() => theme.mode === 'dark')
</script>

<template>
  <button
    type="button"
    class="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-card/60 text-foreground transition-all hover:border-primary/40 hover:text-primary"
    :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
    :title="isDark ? 'Modo Claro' : 'Modo Escuro'"
    @click="theme.toggle()"
  >
    <i
      :class="['fas text-sm transition-transform duration-500', isDark ? 'fa-sun' : 'fa-moon']"
      aria-hidden="true"
    ></i>
  </button>
</template>
