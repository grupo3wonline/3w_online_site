<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, shallowRef } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface TextFilters {
  ignoreSpaces: boolean
  ignorePunctuation: boolean
  ignoreNumbers: boolean
}

interface TextAnalysis {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  lines: number
  readingTimeMinutes: number
  avgWordsPerSentence: number
}

const DEFAULT_FILTERS: TextFilters = {
  ignoreSpaces: false,
  ignorePunctuation: false,
  ignoreNumbers: false,
}

const textA = ref('')
const textB = ref('')
const filtersA = ref<TextFilters>({ ...DEFAULT_FILTERS })
const filtersB = ref<TextFilters>({ ...DEFAULT_FILTERS })
const analysisA = shallowRef<TextAnalysis | null>(null)
const analysisB = shallowRef<TextAnalysis | null>(null)
const searchQuery = ref('')
const searchTarget = ref<'A' | 'B'>('A')
const fileInputA = ref<HTMLInputElement | null>(null)
const fileInputB = ref<HTMLInputElement | null>(null)

function applyFilters(text: string, f: TextFilters): string {
  let t = text
  if (f.ignoreSpaces) t = t.replace(/\s/g, '')
  if (f.ignorePunctuation) t = t.replace(/[^\w\sÀ-ÿ]/g, '')
  if (f.ignoreNumbers) t = t.replace(/\d/g, '')
  return t
}

function analyzeText(raw: string, filters: TextFilters): TextAnalysis {
  const processed = applyFilters(raw, filters)
  const trimmed = processed.trim()
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0
  const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(p => p.trim()).length : 0
  const lines = raw ? raw.split(/\n/).length : 0
  return {
    characters: processed.length,
    charactersNoSpaces: processed.replace(/\s/g, '').length,
    words,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes: words > 0 ? Math.max(1, Math.ceil(words / 200)) : 0,
    avgWordsPerSentence: sentences > 0 ? Math.round((words / sentences) * 10) / 10 : 0,
  }
}

function analyze(which: 'A' | 'B') {
  const text = which === 'A' ? textA.value : textB.value
  if (!text.trim()) {
    Swal.fire({ icon: 'warning', title: `Texto ${which} vazio`, text: 'Digite ou cole algum texto.', confirmButtonColor: '#3b82f6' })
    return
  }
  const result = analyzeText(text, which === 'A' ? filtersA.value : filtersB.value)
  if (which === 'A') analysisA.value = result
  else analysisB.value = result
  Swal.fire({ icon: 'success', title: 'Análise concluída', text: `Texto ${which} analisado com sucesso.`, timer: 1400, showConfirmButton: false })
}

function clearText(which: 'A' | 'B') {
  if (which === 'A') { textA.value = ''; analysisA.value = null }
  else { textB.value = ''; analysisB.value = null }
}

async function copyText(which: 'A' | 'B') {
  const text = which === 'A' ? textA.value : textB.value
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1200, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao copiar' })
  }
}

function handleFile(e: Event, which: 'A' | 'B') {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (!file.name.endsWith('.txt') && file.type !== 'text/plain') {
    Swal.fire({ icon: 'error', title: 'Arquivo inválido', text: 'Apenas arquivos .txt são aceitos.' })
    return
  }
  const reader = new FileReader()
  reader.onload = (ev) => {
    const content = String(ev.target?.result ?? '')
    if (which === 'A') textA.value = content
    else textB.value = content
  }
  reader.readAsText(file, 'UTF-8')
  ;(e.target as HTMLInputElement).value = ''
}

const searchResults = computed(() => {
  const source = searchTarget.value === 'A' ? textA.value : textB.value
  const q = searchQuery.value.trim().toLowerCase()
  if (!q || !source) return []
  const words = source.split(/\s+/)
  return words
    .map((w, i) => ({ word: w, index: i }))
    .filter(({ word }) => word.toLowerCase().includes(q))
    .slice(0, 30)
})

const metricLabels: Record<keyof TextAnalysis, string> = {
  characters: 'Caracteres', charactersNoSpaces: 'Sem espaços', words: 'Palavras',
  sentences: 'Sentenças', paragraphs: 'Parágrafos', lines: 'Linhas',
  readingTimeMinutes: 'Leitura (min)', avgWordsPerSentence: 'Palavras/frase',
}

function fmt(key: keyof TextAnalysis, val: number): string {
  if (key === 'readingTimeMinutes') return `${val} min`
  return val.toLocaleString('pt-BR')
}
</script>

