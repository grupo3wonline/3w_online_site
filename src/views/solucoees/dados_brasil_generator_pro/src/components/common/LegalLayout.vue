<script setup lang="ts">
defineProps<{ title: string; updated: string }>()
</script>

<template>
  <article class="container-app max-w-3xl py-12">
    <header class="mb-8">
      <h1 class="text-3xl font-extrabold sm:text-4xl">{{ title }}</h1>
      <p class="mt-2 text-sm text-muted-foreground">Última atualização: {{ updated }}</p>
    </header>
    <div class="legal-content space-y-6 text-muted-foreground">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.legal-content :deep(h2) {
  color: hsl(var(--foreground));
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1.5rem;
}
.legal-content :deep(p) {
  line-height: 1.7;
}
.legal-content :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
  line-height: 1.7;
}
.legal-content :deep(a) {
  color: hsl(var(--primary));
  text-decoration: underline;
}
.legal-content :deep(strong) {
  color: hsl(var(--foreground));
}
</style>
