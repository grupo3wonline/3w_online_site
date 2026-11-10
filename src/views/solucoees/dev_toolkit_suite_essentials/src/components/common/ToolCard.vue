<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import type { ToolMeta } from '@/config/site'

defineProps<{ tool: ToolMeta }>()
</script>

<template>
  <RouterLink
    :to="tool.path"
    class="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring"
  >
    <div
      class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md transition-transform group-hover:scale-110"
      :class="tool.color"
    >
      <Icon :icon="tool.icon" class="h-6 w-6" />
    </div>
    <h3 class="text-lg font-semibold">{{ tool.title }}</h3>
    <p class="mt-2 flex-1 text-sm text-muted-foreground">{{ tool.description }}</p>
    <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
      Abrir ferramenta
      <Icon
        icon="lucide:arrow-right"
        class="h-4 w-4 transition-transform group-hover:translate-x-1"
      />
    </span>
  </RouterLink>
</template>
