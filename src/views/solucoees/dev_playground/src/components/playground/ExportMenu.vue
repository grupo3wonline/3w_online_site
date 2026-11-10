<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'
import { alerts } from '@/lib/alerts'

const props = defineProps<{ html: string; css: string; js: string }>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
onClickOutside(root, () => (open.value = false))

function download(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function exportComplete() {
  const doc = `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Projeto Exportado</title>
<style>
${props.css}
</style></head>
<body>
${props.html}
<script>
${props.js}
<\/script>
</body></html>`
  download(doc, 'projeto-completo.html', 'text/html')
  alerts.toast('Projeto exportado como HTML completo')
  open.value = false
}

function exportSeparate() {
  download(props.html, 'index.html', 'text/html')
  download(props.css, 'styles.css', 'text/css')
  download(props.js, 'script.js', 'text/javascript')
  alerts.toast('Arquivos exportados separadamente')
  open.value = false
}
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-medium text-editor-foreground hover:bg-white/10"
      @click="open = !open"
    >
      <Icon icon="lucide:download" class="h-4 w-4" />
      <span class="hidden sm:inline">Exportar</span>
    </button>
    <Transition name="menu">
      <div
        v-if="open"
        class="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-popover shadow-lg"
      >
        <button
          type="button"
          class="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-accent"
          @click="exportComplete"
        >
          <Icon icon="lucide:file-code" class="h-4 w-4" /> HTML Completo
        </button>
        <button
          type="button"
          class="flex w-full items-center gap-2 border-t border-border px-4 py-2.5 text-left text-sm hover:bg-accent"
          @click="exportSeparate"
        >
          <Icon icon="lucide:files" class="h-4 w-4" /> Arquivos Separados
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
