<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface ImageItem {
  file: File
  url: string
}

interface WatermarkSettings {
  text: string
  opacity: number
  color: string
  position: 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right'
  fontSize: number
  useText: boolean
}

const images = ref<ImageItem[]>([])
const currentIdx = ref(0)
const isProcessing = ref(false)
const previewCanvas = ref<HTMLCanvasElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const objectUrls = ref<string[]>([])

const settings = ref<WatermarkSettings>({
  text: "MARCA D'ÁGUA",
  opacity: 0.5,
  color: '#ffffff',
  position: 'bottom-right',
  fontSize: 5,
  useText: true,
})

const positions: { value: WatermarkSettings['position']; label: string; icon: string }[] = [
  { value: 'top-left', label: 'Sup. Esq.', icon: '↖' },
  { value: 'top-right', label: 'Sup. Dir.', icon: '↗' },
  { value: 'center', label: 'Centro', icon: '●' },
  { value: 'bottom-left', label: 'Inf. Esq.', icon: '↙' },
  { value: 'bottom-right', label: 'Inf. Dir.', icon: '↘' },
]

function handleFileSelect(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  const valid = Array.from(files).filter(f => ['image/png','image/jpeg','image/jpg','image/webp'].includes(f.type))
  if (valid.length !== files.length) {
    Swal.fire({ icon: 'warning', title: 'Arquivos ignorados', text: 'Use apenas PNG, JPG, JPEG ou WEBP.', confirmButtonColor: '#0891b2' })
  }
  const sliced = valid.slice(0, 10)
  const newItems: ImageItem[] = sliced.map(f => {
    const url = URL.createObjectURL(f)
    objectUrls.value.push(url)
    return { file: f, url }
  })
  images.value = [...images.value, ...newItems]
  if (images.value.length > 0) currentIdx.value = 0
  drawPreview()
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  const files = e.dataTransfer?.files
  if (!files) return
  const fakeEvent = { target: { files } } as unknown as Event
  handleFileSelect(fakeEvent)
}

function getPosition(ctx: CanvasRenderingContext2D, width: number, height: number, textWidth: number, textHeight: number): [number, number] {
  switch (settings.value.position) {
    case 'top-left': return [20, textHeight + 20]
    case 'top-right': return [width - textWidth - 20, textHeight + 20]
    case 'center': return [(width - textWidth) / 2, height / 2]
    case 'bottom-left': return [20, height - 20]
    case 'bottom-right': return [width - textWidth - 20, height - 20]
  }
}

function drawWatermarkOnCanvas(canvas: HTMLCanvasElement, imageUrl: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) { resolve(); return }
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      if (settings.value.useText && settings.value.text) {
        const fontSize = Math.max(16, Math.min(img.width, img.height) * (settings.value.fontSize / 100))
        ctx.font = `bold ${fontSize}px Arial`
        ctx.fillStyle = settings.value.color
        ctx.globalAlpha = settings.value.opacity
        const metrics = ctx.measureText(settings.value.text)
        const [x, y] = getPosition(ctx, img.width, img.height, metrics.width, fontSize)
        ctx.fillText(settings.value.text, x, y)
        ctx.globalAlpha = 1
      }
      resolve()
    }
    img.src = imageUrl
  })
}

async function drawPreview() {
  if (!previewCanvas.value || images.value.length === 0) return
  await drawWatermarkOnCanvas(previewCanvas.value, images.value[currentIdx.value].url)
}

watch([() => images.value.length, currentIdx, settings], drawPreview, { deep: true })

async function processAll() {
  if (images.value.length === 0) {
    Swal.fire({ icon: 'warning', title: 'Nenhuma imagem', text: 'Carregue pelo menos uma imagem.', confirmButtonColor: '#0891b2' })
    return
  }
  isProcessing.value = true
  for (const item of images.value) {
    const tempCanvas = document.createElement('canvas')
    await drawWatermarkOnCanvas(tempCanvas, item.url)
    await new Promise<void>(r => tempCanvas.toBlob(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        const name = item.file.name.replace(/\.[^/.]+$/, '')
        a.href = url
        a.download = `${name}-watermark.png`
        a.click()
        URL.revokeObjectURL(url)
      }
      r()
    }, 'image/png'))
  }
  isProcessing.value = false
  Swal.fire({ icon: 'success', title: 'Concluído!', text: `${images.value.length} imagem(ns) processada(s)!`, timer: 2000, showConfirmButton: false })
}

function removeImage(idx: number) {
  images.value.splice(idx, 1)
  if (currentIdx.value >= images.value.length) currentIdx.value = Math.max(0, images.value.length - 1)
  if (images.value.length > 0) drawPreview()
}

function clearAll() {
  images.value = []
  currentIdx.value = 0
}

