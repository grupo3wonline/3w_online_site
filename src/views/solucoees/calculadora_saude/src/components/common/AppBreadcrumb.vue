<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';

interface Crumb {
  label: string;
  to?: string;
}

defineProps<{ items: Crumb[] }>();
</script>

<template>
  <nav
    aria-label="Trilha de navegação"
    class="container-page py-4"
  >
    <ol class="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <li>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-1 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
        >
          <Icon
            icon="fa6-solid:house"
            aria-hidden="true"
          />
          <span>Início</span>
        </RouterLink>
      </li>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-2"
      >
        <Icon
          icon="fa6-solid:chevron-right"
          class="text-xs"
          aria-hidden="true"
        />
        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
        >
          {{ item.label }}
        </RouterLink>
        <span
          v-else
          class="font-medium text-gray-700 dark:text-gray-200"
          aria-current="page"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
