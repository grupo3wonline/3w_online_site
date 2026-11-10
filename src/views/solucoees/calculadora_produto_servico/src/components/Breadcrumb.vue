<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()

const migalhas = computed(() => {
  const label = (route.meta.breadcrumb as string) || ''
  if (!label || route.path === '/') return []
  return [{ label, path: route.path, atual: true }]
})
</script>

<template>
  <nav
    v-if="migalhas.length"
    aria-label="Trilha de navegação"
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
  >
    <ol class="flex items-center flex-wrap gap-1 text-sm">
      <li>
        <RouterLink
          to="/"
          class="txt-fraco hover:text-primary-500 transition-colors"
          aria-label="Início"
        >
          <Icon
            icon="fa6-solid:house"
            class="text-xs"
          />
        </RouterLink>
      </li>
      <li
        v-for="m in migalhas"
        :key="m.path"
        class="flex items-center gap-1"
      >
        <Icon
          icon="fa6-solid:chevron-right"
          class="text-[10px] txt-fraco"
        />
        <span class="text-primary-500 font-medium">{{ m.label }}</span>
      </li>
    </ol>
  </nav>
</template>
