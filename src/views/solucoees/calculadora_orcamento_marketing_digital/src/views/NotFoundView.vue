<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'

useSeo(() => ({
  title: 'Página não encontrada',
  description: 'A página que você procura não existe ou foi movida.',
  path: '/404',
}))
</script>

<template>
  <section class="flex min-h-[70vh] items-center justify-center px-4">
    <div class="max-w-lg text-center">
      <div class="relative mb-8">
        <div class="gradient-text text-9xl font-bold opacity-20">404</div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="float flex h-24 w-24 items-center justify-center rounded-3xl gradient-cta shadow-lg"
          >
            <i class="fas fa-search text-4xl text-white" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <h1 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">Página Não Encontrada</h1>
      <p class="mb-8 text-muted-foreground">
        Ops! A página que você está procurando não existe ou foi movida. Verifique o endereço ou
        volte para a página inicial.
      </p>

      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <RouterLink to="/" class="btn-primary justify-center">
          <i class="fas fa-home" aria-hidden="true"></i>
          Voltar ao Início
        </RouterLink>
        <RouterLink to="/#calculadora" class="btn-ghost">
          <i class="fas fa-calculator" aria-hidden="true"></i>
          Ir para Calculadora
        </RouterLink>
      </div>

      <div class="mt-12 border-t border-border pt-8">
        <p class="mb-4 text-sm text-muted-foreground">Páginas úteis:</p>
        <div class="flex flex-wrap justify-center gap-4">
          <RouterLink to="/#sobre" class="text-sm text-primary hover:underline">Sobre</RouterLink>
          <RouterLink to="/#servicos" class="text-sm text-primary hover:underline"
            >Serviços</RouterLink
          >
          <RouterLink to="/#contato" class="text-sm text-primary hover:underline"
            >Contato</RouterLink
          >
        </div>
      </div>
    </div>
  </section>
</template>
