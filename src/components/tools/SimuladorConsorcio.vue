<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <i class="fas fa-chart-line text-red-600 dark:text-red-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Consórcio</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule parcelas e prazos de consórcio</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Consórcio</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button @click="tipoConsorcio = 'imovel'" class="p-4 rounded-lg border-2 transition-all" :class="tipoConsorcio === 'imovel' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-home text-2xl mb-2 text-red-600 dark:text-red-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Imóvel</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Taxa ~15-20%</div>
            </button>
            <button @click="tipoConsorcio = 'automovel'" class="p-4 rounded-lg border-2 transition-all" :class="tipoConsorcio === 'automovel' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-car text-2xl mb-2 text-red-600 dark:text-red-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Automóvel</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Taxa ~20-25%</div>
            </button>
            <button @click="tipoConsorcio = 'moto'" class="p-4 rounded-lg border-2 transition-all" :class="tipoConsorcio === 'moto' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-motorcycle text-2xl mb-2 text-red-600 dark:text-red-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Moto</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Taxa ~25-30%</div>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="valorBem" label="Valor do Bem (R$)" type="number" :min="0" step="1000" icon="fa-solid fa-tag" />
          <BaseInput v-model="prazoMeses" label="Prazo (meses)" type="number" :min="12" :max="240" step="12" icon="fa-solid fa-calendar" />
          <BaseInput v-model="taxaAdmin" label="Taxa de Administração (%)" type="number" :min="10" :max="30" step="0.5" icon="fa-solid fa-percentage" />
          <BaseInput v-model="fundoReserva" label="Fundo de Reserva (%)" type="number" :min="0" :max="5" step="0.5" icon="fa-solid fa-piggy-bank" />
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Consórcio
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Parcela Mensal</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.parcelaMensal }}</div>
            <div class="text-red-100">{{ prazoMeses }} meses</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">R$ {{ resultado.valorTotal }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total a Pagar</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">R$ {{ resultado.taxaTotal }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Taxas</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ resultado.anos }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Anos</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ resultado.percentualExtra }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">% sobre valor</div>
            </div>
          </div>

          <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-red-600 dark:text-red-400 mt-1 mr-3"></i>
              <div class="text-sm text-red-800 dark:text-red-300">
                <p class="font-semibold mb-2">Como funciona o consórcio:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Não há juros:</strong> Apenas taxa de administração e fundo de reserva</li>
                  <li><strong>Contemplação:</strong> Por sorteio mensal ou lance</li>
                  <li><strong>Lance:</strong> Antecipe sua contemplação oferecendo parte do valor</li>
                  <li><strong>Vantagem:</strong> Valor total menor que financiamento</li>
                  <li><strong>Desvantagem:</strong> Não recebe o bem imediatamente (exceto se contemplado)</li>
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

const tipoConsorcio = ref('automovel')
const valorBem = ref(50000)
const prazoMeses = ref(60)
const taxaAdmin = ref(20)
const fundoReserva = ref(2)
const resultado = ref(null)

const calcular = () => {
  const valor = Number(valorBem.value)
  const prazo = Number(prazoMeses.value)
  const taxa = Number(taxaAdmin.value) / 100
  const fundo = Number(fundoReserva.value) / 100
  
  const taxaTotal = valor * taxa
  const fundoTotal = valor * fundo
  const valorTotalConsorcio = valor + taxaTotal + fundoTotal
  
  const parcelaMensal = valorTotalConsorcio / prazo
  const anos = (prazo / 12).toFixed(1)
  const percentualExtra = ((valorTotalConsorcio / valor - 1) * 100)

  resultado.value = {
    parcelaMensal: parcelaMensal.toFixed(2),
    valorTotal: valorTotalConsorcio.toFixed(2),
    taxaTotal: (taxaTotal + fundoTotal).toFixed(2),
    anos: anos,
    percentualExtra: percentualExtra.toFixed(1)
  }

  trackToolUsage('Simulador Consórcio', 'calculate', { tipo: tipoConsorcio.value })
}
</script>
