<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import CookieConsent from './components/CookieConsent.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import { useThemeStore } from './stores/theme'
import { useUiStore } from './stores/ui'

const themeStore = useThemeStore()
const uiStore = useUiStore()
const { isLoading } = storeToRefs(uiStore)

onMounted(() => {
  themeStore.init()
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
    <AppHeader />
    <main id="conteudo" class="flex-1 pt-16 md:pt-20">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
    <CookieConsent />
    <LoadingOverlay :visible="isLoading" />
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
