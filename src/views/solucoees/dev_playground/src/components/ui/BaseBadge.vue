<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Variant = 'brand' | 'success' | 'warning' | 'neutral'

const props = withDefaults(defineProps<{ variant?: Variant }>(), { variant: 'brand' })

const variants: Record<Variant, string> = {
  brand: 'bg-primary/10 text-primary',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  neutral: 'bg-muted text-muted-foreground',
}

const classes = computed(() =>
  cn(
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
    variants[props.variant],
  ),
)
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
