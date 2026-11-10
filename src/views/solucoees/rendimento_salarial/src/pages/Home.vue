<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Calculator Section -->
    <section id="calculadora" class="py-20 bg-gray-50 dark:bg-gray-800">
      <CalculatorSection />
    </section>

    <!-- Features Section -->
    <FeaturesShowcase />

    <!-- How It Works Section -->
    <HowItWorksSection />

    <!-- CTA Section -->
    <CtaSection />

    <!-- FAQ Section -->
    <FaqSection />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useSEO } from "@/composables/useSEO";
import HeroSection from "@/components/landing/HeroSection.vue";
import CalculatorSection from "@/components/CalculatorSection.vue";
import FeaturesShowcase from "@/components/landing/FeaturesShowcase.vue";
import HowItWorksSection from "@/components/landing/HowItWorksSection.vue";
import CtaSection from "@/components/landing/CtaSection.vue";
import FaqSection from "@/components/landing/FaqSection.vue";

export default {
  name: "HomePage",
  components: {
    HeroSection,
    CalculatorSection,
    FeaturesShowcase,
    HowItWorksSection,
    CtaSection,
    FaqSection,
  },
  setup() {
    const { updateSEO } = useSEO();

    onMounted(() => {
      updateSEO({
        title:
          "Rendimento Salarial - Calculadora Online Gratuita | Calcule Seu Salário",
        description:
          "Calculadora de rendimento salarial gratuita: calcule quanto você ganha por hora, dia, semana, mês e ano. Ferramenta moderna, segura e instantânea para planejamento financeiro.",
        keywords:
          "calculadora salarial, rendimento por hora, salário mensal, planejamento financeiro, calculadora gratuita, salário por dia, salário por semana",
        canonical: "https://app.3wonline.com/rendimentosalarial",
        ogType: "website",
      });
    });

    return {};
  },
};
</script>
