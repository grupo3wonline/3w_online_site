<script setup lang="ts">
defineProps<{
  /** Rótulo pequeno acima do título (eyebrow). */
  eyebrow?: string
  /** Título da seção. */
  title: string
  /** Descrição opcional abaixo do título. */
  subtitle?: string
  /** id para aria-labelledby. */
  id?: string
  /** Realça o título com gradiente de marca. */
  gradient?: boolean
}>()
</script>

<template>
  <div class="mx-auto mb-12 max-w-2xl text-center">
    <p
      v-if="eyebrow"
      class="mb-2 text-sm font-bold uppercase tracking-widest text-primary"
    >
      {{ eyebrow }}
    </p>
    <h2 :id="id" class="text-3xl font-black text-foreground sm:text-4xl">
      <span :class="gradient ? 'text-gradient' : ''">{{ title }}</span>
    </h2>
    <p v-if="subtitle" class="mt-3 text-muted-foreground">{{ subtitle }}</p>
  </div>
</template>
