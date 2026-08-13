<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-palette text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Palheta de Cores</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere paletas harmônicas baseadas em teoria das cores</p>
      </div>

      <div class="space-y-6">
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="corBase" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cor Base
              </label>
              <div class="flex gap-3">
                <input 
                  id="corBase"
                  v-model="corBase" 
                  type="color" 
                  class="w-20 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <input 
                  v-model="corBaseHex" 
                  type="text" 
                  placeholder="#FF5733" 
                  class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  @input="atualizarCorBase"
                />
              </div>
            </div>

            <div>
              <label for="esquema" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Esquema de Cores
              </label>
              <select 
                id="esquema"
                v-model="esquemaSelecionado" 
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="complementar">Complementar (2 cores)</option>
                <option value="analogo">Análogo (3 cores)</option>
                <option value="triadico">Triádico (3 cores)</option>
                <option value="tetradico">Tetrádico (4 cores)</option>
                <option value="monocromatico">Monocromático (5 cores)</option>
              </select>
            </div>
          </div>

          <BaseButton @click="gerarPalheta" variant="primary" class="w-full mt-6">
            <i class="fas fa-magic mr-2"></i>Gerar Palheta
          </BaseButton>
        </div>

        <div v-if="palhetaGerada" class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ nomesEsquemas[esquemaSelecionado] }}</h3>
              <button @click="exportarPalheta" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm">
                <i class="fas fa-download mr-2"></i>Exportar
              </button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div 
                v-for="(cor, index) in cores" 
                :key="index" 
                class="group cursor-pointer"
                @click="copiarCor(cor.hex)"
              >
                <div 
                  class="h-32 rounded-lg shadow-lg transition-transform group-hover:scale-105 border-2 border-gray-200 dark:border-gray-600"
                  :style="{ backgroundColor: cor.hex }"
                ></div>
                <div class="mt-3 space-y-1">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-mono font-bold text-gray-900 dark:text-white">{{ cor.hex }}</p>
                    <button class="opacity-0 group-hover:opacity-100 transition-opacity">
                      <i class="fas fa-copy text-gray-600 dark:text-gray-400 text-xs"></i>
                    </button>
                  </div>
                  <p class="text-xs font-mono text-gray-600 dark:text-gray-400">{{ cor.rgb }}</p>
                  <p class="text-xs font-mono text-gray-600 dark:text-gray-400">{{ cor.hsl }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 class="font-bold text-gray-900 dark:text-white mb-3">Código CSS</h3>
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto">
              <pre>{{ cssCode }}</pre>
            </div>
            <button @click="copiarCSS" class="mt-3 w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm">
              <i class="fas fa-copy mr-2"></i>Copiar CSS
            </button>
          </div>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
            <div class="text-sm text-purple-800 dark:text-purple-300">
              <p class="font-semibold mb-2">Teoria das Cores:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Complementar:</strong> Cores opostas no círculo cromático (180°)</li>
                <li><strong>Análogo:</strong> Cores adjacentes no círculo cromático (±30°)</li>
                <li><strong>Triádico:</strong> Três cores igualmente espaçadas (120°)</li>
                <li><strong>Tetrádico:</strong> Quatro cores em pares complementares (90°)</li>
                <li><strong>Monocromático:</strong> Variações de luminosidade da mesma cor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BaseButton from './common/BaseButton.vue'
import { useAnalytics } from '../../composables/useAnalytics'
import Swal from 'sweetalert2'

const { trackToolUsage } = useAnalytics()

const corBase = ref('#6366f1')
const corBaseHex = ref('#6366f1')
const esquemaSelecionado = ref('complementar')
const palhetaGerada = ref(false)
const cores = ref([])

const nomesEsquemas = {
  complementar: 'Esquema Complementar',
  analogo: 'Esquema Análogo',
  triadico: 'Esquema Triádico',
  tetradico: 'Esquema Tetrádico',
  monocromatico: 'Esquema Monocromático'
}

const cssCode = computed(() => {
  let css = ':root {\n'
  cores.value.forEach((cor, index) => {
    css += `  --color-${index + 1}: ${cor.hex};\n`
  })
  css += '}'
  return css
})

watch(corBase, (novoValor) => {
  corBaseHex.value = novoValor
})

const atualizarCorBase = () => {
  if (/^#[0-9A-F]{6}$/i.test(corBaseHex.value)) {
    corBase.value = corBaseHex.value
  }
}

const hexParaRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

const rgbParaHsl = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

const hslParaRgb = (h, s, l) => {
  h /= 360
  s /= 100
  l /= 100
  
  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

const rgbParaHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('').toUpperCase()
}

const gerarCor = (h, s, l) => {
  const rgb = hslParaRgb(h, s, l)
  const hex = rgbParaHex(rgb.r, rgb.g, rgb.b)
  return {
    hex,
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`
  }
}

const gerarPalheta = () => {
  const rgb = hexParaRgb(corBase.value)
  const hsl = rgbParaHsl(rgb.r, rgb.g, rgb.b)
  cores.value = []

  switch (esquemaSelecionado.value) {
    case 'complementar':
      cores.value = [
        gerarCor(hsl.h, hsl.s, hsl.l),
        gerarCor((hsl.h + 180) % 360, hsl.s, hsl.l)
      ]
      break

    case 'analogo':
      cores.value = [
        gerarCor((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
        gerarCor(hsl.h, hsl.s, hsl.l),
        gerarCor((hsl.h + 30) % 360, hsl.s, hsl.l)
      ]
      break

    case 'triadico':
      cores.value = [
        gerarCor(hsl.h, hsl.s, hsl.l),
        gerarCor((hsl.h + 120) % 360, hsl.s, hsl.l),
        gerarCor((hsl.h + 240) % 360, hsl.s, hsl.l)
      ]
      break

    case 'tetradico':
      cores.value = [
        gerarCor(hsl.h, hsl.s, hsl.l),
        gerarCor((hsl.h + 90) % 360, hsl.s, hsl.l),
        gerarCor((hsl.h + 180) % 360, hsl.s, hsl.l),
        gerarCor((hsl.h + 270) % 360, hsl.s, hsl.l)
      ]
      break

    case 'monocromatico':
      cores.value = [
        gerarCor(hsl.h, hsl.s, Math.max(hsl.l - 30, 10)),
        gerarCor(hsl.h, hsl.s, Math.max(hsl.l - 15, 20)),
        gerarCor(hsl.h, hsl.s, hsl.l),
        gerarCor(hsl.h, hsl.s, Math.min(hsl.l + 15, 80)),
        gerarCor(hsl.h, hsl.s, Math.min(hsl.l + 30, 90))
      ]
      break
  }

  palhetaGerada.value = true
  trackToolUsage('Gerador Palheta', 'generate', { scheme: esquemaSelecionado.value })
  
  Swal.fire({
    icon: 'success',
    title: 'Palheta Gerada!',
    text: `${cores.value.length} cores no esquema ${nomesEsquemas[esquemaSelecionado.value]}`,
    confirmButtonColor: '#9333ea'
  })
}

const copiarCor = (hex) => {
  navigator.clipboard.writeText(hex)
  Swal.fire({
    icon: 'success',
    title: 'Copiado!',
    text: `Cor ${hex} copiada`,
    timer: 1500,
    showConfirmButton: false
  })
}

const copiarCSS = () => {
  navigator.clipboard.writeText(cssCode.value)
  Swal.fire({
    icon: 'success',
    title: 'CSS Copiado!',
    text: 'Código CSS copiado para área de transferência',
    timer: 2000,
    showConfirmButton: false
  })
}

const exportarPalheta = () => {
  const json = {
    scheme: esquemaSelecionado.value,
    baseColor: corBase.value,
    colors: cores.value
  }
  
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `palheta_${esquemaSelecionado.value}_${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
  
  trackToolUsage('Gerador Palheta', 'export')
}
</script>
