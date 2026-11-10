import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { INITIAL_CHALLENGES } from '@/data/tools'

const STORAGE_KEY = 'devstart_completed_challenges'

function loadCompleted(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const useChallengesStore = defineStore('challenges', () => {
  const completedIds = ref<string[]>(loadCompleted())

  watch(completedIds, (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)), {
    deep: true,
  })

  const total = computed(() => INITIAL_CHALLENGES.length)
  const completedCount = computed(() => completedIds.value.length)
  const progress = computed(() =>
    total.value === 0 ? 0 : Math.round((completedCount.value / total.value) * 100),
  )

  function isCompleted(id: string) {
    return completedIds.value.includes(id)
  }

  function toggle(id: string) {
    if (isCompleted(id)) {
      completedIds.value = completedIds.value.filter((c) => c !== id)
    } else {
      completedIds.value = [...completedIds.value, id]
    }
  }

  function complete(id: string) {
    if (!isCompleted(id)) completedIds.value = [...completedIds.value, id]
  }

  function reset() {
    completedIds.value = []
  }

  return { completedIds, total, completedCount, progress, isCompleted, toggle, complete, reset }
})