onBeforeUnmount(() => {
  objectUrls.value.forEach(url => URL.revokeObjectURL(url))
})
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:image-edit-outline" class="text-cyan-400 w-7 h-7" />
        Watermark Wizard
      </h1>
      <p class="text-blue-300/70 text-sm">Adicione marcas d'água às suas imagens</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-4">
      <!-- Controls -->
      <div class="lg:col-span-1 space-y-4">

        <!-- Upload -->
        <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4 space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-semibold text-blue-200">Imagens</h2>
            <button v-if="images.length > 0" @click="clearAll"
              class="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
              <Icon icon="mdi:trash-can-outline" class="w-3.5 h-3.5" />
              Limpar
            </button>
          </div>

          <div
            class="border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
            @click="fileInput?.click()"
            @dragover.prevent
            @drop="handleDrop"
          >
            <Icon icon="mdi:cloud-upload-outline" class="w-8 h-8 mx-auto mb-2 text-cyan-400" />
            <p class="text-blue-200 text-xs font-medium">Clique ou arraste imagens</p>
            <p class="text-blue-300/50 text-xs mt-1">PNG, JPG, WEBP · máx. 10</p>
          </div>
          <input ref="fileInput" type="file" multiple accept=".png,.jpg,.jpeg,.webp" class="sr-only" @change="handleFileSelect" />

          <!-- File List -->
          <div v-if="images.length > 0" class="space-y-1 max-h-32 overflow-y-auto pr-1">
            <div v-for="(img, idx) in images" :key="idx"
              class="flex items-center gap-2 px-2 py-1.5 rounded-lg border text-xs transition-all cursor-pointer"
              :class="idx === currentIdx ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/10 hover:border-white/20'"
              @click="currentIdx = idx; drawPreview()"
            >
              <Icon icon="mdi:image-outline" class="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span class="flex-1 truncate text-blue-200">{{ img.file.name }}</span>
              <button @click.stop="removeImage(idx)" class="text-red-400 hover:text-red-300">
                <Icon icon="mdi:close" class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Watermark Settings -->
        <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4 space-y-4">
          <h2 class="text-sm font-semibold text-blue-200">Configurações</h2>

          <!-- Type Toggle -->
          <div class="flex gap-2">
            <button @click="settings.useText = true"
              :class="settings.useText ? 'bg-cyan-600 text-white' : 'border border-white/20 text-blue-300 hover:border-cyan-400'"
              class="flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
              <Icon icon="mdi:format-text" class="w-3.5 h-3.5" />
              Texto
            </button>
          </div>

          <!-- Text settings -->
          <div v-if="settings.useText" class="space-y-3">
            <div>
              <label class="text-blue-300 text-xs block mb-1">Texto</label>
              <input v-model="settings.text"
                class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-1.5 text-sm focus:border-cyan-500 focus:outline-none" />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-blue-300 text-xs block mb-1">Cor</label>
                <input type="color" v-model="settings.color" class="w-full h-9 rounded cursor-pointer bg-[#0a1628] border border-white/20" />
              </div>
              <div>
                <label class="text-blue-300 text-xs block mb-1">Tamanho: {{ settings.fontSize }}%</label>
                <input type="range" v-model.number="settings.fontSize" min="1" max="20" class="w-full accent-cyan-500 mt-2" />
              </div>
            </div>
          </div>

          <!-- Opacity -->
          <div>
            <label class="text-blue-300 text-xs block mb-1">Opacidade: {{ Math.round(settings.opacity * 100) }}%</label>
            <input type="range" v-model.number="settings.opacity" min="0" max="1" step="0.05" class="w-full accent-cyan-500" />
          </div>

          <!-- Position -->
          <div>
            <label class="text-blue-300 text-xs block mb-2">Posição</label>
            <div class="grid grid-cols-5 gap-1">
              <button v-for="pos in positions" :key="pos.value"
                @click="settings.position = pos.value"
                :class="settings.position === pos.value ? 'bg-cyan-600 text-white' : 'border border-white/20 text-blue-300 hover:border-cyan-400'"
                class="py-1.5 rounded text-xs transition-colors"
                :title="pos.label"
              >{{ pos.icon }}</button>
            </div>
          </div>
        </div>

        <!-- Process Button -->
        <button @click="processAll" :disabled="images.length === 0 || isProcessing"
          class="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
          <Icon :icon="isProcessing ? 'mdi:loading' : 'mdi:download'" :class="isProcessing ? 'animate-spin' : ''" class="w-4 h-4" />
          {{ isProcessing ? 'Processando...' : `Processar e Baixar (${images.length})` }}
        </button>
      </div>

      <!-- Preview -->
      <div class="lg:col-span-2 bg-[#111d3a] border border-white/10 rounded-xl p-4">
        <h2 class="text-sm font-semibold text-blue-200 mb-3">Pré-visualização</h2>
        <div v-if="images.length === 0" class="flex flex-col items-center justify-center h-64 text-blue-300/40">
          <Icon icon="mdi:image-off-outline" class="w-16 h-16 mb-3" />
          <p class="text-sm">Carregue uma imagem para visualizar</p>
        </div>
        <canvas v-else ref="previewCanvas"
          class="max-w-full max-h-96 object-contain rounded-lg mx-auto block" />
      </div>
    </div>
  </div>
</template>
