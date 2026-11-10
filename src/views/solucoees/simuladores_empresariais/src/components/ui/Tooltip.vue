<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

defineProps<{ text?: string; side?: 'top' | 'bottom'; class?: string }>()
const open = ref(false)
</script>

<template>
  <span
    class="relative inline-flex"
    tabindex="0"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @focus="open = true"
    @blur="open = false"
  >
    <slot />
    <Transition name="tt">
      <span
        v-if="open"
        role="tooltip"
        :class="
          cn(
            'absolute left-1/2 z-50 w-max max-w-xs -translate-x-1/2 rounded-lg border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg',
            side === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2',
            $props.class
          )
        "
      >
        <slot name="content">{{ text }}</slot>
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.tt-enter-active,
.tt-leave-active {
  transition: opacity 0.15s ease;
}
.tt-enter-from,
.tt-leave-to {
  opacity: 0;
}
</style>
