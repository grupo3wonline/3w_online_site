<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
          <i class="fas fa-money-bill-trend-up text-emerald-600 dark:text-emerald-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de ROI</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o Retorno sobre Investimento</p>
      </div>

      <div class="space-y-6">
        <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="investimentoInicial" label="Investimento Inicial (R$)" type="number" step="0.01" />
            <BaseInput v-model="ganhoObtido" label="Ganho Obtido (R$)" type="number" step="0.01" />
          </div>
          <BaseInput v-model="custosAdicionais" label="Custos Adicionais (R$)" type="number" step="0.01" />
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular ROI
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-lg p-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">ROI (%)</div>
              <div :class="['text-4xl font-bold', resultado.roi >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400']">
                {{ resultado.roi.toFixed(2) }}%
              </div>
            </div>
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg p-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Lucro Líquido</div>
              <div :class="['text-4xl font-bold', resultado.lucro >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400']">
                {{ formatarMoeda(resultado.lucro) }}
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Análise Detalhada</h4>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Investimento Total:</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatarMoeda(resultado.investimentoTotal) }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Retorno Bruto:</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatarMoeda(ganhoObtido) }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="text-gray-600 dark:text-gray-400">Lucro Líquido:</span>
                <span :class="['font-semibold', resultado.lucro >= 0 ? 'text-emerald-600' : 'text-red-600']">
                  {{ formatarMoeda(resultado.lucro) }}
                </span>
              </div>
            </div>
          </div>

          <div :class="[
            'border-l-4 p-4 rounded',
            resultado.roi >= 20 ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500' :
            resultado.roi >= 0 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' :
            'bg-red-50 dark:bg-red-900/20 border-red-500'
          ]">
            <div class="flex">
              <i :class="[
                'mt-1 mr-3',
                resultado.roi >= 20 ? 'fas fa-check-circle text-emerald-600' :
                resultado.roi >= 0 ? 'fas fa-info-circle text-blue-600' :
                'fas fa-times-circle text-red-600'
              ]"></i>
              <div class="text-sm">
                <p class="font-semibold mb-1">{{ obterAnalise().titulo }}</p>
                <p class="text-xs">{{ obterAnalise().descricao }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-4">
          <div class="flex">
            <i class="fas fa-lightbulb text-emerald-600 dark:text-emerald-400 mt-1 mr-3"></i>
            <div class="text-sm text-emerald-800 dark:text-emerald-300">
              <p class="font-semibold mb-2">Fórmula do ROI:</p>
              <p class="text-xs font-mono mb-2">ROI = ((Ganho - Investimento) / Investimento) × 100</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li>ROI positivo = investimento lucrativo</li>
                <li>ROI > 20% = excelente retorno</li>
                <li>ROI negativo = prejuízo</li>
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

const investimentoInicial = ref(10000)
const ganhoObtido = ref(15000)
const custosAdicionais = ref(0)
const calculado = ref(false)
const resultado = ref({
  roi: 0,
  lucro: 0,
  investimentoTotal: 0
})

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}

const calcular = () => {
  const investTotal = Number(investimentoInicial.value) + Number(custosAdicionais.value)
  const ganho = Number(ganhoObtido.value)
  const lucro = ganho - investTotal
  const roi = (lucro / investTotal) * 100

  resultado.value = {
    roi,
    lucro,
    investimentoTotal: investTotal
  }

  calculado.value = true
  trackToolUsage('Calculadora ROI', 'calculate')
}

const obterAnalise = () => {
  const roi = resultado.value.roi
  if (roi >= 20) return {
    titulo: 'Excelente ROI!',
    descricao: 'Seu investimento está tendo um retorno muito acima da média. Continue monitorando.'
  }
  if (roi >= 0) return {
    titulo: 'ROI Positivo',
    descricao: 'Investimento está gerando lucro, mas há espaço para otimização.'
  }
  return {
    titulo: 'ROI Negativo - Prejuízo',
    descricao: 'O investimento não está retornando o esperado. Reavalie a estratégia.'
  }
}
</script>
