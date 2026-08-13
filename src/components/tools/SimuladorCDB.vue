<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
          <i class="fas fa-percent text-emerald-600 dark:text-emerald-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de CDB</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule rendimentos de CDB (Certificado de Depósito Bancário)</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="valorInvestido" label="Valor a Investir (R$)" type="number" :min="0" step="1000" icon="fa-solid fa-money-bill" />
          <BaseInput v-model="prazoMeses" label="Prazo (meses)" type="number" :min="1" :max="120" icon="fa-solid fa-calendar" />
          <BaseInput v-model="percentualCDI" label="% do CDI" type="number" :min="50" :max="150" step="5" icon="fa-solid fa-percentage" />
          <BaseInput v-model="cdiAnual" label="CDI Anual (%)" type="number" :min="0" :max="20" step="0.25" icon="fa-solid fa-chart-line" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de CDB</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button @click="tipoCDB = 'prefixado'" class="p-4 rounded-lg border-2 transition-all text-left" :class="tipoCDB === 'prefixado' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">Pré-fixado</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Taxa definida na contratação</div>
            </button>
            <button @click="tipoCDB = 'posfixado'" class="p-4 rounded-lg border-2 transition-all text-left" :class="tipoCDB === 'posfixado' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">Pós-fixado (CDI)</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Varia conforme o CDI</div>
            </button>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Rendimento CDB
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Valor Líquido Final</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.valorLiquido }}</div>
            <div class="text-emerald-100">Após {{ prazoMeses }} meses e descontos de IR</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.valorBruto }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Valor Bruto</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.rendimentoBruto }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Rendimento Bruto</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">R$ {{ resultado.impostoRenda }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">IR ({{ resultado.aliquotaIR }}%)</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ resultado.rentabilidadeLiquida }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Rentabilidade</div>
            </div>
          </div>

          <div class="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-emerald-600 dark:text-emerald-400 mt-1 mr-3"></i>
              <div class="text-sm text-emerald-800 dark:text-emerald-300">
                <p class="font-semibold mb-2">Tabela Regressiva de IR:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li>Até 180 dias: 22,5%</li>
                  <li>De 181 a 360 dias: 20%</li>
                  <li>De 361 a 720 dias: 17,5%</li>
                  <li>Acima de 720 dias: 15%</li>
                  <li>IOF: aplicável nos primeiros 30 dias (regressivo)</li>
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

const valorInvestido = ref(10000)
const prazoMeses = ref(12)
const percentualCDI = ref(100)
const cdiAnual = ref(11)
const tipoCDB = ref('posfixado')
const resultado = ref(null)

const calcular = () => {
  const valor = Number(valorInvestido.value)
  const prazo = Number(prazoMeses.value)
  const percCDI = Number(percentualCDI.value) / 100
  const cdi = Number(cdiAnual.value) / 100
  
  const taxaEfetiva = cdi * percCDI
  const taxaMensal = Math.pow(1 + taxaEfetiva, 1/12) - 1
  
  const valorBruto = valor * Math.pow(1 + taxaMensal, prazo)
  const rendimentoBruto = valorBruto - valor
  
  let aliquotaIR = 0
  if (prazo <= 6) {
    aliquotaIR = 22.5
  } else if (prazo <= 12) {
    aliquotaIR = 20
  } else if (prazo <= 24) {
    aliquotaIR = 17.5
  } else {
    aliquotaIR = 15
  }
  
  const impostoRenda = rendimentoBruto * (aliquotaIR / 100)
  const valorLiquido = valorBruto - impostoRenda
  const rentabilidadeLiquida = ((valorLiquido / valor - 1) * 100)

  resultado.value = {
    valorBruto: valorBruto.toFixed(2),
    rendimentoBruto: rendimentoBruto.toFixed(2),
    impostoRenda: impostoRenda.toFixed(2),
    aliquotaIR: aliquotaIR,
    valorLiquido: valorLiquido.toFixed(2),
    rentabilidadeLiquida: rentabilidadeLiquida.toFixed(2)
  }

  trackToolUsage('Simulador CDB', 'calculate', { tipo: tipoCDB.value })
}
</script>
