<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{ class?: string; gradient?: boolean }>()
</script>

<template>
  <div
    :class="
      cn(
        gradient
          ? 'card-gradient'
          : 'rounded-xl border border-border bg-card text-card-foreground shadow-sm',
        $props.class
      )
    "
  >
    <slot />
  </div>
</template>
