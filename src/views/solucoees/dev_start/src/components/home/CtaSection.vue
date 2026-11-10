<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { COMPANY } from '@/data/tools'
</script>

<template>
  <section class="bg-white py-20 dark:bg-slate-950">
    <div class="container-page">
      <div
        v-motion-slide-visible-once-bottom
        class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 px-6 py-14 text-center text-white shadow-2xl sm:px-12"
      >
        <div class="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div class="relative">
          <span
            class="inline-flex items-center gap-2 rounded-full bg-amber-400/90 px-4 py-1.5 text-sm font-bold text-amber-950"
          >
            <Icon
              icon="lucide:flame"
              class="h-4 w-4"
            />
            Vagas limitadas para novos projetos neste mês
          </span>
          <h2 class="mx-auto mt-6 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Precisa de um site ou sistema sob medida?
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            O {{ COMPANY.name }} desenvolve sites e sistemas personalizados sob demanda. A agenda
            fecha rápido — garanta seu orçamento
            <strong class="text-white">ainda hoje</strong>, sem compromisso.
          </p>
          <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              :href="COMPANY.site"
              target="_blank"
              rel="noopener noreferrer"
              class="btn w-full bg-white text-brand-700 hover:bg-brand-50 sm:w-auto"
            >
              <Icon
                icon="lucide:rocket"
                class="h-5 w-5"
              />
              Quero meu sistema personalizado
            </a>
            <a
              :href="COMPANY.whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn w-full border border-white/40 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
            >
              <Icon
                icon="lucide:message-circle"
                class="h-5 w-5"
              />
              Falar agora no WhatsApp
            </a>
          </div>
          <p class="mt-4 text-sm text-brand-200">
            <Icon
              icon="lucide:clock"
              class="mr-1 inline h-4 w-4"
            />
            Resposta rápida em horário comercial.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
