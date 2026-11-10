<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    gradient?: boolean
    hover?: boolean
    as?: string
  }>(),
  { gradient: true, hover: false, as: 'div' },
)

const classes = computed(() =>
  cn(
    'rounded-xl border border-border p-6 shadow-card',
    props.gradient ? 'bg-gradient-card' : 'bg-card',
    props.hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated',
  ),
)
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
