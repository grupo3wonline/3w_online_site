<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  items: Array<{ label: string; to?: string }>
}>()
</script>

<template>
  <nav class="container-app py-4" aria-label="Breadcrumb">
    <ol class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-2">
        <RouterLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1"
        >
          <i v-if="index === 0" class="fa-solid fa-house text-xs"></i>
          {{ item.label }}
        </RouterLink>
        <span
          v-else
          class="font-semibold text-gray-900 dark:text-white"
        >
          <i v-if="index === 0 && !item.to" class="fa-solid fa-house text-xs mr-1"></i>
          {{ item.label }}
        </span>
        <i v-if="index < items.length - 1" class="fa-solid fa-chevron-right text-xs text-gray-300 dark:text-gray-600"></i>
      </li>
    </ol>
  </nav>
</template>
