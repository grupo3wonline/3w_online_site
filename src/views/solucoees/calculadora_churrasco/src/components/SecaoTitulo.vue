<template>
  <div class="mb-12 text-center">
    <span class="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-bbq-orange">
      {{ subtitulo }}
    </span>
    <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">{{ titulo }}</h2>
    <p v-if="descricao" class="mx-auto max-w-2xl text-lg text-muted-foreground">{{ descricao }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  subtitulo: string
  titulo: string
  descricao?: string
}>()
</script>
