<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
    <a href="#conteudo-principal" class="sr-only focus:not-sr-only focus:absolute focus:z-[110] focus:left-4 focus:top-4 focus:rounded-lg focus:bg-bbq-orange focus:px-4 focus:py-2 focus:text-white">
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
    <CookieBanner />
    <LoadingOverlay />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import CookieBanner from '@/components/CookieBanner.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import BackToTop from '@/components/BackToTop.vue'
import { useTheme } from '@/composables/useTheme'

useTheme()
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
