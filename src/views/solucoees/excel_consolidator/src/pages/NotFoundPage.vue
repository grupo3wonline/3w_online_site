<script setup lang="ts">
  import { Icon } from '@iconify/vue'
</script>

<template>
  <div
    class="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-24 text-center sm:px-6"
  >
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.8 }"
      :enter="{ opacity: 1, scale: 1 }"
      class="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
    >
      <Icon icon="mdi:ghost-outline" class="h-16 w-16 text-slate-600" />
    </div>

    <h1 class="mb-2 text-3xl font-extrabold text-white">404</h1>
    <h2 class="mb-3 text-lg font-semibold text-slate-300">Página não encontrada</h2>
    <p class="mb-8 text-sm text-slate-400">
      A página que você está procurando não existe ou foi movida.
    </p>

    <router-link
      to="/"
      class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition duration-200 hover:from-emerald-400 hover:to-teal-400 active:scale-95"
    >
      <Icon icon="mdi:home" class="h-4 w-4" />
      Voltar à página inicial
    </router-link>
  </div>
</template>
