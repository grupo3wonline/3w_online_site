<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import CookieBanner from '@/components/common/CookieBanner.vue'
import HelpButton from '@/components/common/HelpButton.vue'
import ScrollToTop from '@/components/common/ScrollToTop.vue'
import { useSeo } from '@/composables/useSeo'

// Aplica SEO por rota globalmente
useSeo()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>

    <AppNavbar />

    <main id="conteudo" class="flex-grow pt-20">
      <AppBreadcrumb />
      <RouterView v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </main>

    <AppFooter />

    <!-- Camadas globais -->
    <LoadingOverlay />
    <CookieBanner />
    <HelpButton />
    <ScrollToTop />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
