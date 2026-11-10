<script setup lang="ts">
defineProps<{ title: string; updated: string }>()
</script>

<template>
  <div class="container-app py-10 md:py-14">
    <article class="prose prose-slate mx-auto max-w-3xl dark:prose-invert">
      <h1>{{ title }}</h1>
      <p class="text-sm text-muted-foreground">Última atualização: {{ updated }}</p>
      <slot />
    </article>
  </div>
</template>
