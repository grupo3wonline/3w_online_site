<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section class="bg-muted/40 py-20">
    <div class="container-page text-center">
      <h2 class="mb-6 text-3xl font-bold md:text-5xl">Pronto para começar?</h2>
      <p class="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
        Junte-se a milhares de desenvolvedores que já usam o DevPlayground para testar código
        rapidamente.
      </p>
      <RouterLink to="/playground">
        <BaseButton size="lg">
          <Icon icon="lucide:rocket" class="h-5 w-5" />
          Começar Agora — 100% Grátis!
        </BaseButton>
      </RouterLink>
      <p class="mt-6 text-sm text-muted-foreground">
        <Icon icon="lucide:lock" class="mr-1 inline h-4 w-4" />
        Sem cadastro • Sem cartão de crédito • Sem pegadinhas
      </p>
    </div>
  </section>
</template>
