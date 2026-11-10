<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useSeo } from '@/composables/useSeo';

useSeo(() => ({
  title: 'Página não encontrada (404) — Calculadora de Saúde',
  description: 'A página que você procura não foi encontrada. Volte ao início da Calculadora de Saúde.',
  path: '/404',
}));
</script>

<template>
  <section
    class="flex min-h-[70vh] items-center justify-center bg-white px-4 py-20 dark:bg-gray-900"
  >
    <div class="text-center">
      <Icon
        icon="fa6-solid:heart-crack"
        class="mx-auto mb-6 text-6xl text-brand-500"
        aria-hidden="true"
      />
      <p class="text-6xl font-bold text-gray-900 dark:text-white md:text-8xl">
        404
      </p>
      <h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
        Página não encontrada
      </h1>
      <p class="mx-auto mt-3 max-w-md text-gray-600 dark:text-gray-400">
        Ops! A página que você procura não existe ou foi movida. Que tal voltar ao início e calcular
        sua saúde?
      </p>
      <RouterLink
        to="/"
        class="btn-primary mt-8"
      >
        <Icon
          icon="fa6-solid:house"
          aria-hidden="true"
        />
        Voltar ao Início
      </RouterLink>
    </div>
  </section>
</template>
