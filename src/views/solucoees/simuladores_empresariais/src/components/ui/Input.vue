<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{ class?: string }>()
const model = defineModel<string | number>()
</script>

<template>
  <input
    v-model="model"
    autocomplete="off"
    :class="
      cn(
        'flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        $props.class
      )
    "
  />
</template>
