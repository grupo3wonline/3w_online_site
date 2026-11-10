<script setup lang="ts">
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow,
} from 'radix-vue'
import { cn } from '@/lib/utils'

defineProps<{
  /** Texto exibido no tooltip */
  text: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  class?: string
}>()
</script>

<template>
  <TooltipProvider :delay-duration="200">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          :side="side ?? 'top'"
          :side-offset="6"
          :class="
            cn(
              'z-[120] max-w-xs rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0',
              $props.class
            )
          "
        >
          {{ text }}
          <TooltipArrow class="fill-foreground" :width="8" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
