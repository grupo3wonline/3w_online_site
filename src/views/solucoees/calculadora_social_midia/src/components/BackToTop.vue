<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const { y } = useWindowScroll()
const visible = computed(() => y.value > 400)

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <transition name="fade">
    <button
      v-show="visible"
      type="button"
      class="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      @click="scrollTop"
    >
      <Icon
        icon="lucide:arrow-up"
        class="h-5 w-5"
      />
    </button>
  </transition>
</template>
