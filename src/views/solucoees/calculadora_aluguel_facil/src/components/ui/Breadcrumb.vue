<script setup lang="ts">
defineProps<{
  items: Array<{ label: string; to?: string }>
}>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="mb-6">
    <ol class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
      <li>
        <router-link to="/" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <i class="fa-solid fa-house text-xs"></i>
          <span class="sr-only">Início</span>
        </router-link>
      </li>
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-2">
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-300 dark:text-gray-600"></i>
        <router-link
          v-if="item.to"
          :to="item.to"
          class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="text-gray-700 dark:text-gray-200 font-medium">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
