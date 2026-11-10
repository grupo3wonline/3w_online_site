<script setup lang="ts">
import AppHeader from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import CookieConsent from '@/components/CookieConsent.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import FloatingActions from '@/components/FloatingActions.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50 transition-colors dark:bg-gray-900">
    <a
      href="#conteudo-principal"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
    >
      Pular para o conteúdo
    </a>

    <AppHeader />

    <div class="pt-16">
      <Breadcrumb />
    </div>

    <main id="conteudo-principal" class="flex-1">
      <slot />
    </main>

    <AppFooter />
    <FloatingActions />
    <CookieConsent />
    <LoadingOverlay />
  </div>
</template>
