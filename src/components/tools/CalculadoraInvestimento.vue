<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <i class="fas fa-chart-line text-green-600 dark:text-green-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Investimento</h1>
        <p class="text-gray-600 dark:text-gray-400">Simule rendimentos de investimentos</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="valorInicial" label="Valor Inicial (R$)" type="number" :min="0" step="100" icon="fa-solid fa-dollar-sign" />
          <BaseInput v-model="aporteMensal" label="Aporte Mensal (R$)" type="number" :min="0" step="50" icon="fa-solid fa-money-bill-transfer" />
          <BaseInput v-model="taxaJuros" label="Taxa de Juros (% ao ano)" type="number" :min="0" step="0.1" icon="fa-solid fa-percent" />
          <BaseInput v-model="prazoMeses" label="Prazo (meses)" type="number" :min="1" :max="600" icon="fa-solid fa-calendar" />
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-chart-line mr-2"></i>
          Simular Investimento
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Montante Final</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.montanteFinal }}</div>
            <div class="text-green-100">{{ resultado.rentabilidade }}% de rentabilidade</div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.totalInvestido }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Investido</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.totalJuros }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Rendimento</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ prazoMeses }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Meses</div>
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

const valorInicial = ref(10000)
const aporteMensal = ref(500)
const taxaJuros = ref(10)
const prazoMeses = ref(60)
const resultado = ref(null)

const calcular = () => {
  const inicial = Number(valorInicial.value)
  const aporte = Number(aporteMensal.value)
  const taxa = Number(taxaJuros.value) / 100 / 12
  const meses = Number(prazoMeses.value)

  const montante = inicial * Math.pow(1 + taxa, meses) + aporte * ((Math.pow(1 + taxa, meses) - 1) / taxa)
  const totalInvestido = inicial + (aporte * meses)
  const totalJuros = montante - totalInvestido
  const rentabilidade = ((montante / totalInvestido - 1) * 100)

  resultado.value = {
    montanteFinal: montante.toFixed(2),
    totalInvestido: totalInvestido.toFixed(2),
    totalJuros: totalJuros.toFixed(2),
    rentabilidade: rentabilidade.toFixed(2)
  }

  trackToolUsage('Calculadora Investimento', 'calculate')
}
</script>
