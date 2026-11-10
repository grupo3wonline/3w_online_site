<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  function reloadPage() {
    window.location.href = '/'
  }
</script>

<template>
  <div
    class="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-24 text-center sm:px-6"
  >
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.8 }"
      :enter="{ opacity: 1, scale: 1 }"
      class="mb-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6"
    >
      <Icon icon="mdi:alert-circle-outline" class="h-16 w-16 text-rose-400" />
    </div>

    <h1 class="mb-2 text-2xl font-extrabold text-white">Algo deu errado</h1>
    <p class="mb-8 text-sm text-slate-400">
      Ocorreu um erro inesperado na aplicação. Tente recarregar a página. Se o problema
      persistir, verifique se seus arquivos estão em formato válido.
    </p>

    <button
      class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition duration-200 hover:from-emerald-400 hover:to-teal-400 active:scale-95"
      @click="reloadPage"
    >
      <Icon icon="mdi:refresh" class="h-4 w-4" />
      Recarregar aplicação
    </button>
  </div>
</template>
