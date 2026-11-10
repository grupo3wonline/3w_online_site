<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useTheme } from '@/composables/useTheme'
import { Tooltip } from '@/components/ui/tooltip'

const { isDark, toggle } = useTheme()
</script>

<template>
  <Tooltip :text="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'">
    <button
      type="button"
      class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
      :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
      @click="toggle"
    >
      <Transition name="theme-icon" mode="out-in">
        <Icon v-if="isDark" key="sun" icon="lucide:sun" class="h-5 w-5" />
        <Icon v-else key="moon" icon="lucide:moon" class="h-5 w-5" />
      </Transition>
    </button>
  </Tooltip>
</template>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}
</style>
