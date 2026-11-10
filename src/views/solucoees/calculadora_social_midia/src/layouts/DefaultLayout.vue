<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import CookieBanner from '@/components/CookieBanner.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import BackToTop from '@/components/BackToTop.vue'
</script>

<template>
  <div
    class="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <AppNavbar />
    <AppBreadcrumb class="pt-16" />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <AppFooter />
    <CookieBanner />
    <LoadingOverlay />
    <BackToTop />
  </div>
</template>
