<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
          <i class="fas fa-gauge-high text-violet-600 dark:text-violet-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Velocidade</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule velocidade, distância e tempo</p>
      </div>

      <div class="space-y-6">
        <div class="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">O que deseja calcular?</label>
          <div class="grid md:grid-cols-3 gap-3">
            <button @click="calculo = 'velocidade'" :class="['p-4 rounded-lg border-2', calculo === 'velocidade' ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i class="fas fa-tachometer-alt text-2xl mb-2" :class="calculo === 'velocidade' ? 'text-violet-600' : 'text-gray-400'"></i>
              <div class="text-sm font-semibold">Velocidade</div>
            </button>
            <button @click="calculo = 'distancia'" :class="['p-4 rounded-lg border-2', calculo === 'distancia' ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i class="fas fa-road text-2xl mb-2" :class="calculo === 'distancia' ? 'text-violet-600' : 'text-gray-400'"></i>
              <div class="text-sm font-semibold">Distância</div>
            </button>
            <button @click="calculo = 'tempo'" :class="['p-4 rounded-lg border-2', calculo === 'tempo' ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i class="fas fa-clock text-2xl mb-2" :class="calculo === 'tempo' ? 'text-violet-600' : 'text-gray-400'"></i>
              <div class="text-sm font-semibold">Tempo</div>
            </button>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <div v-if="calculo === 'velocidade'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="distancia" label="Distância (km)" type="number" step="0.01" />
            <BaseInput v-model="tempo" label="Tempo (horas)" type="number" step="0.01" />
          </div>

          <div v-if="calculo === 'distancia'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="velocidade" label="Velocidade (km/h)" type="number" step="0.01" />
            <BaseInput v-model="tempo" label="Tempo (horas)" type="number" step="0.01" />
          </div>

          <div v-if="calculo === 'tempo'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="distancia" label="Distância (km)" type="number" step="0.01" />
            <BaseInput v-model="velocidade" label="Velocidade (km/h)" type="number" step="0.01" />
          </div>

          <p class="text-xs text-gray-500">
            <strong>Fórmula:</strong> V = D / T  •  D = V × T  •  T = D / V
          </p>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular {{ calculo.charAt(0).toUpperCase() + calculo.slice(1) }}
        </BaseButton>

        <div v-if="calculado" class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 rounded-lg p-8">
          <div class="text-center">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ getTitulo() }}</div>
            <div class="text-5xl font-bold text-violet-600 dark:text-violet-400 mb-2">
              {{ resultado.toFixed(2) }}
            </div>
            <div class="text-lg text-gray-700 dark:text-gray-300">{{ getUnidade() }}</div>
            
            <div class="mt-6 grid md:grid-cols-3 gap-4 text-sm">
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
                <div class="text-gray-500 dark:text-gray-400 mb-1">Velocidade</div>
                <div class="font-bold text-lg">{{ velocidade }} km/h</div>
              </div>
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
                <div class="text-gray-500 dark:text-gray-400 mb-1">Distância</div>
                <div class="font-bold text-lg">{{ distancia }} km</div>
              </div>
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
                <div class="text-gray-500 dark:text-gray-400 mb-1">Tempo</div>
                <div class="font-bold text-lg">{{ tempo }} h</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-violet-600 dark:text-violet-400 mt-1 mr-3"></i>
            <div class="text-sm text-violet-800 dark:text-violet-300">
              <p class="font-semibold mb-2">Fórmulas da Velocidade:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Velocidade:</strong> V = Distância / Tempo</li>
                <li><strong>Distância:</strong> D = Velocidade × Tempo</li>
                <li><strong>Tempo:</strong> T = Distância / Velocidade</li>
                <li>MRU (Movimento Retilíneo Uniforme)</li>
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
import BaseButton from './common/BaseButton.vue'
import BaseInput from './common/BaseInput.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const calculo = ref('velocidade')
const calculado = ref(false)
const resultado = ref(0)

const velocidade = ref(80)
const distancia = ref(160)
const tempo = ref(2)

const calcular = () => {
  switch (calculo.value) {
    case 'velocidade':
      velocidade.value = Number(distancia.value) / Number(tempo.value)
      resultado.value = velocidade.value
      break
    case 'distancia':
      distancia.value = Number(velocidade.value) * Number(tempo.value)
      resultado.value = distancia.value
      break
    case 'tempo':
      tempo.value = Number(distancia.value) / Number(velocidade.value)
      resultado.value = tempo.value
      break
  }
  
  calculado.value = true
  trackToolUsage('Calculadora Velocidade', 'calculate', { type: calculo.value })
}

const getTitulo = () => {
  const titulos = {
    velocidade: 'Velocidade',
    distancia: 'Distância',
    tempo: 'Tempo'
  }
  return titulos[calculo.value]
}

const getUnidade = () => {
  const unidades = {
    velocidade: 'km/h',
    distancia: 'quilômetros',
    tempo: 'horas'
  }
  return unidades[calculo.value]
}
</script>
