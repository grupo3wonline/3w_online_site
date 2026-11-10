<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

/**
 * Tooltip de ajuda acessível (hover + foco por teclado).
 * Usado para dicas e orientações ao longo da interface.
 */
withDefaults(
  defineProps<{
    text: string
    label?: string
  }>(),
  { label: 'Ajuda' },
)

const open = ref(false)
</script>

<template>
  <span class="relative inline-flex">
    <button
      type="button"
      class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      :aria-label="label"
      @mouseenter="open = true"
      @mouseleave="open = false"
      @focus="open = true"
      @blur="open = false"
    >
      <Icon icon="fa6-solid:circle-question" class="h-3.5 w-3.5" aria-hidden="true" />
    </button>
    <Transition name="tip">
      <span
        v-if="open"
        role="tooltip"
        class="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-xs leading-relaxed text-white shadow-xl"
      >
        {{ text }}
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
