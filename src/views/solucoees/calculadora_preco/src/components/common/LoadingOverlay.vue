<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { isLoading, message } = storeToRefs(ui)
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-slate-950/60 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      :aria-label="message"
    >
      <Icon icon="svg-spinners:ring-resize" class="h-14 w-14 text-white" />
      <p class="text-sm font-medium text-white/90">{{ message }}</p>
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
