<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <section class="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
    <div class="text-center">
      <div
        class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
      >
        <Icon icon="lucide:compass" class="h-12 w-12 text-primary" />
      </div>
      <p class="mb-2 text-7xl font-extrabold text-gradient">404</p>
      <h1 class="mb-4 text-2xl font-bold text-foreground md:text-3xl">Página não encontrada</h1>
      <p class="mx-auto mb-8 max-w-md text-muted-foreground">
        A página que você procura não existe ou foi movida. Que tal voltar ao início ou experimentar
        nossos simuladores?
      </p>
      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <RouterLink to="/">
          <Button class="w-full sm:w-auto"
            ><Icon icon="lucide:home" class="h-4 w-4" />Voltar ao Início</Button
          >
        </RouterLink>
        <RouterLink to="/#ferramentas">
          <Button variant="outline" class="w-full sm:w-auto">
            <Icon icon="lucide:calculator" class="h-4 w-4" />Ver Simuladores
          </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
