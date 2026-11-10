<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type SepType = 'newline' | 'comma' | 'space' | 'dash' | 'custom'
type TransformType = 'alphabetic' | 'numeric-asc' | 'numeric-desc' | 'reverse' | 'shuffle' | 'remove-duplicates'

const inputText = ref('')
const outputText = ref('')
const inputSep = ref<SepType>('newline')
const outputSep = ref<SepType>('newline')
const customInputSep = ref('')
const customOutputSep = ref('')
const itemCount = ref(0)
const fileInput = ref<HTMLInputElement | null>(null)

function getSep(type: SepType, custom: string) {
  return type === 'newline' ? '\n' : type === 'comma' ? ',' : type === 'space' ? ' ' : type === 'dash' ? '-' : custom
}

function parseItems(text: string) {
  if (!text.trim()) return []
  const sep = getSep(inputSep.value, customInputSep.value)
  return text.split(sep).map(s => s.trim()).filter(Boolean)
}

const detectedCount = computed(() => parseItems(inputText.value).length)

function transform(type: TransformType) {
  const items = parseItems(inputText.value)
  if (!items.length) {
    Swal.fire({ icon: 'warning', title: 'Lista vazia!', text: 'Cole itens no campo de entrada.', confirmButtonColor: '#3b82f6' })
    return
  }

  let result: string[]
  switch (type) {
    case 'alphabetic':
      result = [...items].sort((a, b) => a.localeCompare(b, 'pt-BR'))
      break
    case 'numeric-asc':
      result = [...items].sort((a, b) => {
        const na = parseFloat(a), nb = parseFloat(b)
        if (isNaN(na) && isNaN(nb)) return a.localeCompare(b, 'pt-BR')
        if (isNaN(na)) return 1; if (isNaN(nb)) return -1
        return na - nb
      })
      break
    case 'numeric-desc':
      result = [...items].sort((a, b) => {
        const na = parseFloat(a), nb = parseFloat(b)
        if (isNaN(na) && isNaN(nb)) return b.localeCompare(a, 'pt-BR')
        if (isNaN(na)) return 1; if (isNaN(nb)) return -1
        return nb - na
      })
      break
    case 'reverse':
      result = [...items].reverse()
      break
    case 'shuffle':
      result = [...items]
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
      }
      break
    case 'remove-duplicates':
      result = [...new Set(items)]
      break
    default:
      result = items
  }

  const outSep = getSep(outputSep.value, customOutputSep.value)
  outputText.value = result.join(outputSep.value === 'newline' ? '\n' : outSep)
  itemCount.value = result.length
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 })
    .fire({ icon: 'success', title: `${result.length} itens processados!` })
}

async function copyOutput() {
  if (!outputText.value) {
    Swal.fire({ icon: 'warning', title: 'Nada para copiar!', confirmButtonColor: '#3b82f6' }); return
  }
  await navigator.clipboard.writeText(outputText.value)
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1400 })
    .fire({ icon: 'success', title: 'Lista copiada!' })
}

async function pasteFromClipboard() {
  try {
    inputText.value = await navigator.clipboard.readText()
    Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1400 })
      .fire({ icon: 'success', title: 'Colado!' })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao colar', confirmButtonColor: '#3b82f6' })
  }
}

