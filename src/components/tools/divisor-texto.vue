<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface TextBlock {
  id: number
  content: string
  wordCount: number
  charCount: number
}

const inputText = ref('')
const blockSize = ref(200)
const blocks = ref<TextBlock[]>([])
const isProcessing = ref(false)

const MAX_WORDS = 900

const inputStats = computed(() => {
  const t = inputText.value.trim()
  return {
    chars: inputText.value.length,
    words: t ? t.split(/\s+/).length : 0,
    sentences: t ? (t.match(/[.!?]+/g) || []).length : 0,
  }
})

function splitText() {
  if (!inputText.value.trim()) {
    Swal.fire({ icon: 'warning', title: 'Texto vazio!', text: 'Cole um texto para dividir.', confirmButtonColor: '#3b82f6' })
    return
  }
  isProcessing.value = true
  setTimeout(() => {
    const maxWords = Math.min(blockSize.value, MAX_WORDS)
    const sentences = inputText.value.match(/[^.!?]+[.!?]+/g) || [inputText.value]
    const result: TextBlock[] = []
    let currentBlock = ''
    let currentWords = 0
    let id = 1

    for (const sentence of sentences) {
      const sentenceWords = sentence.trim().split(/\s+/).length
      if (currentBlock && currentWords + sentenceWords > maxWords) {
        const trimmed = currentBlock.trim()
        result.push({ id: id++, content: trimmed, wordCount: trimmed.split(/\s+/).length, charCount: trimmed.length })
        currentBlock = sentence
        currentWords = sentenceWords
      } else {
        currentBlock += sentence
        currentWords += sentenceWords
      }
    }
    if (currentBlock.trim()) {
      const trimmed = currentBlock.trim()
      result.push({ id: id++, content: trimmed, wordCount: trimmed.split(/\s+/).length, charCount: trimmed.length })
    }

    blocks.value = result
    isProcessing.value = false
    Swal.fire({ icon: 'success', title: `Texto dividido em ${result.length} bloco(s)!`, timer: 1500, showConfirmButton: false })
  }, 50)
}

async function copyBlock(block: TextBlock) {
  await navigator.clipboard.writeText(block.content)
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1400 })
    .fire({ icon: 'success', title: `Bloco ${block.id} copiado!` })
}

async function copyAll() {
  const all = blocks.value.map(b => b.content).join('\n\n')
  await navigator.clipboard.writeText(all)
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1400 })
    .fire({ icon: 'success', title: 'Todos os blocos copiados!' })
}

function downloadAll() {
  const all = blocks.value.map((b, i) => `=== Bloco ${i+1} ===\n${b.content}`).join('\n\n')
  const blob = new Blob([all], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'texto-dividido.txt'; a.click()
  URL.revokeObjectURL(url)
}

function clearAll() {
  inputText.value = ''
  blocks.value = []
}
</script>

<template>
  <ToolShell

    title="Divisor de Texto"

    description="Divida textos longos em partes iguais, por delimitador ou por número de linhas."

    icon="fa-scissors"

    icon-gradient="from-cyan-500 to-blue-700"

    orb-color="blue"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:scissors-cutting" class="text-blue-400 w-7 h-7" />
        Divisor de Texto
      </h1>
      <p class="text-blue-200 text-sm">Divida textos longos em blocos por quantidade de palavras</p>
    </div>

    <!-- Input -->
    <div class="glass-panel p-5 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:text-box-outline" class="text-blue-400 w-5 h-5" />
          Texto de Entrada
        </h2>
        <div class="text-xs text-blue-300">
          {{ inputStats.chars }} chars · {{ inputStats.words }} palavras · {{ inputStats.sentences }} sentenças
        </div>
      </div>

      <textarea
        v-model="inputText"
        rows="8"
        placeholder="Cole aqui o texto que deseja dividir em blocos..."
        class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg p-3 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      ></textarea>

      <div class="flex flex-col sm:flex-row gap-4 items-end">
        <div class="flex-1 space-y-1">
          <label class="text-sm text-blue-200">
            Palavras por bloco (máx. {{ MAX_WORDS }})
          </label>
          <input
            v-model.number="blockSize"
            type="number"
            :min="10"
            :max="MAX_WORDS"
            class="w-full input-aurora"
          />
        </div>

        <div class="flex gap-2">
          <button @click="splitText" :disabled="isProcessing"
            class="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm">
            <Icon :icon="isProcessing ? 'mdi:loading' : 'mdi:scissors-cutting'" :class="isProcessing ? 'animate-spin' : ''" class="w-4 h-4" />
            Dividir Texto
          </button>
          <button @click="clearAll"
            class="bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 px-4 py-2.5 rounded-lg transition-colors text-sm">
            <Icon icon="mdi:trash-can-outline" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Results header -->
    <div v-if="blocks.length" class="flex items-center justify-between">
      <h2 class="text-white font-semibold flex items-center gap-2">
        <Icon icon="mdi:layers-outline" class="text-blue-400 w-5 h-5" />
        {{ blocks.length }} Bloco(s) gerado(s)
      </h2>
      <div class="flex gap-2">
        <button @click="copyAll"
          class="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-xs transition-colors">
          <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" />
          Copiar Tudo
        </button>
        <button @click="downloadAll"
          class="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-xs transition-colors">
          <Icon icon="mdi:download-outline" class="w-3.5 h-3.5" />
          Baixar .TXT
        </button>
      </div>
    </div>

    <!-- Blocks -->
    <div class="space-y-4">
      <div v-for="block in blocks" :key="block.id"
        class="glass-panel p-4 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-blue-400 text-sm font-semibold">Bloco {{ block.id }}</span>
          <div class="flex items-center gap-3">
            <span class="text-xs text-blue-300">{{ block.wordCount }} palavras · {{ block.charCount }} chars</span>
            <button @click="copyBlock(block)"
              class="p-1.5 text-blue-300 hover:text-white hover:bg-white/10 rounded transition-colors">
              <Icon icon="mdi:content-copy" class="w-4 h-4" />
            </button>
          </div>
        </div>
        <p class="text-blue-100 text-sm leading-relaxed bg-[#0a1628] rounded-lg p-3 font-mono whitespace-pre-wrap">{{ block.content }}</p>
      </div>
    </div>
  


  </ToolShell></template>