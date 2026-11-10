<script setup lang="ts">
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import Breadcrumb from './Breadcrumb.vue'
import CookieBanner from './CookieBanner.vue'
import BotaoAjuda from './BotaoAjuda.vue'
import LoadingOverlay from './LoadingOverlay.vue'
import { useSeo } from '@/composables/useSeo'

// Mantém título/meta e GA4 sincronizados com a rota.
useSeo()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <a
      href="#conteudo-principal"
      class="skip-link"
    >Ir para o conteúdo</a>
    <Navbar />
    <Breadcrumb />
    <main
      id="conteudo-principal"
      class="flex-1"
    >
      <slot />
    </main>
    <Footer />
    <CookieBanner />
    <BotaoAjuda />
    <LoadingOverlay />
  </div>
</template>
