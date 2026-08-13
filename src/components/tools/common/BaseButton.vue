<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
    <i v-else-if="icon" :class="['fas', icon, iconPosition === 'left' ? 'mr-2' : 'ml-2']"></i>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?: Variant
  size?: Size
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  icon: '',
  iconPosition: 'left',
  fullWidth: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const buttonClasses = computed(() => {
  const classes = ['inline-flex', 'items-center', 'justify-center', 'font-medium', 'rounded-lg', 'transition-all', 'duration-200', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2']

  // Variant
  const variantMap: Record<Variant, string[]> = {
    primary: ['bg-primary-600', 'text-white', 'hover:bg-primary-700', 'focus:ring-primary-500'],
    secondary: ['bg-secondary-600', 'text-white', 'hover:bg-secondary-700', 'focus:ring-secondary-500'],
    success: ['bg-green-600', 'text-white', 'hover:bg-green-700', 'focus:ring-green-500'],
    danger: ['bg-red-600', 'text-white', 'hover:bg-red-700', 'focus:ring-red-500'],
    outline: ['border-2', 'border-gray-300', 'text-gray-700', 'hover:bg-gray-50', 'focus:ring-primary-500'],
    ghost: ['text-gray-700', 'hover:bg-gray-100', 'focus:ring-gray-500'],
  }
  classes.push(...(variantMap[props.variant] || variantMap.primary))

  // Size
  const sizeMap: Record<Size, string[]> = {
    sm: ['text-sm', 'px-3', 'py-1.5'],
    md: ['text-base', 'px-4', 'py-2.5'],
    lg: ['text-lg', 'px-6', 'py-3'],
  }
  classes.push(...(sizeMap[props.size] || sizeMap.md))

  if (props.fullWidth) classes.push('w-full')
  if (props.disabled || props.loading) classes.push('opacity-50', 'cursor-not-allowed')

  return classes.join(' ')
})
</script>
