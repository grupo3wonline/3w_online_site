<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const baseColor = ref('#3B82F6')
const colorScheme = ref('complementary')
const extractionMode = ref<'harmony' | 'image'>('harmony')
const generatedPalette = ref(['#3B82F6', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6'])
const uploadedImage = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const colorSchemes = [
  { value: 'complementary', label: 'Complementar' },
  { value: 'analogous', label: 'Análogo' },
  { value: 'triadic', label: 'Tríade' },
  { value: 'monochromatic', label: 'Monocromático' },
  { value: 'square', label: 'Quadrado' },
  { value: 'split-complementary', label: 'Dividir Complementar' },
  { value: 'tetradic', label: 'Tetrádico' },
  { value: 'compound', label: 'Composto' },
]

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h /= 6
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  h /= 360; s /= 100; l /= 100
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const hue2rgb = (t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0')
  if (s === 0) { const v = toHex(l); return `#${v}${v}${v}` }
  return `#${toHex(hue2rgb(h + 1/3))}${toHex(hue2rgb(h))}${toHex(hue2rgb(h - 1/3))}`
}

function generatePalette() {
  const hex = baseColor.value
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
    Swal.fire({ icon: 'warning', title: 'Cor inválida', text: 'Use um valor HEX válido (ex: #3B82F6)', confirmButtonColor: '#3b82f6' })
    return
  }
  const [h, s, l] = hexToHsl(hex)
  let palette: string[]
  switch (colorScheme.value) {
    case 'complementary':
      palette = [hex, hslToHex((h+180)%360,s,l), hslToHex(h,s,Math.min(l+15,100)), hslToHex((h+180)%360,s,Math.max(l-15,0)), hslToHex(h,Math.max(s-20,0),l)]
      break
    case 'analogous':
      palette = [hslToHex((h-30+360)%360,s,l), hslToHex((h-15+360)%360,s,l), hex, hslToHex((h+15)%360,s,l), hslToHex((h+30)%360,s,l)]
      break
    case 'triadic':
      palette = [hex, hslToHex((h+120)%360,s,l), hslToHex((h+240)%360,s,l), hslToHex((h+60)%360,s,l), hslToHex((h+180)%360,s,l)]
      break
    case 'monochromatic':
      palette = [hslToHex(h,s,Math.max(l-30,10)), hslToHex(h,s,Math.max(l-15,10)), hex, hslToHex(h,s,Math.min(l+15,90)), hslToHex(h,s,Math.min(l+30,90))]
      break
    default:
      palette = [hex, hslToHex((h+72)%360,s,l), hslToHex((h+144)%360,s,l), hslToHex((h+216)%360,s,l), hslToHex((h+288)%360,s,l)]
  }
  generatedPalette.value = palette
  Swal.fire({ icon: 'success', title: 'Nova paleta gerada!', timer: 1300, showConfirmButton: false })
}

function extractColorsFromImage(file: File) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const maxSize = 150
      const scale = Math.min(maxSize / img.width, maxSize / img.height)
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const colorMap = new Map<string, number>()
      for (let i = 0; i < data.length; i += 4 * 8) {
        if (data[i + 3] < 128) continue
        const rr = Math.round(data[i] / 32) * 32
        const gg = Math.round(data[i+1] / 32) * 32
        const bb = Math.round(data[i+2] / 32) * 32
        const hex = `#${rr.toString(16).padStart(2,'0')}${gg.toString(16).padStart(2,'0')}${bb.toString(16).padStart(2,'0')}`
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1)
      }
      const top5 = [...colorMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([c]) => c)
      generatedPalette.value = top5.length >= 2 ? top5 : generatedPalette.value
      uploadedImage.value = e.target?.result as string
      Swal.fire({ icon: 'success', title: 'Paleta extraída!', text: 'Cores extraídas da imagem.', timer: 1500, showConfirmButton: false })
    }
    img.src = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

function handleImageUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file || !file.type.startsWith('image/')) {
    Swal.fire({ icon: 'error', title: 'Arquivo inválido', text: 'Selecione uma imagem.', confirmButtonColor: '#3b82f6' })
    return
  }
  extractColorsFromImage(file)
}

