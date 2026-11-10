<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

interface Crumb {
  label: string
  to?: string
}

const route = useRoute()

const crumbs = computed<Crumb[]>(() => {
  const list: Crumb[] = [{ label: 'Início', to: '/' }]
  if (route.name !== 'home' && route.meta.breadcrumb) {
    list.push({ label: String(route.meta.breadcrumb) })
  }
  return list
})
</script>

<template>
  <nav v-if="crumbs.length > 1" aria-label="Trilha de navegação" class="border-b bg-muted/40">
    <ol class="container-page flex flex-wrap items-center gap-1 py-3 text-sm">
      <li v-for="(crumb, i) in crumbs" :key="i" class="flex items-center gap-1">
        <Icon
          v-if="i > 0"
          icon="lucide:chevron-right"
          class="h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        <RouterLink
          v-if="crumb.to"
          :to="crumb.to"
          class="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        >
          <Icon v-if="i === 0" icon="lucide:home" class="h-4 w-4" />
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="font-medium text-foreground" aria-current="page">{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>
