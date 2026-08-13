<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <i class="fas fa-arrows-alt text-red-600 dark:text-red-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Força</h1>
        <p class="text-gray-600 dark:text-gray-400">2ª Lei de Newton: F = m × a</p>
      </div>

      <div class="space-y-6">
        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">O que deseja calcular?</label>
          <div class="grid grid-cols-3 gap-3">
            <button v-for="modo in modos" :key="modo.id" @click="modoCalculo = modo.id"
              :class="['p-4 rounded-lg border-2', modoCalculo === modo.id ? 'border-red-600 bg-red-50 dark:bg-red-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i :class="[modo.icon, 'text-2xl mb-2', modoCalculo === modo.id ? 'text-red-600' : 'text-gray-400']"></i>
              <div :class="['text-xs font-medium', modoCalculo === modo.id ? 'text-red-900 dark:text-red-300' : 'text-gray-600']">
                {{ modo.nome }}
              </div>
            </button>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div v-if="modoCalculo === 'forca'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="massa" label="Massa (kg)" type="number" step="0.01" />
            <BaseInput v-model="aceleracao" label="Aceleração (m/s²)" type="number" step="0.01" />
          </div>

          <div v-if="modoCalculo === 'massa'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="forca" label="Força (N)" type="number" step="0.01" />
            <BaseInput v-model="aceleracao" label="Aceleração (m/s²)" type="number" step="0.01" />
          </div>

          <div v-if="modoCalculo === 'aceleracao'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="forca" label="Força (N)" type="number" step="0.01" />
            <BaseInput v-model="massa" label="Massa (kg)" type="number" step="0.01" />
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <div class="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg p-8">
            <div class="text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ getTitulo() }}</div>
              <div class="text-5xl font-bold text-red-600 dark:text-red-400 mb-4">
                {{ resultado.toFixed(2) }} {{ getUnidade() }}
              </div>
              
              <div class="grid md:grid-cols-3 gap-4 mt-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Força (F)</div>
                  <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                    {{ (modoCalculo === 'forca' ? resultado : Number(forca)).toFixed(2) }} N
                  </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Massa (m)</div>
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {{ (modoCalculo === 'massa' ? resultado : Number(massa)).toFixed(2) }} kg
                  </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Aceleração (a)</div>
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                    {{ (modoCalculo === 'aceleracao' ? resultado : Number(aceleracao)).toFixed(2) }} m/s²
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Cálculo Detalhado</h4>
            <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p><strong>Fórmula:</strong> F = m × a</p>
              <p><strong>Cálculo:</strong> {{ explicacao }}</p>
            </div>
          </div>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-red-600 dark:text-red-400 mt-1 mr-3"></i>
            <div class="text-sm text-red-800 dark:text-red-300">
              <p class="font-semibold mb-2">2ª Lei de Newton</p>
              <p class="text-xs">A força resultante sobre um objeto é igual ao produto da sua massa pela aceleração. 
              A unidade de força no SI é o Newton (N), onde 1 N = 1 kg⋅m/s².</p>
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
  { id: 'forca', nome: 'Força (F)', icon: 'fas fa-arrow-right' },
  { id: 'massa', nome: 'Massa (m)', icon: 'fas fa-weight' },
  { id: 'aceleracao', nome: 'Aceleração (a)', icon: 'fas fa-tachometer-alt' }
]

const modoCalculo = ref('forca')
const forca = ref(10)
const massa = ref(2)
const aceleracao = ref(5)
const calculado = ref(false)
const resultado = ref(0)
const explicacao = ref('')

const calcular = () => {
  let valor = 0
  let exp = ''

  switch (modoCalculo.value) {
    case 'forca':
      valor = Number(massa.value) * Number(aceleracao.value)
      exp = `${massa.value} kg × ${aceleracao.value} m/s² = ${valor.toFixed(2)} N`
      break

    case 'massa':
      valor = Number(forca.value) / Number(aceleracao.value)
      exp = `${forca.value} N ÷ ${aceleracao.value} m/s² = ${valor.toFixed(2)} kg`
      break

    case 'aceleracao':
      valor = Number(forca.value) / Number(massa.value)
      exp = `${forca.value} N ÷ ${massa.value} kg = ${valor.toFixed(2)} m/s²`
      break
  }

  resultado.value = valor
  explicacao.value = exp
  calculado.value = true
  trackToolUsage('Calculadora Forca', 'calculate', { mode: modoCalculo.value })
}

const getTitulo = () => {
  const titulos = { forca: 'Força', massa: 'Massa', aceleracao: 'Aceleração' }
  return titulos[modoCalculo.value]
}

const getUnidade = () => {
  const unidades = { forca: 'N', massa: 'kg', aceleracao: 'm/s²' }
  return unidades[modoCalculo.value]
}
</script>
