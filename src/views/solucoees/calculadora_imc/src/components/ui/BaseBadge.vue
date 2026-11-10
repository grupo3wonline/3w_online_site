<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badge = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        primary: 'bg-primary/10 text-primary',
        soft: 'bg-muted text-muted-foreground',
        glass: 'bg-background/20 text-primary-foreground backdrop-blur',
        success: 'bg-success/10 text-success',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

type BadgeVariants = VariantProps<typeof badge>

const props = defineProps<{ variant?: BadgeVariants['variant'] }>()

const classes = computed(() => cn(badge({ variant: props.variant })))
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
