<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)
const show = computed(() => y.value > 400)

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <transition name="fade">
    <button
      v-if="show"
      type="button"
      class="fixed bottom-6 left-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-lg transition-colors hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Voltar ao topo"
      @click="toTop"
    >
      <Icon icon="lucide:arrow-up" class="h-5 w-5" />
    </button>
  </transition>
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
