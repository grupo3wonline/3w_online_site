<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import HeroSection from '@/components/home/HeroSection.vue'
import BenefitsSection from '@/components/home/BenefitsSection.vue'
import ToolsSection from '@/components/home/ToolsSection.vue'
import HowItWorksSection from '@/components/home/HowItWorksSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import CtaSection from '@/components/home/CtaSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'

useSeo({
  title: 'DevStart Academy | Aprenda Programação de Forma Gamificada',
  description:
    'Plataforma educacional gamificada para aprender lógica de programação, algoritmos, PHP e desenvolvimento web. Ferramentas interativas, tutor com IA, grátis e em português.',
  path: '/',
})
</script>

<template>
  <div>
    <HeroSection />
    <BenefitsSection />
    <ToolsSection />
    <HowItWorksSection />
    <AboutSection />
    <CtaSection />
    <ContactSection />
  </div>
</template>
