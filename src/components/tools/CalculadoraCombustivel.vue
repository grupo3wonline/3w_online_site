<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
          <i class="fas fa-gas-pump text-orange-600 dark:text-orange-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Combustível</h1>
        <p class="text-gray-600 dark:text-gray-400">Compare álcool vs gasolina</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="precoGasolina" label="Preço da Gasolina (R$/L)" type="number" step="0.01" icon="fa-solid fa-gas-pump" />
          <BaseInput v-model="precoAlcool" label="Preço do Álcool (R$/L)" type="number" step="0.01" icon="fa-solid fa-gas-pump" />
          <BaseInput v-model="consumoGasolina" label="Consumo com Gasolina (km/L)" type="number" step="0.1" icon="fa-solid fa-gauge" />
          <BaseInput v-model="consumoAlcool" label="Consumo com Álcool (km/L)" type="number" step="0.1" icon="fa-solid fa-gauge" />
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Comparar
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Recomendação</div>
            <div class="text-4xl font-bold mb-2">{{ resultado.recomendacao }}</div>
            <div class="text-orange-100">Economia de R$ {{ resultado.economia }} por km</div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="text-center mb-2">
                <div class="text-xl font-bold text-gray-900 dark:text-white">Gasolina</div>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Custo por km:</span>
                  <span class="font-semibold">R$ {{ resultado.custoPorKmGasolina }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">100 km:</span>
                  <span class="font-semibold">R$ {{ resultado.custo100kmGasolina }}</span>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="text-center mb-2">
                <div class="text-xl font-bold text-gray-900 dark:text-white">Álcool</div>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Custo por km:</span>
                  <span class="font-semibold">R$ {{ resultado.custoPorKmAlcool }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">100 km:</span>
                  <span class="font-semibold">R$ {{ resultado.custo100kmAlcool }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const precoGasolina = ref(5.50)
const precoAlcool = ref(3.80)
const consumoGasolina = ref(12)
const consumoAlcool = ref(8.5)
const resultado = ref(null)

const calcular = () => {
  const custoPorKmGas = Number(precoGasolina.value) / Number(consumoGasolina.value)
  const custoPorKmAlc = Number(precoAlcool.value) / Number(consumoAlcool.value)
  
  resultado.value = {
    custoPorKmGasolina: custoPorKmGas.toFixed(3),
    custoPorKmAlcool: custoPorKmAlc.toFixed(3),
    custo100kmGasolina: (custoPorKmGas * 100).toFixed(2),
    custo100kmAlcool: (custoPorKmAlc * 100).toFixed(2),
    recomendacao: custoPorKmGas < custoPorKmAlc ? 'Use Gasolina' : 'Use Álcool',
    economia: Math.abs(custoPorKmGas - custoPorKmAlc).toFixed(3)
  }

  trackToolUsage('Calculadora Combustível', 'calculate')
}
</script>
