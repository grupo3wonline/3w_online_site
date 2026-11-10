<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { Icon } from '@iconify/vue'
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'radix-vue'
import { useMagicKeys, whenever } from '@vueuse/core'
import { TOOLS, type ToolMeta } from '@/config/site'
import { Tooltip } from '@/components/ui/tooltip'

const router = useRouter()
const open = ref(false)
const query = ref('')

const fuse = new Fuse(TOOLS, {
  keys: ['title', 'short', 'description', 'keywords'],
  threshold: 0.4,
})

const results = computed<ToolMeta[]>(() => {
  if (!query.value.trim()) return TOOLS
  return fuse.search(query.value).map((r) => r.item)
})

// Atalho Ctrl+K / Cmd+K
const keys = useMagicKeys()
whenever(keys['Ctrl+K'], () => (open.value = true))
whenever(keys['Meta+K'], () => (open.value = true))

watch(open, (v) => {
  if (!v) query.value = ''
})

function go(tool: ToolMeta) {
  open.value = false
  router.push(tool.path)
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <Tooltip text="Buscar ferramentas (Ctrl+K)">
      <DialogTrigger as-child>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Buscar ferramentas"
        >
          <Icon icon="lucide:search" class="h-5 w-5" />
        </button>
      </DialogTrigger>
    </Tooltip>

    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-[130] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0"
      />
      <DialogContent
        class="fixed left-1/2 top-24 z-[140] w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0"
      >
        <DialogTitle class="sr-only">Buscar ferramentas</DialogTitle>
        <DialogDescription class="sr-only">
          Digite para filtrar as ferramentas disponíveis
        </DialogDescription>
        <div class="flex items-center gap-2 border-b px-4">
          <Icon icon="lucide:search" class="h-4 w-4 text-muted-foreground" />
          <input
            v-model="query"
            type="text"
            autocomplete="off"
            placeholder="Buscar ferramentas..."
            class="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Campo de busca"
          />
        </div>
        <ul class="max-h-72 overflow-y-auto p-2">
          <li v-if="!results.length" class="px-3 py-6 text-center text-sm text-muted-foreground">
            Nenhuma ferramenta encontrada.
          </li>
          <li v-for="tool in results" :key="tool.slug">
            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent"
              @click="go(tool)"
            >
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white"
                :class="tool.color"
              >
                <Icon :icon="tool.icon" class="h-4 w-4" />
              </span>
              <span class="min-w-0">
                <span class="block truncate text-sm font-medium">{{ tool.title }}</span>
                <span class="block truncate text-xs text-muted-foreground">{{ tool.short }}</span>
              </span>
            </button>
          </li>
        </ul>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
