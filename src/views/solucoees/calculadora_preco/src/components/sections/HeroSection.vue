<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const trust = [
  { icon: 'fa6-solid:circle-check', text: 'Sem cadastro obrigatório' },
  { icon: 'fa6-solid:shield-halved', text: '100% Gratuito' },
  { icon: 'fa6-solid:lock', text: 'Dados seguros' },
]
</script>

<template>
  <section id="inicio" class="relative overflow-hidden py-20 md:py-32">
    <div
      class="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/10 to-pink-600/10"
    />
    <div class="container relative z-10">
      <div class="mx-auto max-w-5xl space-y-8 text-center">
        <div
          v-motion-fade-visible
          class="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-background/80 px-6 py-3 shadow-lg backdrop-blur-sm dark:border-violet-800"
        >
          <Icon icon="fa6-solid:star" class="h-4 w-4 text-amber-500" />
          <span class="text-sm font-semibold text-foreground/80">
            Mais de 5.000 empreendedores confiam em nossa ferramenta
          </span>
        </div>

        <h1 class="text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
          <span class="text-gradient">Descubra o Preço Justo</span>
          <br />
          <span class="text-foreground">do Seu Trabalho</span>
        </h1>

        <p class="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
          Pare de cobrar menos do que vale! Nossa calculadora profissional ajuda você a
          <strong class="text-primary"> precificar com precisão</strong>, aumentar lucros e crescer
          com sustentabilidade.
        </p>

        <div class="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <RouterLink
            to="/calculadora"
            class="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-violet-700 hover:to-purple-700"
          >
            <Icon icon="fa6-solid:calculator" class="h-5 w-5" />
            Calcular Preços Agora — Grátis!
          </RouterLink>
          <a
            href="#como-funciona"
            class="inline-flex items-center gap-3 rounded-xl border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition-colors hover:bg-accent"
          >
            <Icon icon="fa6-solid:circle-play" class="h-5 w-5" />
            Como Funciona
          </a>
        </div>

        <div
          class="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground"
        >
          <div v-for="t in trust" :key="t.text" class="flex items-center gap-2">
            <Icon :icon="t.icon" class="h-4 w-4 text-green-500" />
            <span>{{ t.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
