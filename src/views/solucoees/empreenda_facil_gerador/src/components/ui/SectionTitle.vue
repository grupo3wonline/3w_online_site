<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; subtitle?: string; center?: boolean }>();
</script>

<template>
  <div class="mb-12 max-w-2xl" :class="center ? 'mx-auto text-center' : ''">
    <p
      v-if="eyebrow"
      class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
    >
      <span class="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
      {{ eyebrow }}
    </p>
    <h2 class="font-display text-3xl font-bold tracking-tight md:text-4xl">{{ title }}</h2>
    <p v-if="subtitle" class="mt-4 text-lg leading-relaxed text-muted-foreground">{{ subtitle }}</p>
  </div>
</template>
