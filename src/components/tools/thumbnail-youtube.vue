<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const youtubeUrl = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const notification = ref('')
const selectedQuality = ref('hqdefault')

interface ThumbResult {
  videoId: string
  thumbnails: { key: string; label: string; resolution: string; url: string }[]
}

const result = ref<ThumbResult | null>(null)

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

async function buscar() {
  if (!youtubeUrl.value.trim()) return
  const videoId = extractVideoId(youtubeUrl.value)
  if (!videoId) {
    errorMessage.value = 'URL inválida. Use: https://www.youtube.com/watch?v=XXXXXXXXXXX ou https://youtu.be/XXXXXXXXXXX'
    return
  }
  isLoading.value = true
  errorMessage.value = ''
  await new Promise(r => setTimeout(r, 300))

  const base = `https://img.youtube.com/vi/${videoId}/`
  result.value = {
    videoId,
    thumbnails: [
      { key: 'maxresdefault', label: 'Máxima Qualidade', resolution: '1280×720', url: `${base}maxresdefault.jpg` },
      { key: 'sddefault', label: 'Alta Qualidade', resolution: '640×480', url: `${base}sddefault.jpg` },
      { key: 'hqdefault', label: 'Qualidade Padrão', resolution: '480×360', url: `${base}hqdefault.jpg` },
      { key: 'mqdefault', label: 'Qualidade Média', resolution: '320×180', url: `${base}mqdefault.jpg` },
      { key: 'default', label: 'Qualidade Baixa', resolution: '120×90', url: `${base}default.jpg` },
    ],
  }

  isLoading.value = false
  toast('Thumbnails encontradas!')
}

const selectedThumb = computed(() => result.value?.thumbnails.find(t => t.key === selectedQuality.value))

async function download(url: string, label: string) {
  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error()
    const blob = await r.blob()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `thumbnail-${label.replace(/\s+/g, '-')}-${result.value?.videoId}.jpg`
    a.click()
    URL.revokeObjectURL(a.href)
    toast('Download iniciado!')
  } catch {
    errorMessage.value = 'Falha ao baixar. Esta resolução pode não estar disponível para o vídeo.'
  }
}

function downloadSelected() {
  if (selectedThumb.value) download(selectedThumb.value.url, selectedThumb.value.label)
}

function downloadAll() {
  result.value?.thumbnails.forEach((t, i) => {
    setTimeout(() => download(t.url, t.label), i * 700)
  })
}

function clear() { youtubeUrl.value = ''; result.value = null; errorMessage.value = '' }

function toast(msg: string) { notification.value = msg; setTimeout(() => { notification.value = '' }, 2500) }

const steps = [
  { n: '1', title: 'Cole a URL', desc: 'Link do vídeo do YouTube', icon: 'mdi:link-variant' },
  { n: '2', title: 'Busque', desc: 'Clique no botão de busca', icon: 'mdi:magnify' },
  { n: '3', title: 'Baixe', desc: 'Escolha a resolução', icon: 'mdi:download' },
]
</script>

