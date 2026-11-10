<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Página não encontrada (404) | DevStart Academy',
  description: 'A página que você procura não existe ou foi movida.',
  path: '/404',
})
</script>

<template>
  <div class="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
    <span class="text-7xl font-extrabold text-brand-600 dark:text-brand-400 sm:text-9xl">404</span>
    <h1 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
      Página não encontrada
    </h1>
    <p class="mt-3 max-w-md text-slate-600 dark:text-slate-400">
      O endereço que você tentou acessar não existe ou foi movido. Que tal voltar ao início ou
      explorar as ferramentas?
    </p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <RouterLink
        to="/"
        class="btn-primary"
      >
        <Icon
          icon="lucide:home"
          class="h-5 w-5"
        />
        Voltar ao início
      </RouterLink>
      <RouterLink
        to="/ferramentas"
        class="btn-secondary"
      >
        <Icon
          icon="lucide:layout-grid"
          class="h-5 w-5"
        />
        Ver ferramentas
      </RouterLink>
    </div>
  </div>
</template>
