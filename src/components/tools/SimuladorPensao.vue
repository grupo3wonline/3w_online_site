<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
          <i class="fas fa-balance-scale text-emerald-600 dark:text-emerald-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Pensão Alimentícia</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o valor da pensão alimentícia</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Cálculo</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button @click="tipoCalculo = 'percentual'" class="p-4 rounded-lg border-2 transition-all" :class="tipoCalculo === 'percentual' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-percentage text-2xl mb-2 text-emerald-600 dark:text-emerald-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Percentual</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">% sobre renda</div>
            </button>
            <button @click="tipoCalculo = 'salario-minimo'" class="p-4 rounded-lg border-2 transition-all" :class="tipoCalculo === 'salario-minimo' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-coins text-2xl mb-2 text-emerald-600 dark:text-emerald-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Salário Mínimo</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Múltiplo do SM</div>
            </button>
          </div>
        </div>

        <div v-if="tipoCalculo === 'percentual'" class="space-y-4">
          <BaseInput v-model="rendaMensal" label="Renda Mensal (R$)" type="number" :min="0" step="100" icon="fa-solid fa-dollar-sign" />
          <BaseInput v-model="numeroFilhos" label="Número de Filhos" type="number" :min="1" :max="10" icon="fa-solid fa-users" />
          <BaseInput v-model="percentual" label="Percentual (%)" type="number" :min="10" :max="70" icon="fa-solid fa-percentage" />
          
          <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Percentuais sugeridos por filho:</div>
            <div class="flex flex-wrap gap-2">
              <button @click="percentual = 20" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">1 filho: 20-30%</button>
              <button @click="percentual = 25" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">2 filhos: 25-35%</button>
              <button @click="percentual = 30" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">3+ filhos: 30-40%</button>
            </div>
          </div>
        </div>

        <div v-if="tipoCalculo === 'salario-minimo'" class="space-y-4">
          <BaseInput v-model="salarioMinimo" label="Salário Mínimo (R$)" type="number" :min="0" step="10" icon="fa-solid fa-landmark" />
          <BaseInput v-model="numeroFilhos" label="Número de Filhos" type="number" :min="1" :max="10" icon="fa-solid fa-users" />
          <BaseInput v-model="multiploSM" label="Múltiplo do Salário Mínimo" type="number" step="0.1" icon="fa-solid fa-times" />
          
          <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Múltiplos típicos:</div>
            <div class="flex flex-wrap gap-2">
              <button @click="multiploSM = 0.3" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">0,3 SM</button>
              <button @click="multiploSM = 0.5" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">0,5 SM</button>
              <button @click="multiploSM = 1" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">1 SM</button>
            </div>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Pensão
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Valor da Pensão Mensal</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.valorMensal }}</div>
            <div class="text-emerald-100">{{ numeroFilhos }} {{ numeroFilhos > 1 ? 'filhos' : 'filho' }}</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.valorAnual }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Valor Anual</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.valorPorFilho }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Por Filho</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ resultado.percentualRenda }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">% da Renda</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.valor5Anos }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total 5 anos</div>
            </div>
          </div>

          <div class="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-emerald-600 dark:text-emerald-400 mt-1 mr-3"></i>
              <div class="text-sm text-emerald-800 dark:text-emerald-300">
                <p class="font-semibold mb-2">Informações importantes sobre pensão alimentícia:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Obrigação:</strong> Responsabilidade de ambos os pais</li>
                  <li><strong>Percentual:</strong> Varia de 10% a 40% conforme número de filhos e renda</li>
                  <li><strong>Salário mínimo:</strong> Quando não há comprovação de renda</li>
                  <li><strong>Inadimplência:</strong> Pode resultar em prisão (até 3 meses)</li>
                  <li><strong>Revisão:</strong> Pode ser revisada a qualquer momento</li>
                  <li><strong>Maioridade:</strong> Geralmente até 18 anos (ou 24 se estudando)</li>
                  <li><strong>13º Salário:</strong> Também deve ser pago proporcional</li>
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

const tipoCalculo = ref('percentual')
const rendaMensal = ref(3000)
const numeroFilhos = ref(1)
const percentual = ref(25)
const salarioMinimo = ref(1412)
const multiploSM = ref(0.5)
const resultado = ref(null)

const calcular = () => {
  let valorMensal = 0
  let rendaBase = 0
  
  if (tipoCalculo.value === 'percentual') {
    rendaBase = Number(rendaMensal.value)
    valorMensal = rendaBase * (Number(percentual.value) / 100)
  } else {
    valorMensal = Number(salarioMinimo.value) * Number(multiploSM.value) * Number(numeroFilhos.value)
    rendaBase = rendaMensal.value || salarioMinimo.value * 3 // Estimativa
  }
  
  const valorAnual = valorMensal * 13 // 12 meses + 13º
  const valorPorFilho = valorMensal / Number(numeroFilhos.value)
  const percentualRenda = rendaBase > 0 ? ((valorMensal / rendaBase) * 100) : 0
  const valor5Anos = valorAnual * 5

  resultado.value = {
    valorMensal: valorMensal.toFixed(2),
    valorAnual: valorAnual.toFixed(2),
    valorPorFilho: valorPorFilho.toFixed(2),
    percentualRenda: percentualRenda.toFixed(1),
    valor5Anos: valor5Anos.toFixed(2)
  }

  trackToolUsage('Simulador Pensão', 'calculate', { tipo: tipoCalculo.value })
}
</script>
