<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

const { y } = useWindowScroll()
const visible = computed(() => y.value > 400)

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300"
    enter-from-class="opacity-0 translate-y-2"
    leave-active-class="transition duration-200"
    leave-to-class="opacity-0 translate-y-2"
  >
    <button
      v-if="visible"
      type="button"
      class="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-purple-600 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      @click="scrollTop"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </Transition>
</template>
