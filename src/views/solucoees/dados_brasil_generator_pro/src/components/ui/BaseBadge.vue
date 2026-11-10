<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<{ icon?: string; variant?: 'primary' | 'success' | 'neutral' }>(), {
  variant: 'primary',
})

const cls = computed(
  () =>
    ({
      primary: 'border-primary/20 bg-primary/10 text-primary',
      success: 'border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400',
      neutral: 'border-border bg-secondary text-muted-foreground',
    })[props.variant],
)
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
    :class="cls"
  >
    <Icon v-if="icon" :icon="icon" class="h-3.5 w-3.5" />
    <slot />
  </span>
</template>
