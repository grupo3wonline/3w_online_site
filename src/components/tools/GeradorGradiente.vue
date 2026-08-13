<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
          <i class="fas fa-brush text-white text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Gradiente CSS</h1>
        <p class="text-gray-600 dark:text-gray-400">Crie gradientes CSS personalizados e copie o código</p>
      </div>

      <div class="space-y-6">
        <!-- Preview do Gradiente -->
        <div
          :style="{ background: gradienteCSS }"
          class="h-64 rounded-2xl shadow-xl relative overflow-hidden"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="bg-black bg-opacity-50 text-white px-6 py-3 rounded-lg backdrop-blur-sm">
              <i class="fas fa-eye mr-2"></i>
              Preview do Gradiente
            </div>
          </div>
        </div>

        <!-- Tipo de Gradiente -->
        <div class="grid grid-cols-3 gap-3">
          <button
            @click="tipo = 'linear'"
            class="p-4 rounded-lg font-medium transition-all"
            :class="tipo === 'linear' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
          >
            <i class="fas fa-arrows-left-right text-2xl mb-2"></i>
            <div class="text-sm">Linear</div>
          </button>
          <button
            @click="tipo = 'radial'"
            class="p-4 rounded-lg font-medium transition-all"
            :class="tipo === 'radial' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
          >
            <i class="fas fa-circle-dot text-2xl mb-2"></i>
            <div class="text-sm">Radial</div>
          </button>
          <button
            @click="tipo = 'conic'"
            class="p-4 rounded-lg font-medium transition-all"
            :class="tipo === 'conic' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
          >
            <i class="fas fa-chart-pie text-2xl mb-2"></i>
            <div class="text-sm">Cônico</div>
          </button>
        </div>

        <!-- Direção (Linear) -->
        <div v-if="tipo === 'linear'">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <i class="fas fa-compass text-purple-600 dark:text-purple-400 mr-2"></i>
            Direção: {{ direcao }}°
          </label>
          <input
            v-model="direcao"
            type="range"
            min="0"
            max="360"
            class="w-full"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0° (Direita)</span>
            <span>90° (Cima)</span>
            <span>180° (Esquerda)</span>
            <span>270° (Baixo)</span>
          </div>
        </div>

        <!-- Cores do Gradiente -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              <i class="fas fa-palette text-purple-600 dark:text-purple-400 mr-2"></i>
              Cores ({{ coresGradiente.length }})
            </h3>
            <BaseButton @click="adicionarCor" variant="outline" size="sm">
              <i class="fas fa-plus mr-2"></i>
              Adicionar Cor
            </BaseButton>
          </div>

          <div class="space-y-3">
            <div
              v-for="(cor, index) in coresGradiente"
              :key="index"
              class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
            >
              <input
                v-model="cor.hex"
                type="color"
                class="w-16 h-12 rounded-lg cursor-pointer"
              />
              <input
                v-model="cor.hex"
                type="text"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white font-mono"
              />
              <div class="flex items-center gap-2">
                <input
                  v-model="cor.posicao"
                  type="number"
                  min="0"
                  max="100"
                  class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-center"
                />
                <span class="text-gray-600 dark:text-gray-400">%</span>
              </div>
              <button
                v-if="coresGradiente.length > 2"
                @click="removerCor(index)"
                class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Ações Rápidas -->
        <div class="flex gap-3">
          <BaseButton @click="inverterCores" variant="outline" class="flex-1">
            <i class="fas fa-arrow-right-arrow-left mr-2"></i>
            Inverter
          </BaseButton>
          <BaseButton @click="gerarAleatorio" variant="outline" class="flex-1">
            <i class="fas fa-shuffle mr-2"></i>
            Aleatório
          </BaseButton>
          <BaseButton @click="resetar" variant="outline" class="flex-1">
            <i class="fas fa-rotate-left mr-2"></i>
            Resetar
          </BaseButton>
        </div>

        <!-- Código CSS -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              <i class="fas fa-code text-purple-600 dark:text-purple-400 mr-2"></i>
              Código CSS
            </h3>
            <BaseButton @click="copiarCSS" variant="primary" size="sm">
              <i class="fas fa-copy mr-2"></i>
              Copiar
            </BaseButton>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre class="text-gray-900 dark:text-white">background: {{ gradienteCSS }};</pre>
          </div>

          <!-- Código Alternativo -->
          <div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Tailwind CSS (classes personalizadas)</div>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-xs overflow-x-auto">
              <pre class="text-gray-900 dark:text-white">.bg-custom-gradient {
  background: {{ gradienteCSS }};
}</pre>
            </div>
          </div>
        </div>

        <!-- Gradientes Predefinidos -->
        <div class="space-y-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">
            <i class="fas fa-wand-magic-sparkles text-purple-600 dark:text-purple-400 mr-2"></i>
            Gradientes Populares
          </h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div
              v-for="(preset, index) in presets"
              :key="index"
              @click="aplicarPreset(preset)"
              :style="{ background: preset.css }"
              class="h-24 rounded-lg shadow cursor-pointer hover:scale-105 transition-transform relative group"
            >
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all flex items-center justify-center">
                <span class="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                  {{ preset.nome }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Informações -->
        <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
          <div class="flex">
            <i class="fas fa-lightbulb text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
            <div class="text-sm text-purple-800 dark:text-purple-300">
              <p class="font-semibold mb-2">Dicas de Uso:</p>
              <ul class="list-disc list-inside space-y-1">
                <li>Use 2-3 cores para gradientes sutis e elegantes</li>
                <li>Gradientes lineares são ótimos para backgrounds de hero sections</li>
                <li>Gradientes radiais criam efeitos de iluminação interessantes</li>
                <li>Ajuste as posições das cores para controlar a transição</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const tipo = ref('linear')
