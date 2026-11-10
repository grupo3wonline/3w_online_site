<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Tooltip from './Tooltip.vue'

defineProps<{ text: string }>()
</script>

<template>
  <Tooltip :text="text">
    <Icon
      icon="lucide:help-circle"
      class="h-4 w-4 cursor-help text-muted-foreground transition-colors hover:text-primary"
      aria-label="Ajuda"
    />
  </Tooltip>
</template>
