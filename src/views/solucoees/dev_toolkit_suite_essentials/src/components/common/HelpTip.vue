<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Tooltip } from '@/components/ui/tooltip'

defineProps<{ text: string; side?: 'top' | 'right' | 'bottom' | 'left' }>()
</script>

<template>
  <Tooltip :text="text" :side="side">
    <button
      type="button"
      class="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
      :aria-label="text"
    >
      <Icon icon="lucide:help-circle" class="h-4 w-4" />
    </button>
  </Tooltip>
</template>
