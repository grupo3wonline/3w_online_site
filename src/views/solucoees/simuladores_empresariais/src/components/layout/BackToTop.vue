<script setup lang="ts">
import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const { y } = useWindowScroll({ behavior: 'smooth' })
const visivel = computed(() => y.value > 500)

function subir() {
  y.value = 0
}
</script>

<template>
  <Transition name="pop">
    <button
      v-show="visivel"
      class="fixed bottom-6 left-6 z-[80] flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
      aria-label="Voltar ao topo"
      @click="subir"
    >
      <Icon icon="lucide:arrow-up" class="h-5 w-5" />
    </button>
  </Transition>
</template>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
