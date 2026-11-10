<template>
  <transition name="fade">
    <div
      v-if="ui.isLoading"
      class="loading-overlay"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
    >
      <div class="flex flex-col items-center gap-4 rounded-2xl bg-white/10 px-8 py-6 backdrop-blur-md">
        <div class="loading-spinner" aria-hidden="true"></div>
        <p class="text-sm font-medium text-white">{{ ui.loadingMessage }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
