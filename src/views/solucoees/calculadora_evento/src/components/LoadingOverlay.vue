<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>

<template>
  <transition name="overlay">
    <div
      v-if="visible"
      class="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm"
      role="status"
      aria-label="Processando..."
    >
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p class="text-sm font-medium text-muted-foreground">Processando...</p>
      </div>
    </div>
  </transition>
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
