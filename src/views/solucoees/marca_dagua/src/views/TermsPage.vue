<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <Header />

    <main class="flex-grow">
      <TermsOfService />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import Header from "@/components/Shared/Header.vue";
import Footer from "@/components/Shared/Footer.vue";
import TermsOfService from "@/components/Legal/TermsOfService.vue";

useHead({
  title: "Termos de Uso - Marca D'água Pro",
  meta: [
    {
      name: "description",
      content:
        "Termos de Uso do Marca D'água Pro. Conheça as condições de utilização do nosso serviço de marca d'água online.",
    },
    {
      name: "robots",
      content: "index, follow",
    },
  ],
});
</script>
