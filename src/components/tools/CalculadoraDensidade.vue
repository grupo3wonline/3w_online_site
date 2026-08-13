<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
          <i class="fas fa-cube text-teal-600 dark:text-teal-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Densidade</h1>
        <p class="text-gray-600 dark:text-gray-400">d = m / V</p>
      </div>

      <div class="space-y-6">
        <div class="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">O que deseja calcular?</label>
          <div class="grid grid-cols-3 gap-3">
            <button v-for="modo in modos" :key="modo.id" @click="modoCalculo = modo.id"
              :class="['p-4 rounded-lg border-2', modoCalculo === modo.id ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i :class="[modo.icon, 'text-2xl mb-2', modoCalculo === modo.id ? 'text-teal-600' : 'text-gray-400']"></i>
              <div :class="['text-xs font-medium', modoCalculo === modo.id ? 'text-teal-900 dark:text-teal-300' : 'text-gray-600']">
                {{ modo.nome }}
              </div>
            </button>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div v-if="modoCalculo === 'densidade'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="massa" label="Massa (g)" type="number" step="0.01" />
            <BaseInput v-model="volume" label="Volume (cm³)" type="number" step="0.01" />
          </div>

          <div v-if="modoCalculo === 'massa'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="densidade" label="Densidade (g/cm³)" type="number" step="0.001" />
            <BaseInput v-model="volume" label="Volume (cm³)" type="number" step="0.01" />
          </div>

          <div v-if="modoCalculo === 'volume'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="massa" label="Massa (g)" type="number" step="0.01" />
            <BaseInput v-model="densidade" label="Densidade (g/cm³)" type="number" step="0.001" />
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <div class="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-lg p-8">
            <div class="text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ getTitulo() }}</div>
              <div class="text-5xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                {{ resultado.toFixed(3) }} {{ getUnidade() }}
              </div>
              
              <div class="grid md:grid-cols-3 gap-4 mt-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Densidade (d)</div>
                  <div class="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {{ (modoCalculo === 'densidade' ? resultado : Number(densidade)).toFixed(3) }} g/cm³
                  </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Massa (m)</div>
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {{ (modoCalculo === 'massa' ? resultado : Number(massa)).toFixed(2) }} g
                  </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Volume (V)</div>
                  <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {{ (modoCalculo === 'volume' ? resultado : Number(volume)).toFixed(2) }} cm³
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Cálculo Detalhado</h4>
            <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p><strong>Fórmula:</strong> d = m / V</p>
              <p><strong>Cálculo:</strong> {{ explicacao }}</p>
            </div>
          </div>

          <div class="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
            <h5 class="font-semibold text-teal-900 dark:text-teal-300 mb-3 text-sm">Densidades Comuns (g/cm³)</h5>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div class="bg-white dark:bg-gray-800 rounded p-2">
                <div class="font-semibold text-gray-900 dark:text-white">Água</div>
                <div class="text-teal-600 dark:text-teal-400">1,00</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded p-2">
                <div class="font-semibold text-gray-900 dark:text-white">Alumínio</div>
                <div class="text-teal-600 dark:text-teal-400">2,70</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded p-2">
                <div class="font-semibold text-gray-900 dark:text-white">Ferro</div>
                <div class="text-teal-600 dark:text-teal-400">7,87</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded p-2">
                <div class="font-semibold text-gray-900 dark:text-white">Ouro</div>
                <div class="text-teal-600 dark:text-teal-400">19,30</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-teal-600 dark:text-teal-400 mt-1 mr-3"></i>
            <div class="text-sm text-teal-800 dark:text-teal-300">
              <p class="font-semibold mb-1">O que é densidade?</p>
              <p class="text-xs">Densidade é a relação entre massa e volume de um material. Quanto maior a densidade, mais "pesado" é o material para o mesmo volume.</p>
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

const modos = [
  { id: 'densidade', nome: 'Densidade', icon: 'fas fa-weight-hanging' },
  { id: 'massa', nome: 'Massa', icon: 'fas fa-balance-scale' },
  { id: 'volume', nome: 'Volume', icon: 'fas fa-cube' }
]

const modoCalculo = ref('densidade')
const densidade = ref(1)
const massa = ref(100)
const volume = ref(100)
const calculado = ref(false)
const resultado = ref(0)
const explicacao = ref('')

const calcular = () => {
  let valor = 0
  let exp = ''

  switch (modoCalculo.value) {
    case 'densidade':
      valor = Number(massa.value) / Number(volume.value)
      exp = `${massa.value} g ÷ ${volume.value} cm³ = ${valor.toFixed(3)} g/cm³`
      break

    case 'massa':
      valor = Number(densidade.value) * Number(volume.value)
      exp = `${densidade.value} g/cm³ × ${volume.value} cm³ = ${valor.toFixed(2)} g`
      break

    case 'volume':
      valor = Number(massa.value) / Number(densidade.value)
      exp = `${massa.value} g ÷ ${densidade.value} g/cm³ = ${valor.toFixed(2)} cm³`
      break
  }

  resultado.value = valor
  explicacao.value = exp
  calculado.value = true
  trackToolUsage('Calculadora Densidade', 'calculate', { mode: modoCalculo.value })
}

const getTitulo = () => {
  const titulos = { densidade: 'Densidade', massa: 'Massa', volume: 'Volume' }
  return titulos[modoCalculo.value]
}

const getUnidade = () => {
  const unidades = { densidade: 'g/cm³', massa: 'g', volume: 'cm³' }
  return unidades[modoCalculo.value]
}
</script>
