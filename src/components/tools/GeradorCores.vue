<template>
  <div class="max-w-5xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-4">
          <i class="fas fa-palette text-pink-600 dark:text-pink-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Paleta de Cores</h1>
        <p class="text-gray-600 dark:text-gray-400">Crie paletas de cores harmoniosas para seus projetos</p>
      </div>

      <div class="space-y-6">
        <!-- Tipo de Paleta -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button
            v-for="tipo in tiposPaleta"
            :key="tipo.id"
            @click="tipoSelecionado = tipo.id; gerarPaleta()"
            class="p-4 rounded-lg font-medium transition-all"
            :class="tipoSelecionado === tipo.id 
              ? 'bg-pink-600 text-white shadow-lg' 
              : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
          >
            <i :class="tipo.icon" class="text-2xl mb-2"></i>
            <div class="text-sm">{{ tipo.nome }}</div>
          </button>
        </div>

        <!-- Cor Base -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-droplet text-pink-600 dark:text-pink-400 mr-2"></i>
              Cor Base
            </label>
            <div class="flex gap-2">
              <input
                v-model="corBase"
                @input="gerarPaleta"
                type="color"
                class="h-12 w-24 rounded-lg cursor-pointer"
              />
              <input
                v-model="corBase"
                @input="gerarPaleta"
                type="text"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                placeholder="#000000"
              />
            </div>
          </div>

          <div class="flex gap-4">
            <BaseButton @click="gerarCorAleatoria" variant="outline" class="flex-1">
              <i class="fas fa-shuffle mr-2"></i>
              Cor Aleatória
            </BaseButton>
            <BaseButton @click="gerarPaleta" variant="primary" class="flex-1">
              <i class="fas fa-rotate mr-2"></i>
              Atualizar
            </BaseButton>
          </div>
        </div>

        <!-- Paleta de Cores -->
        <div v-if="cores.length > 0" class="space-y-6">
          <!-- Cores Principais -->
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div
              v-for="(cor, index) in cores"
              :key="index"
              class="group relative"
            >
              <div
                :style="{ backgroundColor: cor }"
                class="h-32 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
                @click="copiarCor(cor)"
              >
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span class="bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
                    <i class="fas fa-copy mr-1"></i>
                    Copiar
                  </span>
                </div>
              </div>
              <div class="mt-2 text-center">
                <div class="font-mono text-sm text-gray-900 dark:text-white">{{ cor }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ hexParaRGB(cor) }}</div>
              </div>
            </div>
          </div>

          <!-- Variações -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fas fa-layer-group text-pink-600 dark:text-pink-400"></i>
              Variações de Tonalidade
            </h3>
            
            <div v-for="(cor, index) in cores" :key="`var-${index}`" class="mb-4 last:mb-0">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Cor {{ index + 1 }}</div>
              <div class="flex gap-1">
                <div
                  v-for="(variacao, vIndex) in gerarVariacoes(cor)"
                  :key="vIndex"
                  :style="{ backgroundColor: variacao }"
                  :title="variacao"
                  class="flex-1 h-12 rounded cursor-pointer hover:ring-2 hover:ring-pink-500"
                  @click="copiarCor(variacao)"
                ></div>
              </div>
            </div>
          </div>

          <!-- Formatos de Exportação -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fas fa-code text-pink-600 dark:text-pink-400"></i>
              Código para Exportar
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">CSS</div>
                <div class="bg-white dark:bg-gray-600 rounded p-3 font-mono text-sm">
                  <div v-for="(cor, index) in cores" :key="`css-${index}`" class="text-gray-900 dark:text-white">
                    --color-{{ index + 1 }}: {{ cor }};
                  </div>
                </div>
              </div>

              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Tailwind</div>
                <div class="bg-white dark:bg-gray-600 rounded p-3 font-mono text-sm">
                  <div v-for="(cor, index) in cores" :key="`tw-${index}`" class="text-gray-900 dark:text-white">
                    '{{ index + 1 }}': '{{ cor }}',
                  </div>
                </div>
              </div>

              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">JavaScript Array</div>
                <div class="bg-white dark:bg-gray-600 rounded p-3 font-mono text-sm text-gray-900 dark:text-white">
                  [{{ cores.map(c => `'${c}'`).join(', ') }}]
                </div>
              </div>

              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">JSON</div>
                <div class="bg-white dark:bg-gray-600 rounded p-3 font-mono text-sm text-gray-900 dark:text-white overflow-x-auto">
                  {{ JSON.stringify(cores, null, 2) }}
                </div>
              </div>
            </div>

            <div class="flex gap-4 mt-4">
              <BaseButton @click="copiarCSS" variant="outline" class="flex-1">
                <i class="fas fa-copy mr-2"></i>
                Copiar CSS
              </BaseButton>
              <BaseButton @click="exportarJSON" variant="outline" class="flex-1">
                <i class="fas fa-download mr-2"></i>
                Baixar JSON
              </BaseButton>
            </div>
          </div>

          <!-- Informações -->
          <div class="bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-pink-600 dark:text-pink-400 mt-1 mr-3"></i>
              <div class="text-sm text-pink-800 dark:text-pink-300">
                <p class="font-semibold mb-2">Sobre {{ tipoSelecionado }}:</p>
                <p>{{ descricaoTipo }}</p>
              </div>
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

const tiposPaleta = [
  { id: 'complementar', nome: 'Complementar', icon: 'fas fa-circle-half-stroke' },
  { id: 'analogica', nome: 'Análoga', icon: 'fas fa-circles-overlap' },
  { id: 'triadica', nome: 'Triádica', icon: 'fas fa-shapes' },
  { id: 'monocromatica', nome: 'Monocromática', icon: 'fas fa-layer-group' },
  { id: 'tetradica', nome: 'Tetrádica', icon: 'fas fa-grip' }
]

