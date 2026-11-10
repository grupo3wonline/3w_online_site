<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'
import PrivacyConsent from '@/components/PrivacyConsent.vue'
import AITutor from '@/components/AITutor.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#conteudo-principal"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
    >
      Pular para o conteúdo
    </a>

    <AppHeader />
    <AppBreadcrumb />

    <main
      id="conteudo-principal"
      class="flex-1"
    >
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          leave-active-class="transition duration-150 ease-in"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />

    <LoadingOverlay />
    <ScrollToTop />
    <PrivacyConsent />
    <AITutor />
  </div>
</template>
