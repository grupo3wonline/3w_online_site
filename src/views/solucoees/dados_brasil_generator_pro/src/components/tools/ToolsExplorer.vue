<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Fuse from 'fuse.js'
import ToolCard from '@/components/tools/ToolCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { tools, categoryLabels, findToolBySlug, type ToolCategory } from '@/data/tools'
import { useFavoritesStore } from '@/stores/favorites'

const favorites = useFavoritesStore()
const favoriteTools = computed(() =>
  favorites.slugs.map((s) => findToolBySlug(s)).filter((t): t is NonNullable<typeof t> => !!t),
)

const search = ref('')

const fuse = new Fuse(tools, {
  keys: ['title', 'description', 'keywords'],
  threshold: 0.4,
  ignoreLocation: true,
})

const filtered = computed(() => {
  const term = search.value.trim()
  if (!term) return tools
  return fuse.search(term).map((r) => r.item)
})

const categories: ToolCategory[] = ['gerador', 'validador', 'conversor']

const grouped = computed(() =>
  categories
    .map((cat) => ({ cat, items: filtered.value.filter((t) => t.category === cat) }))
    .filter((g) => g.items.length > 0),
)

const hasResults = computed(() => filtered.value.length > 0)
</script>

<template>
  <div>
    <!-- Busca -->
    <div class="relative mx-auto mb-12 max-w-xl">
      <Icon
        icon="lucide:search"
        class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
      />
      <input
        v-model="search"
        type="search"
        autocomplete="off"
        placeholder="Pesquisar ferramenta (ex.: CPF, JSON, QR Code)..."
        aria-label="Pesquisar ferramenta"
        class="h-14 w-full rounded-full border border-border bg-card pl-12 pr-4 text-base shadow-sm outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>

    <!-- Favoritos -->
    <section v-if="favoriteTools.length && !search.trim()" class="mb-14">
      <div class="mb-6 flex items-center gap-3">
        <span class="grid h-7 w-7 place-items-center rounded-lg bg-amber-500/15 text-amber-500">
          <Icon icon="lucide:star" class="h-4 w-4 fill-amber-400" />
        </span>
        <h3 class="text-2xl font-bold">Seus favoritos</h3>
        <span class="rounded-full bg-secondary px-2.5 py-0.5 text-sm font-medium text-muted-foreground">
          {{ favoriteTools.length }}
        </span>
      </div>
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ToolCard v-for="tool in favoriteTools" :key="`fav-${tool.slug}`" :tool="tool" />
      </div>
    </section>

    <!-- Resultados por categoria -->
    <template v-if="hasResults">
      <section v-for="group in grouped" :key="group.cat" class="mb-14">
        <div class="mb-6 flex items-center gap-3">
          <span class="h-7 w-1.5 rounded-full bg-primary" />
          <h3 class="text-2xl font-bold">{{ categoryLabels[group.cat] }}</h3>
          <span class="rounded-full bg-secondary px-2.5 py-0.5 text-sm font-medium text-muted-foreground">
            {{ group.items.length }}
          </span>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ToolCard v-for="tool in group.items" :key="tool.slug" :tool="tool" />
        </div>
      </section>
    </template>

    <!-- Sem resultados -->
    <div v-else class="py-16 text-center">
      <Icon icon="lucide:search-x" class="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
      <p class="text-lg text-muted-foreground">Nenhuma ferramenta encontrada para "{{ search }}".</p>
      <BaseButton variant="ghost" class="mt-3" @click="search = ''">Limpar pesquisa</BaseButton>
    </div>
  </div>
</template>
