<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { isLoading, message } = storeToRefs(ui)
</script>

<template>
  <Transition name="overlay">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="relative">
        <div class="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <Icon
          icon="lucide:code-2"
          class="absolute inset-0 m-auto h-7 w-7 text-primary"
        />
      </div>
      <p class="text-sm font-medium text-muted-foreground">{{ message }}</p>
      <span class="sr-only">Processando, aguarde.</span>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
