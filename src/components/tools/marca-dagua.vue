<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, reactive, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'

type WatermarkType = 'text' | 'diagonal' | 'repeat'
type Position = 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'

const config = reactive({
  text: '© Marca D\'água',
  type: 'text' as WatermarkType,
  position: 'center' as Position,
  opacity: 0.5,
  fontSize: 36,
  color: '#ffffff',
  rotation: -30,
})

const previewImage = ref<string | null>(null)
const processedResults = ref<{ name: string; url: string }[]>([])
const isProcessing = ref(false)
const previewCanvas = ref<HTMLCanvasElement | null>(null)
const notification = ref('')

function drawWatermark(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.save()
  ctx.globalAlpha = config.opacity
  ctx.fillStyle = config.color
  ctx.font = `bold ${config.fontSize}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  if (config.type === 'diagonal') {
    ctx.translate(w / 2, h / 2)
    ctx.rotate((config.rotation * Math.PI) / 180)
    ctx.fillText(config.text, 0, 0)
  } else if (config.type === 'repeat') {
    const step = Math.max(config.fontSize * 5, 150)
    for (let x = -step; x < w + step; x += step) {
      for (let y = -step; y < h + step; y += step) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((config.rotation * Math.PI) / 180)
        ctx.fillText(config.text, 0, 0)
        ctx.restore()
      }
    }
  } else {
    const positions: Record<Position, [number, number]> = {
      center: [w / 2, h / 2],
      topleft: [w * 0.15, h * 0.08],
      topright: [w * 0.85, h * 0.08],
      bottomleft: [w * 0.15, h * 0.92],
      bottomright: [w * 0.85, h * 0.92],
    }
    const [x, y] = positions[config.position]
    ctx.translate(x, y)
    ctx.rotate((config.rotation * Math.PI) / 180)
    ctx.fillText(config.text, 0, 0)
  }
  ctx.restore()
}

function updatePreview() {
  if (!previewImage.value || !previewCanvas.value) return
  const canvas = previewCanvas.value
  const img = new Image()
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(img, 0, 0)
    drawWatermark(ctx, img.width, img.height)
  }
  img.src = previewImage.value
}

watch(() => ({ ...config }), updatePreview, { deep: true })
watch(previewImage, updatePreview)

function onFileSelect(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length) return
  processedResults.value = []
  const reader = new FileReader()
  reader.onload = (ev) => { previewImage.value = ev.target?.result as string }
  reader.readAsDataURL(files[0])
}

async function processImages(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length) return
  isProcessing.value = true
  processedResults.value = []

  for (const file of Array.from(files)) {
    await new Promise<void>((resolve) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const src = ev.target?.result as string
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width; canvas.height = img.height
          const ctx = canvas.getContext('2d')
          if (!ctx) { resolve(); return }
          ctx.drawImage(img, 0, 0)
          drawWatermark(ctx, img.width, img.height)
          processedResults.value.push({ name: file.name, url: canvas.toDataURL('image/jpeg', 0.92) })
          resolve()
        }
        img.src = src
      }
      reader.readAsDataURL(file)
    })
  }
  isProcessing.value = false
  toast(`${processedResults.value.length} imagens processadas!`)
}

function downloadImage(url: string, name: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = `watermark-${name}`
  a.click()
}

function downloadAll() {
  processedResults.value.forEach(r => downloadImage(r.url, r.name))
}

function toast(msg: string) { notification.value = msg; setTimeout(() => { notification.value = '' }, 2500) }

const positions: { id: Position; label: string }[] = [
  { id: 'center', label: 'Centro' }, { id: 'topleft', label: '↖ Sup. Esq.' },
  { id: 'topright', label: '↗ Sup. Dir.' }, { id: 'bottomleft', label: '↙ Inf. Esq.' },
  { id: 'bottomright', label: '↘ Inf. Dir.' },
]
</script>

<template>
  <ToolShell

    title="Marca d'Água"

    description="Adicione texto ou imagem como marca d'água nas suas fotos diretamente no navegador."

    icon="fa-copyright"

    icon-gradient="from-gray-500 to-slate-700"

    orb-color="blue"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:watermark" class="text-cyan-400 w-7 h-7" />
        Marca D'água Pro
      </h1>
      <p class="text-blue-200 text-sm">Adicione marca d'água às suas imagens — processamento 100% local</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-5">
      <!-- Config -->
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:cog" class="text-cyan-400 w-5 h-5" /> Configuração</h2>

        <div>
          <label class="input-aurora-label">Texto da Marca D'água</label>
          <input v-model="config.text" type="text" autocomplete="off"
            class="w-full input-aurora" />
        </div>

        <div>
          <label class="text-blue-200 text-xs font-medium block mb-2">Tipo</label>
          <div class="grid grid-cols-3 gap-2">
            <button v-for="[v, l] in [['text','Texto simples'],['diagonal','Diagonal'],['repeat','Repetir']] as const" :key="v" @click="config.type = v"
              :class="['px-2 py-2 rounded-lg text-xs font-medium border transition-all', config.type === v ? 'bg-cyan-600 border-cyan-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/5']">{{ l }}</button>
          </div>
        </div>

        <div v-if="config.type === 'text'">
          <label class="text-blue-200 text-xs font-medium block mb-2">Posição</label>
          <div class="grid grid-cols-3 gap-1.5">
            <button v-for="p in positions" :key="p.id" @click="config.position = p.id"
              :class="['px-2 py-1.5 rounded text-xs font-medium border transition-all', config.position === p.id ? 'bg-cyan-600 border-cyan-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/5']">{{ p.label }}</button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="input-aurora-label">Opacidade: {{ (config.opacity * 100).toFixed(0) }}%</label>
            <input type="range" v-model.number="config.opacity" min="0.05" max="1" step="0.05" class="w-full accent-cyan-500" />
          </div>
          <div>
            <label class="input-aurora-label">Tamanho: {{ config.fontSize }}px</label>
            <input type="range" v-model.number="config.fontSize" min="12" max="120" step="2" class="w-full accent-cyan-500" />
          </div>
          <div>
            <label class="input-aurora-label">Rotação: {{ config.rotation }}°</label>
            <input type="range" v-model.number="config.rotation" min="-90" max="90" step="5" class="w-full accent-cyan-500" />
          </div>
          <div>
            <label class="input-aurora-label">Cor</label>
            <input type="color" v-model="config.color" class="w-full h-9 rounded cursor-pointer bg-transparent border border-white/10" />
          </div>
        </div>

        <!-- Preview image upload -->
        <div>
          <label class="input-aurora-label">Imagem de Preview</label>
          <label class="cursor-pointer bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
            <Icon icon="mdi:image-plus" class="w-4 h-4" /> Carregar imagem de preview
            <input type="file" accept="image/*" class="hidden" @change="onFileSelect" />
          </label>
        </div>

        <!-- Batch processing -->
        <div>
          <label class="input-aurora-label">Processar imagens em lote</label>
          <label class="cursor-pointer bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
            <Icon :icon="isProcessing ? 'mdi:loading' : 'mdi:image-multiple'" :class="['w-4 h-4', isProcessing ? 'animate-spin' : '']" />
            {{ isProcessing ? 'Processando...' : 'Processar imagens' }}
            <input type="file" accept="image/*" multiple class="hidden" @change="processImages" :disabled="isProcessing" />
          </label>
        </div>
      </div>

      <!-- Preview + results -->
      <div class="space-y-4">
        <div class="glass-panel p-4">
          <h2 class="text-white font-semibold mb-3 flex items-center gap-2"><Icon icon="mdi:eye" class="text-cyan-400 w-5 h-5" /> Preview</h2>
          <div class="bg-gray-800 rounded-lg overflow-hidden min-h-48 flex items-center justify-center">
            <canvas v-show="previewImage" ref="previewCanvas" class="max-w-full max-h-64 object-contain" />
            <div v-if="!previewImage" class="text-center py-8">
              <Icon icon="mdi:image-outline" class="w-12 h-12 text-cyan-400/20 mx-auto mb-2" />
              <p class="text-blue-200 text-sm">Carregue uma imagem para visualizar</p>
            </div>
          </div>
        </div>

        <!-- Processed results -->
        <div v-if="processedResults.length" class="glass-panel p-4">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:check-circle" class="text-green-400 w-5 h-5" /> Resultados ({{ processedResults.length }})</h2>
            <button @click="downloadAll" class="bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
              <Icon icon="mdi:download-multiple" class="w-3.5 h-3.5" /> Baixar todos
            </button>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="r in processedResults" :key="r.name" class="space-y-1.5">
              <img :src="r.url" class="w-full rounded-lg" :alt="r.name" />
              <button @click="downloadImage(r.url, r.name)" class="w-full bg-cyan-700 hover:bg-cyan-600 text-white py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1 transition-colors">
                <Icon icon="mdi:download" class="w-3.5 h-3.5" /> {{ r.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div v-for="[icon, title, desc] in [['mdi:lock','100% Privado','Processamento local'],['mdi:flash','Super Rápido','Instantâneo'],['mdi:image-multiple','Múltiplas','Lote de imagens'],['mdi:currency-usd-off','Gratuito','Sem limites']] as const" :key="title"
        class="glass-panel p-4 text-center">
        <Icon :icon="icon" class="w-7 h-7 text-cyan-400 mx-auto mb-1.5" />
        <p class="text-white text-sm font-semibold">{{ title }}</p>
        <p class="text-blue-200 text-xs">{{ desc }}</p>
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