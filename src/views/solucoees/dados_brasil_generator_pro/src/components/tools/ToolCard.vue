<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import type { ToolMeta } from '@/data/tools'
import { useFavoritesStore } from '@/stores/favorites'

defineProps<{ tool: ToolMeta }>()
const favorites = useFavoritesStore()
</script>

<template>
  <div
    class="group relative flex flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
  >
    <!-- Botão de favorito -->
    <button
      type="button"
      class="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      :aria-label="favorites.isFavorite(tool.slug) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      :aria-pressed="favorites.isFavorite(tool.slug)"
      @click="favorites.toggle(tool.slug)"
    >
      <Icon
        :icon="favorites.isFavorite(tool.slug) ? 'lucide:star' : 'lucide:star'"
        class="h-5 w-5"
        :class="favorites.isFavorite(tool.slug) ? 'fill-amber-400 text-amber-500' : ''"
      />
    </button>

    <RouterLink
      :to="`/ferramentas/${tool.slug}`"
      class="flex flex-grow flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        class="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
      >
        <Icon :icon="tool.icon" class="h-6 w-6" />
      </span>
      <h3 class="mb-1.5 pr-8 font-bold">{{ tool.title }}</h3>
      <p class="flex-grow text-sm text-muted-foreground">{{ tool.description }}</p>
      <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Acessar
        <Icon icon="lucide:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </RouterLink>
  </div>
</template>
