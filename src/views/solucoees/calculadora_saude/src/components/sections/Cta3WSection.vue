<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="bg-gradient-to-r from-brand-600 to-teal-700 py-16 text-white">
    <div class="container-page text-center">
      <span
        class="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold text-gray-900"
      >
        <Icon
          icon="fa6-solid:fire"
          aria-hidden="true"
        />
        Vagas limitadas neste mês
      </span>
      <h2 class="mb-4 text-3xl font-bold md:text-4xl">
        Precisa de uma Solução Digital Personalizada?
      </h2>
      <p class="mx-auto mb-2 max-w-2xl text-lg opacity-95">
        Esta calculadora é um exemplo do que o <strong>Grupo 3W Online</strong> pode criar.
        Desenvolvemos sites, sistemas e aplicativos sob medida para o seu negócio.
      </p>
      <p class="mx-auto mb-8 max-w-2xl font-semibold text-yellow-200">
        <Icon
          icon="fa6-solid:clock"
          class="mr-1"
          aria-hidden="true"
        />
        Agenda de novos projetos fechando em breve — garanta seu orçamento agora, sem compromisso.
      </p>
      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="https://www.3wonline.com.br"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 rounded-full bg-yellow-400 px-8 py-4 text-lg font-bold text-gray-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-yellow-300"
        >
          <Icon
            icon="fa6-solid:rocket"
            aria-hidden="true"
          />
          Quero Meu Projeto Agora
        </a>
        <a
          href="https://wa.me/5541996924829"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
        >
          <Icon
            icon="fa6-brands:whatsapp"
            class="text-xl"
            aria-hidden="true"
          />
          Falar com Especialista
        </a>
      </div>
    </div>
  </section>
</template>
