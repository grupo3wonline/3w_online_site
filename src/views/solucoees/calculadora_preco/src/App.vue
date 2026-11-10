<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { buildJsonLd } from '@/lib/seo'

// JSON-LD global (Structured Data).
useHead({
  htmlAttrs: { lang: 'pt-BR' },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildJsonLd()),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
