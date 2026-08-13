<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-palette text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor RGB/HEX</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta cores entre RGB e HEX</p>
      </div>

      <div class="space-y-6">
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="modo = 'rgb-hex'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'rgb-hex' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            RGB → HEX
          </button>
          <button @click="modo = 'hex-rgb'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'hex-rgb' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            HEX → RGB
          </button>
        </div>

        <div v-if="modo === 'rgb-hex'" class="space-y-4">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">R (0-255)</label>
              <input v-model.number="r" @input="rgbParaHex" type="number" min="0" max="255" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">G (0-255)</label>
              <input v-model.number="g" @input="rgbParaHex" type="number" min="0" max="255" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">B (0-255)</label>
              <input v-model.number="b" @input="rgbParaHex" type="number" min="0" max="255" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            </div>
          </div>
        </div>

        <div v-else class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HEX (#RRGGBB)</label>
            <input v-model="hexInput" @input="hexParaRgb" type="text" placeholder="#FF5733" maxlength="7" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono">
          </div>
        </div>

        <div v-if="corAtual" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div class="flex items-center gap-6">
            <div :style="{ backgroundColor: corAtual }" class="w-32 h-32 rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-lg"></div>
            <div class="flex-1 space-y-3">
              <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">HEX</div>
                  <code class="text-lg font-bold text-gray-900 dark:text-white">{{ hexSaida }}</code>
                </div>
                <button @click="copiar(hexSaida)" class="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
              <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">RGB</div>
                  <code class="text-lg font-bold text-gray-900 dark:text-white">{{ rgbSaida }}</code>
                </div>
                <button @click="copiar(rgbSaida)" class="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
              <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">CSS</div>
                  <code class="text-sm text-gray-900 dark:text-white">rgb({{ r }}, {{ g }}, {{ b }})</code>
                </div>
                <button @click="copiar(`rgb(${r}, ${g}, ${b})`)" class="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const modo = ref('rgb-hex')
const r = ref(255)
const g = ref(87)
const b = ref(51)
const hexInput = ref('#FF5733')
const corAtual = ref('#FF5733')
const hexSaida = ref('#FF5733')
const rgbSaida = ref('255, 87, 51')

const rgbParaHex = () => {
  const rVal = Math.max(0, Math.min(255, r.value || 0))
  const gVal = Math.max(0, Math.min(255, g.value || 0))
  const bVal = Math.max(0, Math.min(255, b.value || 0))
  
  const hex = '#' + [rVal, gVal, bVal].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
  
  hexSaida.value = hex
  rgbSaida.value = `${rVal}, ${gVal}, ${bVal}`
  corAtual.value = hex
  
  trackToolUsage('Conversor RGB/HEX', 'rgb-to-hex')
}

const hexParaRgb = () => {
  let hex = hexInput.value.trim()
  if (!hex.startsWith('#')) hex = '#' + hex
  
  if (hex.length === 7) {
    const rVal = Number.parseInt(hex.slice(1, 3), 16)
    const gVal = Number.parseInt(hex.slice(3, 5), 16)
    const bVal = Number.parseInt(hex.slice(5, 7), 16)
    
    if (!Number.isNaN(rVal) && !Number.isNaN(gVal) && !Number.isNaN(bVal)) {
      r.value = rVal
      g.value = gVal
      b.value = bVal
      hexSaida.value = hex.toUpperCase()
      rgbSaida.value = `${rVal}, ${gVal}, ${bVal}`
      corAtual.value = hex
      
      trackToolUsage('Conversor RGB/HEX', 'hex-to-rgb')
    }
  }
}

const copiar = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto)
    trackConversion('copy', 'color')
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

rgbParaHex()
</script>
