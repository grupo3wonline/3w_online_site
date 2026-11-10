<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'
import CodeEditor from '@/components/playground/CodeEditor.vue'
import PreviewPane from '@/components/playground/PreviewPane.vue'
import Console, { type ConsoleLog } from '@/components/playground/Console.vue'
import PhpOutput from '@/components/playground/PhpOutput.vue'
import TemplateLibrary from '@/components/playground/TemplateLibrary.vue'
import ExportMenu from '@/components/playground/ExportMenu.vue'
import HelpButton from '@/components/common/HelpButton.vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'
import type { CodeTemplate } from '@/lib/templates'
import { runPhp } from '@/lib/php-runner'
import { alerts } from '@/lib/alerts'
import { useUiStore } from '@/stores/ui'
import { useHead } from '@/composables/useHead'
import { usePlayground } from '@/composables/usePlayground'

useHead({
  title: 'Editor de Código Online',
  description: 'Editor de código online para HTML, CSS, JavaScript e PHP com preview em tempo real.',
  path: '/playground',
})

const ui = useUiStore()
const { html, css, js, php, savedAt, reset, clearAll, shareUrl } = usePlayground()
const { copy } = useClipboard()

const refreshKey = ref(0)
const logs = ref<ConsoleLog[]>([])
const phpOutput = ref('')
const phpError = ref<string | null>(null)
const isExecutingPhp = ref(false)
const viewport = ref<'mobile' | 'tablet' | 'desktop'>('desktop')
const isFullscreen = ref(false)
const activeTab = ref<'html' | 'css' | 'js' | 'php'>('html')

const savedLabel = computed(() =>
  savedAt.value ? new Date(savedAt.value).toLocaleTimeString('pt-BR') : null,
)

function run() {
  logs.value = []
  refreshKey.value++
  alerts.toast('Código executado!')
}

function onLog(entry: ConsoleLog) {
  logs.value.push(entry)
}

function insertTemplate(tpl: CodeTemplate) {
  if (tpl.html !== undefined) html.value = tpl.html
  if (tpl.css !== undefined) css.value = tpl.css
  if (tpl.js !== undefined) js.value = tpl.js
  refreshKey.value++
}

async function onReset() {
  const res = await alerts.confirm('Restaurar exemplo padrão?', 'Seu código atual será substituído.')
  if (res.isConfirmed) {
    reset()
    refreshKey.value++
    alerts.toast('Exemplo restaurado')
  }
}

async function onClear() {
  const res = await alerts.confirm('Limpar todo o código?', 'Todos os editores ficarão vazios.')
  if (res.isConfirmed) {
    clearAll()
    refreshKey.value++
    alerts.toast('Editores limpos')
  }
}

async function onShare() {
  const url = shareUrl()
  await copy(url)
  alerts.success('Link copiado!', 'Compartilhe este link para abrir o mesmo código.')
}

async function onCopyActive() {
  const map = { html: html.value, css: css.value, js: js.value, php: php.value }
  await copy(map[activeTab.value])
  alerts.toast(`${activeTab.value.toUpperCase()} copiado!`)
}

async function runPHP() {
  isExecutingPhp.value = true
  phpOutput.value = ''
  phpError.value = null
  try {
    const result = await ui.withLoading(() => runPhp(php.value), 'Executando PHP...')
    phpOutput.value = result.output
    phpError.value = result.error
    if (result.success && !result.error) alerts.toast('PHP executado com sucesso!')
    else if (result.error) alerts.error('Erro na execução do PHP', result.error)
  } finally {
    isExecutingPhp.value = false
  }
}

function handleMessage(e: MessageEvent) {
  if (e.data?.type === 'console') {
    onLog({ type: e.data.level, message: e.data.message, timestamp: e.data.timestamp })
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault()
    run()
  }
  if (e.ctrlKey && e.key.toLowerCase() === 'l') {
    e.preventDefault()
    logs.value = []
  }
  if (e.key === 'Escape' && isFullscreen.value) isFullscreen.value = false
}

const helpContent = `<div style="text-align:left">
<p><strong>Atalhos:</strong></p>
<ul style="text-align:left;margin:8px 0">
<li><b>Ctrl + Enter</b> — Executar o código</li>
<li><b>Ctrl + L</b> — Limpar o console</li>
<li><b>Tab</b> — Indentar no editor</li>
<li><b>Esc</b> — Sair da tela cheia</li>
</ul>
<p>Seu código é salvo automaticamente no navegador. Use "Compartilhar" para gerar um link.</p>
</div>`

const tabs = [
  { key: 'html', label: 'HTML', color: 'text-orange-400' },
  { key: 'css', label: 'CSS', color: 'text-sky-400' },
  { key: 'js', label: 'JS', color: 'text-yellow-400' },
  { key: 'php', label: 'PHP', color: 'text-violet-400' },
] as const

