<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <Header />

    <main class="flex-grow">
      <PrivacyPolicy />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import Header from "@/components/Shared/Header.vue";
import Footer from "@/components/Shared/Footer.vue";
import PrivacyPolicy from "@/components/Legal/PrivacyPolicy.vue";

useHead({
  title: "Política de Privacidade - Marca D'água Pro",
  meta: [
    {
      name: "description",
      content:
        "Política de Privacidade do Marca D'água Pro em conformidade com a LGPD. Saiba como protegemos seus dados pessoais.",
    },
    {
      name: "robots",
      content: "index, follow",
    },
  ],
});
</script>
