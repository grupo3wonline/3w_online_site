<script setup lang="ts">
import { Icon } from '@iconify/vue';

const tips = [
  {
    icon: 'fa6-solid:droplet',
    color: 'text-blue-400',
    title: 'Água',
    description:
      'Mantenha-se hidratado bebendo água pura diariamente. A hidratação adequada é fundamental para o funcionamento de todos os órgãos.',
  },
  {
    icon: 'fa6-solid:wind',
    color: 'text-cyan-400',
    title: 'Ar Puro',
    description:
      'Respire ar fresco e pratique exercícios ao ar livre. O oxigênio puro revitaliza cada célula do seu corpo.',
  },
  {
    icon: 'fa6-solid:sun',
    color: 'text-yellow-400',
    title: 'Luz Solar',
    description:
      'Exponha-se ao sol matinal por 15-30 minutos diariamente. A vitamina D é essencial para ossos fortes e imunidade.',
  },
  {
    icon: 'fa6-solid:moon',
    color: 'text-indigo-400',
    title: 'Descanso',
    description:
      'Durma 7-8 horas por noite para recuperação adequada. O sono reparador é quando seu corpo se regenera.',
  },
  {
    icon: 'fa6-solid:heart',
    color: 'text-purple-400',
    title: 'Temperança',
    description:
      'Pratique moderação em todas as atividades. O equilíbrio é a chave para uma vida saudável e duradoura.',
  },
  {
    icon: 'fa6-solid:apple-whole',
    color: 'text-green-400',
    title: 'Nutrição',
    description:
      'Consuma alimentos naturais e balanceados. Frutas, vegetais e grãos integrais nutrem seu corpo de forma completa.',
  },
  {
    icon: 'fa6-solid:dumbbell',
    color: 'text-red-400',
    title: 'Exercício Físico',
    description:
      'Mantenha-se ativo com exercícios regulares. A atividade física fortalece músculos, ossos e o sistema cardiovascular.',
  },
  {
    icon: 'fa6-solid:brain',
    color: 'text-pink-400',
    title: 'Confiança Divina',
    description:
      'Cultive paz mental e espiritualidade. A tranquilidade interior reflete na saúde física e emocional.',
  },
];
</script>

<template>
  <section
    id="dicas"
    class="bg-gray-800 px-4 py-20"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
          8 Remédios Naturais para uma Vida Saudável
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-gray-400">
          Descubra os pilares fundamentais de um estilo de vida saudável e equilibrado
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="tip in tips"
          :key="tip.title"
          class="rounded-xl border border-gray-600 bg-gray-700 p-6 transition-all duration-300 hover:scale-105 hover:border-gray-500"
        >
          <Icon
            :icon="tip.icon"
            class="mb-4 text-3xl"
            :class="tip.color"
            aria-hidden="true"
          />
          <h3 class="mb-3 text-xl font-bold text-white">
            {{ tip.title }}
          </h3>
          <p class="text-sm leading-relaxed text-gray-300">
            {{ tip.description }}
          </p>
        </div>
      </div>

      <div class="mt-16 rounded-xl border-l-4 border-yellow-400 bg-gray-900 p-6">
        <div class="flex items-start gap-3">
          <span class="flex-shrink-0 rounded-full bg-yellow-400 p-2 text-gray-900">
            <Icon
              icon="fa6-solid:triangle-exclamation"
              class="text-lg"
              aria-hidden="true"
            />
          </span>
          <div>
            <h3 class="mb-2 font-semibold text-yellow-400">
              Importante
            </h3>
            <p class="text-sm text-gray-300">
              Esta ferramenta é informativa e não substitui acompanhamento profissional. Consulte um
              médico ou educador físico antes de iniciar qualquer plano alimentar ou de exercícios.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
