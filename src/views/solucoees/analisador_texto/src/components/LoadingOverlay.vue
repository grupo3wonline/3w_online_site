<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="overlay-loading"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
      :aria-label="message"
    >
      <div class="flex flex-col items-center gap-4 animate-fade-in">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-primary-200/30 rounded-full"></div>
          <div
            class="w-16 h-16 border-4 border-transparent border-t-primary-500 rounded-full animate-spin absolute inset-0"
          ></div>
        </div>
        <div class="text-center">
          <p class="text-white font-semibold text-sm">{{ message }}</p>
          <p class="text-white/60 text-xs mt-1">Aguarde um momento...</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    visible?: boolean
    message?: string
  }>(),
  { visible: false, message: 'Processando...' }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
