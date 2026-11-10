<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import CookieBanner from '@/components/CookieBanner.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background">
    <AppHeader />
    <main class="flex-1 pt-16 md:pt-20">
      <BreadcrumbNav />
      <slot />
    </main>
    <AppFooter />
    <CookieBanner />
    <LoadingOverlay />
  </div>
</template>
