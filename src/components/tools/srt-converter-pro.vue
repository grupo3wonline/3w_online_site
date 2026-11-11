<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const scriptText = ref('')
const outputFilename = ref('legendas')
const isLoading = ref(false)
const notification = ref('')
const maxChars = ref(500)
const blockDuration = ref(30)
const intervalBetweenBlocks = ref(0.5)

interface SRTBlock {
  index: number
  start: string
  end: string
  text: string
}

const result = ref<{ blocks: SRTBlock[]; srtContent: string } | null>(null)

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const ms = Math.round((seconds % 1) * 1000)
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')},${String(ms).padStart(3,'0')}`
}

function convertToSRT(text: string): { blocks: SRTBlock[]; srtContent: string } {
  const lines = text.trim().split('\n').filter(l => l.trim())
  const blocks: SRTBlock[] = []
  let currentBlock = ''
  let currentTime = 0
  let index = 1

  for (const line of lines) {
    if ((currentBlock + ' ' + line).trim().length <= maxChars.value) {
      currentBlock = (currentBlock + ' ' + line).trim()
    } else {
      if (currentBlock) {
        const dur = blockDuration.value
        blocks.push({
          index,
          start: formatTime(currentTime),
          end: formatTime(currentTime + dur),
          text: currentBlock,
        })
        currentTime += dur + intervalBetweenBlocks.value
        index++
      }
      currentBlock = line.trim()
    }
  }

  // Last block
  if (currentBlock) {
    const dur = blockDuration.value
    blocks.push({
      index,
      start: formatTime(currentTime),
      end: formatTime(currentTime + dur),
      text: currentBlock,
    })
  }

  const srtContent = blocks.map(b => `${b.index}\n${b.start} --> ${b.end}\n${b.text}\n`).join('\n')
  return { blocks, srtContent }
}

async function convert() {
  if (!scriptText.value.trim()) return
  if (outputFilename.value && !/^[a-zA-Z0-9_-]+$/.test(outputFilename.value)) {
    notification.value = 'Nome de arquivo inválido. Use letras, números, - e _'
    setTimeout(() => { notification.value = '' }, 2500)
    return
  }

  isLoading.value = true
  await new Promise(r => setTimeout(r, 500))
  result.value = convertToSRT(scriptText.value)
  isLoading.value = false
  toast(`${result.value.blocks.length} blocos gerados!`)
}

function downloadSRT() {
  if (!result.value) return
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([result.value.srtContent], { type: 'text/plain' }))
  a.download = `${outputFilename.value || 'legendas'}.srt`
  a.click()
  URL.revokeObjectURL(a.href)
  toast('Arquivo SRT baixado!')
}

async function copyResult() {
  if (!result.value) return
  await navigator.clipboard.writeText(result.value.srtContent)
  toast('SRT copiado!')
}

function clear() { scriptText.value = ''; result.value = null }

function toast(msg: string) { notification.value = msg; setTimeout(() => { notification.value = '' }, 2500) }

const charCount = computed(() => scriptText.value.length)
const previewBlocks = computed(() => result.value?.blocks.slice(0, 5) || [])
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-5">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:subtitles" class="text-violet-400 w-7 h-7" />
        SRT Converter Pro
      </h1>
      <p class="text-blue-200 text-sm">Converta roteiros em arquivos de legenda SRT profissionais</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-5">
      <!-- Input -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:text" class="text-violet-400 w-5 h-5" /> Roteiro</h2>
          <button @click="() => {}/* showHelp */" class="text-blue-300 hover:text-white text-sm">Como usar</button>
        </div>
        <textarea v-model="scriptText" rows="12" spellcheck="false"
          placeholder="Cole o texto do seu vídeo aqui. Cada linha ou parágrafo será uma legenda.&#10;&#10;Exemplo:&#10;Olá a todos! Bem-vindos ao nosso canal.&#10;Hoje vamos falar sobre desenvolvimento web.&#10;Vamos começar com os conceitos básicos..."
          class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 leading-relaxed" />
        <div class="flex items-center justify-between text-xs text-blue-300/50">
          <span>{{ charCount }} caracteres</span>
          <button v-if="scriptText" @click="clear" class="text-red-400 hover:text-red-300 flex items-center gap-1">
            <Icon icon="mdi:trash-can" class="w-3.5 h-3.5" /> Limpar
          </button>
        </div>
      </div>

      <!-- Config + result -->
      <div class="space-y-4">
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
          <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:cog" class="text-violet-400 w-5 h-5" /> Configurações</h2>
          <div class="grid sm:grid-cols-2 gap-3">
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Máx. caracteres por bloco</label>
              <input v-model.number="maxChars" type="number" min="100" max="2000" step="50"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Duração por bloco (s)</label>
              <input v-model.number="blockDuration" type="number" min="1" max="300" step="1"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Intervalo entre blocos (s)</label>
              <input v-model.number="intervalBetweenBlocks" type="number" min="0" max="30" step="0.5"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Nome do arquivo</label>
              <input v-model="outputFilename" type="text" placeholder="legendas" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
            </div>
          </div>
          <button @click="convert" :disabled="!scriptText.trim() || isLoading"
            :class="['w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors', !scriptText.trim() ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-500 text-white']">
            <Icon :icon="isLoading ? 'mdi:loading' : 'mdi:swap-horizontal'" :class="['w-4 h-4', isLoading ? 'animate-spin' : '']" />
            {{ isLoading ? 'Convertendo...' : 'Converter para SRT' }}
          </button>
        </div>

        <!-- Result -->
        <div v-if="result" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-white font-semibold flex items-center gap-2">
              <Icon icon="mdi:check-circle" class="text-green-400 w-5 h-5" /> {{ result.blocks.length }} blocos gerados
            </h2>
            <div class="flex gap-2">
              <button @click="copyResult" class="bg-white/10 hover:bg-white/20 text-white px-2 py-1.5 rounded text-xs flex items-center gap-1 transition-colors">
                <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar
              </button>
              <button @click="downloadSRT" class="bg-violet-700 hover:bg-violet-600 text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors">
                <Icon icon="mdi:download" class="w-3.5 h-3.5" /> .srt
              </button>
            </div>
          </div>
          <div class="space-y-2 max-h-48 overflow-y-auto">
            <div v-for="b in previewBlocks" :key="b.index" class="bg-[#0a1628] rounded-lg p-2.5 text-xs">
              <div class="text-violet-300 font-mono mb-0.5">{{ b.index }}</div>
              <div class="text-blue-300 font-mono text-[10px] mb-0.5">{{ b.start }} → {{ b.end }}</div>
              <div class="text-white leading-relaxed">{{ b.text }}</div>
            </div>
            <p v-if="result.blocks.length > 5" class="text-blue-300/50 text-xs text-center">... e mais {{ result.blocks.length - 5 }} blocos</p>
          </div>
        </div>
      </div>
    </div>

    <!-- How to use -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5">
      <h2 class="text-white font-semibold mb-3 flex items-center gap-2"><Icon icon="mdi:information" class="text-violet-400 w-5 h-5" /> Como usar</h2>
      <div class="grid sm:grid-cols-4 gap-3">
        <div v-for="[n, t, d] in [['1','Cole o roteiro','Texto do seu vídeo'],['2','Configure','Ajuste os parâmetros'],['3','Converta','Clique em Converter'],['4','Baixe','Faça o download .srt']] as const" :key="n"
          class="text-center">
          <div class="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-1.5">{{ n }}</div>
          <p class="text-white text-xs font-semibold">{{ t }}</p>
          <p class="text-blue-200 text-xs">{{ d }}</p>
        </div>
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
