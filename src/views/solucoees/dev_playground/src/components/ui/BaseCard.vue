<script setup lang="ts">
import { cn } from '@/lib/utils'

withDefaults(defineProps<{ glow?: boolean; hover?: boolean; padded?: boolean }>(), {
  glow: true,
  hover: true,
  padded: true,
})
</script>

<template>
  <div
    :class="
      cn(
        'rounded-2xl border border-border bg-card text-card-foreground shadow-sm',
        glow && 'card-glow',
        hover && 'hover-lift',
        padded && 'p-6',
      )
    "
  >
    <slot />
  </div>
</template>
