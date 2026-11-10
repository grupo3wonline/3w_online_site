<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'

const loading = useLoadingStore()
</script>

<template>
  <Transition name="overlay">
    <div
      v-if="loading.isLoading"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-background/75 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="relative h-16 w-16">
        <div class="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
        <div
          class="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
        ></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <i class="fas fa-chart-line text-primary" aria-hidden="true"></i>
        </div>
      </div>
      <p class="text-sm font-medium text-foreground">{{ loading.message }}</p>
      <span class="sr-only">Carregando</span>
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
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
