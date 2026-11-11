<template>
  <nav class="breadcrumb" aria-label="Navegação em trilha" itemscope itemtype="https://schema.org/BreadcrumbList">
    <ol class="flex items-center flex-wrap gap-1">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <!-- Link clicável -->
        <RouterLink
          v-if="item.path"
          :to="item.path"
          class="hover:text-white transition-colors text-sm"
          itemprop="item"
        >
          <span itemprop="name">{{ item.label }}</span>
        </RouterLink>

        <!-- Item atual (sem link) -->
        <span
          v-else
          class="text-white font-medium text-sm"
          aria-current="page"
          itemprop="name"
        >
          {{ item.label }}
        </span>

        <!-- Posição (oculta, para schema) -->
        <meta itemprop="position" :content="String(index + 1)" />

        <!-- Separador visual -->
        <Icon
          v-if="index < items.length - 1"
          icon="mdi:chevron-right"
          class="w-4 h-4 mx-1 text-blue-300"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'

export interface BreadcrumbItem {
  label: string
  path?: string
}

const props = defineProps<{
  items: BreadcrumbItem[]
}>()

const { injectJsonLd, breadcrumbSchema, BASE_URL } = useSeo()

/** Injeta o schema JSON-LD BreadcrumbList cada vez que os items mudam */
function injectSchema() {
  if (!props.items || props.items.length === 0) return

  const schemaItems = props.items.map((item, index) => ({
    name: item.label,
    url: item.path
      ? item.path.startsWith('http')
        ? item.path
        : `${BASE_URL}${item.path}`
      : `${BASE_URL}${window?.location?.pathname ?? '/'}`,
  }))

  injectJsonLd(breadcrumbSchema(schemaItems), 'schema-breadcrumb')
}

onMounted(injectSchema)
watch(() => props.items, injectSchema, { deep: true })
</script>
