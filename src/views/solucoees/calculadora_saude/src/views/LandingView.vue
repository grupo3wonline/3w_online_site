<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import HeroSection from '@/components/sections/HeroSection.vue';
import BenefitsSection from '@/components/sections/BenefitsSection.vue';
import HowItWorksSection from '@/components/sections/HowItWorksSection.vue';
import CalculatorSection from '@/components/sections/CalculatorSection.vue';
import FeaturesSection from '@/components/sections/FeaturesSection.vue';

// Carregado sob demanda: só entra no bundle quando o usuário calcula (contém ApexCharts).
const ResultsSection = defineAsyncComponent(
  () => import('@/components/sections/ResultsSection.vue')
);
import HealthTipsSection from '@/components/sections/HealthTipsSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import ServicesSection from '@/components/sections/ServicesSection.vue';
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue';
import Cta3WSection from '@/components/sections/Cta3WSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import { useCalculatorStore } from '@/stores/calculator';
import { useSeo } from '@/composables/useSeo';

const calculator = useCalculatorStore();
const { showResults } = storeToRefs(calculator);

function scrollToCalculator() {
  document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
}

useSeo(() => ({
  title: 'Calculadora de Saúde — IMC, Peso Ideal e Plano Nutricional Grátis',
  description:
    'Descubra seu IMC, peso ideal e receba um plano nutricional personalizado em 2 minutos. Ferramenta gratuita, privada e baseada em ciência. Desenvolvida pelo Grupo 3W Online.',
  keywords:
    'calculadora de saúde, IMC, índice de massa corporal, peso ideal, calorias diárias, plano nutricional, macros, proteína, carboidratos, saúde, 3W Online',
  path: '/',
  type: 'website',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculadora de Saúde',
    description:
      'Calculadora de Saúde — descubra seu IMC, peso ideal e plano nutricional personalizado em minutos.',
    url: 'https://www.3wonline.com.br/calculadora_saude/',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    author: { '@type': 'Organization', name: 'Grupo 3W Online' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '2500' },
  },
}));
</script>

<template>
  <div>
    <HeroSection @scroll-to-calculator="scrollToCalculator" />
    <BenefitsSection />
    <HowItWorksSection />
    <CalculatorSection />
    <ResultsSection v-if="showResults" />
    <FeaturesSection />
    <HealthTipsSection />
    <AboutSection />
    <ServicesSection />
    <TestimonialsSection />
    <Cta3WSection />
    <ContactSection />
  </div>
</template>