const direcao = ref(90)
const coresGradiente = ref([
  { hex: '#667eea', posicao: 0 },
  { hex: '#764ba2', posicao: 100 }
])

const presets = [
  { nome: 'Oceano', css: 'linear-gradient(120deg, #2193b0, #6dd5ed)' },
  { nome: 'Pôr do Sol', css: 'linear-gradient(to right, #ff6a00, #ee0979)' },
  { nome: 'Aurora', css: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)' },
  { nome: 'Floresta', css: 'linear-gradient(to right, #11998e, #38ef7d)' },
  { nome: 'Fogo', css: 'linear-gradient(to right, #f12711, #f5af19)' },
  { nome: 'Lavanda', css: 'linear-gradient(to right, #834d9b, #d04ed6)' },
  { nome: 'Limão', css: 'linear-gradient(to right, #c6ea8d, #fe90af)' },
  { nome: 'Noite', css: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)' }
]

const gradienteCSS = computed(() => {
  const cores = coresGradiente.value
    .sort((a, b) => a.posicao - b.posicao)
    .map(c => `${c.hex} ${c.posicao}%`)
    .join(', ')

  if (tipo.value === 'linear') {
    return `linear-gradient(${direcao.value}deg, ${cores})`
  } else if (tipo.value === 'radial') {
    return `radial-gradient(circle, ${cores})`
  } else {
    return `conic-gradient(from 0deg, ${cores})`
  }
})

const adicionarCor = () => {
  const ultimaPosicao = coresGradiente.value[coresGradiente.value.length - 1].posicao
  const novaPosicao = ultimaPosicao < 100 ? (ultimaPosicao + 100) / 2 : 50
  
  coresGradiente.value.push({
    hex: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
    posicao: novaPosicao
  })
}

const removerCor = (index) => {
  if (coresGradiente.value.length > 2) {
    coresGradiente.value.splice(index, 1)
  }
}

const inverterCores = () => {
  coresGradiente.value.reverse()
  coresGradiente.value.forEach((cor, i) => {
    cor.posicao = (100 / (coresGradiente.value.length - 1)) * i
  })
}

const gerarAleatorio = () => {
  const numCores = 2 + Math.floor(Math.random() * 3)
  coresGradiente.value = []
  
  for (let i = 0; i < numCores; i++) {
    coresGradiente.value.push({
      hex: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
      posicao: (100 / (numCores - 1)) * i
    })
  }
  
  direcao.value = Math.floor(Math.random() * 360)
  trackToolUsage('Gerador Gradiente', 'random')
}

const resetar = () => {
  tipo.value = 'linear'
  direcao.value = 90
  coresGradiente.value = [
    { hex: '#667eea', posicao: 0 },
    { hex: '#764ba2', posicao: 100 }
  ]
}

const copiarCSS = async () => {
  try {
    await navigator.clipboard.writeText(`background: ${gradienteCSS.value};`)
    trackConversion('copy', 'gradient')
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'Código CSS copiado para a área de transferência',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const aplicarPreset = (preset) => {
  const regex = /linear-gradient\(([^,]+),\s*([^)]+)\)/
  const match = preset.css.match(regex)
  
  if (match) {
    const cores = match[2].split(',').map(c => c.trim())
    coresGradiente.value = cores.map((cor, i) => ({
      hex: cor.startsWith('#') ? cor.substring(0, 7) : cor,
      posicao: (100 / (cores.length - 1)) * i
    }))
  }
  
  trackToolUsage('Gerador Gradiente', 'preset')
}
</script>
