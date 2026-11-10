<template>
  <div class="bg-slate-50 dark:bg-slate-900 min-h-screen flex items-center justify-center px-4">
    <div class="text-center max-w-lg animate-fade-in">
      <div class="mb-8 relative">
        <div class="absolute inset-0 flex items-center justify-center opacity-10" aria-hidden="true">
          <div class="w-64 h-64 bg-red-400 rounded-full blur-3xl"></div>
        </div>
        <div
          class="relative w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-3xl flex items-center justify-center shadow-lg"
        >
          <i class="fa-solid fa-triangle-exclamation text-white text-4xl" aria-hidden="true"></i>
        </div>
      </div>

      <h1 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
        {{ t('errors.genericTitle') }}
      </h1>
      <p class="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
        Ocorreu um erro inesperado ao processar sua solicitação. Não se preocupe — seus textos permanecem seguros no
        seu navegador.
      </p>
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-8">
        <i class="fa-solid fa-lightbulb text-amber-500 mr-1" aria-hidden="true"></i>
        Tente recarregar a página ou voltar ao início.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button type="button" class="btn-primary w-full sm:w-auto" @click="reload">
          <i class="fa-solid fa-rotate-right" aria-hidden="true"></i> Recarregar
        </button>
        <router-link to="/" class="btn-secondary w-full sm:w-auto">
          <i class="fa-solid fa-house" aria-hidden="true"></i> Voltar ao Início
        </router-link>
      </div>

      <p class="mt-8 text-xs text-slate-400 dark:text-slate-500">
        Se o problema persistir, entre em
        <router-link to="/contato" class="text-primary-500 hover:text-primary-600 underline">
          contato conosco </router-link
        >.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function reload() {
  window.location.reload()
}
</script>
