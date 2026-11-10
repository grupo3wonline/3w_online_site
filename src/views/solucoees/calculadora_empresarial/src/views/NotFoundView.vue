<template>
  <section class="py-20 lg:py-32">
    <div class="container mx-auto px-4 text-center">
      <div class="max-w-md mx-auto space-y-8">
        <div class="relative">
          <h1 class="text-[150px] lg:text-[200px] font-bold text-gray-200 dark:text-gray-800 leading-none select-none">
            404
          </h1>
          <div class="absolute inset-0 flex items-center justify-center">
            <i class="fa-solid fa-search text-6xl text-gray-400 dark:text-gray-600 animate-pulse"></i>
          </div>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Página não encontrada
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Desculpe, a página que você está procurando não existe ou foi movida.
            Verifique o endereço ou navegue para uma de nossas páginas principais.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <router-link to="/" class="btn-primary">
            <i class="fa-solid fa-house mr-2"></i>
            Ir para Início
          </router-link>
          <router-link to="/calculadoras" class="btn-secondary">
            <i class="fa-solid fa-arrow-left mr-2"></i>
            Ver Calculadoras
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Página não encontrada (404) | Calculadora Empresarial',
  meta: [{ name: 'robots', content: 'noindex, follow' }]
})
</script>
