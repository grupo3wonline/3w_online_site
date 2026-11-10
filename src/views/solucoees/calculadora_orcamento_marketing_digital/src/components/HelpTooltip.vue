<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps<{ label?: string }>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

onClickOutside(root, () => (open.value = false))
</script>

<template>
  <span ref="root" class="relative inline-flex">
    <button
      type="button"
      class="ml-1 text-muted-foreground transition-colors hover:text-primary"
      :aria-label="label ?? 'Ajuda'"
      :aria-expanded="open"
      @click="open = !open"
      @mouseenter="open = true"
      @mouseleave="open = false"
      @focus="open = true"
      @blur="open = false"
    >
      <i class="fas fa-question-circle text-xs" aria-hidden="true"></i>
    </button>
    <Transition name="tip">
      <span
        v-if="open"
        role="tooltip"
        class="tooltip-content absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 text-left"
      >
        <slot />
      </span>
    </Transition>
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
