<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Features Section -->
    <FeaturesSection />

    <!-- Stats Section -->
    <StatsSection />

    <!-- How It Works Section -->
    <HowItWorksSection />

    <!-- Benefits Section -->
    <BenefitsSection />

    <!-- Testimonials Section -->
    <TestimonialsSection />

    <!-- FAQ Section -->
    <FAQSection />

    <!-- CTA Section -->
    <CTASection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from "../components/HeroSection.vue";
import FeaturesSection from "../components/home/FeaturesSection.vue";
import StatsSection from "../components/home/StatsSection.vue";
import HowItWorksSection from "../components/home/HowItWorksSection.vue";
import BenefitsSection from "../components/BenefitsSection.vue";
import TestimonialsSection from "../components/home/TestimonialsSection.vue";
import FAQSection from "../components/home/FAQSection.vue";
import CTASection from "../components/CTASection.vue";
</script>
