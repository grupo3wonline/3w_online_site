<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const SCRIPT_ID = 'breadcrumb-jsonld'

const trilha = computed(() => {
  const atual = (route.meta.breadcrumb as string) ?? ''
  const itens = [{ label: 'Início', to: '/' }]
  if (route.path !== '/' && atual) itens.push({ label: atual, to: route.path })
  return itens
})

// Dados estruturados de breadcrumb (SEO/AEO) injetados no <head>
function atualizarJsonLd() {
  let el = document.getElementById(SCRIPT_ID)
  if (trilha.value.length <= 1) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.id = SCRIPT_ID
    el.setAttribute('type', 'application/ld+json')
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trilha.value.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
    })),
  })
}

watch(trilha, atualizarJsonLd, { immediate: true })
onBeforeUnmount(() => document.getElementById(SCRIPT_ID)?.remove())
</script>

<template>
  <nav
    v-if="trilha.length > 1"
    aria-label="Trilha de navegação"
    class="border-b border-border bg-background-secondary"
  >
    <div class="container py-3">
      <ol class="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li v-for="(item, i) in trilha" :key="item.to" class="flex items-center gap-1">
          <Icon v-if="i > 0" icon="lucide:chevron-right" class="h-4 w-4" />
          <RouterLink
            v-if="i < trilha.length - 1"
            :to="item.to"
            class="transition-colors hover:text-primary"
          >
            {{ item.label }}
          </RouterLink>
          <span v-else class="font-medium text-foreground" aria-current="page">{{
            item.label
          }}</span>
        </li>
      </ol>
    </div>
  </nav>
</template>
