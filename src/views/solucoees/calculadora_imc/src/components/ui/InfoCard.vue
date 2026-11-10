<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  icon?: string
  title?: string
  variant?: 'default' | 'highlight'
}>()
</script>

<template>
  <section
    class="rounded-xl border p-6"
    :class="variant === 'highlight' ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'"
  >
    <h2 v-if="title" class="mb-3 flex items-center gap-2 text-lg font-semibold">
      <Icon v-if="icon" :icon="icon" class="h-5 w-5 text-primary" />
      {{ title }}
    </h2>
    <div class="space-y-3 text-muted-foreground">
      <slot />
    </div>
  </section>
</template>
