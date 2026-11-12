<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const youtubeUrl = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const notification = ref('')

interface ThumbnailData {
  videoId: string
  title: string
  thumbnails: { quality: string; resolution: string; url: string }[]
}

const data = ref<ThumbnailData | null>(null)

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

function getThumbnailUrls(videoId: string) {
  const base = 'https://img.youtube.com/vi/'
  return [
    { quality: 'Máxima (1280×720)', resolution: '1280×720', url: `${base}${videoId}/maxresdefault.jpg` },
    { quality: 'Alta (640×480)', resolution: '640×480', url: `${base}${videoId}/sddefault.jpg` },
    { quality: 'Média (480×360)', resolution: '480×360', url: `${base}${videoId}/hqdefault.jpg` },
    { quality: 'Padrão (320×180)', resolution: '320×180', url: `${base}${videoId}/mqdefault.jpg` },
    { quality: 'Baixa (120×90)', resolution: '120×90', url: `${base}${videoId}/default.jpg` },
  ]
}

async function extract() {
  if (!youtubeUrl.value.trim()) return
  const videoId = extractVideoId(youtubeUrl.value)
  if (!videoId) {
    errorMessage.value = 'URL do YouTube inválida. Tente: https://www.youtube.com/watch?v=... ou https://youtu.be/...'
    return
  }
  isLoading.value = true
  errorMessage.value = ''
  await new Promise(r => setTimeout(r, 300))
  data.value = {
    videoId,
    title: `Vídeo YouTube (${videoId})`,
    thumbnails: getThumbnailUrls(videoId),
  }
  isLoading.value = false
  toast('Thumbnails carregadas!')
}

async function downloadThumb(url: string, quality: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Thumbnail não disponível')
    const blob = await response.blob()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `thumbnail-${quality.replace(/[^a-z0-9]/gi, '-')}-${data.value?.videoId}.jpg`
    a.click()
    URL.revokeObjectURL(a.href)
    toast(`${quality} baixada!`)
  } catch {
    errorMessage.value = 'Erro ao baixar. A thumbnail máxima pode não existir para este vídeo.'
  }
}

function downloadAll() {
  data.value?.thumbnails.forEach((t, i) => {
    setTimeout(() => downloadThumb(t.url, t.quality), i * 600)
  })
}

function reset() { youtubeUrl.value = ''; data.value = null; errorMessage.value = '' }

function toast(msg: string) { notification.value = msg; setTimeout(() => { notification.value = '' }, 2500) }

const examples = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://youtu.be/dQw4w9WgXcQ',
]
</script>

<template>
  <ToolShell

    title="Thumbnail Pro"

    description="Crie thumbnails profissionais para vídeos com templates e editor visual."

    icon="fa-image"

    icon-gradient="from-pink-500 to-purple-700"

    orb-color="purple"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:image-search" class="text-red-400 w-7 h-7" />
        Thumbnail Pro
      </h1>
      <p class="text-blue-200 text-sm">Extraia thumbnails do YouTube em todas as resoluções disponíveis</p>
    </div>

    <!-- Input -->
    <div class="glass-panel p-5 space-y-4">
      <div>
        <label class="text-white font-semibold text-sm block mb-2">URL do vídeo do YouTube</label>
        <div class="flex gap-3">
          <input v-model="youtubeUrl" type="url" placeholder="https://www.youtube.com/watch?v=..." autocomplete="off"
            @keyup.enter="extract"
            class="flex-1 input-aurora" />
          <button @click="extract" :disabled="!youtubeUrl.trim() || isLoading"
            :class="['px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors', !youtubeUrl.trim() ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white']">
            <Icon :icon="isLoading ? 'mdi:loading' : 'mdi:magnify'" :class="['w-4 h-4', isLoading ? 'animate-spin' : '']" />
            {{ isLoading ? 'Extraindo...' : 'Extrair' }}
          </button>
        </div>
      </div>

      <div v-if="errorMessage" class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
        <Icon icon="mdi:alert-circle" class="text-red-400 w-5 h-5 mt-0.5 shrink-0" />
        <p class="text-red-300 text-sm">{{ errorMessage }}</p>
      </div>

      <div class="text-xs text-blue-300/50">
        Exemplos: <button v-for="ex in examples" :key="ex" @click="youtubeUrl = ex" class="text-blue-300 hover:text-white underline mr-2">{{ ex }}</button>
      </div>
    </div>

    <!-- Results -->
    <div v-if="data" class="space-y-4">
      <div class="glass-panel p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-white font-semibold flex items-center gap-2">
            <Icon icon="mdi:youtube" class="text-red-400 w-5 h-5" />
            Thumbnails disponíveis (ID: {{ data.videoId }})
          </h2>
          <div class="flex gap-2">
            <button @click="downloadAll" class="bg-red-700 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
              <Icon icon="mdi:download-multiple" class="w-3.5 h-3.5" /> Baixar todas
            </button>
            <button @click="reset" class="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs transition-colors">
              <Icon icon="mdi:refresh" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="thumb in data.thumbnails" :key="thumb.quality" class="bg-[#0a1628] rounded-xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all group">
            <div class="aspect-video bg-gray-800 overflow-hidden">
              <img :src="thumb.url" :alt="thumb.quality"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                @error="(e) => { (e.target as HTMLImageElement).style.display = 'none' }" />
            </div>
            <div class="p-3 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-white text-xs font-semibold">{{ thumb.quality }}</span>
                <span class="text-blue-300 text-xs bg-blue-900/30 px-2 py-0.5 rounded">{{ thumb.resolution }}</span>
              </div>
              <button @click="downloadThumb(thumb.url, thumb.quality)"
                class="w-full bg-red-700 hover:bg-red-600 text-white py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <Icon icon="mdi:download" class="w-3.5 h-3.5" /> Baixar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Note -->
      <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
        <p class="text-blue-300 text-xs">
          <Icon icon="mdi:information" class="w-4 h-4 inline mr-1" />
          <strong>Nota:</strong> A thumbnail em máxima resolução (1280×720) só está disponível para vídeos que já foram visualizados e processados pelo YouTube. Para vídeos mais antigos, use a resolução "Alta".
        </p>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!data" class="glass-panel p-10 text-center">
      <Icon icon="mdi:youtube" class="w-16 h-16 text-red-400/20 mx-auto mb-3" />
      <p class="text-white font-semibold mb-1">Extraia thumbnails do YouTube</p>
      <p class="text-blue-200 text-sm mb-4">Cole a URL de qualquer vídeo e baixe as imagens em alta qualidade</p>
      <div class="grid sm:grid-cols-3 gap-3 max-w-sm mx-auto text-xs text-blue-200">
        <div class="text-center"><Icon icon="mdi:link" class="w-6 h-6 text-red-400 mx-auto mb-1" /><p>Cole a URL</p></div>
        <div class="text-center"><Icon icon="mdi:magnify" class="w-6 h-6 text-red-400 mx-auto mb-1" /><p>Extraia</p></div>
        <div class="text-center"><Icon icon="mdi:download" class="w-6 h-6 text-red-400 mx-auto mb-1" /><p>Baixe</p></div>
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