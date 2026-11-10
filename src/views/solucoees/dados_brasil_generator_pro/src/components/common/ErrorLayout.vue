<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps<{ code: string; title: string; message: string; icon: string }>()
</script>

<template>
  <div class="container-app flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
    <span class="mb-6 grid h-24 w-24 place-items-center rounded-3xl bg-primary/10 text-primary">
      <Icon :icon="icon" class="h-12 w-12" />
    </span>
    <p class="text-7xl font-black text-primary/30 sm:text-8xl">{{ code }}</p>
    <h1 class="mt-2 text-3xl font-extrabold sm:text-4xl">{{ title }}</h1>
    <p class="mx-auto mt-4 max-w-md text-muted-foreground">{{ message }}</p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <BaseButton to="/">
        <Icon icon="lucide:house" class="h-5 w-5" /> Voltar ao início
      </BaseButton>
      <BaseButton to="/ferramentas" variant="outline">
        <Icon icon="lucide:layout-grid" class="h-5 w-5" /> Ver ferramentas
      </BaseButton>
    </div>
  </div>
</template>
