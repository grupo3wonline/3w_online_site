<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface ColorValues {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  hsv: { h: number; s: number; v: number }
  cmyk: { c: number; m: number; y: number; k: number }
  lab: { l: number; a: number; b: number }
}

const inputValue = ref('#3B82F6')
const inputType = ref('hex')

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
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
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb(h: number, s: number, l: number) {
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
  if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v } }
  return {
    r: Math.round(hue2rgb(h + 1/3) * 255),
    g: Math.round(hue2rgb(h) * 255),
    b: Math.round(hue2rgb(h - 1/3) * 255),
  }
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0; const v = max
  const d = max - min
  const s = max === 0 ? 0 : d / max
  if (max !== min) {
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h /= 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) }
}

function rgbToCmyk(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const k = 1 - Math.max(r, g, b)
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 }
  const c = (1 - r - k) / (1 - k)
  const m = (1 - g - k) / (1 - k)
  const y = (1 - b - k) / (1 - k)
  return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) }
}

function rgbToLab(r: number, g: number, b: number) {
  let R = r / 255, G = g / 255, B = b / 255
  R = R > 0.04045 ? Math.pow((R + 0.055) / 1.055, 2.4) : R / 12.92
  G = G > 0.04045 ? Math.pow((G + 0.055) / 1.055, 2.4) : G / 12.92
  B = B > 0.04045 ? Math.pow((B + 0.055) / 1.055, 2.4) : B / 12.92
  let x = (R * 0.4124564 + G * 0.3575761 + B * 0.1804375) / 0.95047
  let y = (R * 0.2126729 + G * 0.7151522 + B * 0.0721750)
  let z = (R * 0.0193339 + G * 0.1191920 + B * 0.9503041) / 1.08883
  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x + 16/116)
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y + 16/116)
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z + 16/116)
  return { l: Math.round(116 * y - 16), a: Math.round(500 * (x - y)), b: Math.round(200 * (y - z)) }
}

const colorValues = computed<ColorValues | null>(() => {
  try {
    let rgb: { r: number; g: number; b: number } | null = null
    const val = inputValue.value.trim()
    if (inputType.value === 'hex') {
      rgb = hexToRgb(val)
    } else if (inputType.value === 'rgb') {
      const m = val.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
      if (m) rgb = { r: +m[1], g: +m[2], b: +m[3] }
    } else if (inputType.value === 'hsl') {
      const m = val.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
      if (m) rgb = hslToRgb(+m[1], +m[2], +m[3])
    }
    if (!rgb) return null
    const { r, g, b } = rgb
    return {
      hex: rgbToHex(r, g, b),
      rgb: { r, g, b },
      hsl: rgbToHsl(r, g, b),
      hsv: rgbToHsv(r, g, b),
      cmyk: rgbToCmyk(r, g, b),
      lab: rgbToLab(r, g, b),
    }
  } catch { return null }
})

const colorFormats = [
  { key: 'hex', label: 'HEX', icon: 'mdi:pound', desc: 'Hexadecimal' },
  { key: 'rgb', label: 'RGB', icon: 'mdi:circle-slice-8', desc: 'Red Green Blue' },
  { key: 'hsl', label: 'HSL', icon: 'mdi:palette-swatch-outline', desc: 'Hue Saturation Lightness' },
  { key: 'cmyk', label: 'CMYK', icon: 'mdi:printer-outline', desc: 'Cyan Magenta Yellow Key' },
  { key: 'lab', label: 'LAB', icon: 'mdi:flask-outline', desc: 'L*a*b* Color Space' },
  { key: 'hsv', label: 'HSV', icon: 'mdi:brush-outline', desc: 'Hue Saturation Value' },
]

const examples = [
  '#EF4444','#F97316','#EAB308','#22C55E','#3B82F6',
  '#8B5CF6','#EC4899','#64748B','#000000','#FFFFFF',
]

function formatColorValue(format: string): string {
  const cv = colorValues.value
  if (!cv) return ''
  switch (format) {
    case 'hex': return cv.hex.toUpperCase()
    case 'rgb': return `rgb(${cv.rgb.r}, ${cv.rgb.g}, ${cv.rgb.b})`
    case 'hsl': return `hsl(${cv.hsl.h}, ${cv.hsl.s}%, ${cv.hsl.l}%)`
    case 'hsv': return `hsv(${cv.hsv.h}, ${cv.hsv.s}%, ${cv.hsv.v}%)`
    case 'cmyk': return `cmyk(${cv.cmyk.c}%, ${cv.cmyk.m}%, ${cv.cmyk.y}%, ${cv.cmyk.k}%)`
    case 'lab': return `lab(${cv.lab.l}, ${cv.lab.a}, ${cv.lab.b})`
    default: return ''
  }
}

