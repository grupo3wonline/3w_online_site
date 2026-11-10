<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import type { BreadcrumbItem } from '@/types'

  defineProps<{
    items: BreadcrumbItem[]
  }>()
</script>

<template>
  <nav class="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6" aria-label="Breadcrumb">
    <ol class="flex items-center gap-1.5 text-xs text-slate-500">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-1.5"
      >
        <Icon
          v-if="index > 0"
          icon="mdi:chevron-right"
          class="h-3.5 w-3.5 text-slate-600"
        />
        <router-link
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="flex items-center gap-1 transition hover:text-emerald-400"
        >
          <Icon v-if="item.icon" :icon="item.icon" class="h-3.5 w-3.5" />
          {{ item.label }}
        </router-link>
        <span v-else class="flex items-center gap-1 text-slate-400">
          <Icon
            v-if="item.icon && index === items.length - 1"
            :icon="item.icon"
            class="h-3.5 w-3.5"
          />
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
