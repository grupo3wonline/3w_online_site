<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { loading, loadingText } = storeToRefs(ui)
</script>

<template>
  <Transition name="overlay">
    <div
      v-if="loading"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      :aria-label="loadingText"
    >
      <div class="relative h-16 w-16">
        <div
          class="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
        />
      </div>
      <p class="text-sm font-medium text-foreground">{{ loadingText }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
