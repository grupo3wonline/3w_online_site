<script setup lang="ts">
import { Icon } from "@iconify/vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";

const benefits = [
  {
    icon: "lucide:zap",
    title: "Rapidez extrema",
    description: "Gere orçamentos complexos em menos de 2 minutos. Poupe horas de planilhas manuais.",
  },
  {
    icon: "lucide:shield-check",
    title: "Precisão profissional",
    description: "Cálculo baseado em métricas reais de mercado. Nunca mais chute um valor.",
  },
  {
    icon: "lucide:smartphone",
    title: "Mobile First",
    description: "Acesse de qualquer lugar. Calcule orçamentos durante uma reunião pelo celular.",
  },
];
</script>

<template>
  <section
    id="beneficios"
    class="scroll-mt-20 bg-background py-20 md:py-24"
  >
    <div class="container-app">
      <SectionHeading
        eyebrow="Por que usar"
        eyebrow-icon="lucide:star"
        title="Feito por quem entende de desenvolvimento"
        subtitle="Para quem vive de desenvolvimento. Simples, rápido e preciso."
      />

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <article
          v-for="(b, i) in benefits"
          :key="b.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 100 } }"
          class="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
        >
          <div
            class="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-primary transition-transform duration-300 group-hover:scale-x-100"
          />
          <span
            class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground"
          >
            <Icon
              :icon="b.icon"
              class="h-7 w-7"
            />
          </span>
          <h3 class="text-xl font-bold text-foreground">
            {{ b.title }}
          </h3>
          <p class="mt-2 text-muted-foreground">
            {{ b.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
