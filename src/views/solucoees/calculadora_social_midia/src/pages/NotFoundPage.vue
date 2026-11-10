<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()

useSeo(() => ({
  title: 'Página não encontrada (404) | Calculadora de Redes Sociais',
  description: 'A página que você procura não existe ou foi movida.',
  path: '/404',
}))

onMounted(() => {
  console.warn('404: Rota não encontrada:', route.fullPath)
})
</script>

<template>
  <div
    class="flex min-h-[70vh] items-center justify-center px-4 py-16"
  >
    <div class="max-w-lg text-center">
      <span
        class="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-8xl font-extrabold text-transparent md:text-9xl"
      >
        404
      </span>
      <h1 class="mb-4 mt-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
        Página Não Encontrada
      </h1>
      <p class="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
        A página que você procura não existe ou foi movida. Verifique o endereço ou volte à página
        inicial.
      </p>
      <div class="flex flex-col justify-center gap-3 sm:flex-row">
        <RouterLink
          to="/"
          class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
        >
          <Icon
            icon="lucide:home"
            class="mr-2 h-5 w-5"
          />
          Voltar ao Início
        </RouterLink>
        <RouterLink
          to="/#contato"
          class="inline-flex items-center justify-center rounded-xl border-2 border-violet-300 px-6 py-3 font-semibold text-violet-700 transition-all dark:border-violet-600 dark:text-violet-300"
        >
          <Icon
            icon="lucide:mail"
            class="mr-2 h-5 w-5"
          />
          Fale Conosco
        </RouterLink>
      </div>
    </div>
  </div>
</template>
