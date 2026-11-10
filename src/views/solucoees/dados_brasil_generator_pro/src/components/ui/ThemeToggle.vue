<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useThemeStore } from '@/stores/theme'
import BaseTooltip from './BaseTooltip.vue'

const theme = useThemeStore()
</script>

<template>
  <BaseTooltip :text="theme.mode === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'">
    <button
      type="button"
      class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      :aria-label="theme.mode === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'"
      @click="theme.toggle()"
    >
      <Icon :icon="theme.mode === 'dark' ? 'lucide:sun' : 'lucide:moon'" class="h-5 w-5" />
    </button>
  </BaseTooltip>
</template>
