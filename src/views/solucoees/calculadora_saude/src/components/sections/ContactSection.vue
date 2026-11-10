<script setup lang="ts">
import { Icon } from '@iconify/vue';

const channels = [
  {
    icon: 'fa6-brands:whatsapp',
    color: 'text-green-500',
    label: 'WhatsApp',
    value: '(41) 99692-4829',
    href: 'https://wa.me/5541996924829',
    external: true,
  },
  {
    icon: 'fa6-solid:envelope',
    color: 'text-brand-500',
    label: 'E-mail',
    value: 'contato@3wonline.com.br',
    href: 'mailto:contato@3wonline.com.br',
    external: false,
  },
  {
    icon: 'fa6-solid:globe',
    color: 'text-blue-500',
    label: 'Site',
    value: 'www.3wonline.com.br',
    href: 'https://www.3wonline.com.br',
    external: true,
  },
];
</script>

<template>
  <section
    id="contato"
    class="bg-gray-50 py-20 dark:bg-gray-800"
  >
    <div class="container-page">
      <div class="mb-12 text-center">
        <Icon
          icon="fa6-solid:headset"
          class="mx-auto mb-6 text-5xl text-brand-500"
          aria-hidden="true"
        />
        <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Fale com o Grupo 3W Online
        </h2>
        <p class="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Somos especialistas em desenvolvimento de <strong>sites e sistemas personalizados sob
            demanda</strong>. Tem uma ideia ou projeto? Vamos transformá-la em uma solução digital de
          alta performance. Fale direto com a nossa equipe — resposta rápida, sem burocracia.
        </p>
      </div>

      <div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        <a
          v-for="ch in channels"
          :key="ch.label"
          :href="ch.href"
          :target="ch.external ? '_blank' : undefined"
          :rel="ch.external ? 'noopener noreferrer' : undefined"
          class="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
        >
          <Icon
            :icon="ch.icon"
            class="text-4xl"
            :class="ch.color"
            aria-hidden="true"
          />
          <span class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {{ ch.label }}
          </span>
          <span class="text-lg font-bold text-gray-900 dark:text-white">{{ ch.value }}</span>
        </a>
      </div>

      <div
        class="mx-auto mt-12 max-w-3xl rounded-2xl bg-gradient-to-r from-brand-600 to-teal-700 p-8 text-center text-white"
      >
        <h3 class="mb-3 text-2xl font-bold">
          Pronto para sair na frente da concorrência?
        </h3>
        <p class="mb-6 opacity-95">
          Cada dia sem presença digital é oportunidade perdida. Solicite agora um orçamento sem
          compromisso e descubra como podemos acelerar o seu negócio.
        </p>
        <a
          href="https://wa.me/5541996924829"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 rounded-full bg-yellow-400 px-8 py-4 font-bold text-gray-900 shadow-lg transition-all hover:scale-105 hover:bg-yellow-300"
        >
          <Icon
            icon="fa6-brands:whatsapp"
            class="text-xl"
            aria-hidden="true"
          />
          Solicitar Orçamento Grátis
        </a>
      </div>
    </div>
  </section>
</template>