async function copyFormat(format: string) {
  const val = formatColorValue(format)
  if (!val) return
  await navigator.clipboard.writeText(val)
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 })
    .fire({ icon: 'success', title: `${format.toUpperCase()} copiado!` })
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:palette-outline" class="text-blue-400 w-7 h-7" />
        Conversor de Cores
      </h1>
      <p class="text-blue-200 text-sm">Converta entre HEX, RGB, HSL, CMYK, LAB e HSV instantaneamente</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Input -->
      <div class="space-y-4">
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-5">
          <h2 class="text-white font-semibold flex items-center gap-2">
            <Icon icon="mdi:palette" class="text-blue-400 w-5 h-5" />
            Seletor de Cores
          </h2>

          <div class="space-y-2">
            <label class="text-sm text-blue-200">Valor da Cor</label>
            <div class="relative">
              <div class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/20"
                :style="{ backgroundColor: colorValues?.hex || 'transparent' }" />
              <input v-model="inputValue" type="text"
                placeholder="Digite um valor de cor..."
                class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg px-3 py-2.5 pl-10 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-blue-200">Formato de Entrada</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="f in ['hex','rgb','hsl']" :key="f"
                @click="inputType = f"
                :class="inputType === f ? 'bg-blue-600 text-white' : 'bg-white/5 text-blue-300 hover:text-white border border-white/10'"
                class="px-3 py-1 rounded-full text-xs font-medium transition-colors uppercase">
                {{ f }}
              </button>
            </div>
          </div>

          <!-- Color Picker -->
          <div v-if="inputType === 'hex'" class="space-y-2">
            <label class="text-sm text-blue-200">Escolher com seletor</label>
            <input type="color" :value="colorValues?.hex || '#3B82F6'"
              @input="inputValue = ($event.target as HTMLInputElement).value"
              class="w-full h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer" />
          </div>

          <div v-if="colorValues" class="border-t border-white/5 pt-4 space-y-2">
            <label class="text-sm text-blue-200">Visualização</label>
            <div class="h-16 rounded-xl border border-white/10" :style="{ backgroundColor: colorValues.hex }" />
            <div class="text-center font-mono text-sm text-blue-200 bg-white/5 rounded-lg py-1">{{ colorValues.hex.toUpperCase() }}</div>
          </div>
        </div>

        <!-- Quick Examples -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 class="text-sm text-blue-200 font-medium">Exemplos Rápidos</h3>
          <div class="grid grid-cols-5 gap-1.5">
            <button v-for="ex in examples" :key="ex"
              @click="inputValue = ex; inputType = 'hex'"
              class="w-full aspect-square rounded-lg border border-white/10 hover:scale-110 transition-transform"
              :style="{ backgroundColor: ex }"
              :title="ex" />
          </div>
        </div>
      </div>

      <!-- Conversions -->
      <div class="lg:col-span-2">
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 h-full">
          <h2 class="text-white font-semibold flex items-center gap-2 mb-4">
            <Icon icon="mdi:flash" class="text-yellow-400 w-5 h-5" />
            Conversões Instantâneas
          </h2>

          <div v-if="colorValues" class="grid sm:grid-cols-2 gap-3">
            <div v-for="fmt in colorFormats" :key="fmt.key"
              class="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/8 transition-all">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <Icon :icon="fmt.icon" class="text-blue-400 w-4 h-4" />
                  <div>
                    <span class="font-bold text-sm text-white">{{ fmt.label }}</span>
                    <p class="text-xs text-blue-300/60">{{ fmt.desc }}</p>
                  </div>
                </div>
                <button @click="copyFormat(fmt.key)"
                  class="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-blue-300 hover:text-white hover:bg-white/10 rounded-md">
                  <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" />
                </button>
              </div>
              <div class="bg-[#0a1628] rounded-lg px-3 py-2 border border-white/5">
                <code class="text-sm font-mono text-blue-300 break-all">{{ formatColorValue(fmt.key) }}</code>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center h-64 text-center">
            <Icon icon="mdi:palette-outline" class="w-12 h-12 text-blue-300/30 mb-4" />
            <h3 class="text-white font-semibold mb-1">Aguardando Cor</h3>
            <p class="text-blue-300/60 text-sm max-w-xs">Digite um código de cor ou selecione um dos exemplos rápidos para ver as conversões.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
