<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
          <i class="fas fa-money-bill-wave text-teal-600 dark:text-teal-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Salário</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule salário líquido com todos os descontos</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="salarioBruto" label="Salário Bruto (R$)" type="number" :min="0" step="100" icon="fa-solid fa-money-bill" />
          <BaseInput v-model="dependentes" label="Número de Dependentes" type="number" :min="0" :max="10" icon="fa-solid fa-users" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Descontos Adicionais (Opcional)</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput v-model="valeTransporte" label="Vale Transporte (R$)" type="number" :min="0" step="10" icon="fa-solid fa-bus" />
            <BaseInput v-model="planoSaude" label="Plano de Saúde (R$)" type="number" :min="0" step="10" icon="fa-solid fa-heart-pulse" />
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Salário Líquido
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Salário Líquido</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.salarioLiquido }}</div>
            <div class="text-teal-100">{{ resultado.percentualDesconto }}% de desconto total</div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">
              <i class="fas fa-list text-teal-600 dark:text-teal-400 mr-2"></i>
              Detalhamento dos Descontos
            </h3>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">Salário Bruto</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Valor antes dos descontos</div>
                </div>
                <div class="text-lg font-bold text-gray-900 dark:text-white">R$ {{ salarioBruto }}</div>
              </div>

              <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">INSS</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">{{ resultado.aliquotaINSS }}% sobre salário</div>
                </div>
                <div class="text-lg font-bold text-red-600 dark:text-red-400">- R$ {{ resultado.inss }}</div>
              </div>

              <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">IRRF</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Imposto de Renda</div>
                </div>
                <div class="text-lg font-bold text-red-600 dark:text-red-400">- R$ {{ resultado.irrf }}</div>
              </div>

              <div v-if="valeTransporte > 0" class="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">Vale Transporte</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">6% do salário (máx. R$ {{ valeTransporte }})</div>
                </div>
                <div class="text-lg font-bold text-red-600 dark:text-red-400">- R$ {{ resultado.descontoVT }}</div>
              </div>

              <div v-if="planoSaude > 0" class="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">Plano de Saúde</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Desconto mensal</div>
                </div>
                <div class="text-lg font-bold text-red-600 dark:text-red-400">- R$ {{ planoSaude }}</div>
              </div>

              <div class="flex items-center justify-between p-4 bg-teal-100 dark:bg-teal-900/30 rounded-lg border-2 border-teal-500">
                <div class="text-sm font-bold text-gray-900 dark:text-white">Total de Descontos</div>
                <div class="text-xl font-bold text-red-600 dark:text-red-400">- R$ {{ resultado.totalDescontos }}</div>
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

const salarioBruto = ref(3500)
const dependentes = ref(0)
const valeTransporte = ref(0)
const planoSaude = ref(0)
const resultado = ref(null)

const calcular = () => {
  const salario = Number(salarioBruto.value)
  const deps = Number(dependentes.value)
  
  // INSS 2025 (tabela progressiva)
  let inss = 0
  if (salario <= 1412) {
    inss = salario * 0.075
  } else if (salario <= 2666.68) {
    inss = 1412 * 0.075 + (salario - 1412) * 0.09
  } else if (salario <= 4000.03) {
    inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salario - 2666.68) * 0.12
  } else if (salario <= 7786.02) {
    inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salario - 4000.03) * 0.14
  } else {
    inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14
  }
  
  const aliquotaINSS = ((inss / salario) * 100).toFixed(2)
  
  // Base de cálculo IRRF
  const deducaoDependente = deps * 189.59
  const baseIRRF = salario - inss - deducaoDependente
  
  // IRRF 2025
  let irrf = 0
  if (baseIRRF > 2259.20) {
    if (baseIRRF <= 2826.65) {
      irrf = baseIRRF * 0.075 - 169.44
    } else if (baseIRRF <= 3751.05) {
      irrf = baseIRRF * 0.15 - 381.44
    } else if (baseIRRF <= 4664.68) {
      irrf = baseIRRF * 0.225 - 662.77
    } else {
      irrf = baseIRRF * 0.275 - 896.00
    }
  }
  
  // Vale transporte (6% do salário, mas não pode exceder o valor informado)
  const descontoVT = valeTransporte.value > 0 ? Math.min(salario * 0.06, Number(valeTransporte.value)) : 0
  
  const totalDescontos = inss + irrf + descontoVT + Number(planoSaude.value)
  const salarioLiquido = salario - totalDescontos
  const percentualDesconto = ((totalDescontos / salario) * 100).toFixed(2)

  resultado.value = {
    salarioLiquido: salarioLiquido.toFixed(2),
    inss: inss.toFixed(2),
    aliquotaINSS: aliquotaINSS,
    irrf: irrf.toFixed(2),
    descontoVT: descontoVT.toFixed(2),
    totalDescontos: totalDescontos.toFixed(2),
    percentualDesconto: percentualDesconto
  }

  trackToolUsage('Calculadora Salário', 'calculate')
}
</script>
