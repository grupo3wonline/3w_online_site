<script setup lang="ts">
import { Icon } from '@iconify/vue'

withDefaults(
  defineProps<{ eyebrow?: string; title: string; subtitle?: string; icon?: string; center?: boolean }>(),
  { center: true },
)
</script>

<template>
  <div :class="['mb-12', center ? 'text-center' : 'text-left']">
    <span
      v-if="eyebrow"
      class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
    >
      <Icon v-if="icon" :icon="icon" class="h-3.5 w-3.5" />
      {{ eyebrow }}
    </span>
    <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">{{ title }}</h2>
    <p v-if="subtitle" :class="['mt-3 text-muted-foreground', center && 'mx-auto max-w-2xl']">
      {{ subtitle }}
    </p>
  </div>
</template>
