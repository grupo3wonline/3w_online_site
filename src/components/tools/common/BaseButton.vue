<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :title="tooltip || undefined"
    @click="handleClick"
  >
    <!-- Spinner de loading -->
    <i v-if="loading" class="fas fa-spinner fa-spin" :class="iconSizeClass"></i>
    <!-- Ícone à esquerda -->
    <i
      v-else-if="icon && iconPosition !== 'right'"
      :class="['fas', icon, iconSizeClass]"
    ></i>
    <slot></slot>
    <!-- Ícone à direita -->
    <i
      v-if="!loading && icon && iconPosition === 'right'"
      :class="['fas', icon, iconSizeClass]"
    ></i>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost' | 'glass'
type Size    = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(defineProps<{
  variant?:      Variant
  size?:         Size
  type?:         'button' | 'submit' | 'reset'
  disabled?:     boolean
  loading?:      boolean
  icon?:         string
  iconPosition?: 'left' | 'right'
  fullWidth?:    boolean
  rounded?:      boolean   // extra-rounded (pill)
  tooltip?:      string
}>(), {
  variant:      'primary',
  size:         'md',
  type:         'button',
  disabled:     false,
  loading:      false,
  icon:         '',
  iconPosition: 'left',
  fullWidth:    false,
  rounded:      false,
})

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) emit('click', event)
}

// ─── Variantes visuais ─────────────────────────────────────────────
const variantMap: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 ' +
    'text-white shadow-sm hover:shadow-tool active:scale-[0.98] ' +
    'focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',

  secondary:
    'bg-gradient-to-r from-secondary-500 to-teal-600 hover:from-secondary-600 hover:to-teal-700 ' +
    'text-white shadow-sm hover:shadow-glow-green active:scale-[0.98] ' +
    'focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2',

  success:
    'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 ' +
    'text-white shadow-sm hover:shadow-glow-green active:scale-[0.98] ' +
    'focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2',

  danger:
    'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 ' +
    'text-white shadow-sm active:scale-[0.98] ' +
    'focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2',

  warning:
    'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 ' +
    'text-white shadow-sm active:scale-[0.98] ' +
    'focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2',

  outline:
    'border-2 border-primary-500/40 dark:border-primary-500/50 ' +
    'text-primary-600 dark:text-primary-400 ' +
    'hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-500 ' +
    'focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',

  ghost:
    'text-gray-700 dark:text-slate-200 ' +
    'hover:bg-gray-100 dark:hover:bg-slate-700 ' +
    'focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2',

  glass:
    'bg-white/15 hover:bg-white/25 backdrop-blur-sm ' +
    'border border-white/20 text-white ' +
    'focus-visible:ring-2 focus-visible:ring-white/40',
}

// ─── Tamanhos ──────────────────────────────────────────────────────
const sizeMap: Record<Size, string> = {
  xs: 'text-xs  px-3   py-1.5 gap-1.5',
  sm: 'text-sm  px-4   py-2   gap-2',
  md: 'text-sm  px-5   py-2.5 gap-2',
  lg: 'text-base px-6  py-3   gap-2.5',
  xl: 'text-lg  px-8   py-3.5 gap-3',
}

const iconSizeMap: Record<Size, string> = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
}

const iconSizeClass = computed(() => iconSizeMap[props.size])

const buttonClasses = computed(() => {
  const radius = props.rounded ? 'rounded-full' : 'rounded-xl'
  const width  = props.fullWidth ? 'w-full' : ''
  const off    = props.disabled || props.loading
                   ? 'opacity-50 cursor-not-allowed pointer-events-none'
                   : 'cursor-pointer'

  return [
    'inline-flex items-center justify-center font-semibold',
    'transition-all duration-200 select-none',
    'focus:outline-none',
    radius,
    width,
    off,
    sizeMap[props.size],
    variantMap[props.variant],
  ]
    .filter(Boolean)
    .join(' ')
})
</script>
