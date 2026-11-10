<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{ title: string; icon: string; updatedAt: string }>()
</script>

<template>
  <div class="bg-background">
    <header class="border-b bg-muted/40">
      <div class="container-page py-12">
        <div class="mx-auto flex max-w-3xl items-center gap-4">
          <span class="flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand">
            <Icon :icon="icon" class="h-7 w-7 text-white" />
          </span>
          <div>
            <h1 class="text-3xl font-bold md:text-4xl">{{ title }}</h1>
            <p class="text-sm text-muted-foreground">Última atualização: {{ updatedAt }}</p>
          </div>
        </div>
      </div>
    </header>

    <article class="container-page legal-content mx-auto max-w-3xl py-12">
      <slot />
    </article>
  </div>
</template>

<style scoped>
.legal-content :deep(h2) {
  @apply mb-3 mt-8 text-xl font-bold;
}
.legal-content :deep(h3) {
  @apply mb-2 mt-6 text-lg font-semibold;
}
.legal-content :deep(p) {
  @apply mb-4 leading-relaxed text-muted-foreground;
}
.legal-content :deep(ul) {
  @apply mb-4 ml-5 list-disc space-y-1 text-muted-foreground;
}
.legal-content :deep(a) {
  @apply text-primary hover:underline;
}
.legal-content :deep(strong) {
  @apply text-foreground;
}
</style>
