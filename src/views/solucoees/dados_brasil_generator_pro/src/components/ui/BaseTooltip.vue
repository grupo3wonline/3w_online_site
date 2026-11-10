<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{ text: string; position?: 'top' | 'bottom' | 'left' | 'right' }>(), {
  position: 'top',
})

const show = ref(false)
const positions: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}
</script>

<template>
  <span
    class="relative inline-flex"
    @mouseenter="show = true"
    @mouseleave="show = false"
    @focusin="show = true"
    @focusout="show = false"
  >
    <slot />
    <transition name="fade">
      <span
        v-if="show"
        role="tooltip"
        :class="positions[position]"
        class="pointer-events-none absolute z-50 w-max max-w-xs rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg"
      >
        {{ text }}
      </span>
    </transition>
  </span>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
