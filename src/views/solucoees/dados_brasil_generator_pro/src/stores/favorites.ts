import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'dbg-favorites'

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/** Favoritos de ferramentas — persistidos localmente. */
export const useFavoritesStore = defineStore('favorites', () => {
  const slugs = ref<string[]>(load())

  const count = computed(() => slugs.value.length)

  function isFavorite(slug: string): boolean {
    return slugs.value.includes(slug)
  }

  function toggle(slug: string) {
    const idx = slugs.value.indexOf(slug)
    if (idx >= 0) slugs.value.splice(idx, 1)
    else slugs.value.unshift(slug)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs.value))
  }

  return { slugs, count, isFavorite, toggle }
})
