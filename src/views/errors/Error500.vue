<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <div class="mb-6">
        <Icon icon="mdi:server-off" class="w-24 h-24 text-orange-400 mx-auto" />
      </div>
      <h1 class="text-6xl md:text-8xl font-bold text-orange-600 mb-4">500</h1>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Erro interno do servidor</h2>
      <p class="text-gray-600 mb-8 leading-relaxed">
        Desculpe, algo deu errado do nosso lado. Nossa equipe foi notificada e está trabalhando para resolver.
        Tente novamente em alguns instantes.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="reload" class="btn-primary">
          <Icon icon="mdi:refresh" class="w-5 h-5 mr-2" />
          Tentar Novamente
        </button>
        <RouterLink to="/" class="btn-outline">
          <Icon icon="mdi:home" class="w-5 h-5 mr-2" />
          Voltar ao Início
        </RouterLink>
      </div>
      <p class="text-sm text-gray-500 mt-6">
        Se o problema persistir, entre em contato pelo WhatsApp: (41) 99692-4829
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

function reload(): void {
  window.location.reload()
}
</script>
