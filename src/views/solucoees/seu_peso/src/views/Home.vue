<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Features Grid -->
    <FeaturesGrid />

    <!-- How It Works -->
    <HowItWorks />

    <!-- FAQ Section -->
    <FAQSection />

    <!-- CTA Section -->
    <CTASection />
  </div>
</template>

<script setup>
import HeroSection from "@/components/home/HeroSection.vue";
import FeaturesGrid from "@/components/home/FeaturesGrid.vue";
import HowItWorks from "@/components/home/HowItWorks.vue";
import FAQSection from "@/components/home/FAQSection.vue";
import CTASection from "@/components/home/CTASection.vue";
</script>
