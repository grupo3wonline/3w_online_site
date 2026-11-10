<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useUiStore } from '@/stores/ui'

const { loading, loadingText } = storeToRefs(useUiStore())
</script>

<template>
  <transition name="overlay-fade">
    <div
      v-if="loading"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950/70 backdrop-blur-md"
      role="alertdialog"
      aria-busy="true"
      aria-live="assertive"
      :aria-label="loadingText"
    >
      <div class="flex flex-col items-center rounded-3xl bg-white/10 px-10 py-8 backdrop-blur-xl">
        <span class="relative flex h-14 w-14 items-center justify-center">
          <span class="absolute inset-0 rounded-full border-4 border-white/20"></span>
          <span
            class="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-accent-400"
          ></span>
          <Icon icon="mdi:chart-line-variant" class="text-xl text-white" />
        </span>
        <p class="mt-4 font-semibold text-white">{{ loadingText }}</p>
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
