<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <i class="fas fa-calendar-check text-green-600 dark:text-green-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de 13º Salário</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o valor do seu 13º salário</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="salarioBruto" label="Salário Bruto (R$)" type="number" :min="0" step="100" icon="fa-solid fa-money-bill" />
          <BaseInput v-model="mesesTrabalhados" label="Meses Trabalhados no Ano" type="number" :min="1" :max="12" icon="fa-solid fa-calendar-days" />
        </div>

        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="parcela = 1" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="parcela === 1 ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <div class="font-bold mb-1">1ª Parcela</div>
            <div class="text-xs">Até 30 de novembro</div>
          </button>
          <button @click="parcela = 2" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="parcela === 2 ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <div class="font-bold mb-1">2ª Parcela</div>
            <div class="text-xs">Até 20 de dezembro</div>
          </button>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular 13º Salário
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">{{ parcela === 1 ? '1ª Parcela (Bruta)' : '2ª Parcela (Líquida)' }}</div>
            <div class="text-5xl font-bold mb-2">R$ {{ parcela === 1 ? resultado.primeiraParcela : resultado.segundaParcela }}</div>
            <div class="text-green-100">{{ mesesTrabalhados }}/12 meses trabalhados</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.decimoTerceiroBruto }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">13º Bruto</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.inss }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">INSS</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.irrf }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">IRRF</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.decimoTerceiroLiquido }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Líquido</div>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-green-600 dark:text-green-400 mt-1 mr-3"></i>
              <div class="text-sm text-green-800 dark:text-green-300">
                <p class="font-semibold mb-2">Como funciona o 13º:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li><strong>1ª Parcela:</strong> 50% do salário bruto (sem descontos) - paga até 30/11</li>
                  <li><strong>2ª Parcela:</strong> Restante com descontos de INSS e IRRF - paga até 20/12</li>
                  <li>Proporcional a {{ mesesTrabalhados }}/12 meses trabalhados no ano</li>
                  <li>Meses com 15 dias ou mais de trabalho contam como mês completo</li>
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
const mesesTrabalhados = ref(12)
const parcela = ref(1)
const resultado = ref(null)

const calcular = () => {
  const salario = Number(salarioBruto.value)
  const meses = Number(mesesTrabalhados.value)
  
  const decimoTerceiroBruto = (salario / 12) * meses
  
  // INSS sobre 13º
  let inss = 0
  if (decimoTerceiroBruto <= 1412) {
    inss = decimoTerceiroBruto * 0.075
  } else if (decimoTerceiroBruto <= 2666.68) {
    inss = 1412 * 0.075 + (decimoTerceiroBruto - 1412) * 0.09
  } else if (decimoTerceiroBruto <= 4000.03) {
    inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (decimoTerceiroBruto - 2666.68) * 0.12
  } else if (decimoTerceiroBruto <= 7786.02) {
    inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (decimoTerceiroBruto - 4000.03) * 0.14
  } else {
    inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14
  }
  
  // Base IRRF
  const baseIRRF = decimoTerceiroBruto - inss
  
  // IRRF sobre 13º
  let irrf = 0
  if (baseIRRF > 2259.2) {
    if (baseIRRF <= 2826.65) {
      irrf = baseIRRF * 0.075 - 169.44
    } else if (baseIRRF <= 3751.05) {
      irrf = baseIRRF * 0.15 - 381.44
    } else if (baseIRRF <= 4664.68) {
      irrf = baseIRRF * 0.225 - 662.77
    } else {
      irrf = baseIRRF * 0.275 - 896
    }
  }
  
  const decimoTerceiroLiquido = decimoTerceiroBruto - inss - irrf
  const primeiraParcela = decimoTerceiroBruto / 2
  const segundaParcela = decimoTerceiroLiquido - primeiraParcela

  resultado.value = {
    decimoTerceiroBruto: decimoTerceiroBruto.toFixed(2),
    inss: inss.toFixed(2),
    irrf: irrf.toFixed(2),
    decimoTerceiroLiquido: decimoTerceiroLiquido.toFixed(2),
    primeiraParcela: primeiraParcela.toFixed(2),
    segundaParcela: segundaParcela.toFixed(2)
  }

  trackToolUsage('Simulador 13º Salário', 'calculate')
}
</script>
