<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

/**
 * Estado de erro reutilizável para as páginas 404/403/500.
 * Centraliza o layout para evitar duplicação (DRY).
 */
defineProps<{
  code: string
  title: string
  message: string
  icon: string
  accent?: string
}>()
</script>

<template>
  <section class="flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
    <div
      :class="[
        'mb-6 flex h-24 w-24 items-center justify-center rounded-full text-white shadow-xl',
        accent ?? 'bg-gradient-to-br from-purple-600 to-indigo-600',
      ]"
    >
      <Icon :icon="icon" class="text-5xl" aria-hidden="true" />
    </div>
    <p class="mb-2 text-6xl font-black text-gradient">{{ code }}</p>
    <h1 class="mb-3 text-2xl font-bold text-foreground md:text-3xl">{{ title }}</h1>
    <p class="mb-8 max-w-md text-muted-foreground">{{ message }}</p>
    <div class="flex flex-col gap-3 sm:flex-row">
      <RouterLink to="/" class="btn-primary">
        <Icon icon="fa6-solid:house" aria-hidden="true" />
        Voltar para o Início
      </RouterLink>
      <RouterLink to="/calculadora" class="btn-outline">
        <Icon icon="fa6-solid:calculator" aria-hidden="true" />
        Ir para a Calculadora
      </RouterLink>
    </div>
  </section>
</template>
