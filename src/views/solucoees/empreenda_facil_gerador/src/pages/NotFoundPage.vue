<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import Button from "@/components/ui/Button.vue";
</script>

<template>
  <div
    class="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center"
  >
    <span class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
      <Icon icon="lucide:compass" class="h-10 w-10 text-primary" />
    </span>
    <p class="mb-2 text-6xl font-extrabold text-gradient">404</p>
    <h1 class="mb-3 text-2xl font-bold">Página não encontrada</h1>
    <p class="mb-8 max-w-md text-muted-foreground">
      A página que você procura não existe ou foi movida. Que tal voltar ao início e continuar de
      onde parou?
    </p>
    <div class="flex flex-col gap-3 sm:flex-row">
      <RouterLink to="/">
        <Button size="lg">
          <Icon icon="lucide:home" class="h-5 w-5" />
          Voltar ao início
        </Button>
      </RouterLink>
      <RouterLink :to="{ path: '/', hash: '#contato' }">
        <Button variant="outline" size="lg">
          <Icon icon="lucide:mail" class="h-5 w-5" />
          Falar com suporte
        </Button>
      </RouterLink>
    </div>
  </div>
</template>
