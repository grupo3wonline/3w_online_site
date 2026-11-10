<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Crumb {
  label: string
  to?: string
}

defineProps<{ items: Crumb[] }>()
</script>

<template>
  <nav aria-label="Trilha de navegação" class="py-4">
    <ol
      class="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-gray-200/70 bg-white/60 px-3 py-1.5 text-sm shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60"
    >
      <li class="flex items-center gap-1.5">
        <RouterLink
          to="/"
          class="flex items-center gap-1.5 text-gray-500 transition-colors hover:text-brand-600"
        >
          <i class="fas fa-house text-xs"></i>
          <span>Início</span>
        </RouterLink>
      </li>
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1.5">
        <i class="fas fa-chevron-right text-[10px] text-gray-400" aria-hidden="true"></i>
        <RouterLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="text-gray-500 transition-colors hover:text-brand-600"
        >
          {{ item.label }}
        </RouterLink>
        <span v-else class="font-semibold text-brand-600 dark:text-brand-400" aria-current="page">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
