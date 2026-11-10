<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Página Não Encontrada (404) | Calculadora Aluguel Fácil',
  meta: [{ name: 'description', content: 'A página que você procura não foi encontrada. Volte para a página inicial da Calculadora Aluguel Fácil.' }]
})
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <!-- Illustration -->
      <div class="mb-8">
        <div class="relative inline-block">
          <span class="text-[120px] sm:text-[160px] font-bold gradient-text leading-none">404</span>
          <div class="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center animate-bounce">
            <i class="fa-solid fa-magnifying-glass text-amber-600 dark:text-amber-400 text-lg"></i>
          </div>
        </div>
      </div>

      <!-- Message -->
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Ops! Página não encontrada
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
        A página que você procura não existe ou foi movida.
        Mas não se preocupe, nossas calculadoras continuam disponíveis!
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <router-link to="/" class="btn-primary">
          <i class="fa-solid fa-house"></i> Voltar ao Início
        </router-link>
        <router-link to="/#ferramentas" class="btn-secondary">
          <i class="fa-solid fa-calculator"></i> Ver Ferramentas
        </router-link>
      </div>

      <!-- Quick Links -->
      <div class="card p-6 text-left">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Links Populares:</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <router-link to="/calculadora-aluguel" class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
            <i class="fa-solid fa-calculator text-primary-500"></i> Calculadora de Aluguel
          </router-link>
          <router-link to="/calculadora-financiamento" class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
            <i class="fa-solid fa-piggy-bank text-primary-500"></i> Simulador de Financiamento
          </router-link>
          <router-link to="/calculadora-construcao" class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
            <i class="fa-solid fa-hammer text-primary-500"></i> Calculadora de Construção
          </router-link>
          <router-link to="/comparador" class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
            <i class="fa-solid fa-scale-balanced text-primary-500"></i> Comparador
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
