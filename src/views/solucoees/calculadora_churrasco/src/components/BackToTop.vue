<template>
  <transition name="btt-fade">
    <button
      v-show="visivel"
      type="button"
      class="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-bbq-orange to-bbq-red text-white shadow-lg transition-transform hover:scale-110 print-hidden"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      @click="aoTopo"
    >
      <i class="fa-solid fa-arrow-up"></i>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

const { y } = useWindowScroll()
const visivel = computed(() => y.value > 400)

function aoTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.btt-fade-enter-active,
.btt-fade-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.btt-fade-enter-from,
.btt-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