function downloadOutput() {
  if (!outputText.value) {
    Swal.fire({ icon: 'warning', title: 'Nada para exportar!', confirmButtonColor: '#3b82f6' }); return
  }
  const blob = new Blob([outputText.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `lista-${new Date().toISOString().split('T')[0]}.txt`; a.click()
  URL.revokeObjectURL(url)
}

function handleFile(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  if (f.size > 10 * 1024 * 1024) {
    Swal.fire({ icon: 'error', title: 'Arquivo muito grande (máx. 10MB)', confirmButtonColor: '#3b82f6' }); return
  }
  const reader = new FileReader()
  reader.onload = ev => { inputText.value = String(ev.target?.result || '') }
  reader.readAsText(f)
}

function clearAll() {
  inputText.value = ''
  outputText.value = ''
  itemCount.value = 0
}

const transformButtons: { type: TransformType; label: string; icon: string }[] = [
  { type: 'alphabetic', label: 'Alfabética', icon: 'mdi:sort-alphabetical-ascending' },
  { type: 'numeric-asc', label: 'Numérica ↑', icon: 'mdi:sort-numeric-ascending' },
  { type: 'numeric-desc', label: 'Numérica ↓', icon: 'mdi:sort-numeric-descending' },
  { type: 'reverse', label: 'Inverter', icon: 'mdi:rotate-right' },
  { type: 'shuffle', label: 'Embaralhar', icon: 'mdi:shuffle-variant' },
  { type: 'remove-duplicates', label: 'Sem Duplicatas', icon: 'mdi:filter-remove-outline' },
]

const sepOptions: { value: SepType; label: string }[] = [
  { value: 'newline', label: 'Quebra de linha' },
  { value: 'comma', label: 'Vírgula (,)' },
  { value: 'space', label: 'Espaço' },
  { value: 'dash', label: 'Traço (-)' },
  { value: 'custom', label: 'Personalizado' },
]
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:format-list-checks" class="text-blue-400 w-7 h-7" />
        Manipulador de Listas
      </h1>
      <p class="text-blue-200 text-sm">Ordene, filtre, inverta e processe suas listas com facilidade</p>
    </div>

    <!-- Input / Output -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Input -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:import" class="text-blue-400 w-5 h-5" />
          Entrada de Dados
        </h2>

        <div class="flex gap-2">
          <button @click="fileInput?.click()"
            class="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-xs transition-colors">
            <Icon icon="mdi:upload-outline" class="w-3.5 h-3.5" />
            Arquivo
          </button>
          <button @click="pasteFromClipboard"
            class="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-xs transition-colors">
            <Icon icon="mdi:content-paste" class="w-3.5 h-3.5" />
            Colar
          </button>
        </div>
        <input ref="fileInput" type="file" accept=".txt,.csv,.json" class="hidden" @change="handleFile" />

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs text-blue-200">Separador de Entrada</label>
            <select v-model="inputSep"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option v-for="o in sepOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
          </div>
          <div v-if="inputSep === 'custom'" class="space-y-1">
            <label class="text-xs text-blue-200">Separador customizado</label>
            <input v-model="customInputSep" placeholder="Ex: |"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none" />
          </div>
        </div>

        <textarea
          v-model="inputText"
          rows="8"
          placeholder="Cole ou digite sua lista aqui..."
          class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg p-3 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        ></textarea>

        <div class="flex justify-between items-center text-xs text-blue-300">
          <span>{{ detectedCount }} itens detectados</span>
          <button @click="clearAll" class="flex items-center gap-1 hover:text-red-400 transition-colors">
            <Icon icon="mdi:trash-can-outline" class="w-3.5 h-3.5" />
            Limpar
          </button>
        </div>
      </div>

      <!-- Output -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:export" class="text-blue-400 w-5 h-5" />
          Resultado
        </h2>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs text-blue-200">Separador de Saída</label>
            <select v-model="outputSep"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option v-for="o in sepOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
          </div>
          <div v-if="outputSep === 'custom'" class="space-y-1">
            <label class="text-xs text-blue-200">Separador customizado</label>
            <input v-model="customOutputSep" placeholder="Ex: |"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none" />
          </div>
        </div>

        <textarea
          :value="outputText"
          readonly
          rows="8"
          placeholder="O resultado aparecerá aqui..."
          class="w-full bg-[#0a1628]/60 text-blue-200 placeholder-blue-300/40 border border-white/10 rounded-lg p-3 text-sm font-mono resize-y focus:outline-none"
        ></textarea>

        <div class="flex justify-between items-center">
          <span class="text-xs text-blue-300">{{ itemCount > 0 ? itemCount + ' itens processados' : '' }}</span>
          <div class="flex gap-2">
            <button @click="copyOutput"
              class="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-xs transition-colors">
              <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" />
              Copiar
            </button>
            <button @click="downloadOutput"
              class="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-xs transition-colors">
              <Icon icon="mdi:download-outline" class="w-3.5 h-3.5" />
              Baixar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Transformations -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
      <h2 class="text-white font-semibold">Transformações</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button v-for="btn in transformButtons" :key="btn.type"
          @click="transform(btn.type)"
          class="flex flex-col items-center gap-2 py-4 bg-white/5 hover:bg-blue-600/20 hover:border-blue-500/30 text-blue-300 hover:text-white border border-white/10 rounded-xl transition-all text-xs font-medium">
          <Icon :icon="btn.icon" class="w-6 h-6" />
          {{ btn.label }}
        </button>
      </div>
    </div>
  </div>
</template>
