<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useThemeStore } from '@/stores/theme'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
</script>

<template>
  <BaseTooltip :text="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'">
    <button
      type="button"
      class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
      @click="theme.toggle()"
    >
      <Icon :icon="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-5 w-5" />
    </button>
  </BaseTooltip>
</template>
