<template>
  <nav class="breadcrumb" aria-label="Navegação em trilha">
    <ol class="flex items-center flex-wrap gap-1">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <RouterLink
          v-if="item.path"
          :to="item.path"
          class="hover:text-white transition-colors text-sm"
        >
          {{ item.label }}
        </RouterLink>
        <span v-else class="text-white font-medium text-sm" aria-current="page">
          {{ item.label }}
        </span>

        <Icon
          v-if="index < items.length - 1"
          icon="mdi:chevron-right"
          class="w-4 h-4 mx-1 text-blue-300"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface BreadcrumbItem {
  label: string
  path?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
