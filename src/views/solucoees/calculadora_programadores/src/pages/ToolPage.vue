<script setup lang="ts">
import { Icon } from "@iconify/vue";
import CalculatorSection from "@/components/calculator/CalculatorSection.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { useSeo } from "@/composables/useSeo";

useSeo(() => ({
  title: "Calculadora de Orçamentos de Projetos",
  description:
    "Ferramenta para calcular orçamentos de projetos de software: horas, complexidade, urgência e valor final em tempo real.",
  path: "/ferramenta",
  keywords: "calculadora de orçamento, estimativa de projeto, precificação de software",
}));
</script>

<template>
  <div class="py-10 md:py-14">
    <div class="container-app mb-4">
      <BaseButton
        :to="{ name: 'home' }"
        variant="ghost"
        size="sm"
      >
        <Icon
          icon="lucide:arrow-left"
          class="h-4 w-4"
        />
        Voltar para o Início
      </BaseButton>
    </div>

    <div class="container-app">
      <SectionHeading
        eyebrow="Calculadora"
        eyebrow-icon="lucide:calculator"
        title="Calculadora de Projetos"
        subtitle="Estime seus projetos de forma precisa e profissional. Preencha os dados, adicione tarefas e veja o valor em tempo real."
      />
    </div>

    <CalculatorSection />
  </div>
</template>
