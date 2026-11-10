<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useWindowScroll } from '@vueuse/core'
import TheNavbar from './TheNavbar.vue'
import TheFooter from './TheFooter.vue'
import TheBreadcrumb from './TheBreadcrumb.vue'
import CookieBanner from './CookieBanner.vue'
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'
import { company } from '@/config/site'

const { y } = useWindowScroll({ behavior: 'smooth' })

function scrollToTop() {
  y.value = 0
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background">
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>

    <TheNavbar />

    <main id="conteudo" class="flex-grow">
      <div class="container-app py-6">
        <TheBreadcrumb />
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </main>

    <TheFooter />

    <!-- Ações flutuantes -->
    <div class="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      <Transition name="fab">
        <button
          v-if="y > 400"
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
          @click="scrollToTop"
        >
          <Icon icon="fa6-solid:arrow-up" class="text-lg" aria-hidden="true" />
        </button>
      </Transition>
      <a
        :href="company.whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
        class="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110 hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
        aria-label="Falar no WhatsApp"
        title="Precisa de ajuda? Fale no WhatsApp"
      >
        <Icon icon="fa6-brands:whatsapp" class="text-3xl" aria-hidden="true" />
      </a>
    </div>

    <CookieBanner />
    <LoadingOverlay />
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
.fab-enter-active,
.fab-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(8px);
}
</style>
