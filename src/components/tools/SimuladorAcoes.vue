<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full mb-4">
          <i class="fas fa-chart-line text-rose-600 dark:text-rose-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Investimento em Ações</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule retornos com valorização e dividendos</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="valorInicial" label="Valor Inicial (R$)" type="number" :min="0" step="100" icon="fa-solid fa-coins" />
          <BaseInput v-model="aportesMensais" label="Aportes Mensais (R$)" type="number" :min="0" step="100" icon="fa-solid fa-calendar-plus" />
          <BaseInput v-model="valorizacaoAnual" label="Valorização Anual (%)" type="number" step="0.5" icon="fa-solid fa-arrow-trend-up" />
          <BaseInput v-model="dividendYield" label="Dividend Yield (% a.a.)" type="number" step="0.1" icon="fa-solid fa-hand-holding-dollar" />
          <BaseInput v-model="prazoAnos" label="Prazo (anos)" type="number" :min="1" :max="30" icon="fa-solid fa-hourglass-half" />
          <BaseInput v-model="taxaCorretagem" label="Taxa de Corretagem (%)" type="number" step="0.1" icon="fa-solid fa-percentage" />
        </div>

        <div class="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Cenários de retorno histórico (Ibovespa):</div>
          <div class="flex flex-wrap gap-2">
            <button @click="usarCenario('conservador')" class="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm">Conservador: 8% a.a.</button>
            <button @click="usarCenario('moderado')" class="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm">Moderado: 12% a.a.</button>
            <button @click="usarCenario('agressivo')" class="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm">Agressivo: 15% a.a.</button>
          </div>
        </div>

        <div>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input v-model="reinvestirDividendos" type="checkbox" class="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Reinvestir dividendos automaticamente</span>
          </label>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Simular Investimento
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Patrimônio Final</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.patrimonioFinal }}</div>
            <div class="text-rose-100">Em {{ prazoAnos }} anos</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-rose-600 dark:text-rose-400">R$ {{ resultado.totalInvestido }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Investido</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.ganhosCapital }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Ganhos de Capital</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.dividendosRecebidos }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Dividendos</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-rose-600 dark:text-rose-400">{{ resultado.rentabilidade }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Rentabilidade</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Taxa Anual Composta</div>
              <div class="text-2xl font-bold text-rose-600 dark:text-rose-400">{{ resultado.cagr }}% a.a.</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Custos de Corretagem</div>
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">R$ {{ resultado.custoTotal }}</div>
            </div>
          </div>

          <div class="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-rose-600 dark:text-rose-400 mt-1 mr-3"></i>
              <div class="text-sm text-rose-800 dark:text-rose-300">
                <p class="font-semibold mb-2">Informações sobre investimento em ações:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Dividendos:</strong> Isentos de IR até R$ 20.000/mês para pessoa física</li>
                  <li><strong>Ganho de Capital:</strong> IR de 15% sobre lucros acima de R$ 20.000/mês</li>
                  <li><strong>Day Trade:</strong> IR de 20% sobre lucros</li>
                  <li><strong>Diversificação:</strong> Invista em pelo menos 8-10 empresas diferentes</li>
                  <li><strong>Longo Prazo:</strong> Bolsa historicamente rende mais no longo prazo</li>
                  <li><strong>Volatilidade:</strong> Prepare-se para oscilações de curto prazo</li>
                  <li><strong>Disclaimer:</strong> Rentabilidade passada não garante retorno futuro</li>
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

const valorInicial = ref(10000)
const aportesMensais = ref(1000)
const valorizacaoAnual = ref(12)
const dividendYield = ref(5)
const prazoAnos = ref(10)
const taxaCorretagem = ref(0.5)
const reinvestirDividendos = ref(true)
const resultado = ref(null)

const usarCenario = (tipo) => {
  if (tipo === 'conservador') {
    valorizacaoAnual.value = 8
    dividendYield.value = 6
  } else if (tipo === 'moderado') {
    valorizacaoAnual.value = 12
    dividendYield.value = 5
  } else if (tipo === 'agressivo') {
    valorizacaoAnual.value = 15
    dividendYield.value = 3
  }
}

const calcular = () => {
  const valorInicio = Number(valorInicial.value)
  const aporteMensal = Number(aportesMensais.value)
  const taxaValorizacao = Number(valorizacaoAnual.value) / 100
  const taxaDividendos = Number(dividendYield.value) / 100
  const anos = Number(prazoAnos.value)
  const taxaCorret = Number(taxaCorretagem.value) / 100
  
  let patrimonio = valorInicio
  let totalInvestido = valorInicio
  let dividendosAcumulados = 0
  let custosAcumulados = valorInicio * taxaCorret
  
  for (let ano = 1; ano <= anos; ano++) {
    for (let mes = 1; mes <= 12; mes++) {
      // Aporte mensal
      patrimonio += aporteMensal
      totalInvestido += aporteMensal
      custosAcumulados += aporteMensal * taxaCorret
      
      // Valorização mensal
      const taxaMensal = Math.pow(1 + taxaValorizacao, 1/12) - 1
      patrimonio *= (1 + taxaMensal)
    }
    
    // Dividendos anuais
    const dividendosAno = patrimonio * taxaDividendos
    dividendosAcumulados += dividendosAno
    
    if (reinvestirDividendos.value) {
      patrimonio += dividendosAno
      custosAcumulados += dividendosAno * taxaCorret
    }
  }
  
  const ganhosCapital = patrimonio - totalInvestido - (reinvestirDividendos.value ? dividendosAcumulados : 0)
  const rentabilidadeTotal = ((patrimonio / totalInvestido - 1) * 100)
  const cagr = (Math.pow(patrimonio / totalInvestido, 1/anos) - 1) * 100

  resultado.value = {
    patrimonioFinal: patrimonio.toFixed(2),
    totalInvestido: totalInvestido.toFixed(2),
    ganhosCapital: ganhosCapital.toFixed(2),
    dividendosRecebidos: dividendosAcumulados.toFixed(2),
    rentabilidade: rentabilidadeTotal.toFixed(2),
    cagr: cagr.toFixed(2),
    custoTotal: custosAcumulados.toFixed(2)
  }

  trackToolUsage('Simulador Ações', 'calculate')
}
</script>
