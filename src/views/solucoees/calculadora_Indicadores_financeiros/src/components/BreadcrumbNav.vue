<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()

const crumbs = computed(() => {
  const current = (route.meta.breadcrumb as string) ?? ''
  const isHome = route.name === 'home'
  const items = [{ label: 'Início', to: { name: 'home' }, current: isHome }]
  if (!isHome && current) {
    items.push({ label: current, to: { name: route.name as string }, current: true })
  }
  return items
})
</script>

<template>
  <nav
    v-if="crumbs.length > 1"
    aria-label="Breadcrumb"
    class="border-b border-ink-200/60 bg-white/50 backdrop-blur dark:border-ink-800 dark:bg-ink-900/40"
  >
    <ol
      class="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-sm text-ink-500 sm:px-6 lg:px-8 dark:text-ink-400"
    >
      <li v-for="(crumb, i) in crumbs" :key="i" class="flex items-center gap-1.5">
        <Icon v-if="i > 0" icon="mdi:chevron-right" class="text-ink-300 dark:text-ink-600" />
        <span
          v-if="crumb.current"
          class="font-semibold text-ink-800 dark:text-ink-100"
          aria-current="page"
        >
          {{ crumb.label }}
        </span>
        <RouterLink v-else :to="crumb.to" class="transition-colors hover:text-primary-600">{{
          crumb.label
        }}</RouterLink>
      </li>
    </ol>
  </nav>
</template>
