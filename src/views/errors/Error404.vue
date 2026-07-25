<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <div class="mb-6">
        <Icon icon="mdi:alert-circle-outline" class="w-24 h-24 text-primary-400 mx-auto" />
      </div>
      <h1 class="text-6xl md:text-8xl font-bold text-primary-600 mb-4">404</h1>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Página não encontrada</h2>
      <p class="text-gray-600 mb-8 leading-relaxed">
        A página que você está procurando não existe, foi removida ou pode estar temporariamente indisponível.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink to="/" class="btn-primary">
          <Icon icon="mdi:home" class="w-5 h-5 mr-2" />
          Voltar ao Início
        </RouterLink>
        <RouterLink to="/contato" class="btn-outline">
          <Icon icon="mdi:message-text" class="w-5 h-5 mr-2" />
          Fale Conosco
        </RouterLink>
      </div>
      <p class="text-sm text-gray-500 mt-6">
        <Icon icon="mdi:lightbulb-outline" class="w-4 h-4 inline mr-1" />
        Dica: Verifique se o endereço digitado está correto ou use o menu de navegação.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>
