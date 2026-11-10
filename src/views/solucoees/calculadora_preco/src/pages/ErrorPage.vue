<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

function reload() {
  window.location.reload()
}
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center py-16">
    <div class="container">
      <div class="mx-auto max-w-2xl space-y-8 text-center">
        <div class="rounded-3xl border border-border bg-card p-10 shadow-elegant md:p-14">
          <div
            class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500"
          >
            <Icon icon="fa6-solid:triangle-exclamation" class="h-10 w-10 text-white" />
          </div>
          <h1 class="mb-4 text-3xl font-black text-foreground md:text-4xl">
            Ocorreu um Erro Inesperado
          </h1>
          <p class="mb-8 text-lg text-muted-foreground">
            Algo não saiu como esperado. Nossa equipe foi notificada automaticamente. Tente
            recarregar a página ou voltar para o início.
          </p>
          <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              class="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3.5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105"
              @click="reload"
            >
              <Icon icon="fa6-solid:rotate-right" class="h-5 w-5" />
              Recarregar
            </button>
            <RouterLink
              to="/"
              class="inline-flex items-center gap-3 rounded-xl border-2 border-primary px-8 py-3.5 text-lg font-semibold text-primary transition-colors hover:bg-accent"
            >
              <Icon icon="fa6-solid:house" class="h-5 w-5" />
              Ir para o Início
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
