<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

/**
 * Página de erro genérica (ex.: 500 / falha inesperada).
 * Usada como fallback em situações de erro que não sejam 404.
 */
withDefaults(
  defineProps<{
    code?: string
    title?: string
    message?: string
  }>(),
  {
    code: '500',
    title: 'Algo deu errado',
    message: 'Ocorreu um erro inesperado ao processar sua solicitação. Tente novamente em instantes.'
  }
)

useHead({
  title: 'Erro Inesperado | Calculadora Aluguel Fácil',
  meta: [{ name: 'robots', content: 'noindex' }]
})

const router = useRouter()

function reload() {
  window.location.reload()
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <div class="mb-8">
        <div class="relative inline-block">
          <span class="text-[120px] sm:text-[160px] font-bold gradient-text leading-none">{{ code }}</span>
          <div class="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center animate-bounce">
            <i class="fa-solid fa-triangle-exclamation text-red-600 dark:text-red-400 text-lg"></i>
          </div>
        </div>
      </div>

      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ title }}</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{{ message }}</p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button type="button" class="btn-primary" @click="reload">
          <i class="fa-solid fa-rotate-right"></i> Tentar Novamente
        </button>
        <button type="button" class="btn-secondary" @click="goHome">
          <i class="fa-solid fa-house"></i> Voltar ao Início
        </button>
      </div>

      <div class="card p-6 text-left">
        <h2 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Precisa de ajuda?</h2>
        <div class="space-y-2">
          <a
            href="https://wa.me/5541996924829"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
          >
            <i class="fa-brands fa-whatsapp text-green-500"></i> (41) 99692-4829
          </a>
          <a
            href="mailto:contato@3wonline.com.br"
            class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
          >
            <i class="fa-solid fa-envelope text-primary-500"></i> contato@3wonline.com.br
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
