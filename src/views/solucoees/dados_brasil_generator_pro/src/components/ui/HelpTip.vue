<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseTooltip from './BaseTooltip.vue'

defineProps<{ text: string }>()
</script>

<template>
  <BaseTooltip :text="text">
    <button
      type="button"
      class="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      :aria-label="`Ajuda: ${text}`"
    >
      <Icon icon="lucide:help-circle" class="h-4 w-4" />
    </button>
  </BaseTooltip>
</template>
