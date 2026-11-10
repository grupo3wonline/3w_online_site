<script setup lang="ts">
import { onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useThemeStore } from '@/stores/theme'
import { useConsentStore } from '@/stores/consent'
import { useAnalytics } from '@/composables/useAnalytics'

const theme = useThemeStore()
const consent = useConsentStore()
const { updateConsent } = useAnalytics()

onMounted(() => {
  theme.init()
  consent.load()
  updateConsent(consent.analyticsAllowed)

  window.addEventListener('cookie-consent-updated', () => {
    updateConsent(consent.analyticsAllowed)
  })
})
</script>

<template>
  <AppLayout>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </AppLayout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
