<script setup lang="ts">
import { Icon } from "@iconify/vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";

const steps = [
  {
    icon: "lucide:user-cog",
    title: "Defina sua taxa",
    description: "Informe seu valor por hora e o multiplicador de urgência do projeto.",
    tip: "Inclua impostos, custos fixos e sua margem de lucro na taxa horária.",
  },
  {
    icon: "lucide:list-plus",
    title: "Adicione as tarefas",
    description: "Liste as tarefas com horas estimadas, complexidade e tecnologia.",
    tip: "Quebre entregas grandes em tarefas menores para estimar melhor.",
  },
  {
    icon: "lucide:file-check",
    title: "Gere o orçamento",
    description: "Veja o valor total em tempo real e gere o resumo do orçamento.",
    tip: "Revise a complexidade antes de enviar a proposta ao cliente.",
  },
];
</script>

<template>
  <section
    id="como-funciona"
    class="scroll-mt-20 bg-secondary/40 py-20 md:py-24"
  >
    <div class="container-app">
      <SectionHeading
        eyebrow="Passo a passo"
        eyebrow-icon="lucide:route"
        title="Como funciona"
        subtitle="Três passos simples para um orçamento profissional. Sem complicação."
      />

      <div class="relative grid grid-cols-1 gap-6 md:grid-cols-3">
        <article
          v-for="(step, i) in steps"
          :key="step.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 120 } }"
          class="relative rounded-2xl border border-border bg-card p-7 shadow-card"
        >
          <div class="mb-4 flex items-center justify-between">
            <span
              class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow"
            >
              <Icon
                :icon="step.icon"
                class="h-6 w-6"
              />
            </span>
            <span class="text-4xl font-extrabold text-primary/15">0{{ i + 1 }}</span>
          </div>
          <h3 class="text-lg font-bold text-foreground">
            {{ step.title }}
          </h3>
          <p class="mt-2 text-muted-foreground">
            {{ step.description }}
          </p>
          <p
            class="mt-4 flex items-start gap-2 rounded-xl bg-warning/10 p-3 text-sm text-muted-foreground"
          >
            <Icon
              icon="lucide:lightbulb"
              class="mt-0.5 h-4 w-4 shrink-0 text-warning"
            />
            <span><strong class="text-foreground">Dica:</strong> {{ step.tip }}</span>
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
