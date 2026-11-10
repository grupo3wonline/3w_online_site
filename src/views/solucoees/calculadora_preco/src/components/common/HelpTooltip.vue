<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

defineProps<{ text: string; label?: string }>()
</script>

<template>
  <TooltipProvider :delay-duration="150">
    <Tooltip>
      <TooltipTrigger
        as="button"
        type="button"
        class="inline-flex items-center justify-center text-primary transition-colors hover:text-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
        :aria-label="label || 'Ajuda'"
      >
        <Icon icon="fa6-solid:circle-question" class="h-4 w-4" />
      </TooltipTrigger>
      <TooltipContent side="top">
        {{ text }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
