<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ text: string }>()
const open = ref(false)
</script>

<template>
  <span
    class="relative inline-flex"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @focusin="open = true"
    @focusout="open = false"
  >
    <slot />
    <transition name="tip">
      <span
        v-if="open"
        role="tooltip"
        class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[16rem] -translate-x-1/2 rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-elevated"
      >
        {{ text }}
        <span
          class="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-foreground"
        />
      </span>
    </transition>
  </span>
</template>

<style scoped>
.tip-enter-active,
.tip-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.tip-enter-from,
.tip-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px);
}
</style>
