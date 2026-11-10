<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import ChartCard from '@/components/ui/ChartCard.vue'
import { formatCurrency, formatNumber, parseFormattedNumber } from '@/utils/formatters'

useHead({
  title: 'Comparador Comprar vs Alugar - Qual é Melhor? | Calculadora Aluguel Fácil',
  meta: [{ name: 'description', content: 'Compare cenários de compra vs aluguel de imóvel. Descubra qual opção gera mais patrimônio ao longo do tempo com análise financeira completa.' }]
})

const propertyValue = ref(0)
const rentValue = ref(0)
const downPayment = ref(0)
const financingRate = ref(9.5)
const financingYears = ref(30)
const investmentRate = ref(12)
const propertyAppreciation = ref(5)

const propertyValueFormatted = ref('')
const rentValueFormatted = ref('')
const downPaymentFormatted = ref('')

function onPropertyValueInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  propertyValueFormatted.value = formatNumber(val)
  propertyValue.value = parseFormattedNumber(val)
}

function onRentValueInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  rentValueFormatted.value = formatNumber(val)
  rentValue.value = parseFormattedNumber(val)
}

function onDownPaymentInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  downPaymentFormatted.value = formatNumber(val)
  downPayment.value = parseFormattedNumber(val)
}

interface ScenarioResult {
  name: string
  icon: string
  color: string
  finalPatrimony: number
  totalSpent: number
  details: string[]
}

