<script setup lang="ts">
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
} from 'radix-vue'

defineProps<{
  /** Texto exibido no tooltip. */
  content: string
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
          :side-offset="6"
          class="z-50 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-md data-[state=delayed-open]:animate-fade-in"
        >
          {{ content }}
          <TooltipArrow class="fill-gray-900" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
