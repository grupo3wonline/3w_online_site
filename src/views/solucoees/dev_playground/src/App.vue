<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import FullScreenLayout from '@/layouts/FullScreenLayout.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import CookieConsent from '@/components/common/CookieConsent.vue'

const route = useRoute()

// Rotas em tela cheia (ex.: editor) usam layout sem cabeçalho/rodapé fixos globais
const layout = computed(() => (route.meta.fullScreen ? FullScreenLayout : DefaultLayout))
</script>

<template>
  <component :is="layout">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </component>

  <LoadingOverlay />
  <CookieConsent />
</template>

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
