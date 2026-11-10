<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Fuse from 'fuse.js'
import { templates, templateCategories, type CodeTemplate } from '@/lib/templates'
import { alerts } from '@/lib/alerts'
import BaseInput from '@/components/ui/BaseInput.vue'

const emit = defineEmits<{ insert: [tpl: CodeTemplate] }>()

const open = ref(false)
const active = ref<(typeof templateCategories)[number]['key']>('cards')
const query = ref('')

const fuse = new Fuse(templates, {
  keys: ['name', 'description', 'category'],
  threshold: 0.4,
})

// Se houver busca, filtra por relevância (Fuse); senão, filtra por categoria ativa.
const visible = computed<CodeTemplate[]>(() => {
  if (query.value.trim()) {
    return fuse.search(query.value.trim()).map((r) => r.item)
  }
  return templates.filter((t) => t.category === active.value)
})

function insert(tpl: CodeTemplate) {
  emit('insert', tpl)
  alerts.toast(`Template "${tpl.name}" inserido!`)
  open.value = false
  query.value = ''
}
</script>

<template>
  <div>
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-medium text-editor-foreground hover:bg-white/10"
      @click="open = true"
    >
      <Icon icon="lucide:library" class="h-4 w-4" />
      <span class="hidden sm:inline">Templates</span>
    </button>

    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="open" class="fixed inset-0 z-[80] flex justify-end" @keydown.esc="open = false">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="open = false" />
          <aside
            class="relative flex h-full w-full max-w-lg flex-col overflow-hidden bg-background shadow-2xl"
            role="dialog"
            aria-label="Biblioteca de templates"
          >
            <header class="flex items-center justify-between border-b p-5">
              <div>
                <h2 class="text-lg font-bold">Biblioteca de Templates</h2>
                <p class="text-sm text-muted-foreground">Comece rápido com um modelo pronto</p>
              </div>
              <button
                type="button"
                aria-label="Fechar"
                class="rounded p-1 hover:bg-accent"
                @click="open = false"
              >
                <Icon icon="lucide:x" class="h-5 w-5" />
              </button>
            </header>

            <!-- Busca -->
            <div class="border-b p-3">
              <BaseInput
                v-model="query"
                icon="lucide:search"
                placeholder="Buscar templates..."
                aria-label="Buscar templates"
              />
            </div>

            <!-- Categorias (ocultas durante a busca) -->
            <div v-if="!query.trim()" class="flex flex-wrap gap-1 border-b p-2">
              <button
                v-for="cat in templateCategories"
                :key="cat.key"
                type="button"
                class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
                :class="active === cat.key ? 'gradient-brand text-white' : 'hover:bg-accent'"
                @click="active = cat.key"
              >
                {{ cat.label }}
              </button>
            </div>

            <div class="flex-1 overflow-auto p-4">
              <p v-if="!visible.length" class="py-8 text-center text-sm text-muted-foreground">
                Nenhum template encontrado para "{{ query }}".
              </p>
              <div
                v-for="tpl in visible"
                :key="tpl.id"
                class="mb-3 rounded-xl border p-4 transition-colors hover:border-primary"
              >
                <div class="mb-1 flex items-center gap-2">
                  <h3 class="font-semibold">{{ tpl.name }}</h3>
                  <span class="rounded bg-muted px-2 py-0.5 text-[10px] uppercase text-muted-foreground">
                    {{ tpl.category }}
                  </span>
                </div>
                <p class="mb-3 text-sm text-muted-foreground">{{ tpl.description }}</p>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-lg gradient-brand px-3 py-1.5 text-sm font-medium text-white"
                  @click="insert(tpl)"
                >
                  <Icon icon="lucide:plus" class="h-4 w-4" /> Inserir Template
                </button>
              </div>
            </div>
          </aside>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
</style>
