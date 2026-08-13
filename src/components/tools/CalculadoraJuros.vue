<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <i class="fas fa-chart-line text-green-600 dark:text-green-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Juros Compostos</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o crescimento do seu investimento ao longo do tempo</p>
      </div>

      <div class="space-y-6">
        <!-- Capital Inicial -->
        <BaseInput
          v-model="capitalInicial"
          label="Capital Inicial (R$)"
          type="number"
          :min="0"
          step="0.01"
          icon="fa-solid fa-dollar-sign"
        />

        <!-- Taxa de Juros -->
        <BaseInput
          v-model="taxaJuros"
          label="Taxa de Juros (%)"
          type="number"
          :min="0"
          step="0.01"
          icon="fa-solid fa-percent"
        />

        <!-- Período -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="periodo"
            label="Período"
            type="number"
            :min="1"
            icon="fa-solid fa-calendar"
          />
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-clock text-green-600 dark:text-green-400 mr-2"></i>
              Frequência
            </label>
            <select 
              v-model="frequencia" 
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
              <option value="diaria">Diária</option>
            </select>
          </div>
        </div>

        <!-- Aporte Mensal -->
        <BaseInput
          v-model="aporteMensal"
          label="Aporte Periódico (R$)"
          type="number"
          :min="0"
          step="0.01"
          icon="fa-solid fa-plus"
          hint="Valor adicional investido a cada período"
        />

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="calcular" variant="primary" class="flex-1">
            <i class="fas fa-calculator mr-2"></i>
            Calcular
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Montante Final</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.montanteFinal }}</div>
            <div class="text-green-100">Rendimento: R$ {{ resultado.rendimento }}</div>
          </div>

          <!-- Métricas -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.totalInvestido }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Investido</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.jurosGanhos }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Juros Ganhos</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ resultado.rentabilidade }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Rentabilidade</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ periodo }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ frequenciaLabel }}</div>
            </div>
          </div>

          <!-- Detalhamento -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-3">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Detalhamento</h4>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Capital Inicial:</span>
              <span class="font-medium text-gray-900 dark:text-white">R$ {{ Number(capitalInicial).toFixed(2) }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Aportes Totais:</span>
              <span class="font-medium text-gray-900 dark:text-white">R$ {{ resultado.aportesTotais }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Juros Compostos:</span>
              <span class="font-medium text-green-600 dark:text-green-400">+ R$ {{ resultado.jurosGanhos }}</span>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-600 pt-3 flex justify-between font-semibold">
              <span class="text-gray-900 dark:text-white">Total Acumulado:</span>
              <span class="text-green-600 dark:text-green-400">R$ {{ resultado.montanteFinal }}</span>
            </div>
          </div>

          <!-- Dicas -->
          <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
            <div class="flex">
              <i class="fas fa-lightbulb text-green-600 dark:text-green-400 mt-1 mr-3"></i>
              <div class="text-sm text-green-800 dark:text-green-300">
                <p class="font-semibold mb-2">Dicas para Investir:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Quanto antes começar, maior o efeito dos juros compostos</li>
                  <li>Aportes regulares aumentam significativamente o resultado</li>
                  <li>Reinvista os rendimentos para potencializar os ganhos</li>
                  <li>Mantenha a disciplina mesmo em períodos de volatilidade</li>
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
import { ref, computed } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const capitalInicial = ref(10000)
const taxaJuros = ref(10)
const periodo = ref(12)
const frequencia = ref('mensal')
const aporteMensal = ref(500)

const resultado = ref(null)

const frequenciaLabel = computed(() => {
  const labels = {
    mensal: 'Meses',
    anual: 'Anos',
    diaria: 'Dias'
  }
  return labels[frequencia.value]
})

const calcular = () => {
  const capital = Number(capitalInicial.value)
  const taxa = Number(taxaJuros.value) / 100
  const tempo = Number(periodo.value)
  const aporte = Number(aporteMensal.value)
  
  if (capital <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite o capital inicial' })
    return
  }
  
  if (taxa <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite a taxa de juros' })
    return
  }
  
  if (tempo <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite o período' })
    return
  }

  // Ajusta taxa baseado na frequência
  let taxaAjustada = taxa
  let periodoAjustado = tempo
  
  if (frequencia.value === 'anual') {
    taxaAjustada = taxa
    periodoAjustado = tempo
  } else if (frequencia.value === 'mensal') {
    taxaAjustada = taxa / 12
    periodoAjustado = tempo
  } else if (frequencia.value === 'diaria') {
    taxaAjustada = taxa / 365
    periodoAjustado = tempo
  }
  
  // Fórmula: M = C * (1 + i)^t + PMT * [((1 + i)^t - 1) / i]
  const montanteSemAporte = capital * Math.pow(1 + taxaAjustada, periodoAjustado)
  
  let montanteComAporte = montanteSemAporte
  if (aporte > 0) {
    const fatorAporte = (Math.pow(1 + taxaAjustada, periodoAjustado) - 1) / taxaAjustada
    montanteComAporte = montanteSemAporte + (aporte * fatorAporte)
  }
  
  const aportesTotais = aporte * periodoAjustado
  const totalInvestido = capital + aportesTotais
  const jurosGanhos = montanteComAporte - totalInvestido
  const rentabilidade = ((montanteComAporte / totalInvestido - 1) * 100).toFixed(2)

  resultado.value = {
    montanteFinal: montanteComAporte.toFixed(2),
    rendimento: jurosGanhos.toFixed(2),
    totalInvestido: totalInvestido.toFixed(2),
    jurosGanhos: jurosGanhos.toFixed(2),
    aportesTotais: aportesTotais.toFixed(2),
    rentabilidade
  }
  
  trackToolUsage('Calculadora Juros Compostos', 'calculate')
}

const limpar = () => {
  capitalInicial.value = 10000
  taxaJuros.value = 10
  periodo.value = 12
  frequencia.value = 'mensal'
  aporteMensal.value = 500
  resultado.value = null
}
</script>
