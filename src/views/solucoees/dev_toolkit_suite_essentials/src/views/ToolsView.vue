<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ToolCard from '@/components/common/ToolCard.vue'
import { TOOLS } from '@/config/site'
</script>

<template>
  <div>
    <section class="border-b bg-muted/30 py-14">
      <div class="container-app text-center">
        <span
          class="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-600 dark:text-brand-300"
        >
          <Icon icon="lucide:sparkles" class="h-4 w-4" />
          {{ TOOLS.length }} ferramentas gratuitas
        </span>
        <h1 class="text-3xl font-bold md:text-4xl">Ferramentas de Desenvolvimento</h1>
        <p class="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Sua caixa de ferramentas completa para o dia a dia. Tudo roda localmente no seu navegador,
          garantindo máxima privacidade e velocidade — seus dados nunca são enviados a servidores.
        </p>
      </div>
    </section>

    <section class="container-app py-14">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ToolCard v-for="tool in TOOLS" :key="tool.slug" :tool="tool" />
      </div>
    </section>
  </div>
</template>
