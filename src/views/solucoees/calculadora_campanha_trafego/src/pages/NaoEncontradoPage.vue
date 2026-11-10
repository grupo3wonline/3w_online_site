<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Página Não Encontrada — Calculadora de Tráfego | 3W Online',
})
</script>

<template>
  <section class="section bg-white dark:bg-gray-950 min-h-[60vh] flex items-center">
    <div class="container-app text-center">
      <div class="max-w-lg mx-auto">
        <div class="text-8xl font-black gradient-text mb-6">404</div>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Página não encontrada
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          A página que você procura não existe ou foi movida. Verifique o endereço ou retorne à página inicial.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink id="btn-404-inicio" to="/" class="btn-primary btn-lg">
            <i class="fa-solid fa-house"></i>
            Voltar ao Início
          </RouterLink>
          <RouterLink id="btn-404-ferramenta" to="/ferramenta" class="btn-outline btn-lg">
            <i class="fa-solid fa-calculator"></i>
            Acessar Calculadora
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
