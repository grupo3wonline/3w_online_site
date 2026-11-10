<script setup lang="ts">
import HeroSection from '@/components/landing/HeroSection.vue'
import BenefitsSection from '@/components/landing/BenefitsSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import HowToSection from '@/components/landing/HowToSection.vue'
import UseCasesSection from '@/components/landing/UseCasesSection.vue'
import AboutSection from '@/components/landing/AboutSection.vue'
import TestimonialsSection from '@/components/landing/TestimonialsSection.vue'
import ServicesSection from '@/components/landing/ServicesSection.vue'
import UrgencyCtaSection from '@/components/landing/UrgencyCtaSection.vue'
import FinalCtaSection from '@/components/landing/FinalCtaSection.vue'
import ContactSection from '@/components/landing/ContactSection.vue'
import { useHead } from '@/composables/useHead'
import { site, company } from '@/config/site'

useHead({
  title: 'Editor de Código Online Grátis',
  description: site.description,
  keywords: site.keywords,
  path: '/',
  type: 'website',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: site.name,
    description: site.shortDescription,
    url: site.url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    author: { '@type': 'Organization', name: company.name, url: company.site },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '1500' },
    softwareVersion: site.version,
  },
})
</script>

<template>
  <div>
    <HeroSection />
    <BenefitsSection />
    <FeaturesSection />
    <HowToSection />
    <UseCasesSection />
    <AboutSection />
    <TestimonialsSection />
    <ServicesSection />
    <UrgencyCtaSection />
    <FinalCtaSection />
    <ContactSection />
  </div>
</template>
