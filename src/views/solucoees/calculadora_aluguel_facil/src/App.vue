<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CookieBanner from '@/components/layout/CookieBanner.vue'
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'
import FloatingHelp from '@/components/ui/FloatingHelp.vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
    <a
      href="#conteudo-principal"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
    >
      Pular para o conteúdo
    </a>

    <AppHeader />

    <main id="conteudo-principal" class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <AppFooter />
    <CookieBanner />
    <LoadingOverlay />
    <FloatingHelp />
  </div>
</template>
