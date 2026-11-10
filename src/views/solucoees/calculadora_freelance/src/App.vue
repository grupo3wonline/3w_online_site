<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CookieBanner from '@/components/layout/CookieBanner.vue'
import GlobalLoader from '@/components/layout/GlobalLoader.vue'
import ScrollTopButton from '@/components/layout/ScrollTopButton.vue'
import WhatsappButton from '@/components/layout/WhatsappButton.vue'
import { useSeo } from '@/composables/useSeo'

// SEO dinâmico por rota (title, description, canonical, OG, page_view)
useSeo()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white dark:bg-gray-950">
    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
    >
      Pular para o conteúdo
    </a>

    <AppHeader />

    <main id="conteudo" class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-150"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />

    <CookieBanner />
    <GlobalLoader />
    <ScrollTopButton />
    <WhatsappButton />
  </div>
</template>
