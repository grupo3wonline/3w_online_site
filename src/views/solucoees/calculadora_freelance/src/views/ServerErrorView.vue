<script setup lang="ts">
import { RouterLink } from 'vue-router'

function reload() {
  window.location.reload()
}
</script>

<template>
  <section
    class="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 px-4 py-16 dark:from-gray-900 dark:via-red-900/10 dark:to-gray-900"
  >
    <div class="w-full max-w-2xl text-center">
      <div
        class="mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-8xl font-bold text-transparent md:text-9xl"
      >
        500
      </div>
      <div class="mb-4 text-5xl text-gray-400"><i class="fas fa-triangle-exclamation"></i></div>
      <h1 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        Erro Interno do Servidor
      </h1>
      <p class="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        Algo deu errado do nosso lado. Tente novamente em instantes ou volte para a página inicial.
      </p>
      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <button type="button" class="btn-primary px-8 py-4 text-lg" @click="reload">
          <i class="fas fa-rotate-right"></i> Tentar Novamente
        </button>
        <RouterLink to="/" class="btn-outline px-8 py-4 text-lg">
          <i class="fas fa-house"></i> Voltar para o Início
        </RouterLink>
      </div>
    </div>
  </section>
</template>
