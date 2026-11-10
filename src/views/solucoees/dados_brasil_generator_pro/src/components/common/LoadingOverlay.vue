<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { loading, loadingText } = storeToRefs(ui)
</script>

<template>
  <transition name="overlay-fade">
    <div
      v-if="loading"
      class="fixed inset-0 z-[200] grid place-items-center bg-background/70 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      :aria-label="loadingText"
    >
      <div class="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/90 px-8 py-6 shadow-2xl">
        <Icon icon="lucide:loader-circle" class="h-10 w-10 animate-spin text-primary" />
        <p class="text-sm font-medium text-foreground">{{ loadingText }}</p>
      </div>
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
