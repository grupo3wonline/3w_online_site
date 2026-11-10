<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
</script>

<template>
  <div
    class="flex min-h-screen flex-col bg-ink-50 text-ink-800 transition-colors duration-300 dark:bg-ink-950 dark:text-ink-100"
  >
    <AppHeader />
    <BreadcrumbNav />

    <main id="main-content" class="w-full flex-1">
      <RouterView />
    </main>

    <AppFooter />
    <LoadingOverlay />
  </div>
</template>
