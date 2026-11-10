<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
import LoadingOverlay from "@/components/layout/LoadingOverlay.vue";
import CookieBanner from "@/components/layout/CookieBanner.vue";
import { useSeo } from "@/composables/useSeo";
import { siteConfig } from "@/config/site";

const route = useRoute();

// SEO reativo baseado na meta da rota atual.
useSeo(() => ({
  title: route.meta.title as string | undefined,
  description: route.meta.description as string | undefined,
  path: route.path === "/" ? "" : route.path,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    author: { "@type": "Organization", name: siteConfig.company.name },
  },
}));

const transitionName = computed(() => "route-fade");
</script>

<template>
  <DefaultLayout>
    <RouterView v-slot="{ Component }">
      <Transition :name="transitionName" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </DefaultLayout>
  <LoadingOverlay />
  <CookieBanner />
</template>

<style>
.route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity 0.2s ease;
}
.route-fade-enter-from,
.route-fade-leave-to {
  opacity: 0;
}
</style>
