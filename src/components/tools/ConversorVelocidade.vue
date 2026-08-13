<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-4">
          <i class="fas fa-tachometer-alt text-sky-600 dark:text-sky-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor de Velocidade</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre diferentes unidades de velocidade</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">De</label>
            <div class="flex gap-2">
              <select v-model="unidadeOrigem" @change="converter" class="w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option v-for="unidade in unidades" :key="unidade.codigo" :value="unidade.codigo">{{ unidade.nome }}</option>
              </select>
              <input v-model="valorOrigem" @input="converter" type="number" step="0.1" placeholder="0" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right text-2xl font-bold" />
            </div>
          </div>

          <div class="flex justify-center">
            <button @click="inverter" class="p-3 bg-sky-100 dark:bg-sky-900/30 hover:bg-sky-200 dark:hover:bg-sky-900/50 rounded-full transition-colors">
              <i class="fas fa-exchange-alt text-sky-600 dark:text-sky-400 text-xl"></i>
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Para</label>
            <div class="flex gap-2">
              <select v-model="unidadeDestino" @change="converter" class="w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option v-for="unidade in unidades" :key="unidade.codigo" :value="unidade.codigo">{{ unidade.nome }}</option>
              </select>
              <div class="flex-1 px-4 py-2 border-2 border-sky-500 rounded-lg bg-sky-50 dark:bg-sky-900/20 text-gray-900 dark:text-white text-right text-2xl font-bold">
                {{ valorDestino }}
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button v-for="ref in referenciasVelocidade" :key="ref.nome" @click="usarReferencia(ref)" class="p-3 bg-gray-50 dark:bg-gray-700 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors text-left">
            <div class="text-xs text-gray-600 dark:text-gray-400">{{ ref.nome }}</div>
            <div class="font-bold text-sky-600 dark:text-sky-400 text-sm">{{ ref.valor }} {{ ref.unidade }}</div>
          </button>
        </div>

        <div v-if="conversoes.length" class="space-y-2">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Conversões para outras unidades:</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div v-for="conv in conversoes" :key="conv.unidade" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div class="text-xs text-gray-600 dark:text-gray-400">{{ conv.nome }}</div>
              <div class="text-lg font-bold text-sky-600 dark:text-sky-400">{{ conv.valor }}</div>
            </div>
          </div>
        </div>

        <div class="bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-sky-600 dark:text-sky-400 mt-1 mr-3"></i>
            <div class="text-sm text-sky-800 dark:text-sky-300">
              <p class="font-semibold mb-2">Conversões comuns:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li>1 km/h = 0.621 mph = 0.278 m/s = 0.540 knots</li>
                <li>1 mph = 1.609 km/h = 0.447 m/s</li>
                <li>1 m/s = 3.6 km/h = 2.237 mph</li>
                <li>Velocidade do som: ~343 m/s (1235 km/h) ao nível do mar</li>
                <li>Velocidade da luz: 299.792.458 m/s</li>
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

const unidadeOrigem = ref('kmh')
const unidadeDestino = ref('mph')
const valorOrigem = ref(100)
const valorDestino = ref('0')
const conversoes = ref([])

const unidades = [
  { codigo: 'ms', nome: 'Metro/segundo (m/s)', paraMS: 1 },
  { codigo: 'kmh', nome: 'Quilômetro/hora (km/h)', paraMS: 0.277778 },
  { codigo: 'mph', nome: 'Milha/hora (mph)', paraMS: 0.44704 },
  { codigo: 'fps', nome: 'Pé/segundo (ft/s)', paraMS: 0.3048 },
  { codigo: 'knot', nome: 'Nó (knot)', paraMS: 0.514444 },
  { codigo: 'mach', nome: 'Mach', paraMS: 343 }
]

const referenciasVelocidade = [
  { nome: 'Pessoa caminhando', valor: 5, unidade: 'km/h' },
  { nome: 'Pessoa correndo', valor: 15, unidade: 'km/h' },
  { nome: 'Bicicleta', valor: 20, unidade: 'km/h' },
  { nome: 'Limite urbano', valor: 60, unidade: 'km/h' },
  { nome: 'Rodovia', valor: 110, unidade: 'km/h' },
  { nome: 'Trem-bala', valor: 300, unidade: 'km/h' },
  { nome: 'Avião comercial', valor: 900, unidade: 'km/h' },
  { nome: 'Velocidade do som', valor: 1235, unidade: 'km/h' }
]

const calcularValor = (valor, de, para) => {
  const unidadeDe = unidades.find(u => u.codigo === de)
  const unidadePara = unidades.find(u => u.codigo === para)
  
  if (!unidadeDe || !unidadePara) return '0'
  
  const valorEmMS = valor * unidadeDe.paraMS
  const valorConvertido = valorEmMS / unidadePara.paraMS
  
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
    .map(u => ({
      unidade: u.codigo,
      nome: u.nome,
      valor: calcularValor(valor, unidadeOrigem.value, u.codigo)
    }))
  
  trackToolUsage('Conversor Velocidade', 'convert', { de: unidadeOrigem.value, para: unidadeDestino.value })
}

const inverter = () => {
  const temp = unidadeOrigem.value
  unidadeOrigem.value = unidadeDestino.value
  unidadeDestino.value = temp
  converter()
}

const usarReferencia = (referencia) => {
  unidadeOrigem.value = 'kmh'
  valorOrigem.value = referencia.valor
  converter()
}

converter()
</script>
