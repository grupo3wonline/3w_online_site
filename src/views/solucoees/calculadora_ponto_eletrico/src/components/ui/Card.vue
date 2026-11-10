<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  hover?: boolean
}>()

const classes = computed(() =>
  cn(
    'rounded-xl border border-border bg-card text-card-foreground shadow-sm',
    props.hover && 'transition-all hover:-translate-y-1 hover:shadow-lg',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
