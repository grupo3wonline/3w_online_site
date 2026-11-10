<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { loading, loadingMessage } = storeToRefs(ui)
</script>

<template>
  <transition name="overlay-fade">
    <div
      v-if="loading"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      :aria-label="loadingMessage"
    >
      <Icon icon="svg-spinners:ring-resize" class="h-12 w-12 text-primary" />
      <p class="text-sm font-medium text-foreground">{{ loadingMessage }}</p>
    </div>
  </transition>
</template>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
</style>
