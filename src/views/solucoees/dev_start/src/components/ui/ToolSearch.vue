<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { onKeyStroke, useMagicKeys, whenever } from '@vueuse/core'
import Fuse from 'fuse.js'
import { TOOLS } from '@/data/tools'

const router = useRouter()
const open = ref(false)
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const fuse = new Fuse(TOOLS, {
  keys: ['title', 'short', 'description'],
  threshold: 0.4,
})

const results = computed(() => {
  if (!query.value.trim()) return TOOLS
  return fuse.search(query.value).map((r) => r.item)
})

watch(results, () => {
  activeIndex.value = 0
})

function show() {
  open.value = true
  query.value = ''
  activeIndex.value = 0
  nextTick(() => inputRef.value?.focus())
}

function hide() {
  open.value = false
}

function go(route: string) {
  hide()
  router.push(route)
}

// Atalho Ctrl/Cmd + K abre a busca
const keys = useMagicKeys()
whenever(keys['Ctrl+K'], show)
whenever(keys['Meta+K'], show)

onKeyStroke('Escape', () => {
  if (open.value) hide()
})

onKeyStroke('ArrowDown', (e) => {
  if (!open.value) return
  e.preventDefault()
  activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1)
})

onKeyStroke('ArrowUp', (e) => {
  if (!open.value) return
  e.preventDefault()
  activeIndex.value = Math.max(activeIndex.value - 1, 0)
})

onKeyStroke('Enter', (e) => {
  if (!open.value) return
  const item = results.value[activeIndex.value]
  if (item) {
    e.preventDefault()
    go(item.route)
  }
})

defineExpose({ show })
</script>

<template>
  <button
    type="button"
    class="btn-ghost hidden h-10 items-center gap-2 rounded-full px-3 text-sm text-slate-500 sm:inline-flex dark:text-slate-400"
    aria-label="Buscar ferramentas"
    @click="show"
  >
    <Icon
      icon="lucide:search"
      class="h-4 w-4"
    />
    <span class="hidden lg:inline">Buscar</span>
    <kbd class="hidden rounded border border-slate-300 px-1.5 text-[10px] lg:inline dark:border-slate-600">
      Ctrl K
    </kbd>
  </button>

  <button
    type="button"
    class="btn-ghost h-10 w-10 rounded-full p-0 sm:hidden"
    aria-label="Buscar ferramentas"
    @click="show"
  >
    <Icon
      icon="lucide:search"
      class="h-5 w-5"
    />
  </button>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[9995] flex items-start justify-center bg-slate-900/50 p-4 pt-[10vh] backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Buscar ferramentas"
        @click.self="hide"
      >
        <div class="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-800">
          <div class="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-700">
            <Icon
              icon="lucide:search"
              class="h-5 w-5 text-slate-400"
            />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              autocomplete="off"
              placeholder="Buscar ferramentas..."
              class="w-full bg-transparent py-4 text-slate-800 outline-none dark:text-slate-100"
            >
            <button
              type="button"
              class="text-slate-400 hover:text-slate-600"
              aria-label="Fechar"
              @click="hide"
            >
              <Icon
                icon="lucide:x"
                class="h-5 w-5"
              />
            </button>
          </div>
          <ul class="max-h-80 overflow-y-auto p-2">
            <li
              v-if="results.length === 0"
              class="px-4 py-6 text-center text-sm text-slate-400"
            >
              Nenhuma ferramenta encontrada.
            </li>
            <li
              v-for="(tool, i) in results"
              :key="tool.id"
            >
              <button
                type="button"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition"
                :class="i === activeIndex ? 'bg-brand-50 dark:bg-slate-700' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'"
                @click="go(tool.route)"
                @mouseenter="activeIndex = i"
              >
                <Icon
                  :icon="tool.icon"
                  class="h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400"
                />
                <span class="flex-1">
                  <span class="block text-sm font-semibold text-slate-800 dark:text-slate-100">{{ tool.title }}</span>
                  <span class="block text-xs text-slate-500 dark:text-slate-400">{{ tool.short }}</span>
                </span>
                <Icon
                  icon="lucide:corner-down-left"
                  class="h-4 w-4 text-slate-300"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
