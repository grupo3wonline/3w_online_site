<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-primary-700 focus:text-white focus:rounded-lg"
    >
      {{ t('nav.skipToContent') }}
    </a>

    <AppHeader />

    <main id="main-content" class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <AppFooter />

    <CookieConsent />
    <LoadingOverlay :visible="ui.loading" :message="ui.loadingMessage" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import CookieConsent from '@/components/CookieConsent.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { useThemeStore } from '@/stores/theme'
import { useConsentStore } from '@/stores/consent'
import { useUiStore } from '@/stores/ui'

const { t } = useI18n()
// Instancia o tema para aplicar a classe no <html> desde o início.
useThemeStore()
const consent = useConsentStore()
const ui = useUiStore()

onMounted(() => {
  // Reaplica o consentimento salvo ao Google Consent Mode no carregamento.
  consent.syncToGoogle()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
