<template>
  <div class="flex min-h-screen flex-col bg-white transition-colors duration-300 dark:bg-gray-900">
    <a
      href="#conteudo-principal"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
    >
      Pular para o conteúdo
    </a>

    <AppHeader />

    <main id="conteudo-principal" class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <AppFooter />

    <CookieConsent />
    <WhatsAppButton />
    <LoadingOverlay />

    <transition name="fade">
      <button
        v-if="showBackToTop"
        class="fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-primary-700 focus-visible:ring-4 focus-visible:ring-primary-300 no-print"
        aria-label="Voltar ao topo"
        @click="scrollToTop"
      >
        <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import CookieConsent from '@/components/CookieConsent.vue'
import WhatsAppButton from '@/components/WhatsAppButton.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const { y } = useWindowScroll()
const showBackToTop = computed(() => y.value > 500)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

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
