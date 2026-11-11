<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

interface FileEntry {
  name: string
  size: number
  rows: number
  cols: number
  data: string[][]
}

const files = ref<FileEntry[]>([])
const consolidated = ref<string[][]>([])
const isProcessing = ref(false)
const notification = ref('')
const headerOption = ref<'first' | 'none'>('first')
const separatorOption = ref<'comma' | 'semicolon' | 'tab'>('comma')
const dragOver = ref(false)

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + 'B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB'
  return (bytes / 1024 / 1024).toFixed(1) + 'MB'
}

function parseCSV(text: string, sep: string): string[][] {
  return text.trim().split('\n').map(row => row.split(sep).map(c => c.trim().replace(/^"|"$/g, '')))
}

async function processFile(file: File): Promise<FileEntry> {
  const sep = separatorOption.value === 'comma' ? ',' : separatorOption.value === 'semicolon' ? ';' : '\t'
  const text = await file.text()
  const data = parseCSV(text, sep)
  return {
    name: file.name,
    size: file.size,
    rows: data.length,
    cols: data[0]?.length || 0,
    data,
  }
}

async function handleFiles(fileList: FileList | null) {
  if (!fileList?.length) return
  isProcessing.value = true
  for (const file of Array.from(fileList)) {
    if (file.name.endsWith('.csv') || file.name.endsWith('.txt') || file.name.endsWith('.tsv')) {
      const entry = await processFile(file)
      if (!files.value.find(f => f.name === entry.name)) files.value.push(entry)
    }
  }
  consolidate()
  isProcessing.value = false
}

function consolidate() {
  if (!files.value.length) { consolidated.value = []; return }
  const rows: string[][] = []
  let headerAdded = false
  for (const file of files.value) {
    for (let i = 0; i < file.data.length; i++) {
      if (i === 0 && headerOption.value === 'first') {
        if (!headerAdded) { rows.push(file.data[0]); headerAdded = true }
        continue
      }
      rows.push(file.data[i])
    }
  }
  consolidated.value = rows
}

function removeFile(name: string) {
  files.value = files.value.filter(f => f.name !== name)
  consolidate()
}

function downloadCSV() {
  if (!consolidated.value.length) return
  const sep = separatorOption.value === 'comma' ? ',' : separatorOption.value === 'semicolon' ? ';' : '\t'
  const content = consolidated.value.map(r => r.map(c => c.includes(sep) || c.includes('"') ? `"${c.replace(/"/g,'""')}"` : c).join(sep)).join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([content], { type: 'text/csv' }))
  a.download = 'consolidado.csv'; a.click()
  URL.revokeObjectURL(a.href)
  toast('Arquivo baixado!')
}

async function copyCSV() {
  const sep = separatorOption.value === 'comma' ? ',' : separatorOption.value === 'semicolon' ? ';' : '\t'
  const content = consolidated.value.map(r => r.join(sep)).join('\n')
  await navigator.clipboard.writeText(content)
  toast('Copiado!')
}

function toast(msg: string) { notification.value = msg; setTimeout(() => { notification.value = '' }, 2000) }

function onDrop(e: DragEvent) {
  dragOver.value = false
  handleFiles(e.dataTransfer?.files || null)
}

