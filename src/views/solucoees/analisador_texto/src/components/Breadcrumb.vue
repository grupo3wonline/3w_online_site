<template>
  <nav aria-label="Trilha de navegação" class="mb-6">
    <ol class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 flex-wrap">
      <li>
        <router-link
          to="/"
          class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1"
        >
          <i class="fa-solid fa-house text-xs" aria-hidden="true"></i>
          <span>Início</span>
        </router-link>
      </li>
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-2">
        <i class="fa-solid fa-chevron-right text-[10px] text-slate-300 dark:text-slate-600" aria-hidden="true"></i>
        <router-link
          v-if="item.to"
          :to="item.to"
          class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="text-slate-700 dark:text-slate-200 font-medium" aria-current="page">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{ items: BreadcrumbItem[] }>()
</script>
