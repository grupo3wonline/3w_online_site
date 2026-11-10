<template>
  <div
    id="app"
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <TheHeader />

    <main class="flex-1">
      <router-view />
    </main>

    <TheFooter />

    <!-- Cookie Banner -->
    <CookieBanner />
  </div>
</template>

<script setup>
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import CookieBanner from "@/components/CookieBanner.vue";
import { useSEO } from "@/composables/useSEO";

// Initialize SEO
const { addStructuredData } = useSEO();

// Add global structured data for the organization
addStructuredData({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Seu Peso - Calculadora de Saúde",
  description:
    "Calculadora completa de saúde corporal: IMC, metabolismo basal, calorias diárias e muito mais",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  author: {
    "@type": "Organization",
    name: "Grupo 3w Online",
    url: "https://www.3wonline.com.br/",
  },
});
</script>
