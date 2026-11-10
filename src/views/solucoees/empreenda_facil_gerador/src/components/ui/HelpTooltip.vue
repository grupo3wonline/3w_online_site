<script setup lang="ts">
import { Icon } from "@iconify/vue";

/** Ícone de ajuda com tooltip acessível (title + aria-label). */
defineProps<{ text: string }>();
</script>

<template>
  <span class="group relative inline-flex items-center align-middle">
    <button
      type="button"
      class="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      :aria-label="text"
      :title="text"
    >
      <Icon icon="lucide:help-circle" class="h-4 w-4" />
    </button>
    <span
      role="tooltip"
      class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-md bg-foreground px-3 py-2 text-xs text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
    >
      {{ text }}
    </span>
  </span>
</template>
