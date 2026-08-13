<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
          <i class="fas fa-ruler text-teal-600 dark:text-teal-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor de Temperatura</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre Celsius, Fahrenheit e Kelvin</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-900/30 rounded-xl p-6 border-2 border-teal-200 dark:border-teal-800">
            <div class="text-center mb-4">
              <div class="text-4xl mb-2">🌡️</div>
              <div class="text-lg font-bold text-gray-900 dark:text-white">Celsius (°C)</div>
            </div>
            <input v-model="celsius" @input="convertFromCelsius" type="number" step="0.1" class="w-full px-4 py-3 border-2 border-teal-300 dark:border-teal-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-2xl font-bold" />
          </div>

          <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/30 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800">
            <div class="text-center mb-4">
              <div class="text-4xl mb-2">🌡️</div>
              <div class="text-lg font-bold text-gray-900 dark:text-white">Fahrenheit (°F)</div>
            </div>
            <input v-model="fahrenheit" @input="convertFromFahrenheit" type="number" step="0.1" class="w-full px-4 py-3 border-2 border-orange-300 dark:border-orange-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-2xl font-bold" />
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
            <div class="text-center mb-4">
              <div class="text-4xl mb-2">❄️</div>
              <div class="text-lg font-bold text-gray-900 dark:text-white">Kelvin (K)</div>
            </div>
            <input v-model="kelvin" @input="convertFromKelvin" type="number" step="0.1" class="w-full px-4 py-3 border-2 border-blue-300 dark:border-blue-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-2xl font-bold" />
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button v-for="ref in referenciasTemperatura" :key="ref.nome" @click="usarReferencia(ref.celsius)" class="p-3 bg-gray-50 dark:bg-gray-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors text-left">
            <div class="text-xs text-gray-600 dark:text-gray-400">{{ ref.nome }}</div>
            <div class="font-bold text-teal-600 dark:text-teal-400 text-sm">{{ ref.celsius }}°C</div>
          </button>
        </div>

        <div class="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-teal-600 dark:text-teal-400 mt-1 mr-3"></i>
            <div class="text-sm text-teal-800 dark:text-teal-300">
              <p class="font-semibold mb-2">Fórmulas de conversão:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Celsius para Fahrenheit:</strong> °F = (°C × 9/5) + 32</li>
                <li><strong>Fahrenheit para Celsius:</strong> °C = (°F - 32) × 5/9</li>
                <li><strong>Celsius para Kelvin:</strong> K = °C + 273.15</li>
                <li><strong>Kelvin para Celsius:</strong> °C = K - 273.15</li>
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

const celsius = ref(0)
const fahrenheit = ref(32)
const kelvin = ref(273.15)

const referenciasTemperatura = [
  { nome: 'Água congela', celsius: 0 },
  { nome: 'Temperatura ambiente', celsius: 25 },
  { nome: 'Temperatura corporal', celsius: 36.5 },
  { nome: 'Água ferve', celsius: 100 },
  { nome: 'Zero absoluto', celsius: -273.15 },
  { nome: 'Febre', celsius: 38 },
  { nome: 'Dia quente', celsius: 35 },
  { nome: 'Dia frio', celsius: 10 }
]

const convertFromCelsius = () => {
  const c = Number(celsius.value) || 0
  fahrenheit.value = ((c * 9/5) + 32).toFixed(2)
  kelvin.value = (c + 273.15).toFixed(2)
  trackToolUsage('Conversor Temperatura', 'convert', { from: 'celsius' })
}

const convertFromFahrenheit = () => {
  const f = Number(fahrenheit.value) || 0
  celsius.value = ((f - 32) * 5/9).toFixed(2)
  kelvin.value = (Number(celsius.value) + 273.15).toFixed(2)
  trackToolUsage('Conversor Temperatura', 'convert', { from: 'fahrenheit' })
}

const convertFromKelvin = () => {
  const k = Number(kelvin.value) || 0
  celsius.value = (k - 273.15).toFixed(2)
  fahrenheit.value = ((Number(celsius.value) * 9/5) + 32).toFixed(2)
  trackToolUsage('Conversor Temperatura', 'convert', { from: 'kelvin' })
}

const usarReferencia = (valorCelsius) => {
  celsius.value = valorCelsius
  convertFromCelsius()
}
</script>
