<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
</script>

<template>
  <Transition name="overlay-fade">
    <div
      v-if="ui.isLoading"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
    >
      <Icon
        icon="svg-spinners:ring-resize"
        class="h-14 w-14 text-primary-400"
        aria-hidden="true"
      />
      <p class="mt-4 text-lg font-medium text-white">{{ ui.loadingMessage }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
</style>
