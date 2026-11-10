<script setup lang="ts">
import { Icon } from '@iconify/vue';

const steps = [
  {
    icon: 'fa6-solid:arrow-pointer',
    color: 'text-brand-500',
    title: 'Passo 1: Preencha Seus Dados',
    description:
      'Insira sua altura, peso, idade, sexo e nível de atividade. Leva menos de 2 minutos e é 100% confidencial.',
  },
  {
    icon: 'fa6-solid:calculator',
    color: 'text-blue-500',
    title: 'Passo 2: Clique em "Calcular"',
    description:
      'Nossa ferramenta processa instantaneamente suas informações usando algoritmos precisos para gerar seu perfil de saúde.',
  },
  {
    icon: 'fa6-solid:chart-column',
    color: 'text-yellow-500',
    title: 'Passo 3: Receba Seus Resultados',
    description:
      'Visualize seu IMC, peso ideal, metas de calorias e macronutrientes em um painel claro e objetivo.',
  },
  {
    icon: 'fa6-solid:download',
    color: 'text-purple-500',
    title: 'Passo 4: Baixe seu Plano em PDF',
    description:
      'Salve seu relatório completo para acompanhar a evolução e ter suas metas sempre à mão. Totalmente grátis!',
  },
];
</script>

<template>
  <section
    id="como-funciona"
    class="bg-gray-50 py-20 dark:bg-gray-800"
  >
    <div class="container-page">
      <div class="mb-12 text-center">
        <span class="section-badge">
          <Icon
            icon="fa6-solid:list-check"
            aria-hidden="true"
          />
          Passo a passo
        </span>
        <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Simples, Rápido e <span class="text-brand-500">Poderoso</span>
        </h2>
        <p class="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Em apenas 4 passos, você terá um guia completo para transformar sua saúde.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 100 } }"
          class="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-lg dark:border-gray-700 dark:bg-gray-900"
        >
          <div
            class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-gray-100 dark:border-gray-900 dark:bg-gray-800"
          >
            <Icon
              :icon="step.icon"
              class="text-3xl"
              :class="step.color"
              aria-hidden="true"
            />
          </div>
          <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            {{ step.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
