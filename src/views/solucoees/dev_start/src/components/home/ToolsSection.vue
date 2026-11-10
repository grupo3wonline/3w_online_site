<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { TOOLS } from '@/data/tools'

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
  indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300',
  emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  teal: 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-300',
  violet: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300',
  pink: 'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-300',
  amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
}
</script>

<template>
  <section
    id="ferramentas"
    class="bg-slate-50 py-20 dark:bg-slate-900"
  >
    <div class="container-page">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          Ferramentas
        </span>
        <h2 class="section-title mt-2">
          Tudo o que você precisa para aprender
        </h2>
        <p class="mt-4 text-slate-600 dark:text-slate-400">
          Do raciocínio lógico ao código rodando, cada ferramenta cobre uma etapa da sua evolução.
        </p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="(tool, i) in TOOLS"
          :key="tool.id"
          v-motion-slide-visible-once-bottom
          :delay="i * 50"
          :to="tool.route"
          class="card group flex flex-col p-6 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl transition group-hover:scale-110"
            :class="colorMap[tool.color]"
          >
            <Icon
              :icon="tool.icon"
              class="h-6 w-6"
            />
          </div>
          <h3 class="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            {{ tool.title }}
          </h3>
          <p class="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
            {{ tool.short }}
          </p>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {{ tool.description }}
          </p>
          <span
            class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2 dark:text-brand-400"
          >
            Abrir ferramenta <Icon
              icon="lucide:arrow-right"
              class="h-4 w-4"
            />
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
