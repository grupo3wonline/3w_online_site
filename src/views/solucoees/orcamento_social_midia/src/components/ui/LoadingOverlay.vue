<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '@/stores/loading'

// Overlay global com fundo ofuscado exibido enquanto há processamento
const loading = useLoadingStore()
const { isLoading, message } = storeToRefs(loading)
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      :aria-label="message"
    >
      <div class="flex flex-col items-center gap-4 rounded-2xl bg-card px-8 py-6 shadow-2xl">
        <span
          class="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary"
          aria-hidden="true"
        />
        <p class="text-sm font-medium text-foreground">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