async function copyColor(color: string) {
  await navigator.clipboard.writeText(color)
  Swal.fire({ icon: 'success', title: 'Cor copiada!', text: color, timer: 1200, showConfirmButton: false })
}

function exportCSS() {
  const css = generatedPalette.value.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')
  const content = `:root {\n${css}\n}`
  const blob = new Blob([content], { type: 'text/css' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'palette.css'; a.click()
  URL.revokeObjectURL(url)
}

function exportJSON() {
  const json = JSON.stringify({ palette: generatedPalette.value }, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'palette.json'; a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:palette" class="text-blue-400 w-7 h-7" />
        Color Craft — Gerador de Paletas
      </h1>
      <p class="text-blue-200 text-sm">Crie paletas de cores ou extraia de imagens</p>
    </div>

    <!-- Mode Toggle -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-5">
      <div class="flex gap-2 justify-center">
        <button @click="extractionMode = 'harmony'"
          :class="extractionMode === 'harmony' ? 'bg-blue-600 text-white' : 'bg-white/5 text-blue-300 hover:text-white'"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Icon icon="mdi:refresh" class="w-4 h-4" />
          Harmonia de Cores
        </button>
        <button @click="extractionMode = 'image'"
          :class="extractionMode === 'image' ? 'bg-blue-600 text-white' : 'bg-white/5 text-blue-300 hover:text-white'"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Icon icon="mdi:image-outline" class="w-4 h-4" />
          Extrair de Imagem
        </button>
      </div>

      <!-- Harmony Controls -->
      <template v-if="extractionMode === 'harmony'">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm text-blue-200">Cor Base</label>
            <div class="flex items-center gap-3">
              <input type="color" v-model="baseColor"
                class="w-12 h-10 rounded-lg border-2 border-white/10 cursor-pointer bg-transparent" />
              <input type="text" v-model="baseColor"
                class="flex-1 bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm text-blue-200">Esquema de Cores</label>
            <select v-model="colorScheme"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option v-for="s in colorSchemes" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
          </div>
        </div>
        <button @click="generatePalette"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
          <Icon icon="mdi:refresh" class="w-4 h-4" />
          Gerar Nova Paleta
        </button>
      </template>

      <!-- Image Extraction -->
      <template v-else>
        <div class="space-y-3">
          <label class="text-sm text-blue-200">Carregar Imagem</label>
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
          <div v-if="uploadedImage" class="rounded-xl overflow-hidden border border-white/10 max-h-48">
            <img :src="uploadedImage" alt="Imagem carregada" class="w-full h-48 object-cover" />
          </div>
          <button @click="fileInput?.click()"
            class="w-full bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <Icon icon="mdi:upload-outline" class="w-4 h-4" />
            {{ uploadedImage ? 'Carregar Outra Imagem' : 'Carregar Imagem' }}
          </button>
        </div>
      </template>
    </div>

    <!-- Generated Palette -->
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
      <div v-for="(color, index) in generatedPalette" :key="index"
        class="bg-[#0f1e3c] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all group">
        <div class="h-24 w-full cursor-pointer transition-transform group-hover:scale-[1.02]"
          :style="{ backgroundColor: color }"
          @click="copyColor(color)" />
        <div class="p-3">
          <div class="text-xs font-mono text-blue-200 mb-2">{{ color }}</div>
          <button @click="copyColor(color)"
            class="w-full bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white text-xs py-1 rounded-md transition-colors flex items-center justify-center gap-1">
            <Icon icon="mdi:content-copy" class="w-3 h-3" />
            Copiar
          </button>
        </div>
      </div>
    </div>

    <!-- Export -->
    <div class="flex flex-wrap gap-3 justify-center">
      <button @click="exportCSS"
        class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:download-outline" class="w-4 h-4" />
        Exportar CSS
      </button>
      <button @click="exportJSON"
        class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:download-outline" class="w-4 h-4" />
        Exportar JSON
      </button>
    </div>
  </div>
</template>
