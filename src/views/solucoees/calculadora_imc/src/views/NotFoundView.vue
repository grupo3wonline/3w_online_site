<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useMotionPresets } from '@/composables/useMotionPresets'

const { zoomIn } = useMotionPresets()
</script>

<template>
  <div class="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
    <div v-motion="zoomIn()">
      <div class="mb-6 inline-flex rounded-full bg-primary/10 p-6">
        <Icon icon="lucide:map-pin-off" class="h-16 w-16 text-primary" />
      </div>
      <p class="text-6xl font-bold text-gradient">404</p>
      <h1 class="mt-2 text-2xl font-bold md:text-3xl">Página não encontrada</h1>
      <p class="mx-auto mt-2 max-w-md text-muted-foreground">
        A página que você procura não existe ou foi movida. Verifique o endereço ou volte para o
        início.
      </p>
      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <BaseButton to="/">
          <Icon icon="lucide:home" class="h-5 w-5" />
          Voltar ao início
        </BaseButton>
        <BaseButton to="/calculadora" variant="outline">
          <Icon icon="lucide:calculator" class="h-5 w-5" />
          Ir para a calculadora
        </BaseButton>
      </div>
    </div>
  </div>
</template>
