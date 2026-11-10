<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll({ behavior: 'smooth' })
const visible = computed(() => y.value > 400)

function toTop() {
  y.value = 0
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-200"
    enter-from-class="opacity-0 translate-y-2"
    leave-active-class="transition duration-150"
    leave-to-class="opacity-0 translate-y-2"
  >
    <button
      v-if="visible"
      type="button"
      class="fixed bottom-24 right-6 z-[9970] flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-600 shadow-lg transition hover:scale-110 dark:border-slate-700 dark:bg-slate-800 dark:text-brand-400"
      aria-label="Voltar ao topo"
      @click="toTop"
    >
      <Icon
        icon="lucide:arrow-up"
        class="h-5 w-5"
      />
    </button>
  </Transition>
</template>
