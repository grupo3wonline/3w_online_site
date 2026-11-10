<script setup lang="ts">
import { COMPANY } from '@/lib/constants'

withDefaults(
  defineProps<{
    variant?: 'full' | 'compact'
  }>(),
  { variant: 'full' }
)
</script>

<template>
  <section class="relative overflow-hidden bg-gray-950 py-16 text-white sm:py-20">
    <!-- Fundo mesh + brilhos -->
    <div class="absolute inset-0 bg-brand-gradient opacity-90" aria-hidden="true"></div>
    <div
      class="pointer-events-none absolute inset-0 opacity-20"
      style="
        background-image: radial-gradient(circle at 15% 30%, white 1.5px, transparent 1.5px);
        background-size: 34px 34px;
      "
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="container-app relative z-10">
      <div class="mx-auto max-w-4xl text-center">
        <span
          class="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-1.5 text-sm font-bold text-amber-100 ring-1 ring-amber-300/50"
        >
          <i class="fas fa-fire animate-pulse"></i>
          Vagas limitadas neste mês — agende agora
        </span>

        <div class="mb-6 flex justify-center">
          <div
            class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur"
          >
            <i class="fas fa-code text-3xl"></i>
          </div>
        </div>

        <h2 class="mb-4 font-display text-3xl font-bold text-balance md:text-4xl">
          Precisa de um Site ou Sistema Personalizado?
        </h2>

        <p class="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-white/90">
          O <strong>{{ COMPANY.legalName }}</strong> desenvolve sites e sistemas personalizados sob
          demanda: institucionais, e-commerce, sistemas web e aplicativos feitos sob medida para o
          seu negócio.
        </p>

        <p class="mb-8 text-base font-semibold text-amber-100">
          <i class="fas fa-bolt"></i>
          Últimas vagas para novos projetos neste trimestre. Garanta sua condição especial hoje.
        </p>

        <div class="mb-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            :href="COMPANY.ctaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-brand-700 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
          >
            <i class="fas fa-globe"></i>
            Quero meu orçamento agora
            <i class="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
          </a>
          <a
            :href="COMPANY.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-3 rounded-xl border border-white/60 px-8 py-4 text-lg font-bold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/10"
          >
            <i class="fab fa-whatsapp text-xl"></i>
            Falar no WhatsApp
          </a>
        </div>

        <div v-if="variant === 'full'" class="grid gap-4 sm:grid-cols-3">
          <div
            v-for="item in [
              { icon: 'fa-users', text: 'Mais de 500 clientes atendidos' },
              { icon: 'fa-award', text: '15 anos de experiência' },
              { icon: 'fa-headset', text: 'Suporte técnico especializado' },
            ]"
            :key="item.text"
            class="flex items-center justify-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur"
          >
            <i class="fas text-xl" :class="item.icon"></i>
            <span class="text-sm font-semibold">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
