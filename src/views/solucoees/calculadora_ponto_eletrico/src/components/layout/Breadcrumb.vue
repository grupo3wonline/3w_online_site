<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Icon } from '@/components/ui'

const route = useRoute()
const { t } = useI18n()

interface Crumb {
  label: string
  to?: string
}

const crumbs = computed<Crumb[]>(() => {
  const label = route.meta.breadcrumb as string | undefined
  const list: Crumb[] = [{ label: t('breadcrumb.home'), to: '/' }]
  if (label) list.push({ label })
  return list
})

// Só exibe em páginas internas (com breadcrumb definido).
const visible = computed(() => Boolean(route.meta.breadcrumb))
</script>

<template>
  <nav v-if="visible" aria-label="Trilha de navegação" class="border-b border-border bg-muted/40">
    <ol class="container mx-auto flex items-center gap-1.5 px-4 py-3 text-sm sm:px-6">
      <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center gap-1.5">
        <RouterLink
          v-if="crumb.to && index < crumbs.length - 1"
          :to="crumb.to"
          class="text-muted-foreground transition-colors hover:text-primary"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="font-medium text-foreground" aria-current="page">
          {{ crumb.label }}
        </span>
        <Icon
          v-if="index < crumbs.length - 1"
          icon="lucide:chevron-right"
          class="h-4 w-4 text-muted-foreground"
        />
      </li>
    </ol>
  </nav>
</template>
