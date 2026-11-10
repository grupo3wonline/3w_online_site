<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSeo } from '@/composables/useSeo'
import { routeSeo } from '@/lib/seo'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import CookieBanner from '@/components/common/CookieBanner.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'

const route = useRoute()

// SEO reativo conforme a meta da rota (recalcula a cada navegação).
const currentSeo = computed(() => {
  const key = (route.meta.seo as string) || 'home'
  return routeSeo[key] ?? routeSeo.home
})
useSeo(currentSeo)

const isLanding = computed(() => route.name === 'home')
</script>

<template>
  <div class="flex min-h-screen flex-col bg-app-gradient">
    <AppNavbar />

    <main class="flex-1">
      <AppBreadcrumb v-if="!isLanding" />
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <AppFooter />
    <CookieBanner />
    <LoadingOverlay />
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
