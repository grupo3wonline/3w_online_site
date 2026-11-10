<script setup lang="ts">
import { RouterView } from 'vue-router'
import ConsentBanner from '@/components/ConsentBanner.vue'
</script>

<template>
  <a
    href="#main-content"
    class="sr-only z-50 rounded bg-primary-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-2 focus:top-2"
  >
    Pular para o conteúdo principal
  </a>

  <RouterView />
  <ConsentBanner />
</template>
