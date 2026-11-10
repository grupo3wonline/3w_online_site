<script setup lang="ts">
import { onMounted } from 'vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import BenefitsSection from '@/components/sections/BenefitsSection.vue'
import FeaturesSection from '@/components/sections/FeaturesSection.vue'
import HowItWorksSection from '@/components/sections/HowItWorksSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import CompanySection from '@/components/sections/CompanySection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import { useSeo } from '@/composables/useSeo'
import { useAnalytics } from '@/composables/useAnalytics'
import { SITE } from '@/config/site'

useSeo(() => ({
  title: 'Calculadora de Metragem de Cabos - Gratuita, Rápida e Profissional',
  description: SITE.description,
  keywords:
    'calculadora cabos elétricos, metragem cabo, cálculo instalação elétrica, pontos elétricos, ferramenta eletricista, engenharia elétrica, dimensionamento cabos',
  url: SITE.url,
  type: 'website',
}))

const { trackPageView } = useAnalytics()
onMounted(() => trackPageView('/', 'Home'))
</script>

<template>
  <div class="flex flex-col">
    <HeroSection />
    <BenefitsSection />
    <FeaturesSection />
    <HowItWorksSection />
    <AboutSection />
    <CompanySection />
    <ContactSection />
    <FaqSection />
  </div>
</template>
