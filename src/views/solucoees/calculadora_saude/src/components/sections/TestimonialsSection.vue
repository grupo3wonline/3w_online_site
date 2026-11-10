<script setup lang="ts">
import { Icon } from '@iconify/vue';

const testimonials = [
  {
    name: 'Juliana S.',
    role: 'Engenheira de Software',
    quote:
      'Finalmente uma ferramenta que vai direto ao ponto! Em minutos eu tinha um plano de calorias e macros que me ajudou a organizar minha dieta. O relatório em PDF é ótimo para acompanhar.',
    stars: 5,
  },
  {
    name: 'Marcos R.',
    role: 'Estudante Universitário',
    quote:
      'Muito fácil de usar e os resultados são super completos. Me ajudou a entender porque eu não estava ganhando massa muscular. Recomendo demais!',
    stars: 5,
  },
  {
    name: 'Fernanda L.',
    role: 'Mãe e Empreendedora',
    quote:
      'Com a correria do dia a dia, eu não tinha tempo para pesquisar. A calculadora me deu um norte claro e prático. É como ter um nutricionista de bolso. Fantástico!',
    stars: 5,
  },
];
</script>

<template>
  <section
    id="depoimentos"
    class="bg-white py-20 dark:bg-gray-900"
  >
    <div class="container-page">
      <div class="mb-12 text-center">
        <span class="section-badge">
          <Icon
            icon="fa6-solid:heart"
            aria-hidden="true"
          />
          Depoimentos
        </span>
        <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          O que nossos usuários estão <span class="text-brand-500">dizendo</span>
        </h2>
        <p class="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Milhares de pessoas já estão transformando sua saúde com nossa ajuda.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <figure
          v-for="t in testimonials"
          :key="t.name"
          class="rounded-xl border border-gray-200 bg-gray-50 p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div
            class="mb-4 flex"
            :aria-label="`${t.stars} de 5 estrelas`"
          >
            <Icon
              v-for="i in t.stars"
              :key="i"
              icon="fa6-solid:star"
              class="text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <blockquote class="mb-6 italic text-gray-600 dark:text-gray-300">
            "{{ t.quote }}"
          </blockquote>
          <figcaption class="flex items-center gap-4">
            <span
              class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <Icon
                icon="fa6-solid:user"
                class="text-gray-500"
                aria-hidden="true"
              />
            </span>
            <span>
              <span class="block font-bold text-gray-900 dark:text-white">{{ t.name }}</span>
              <span class="block text-sm text-gray-500 dark:text-gray-400">{{ t.role }}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
