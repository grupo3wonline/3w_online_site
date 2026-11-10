<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()
const code = (route.query.code as string) || '500'
const message =
  (route.query.message as string) || 'Ocorreu um erro inesperado. Tente novamente em instantes.'

useSeo(() => ({ title: `Erro ${code}`, path: '/erro' }))

function reload() {
  window.location.reload()
}
</script>

<template>
  <section class="flex min-h-[70vh] items-center justify-center px-4">
    <div class="max-w-lg text-center">
      <div class="relative mb-8">
        <div class="gradient-text text-8xl font-bold opacity-20">{{ code }}</div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="flex h-24 w-24 items-center justify-center rounded-3xl gradient-cta shadow-lg"
          >
            <i class="fas fa-triangle-exclamation text-4xl text-white" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <h1 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">Algo deu errado</h1>
      <p class="mb-8 text-muted-foreground">{{ message }}</p>

      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <button type="button" class="btn-primary justify-center" @click="reload">
          <i class="fas fa-rotate-right" aria-hidden="true"></i>
          Tentar Novamente
        </button>
        <RouterLink to="/" class="btn-ghost">
          <i class="fas fa-home" aria-hidden="true"></i>
          Voltar ao Início
        </RouterLink>
      </div>
    </div>
  </section>
</template>
