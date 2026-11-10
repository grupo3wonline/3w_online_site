<script setup lang="ts">
import { Icon } from '@iconify/vue';

const pillars = [
  {
    icon: 'fa6-solid:heart',
    title: 'Nossa Missão',
    description:
      'Empoderar pessoas com informações claras e acionáveis sobre sua saúde, promovendo bem-estar e qualidade de vida.',
  },
  {
    icon: 'fa6-solid:brain',
    title: 'Nossa Filosofia',
    description:
      'Acreditamos que a tecnologia pode ser uma poderosa aliada da saúde. Focamos em privacidade, precisão e uma experiência simples e direta.',
  },
  {
    icon: 'fa6-solid:bullseye',
    title: 'Nosso Compromisso',
    description:
      'Garantir que esta ferramenta permaneça 100% gratuita, anônima e livre de publicidade invasiva. Sua jornada de saúde é o nosso foco.',
  },
];
</script>

<template>
  <section
    id="sobre"
    class="bg-white py-20 dark:bg-gray-900"
  >
    <div class="container-page">
      <div class="mb-16 text-center">
        <span class="section-badge">
          <Icon
            icon="fa6-solid:circle-info"
            aria-hidden="true"
          />
          Quem somos
        </span>
        <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Sobre a Calculadora de Saúde
        </h2>
        <p class="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Nossa missão é fornecer uma ferramenta acessível, gratuita e baseada em ciência para que
          todos possam dar o primeiro passo em direção a uma vida mais saudável.
        </p>
      </div>

      <div class="mb-16 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
        <div
          v-for="pillar in pillars"
          :key="pillar.title"
          class="p-6"
        >
          <Icon
            :icon="pillar.icon"
            class="mx-auto mb-4 text-4xl text-brand-500"
            aria-hidden="true"
          />
          <h3 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            {{ pillar.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ pillar.description }}
          </p>
        </div>
      </div>

      <div
        class="mx-auto max-w-4xl space-y-4 text-gray-700 dark:text-gray-300"
      >
        <p>
          A Calculadora de Saúde foi desenvolvida pelo <strong>Grupo 3W Online</strong> como uma
          iniciativa para democratizar o acesso a informações de saúde personalizadas. Em um mundo
          cheio de informações conflitantes, queríamos criar um porto seguro: um lugar onde você
          pode obter dados confiáveis, baseados em fórmulas científicas, sem se preocupar com a
          venda de seus dados ou com custos escondidos.
        </p>
        <p>
          Cada cálculo, cada funcionalidade e cada linha de código foram pensados para oferecer a
          melhor experiência possível. Desde o cálculo do IMC até a geração do relatório em PDF,
          tudo acontece diretamente no seu navegador, garantindo total privacidade e controle sobre
          suas informações.
        </p>
        <p>
          Esperamos que esta ferramenta seja útil em sua jornada para uma vida mais saudável e
          equilibrada.
        </p>
      </div>
    </div>
  </section>
</template>
