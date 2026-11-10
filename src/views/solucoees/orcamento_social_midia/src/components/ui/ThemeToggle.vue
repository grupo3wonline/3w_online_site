<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useThemeStore } from '@/stores/theme'

// Alternância entre tema claro e escuro
const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
</script>

<template>
  <button
    type="button"
    class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-purple-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
    :title="isDark ? 'Tema claro' : 'Tema escuro'"
    @click="theme.toggle()"
  >
    <Icon :icon="isDark ? 'fa6-solid:sun' : 'fa6-solid:moon'" class="h-5 w-5" aria-hidden="true" />
  </button>
</template>