const result = computed<{ scenarios: ScenarioResult[]; best: string; analysis: string } | null>(() => {
  if (!propertyValue.value || !rentValue.value || !downPayment.value) return null

  const years = financingYears.value
  const months = years * 12
  const financedAmount = propertyValue.value - downPayment.value
  const monthlyRate = financingRate.value / 100 / 12
  const monthlyInvestRate = investmentRate.value / 100 / 12
  const annualAppreciation = propertyAppreciation.value / 100

  // Scenario 1: Buy (finance)
  const monthlyPayment = (financedAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalPaidFinancing = monthlyPayment * months + downPayment.value
  const propertyFinalValue = propertyValue.value * Math.pow(1 + annualAppreciation, years)
  const buyPatrimony = propertyFinalValue

  // Scenario 2: Rent + Invest the difference
  const monthlyDifference = monthlyPayment - rentValue.value
  let investedAmount = downPayment.value
  let totalRentPaid = 0

  if (monthlyDifference > 0) {
    // Invest down payment + monthly difference
    for (let m = 0; m < months; m++) {
      investedAmount = investedAmount * (1 + monthlyInvestRate) + monthlyDifference
      totalRentPaid += rentValue.value
    }
  } else {
    // Even if rent > payment, invest down payment
    for (let m = 0; m < months; m++) {
      investedAmount = investedAmount * (1 + monthlyInvestRate)
      totalRentPaid += rentValue.value
    }
  }
  const rentInvestPatrimony = investedAmount

  // Scenario 3: Rent only (no investment strategy)
  const rentOnlyTotalSpent = rentValue.value * months
  const rentOnlyPatrimony = 0

  const scenarios: ScenarioResult[] = [
    {
      name: 'Comprar (Financiar)',
      icon: 'fa-house',
      color: 'from-blue-500 to-cyan-500',
      finalPatrimony: buyPatrimony,
      totalSpent: totalPaidFinancing,
      details: [
        `Parcela mensal: ${formatCurrency(monthlyPayment)}`,
        `Total pago: ${formatCurrency(totalPaidFinancing)}`,
        `Imóvel valorizado: ${formatCurrency(propertyFinalValue)}`,
        `Patrimônio final: ${formatCurrency(buyPatrimony)}`
      ]
    },
    {
      name: 'Alugar + Investir',
      icon: 'fa-chart-line',
      color: 'from-green-500 to-emerald-500',
      finalPatrimony: rentInvestPatrimony,
      totalSpent: totalRentPaid,
      details: [
        `Aluguel mensal: ${formatCurrency(rentValue.value)}`,
        `Investimento mensal: ${formatCurrency(Math.max(0, monthlyDifference))}`,
        `Total aluguel pago: ${formatCurrency(totalRentPaid)}`,
        `Patrimônio investido: ${formatCurrency(rentInvestPatrimony)}`
      ]
    },
    {
      name: 'Apenas Alugar',
      icon: 'fa-key',
      color: 'from-red-500 to-orange-500',
      finalPatrimony: rentOnlyPatrimony,
      totalSpent: rentOnlyTotalSpent,
      details: [
        `Aluguel mensal: ${formatCurrency(rentValue.value)}`,
        `Total gasto em aluguel: ${formatCurrency(rentOnlyTotalSpent)}`,
        `Patrimônio acumulado: R$ 0`,
        `Sem construção de patrimônio`
      ]
    }
  ]

  const sorted = [...scenarios].sort((a, b) => b.finalPatrimony - a.finalPatrimony)
  const best = sorted[0].name

  let analysis = ''
  if (best === 'Comprar (Financiar)') {
    analysis = `Comprar o imóvel é a melhor opção neste cenário. Com a valorização de ${propertyAppreciation.value}% a.a., o patrimônio final da compra supera o investimento financeiro.`
  } else if (best === 'Alugar + Investir') {
    analysis = `Alugar e investir a diferença é mais vantajoso. Com rendimento de ${investmentRate.value}% a.a., seus investimentos superam a valorização do imóvel.`
  } else {
    analysis = 'Nenhum dos cenários é ideal. Considere ajustar os parâmetros para encontrar a melhor estratégia.'
  }

  return { scenarios, best, analysis }
})

// ===== Gráfico comparativo de patrimônio (ApexCharts) =====
const patrimonyChartSeries = computed(() => {
  if (!result.value) return []
  return [
    {
      name: 'Patrimônio final',
      data: result.value.scenarios.map((s) => Math.round(s.finalPatrimony))
    },
    {
      name: 'Total gasto',
      data: result.value.scenarios.map((s) => Math.round(s.totalSpent))
    }
  ]
})

const patrimonyChartOptions = computed(() => ({
  colors: ['#22c55e', '#f97316'],
  plotOptions: { bar: { borderRadius: 6, columnWidth: '60%' } },
  dataLabels: { enabled: false },
  xaxis: { categories: result.value ? result.value.scenarios.map((s) => s.name) : [] },
  yaxis: {
    labels: { formatter: (v: number) => 'R$ ' + (v / 1000).toFixed(0) + 'k' }
  },
  legend: { position: 'top' },
  tooltip: { y: { formatter: (v: number) => formatCurrency(v) } }
}))
</script>

<template>
  <div class="container py-8">
    <Breadcrumb :items="[{ label: 'Ferramentas', to: '/#ferramentas' }, { label: 'Comparador Comprar vs Alugar' }]" />

    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        <i class="fa-solid fa-scale-balanced text-primary-500 mr-2"></i>Comparador: Comprar vs Alugar
      </h1>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Descubra qual decisão gera mais patrimônio: comprar financiando, alugar e investir a diferença, ou apenas alugar.
      </p>
    </div>

    <!-- Alert -->
    <div class="card p-4 mb-6 border-l-4 border-l-purple-500 bg-purple-50 dark:bg-purple-900/20">
      <p class="text-sm text-purple-800 dark:text-purple-300">
        <i class="fa-solid fa-lightbulb mr-2"></i>
        <strong>Como funciona:</strong> Comparamos 3 cenários ao longo do tempo para determinar qual estratégia acumula mais patrimônio.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Form -->
      <div class="lg:col-span-2">
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-sliders text-primary-500"></i> Parâmetros da Simulação
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label-field">Valor do Imóvel (R$)</label>
              <input type="text" class="input-field" placeholder="Ex: 500.000" autocomplete="off" :value="propertyValueFormatted" @input="onPropertyValueInput" />
            </div>
            <div>
              <label class="label-field">Valor do Aluguel (R$/mês)</label>
              <input type="text" class="input-field" placeholder="Ex: 2.500" autocomplete="off" :value="rentValueFormatted" @input="onRentValueInput" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label class="label-field">Entrada Disponível (R$)</label>
              <input type="text" class="input-field" placeholder="Ex: 100.000" autocomplete="off" :value="downPaymentFormatted" @input="onDownPaymentInput" />
            </div>
            <div>
              <label class="label-field">Taxa de Financiamento (% a.a.)</label>
              <input type="number" class="input-field" placeholder="Ex: 9.5" autocomplete="off" v-model.number="financingRate" step="0.1" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label class="label-field">Prazo (anos)</label>
              <select class="select-field" v-model.number="financingYears">
                <option v-for="y in [10, 15, 20, 25, 30, 35]" :key="y" :value="y">{{ y }} anos</option>
              </select>
            </div>
            <div>
              <label class="label-field">Rendimento Investimentos (% a.a.)</label>
              <input type="number" class="input-field" placeholder="Ex: 12" autocomplete="off" v-model.number="investmentRate" step="0.5" />
            </div>
            <div>
              <label class="label-field">Valorização do Imóvel (% a.a.)</label>
              <input type="number" class="input-field" placeholder="Ex: 5" autocomplete="off" v-model.number="propertyAppreciation" step="0.5" />
            </div>
          </div>
        </div>

        <!-- Scenarios Results -->
        <div v-if="result" class="mt-6 space-y-6">
          <!-- Winner -->
          <div class="card p-6 border-2 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <i class="fa-solid fa-trophy text-white"></i>
              </div>
              <div>
                <h3 class="font-bold text-green-800 dark:text-green-300">Melhor Opção: {{ result.best }}</h3>
                <p class="text-sm text-green-600 dark:text-green-400">{{ result.analysis }}</p>
              </div>
            </div>
          </div>

          <!-- Scenario Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="scenario in result.scenarios" :key="scenario.name" :class="['card p-5 transition-all', scenario.name === result.best ? 'ring-2 ring-green-500 shadow-lg' : '']">
              <div class="flex items-center gap-3 mb-4">
                <div :class="['w-10 h-10 rounded-xl bg-gradient-to-r flex items-center justify-center', scenario.color]">
                  <i :class="['fa-solid text-white', scenario.icon]"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-sm">{{ scenario.name }}</h4>
                  <span v-if="scenario.name === result.best" class="badge-success text-[10px]">Melhor</span>
                </div>
              </div>

              <div class="text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg mb-4">
                <p class="text-xs text-gray-500 dark:text-gray-400">Patrimônio Final</p>
                <p class="text-xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(scenario.finalPatrimony) }}</p>
              </div>

              <ul class="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                <li v-for="detail in scenario.details" :key="detail" class="flex items-start gap-1.5">
                  <i class="fa-solid fa-circle text-[4px] mt-1.5 text-gray-400"></i>
                  {{ detail }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Gráfico comparativo -->
          <ChartCard
            title="Comparativo Visual dos Cenários"
            icon="fa-chart-column"
            type="bar"
            :series="patrimonyChartSeries"
            :options="patrimonyChartOptions"
          />
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <div class="card p-6 sticky top-20">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-info-circle text-primary-500"></i> Sobre a Análise
          </h2>

          <div class="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">Cenário 1: Comprar</h4>
              <p>Financia o imóvel e ganha com a valorização patrimonial ao longo do tempo.</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">Cenário 2: Alugar + Investir</h4>
              <p>Aluga e investe a entrada + diferença entre parcela e aluguel em aplicações financeiras.</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">Cenário 3: Apenas Alugar</h4>
              <p>Paga aluguel sem investir ou acumular patrimônio. Cenário de referência.</p>
            </div>
          </div>

          <div class="mt-6 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              <i class="fa-solid fa-lightbulb text-amber-500 mr-1"></i>
              <strong>Dica:</strong> Ajuste a taxa de investimento e valorização para ver como diferentes cenários econômicos afetam o resultado.
            </p>
          </div>
        </div>

        <!-- Note -->
        <div class="card p-4 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/20">
          <p class="text-xs text-amber-800 dark:text-amber-300">
            <i class="fa-solid fa-triangle-exclamation mr-1"></i>
            <strong>Importante:</strong> Esta simulação não considera custos como IPTU, condomínio, manutenção ou imposto de renda sobre investimentos.
          </p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <section class="mt-16">
      <div class="card max-w-4xl mx-auto overflow-hidden">
        <div class="grid md:grid-cols-2">
          <div class="gradient-primary p-8 text-white">
            <span class="badge bg-white/20 text-white border border-white/30 mb-4">
              <i class="fa-solid fa-globe"></i> Grupo 3W Online
            </span>
            <h3 class="text-2xl font-bold mb-4">Precisa de um Comparador Personalizado?</h3>
            <p class="opacity-90 leading-relaxed">
              Desenvolvemos ferramentas de análise financeira e comparadores sob demanda para empresas do mercado imobiliário.
            </p>
          </div>
          <div class="p-8 flex flex-col justify-center">
            <ul class="space-y-3 mb-6">
              <li v-for="item in ['Simuladores Financeiros', 'Comparadores Inteligentes', 'Dashboards Analíticos', 'APIs de Cálculo']" :key="item" class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <i class="fa-solid fa-circle-check text-primary-500"></i> {{ item }}
              </li>
            </ul>
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="btn-primary">
              <i class="fa-solid fa-globe"></i> Conhecer 3W Online <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
