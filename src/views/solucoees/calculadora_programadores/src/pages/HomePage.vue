<script setup lang="ts">
import HeroSection from "@/components/landing/HeroSection.vue";
import BenefitsSection from "@/components/landing/BenefitsSection.vue";
import HowItWorksSection from "@/components/landing/HowItWorksSection.vue";
import CalculatorSection from "@/components/calculator/CalculatorSection.vue";
import AboutSection from "@/components/landing/AboutSection.vue";
import ServicesSection from "@/components/landing/ServicesSection.vue";
import CtaSection from "@/components/landing/CtaSection.vue";
import ContactSection from "@/components/landing/ContactSection.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { useSeo } from "@/composables/useSeo";

useSeo(() => ({
  title:
    "Calculadora de Projetos para Programadores | Orçamentos Precisos — Grupo 3w Online",
  description:
    "Calcule orçamentos de projetos de software com precisão em segundos. Ferramenta gratuita e mobile first para programadores e freelancers. Desenvolvido pelo Grupo 3w Online.",
  path: "/",
  keywords:
    "calculadora de projetos, orçamento freelancer, quanto cobrar por um site, precificação de software, 3w online",
}));
</script>

<template>
  <div class="flex flex-col">
    <HeroSection />
    <BenefitsSection />
    <HowItWorksSection />

    <!-- Demonstração da ferramenta na própria landing -->
    <section
      id="demo"
      class="scroll-mt-20 bg-background py-20 md:py-24"
    >
      <div class="container-app">
        <SectionHeading
          eyebrow="Ferramenta"
          eyebrow-icon="lucide:calculator"
          title="Teste a calculadora agora"
          subtitle="Simule um orçamento em tempo real, sem sair da página e sem cadastro."
        />
      </div>
      <CalculatorSection />
    </section>

    <AboutSection />
    <ServicesSection />
    <CtaSection />
    <ContactSection />
  </div>
</template>
