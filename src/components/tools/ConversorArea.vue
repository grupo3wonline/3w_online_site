<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-lime-100 dark:bg-lime-900/30 rounded-full mb-4">
          <i class="fas fa-border-all text-lime-600 dark:text-lime-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor de Área</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre diferentes unidades de área</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">De</label>
            <div class="flex gap-2">
              <select v-model="unidadeOrigem" @change="converter" class="w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option v-for="unidade in unidades" :key="unidade.codigo" :value="unidade.codigo">{{ unidade.nome }}</option>
              </select>
              <input v-model="valorOrigem" @input="converter" type="number" step="0.001" placeholder="0" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right text-2xl font-bold" />
            </div>
          </div>

          <div class="flex justify-center">
            <button @click="inverter" class="p-3 bg-lime-100 dark:bg-lime-900/30 hover:bg-lime-200 dark:hover:bg-lime-900/50 rounded-full transition-colors">
              <i class="fas fa-exchange-alt text-lime-600 dark:text-lime-400 text-xl"></i>
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Para</label>
            <div class="flex gap-2">
              <select v-model="unidadeDestino" @change="converter" class="w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option v-for="unidade in unidades" :key="unidade.codigo" :value="unidade.codigo">{{ unidade.nome }}</option>
              </select>
              <div class="flex-1 px-4 py-2 border-2 border-lime-500 rounded-lg bg-lime-50 dark:bg-lime-900/20 text-gray-900 dark:text-white text-right text-2xl font-bold">
                {{ valorDestino }}
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button v-for="conv in conversoesRapidas" :key="conv.de + conv.para" @click="usarConversao(conv)" class="p-3 bg-gray-50 dark:bg-gray-700 hover:bg-lime-50 dark:hover:bg-lime-900/20 rounded-lg transition-colors">
            <div class="font-bold text-gray-900 dark:text-white text-sm">{{ conv.de }} → {{ conv.para }}</div>
          </button>
        </div>

        <div v-if="conversoes.length" class="space-y-2">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Conversões para outras unidades:</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div v-for="conv in conversoes" :key="conv.unidade" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div class="text-xs text-gray-600 dark:text-gray-400">{{ conv.nome }}</div>
              <div class="text-lg font-bold text-lime-600 dark:text-lime-400">{{ conv.valor }}</div>
            </div>
          </div>
        </div>

        <div class="bg-lime-50 dark:bg-lime-900/20 border-l-4 border-lime-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-lime-600 dark:text-lime-400 mt-1 mr-3"></i>
            <div class="text-sm text-lime-800 dark:text-lime-300">
              <p class="font-semibold mb-2">Unidades de área:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Sistema Métrico:</strong> mm², cm², m², km², hectare (ha)</li>
                <li><strong>Sistema Imperial:</strong> in², ft², yd², acre, mi²</li>
                <li>1 m² = 10.000 cm² | 1 hectare = 10.000 m² | 1 km² = 100 hectares</li>
                <li>1 acre = 4.047 m² | 1 ft² = 0.0929 m²</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const unidadeOrigem = ref('m2')
const unidadeDestino = ref('ft2')
const valorOrigem = ref(100)
const valorDestino = ref('0')
const conversoes = ref([])

const unidades = [
  { codigo: 'mm2', nome: 'Milímetro² (mm²)', paraMetrosQuadrados: 0.000001 },
  { codigo: 'cm2', nome: 'Centímetro² (cm²)', paraMetrosQuadrados: 0.0001 },
  { codigo: 'm2', nome: 'Metro² (m²)', paraMetrosQuadrados: 1 },
  { codigo: 'ha', nome: 'Hectare (ha)', paraMetrosQuadrados: 10000 },
  { codigo: 'km2', nome: 'Quilômetro² (km²)', paraMetrosQuadrados: 1000000 },
  { codigo: 'in2', nome: 'Polegada² (in²)', paraMetrosQuadrados: 0.00064516 },
  { codigo: 'ft2', nome: 'Pé² (ft²)', paraMetrosQuadrados: 0.092903 },
  { codigo: 'yd2', nome: 'Jarda² (yd²)', paraMetrosQuadrados: 0.836127 },
  { codigo: 'acre', nome: 'Acre', paraMetrosQuadrados: 4046.86 },
  { codigo: 'mi2', nome: 'Milha² (mi²)', paraMetrosQuadrados: 2589988 }
]

const conversoesRapidas = [
  { de: 'm2', para: 'ft2' },
  { de: 'ha', para: 'acre' },
  { de: 'km2', para: 'mi2' },
  { de: 'ft2', para: 'm2' }
]

const calcularValor = (valor, de, para) => {
  const unidadeDe = unidades.find(u => u.codigo === de)
  const unidadePara = unidades.find(u => u.codigo === para)
  
  if (!unidadeDe || !unidadePara) return '0'
  
  const valorEmMetrosQuadrados = valor * unidadeDe.paraMetrosQuadrados
  const valorConvertido = valorEmMetrosQuadrados / unidadePara.paraMetrosQuadrados
  
  if (valorConvertido >= 1000 || valorConvertido < 0.01) {
    return valorConvertido.toExponential(3)
  }
  
  return valorConvertido.toFixed(3)
}

const converter = () => {
  const valor = Number(valorOrigem.value) || 0
  valorDestino.value = calcularValor(valor, unidadeOrigem.value, unidadeDestino.value)
  
  conversoes.value = unidades
    .filter(u => u.codigo !== unidadeOrigem.value)
    .slice(0, 6)
    .map(u => ({
      unidade: u.codigo,
      nome: u.nome,
      valor: calcularValor(valor, unidadeOrigem.value, u.codigo)
    }))
  
  trackToolUsage('Conversor Área', 'convert', { de: unidadeOrigem.value, para: unidadeDestino.value })
}

const inverter = () => {
  const temp = unidadeOrigem.value
  unidadeOrigem.value = unidadeDestino.value
  unidadeDestino.value = temp
  converter()
}

const usarConversao = (conversao) => {
  unidadeOrigem.value = conversao.de
  unidadeDestino.value = conversao.para
  converter()
}

converter()
</script>