<template>
    <ToolShell

      title="Thumbnail YouTube"

      description="Design de thumbnails otimizados para YouTube com canvas editor."

      icon="fa-youtube"

      icon-gradient="from-red-500 to-rose-700"

      orb-color="orange"

      :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

      :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

    >

  <div class="max-w-3xl mx-auto p-4 space-y-5">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:youtube" class="text-red-500 w-8 h-8" />
        YouTube Thumbnail Downloader
      </h1>
      <p class="text-blue-200 text-sm">Baixe thumbnails do YouTube em alta qualidade — grátis, sem cadastro, ilimitado</p>
    </div>

    <!-- Input -->
      <div class="flex gap-3">
        <input v-model="youtubeUrl" type="url" placeholder="https://www.youtube.com/watch?v=..." autocomplete="off"
          @keyup.enter="buscar"
          class="flex-1 bg-[#0a1628] text-white border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50" />
        <button @click="buscar" :disabled="!youtubeUrl.trim() || isLoading"
          :class="['px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow', !youtubeUrl.trim() ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white hover:scale-105']">
          <Icon :icon="isLoading ? 'mdi:loading' : 'mdi:magnify'" :class="['w-5 h-5', isLoading ? 'animate-spin' : '']" />
          <span class="hidden sm:inline">{{ isLoading ? '...' : 'Buscar' }}</span>
        </button>
      </div>

      <div v-if="errorMessage" class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
        <Icon icon="mdi:alert-circle" class="text-red-400 w-5 h-5 shrink-0 mt-0.5" />
        <p class="text-red-300 text-sm">{{ errorMessage }}</p>
      </div>
    </div>

    <!-- Results -->
    <div v-if="result" class="space-y-4">
      <!-- Quality selector -->
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold">Selecione a resolução</h2>
        <div class="grid sm:grid-cols-5 gap-2">
          <button v-for="t in result.thumbnails" :key="t.key" @click="selectedQuality = t.key"
            :class="['p-2.5 rounded-xl text-center border transition-all', selectedQuality === t.key ? 'border-red-500 bg-red-900/30 text-red-300' : 'border-white/10 text-blue-200 hover:bg-white/5']">
            <Icon icon="mdi:image" class="w-5 h-5 mx-auto mb-1" />
            <p class="text-xs font-semibold">{{ t.label.split(' ')[0] }}</p>
            <p class="text-[10px]">{{ t.resolution }}</p>
          </button>
        </div>

        <!-- Preview of selected -->
        <div v-if="selectedThumb" class="relative">
          <img :src="selectedThumb.url" :alt="selectedThumb.label"
            class="w-full rounded-xl max-h-72 object-contain bg-gray-900"
            @error="(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'60\'><text y=\'50%\' x=\'50%\' text-anchor=\'middle\' dominant-baseline=\'middle\' fill=\'%23666\'>N/A</text></svg>' }" />
          <div class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {{ selectedThumb.resolution }}
          </div>
        </div>

        <!-- Download actions -->
        <div class="flex gap-3 mt-2">
          <button @click="downloadSelected" class="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow">
            <Icon icon="mdi:download" class="w-5 h-5" />
            Baixar {{ selectedThumb?.label }}
          </button>
          <button @click="downloadAll" class="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5" title="Baixar todas as resoluções">
            <Icon icon="mdi:download-multiple" class="w-5 h-5" />
          </button>
          <button @click="clear" class="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl transition-colors" title="Nova busca">
            <Icon icon="mdi:refresh" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Features -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div v-for="[icon, title, desc] in [['mdi:flash','Ultra Rápido','Segundos'],['mdi:gift','100% Grátis','Sem taxas'],['mdi:shield-check','Privado','Sem rastreamento'],['mdi:infinity','Ilimitado','Sem restrições']] as const" :key="title"
          class="glass-panel p-3 text-center">
          <Icon :icon="icon" class="w-6 h-6 text-red-400 mx-auto mb-1" />
          <p class="text-white text-xs font-semibold">{{ title }}</p>
          <p class="text-blue-200 text-xs">{{ desc }}</p>
        </div>
      </div>
    </div>

    <!-- Empty state with steps -->
    <div v-if="!result" class="glass-panel p-8">
      <h2 class="text-white font-semibold text-center mb-5">Como funciona</h2>
      <div class="grid sm:grid-cols-3 gap-6">
        <div v-for="s in steps" :key="s.n" class="text-center">
          <div class="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full flex items-center justify-center font-extrabold text-xl mx-auto mb-3 shadow-lg">{{ s.n }}</div>
          <Icon :icon="s.icon" class="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p class="text-white font-semibold">{{ s.title }}</p>
          <p class="text-blue-200 text-sm">{{ s.desc }}</p>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="notification" class="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">{{ notification }}</div>
    </Transition>
  


    </ToolShell></template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>