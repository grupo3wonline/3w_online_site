<script setup lang="ts">
import { RouterView } from "vue-router";
import { Icon } from "@iconify/vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import AppBreadcrumb from "@/components/layout/AppBreadcrumb.vue";
import BaseTooltip from "@/components/ui/BaseTooltip.vue";

const WHATSAPP = "5541996924829";
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
    <AppHeader />
    <AppBreadcrumb />

    <main
      id="conteudo"
      class="flex flex-1 flex-col"
    >
      <RouterView v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <AppFooter />

    <!-- Botão flutuante de contato rápido (WhatsApp) -->
    <BaseTooltip text="Fale conosco no WhatsApp">
      <a
        :href="`https://wa.me/${WHATSAPP}`"
        target="_blank"
        rel="noopener noreferrer"
        class="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Falar no WhatsApp"
      >
        <Icon
          icon="fa6-brands:whatsapp"
          class="h-7 w-7"
        />
      </a>
    </BaseTooltip>
  </div>
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
