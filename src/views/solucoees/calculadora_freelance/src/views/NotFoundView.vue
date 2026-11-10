<script setup lang="ts">
import { RouterLink } from 'vue-router'

const quickLinks = [
  { icon: 'fa-house', label: 'Início', to: '/' },
  { icon: 'fa-calculator', label: 'Calculadora', to: '/calculadora' },
  { icon: 'fa-envelope', label: 'Contato', to: '/#contato' },
  { icon: 'fa-shield-halved', label: 'Privacidade', to: '/privacidade' },
]
</script>

<template>
  <section
    class="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-brand-50 via-purple-50 to-pink-50 px-4 py-16 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900"
  >
    <div class="w-full max-w-2xl text-center">
      <div class="gradient-text mb-4 font-display text-8xl font-extrabold md:text-9xl">404</div>
      <div class="mb-4 text-5xl text-gray-400"><i class="fas fa-magnifying-glass"></i></div>
      <h1 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        Página Não Encontrada
      </h1>
      <p class="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        A página que você procura não existe ou foi movida. Confira o endereço ou use os atalhos
        abaixo.
      </p>

      <div class="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
        <RouterLink to="/" class="btn-primary px-8 py-4 text-lg">
          <i class="fas fa-house"></i> Voltar para o Início
        </RouterLink>
        <RouterLink to="/calculadora" class="btn-outline px-8 py-4 text-lg">
          <i class="fas fa-calculator"></i> Ir para a Calculadora
        </RouterLink>
      </div>

      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <RouterLink
          v-for="item in quickLinks"
          :key="item.to"
          :to="item.to"
          class="card-surface p-4 transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <i class="fas mb-2 text-3xl text-brand-600" :class="item.icon"></i>
          <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ item.label }}</div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
