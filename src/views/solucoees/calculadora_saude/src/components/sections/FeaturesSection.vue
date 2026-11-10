<script setup lang="ts">
import { Icon } from '@iconify/vue';

const features = [
  'Cálculo Preciso do IMC (Índice de Massa Corporal) baseado nos padrões da OMS.',
  'Faixa de Peso Ideal personalizada para sua altura, idade e sexo.',
  'Plano Nutricional com metas diárias de calorias, proteínas e carboidratos.',
  'Sugestão de Divisão de Refeições (café da manhã, almoço, jantar e lanches).',
  'Estimativa de Ingestão de Água diária para máxima hidratação.',
  'Relatório Completo em PDF para baixar, imprimir e acompanhar seu progresso.',
  'Design Responsivo: acesse de qualquer dispositivo, seja celular, tablet ou computador.',
  '100% Gratuito e anônimo, sem necessidade de cadastro ou e-mail.',
];
</script>

<template>
  <section
    id="funcionalidades"
    class="bg-white py-20 dark:bg-gray-900"
  >
    <div class="container-page">
      <div class="mb-12 text-center">
        <span class="section-badge">
          <Icon
            icon="fa6-solid:layer-group"
            aria-hidden="true"
          />
          Recursos
        </span>
        <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Uma Ferramenta <span class="text-brand-500">Completa</span> na Palma da Sua Mão
        </h2>
        <p class="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Veja tudo o que você recebe ao usar nossa calculadora. É mais do que um número, é um plano
          de ação.
        </p>
      </div>
      <div class="mx-auto max-w-4xl">
        <ul class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
          <li
            v-for="(feature, i) in features"
            :key="i"
            class="flex items-start gap-3"
          >
            <Icon
              icon="fa6-solid:circle-check"
              class="mt-1 flex-shrink-0 text-xl text-brand-500"
              aria-hidden="true"
            />
            <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
