<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { COMPANY } from '@/data/tools'

const highlights = [
  { icon: 'lucide:layout-template', label: 'Sites institucionais e landing pages' },
  { icon: 'lucide:database', label: 'Sistemas web sob demanda' },
  { icon: 'lucide:shopping-cart', label: 'E-commerce e integrações' },
  { icon: 'lucide:cpu', label: 'Automações e APIs' },
]
</script>

<template>
  <section
    id="sobre"
    class="bg-slate-50 py-20 dark:bg-slate-900"
  >
    <div class="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
      <div v-motion-slide-visible-once-left>
        <span class="text-sm font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          Sobre
        </span>
        <h2 class="section-title mt-2">
          Feito por quem vive de tecnologia
        </h2>
        <p class="mt-4 text-slate-600 dark:text-slate-400">
          O DevStart Academy nasceu dentro do <strong>{{ COMPANY.name }}</strong>, especialista em
          {{ COMPANY.slogan.toLowerCase() }}. Reunimos anos de experiência criando soluções digitais
          para transformar iniciantes em desenvolvedores confiantes.
        </p>
        <p class="mt-4 text-slate-600 dark:text-slate-400">
          Acreditamos que aprender a programar deve ser acessível, prático e em português. Por isso
          disponibilizamos estas ferramentas gratuitamente para toda a comunidade.
        </p>

        <ul class="mt-6 grid gap-3 sm:grid-cols-2">
          <li
            v-for="h in highlights"
            :key="h.label"
            class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Icon
              :icon="h.icon"
              class="h-5 w-5 text-brand-600"
            />
            {{ h.label }}
          </li>
        </ul>
      </div>

      <div
        v-motion-slide-visible-once-right
        class="relative"
      >
        <div
          class="rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 p-8 text-white shadow-2xl"
        >
          <Icon
            icon="lucide:building-2"
            class="h-12 w-12 text-white/80"
          />
          <h3 class="mt-6 text-2xl font-bold">
            {{ COMPANY.name }}
          </h3>
          <p class="mt-2 text-brand-100">
            {{ COMPANY.slogan }}.
          </p>
          <div class="mt-6 space-y-2 text-sm">
            <a
              :href="COMPANY.site"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 hover:underline"
            >
              <Icon
                icon="lucide:globe"
                class="h-4 w-4"
              /> www.3wonline.com.br
            </a>
          </div>
          <a
            :href="COMPANY.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="btn mt-8 w-full bg-white text-brand-700 hover:bg-brand-50"
          >
            <Icon
              icon="lucide:message-circle"
              class="h-5 w-5"
            />
            Falar com a equipe
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
