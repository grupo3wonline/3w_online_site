<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

/**
 * Breadcrumb gerado a partir da rota atual.
 * Inclui microdados Schema.org (BreadcrumbList) para SEO.
 */
const route = useRoute()

const crumbs = computed(() => {
  const list = [{ label: 'Início', to: '/' }]
  if (route.name && route.name !== 'home' && route.meta.breadcrumb) {
    list.push({ label: route.meta.breadcrumb as string, to: route.path })
  }
  return list
})

const show = computed(() => crumbs.value.length > 1)
</script>

<template>
  <nav
    v-if="show"
    class="mb-6 rounded-lg border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-3 shadow-sm dark:border-purple-900/30 dark:from-slate-800 dark:to-slate-900"
    aria-label="Trilha de navegação"
  >
    <ol
      class="flex flex-wrap items-center gap-1 text-sm"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li
        v-for="(crumb, index) in crumbs"
        :key="crumb.to"
        class="flex items-center"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <Icon
          v-if="index > 0"
          icon="fa6-solid:chevron-right"
          class="mx-2 text-xs text-purple-400"
          aria-hidden="true"
        />
        <RouterLink
          v-if="index < crumbs.length - 1"
          :to="crumb.to"
          class="flex items-center gap-2 text-muted-foreground transition hover:text-primary"
          itemprop="item"
        >
          <Icon v-if="index === 0" icon="fa6-solid:house" aria-hidden="true" />
          <span itemprop="name">{{ crumb.label }}</span>
        </RouterLink>
        <span v-else class="flex items-center gap-2 font-semibold text-primary" aria-current="page">
          <Icon icon="fa6-solid:location-dot" aria-hidden="true" />
          <span itemprop="name">{{ crumb.label }}</span>
        </span>
        <meta itemprop="position" :content="String(index + 1)" />
      </li>
    </ol>
  </nav>
</template>
