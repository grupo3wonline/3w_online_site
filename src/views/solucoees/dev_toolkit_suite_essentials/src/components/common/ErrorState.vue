<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'

defineProps<{
  code: string
  title: string
  message: string
  icon?: string
}>()
</script>

<template>
  <section class="container-app flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
    <div
      class="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 text-white shadow-lg"
    >
      <Icon :icon="icon ?? 'lucide:alert-triangle'" class="h-10 w-10" />
    </div>
    <p class="text-6xl font-extrabold text-gradient md:text-8xl">{{ code }}</p>
    <h1 class="mt-4 text-2xl font-bold md:text-3xl">{{ title }}</h1>
    <p class="mx-auto mt-3 max-w-md text-muted-foreground">{{ message }}</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <RouterLink to="/">
        <Button variant="brand" size="lg">
          <Icon icon="lucide:home" class="h-4 w-4" />
          Voltar para o início
        </Button>
      </RouterLink>
      <RouterLink to="/ferramentas">
        <Button variant="outline" size="lg">
          <Icon icon="lucide:wrench" class="h-4 w-4" />
          Ver ferramentas
        </Button>
      </RouterLink>
    </div>
  </section>
</template>
