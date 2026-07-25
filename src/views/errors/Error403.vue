<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <div class="mb-6">
        <Icon icon="mdi:shield-lock-outline" class="w-24 h-24 text-red-400 mx-auto" />
      </div>
      <h1 class="text-6xl md:text-8xl font-bold text-red-600 mb-4">403</h1>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Acesso negado</h2>
      <p class="text-gray-600 mb-8 leading-relaxed">
        Você não tem permissão para acessar esta página.
        Se acredita que isso é um erro, entre em contato conosco.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink to="/" class="btn-primary">
          <Icon icon="mdi:home" class="w-5 h-5 mr-2" />
          Voltar ao Início
        </RouterLink>
        <RouterLink to="/contato" class="btn-outline">
          <Icon icon="mdi:message-text" class="w-5 h-5 mr-2" />
          Reportar Problema
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>
