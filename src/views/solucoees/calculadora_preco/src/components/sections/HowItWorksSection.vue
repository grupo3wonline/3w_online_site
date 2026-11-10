<script setup lang="ts">
import { Icon } from '@iconify/vue'

const steps = [
  {
    number: '01',
    icon: 'fa6-solid:pen-to-square',
    title: 'Insira os Dados',
    description: 'Informe custos fixos, variáveis e a margem de lucro desejada.',
  },
  {
    number: '02',
    icon: 'fa6-solid:gear',
    title: 'Processamento',
    description: 'Nosso algoritmo calcula automaticamente o preço ideal.',
  },
  {
    number: '03',
    icon: 'fa6-solid:circle-check',
    title: 'Resultado Pronto',
    description: 'Receba o preço final com análise detalhada e sugestões.',
  },
]

// "Como Usar" — passos detalhados (originalmente da página Sobre).
const howToUse = [
  {
    step: '01',
    title: 'Levante Todos os Custos Fixos',
    description:
      'Anote todos os gastos mensais que você tem independentemente de vender ou não: aluguel, salários, contas, etc.',
  },
  {
    step: '02',
    title: 'Calcule Custos Variáveis',
    description:
      'Identifique gastos que variam conforme o volume de vendas: matéria-prima, embalagens, comissões, fretes.',
  },
  {
    step: '03',
    title: 'Defina Sua Margem de Lucro',
    description:
      'Decida quanto deseja lucrar. Recomendamos entre 20% e 40% dependendo do mercado e segmento.',
  },
  {
    step: '04',
    title: 'Insira os Dados na Calculadora',
    description:
      'Preencha todos os campos com atenção. Quanto mais preciso, melhor será o resultado do cálculo.',
  },
]
</script>

<template>
  <section id="como-funciona" class="py-20">
    <div class="container">
      <div class="mb-16 space-y-4 text-center">
        <h2 class="text-3xl font-black text-foreground md:text-5xl">Como Funciona?</h2>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
          3 passos simples para precificar profissionalmente
        </p>
      </div>

      <div class="mx-auto max-w-5xl">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div v-for="(step, index) in steps" :key="step.number" class="relative">
            <div
              v-if="index < steps.length - 1"
              class="absolute left-1/2 top-20 hidden h-1 w-full bg-gradient-to-r from-violet-600 to-purple-600 md:block"
            />
            <div
              class="relative space-y-4 rounded-2xl border border-border bg-card p-8 text-center shadow-card"
            >
              <div
                class="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-lg font-bold text-white shadow-lg"
              >
                {{ step.number }}
              </div>
              <div
                class="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-xl bg-accent"
              >
                <Icon :icon="step.icon" class="h-8 w-8 text-primary" />
              </div>
              <h3 class="text-xl font-bold text-foreground">{{ step.title }}</h3>
              <p class="text-muted-foreground">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Como Usar (guia detalhado) -->
      <div class="mx-auto mt-20 max-w-6xl">
        <div class="mb-10 text-center">
          <h3 class="text-2xl font-black text-foreground md:text-3xl">
            <Icon icon="fa6-solid:book-open" class="mr-2 inline h-6 w-6 text-primary" />
            Como Usar — Passo a Passo
          </h3>
          <p class="mt-2 text-muted-foreground">Siga este guia para obter resultados precisos</p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            v-for="item in howToUse"
            :key="item.step"
            class="rounded-2xl border border-border bg-card p-8 shadow-card"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 rounded-lg bg-accent px-3 py-2 text-2xl font-black text-primary"
              >
                {{ item.step }}
              </div>
              <div>
                <h4 class="mb-2 text-lg font-bold text-foreground">{{ item.title }}</h4>
                <p class="text-muted-foreground">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
