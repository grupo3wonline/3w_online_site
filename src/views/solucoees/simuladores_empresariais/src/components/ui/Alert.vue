<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'

withDefaults(
  defineProps<{
    variant?: 'info' | 'warning' | 'success' | 'danger'
    icon?: string
    class?: string
  }>(),
  { variant: 'info' }
)

const styles: Record<string, string> = {
  info: 'border-info/40 bg-info/10 text-foreground',
  warning: 'border-warning/50 bg-warning/10 text-foreground',
  success: 'border-success/40 bg-success/10 text-foreground',
  danger: 'border-danger/40 bg-danger/10 text-foreground',
}
const iconColor: Record<string, string> = {
  info: 'text-info',
  warning: 'text-warning',
  success: 'text-success',
  danger: 'text-danger',
}
</script>

<template>
  <div :class="cn('flex gap-3 rounded-lg border p-4', styles[variant], $props.class)" role="alert">
    <Icon
      v-if="icon"
      :icon="icon"
      :class="cn('mt-0.5 h-5 w-5 flex-shrink-0', iconColor[variant])"
    />
    <div class="text-sm leading-relaxed">
      <slot />
    </div>
  </div>
</template>