const preview = computed(() => consolidated.value.slice(0, 10))
const totalRows = computed(() => consolidated.value.length)
const totalCols = computed(() => consolidated.value[0]?.length || 0)
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-5">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:table-merge-cells" class="text-green-400 w-7 h-7" />
        Excel / CSV Consolidator
      </h1>
      <p class="text-blue-200 text-sm">Consolide múltiplos arquivos CSV em um único arquivo</p>
    </div>

    <!-- Options -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 flex flex-wrap gap-4">
      <div>
        <label class="text-blue-200 text-xs font-medium block mb-1">Separador</label>
        <div class="flex gap-2">
          <button v-for="[v, l] in [['comma',','],['semicolon',';'],['tab','Tab']] as const" :key="v" @click="separatorOption = v"
            :class="['px-3 py-1.5 rounded text-xs font-medium transition-all border', separatorOption === v ? 'bg-green-600 border-green-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/10']">{{ l }}</button>
        </div>
      </div>
      <div>
        <label class="text-blue-200 text-xs font-medium block mb-1">Cabeçalho</label>
        <div class="flex gap-2">
          <button @click="headerOption = 'first'; consolidate()" :class="['px-3 py-1.5 rounded text-xs font-medium transition-all border', headerOption === 'first' ? 'bg-green-600 border-green-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/10']">1ª linha</button>
          <button @click="headerOption = 'none'; consolidate()" :class="['px-3 py-1.5 rounded text-xs font-medium transition-all border', headerOption === 'none' ? 'bg-green-600 border-green-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/10']">Sem cabeçalho</button>
        </div>
      </div>
    </div>

    <!-- Drop zone -->
    <div @dragover.prevent="dragOver = true" @dragleave="dragOver = false" @drop.prevent="onDrop"
      :class="['bg-[#0f1e3c] border-2 border-dashed rounded-xl p-8 text-center transition-all', dragOver ? 'border-green-500 bg-green-900/20' : 'border-white/20']">
      <Icon icon="mdi:file-upload" class="w-12 h-12 text-green-400/50 mx-auto mb-3" />
      <p class="text-white font-semibold mb-1">Arraste arquivos CSV aqui</p>
      <p class="text-blue-200 text-sm mb-4">ou clique para selecionar (CSV, TSV, TXT)</p>
      <label class="cursor-pointer bg-green-700 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-2">
        <Icon icon="mdi:folder-open" class="w-4 h-4" /> Selecionar arquivos
        <input type="file" accept=".csv,.txt,.tsv" multiple class="hidden" @change="e => handleFiles((e.target as HTMLInputElement).files)" />
      </label>
    </div>

    <!-- Files list -->
    <div v-if="files.length" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-2">
      <h2 class="text-white font-semibold flex items-center gap-2 mb-3">
        <Icon icon="mdi:file-multiple" class="text-green-400 w-5 h-5" /> Arquivos carregados ({{ files.length }})
      </h2>
      <div v-for="f in files" :key="f.name" class="flex items-center justify-between bg-[#0a1628] rounded-lg px-3 py-2">
        <div class="flex items-center gap-3">
          <Icon icon="mdi:file-delimited" class="text-green-400 w-5 h-5" />
          <div>
            <p class="text-white text-sm font-medium">{{ f.name }}</p>
            <p class="text-blue-300 text-xs">{{ f.rows }} linhas × {{ f.cols }} colunas · {{ formatSize(f.size) }}</p>
          </div>
        </div>
        <button @click="removeFile(f.name)" class="text-red-400 hover:text-red-300 transition-colors">
          <Icon icon="mdi:trash-can" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Results -->
    <div v-if="consolidated.length" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:table" class="text-green-400 w-5 h-5" />
          Dados Consolidados — {{ totalRows }} linhas × {{ totalCols }} colunas
        </h2>
        <div class="flex gap-2">
          <button @click="copyCSV" class="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
            <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar
          </button>
          <button @click="downloadCSV" class="bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
            <Icon icon="mdi:download" class="w-3.5 h-3.5" /> Baixar CSV
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="bg-green-900/30">
              <th v-for="(h, i) in preview[0]" :key="i" class="text-left text-green-300 px-2 py-1.5 font-semibold border border-white/10">{{ h }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in preview.slice(1)" :key="ri" :class="['border-b border-white/5', ri % 2 === 0 ? 'bg-[#0a1628]' : '']">
              <td v-for="(cell, ci) in row" :key="ci" class="text-blue-200 px-2 py-1 border border-white/5 truncate max-w-32">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="totalRows > 10" class="text-blue-300/50 text-xs mt-2 text-center">Mostrando 10 de {{ totalRows }} linhas</p>
      </div>
    </div>

    <div v-else-if="!files.length" class="bg-[#0f1e3c] border border-white/10 rounded-xl flex items-center justify-center p-10">
      <div class="text-center">
        <Icon icon="mdi:table-merge-cells" class="w-12 h-12 text-green-400/20 mx-auto mb-2" />
        <p class="text-blue-200 text-sm">Adicione arquivos CSV para começar a consolidar</p>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="notification" class="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">{{ notification }}</div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