onMounted(() => {
  window.addEventListener('message', handleMessage)
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="flex h-full flex-col bg-background">
    <!-- Barra de ferramentas -->
    <div
      class="flex flex-wrap items-center justify-between gap-2 border-b bg-editor-header px-4 py-3"
    >
      <div class="flex items-center gap-2">
        <Icon icon="lucide:code-2" class="h-6 w-6 text-code-accent" />
        <h1 class="text-lg font-bold text-editor-foreground">Editor</h1>
        <span
          v-if="savedLabel"
          class="hidden items-center gap-1 text-xs text-emerald-400 sm:flex"
          title="Salvo automaticamente"
        >
          <Icon icon="lucide:check-circle-2" class="h-3.5 w-3.5" /> Salvo {{ savedLabel }}
        </span>
        <HelpButton title="Como usar o editor" :content="helpContent" />
      </div>

      <div class="flex flex-wrap items-center gap-1.5">
        <TemplateLibrary @insert="insertTemplate" />
        <BaseTooltip text="Compartilhar link">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-editor-foreground hover:bg-white/10"
            @click="onShare"
          >
            <Icon icon="lucide:share-2" class="h-4 w-4" /><span class="hidden md:inline">Compartilhar</span>
          </button>
        </BaseTooltip>
        <ExportMenu :html="html" :css="css" :js="js" />
        <BaseTooltip text="Restaurar exemplo">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-white/15 p-2 text-editor-foreground hover:bg-white/10"
            aria-label="Restaurar exemplo"
            @click="onReset"
          >
            <Icon icon="lucide:rotate-ccw" class="h-4 w-4" />
          </button>
        </BaseTooltip>
        <BaseTooltip text="Limpar tudo">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-white/15 p-2 text-editor-foreground hover:bg-white/10"
            aria-label="Limpar tudo"
            @click="onClear"
          >
            <Icon icon="lucide:eraser" class="h-4 w-4" />
          </button>
        </BaseTooltip>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg gradient-brand px-4 py-2 text-sm font-semibold text-white shadow"
          @click="run"
        >
          <Icon icon="lucide:play" class="h-4 w-4" /><span class="hidden sm:inline">Executar</span>
        </button>
      </div>
    </div>

    <!-- Área principal -->
    <div class="grid flex-1 grid-rows-2 overflow-hidden">
      <!-- Editores: abas no mobile, grade de 4 no desktop -->
      <div class="flex flex-col overflow-hidden">
        <!-- Abas (mobile/tablet) -->
        <div class="flex items-center gap-1 border-b border-editor-border bg-editor-header px-2 py-1 lg:hidden">
          <button
            v-for="t in tabs"
            :key="t.key"
            type="button"
            class="rounded px-3 py-1.5 text-xs font-semibold uppercase transition-colors"
            :class="activeTab === t.key ? 'gradient-brand text-white' : `${t.color} hover:bg-white/10`"
            @click="activeTab = t.key"
          >
            {{ t.label }}
          </button>
          <button
            type="button"
            class="ml-auto rounded p-1.5 text-editor-foreground/70 hover:bg-white/10"
            aria-label="Copiar código"
            @click="onCopyActive"
          >
            <Icon icon="lucide:copy" class="h-4 w-4" />
          </button>
        </div>

        <!-- Mobile: um editor por vez -->
        <div class="flex-1 overflow-hidden lg:hidden">
          <CodeEditor v-show="activeTab === 'html'" v-model="html" label="HTML" language="html" />
          <CodeEditor v-show="activeTab === 'css'" v-model="css" label="CSS" language="css" />
          <CodeEditor v-show="activeTab === 'js'" v-model="js" label="JavaScript" language="javascript" />
          <div v-show="activeTab === 'php'" class="flex h-full flex-col">
            <CodeEditor v-model="php" label="PHP" language="php" class="flex-1" />
            <div class="border-t border-editor-border bg-editor-header p-2">
              <button
                type="button"
                :disabled="isExecutingPhp"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground disabled:opacity-60"
                @click="runPHP"
              >
                <Icon icon="lucide:play" class="h-3.5 w-3.5" />
                {{ isExecutingPhp ? 'Executando...' : 'Executar PHP' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop: 4 editores lado a lado -->
        <div class="hidden flex-1 grid-cols-4 overflow-hidden lg:grid">
          <CodeEditor v-model="html" label="HTML" language="html" />
          <CodeEditor v-model="css" label="CSS" language="css" />
          <CodeEditor v-model="js" label="JavaScript" language="javascript" />
          <div class="flex flex-col overflow-hidden">
            <CodeEditor v-model="php" label="PHP" language="php" class="flex-1" />
            <div class="border-t border-editor-border bg-editor-header p-2">
              <button
                type="button"
                :disabled="isExecutingPhp"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground disabled:opacity-60"
                @click="runPHP"
              >
                <Icon icon="lucide:play" class="h-3.5 w-3.5" />
                {{ isExecutingPhp ? 'Executando...' : 'Executar PHP' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Saídas -->
      <div class="grid grid-cols-1 overflow-hidden md:grid-cols-3">
        <PreviewPane
          v-model:viewport="viewport"
          :html="html"
          :css="css"
          :js="js"
          :refresh-key="refreshKey"
          @refresh="run"
          @fullscreen="isFullscreen = true"
        />
        <Console :logs="logs" @clear="logs = []" />
        <PhpOutput :output="phpOutput" :error="phpError" :is-executing="isExecutingPhp" />
      </div>
    </div>

    <!-- Preview em tela cheia -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isFullscreen" class="fixed inset-0 z-[95] flex flex-col bg-background">
          <div class="flex items-center justify-between border-b bg-editor-header px-4 py-3">
            <span class="flex items-center gap-2 font-semibold text-editor-foreground">
              <Icon icon="lucide:eye" class="h-5 w-5" /> Preview — Tela cheia
            </span>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent"
              @click="isFullscreen = false"
            >
              <Icon icon="lucide:minimize-2" class="h-4 w-4" /> Sair (Esc)
            </button>
          </div>
          <div class="flex-1 overflow-hidden">
            <PreviewPane
              v-model:viewport="viewport"
              :html="html"
              :css="css"
              :js="js"
              :refresh-key="refreshKey"
              @refresh="run"
              @fullscreen="isFullscreen = false"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
