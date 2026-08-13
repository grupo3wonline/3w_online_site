<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-4">
          <i class="fas fa-piggy-bank text-sky-600 dark:text-sky-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Poupança</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule rendimentos da caderneta de poupança</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="valorInicial" label="Valor Inicial (R$)" type="number" :min="0" step="100" icon="fa-solid fa-money-bill" />
          <BaseInput v-model="aporteMensal" label="Aporte Mensal (R$)" type="number" :min="0" step="50" icon="fa-solid fa-calendar-plus" />
          <BaseInput v-model="meses" label="Período (meses)" type="number" :min="1" :max="360" icon="fa-solid fa-clock" />
          <BaseInput v-model="taxaSelic" label="Taxa Selic Anual (%)" type="number" :min="0" :max="20" step="0.25" icon="fa-solid fa-chart-line" />
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Rendimento
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Saldo Final</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.saldoFinal }}</div>
            <div class="text-sky-100">Após {{ meses }} meses</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-sky-600 dark:text-sky-400">R$ {{ resultado.totalInvestido }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Investido</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.totalJuros }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Rendimento</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-sky-600 dark:text-sky-400">{{ resultado.rentabilidadePercentual }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Rentabilidade</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-sky-600 dark:text-sky-400">{{ resultado.taxaMensal }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Taxa Mensal</div>
            </div>
          </div>

          <div class="bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-sky-600 dark:text-sky-400 mt-1 mr-3"></i>
              <div class="text-sm text-sky-800 dark:text-sky-300">
                <p class="font-semibold mb-2">Regras da Poupança (2025):</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li v-if="Number(taxaSelic) > 8.5"><strong>Selic acima de 8,5%:</strong> Rendimento = 0,5% ao mês + TR</li>
                  <li v-else><strong>Selic igual ou abaixo de 8,5%:</strong> Rendimento = 70% da Selic + TR</li>
                  <li>Aniversário mensal: rendimento só cai no dia do depósito</li>
                  <li>Isento de Imposto de Renda</li>
                  <li>Garantido pelo FGC até R$ 250.000 por CPF</li>
                </ul>
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

const valorInicial = ref(5000)
const aporteMensal = ref(500)
const meses = ref(24)
const taxaSelic = ref(11.25)
const resultado = ref(null)

const calcular = () => {
  const inicial = Number(valorInicial.value)
  const aporte = Number(aporteMensal.value)
  const periodoMeses = Number(meses.value)
  const selic = Number(taxaSelic.value)
  
  let taxaMensalPoup = 0
  if (selic > 8.5) {
    taxaMensalPoup = 0.5
  } else {
    taxaMensalPoup = (selic / 100) * 0.70 / 12 * 100
  }
  
  const taxaMensalDecimal = taxaMensalPoup / 100
  
  let saldo = inicial
  const totalInvestido = inicial + (aporte * periodoMeses)
  
  for (let i = 0; i < periodoMeses; i++) {
    saldo = saldo * (1 + taxaMensalDecimal) + aporte
  }
  
  const totalJuros = saldo - totalInvestido
  const rentabilidadePercentual = ((saldo / totalInvestido - 1) * 100)

  resultado.value = {
    saldoFinal: saldo.toFixed(2),
    totalInvestido: totalInvestido.toFixed(2),
    totalJuros: totalJuros.toFixed(2),
    rentabilidadePercentual: rentabilidadePercentual.toFixed(2),
    taxaMensal: taxaMensalPoup.toFixed(3)
  }

  trackToolUsage('Simulador Poupança', 'calculate')
}
</script>
