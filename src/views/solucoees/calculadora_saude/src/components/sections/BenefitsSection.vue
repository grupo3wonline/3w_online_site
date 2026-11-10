<script setup lang="ts">
import { Icon } from '@iconify/vue';

const benefits = [
  {
    icon: 'fa6-solid:bullseye',
    color: 'text-brand-500',
    title: 'Metas Claras e Atingíveis',
    description:
      'Receba um plano de ação com números precisos. Saiba exatamente quantas calorias, proteínas e carboidratos consumir para alcançar seu peso ideal de forma saudável.',
  },
  {
    icon: 'fa6-solid:arrow-trend-up',
    color: 'text-blue-500',
    title: 'Acelere Seus Resultados',
    description:
      'Com um plano personalizado, você otimiza sua nutrição e evita os erros comuns que atrasam seus objetivos. Alcance sua meta de forma mais rápida e consistente.',
  },
  {
    icon: 'fa6-solid:shield-halved',
    color: 'text-yellow-500',
    title: 'Baseado em Ciência, 100% Gratuito',
    description:
      'Nossos cálculos são baseados em fórmulas reconhecidas pela OMS. Tenha acesso a uma ferramenta poderosa, sem custos e sem a necessidade de compartilhar seus dados.',
  },
  {
    icon: 'fa6-solid:file-lines',
    color: 'text-purple-500',
    title: 'Acompanhe Seu Progresso',
    description:
      'Gere um relatório completo em PDF para salvar, imprimir e compartilhar com seu médico ou nutricionista. Transforme a informação em um plano de ação concreto.',
  },
];
</script>

<template>
  <section
    id="beneficios"
    class="bg-white py-20 dark:bg-gray-900"
  >
    <div class="container-page">
      <div class="mb-12 text-center">
        <span class="section-badge">
          <Icon
            icon="fa6-solid:star"
            aria-hidden="true"
          />
          Vantagens
        </span>
        <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Por que nossa calculadora é a <span class="text-brand-500">melhor escolha</span> para
          você?
        </h2>
        <p class="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Descubra como uma análise de 2 minutos pode colocar você no caminho certo para uma vida
          mais saudável e equilibrada.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="flex items-start gap-6 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800"
        >
          <Icon
            :icon="benefit.icon"
            class="flex-shrink-0 text-4xl"
            :class="benefit.color"
            aria-hidden="true"
          />
          <div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              {{ benefit.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
