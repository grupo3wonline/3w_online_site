<template>
  <nav v-if="items.length > 1" aria-label="Breadcrumb" class="mb-6">
    <ol class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <li v-for="(item, idx) in items" :key="item.path" class="flex items-center gap-2">
        <i v-if="idx > 0" class="fa-solid fa-chevron-right text-xs"></i>
        <router-link
          v-if="idx < items.length - 1"
          :to="item.path"
          class="transition-colors hover:text-bbq-orange"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="font-medium text-foreground">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routeLabels: Record<string, string> = {
  '/': 'Início',
  '/calculadora': 'Calculadora',
  '/ferramenta': 'Calculadora',
  '/orcamento': 'Orçamento',
  '/privacidade': 'Privacidade',
  '/sobre': 'Privacidade',
}

const items = computed(() => {
  const crumbs = [{ path: '/', label: 'Início' }]
  if (route.path !== '/') {
    crumbs.push({ path: route.path, label: routeLabels[route.path] || 'Página' })
  }
  return crumbs
})
</script>
