<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
          <i class="fas fa-exchange-alt text-violet-600 dark:text-violet-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Câmbio</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule custos de conversão de moeda com IOF</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Operação</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button @click="tipoOperacao = 'cartao'" class="p-4 rounded-lg border-2 transition-all" :class="tipoOperacao === 'cartao' ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-credit-card text-2xl mb-2 text-violet-600 dark:text-violet-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Cartão</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">IOF 5,38%</div>
            </button>
            <button @click="tipoOperacao = 'dinheiro'" class="p-4 rounded-lg border-2 transition-all" :class="tipoOperacao === 'dinheiro' ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-money-bill text-2xl mb-2 text-violet-600 dark:text-violet-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Dinheiro</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">IOF 1,1%</div>
            </button>
            <button @click="tipoOperacao = 'transferencia'" class="p-4 rounded-lg border-2 transition-all" :class="tipoOperacao === 'transferencia' ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-exchange-alt text-2xl mb-2 text-violet-600 dark:text-violet-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Transferência</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">IOF 0,38%</div>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Moeda Estrangeira</label>
            <select v-model="moedaEstrangeira" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="USD">Dólar Americano (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">Libra Esterlina (GBP)</option>
              <option value="JPY">Iene Japonês (JPY)</option>
              <option value="CAD">Dólar Canadense (CAD)</option>
              <option value="AUD">Dólar Australiano (AUD)</option>
            </select>
          </div>
          <BaseInput v-model="valorEstrangeiro" label="Valor em Moeda Estrangeira" type="number" step="0.01" icon="fa-solid fa-dollar-sign" />
          <BaseInput v-model="cotacao" :label="`Cotação (1 ${moedaEstrangeira} = R$)`" type="number" step="0.01" icon="fa-solid fa-chart-line" />
          <BaseInput v-model="taxaSpread" label="Taxa/Spread da Casa de Câmbio (%)" type="number" step="0.1" icon="fa-solid fa-percentage" />
        </div>

        <div class="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4">
          <div class="grid grid-cols-2 gap-4 text-center">
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400">IOF Aplicado</div>
              <div class="text-xl font-bold text-violet-600 dark:text-violet-400">{{ taxaIOF }}%</div>
            </div>
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Cotação + Spread</div>
              <div class="text-xl font-bold text-violet-600 dark:text-violet-400">R$ {{ cotacaoFinal }}</div>
            </div>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Custos
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Valor Total em Reais</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.valorTotal }}</div>
            <div class="text-violet-100">{{ valorEstrangeiro }} {{ moedaEstrangeira }}</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-violet-600 dark:text-violet-400">R$ {{ resultado.valorSemTaxas }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Sem Taxas</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">R$ {{ resultado.valorIOF }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">IOF</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">R$ {{ resultado.valorSpread }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Spread/Taxa</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ resultado.custoTotal }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Custo Total</div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
            <h3 class="font-bold text-gray-900 dark:text-white mb-3">Comparação de Métodos</h3>
            <div class="space-y-2">
              <div v-for="metodo in comparacao" :key="metodo.tipo" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                <div>
                  <div class="font-bold text-gray-900 dark:text-white">{{ metodo.nome }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">IOF: {{ metodo.iof }}%</div>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold text-violet-600 dark:text-violet-400">R$ {{ metodo.total }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Diferença: R$ {{ metodo.diferenca }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-violet-600 dark:text-violet-400 mt-1 mr-3"></i>
              <div class="text-sm text-violet-800 dark:text-violet-300">
                <p class="font-semibold mb-2">Dicas para economizar em câmbio:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>IOF menor:</strong> Transferências internacionais têm IOF mais baixo (0,38%)</li>
                  <li><strong>Cartões:</strong> Evite saques no exterior - IOF de 6,38% (5,38% + 1%)</li>
                  <li><strong>Compare:</strong> Cotações variam entre casas de câmbio e bancos</li>
                  <li><strong>Spread:</strong> Taxa adicional sobre a cotação - negocie!</li>
                  <li><strong>VET:</strong> Valor Efetivo Total deve ser informado pela casa de câmbio</li>
                  <li><strong>Planejamento:</strong> Compre moeda com antecedência para melhores taxas</li>
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
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const tipoOperacao = ref('cartao')
const moedaEstrangeira = ref('USD')
const valorEstrangeiro = ref(1000)
const cotacao = ref(5.0)
const taxaSpread = ref(3)
const resultado = ref(null)
const comparacao = ref([])

const taxasIOF = {
  'cartao': 5.38,
  'dinheiro': 1.1,
  'transferencia': 0.38
}

const taxaIOF = computed(() => taxasIOF[tipoOperacao.value])

const cotacaoFinal = computed(() => {
  const spread = Number(taxaSpread.value) / 100
  return (Number(cotacao.value) * (1 + spread)).toFixed(4)
})

const calcular = () => {
  const valor = Number(valorEstrangeiro.value)
  const cotacaoBase = Number(cotacao.value)
  const spread = Number(taxaSpread.value) / 100
  const iof = taxaIOF.value / 100
  
  const valorSemTaxas = valor * cotacaoBase
  const valorComSpread = valor * cotacaoBase * (1 + spread)
  const valorIOF = valorComSpread * iof
  const valorTotal = valorComSpread + valorIOF
  
  const custoTotalPercentual = ((valorTotal / valorSemTaxas - 1) * 100)

  resultado.value = {
    valorSemTaxas: valorSemTaxas.toFixed(2),
    valorSpread: (valorComSpread - valorSemTaxas).toFixed(2),
    valorIOF: valorIOF.toFixed(2),
    valorTotal: valorTotal.toFixed(2),
    custoTotal: custoTotalPercentual.toFixed(2)
  }

  // Comparação entre métodos
  comparacao.value = Object.keys(taxasIOF).map(tipo => {
    const iofMetodo = taxasIOF[tipo] / 100
    const valorIOFMetodo = valorComSpread * iofMetodo
    const totalMetodo = valorComSpread + valorIOFMetodo
    const diferenca = Math.abs(totalMetodo - valorTotal)
    
    return {
      tipo: tipo,
      nome: tipo === 'cartao' ? 'Cartão de Crédito/Débito' : tipo === 'dinheiro' ? 'Dinheiro em Espécie' : 'Transferência Internacional',
      iof: taxasIOF[tipo],
      total: totalMetodo.toFixed(2),
      diferenca: diferenca.toFixed(2)
    }
  })

  trackToolUsage('Simulador Câmbio', 'calculate', { tipo: tipoOperacao.value, moeda: moedaEstrangeira.value })
}
</script>
