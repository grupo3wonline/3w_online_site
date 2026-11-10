<script setup lang="ts">
import { computed, onBeforeUnmount, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const SCRIPT_ID = 'breadcrumb-jsonld'

interface Crumb {
  label: string
  to?: string
}

const crumbs = computed<Crumb[]>(() => {
  const list: Crumb[] = [{ label: 'Início', to: '/' }]
  const current = route.meta.breadcrumb as string | undefined
  if (current && route.name !== 'home') {
    list.push({ label: current })
  }
  return list
})

// Injeta structured data (BreadcrumbList) no <head> de forma segura para SEO/AEO.
watchEffect(() => {
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = SCRIPT_ID
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.value.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
    })),
  })
})

onBeforeUnmount(() => {
  document.getElementById(SCRIPT_ID)?.remove()
})
</script>

<template>
  <nav
    v-if="crumbs.length > 1"
    class="border-b border-gray-200/60 bg-white/60 backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/60"
    aria-label="Trilha de navegação"
  >
    <div class="container mx-auto px-4 py-3">
      <ol class="flex flex-wrap items-center gap-1 text-sm">
        <li
          v-for="(crumb, i) in crumbs"
          :key="i"
          class="flex items-center gap-1"
        >
          <Icon
            v-if="i > 0"
            icon="lucide:chevron-right"
            class="h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
          <RouterLink
            v-if="crumb.to"
            :to="crumb.to"
            class="font-medium text-violet-600 transition-colors hover:text-violet-800 dark:text-violet-400"
          >
            {{ crumb.label }}
          </RouterLink>
          <span
            v-else
            class="text-gray-500 dark:text-gray-400"
            aria-current="page"
          >
            {{ crumb.label }}
          </span>
        </li>
      </ol>
    </div>
  </nav>
</template>
