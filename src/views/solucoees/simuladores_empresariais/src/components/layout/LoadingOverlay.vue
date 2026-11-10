<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useLoadingStore } from '@/stores/loading'

const loading = useLoadingStore()
const { ativo, mensagem } = storeToRefs(loading)
</script>

<template>
  <Transition name="overlay">
    <div
      v-if="ativo"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <Icon icon="lucide:loader-circle" class="h-12 w-12 animate-spin text-primary" />
      <p class="text-sm font-medium text-foreground">{{ mensagem }}</p>
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
