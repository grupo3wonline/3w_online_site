<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
</script>

<template>
  <section class="py-24 px-4 flex-1 flex items-center justify-center bg-gradient-hero min-h-[70vh]">
    <div class="text-center max-w-md">
      <div class="text-8xl md:text-9xl font-black text-gradient mb-4">
        404
      </div>
      <h1 class="text-2xl font-bold txt-forte mb-4">
        Página Não Encontrada
      </h1>
      <p class="txt-suave mb-8">
        A página que você está procurando não existe, foi movida ou o endereço está incorreto.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <RouterLink
          to="/"
          class="btn-primary px-8 py-3"
        >
          <Icon icon="fa6-solid:house" />
          Voltar ao Início
        </RouterLink>
        <RouterLink
          to="/contato"
          class="btn-outline px-6 py-3"
        >
          <Icon icon="fa6-solid:headset" />
          Falar com Suporte
        </RouterLink>
      </div>
    </div>
  </section>
</template>
