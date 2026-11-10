<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Página não encontrada',
  path: '/404',
  description: 'A página solicitada não foi encontrada.',
})
</script>

<template>
  <div class="relative mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
    <div
      class="pointer-events-none absolute left-1/2 top-16 h-56 w-56 -translate-x-1/2 rounded-full bg-primary-300/30 blur-3xl dark:bg-primary-500/20"
      aria-hidden="true"
    ></div>
    <div
      class="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-gradient text-white shadow-glow"
    >
      <Icon icon="mdi:map-marker-question-outline" class="text-4xl" />
    </div>
    <h1
      class="relative mt-6 bg-brand-gradient bg-clip-text text-7xl font-extrabold text-transparent"
    >
      404
    </h1>
    <p class="mt-2 text-lg font-bold text-ink-800 dark:text-ink-100">Página não encontrada</p>
    <p class="mt-2 text-ink-500 dark:text-ink-400">
      O endereço que você tentou acessar não existe ou foi movido.
    </p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <RouterLink :to="{ name: 'home' }" class="btn-primary">
        <Icon icon="mdi:home-outline" /> Ir para o início
      </RouterLink>
      <RouterLink :to="{ name: 'calculator' }" class="btn-outline">
        <Icon icon="mdi:calculator" /> Abrir a calculadora
      </RouterLink>
    </div>
  </div>
</template>
