<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
          <i class="fas fa-bolt text-yellow-600 dark:text-yellow-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Energia</h1>
        <p class="text-gray-600 dark:text-gray-400">Energia Cinética e Potencial Gravitacional</p>
      </div>

      <div class="space-y-6">
        <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tipo de Energia</label>
          <div class="grid grid-cols-2 gap-4">
            <button @click="tipoEnergia = 'cinetica'"
              :class="['p-6 rounded-lg border-2', tipoEnergia === 'cinetica' ? 'border-yellow-600 bg-yellow-50 dark:bg-yellow-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i :class="['fas fa-running text-3xl mb-2', tipoEnergia === 'cinetica' ? 'text-yellow-600' : 'text-gray-400']"></i>
              <div :class="['font-medium', tipoEnergia === 'cinetica' ? 'text-yellow-900 dark:text-yellow-300' : 'text-gray-600']">
                Energia Cinética
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Ec = ½mv²</div>
            </button>

            <button @click="tipoEnergia = 'potencial'"
              :class="['p-6 rounded-lg border-2', tipoEnergia === 'potencial' ? 'border-yellow-600 bg-yellow-50 dark:bg-yellow-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i :class="['fas fa-mountain text-3xl mb-2', tipoEnergia === 'potencial' ? 'text-yellow-600' : 'text-gray-400']"></i>
              <div :class="['font-medium', tipoEnergia === 'potencial' ? 'text-yellow-900 dark:text-yellow-300' : 'text-gray-600']">
                Energia Potencial
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Ep = mgh</div>
            </button>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div v-if="tipoEnergia === 'cinetica'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="massa" label="Massa (kg)" type="number" step="0.01" />
            <BaseInput v-model="velocidade" label="Velocidade (m/s)" type="number" step="0.01" />
          </div>

          <div v-if="tipoEnergia === 'potencial'" class="grid md:grid-cols-3 gap-4">
            <BaseInput v-model="massa" label="Massa (kg)" type="number" step="0.01" />
            <BaseInput v-model="gravidade" label="Gravidade (m/s²)" type="number" step="0.01" />
            <BaseInput v-model="altura" label="Altura (m)" type="number" step="0.01" />
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular Energia
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-8">
            <div class="text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {{ tipoEnergia === 'cinetica' ? 'Energia Cinética' : 'Energia Potencial Gravitacional' }}
              </div>
              <div class="text-5xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {{ resultado.toFixed(2) }} J
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Joules</div>
              
              <div class="grid grid-cols-3 gap-4 mt-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div class="text-xs text-gray-500 dark:text-gray-400">Quilojoules</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ (resultado / 1000).toFixed(3) }} kJ</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div class="text-xs text-gray-500 dark:text-gray-400">Calorias</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ (resultado / 4.184).toFixed(2) }} cal</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div class="text-xs text-gray-500 dark:text-gray-400">Watt-hora</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ (resultado / 3600).toFixed(4) }} Wh</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Cálculo</h4>
            <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p><strong>Fórmula:</strong> {{ formula }}</p>
              <p><strong>Cálculo:</strong> {{ explicacao }}</p>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
            <div class="text-sm text-yellow-800 dark:text-yellow-300">
              <p class="font-semibold mb-1">Energia Cinética</p>
              <p class="text-xs">Energia associada ao movimento de um corpo. Depende da massa e da velocidade.</p>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
            <div class="text-sm text-green-800 dark:text-green-300">
              <p class="font-semibold mb-1">Energia Potencial</p>
              <p class="text-xs">Energia armazenada devido à posição. Depende da massa, gravidade e altura.</p>
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

const tipoEnergia = ref('cinetica')
const massa = ref(10)
const velocidade = ref(20)
const gravidade = ref(9.8)
const altura = ref(5)
const calculado = ref(false)
const resultado = ref(0)
const formula = ref('')
const explicacao = ref('')

const calcular = () => {
  if (tipoEnergia.value === 'cinetica') {
    resultado.value = 0.5 * Number(massa.value) * Math.pow(Number(velocidade.value), 2)
    formula.value = 'Ec = ½mv²'
    explicacao.value = `½ × ${massa.value} × ${velocidade.value}² = ${resultado.value.toFixed(2)} J`
  } else {
    resultado.value = Number(massa.value) * Number(gravidade.value) * Number(altura.value)
    formula.value = 'Ep = mgh'
    explicacao.value = `${massa.value} × ${gravidade.value} × ${altura.value} = ${resultado.value.toFixed(2)} J`
  }

  calculado.value = true
  trackToolUsage('Calculadora Energia', 'calculate', { type: tipoEnergia.value })
}
</script>