const tipoSelecionado = ref('complementar')
const corBase = ref('#3B82F6')
const cores = ref([])

const descricaoTipo = computed(() => {
  const descricoes = {
    complementar: 'Cores opostas no círculo cromático. Criam alto contraste e são vibrantes quando usadas juntas.',
    analogica: 'Cores adjacentes no círculo cromático. Criam harmonia e são agradáveis aos olhos.',
    triadica: 'Três cores igualmente espaçadas no círculo cromático. Oferecem contraste vibrante mantendo equilíbrio.',
    monocromatica: 'Variações de tonalidade, saturação e brilho de uma única cor. Cria aspecto limpo e elegante.',
    tetradica: 'Quatro cores espaçadas no círculo cromático. Oferece muitas possibilidades de combinação.'
  }
  return descricoes[tipoSelecionado.value] || ''
})

const hexParaHSL = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 0, l: 0 }

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  let l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

const hslParaHex = (h, s, l) => {
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (h < 60) { r = c; g = x; b = 0 }
  else if (h < 120) { r = x; g = c; b = 0 }
  else if (h < 180) { r = 0; g = c; b = x }
  else if (h < 240) { r = 0; g = x; b = c }
  else if (h < 300) { r = x; g = 0; b = c }
  else { r = c; g = 0; b = x }

  const toHex = (val) => {
    const hex = Math.round((val + m) * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const hexParaRGB = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return 'rgb(0, 0, 0)'
  
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  
  return `rgb(${r}, ${g}, ${b})`
}

const gerarPaleta = () => {
  const hsl = hexParaHSL(corBase.value)
  const novaCores = []

  switch (tipoSelecionado.value) {
    case 'complementar':
      novaCores.push(corBase.value)
      novaCores.push(hslParaHex((hsl.h + 180) % 360, hsl.s, hsl.l))
      novaCores.push(hslParaHex(hsl.h, hsl.s * 0.5, hsl.l * 1.2))
      novaCores.push(hslParaHex((hsl.h + 180) % 360, hsl.s * 0.5, hsl.l * 1.2))
      novaCores.push(hslParaHex(hsl.h, hsl.s * 0.3, hsl.l * 1.4))
      break

    case 'analogica':
      novaCores.push(hslParaHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l))
      novaCores.push(hslParaHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l))
      novaCores.push(corBase.value)
      novaCores.push(hslParaHex((hsl.h + 15) % 360, hsl.s, hsl.l))
      novaCores.push(hslParaHex((hsl.h + 30) % 360, hsl.s, hsl.l))
      break

    case 'triadica':
      novaCores.push(corBase.value)
      novaCores.push(hslParaHex((hsl.h + 120) % 360, hsl.s, hsl.l))
      novaCores.push(hslParaHex((hsl.h + 240) % 360, hsl.s, hsl.l))
      novaCores.push(hslParaHex(hsl.h, hsl.s * 0.6, hsl.l * 1.2))
      novaCores.push(hslParaHex((hsl.h + 120) % 360, hsl.s * 0.6, hsl.l * 1.2))
      break

    case 'monocromatica':
      novaCores.push(hslParaHex(hsl.h, hsl.s, hsl.l * 0.3))
      novaCores.push(hslParaHex(hsl.h, hsl.s, hsl.l * 0.6))
      novaCores.push(corBase.value)
      novaCores.push(hslParaHex(hsl.h, hsl.s * 0.5, hsl.l * 1.2))
      novaCores.push(hslParaHex(hsl.h, hsl.s * 0.3, hsl.l * 1.4))
      break

    case 'tetradica':
      novaCores.push(corBase.value)
      novaCores.push(hslParaHex((hsl.h + 90) % 360, hsl.s, hsl.l))
      novaCores.push(hslParaHex((hsl.h + 180) % 360, hsl.s, hsl.l))
      novaCores.push(hslParaHex((hsl.h + 270) % 360, hsl.s, hsl.l))
      novaCores.push(hslParaHex(hsl.h, hsl.s * 0.5, hsl.l * 1.2))
      break
  }

  cores.value = novaCores
  trackToolUsage('Gerador Cores', 'generate')
}

const gerarVariacoes = (cor) => {
  const hsl = hexParaHSL(cor)
  const variacoes = []
  
  for (let i = 0; i < 10; i++) {
    const fator = (i + 1) / 10
    const novaLuminosidade = hsl.l * (0.3 + fator * 1.4)
    variacoes.push(hslParaHex(hsl.h, hsl.s, Math.min(95, novaLuminosidade)))
  }
  
  return variacoes
}

const gerarCorAleatoria = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  
  const toHex = (val) => val.toString(16).padStart(2, '0')
  corBase.value = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  
  gerarPaleta()
}

const copiarCor = async (cor) => {
  try {
    await navigator.clipboard.writeText(cor)
    trackConversion('copy', 'color')
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: `${cor} copiado para a área de transferência`,
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const copiarCSS = async () => {
  const css = cores.value.map((cor, i) => `  --color-${i + 1}: ${cor};`).join('\n')
  try {
    await navigator.clipboard.writeText(css)
    trackConversion('copy', 'css-palette')
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'Variáveis CSS copiadas',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const exportarJSON = () => {
  const dados = {
    tipo: tipoSelecionado.value,
    corBase: corBase.value,
    cores: cores.value,
    variacoes: cores.value.map(cor => gerarVariacoes(cor))
  }
  
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `paleta-cores-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)
  
  trackConversion('download', 'palette')
  Swal.fire({
    icon: 'success',
    title: 'Download iniciado!',
    timer: 1500,
    showConfirmButton: false
  })
}

// Gerar paleta inicial
gerarPaleta()
</script>
