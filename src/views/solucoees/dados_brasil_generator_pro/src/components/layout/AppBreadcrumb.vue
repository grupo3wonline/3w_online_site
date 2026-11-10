<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

interface Crumb {
  label: string
  to?: string
}

const route = useRoute()
const crumbs = computed<Crumb[]>(() => (route.meta.breadcrumb as Crumb[]) || [])
const show = computed(() => crumbs.value.length > 1)
</script>

<template>
  <nav v-if="show" aria-label="Trilha de navegação" class="container-app pt-6">
    <ol class="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      <li v-for="(crumb, i) in crumbs" :key="i" class="flex items-center gap-1.5">
        <Icon v-if="i > 0" icon="lucide:chevron-right" class="h-4 w-4 opacity-50" aria-hidden="true" />
        <RouterLink
          v-if="crumb.to && i < crumbs.length - 1"
          :to="crumb.to"
          class="transition-colors hover:text-primary"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="font-medium text-foreground" aria-current="page">{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>
