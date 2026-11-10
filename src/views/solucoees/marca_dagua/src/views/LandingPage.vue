<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex-grow">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <CTASection />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import Header from "@/components/Shared/Header.vue";
import Footer from "@/components/Shared/Footer.vue";
import HeroSection from "@/components/Landing/HeroSection.vue";
import FeaturesSection from "@/components/Landing/FeaturesSection.vue";
import BenefitsSection from "@/components/Landing/BenefitsSection.vue";
import HowItWorksSection from "@/components/Landing/HowItWorksSection.vue";
import CTASection from "@/components/Landing/CTASection.vue";

useHead({
  title:
    "Marca D'água Pro - Adicione Marca D'água Profissional em Suas Imagens",
  meta: [
    {
      name: "description",
      content:
        "Adicione marca d'água profissional em suas imagens gratuitamente. Rápido, fácil e 100% seguro. Processamento offline no navegador. Sem cadastro, sem limites.",
    },
    {
      name: "keywords",
      content:
        "marca d'água, watermark, proteção de imagens, adicionar logo, marca dagua online, gratuito",
    },
    {
      property: "og:title",
      content: "Marca D'água Pro - Proteja Suas Imagens Gratuitamente",
    },
    {
      property: "og:description",
      content:
        "Adicione marca d'água profissional em suas imagens em segundos. 100% gratuito e seguro.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Marca D'água Pro - Proteja Suas Imagens",
    },
    {
      name: "twitter:description",
      content:
        "Adicione marca d'água profissional em suas imagens gratuitamente",
    },
  ],
});
</script>
