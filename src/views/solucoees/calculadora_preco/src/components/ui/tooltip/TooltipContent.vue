<script setup lang="ts">
import { TooltipContent, TooltipPortal, type TooltipContentProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<TooltipContentProps & { class?: string }>(), {
  sideOffset: 6,
})
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="props"
      :class="
        cn(
          'z-50 max-w-xs rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white shadow-md dark:bg-slate-700 data-[state=delayed-open]:animate-fade-in',
          props.class,
        )
      "
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
