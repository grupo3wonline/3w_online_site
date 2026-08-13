<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <i class="fas fa-dollar-sign text-blue-600 dark:text-blue-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor de Moeda</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta valores entre diferentes moedas</p>
      </div>

      <div class="space-y-6">
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div class="text-center">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Cotações atualizadas em tempo real</div>
            <div class="text-xs text-gray-500 dark:text-gray-500">Valores simulados para demonstração</div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">De</label>
            <div class="flex gap-2">
              <select v-model="moedaOrigem" @change="converter" class="w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option v-for="moeda in moedas" :key="moeda.codigo" :value="moeda.codigo">{{ moeda.codigo }} - {{ moeda.nome }}</option>
              </select>
              <input v-model="valorOrigem" @input="converter" type="number" step="0.01" placeholder="0.00" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right text-2xl font-bold" />
            </div>
          </div>

          <div class="flex justify-center">
            <button @click="inverterMoedas" class="p-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-full transition-colors">
              <i class="fas fa-exchange-alt text-blue-600 dark:text-blue-400 text-xl"></i>
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Para</label>
            <div class="flex gap-2">
              <select v-model="moedaDestino" @change="converter" class="w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option v-for="moeda in moedas" :key="moeda.codigo" :value="moeda.codigo">{{ moeda.codigo }} - {{ moeda.nome }}</option>
              </select>
              <div class="flex-1 px-4 py-2 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white text-right text-2xl font-bold">
                {{ valorDestino }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="taxaConversao" class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div class="text-center">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Taxa de Conversão</div>
            <div class="text-xl font-bold text-blue-600 dark:text-blue-400">
              1 {{ moedaOrigem }} = {{ taxaConversao }} {{ moedaDestino }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="moeda in moedasPopulares" :key="moeda.codigo" @click="conversaoRapida(moeda.codigo)" class="bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg p-4 cursor-pointer transition-colors">
            <div class="text-center">
              <div class="text-2xl mb-1">{{ moeda.simbolo }}</div>
              <div class="text-sm font-bold text-gray-900 dark:text-white">{{ moeda.codigo }}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">{{ moeda.valor }}</div>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-1 mr-3"></i>
            <div class="text-sm text-blue-800 dark:text-blue-300">
              <p class="font-semibold mb-2">Moedas mais negociadas:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>USD:</strong> Dólar Americano - moeda de reserva mundial</li>
                <li><strong>EUR:</strong> Euro - moeda da zona do euro</li>
                <li><strong>GBP:</strong> Libra Esterlina - Reino Unido</li>
                <li><strong>JPY:</strong> Iene Japonês - moeda asiática principal</li>
                <li><strong>BRL:</strong> Real Brasileiro - moeda nacional</li>
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
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const moedaOrigem = ref('BRL')
const moedaDestino = ref('USD')
const valorOrigem = ref(100)
const valorDestino = ref('0.00')
const taxaConversao = ref('')

const moedas = [
  { codigo: 'BRL', nome: 'Real Brasileiro', simbolo: 'R$', taxa: 1 },
  { codigo: 'USD', nome: 'Dólar Americano', simbolo: '$', taxa: 5.0 },
  { codigo: 'EUR', nome: 'Euro', simbolo: '€', taxa: 5.4 },
  { codigo: 'GBP', nome: 'Libra Esterlina', simbolo: '£', taxa: 6.3 },
  { codigo: 'JPY', nome: 'Iene Japonês', simbolo: '¥', taxa: 0.033 },
  { codigo: 'CAD', nome: 'Dólar Canadense', simbolo: 'C$', taxa: 3.7 },
  { codigo: 'AUD', nome: 'Dólar Australiano', simbolo: 'A$', taxa: 3.3 },
  { codigo: 'CHF', nome: 'Franco Suíço', simbolo: 'CHF', taxa: 5.7 },
  { codigo: 'CNY', nome: 'Yuan Chinês', simbolo: '¥', taxa: 0.70 },
  { codigo: 'ARS', nome: 'Peso Argentino', simbolo: '$', taxa: 0.0055 }
]

const moedasPopulares = computed(() => {
  const popular = ['USD', 'EUR', 'GBP', 'JPY']
  return popular.map(codigo => {
    const moeda = moedas.find(m => m.codigo === codigo)
    const valor = calcularValor(1, 'BRL', codigo)
    return {
      ...moeda,
      valor: `R$ 1 = ${valor}`
    }
  })
})

const calcularValor = (valor, de, para) => {
  const moedaDe = moedas.find(m => m.codigo === de)
  const moedaPara = moedas.find(m => m.codigo === para)
  
  if (!moedaDe || !moedaPara) return '0.00'
  
  const valorEmBRL = valor * moedaDe.taxa
  const valorConvertido = valorEmBRL / moedaPara.taxa
  
  return valorConvertido.toFixed(2)
}

const converter = () => {
  const valor = Number(valorOrigem.value) || 0
  valorDestino.value = calcularValor(valor, moedaOrigem.value, moedaDestino.value)
  
  const taxa = calcularValor(1, moedaOrigem.value, moedaDestino.value)
  taxaConversao.value = taxa
  
  trackToolUsage('Conversor Moeda', 'convert', { de: moedaOrigem.value, para: moedaDestino.value })
}

const inverterMoedas = () => {
  const temp = moedaOrigem.value
  moedaOrigem.value = moedaDestino.value
  moedaDestino.value = temp
  converter()
}

const conversaoRapida = (codigo) => {
  moedaDestino.value = codigo
  converter()
}

// Conversão inicial
converter()
</script>
