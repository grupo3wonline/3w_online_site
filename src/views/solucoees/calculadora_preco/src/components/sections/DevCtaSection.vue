<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <section class="py-20">
    <div class="container">
      <div
        class="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900 to-purple-900 p-12 text-center text-white shadow-2xl md:p-16"
      >
        <div class="space-y-8">
          <div
            class="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-6 py-3 text-amber-300"
          >
            <Icon icon="fa6-solid:fire" class="h-4 w-4" />
            <span class="font-semibold">Vagas limitadas para novos projetos este mês</span>
          </div>

          <h2 class="text-3xl font-black leading-tight md:text-5xl">
            Precisa de um Sistema Personalizado?
          </h2>

          <p class="mx-auto max-w-2xl text-xl leading-relaxed text-white/90">
            O <strong>Grupo 3w Online</strong> desenvolve sites e sistemas sob demanda com
            tecnologia de ponta. Não perca tempo: transforme sua ideia em realidade
            <strong class="text-amber-300">agora</strong> e saia na frente da concorrência!
          </p>

          <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            <span class="flex items-center gap-2">
              <Icon icon="fa6-solid:bolt" class="h-4 w-4 text-amber-300" />
              Orçamento rápido
            </span>
            <span class="flex items-center gap-2">
              <Icon icon="fa6-solid:shield-halved" class="h-4 w-4 text-amber-300" />
              Garantia de qualidade
            </span>
            <span class="flex items-center gap-2">
              <Icon icon="fa6-solid:clock" class="h-4 w-4 text-amber-300" />
              Prazos que cabem no seu negócio
            </span>
          </div>

          <div class="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Icon icon="fa6-solid:rocket" class="h-5 w-5" />
              Quero Meu Sistema Agora
            </a>
            <a
              href="https://wa.me/5541996924829"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-3 rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-white/10"
            >
              <Icon icon="fa6-brands:whatsapp" class="h-5 w-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
