<script setup lang="ts">
import { onMounted } from "vue";
import { useConsentStore } from "@/stores/consent";
import LoadingOverlay from "@/components/feedback/LoadingOverlay.vue";
import CookieConsent from "@/components/feedback/CookieConsent.vue";

const consent = useConsentStore();

onMounted(() => {
  // Aplica o estado de consentimento ao GA/GTM assim que a app monta.
  consent.syncGtag();
});
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition
      name="fade"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </RouterView>

  <LoadingOverlay />
  <CookieConsent />
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
