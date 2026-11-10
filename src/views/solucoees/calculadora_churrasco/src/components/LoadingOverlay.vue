<template>
  <transition name="overlay-fade">
    <div
      v-if="ativo"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-sm print-hidden"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
    >
      <div class="flex flex-col items-center gap-4 rounded-2xl bg-card px-8 py-6 shadow-2xl">
        <div class="relative h-14 w-14">
          <div class="absolute inset-0 rounded-full border-4 border-bbq-orange/20"></div>
          <div class="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-bbq-orange"></div>
          <i class="fa-solid fa-fire text-bbq-orange absolute inset-0 m-auto h-fit w-fit text-lg"></i>
        </div>
        <p class="text-sm font-medium text-foreground">{{ mensagem }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useLoading } from '@/composables/useLoading'

const { ativo, mensagem } = useLoading()
</script>

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
