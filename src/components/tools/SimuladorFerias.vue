<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
          <i class="fas fa-plane text-cyan-600 dark:text-cyan-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Férias</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o valor das suas férias</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="salarioBruto" label="Salário Bruto (R$)" type="number" :min="0" step="100" icon="fa-solid fa-money-bill" />
          <BaseInput v-model="diasFerias" label="Dias de Férias" type="number" :min="1" :max="30" icon="fa-solid fa-calendar-days" />
        </div>

        <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <input type="checkbox" id="venderFerias" v-model="venderFerias" class="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500">
          <label for="venderFerias" class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            Vender 10 dias de férias (abono pecuniário)
          </label>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Férias
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Valor Total das Férias</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.valorTotal }}</div>
            <div class="text-cyan-100">{{ diasFerias }} dias de férias</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">R$ {{ resultado.valorFerias }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Valor Férias</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">R$ {{ resultado.tercoFerias }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">1/3 Férias</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">R$ {{ resultado.abonoPecuniario }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Abono</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">R$ {{ resultado.descontoINSS }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">INSS</div>
            </div>
          </div>

          <div class="bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 p-4">
            <div class="text-sm text-cyan-800 dark:text-cyan-300">
              <p class="font-semibold mb-2">Composição do Valor:</p>
              <ul class="list-disc list-inside space-y-1">
                <li>Valor das férias proporcional aos dias</li>
                <li>Adicional de 1/3 constitucional (obrigatório)</li>
                <li v-if="venderFerias">Abono pecuniário de 10 dias vendidos</li>
                <li>Desconto de INSS aplicado sobre o total</li>
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
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const salarioBruto = ref(3000)
const diasFerias = ref(30)
const venderFerias = ref(false)
const resultado = ref(null)

const calcular = () => {
  const salario = Number(salarioBruto.value)
  const dias = Number(diasFerias.value)
  
  let valorFerias = (salario / 30) * dias
  let abono = 0
  
  if (venderFerias.value) {
    abono = (salario / 30) * 10
    valorFerias = (salario / 30) * (dias - 10)
  }
  
  const terco = (valorFerias + abono) / 3
  const totalBruto = valorFerias + terco + abono
  const inss = totalBruto * 0.11
  const valorLiquido = totalBruto - inss

  resultado.value = {
    valorFerias: valorFerias.toFixed(2),
    tercoFerias: terco.toFixed(2),
    abonoPecuniario: abono.toFixed(2),
    descontoINSS: inss.toFixed(2),
    valorTotal: valorLiquido.toFixed(2)
  }

  trackToolUsage('Simulador Férias', 'calculate')
}
</script>
