<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const { y } = useWindowScroll({ behavior: 'smooth' })
const visible = computed(() => y.value > 400)

function toTop() {
  y.value = 0
}
</script>

<template>
  <Transition name="fade">
    <button
      v-if="visible"
      type="button"
      class="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Voltar ao topo"
      @click="toTop"
    >
      <Icon icon="lucide:arrow-up" class="h-5 w-5" />
    </button>
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
