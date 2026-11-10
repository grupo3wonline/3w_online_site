<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import AppBreadcrumb from './AppBreadcrumb.vue'
import LoadingOverlay from './LoadingOverlay.vue'
import CookieBanner from '@/components/common/CookieBanner.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <AppBreadcrumb />
    <!-- min-h reserva espaço e evita o footer "saltar" enquanto o conteúdo monta (CLS) -->
    <main class="flex-1 min-h-[80vh]">
      <slot />
    </main>
    <AppFooter />
    <CookieBanner />
    <LoadingOverlay />
  </div>
</template>