<template>
    <ToolShell

      title="Analisador de Texto"

      description="Analise palavras, frequência, legibilidade e tempo de leitura de qualquer texto."

      icon="fa-text-search"

      icon-gradient="from-indigo-500 to-blue-700"

      orb-color="indigo"

      :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

      :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

    >

  <div class="max-w-6xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:file-chart-outline" class="text-blue-400 w-7 h-7" />
        Analisador de Texto
      </h1>
      <p class="text-blue-200 text-sm">Analise e compare dois textos com métricas detalhadas</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <div v-for="side in ['A', 'B'] as const" :key="side"
        class="glass-panel p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-white font-semibold flex items-center gap-2">
            <Icon icon="mdi:text-box-outline" class="text-blue-400 w-5 h-5" />
            Texto {{ side }}
          </h2>
          <div class="flex gap-1">
            <button @click="side === 'A' ? fileInputA?.click() : fileInputB?.click()"
              class="p-1.5 text-blue-300 hover:text-white hover:bg-white/10 rounded transition-colors" title="Upload .txt">
              <Icon icon="mdi:file-upload-outline" class="w-4 h-4" />
            </button>
            <button @click="copyText(side)"
              class="p-1.5 text-blue-300 hover:text-white hover:bg-white/10 rounded transition-colors" title="Copiar">
              <Icon icon="mdi:content-copy" class="w-4 h-4" />
            </button>
            <button @click="clearText(side)"
              class="p-1.5 text-red-400 hover:text-white hover:bg-red-500/20 rounded transition-colors" title="Limpar">
              <Icon icon="mdi:trash-can-outline" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <textarea
          :value="side === 'A' ? textA : textB"
          @input="side === 'A' ? (textA = ($event.target as HTMLTextAreaElement).value) : (textB = ($event.target as HTMLTextAreaElement).value)"
          rows="7"
          placeholder="Digite, cole ou importe um arquivo .txt..."
          class="w-full input-aurora font-mono resize-y"
        ></textarea>

        <div class="flex flex-wrap gap-3 text-xs text-blue-200">
          <label v-for="(label, key) in { ignoreSpaces: 'Ignorar espaços', ignorePunctuation: 'Ignorar pontuação', ignoreNumbers: 'Ignorar números' }"
            :key="key" class="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox"
              :checked="(side === 'A' ? filtersA : filtersB)[key as keyof TextFilters]"
              @change="(side === 'A' ? filtersA : filtersB)[key as keyof TextFilters] = ($event.target as HTMLInputElement).checked"
              class="rounded border-white/20 bg-transparent text-blue-500 focus:ring-blue-500 w-3.5 h-3.5" />
            {{ label }}
          </label>
        </div>

        <button @click="analyze(side)"
          class="btn-aurora w-full">
          <Icon icon="mdi:chart-bar" class="w-4 h-4" />
          Analisar Texto {{ side }}
        </button>

        <transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0">
          <div v-if="side === 'A' ? analysisA : analysisB"
            class="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
            <h3 class="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">Resultados</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div v-for="(label, key) in metricLabels" :key="key" class="text-center">
                <div class="text-white font-bold text-sm">
                  {{ fmt(key as keyof TextAnalysis, (side === 'A' ? analysisA : analysisB)![key as keyof TextAnalysis]) }}
                </div>
                <div class="text-blue-300 text-xs">{{ label }}</div>
              </div>
            </div>
          </div>
        </transition>

        <input :ref="side === 'A' ? (el) => { fileInputA = el as HTMLInputElement } : (el) => { fileInputB = el as HTMLInputElement }"
          type="file" accept=".txt,text/plain" class="hidden" @change="handleFile($event, side)" />
      </div>
    </div>

    <!-- Busca fuzzy -->

      <h3 class="text-white font-semibold flex items-center gap-2">
        <Icon icon="mdi:magnify" class="text-blue-400 w-5 h-5" />
        Busca de Termos
      </h3>
      <div class="flex flex-col sm:flex-row gap-3">
        <select v-model="searchTarget"
          class="input-aurora">
          <option value="A">Texto A</option>
          <option value="B">Texto B</option>
        </select>
        <input v-model="searchQuery" type="search" placeholder="Buscar palavra ou trecho..."
          class="flex-1 input-aurora" />
      </div>
      <div v-if="searchQuery.trim()">
        <p v-if="searchResults.length === 0" class="text-blue-300 text-sm">Nenhum resultado encontrado.</p>
        <div v-else class="flex flex-wrap gap-2">
          <span v-for="(r, i) in searchResults" :key="i"
            class="bg-blue-600/20 text-blue-300 border border-blue-500/20 text-xs px-2 py-0.5 rounded-full">
            {{ r.word }}
          </span>
        </div>
      </div>
    </div>
  


    </ToolShell></template>