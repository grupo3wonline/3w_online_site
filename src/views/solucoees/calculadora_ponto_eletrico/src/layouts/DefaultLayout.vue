<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import LoadingOverlay from '@/components/layout/LoadingOverlay.vue'
import CookieConsent from '@/components/CookieConsent.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <Header />
    <Breadcrumb />
    <main class="flex-grow">
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-150"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
    <CookieConsent />
    <LoadingOverlay />
  </div>
</template>
