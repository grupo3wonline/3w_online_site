<script setup lang="ts">
import Hero from '@/components/Home/Hero.vue'
import Benefits from '@/components/Home/Benefits.vue'
import Features from '@/components/Home/Features.vue'
import HowTo from '@/components/Home/HowTo.vue'
import CalculatorSection from '@/components/Home/CalculatorSection.vue'
import Tools from '@/components/Home/Tools.vue'
import AboutSection from '@/components/Home/AboutSection.vue'
import Services from '@/components/Home/Services.vue'
import Faq from '@/components/Home/Faq.vue'
import ContactSection from '@/components/Home/ContactSection.vue'
import AgencyCta from '@/components/Home/AgencyCta.vue'
import { useSEO, SEO_PRESETS } from '@/composables/useSEO'

useSEO(SEO_PRESETS.HOME)
</script>

<template>
  <div>
    <Hero />
    <Benefits />
    <Features />
    <HowTo />
    <CalculatorSection />
    <Tools />
    <AboutSection />
    <Services />
    <Faq />
    <ContactSection />
    <AgencyCta />
  </div>
</template>
