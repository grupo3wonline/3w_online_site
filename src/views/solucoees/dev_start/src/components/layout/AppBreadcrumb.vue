<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

interface Crumb {
  label: string
  to?: string
}

const route = useRoute()
const crumbs = computed<Crumb[]>(() => (route.meta.breadcrumb as Crumb[]) ?? [])
const showBreadcrumb = computed(() => crumbs.value.length > 1)
</script>

<template>
  <nav
    v-if="showBreadcrumb"
    aria-label="Trilha de navegação"
    class="border-b border-slate-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
  >
    <ol class="container-page flex flex-wrap items-center gap-1 py-3 text-sm">
      <li
        v-for="(crumb, index) in crumbs"
        :key="index"
        class="flex items-center gap-1"
      >
        <Icon
          v-if="index > 0"
          icon="lucide:chevron-right"
          class="h-4 w-4 text-slate-400"
          aria-hidden="true"
        />
        <RouterLink
          v-if="crumb.to && index < crumbs.length - 1"
          :to="crumb.to"
          class="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
        >
          {{ crumb.label }}
        </RouterLink>
        <span
          v-else
          class="font-semibold text-slate-800 dark:text-slate-100"
          aria-current="page"
        >
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
