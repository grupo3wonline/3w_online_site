<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'text-foreground',
        brand: 'border-brand-500/40 bg-brand-500/15 text-brand-600 dark:text-brand-300',
        success: 'border-transparent bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

type Variant = VariantProps<typeof badgeVariants>['variant']
const props = defineProps<{ variant?: Variant; class?: string }>()
</script>

<template>
  <span :class="cn(badgeVariants({ variant }), props.class)">
    <slot />
  </span>
</template>
