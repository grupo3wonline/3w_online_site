<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-4">
          <i class="fas fa-tint text-pink-600 dark:text-pink-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor de Volume</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre diferentes unidades de volume</p>
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
            <button @click="inverter" class="p-3 bg-pink-100 dark:bg-pink-900/30 hover:bg-pink-200 dark:hover:bg-pink-900/50 rounded-full transition-colors">
              <i class="fas fa-exchange-alt text-pink-600 dark:text-pink-400 text-xl"></i>
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Para</label>
            <div class="flex gap-2">
              <select v-model="unidadeDestino" @change="converter" class="w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option v-for="unidade in unidades" :key="unidade.codigo" :value="unidade.codigo">{{ unidade.nome }}</option>
              </select>
              <div class="flex-1 px-4 py-2 border-2 border-pink-500 rounded-lg bg-pink-50 dark:bg-pink-900/20 text-gray-900 dark:text-white text-right text-2xl font-bold">
                {{ valorDestino }}
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button v-for="conv in conversoesRapidas" :key="conv.de + conv.para" @click="usarConversao(conv)" class="p-3 bg-gray-50 dark:bg-gray-700 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors">
            <div class="font-bold text-gray-900 dark:text-white text-sm">{{ conv.de }} → {{ conv.para }}</div>
          </button>
        </div>

        <div v-if="conversoes.length" class="space-y-2">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Conversões para outras unidades:</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div v-for="conv in conversoes" :key="conv.unidade" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div class="text-xs text-gray-600 dark:text-gray-400">{{ conv.nome }}</div>
              <div class="text-lg font-bold text-pink-600 dark:text-pink-400">{{ conv.valor }}</div>
            </div>
          </div>
        </div>

        <div class="bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-pink-600 dark:text-pink-400 mt-1 mr-3"></i>
            <div class="text-sm text-pink-800 dark:text-pink-300">
              <p class="font-semibold mb-2">Unidades de volume:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Sistema Métrico:</strong> mL, L, m³</li>
                <li><strong>Sistema Imperial:</strong> fl oz, cup, pint, quart, gallon</li>
                <li><strong>Culinária:</strong> colher de chá (tsp), colher de sopa (tbsp), xícara (cup)</li>
                <li>1 L = 1000 mL | 1 m³ = 1000 L | 1 gallon = 3.785 L</li>
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

const unidadeOrigem = ref('L')
const unidadeDestino = ref('gal')
const valorOrigem = ref(1)
const valorDestino = ref('0')
const conversoes = ref([])

const unidades = [
  { codigo: 'mL', nome: 'Mililitro (mL)', paraLitros: 0.001 },
  { codigo: 'L', nome: 'Litro (L)', paraLitros: 1 },
  { codigo: 'm3', nome: 'Metro cúbico (m³)', paraLitros: 1000 },
  { codigo: 'tsp', nome: 'Colher de chá (tsp)', paraLitros: 0.00493 },
  { codigo: 'tbsp', nome: 'Colher de sopa (tbsp)', paraLitros: 0.01479 },
  { codigo: 'floz', nome: 'Onça fluida (fl oz)', paraLitros: 0.02957 },
  { codigo: 'cup', nome: 'Xícara (cup)', paraLitros: 0.2366 },
  { codigo: 'pt', nome: 'Pint (pt)', paraLitros: 0.4732 },
  { codigo: 'qt', nome: 'Quart (qt)', paraLitros: 0.9464 },
  { codigo: 'gal', nome: 'Galão (gal)', paraLitros: 3.7854 }
]

const conversoesRapidas = [
  { de: 'L', para: 'mL' },
  { de: 'L', para: 'gal' },
  { de: 'mL', para: 'floz' },
  { de: 'cup', para: 'mL' }
]

const calcularValor = (valor, de, para) => {
  const unidadeDe = unidades.find(u => u.codigo === de)
  const unidadePara = unidades.find(u => u.codigo === para)
  
  if (!unidadeDe || !unidadePara) return '0'
  
  const valorEmLitros = valor * unidadeDe.paraLitros
  const valorConvertido = valorEmLitros / unidadePara.paraLitros
  
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
  
  trackToolUsage('Conversor Volume', 'convert', { de: unidadeOrigem.value, para: unidadeDestino.value })
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
