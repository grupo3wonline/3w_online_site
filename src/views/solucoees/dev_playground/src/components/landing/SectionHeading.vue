<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; highlight?: string; subtitle?: string }>()
</script>

<template>
  <div class="mx-auto mb-14 max-w-3xl text-center">
    <p v-if="eyebrow" class="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
      {{ eyebrow }}
    </p>
    <h2 class="text-3xl font-bold md:text-4xl">
      {{ title }} <span v-if="highlight" class="gradient-text">{{ highlight }}</span>
    </h2>
    <p v-if="subtitle" class="mt-4 text-lg text-muted-foreground">{{ subtitle }}</p>
  </div>
</template>
