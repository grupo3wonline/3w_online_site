<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
          <i class="fas fa-piggy-bank text-emerald-600 dark:text-emerald-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de FGTS</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule saldo e rendimento do FGTS</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="salarioBruto" label="Salário Bruto (R$)" type="number" :min="0" step="100" icon="fa-solid fa-money-bill" />
          <BaseInput v-model="mesesTrabalhados" label="Meses Trabalhados" type="number" :min="1" :max="600" icon="fa-solid fa-calendar" />
          <BaseInput v-model="saldoAtual" label="Saldo Atual FGTS (R$)" type="number" :min="0" step="100" icon="fa-solid fa-piggy-bank" />
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Simular FGTS
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Saldo Projetado</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.saldoProjetado }}</div>
            <div class="text-emerald-100">Com rendimentos</div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.depositosMensais }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Depósito Mensal</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.totalDepositado }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Depositado</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.rendimentos }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Rendimentos</div>
            </div>
          </div>

          <div class="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-emerald-600 dark:text-emerald-400 mt-1 mr-3"></i>
              <div class="text-sm text-emerald-800 dark:text-emerald-300">
                <p class="font-semibold mb-2">Sobre o FGTS:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Empregador deposita 8% do salário bruto mensalmente</li>
                  <li>Rendimento de 3% ao ano + TR (Taxa Referencial)</li>
                  <li>Pode ser sacado em situações específicas (demissão sem justa causa, compra de imóvel, aposentadoria)</li>
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

const salarioBruto = ref(3000)
const mesesTrabalhados = ref(24)
const saldoAtual = ref(0)
const resultado = ref(null)

const calcular = () => {
  const salario = Number(salarioBruto.value)
  const meses = Number(mesesTrabalhados.value)
  const saldo = Number(saldoAtual.value)
  
  const depositoMensal = salario * 0.08
  const totalDepositado = depositoMensal * meses
  const rendimentoAnual = 0.03
  const rendimentoMensal = rendimentoAnual / 12
  
  let saldoFinal = saldo
  for (let i = 0; i < meses; i++) {
    saldoFinal = saldoFinal * (1 + rendimentoMensal) + depositoMensal
  }
  
  const rendimentos = saldoFinal - saldo - totalDepositado

  resultado.value = {
    depositosMensais: depositoMensal.toFixed(2),
    totalDepositado: totalDepositado.toFixed(2),
    rendimentos: rendimentos.toFixed(2),
    saldoProjetado: saldoFinal.toFixed(2)
  }

  trackToolUsage('Simulador FGTS', 'calculate')
}
</script>
