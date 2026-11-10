<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

interface Crumb {
  label: string
  to?: string
}

const route = useRoute()

const crumbs = computed<Crumb[]>(() => {
  const fromMeta = route.meta.breadcrumb as Crumb[] | undefined
  if (fromMeta && fromMeta.length) {
    return [{ label: 'Início', to: '/' }, ...fromMeta]
  }
  return [{ label: 'Início', to: '/' }]
})
</script>

<template>
  <nav aria-label="Trilha de navegação" class="border-b bg-muted/30">
    <ol class="container-app flex flex-wrap items-center gap-1 py-3 text-sm text-muted-foreground">
      <li v-for="(crumb, i) in crumbs" :key="i" class="flex items-center gap-1">
        <Icon
          v-if="i > 0"
          icon="lucide:chevron-right"
          class="h-4 w-4 shrink-0 opacity-60"
          aria-hidden="true"
        />
        <RouterLink
          v-if="crumb.to && i < crumbs.length - 1"
          :to="crumb.to"
          class="transition-colors hover:text-primary"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="font-medium text-foreground" aria-current="page">
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
