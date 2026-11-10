<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'
import { TOOLS } from '@/data/tools'

useSeo({
  title: 'Ferramentas Interativas | DevStart Academy',
  description:
    'Explore fluxograma, circuitos lógicos, blocos, Portugol, VisualG, PHP e playground web. Aprenda programação praticando.',
  path: '/ferramentas',
})

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
  <div class="container-page py-12">
    <header class="mx-auto max-w-2xl text-center">
      <h1 class="section-title">
        Ferramentas Interativas
      </h1>
      <p class="mt-3 text-slate-600 dark:text-slate-400">
        Escolha uma ferramenta e comece a praticar. Cada uma tem guias, exemplos e dicas para te
        orientar.
      </p>
    </header>

    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="tool in TOOLS"
        :key="tool.id"
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
        <h2 class="mt-4 text-lg font-bold text-slate-900 dark:text-white">
          {{ tool.title }}
        </h2>
        <p class="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
          {{ tool.short }}
        </p>
        <p class="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
          {{ tool.description }}
        </p>
        <ul class="mt-4 space-y-1">
          <li
            v-for="tip in tool.tips"
            :key="tip"
            class="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400"
          >
            <Icon
              icon="lucide:check"
              class="mt-0.5 h-3 w-3 shrink-0 text-brand-500"
            />
            {{ tip }}
          </li>
        </ul>
        <span
          class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 dark:text-brand-400"
        >
          Abrir <Icon
            icon="lucide:arrow-right"
            class="h-4 w-4"
          />
        </span>
      </RouterLink>
    </div>
  </div>
</template>
