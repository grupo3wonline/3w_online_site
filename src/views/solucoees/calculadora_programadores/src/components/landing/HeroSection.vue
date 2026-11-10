<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import heroImage from "@/assets/calculator-hero.jpg";

const stats = [
  { value: "2.500+", label: "devs usando" },
  { value: "< 2 min", label: "por orçamento" },
  { value: "100%", label: "gratuito" },
];
</script>

<template>
  <section
    id="topo"
    class="relative overflow-hidden bg-gradient-hero"
  >
    <!-- Mesh de fundo -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-mesh"
      aria-hidden="true"
    />

    <div class="container-app relative pb-20 pt-14 md:pb-28 md:pt-20">
      <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div
          v-motion
          :initial="{ opacity: 0, y: 28 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="flex flex-col items-start gap-6 text-left"
        >
          <span class="eyebrow">
            <Icon
              icon="lucide:sparkles"
              class="h-3.5 w-3.5"
            />
            Novo · versão Mobile First
          </span>

          <h1 class="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground lg:text-6xl">
            Pare de perder dinheiro em seus
            <span class="text-gradient">orçamentos de software</span>
          </h1>

          <p class="max-w-xl text-lg text-muted-foreground">
            Descubra exatamente quanto cobrar pelos seus projetos em segundos. A ferramenta
            definitiva para freelancers e desenvolvedores que valorizam seu tempo.
          </p>

          <div class="flex flex-col gap-3 sm:flex-row">
            <BaseButton
              :to="{ name: 'tool' }"
              size="lg"
              variant="hero"
            >
              Calcular agora grátis
              <Icon
                icon="lucide:arrow-right"
                class="h-5 w-5"
              />
            </BaseButton>
            <BaseButton
              href="#beneficios"
              size="lg"
              variant="outline"
            >
              Saiba mais
            </BaseButton>
          </div>

          <dl class="mt-2 flex flex-wrap gap-8">
            <div
              v-for="s in stats"
              :key="s.label"
            >
              <dt class="text-2xl font-extrabold text-foreground">
                {{ s.value }}
              </dt>
              <dd class="text-sm text-muted-foreground">
                {{ s.label }}
              </dd>
            </div>
          </dl>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.94 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 150 } }"
          class="relative"
        >
          <div class="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-primary opacity-20 blur-3xl" />
          <div class="surface-card overflow-hidden rounded-[1.75rem] p-2">
            <img
              :src="heroImage"
              alt="Calculadora de projetos para programadores"
              class="w-full rounded-[1.35rem]"
              width="640"
              height="420"
              loading="eager"
              fetchpriority="high"
            >
          </div>

          <!-- Card flutuante de destaque -->
          <div
            class="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-elegant backdrop-blur sm:flex"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-success/15 text-success">
              <Icon
                icon="lucide:check-circle"
                class="h-5 w-5"
              />
            </span>
            <div>
              <p class="text-sm font-bold text-foreground">
                Orçamento pronto
              </p>
              <p class="text-xs text-muted-foreground">
                em poucos cliques
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
