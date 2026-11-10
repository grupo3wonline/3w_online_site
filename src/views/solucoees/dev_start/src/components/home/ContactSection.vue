<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { COMPANY } from '@/data/tools'

const channels = [
  {
    icon: 'lucide:message-circle',
    title: 'WhatsApp',
    value: COMPANY.whatsapp,
    href: COMPANY.whatsappLink,
    accent: 'from-green-500 to-emerald-600',
    cta: 'Chamar no WhatsApp',
  },
  {
    icon: 'lucide:mail',
    title: 'E-mail',
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    accent: 'from-brand-500 to-indigo-600',
    cta: 'Enviar e-mail',
  },
]
</script>

<template>
  <section
    id="contato"
    class="bg-slate-50 py-20 dark:bg-slate-900"
  >
    <div class="container-page">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          Contato
        </span>
        <h2 class="section-title mt-2">
          Vamos tirar seu projeto do papel
        </h2>
        <p class="mt-4 text-slate-600 dark:text-slate-400">
          O <strong>{{ COMPANY.name }}</strong> está pronto para desenvolver o site ou sistema que a
          sua empresa precisa. Fale com a gente pelos canais abaixo — sem formulários, direto ao
          ponto.
        </p>
      </div>

      <div class="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        <a
          v-for="c in channels"
          :key="c.title"
          :href="c.href"
          target="_blank"
          rel="noopener noreferrer"
          class="card group flex flex-col items-center p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div
            class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg"
            :class="c.accent"
          >
            <Icon
              :icon="c.icon"
              class="h-8 w-8"
            />
          </div>
          <h3 class="mt-5 text-lg font-bold text-slate-900 dark:text-white">{{ c.title }}</h3>
          <p class="mt-1 text-slate-600 dark:text-slate-300">{{ c.value }}</p>
          <span
            class="btn-primary mt-6 group-hover:gap-3"
          >
            {{ c.cta }}
            <Icon
              icon="lucide:arrow-right"
              class="h-4 w-4"
            />
          </span>
        </a>
      </div>

      <p class="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        {{ COMPANY.name }} — {{ COMPANY.slogan }}.
        <a
          :href="COMPANY.site"
          target="_blank"
          rel="noopener noreferrer"
          class="link-underline"
        >
          www.3wonline.com.br
        </a>
      </p>
    </div>
  </section>
</template>
