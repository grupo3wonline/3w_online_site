<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
          <i class="fas fa-ruler-combined text-cyan-600 dark:text-cyan-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor de Distância</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre diferentes unidades de comprimento</p>
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
            <button @click="inverter" class="p-3 bg-cyan-100 dark:bg-cyan-900/30 hover:bg-cyan-200 dark:hover:bg-cyan-900/50 rounded-full transition-colors">
              <i class="fas fa-exchange-alt text-cyan-600 dark:text-cyan-400 text-xl"></i>
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Para</label>
            <div class="flex gap-2">
              <select v-model="unidadeDestino" @change="converter" class="w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option v-for="unidade in unidades" :key="unidade.codigo" :value="unidade.codigo">{{ unidade.nome }}</option>
              </select>
              <div class="flex-1 px-4 py-2 border-2 border-cyan-500 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 text-gray-900 dark:text-white text-right text-2xl font-bold">
                {{ valorDestino }}
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button v-for="conv in conversoesRapidas" :key="conv.de + conv.para" @click="usarConversao(conv)" class="p-3 bg-gray-50 dark:bg-gray-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors">
            <div class="font-bold text-gray-900 dark:text-white text-sm">{{ conv.de }} → {{ conv.para }}</div>
          </button>
        </div>

        <div v-if="conversoes.length" class="space-y-2">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Conversões para outras unidades:</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div v-for="conv in conversoes" :key="conv.unidade" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div class="text-xs text-gray-600 dark:text-gray-400">{{ conv.nome }}</div>
              <div class="text-lg font-bold text-cyan-600 dark:text-cyan-400">{{ conv.valor }}</div>
            </div>
          </div>
        </div>

        <div class="bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-cyan-600 dark:text-cyan-400 mt-1 mr-3"></i>
            <div class="text-sm text-cyan-800 dark:text-cyan-300">
              <p class="font-semibold mb-2">Unidades de comprimento:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Sistema Métrico:</strong> mm, cm, m, km</li>
                <li><strong>Sistema Imperial:</strong> polegada (in), pé (ft), jarda (yd), milha (mi)</li>
                <li>1 m = 100 cm = 1000 mm | 1 km = 1000 m</li>
                <li>1 ft = 12 in = 30.48 cm | 1 mi = 1.609 km</li>
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

const unidadeOrigem = ref('m')
const unidadeDestino = ref('ft')
const valorOrigem = ref(1)
const valorDestino = ref('0')
const conversoes = ref([])

const unidades = [
  { codigo: 'mm', nome: 'Milímetro (mm)', paraMetros: 0.001 },
  { codigo: 'cm', nome: 'Centímetro (cm)', paraMetros: 0.01 },
  { codigo: 'm', nome: 'Metro (m)', paraMetros: 1 },
  { codigo: 'km', nome: 'Quilômetro (km)', paraMetros: 1000 },
  { codigo: 'in', nome: 'Polegada (in)', paraMetros: 0.0254 },
  { codigo: 'ft', nome: 'Pé (ft)', paraMetros: 0.3048 },
  { codigo: 'yd', nome: 'Jarda (yd)', paraMetros: 0.9144 },
  { codigo: 'mi', nome: 'Milha (mi)', paraMetros: 1609.34 },
  { codigo: 'nmi', nome: 'Milha náutica (nmi)', paraMetros: 1852 }
]

const conversoesRapidas = [
  { de: 'm', para: 'ft' },
  { de: 'km', para: 'mi' },
  { de: 'cm', para: 'in' },
  { de: 'ft', para: 'm' }
]

const calcularValor = (valor, de, para) => {
  const unidadeDe = unidades.find(u => u.codigo === de)
  const unidadePara = unidades.find(u => u.codigo === para)
  
  if (!unidadeDe || !unidadePara) return '0'
  
  const valorEmMetros = valor * unidadeDe.paraMetros
  const valorConvertido = valorEmMetros / unidadePara.paraMetros
  
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
  
  trackToolUsage('Conversor Distância', 'convert', { de: unidadeOrigem.value, para: unidadeDestino.value })
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
