<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()

const crumbs = computed(() => {
  const current = (route.meta.breadcrumb as string) ?? ''
  const items = [{ label: 'Início', to: '/' }]
  if (route.name !== 'home' && current) {
    items.push({ label: current, to: route.fullPath })
  }
  return items
})
</script>

<template>
  <nav
    v-if="crumbs.length > 1"
    aria-label="Trilha de navegação"
    class="border-b border-border bg-muted/30"
  >
    <div class="container py-3">
      <ol class="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li v-for="(crumb, index) in crumbs" :key="crumb.to" class="flex items-center gap-1">
          <Icon
            v-if="index > 0"
            icon="lucide:chevron-right"
            class="h-4 w-4 opacity-60"
            aria-hidden="true"
          />
          <RouterLink
            v-if="index < crumbs.length - 1"
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
    </div>
  </nav>
</template>
