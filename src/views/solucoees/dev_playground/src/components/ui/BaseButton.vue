<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    block?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'primary', size: 'md', block: false, disabled: false, type: 'button' },
)

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'gradient-brand text-white shadow-lg hover:shadow-xl hover:brightness-110',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  outline: 'border-2 border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
  ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
  white: 'bg-white text-primary shadow-lg hover:bg-gray-100',
}

const sizes: Record<Size, string> = {
  sm: 'text-sm px-3 py-2',
  md: 'text-base px-5 py-2.5',
  lg: 'text-lg px-8 py-4',
}

const classes = computed(() =>
  cn(base, variants[props.variant], sizes[props.size], props.block && 'w-full'),
)
</script>

<template>
  <button :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
