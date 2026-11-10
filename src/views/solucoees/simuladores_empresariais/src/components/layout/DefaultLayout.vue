<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import AppBreadcrumb from './AppBreadcrumb.vue'
import LoadingOverlay from './LoadingOverlay.vue'
import CookieConsent from './CookieConsent.vue'
import ScrollProgress from './ScrollProgress.vue'
import BackToTop from './BackToTop.vue'
import WhatsAppFloat from './WhatsAppFloat.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#conteudo-principal"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      Pular para o conteúdo
    </a>
    <ScrollProgress />
    <AppHeader />
    <AppBreadcrumb />
    <main id="conteudo-principal" class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <LoadingOverlay />
    <CookieConsent />
    <BackToTop />
    <WhatsAppFloat />
  </div>
</template>
