<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import { formatCurrency, formatNumber, parseFormattedNumber } from '@/utils/formatters'
import { calculateFinancing, type FinancingParams, type FinancingResult } from '@/utils/financingCalculations'
import { financingTypes, regionalFinancing, propertyFinancing } from '@/data/financingData'
import ChartCard from '@/components/ui/ChartCard.vue'

useHead({
  title: 'Simulador de Financiamento Imobiliário - Price vs SAC | Calculadora Aluguel Fácil',
  meta: [{ name: 'description', content: 'Simule seu financiamento imobiliário gratuitamente. Compare tabela Price vs SAC, calcule parcelas, juros e custos adicionais. Análise completa de affordability.' }]
})

const params = ref<FinancingParams>({
  propertyValue: 0,
  downPayment: 0,
  interestRate: 0,
  years: 30,
  system: 'price',
  income: 0,
  region: 'sudeste',
  propertyType: 'residencial_novo',
  financingType: 'sfh',
  useFGTS: false,
  fgtsAmount: 0,
  includeInsurance: true,
  includeIOF: true
})

const propertyValueFormatted = ref('')
const downPaymentFormatted = ref('')
const incomeFormatted = ref('')

function onPropertyValueInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  propertyValueFormatted.value = formatNumber(val)
  params.value.propertyValue = parseFormattedNumber(val)
}

function onDownPaymentInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  downPaymentFormatted.value = formatNumber(val)
  params.value.downPayment = parseFormattedNumber(val)
}

function onIncomeInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  incomeFormatted.value = formatNumber(val)
  params.value.income = parseFormattedNumber(val)
}

const yearsOptions = Array.from({ length: 26 }, (_, i) => i + 10)

const result = computed<FinancingResult | null>(() => {
  const p = params.value
  if (!p.propertyValue || !p.downPayment || !p.income || p.downPayment >= p.propertyValue) return null
  try { return calculateFinancing(p) } catch { return null }
})

const recommendationClass = computed(() => {
  if (!result.value) return ''
  const r = result.value.affordabilityAnalysis.recommendation
  if (r === 'aprovado') return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
  if (r === 'atenção') return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
  return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
})

const recommendationIcon = computed(() => {
  if (!result.value) return ''
  const r = result.value.affordabilityAnalysis.recommendation
  if (r === 'aprovado') return 'fa-circle-check'
  if (r === 'atenção') return 'fa-triangle-exclamation'
  return 'fa-circle-xmark'
})

const savingsWithSAC = computed(() => {
  if (!result.value) return 0
  return result.value.systems.price.totalPaid - result.value.systems.sac.totalPaid
})

// ===== Dados dos gráficos (ApexCharts) =====
const comparisonChartSeries = computed(() => {
  if (!result.value) return []
  const { price, sac } = result.value.systems
  return [
    { name: 'Total pago', data: [Math.round(price.totalPaid), Math.round(sac.totalPaid)] },
    { name: 'Total de juros', data: [Math.round(price.totalInterest), Math.round(sac.totalInterest)] }
  ]
})

const comparisonChartOptions = computed(() => ({
  chart: { stacked: false },
  colors: ['#3b82f6', '#ef4444'],
  plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
  dataLabels: { enabled: false },
  xaxis: { categories: ['Tabela Price', 'Tabela SAC'] },
  yaxis: {
    labels: {
      formatter: (v: number) => 'R$ ' + (v / 1000).toFixed(0) + 'k'
    }
  },
  legend: { position: 'top' },
  tooltip: { y: { formatter: (v: number) => formatCurrency(v) } }
}))

const balanceChartSeries = computed(() => {
  if (!result.value) return []
  const table = result.value.selectedSystem.table
  // Amostra anual do saldo devedor para não sobrecarregar o gráfico
  const yearly = table.filter((_, i) => i % 12 === 0)
  return [{ name: 'Saldo devedor', data: yearly.map((r) => Math.round(r.balance)) }]
})

const balanceChartOptions = computed(() => {
  if (!result.value) return {}
  const table = result.value.selectedSystem.table
  const yearly = table.filter((_, i) => i % 12 === 0)
  return {
    colors: ['#3b82f6'],
    stroke: { curve: 'smooth', width: 3 },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    dataLabels: { enabled: false },
    xaxis: {
      categories: yearly.map((_, i) => `Ano ${i}`),
      title: { text: 'Tempo' }
    },
    yaxis: {
      labels: { formatter: (v: number) => 'R$ ' + (v / 1000).toFixed(0) + 'k' }
    },
    tooltip: { y: { formatter: (v: number) => formatCurrency(v) } }
  }
})
</script>

<template>
  <div class="container py-8">
    <Breadcrumb :items="[{ label: 'Ferramentas', to: '/#ferramentas' }, { label: 'Simulador de Financiamento' }]" />

    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        <i class="fa-solid fa-piggy-bank text-primary-500 mr-2"></i>Simulador de Financiamento Imobiliário
      </h1>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Compare tabela Price vs SAC, analise sua capacidade de pagamento e descubra todos os custos envolvidos no financiamento.
      </p>
    </div>

    <!-- Alert -->
    <div class="card p-4 mb-6 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20">
      <p class="text-sm text-blue-800 dark:text-blue-300">
        <i class="fa-solid fa-lightbulb mr-2"></i>
        <strong>Dica:</strong> A tabela SAC geralmente resulta em economia total de juros, mas tem parcelas iniciais maiores. Compare ambas para decidir.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Dados Básicos -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-building text-primary-500"></i> Dados do Financiamento
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label-field">Valor do Imóvel (R$)</label>
              <input type="text" class="input-field" placeholder="Ex: 500.000" autocomplete="off" :value="propertyValueFormatted" @input="onPropertyValueInput" />
            </div>
            <div>
              <label class="label-field">Entrada (R$)</label>
              <input type="text" class="input-field" placeholder="Ex: 100.000" autocomplete="off" :value="downPaymentFormatted" @input="onDownPaymentInput" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label class="label-field">Taxa de Juros (% a.a.)</label>
              <input type="number" class="input-field" placeholder="Ex: 9.5" autocomplete="off" v-model.number="params.interestRate" step="0.1" />
            </div>
            <div>
              <label class="label-field">Prazo (anos)</label>
              <select class="select-field" v-model.number="params.years">
                <option v-for="y in yearsOptions" :key="y" :value="y">{{ y }} anos</option>
              </select>
            </div>
            <div>
              <label class="label-field">Sistema de Amortização</label>
              <select class="select-field" v-model="params.system">
                <option value="price">Tabela Price</option>
                <option value="sac">Tabela SAC</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label class="label-field">Renda Familiar Bruta (R$)</label>
              <input type="text" class="input-field" placeholder="Ex: 15.000" autocomplete="off" :value="incomeFormatted" @input="onIncomeInput" />
            </div>
            <div>
              <label class="label-field">Região</label>
              <select class="select-field" v-model="params.region">
                <option v-for="(reg, key) in regionalFinancing" :key="key" :value="key">{{ reg.name }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label class="label-field">Tipo de Imóvel</label>
              <select class="select-field" v-model="params.propertyType">
                <option v-for="(type, key) in propertyFinancing" :key="key" :value="key">{{ type.name }}</option>
              </select>
            </div>
            <div>
              <label class="label-field">Tipo de Financiamento</label>
              <select class="select-field" v-model="params.financingType">
                <option v-for="(type, key) in financingTypes" :key="key" :value="key">{{ type.name }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Options -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-sliders text-primary-500"></i> Opções Adicionais
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
              <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" v-model="params.useFGTS" />
              <div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Utilizar FGTS</span>
                <span class="block text-xs text-gray-500">Abater do saldo devedor</span>
              </div>
            </label>
            <label class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
              <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" v-model="params.includeInsurance" />
              <div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Incluir Seguros</span>
                <span class="block text-xs text-gray-500">MIP + DFI obrigatórios</span>
              </div>
            </label>
            <label class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
              <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" v-model="params.includeIOF" />
              <div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Incluir IOF</span>
                <span class="block text-xs text-gray-500">Imposto sobre operação</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Results Detail -->
        <template v-if="result">
          <!-- Comparison -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fa-solid fa-scale-balanced text-primary-500"></i> Comparativo Price vs SAC
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl border-2" :class="params.system === 'price' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-slate-600'">
                <h3 class="font-bold text-gray-900 dark:text-white mb-3">Tabela Price</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between"><span class="text-gray-500">Primeira parcela:</span><span class="font-medium">{{ formatCurrency(result.systems.price.firstPayment) }}</span></div>
                  <div class="flex justify-between"><span class="text-gray-500">Última parcela:</span><span class="font-medium">{{ formatCurrency(result.systems.price.lastPayment) }}</span></div>
                  <div class="flex justify-between"><span class="text-gray-500">Total pago:</span><span class="font-medium">{{ formatCurrency(result.systems.price.totalPaid) }}</span></div>
                  <div class="flex justify-between"><span class="text-gray-500">Total juros:</span><span class="font-medium text-red-600 dark:text-red-400">{{ formatCurrency(result.systems.price.totalInterest) }}</span></div>
                </div>
              </div>

              <div class="p-4 rounded-xl border-2" :class="params.system === 'sac' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-slate-600'">
                <h3 class="font-bold text-gray-900 dark:text-white mb-3">Tabela SAC</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between"><span class="text-gray-500">Primeira parcela:</span><span class="font-medium">{{ formatCurrency(result.systems.sac.firstPayment) }}</span></div>
                  <div class="flex justify-between"><span class="text-gray-500">Última parcela:</span><span class="font-medium">{{ formatCurrency(result.systems.sac.lastPayment) }}</span></div>
                  <div class="flex justify-between"><span class="text-gray-500">Total pago:</span><span class="font-medium">{{ formatCurrency(result.systems.sac.totalPaid) }}</span></div>
                  <div class="flex justify-between"><span class="text-gray-500">Total juros:</span><span class="font-medium text-red-600 dark:text-red-400">{{ formatCurrency(result.systems.sac.totalInterest) }}</span></div>
                </div>
              </div>
            </div>

            <div v-if="savingsWithSAC > 0" class="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p class="text-sm text-green-700 dark:text-green-300">
                <i class="fa-solid fa-piggy-bank mr-2"></i>
                <strong>Economia com SAC:</strong> {{ formatCurrency(savingsWithSAC) }} menos em juros ao longo do financiamento.
              </p>
            </div>
          </div>

          <!-- Gráfico: Comparativo Price vs SAC -->
          <ChartCard
            title="Gráfico: Total Pago vs Juros"
            icon="fa-chart-column"
            type="bar"
            :series="comparisonChartSeries"
            :options="comparisonChartOptions"
          />

          <!-- Gráfico: Evolução do saldo devedor -->
          <ChartCard
            title="Evolução do Saldo Devedor"
            icon="fa-chart-area"
            type="area"
            :series="balanceChartSeries"
            :options="balanceChartOptions"
          />

          <!-- Additional Costs -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fa-solid fa-receipt text-primary-500"></i> Custos Adicionais
            </h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                <span class="text-gray-600 dark:text-gray-400">ITBI (Imposto de Transmissão)</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatCurrency(result.additionalCosts.itbi) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                <span class="text-gray-600 dark:text-gray-400">Registro em Cartório</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatCurrency(result.additionalCosts.cartorio) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                <span class="text-gray-600 dark:text-gray-400">Avaliação do Imóvel</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatCurrency(result.additionalCosts.evaluation) }}</span>
              </div>
              <div v-if="params.includeIOF" class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                <span class="text-gray-600 dark:text-gray-400">IOF</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatCurrency(result.additionalCosts.iof) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 text-lg">
                <span class="font-bold text-gray-900 dark:text-white">Total Custos Adicionais</span>
                <span class="font-bold text-primary-600 dark:text-primary-400">{{ formatCurrency(result.additionalCosts.total) }}</span>
              </div>
            </div>
          </div>

          <!-- Amortization Table -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fa-solid fa-table text-primary-500"></i> Tabela de Amortização (12 primeiros meses)
            </h2>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-slate-600">
                    <th class="py-2 px-3 text-left font-medium text-gray-500 dark:text-gray-400">Mês</th>
                    <th class="py-2 px-3 text-right font-medium text-gray-500 dark:text-gray-400">Parcela</th>
                    <th class="py-2 px-3 text-right font-medium text-gray-500 dark:text-gray-400">Amortização</th>
                    <th class="py-2 px-3 text-right font-medium text-gray-500 dark:text-gray-400">Juros</th>
                    <th class="py-2 px-3 text-right font-medium text-gray-500 dark:text-gray-400">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in result.selectedSystem.table.slice(0, 12)" :key="row.month" class="border-b border-gray-50 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30">
                    <td class="py-2 px-3 text-gray-700 dark:text-gray-300">{{ row.month }}</td>
                    <td class="py-2 px-3 text-right font-medium text-gray-900 dark:text-white">{{ formatCurrency(row.payment) }}</td>
                    <td class="py-2 px-3 text-right text-green-600 dark:text-green-400">{{ formatCurrency(row.principal) }}</td>
                    <td class="py-2 px-3 text-right text-red-600 dark:text-red-400">{{ formatCurrency(row.interest) }}</td>
                    <td class="py-2 px-3 text-right text-gray-700 dark:text-gray-300">{{ formatCurrency(row.balance) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Timeline -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fa-solid fa-timeline text-primary-500"></i> Cronograma do Processo
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Tempo estimado total: <span class="font-bold text-gray-900 dark:text-white">{{ result.timeline.totalDays }} dias</span>
            </p>
            <div class="space-y-4">
              <div v-for="(phase, index) in result.timeline.phases" :key="index" class="flex gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{{ index + 1 }}</div>
                  <div v-if="index < result.timeline.phases.length - 1" class="w-0.5 flex-1 bg-gray-200 dark:bg-slate-600 mt-1"></div>
                </div>
                <div class="pb-4">
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ phase.phase }}</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ phase.description }}</p>
                  <span class="badge-primary mt-1">~{{ phase.estimatedDays }} dias</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Sidebar Results -->
      <div class="space-y-6">
        <div class="card p-6 sticky top-20">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-chart-line text-primary-500"></i> Resumo
          </h2>

          <template v-if="result">
            <div class="text-center p-5 gradient-primary rounded-xl mb-4">
              <p class="text-sm text-white/80 mb-1">Parcela ({{ params.system === 'price' ? 'Price' : 'SAC' }})</p>
              <p class="text-3xl font-bold text-white">{{ formatCurrency(result.selectedSystem.firstPayment) }}</p>
              <p class="text-xs text-white/60 mt-1">primeira parcela</p>
            </div>

            <!-- Affordability -->
            <div :class="['p-3 rounded-lg border mb-4', recommendationClass]">
              <div class="flex items-center gap-2 mb-1">
                <i :class="['fa-solid text-sm', recommendationIcon]"></i>
                <span class="font-medium text-sm capitalize">{{ result.affordabilityAnalysis.recommendation }}</span>
              </div>
              <p class="text-xs">
                Comprometimento da renda: {{ result.affordabilityAnalysis.debtToIncomeRatio.toFixed(1) }}%
              </p>
            </div>

            <!-- Key figures -->
            <div class="space-y-3 text-sm border-t border-gray-100 dark:border-slate-700 pt-4">
              <div class="flex justify-between">
                <span class="text-gray-500">Valor financiado:</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(result.financedAmount) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Total de juros:</span>
                <span class="font-medium text-red-600 dark:text-red-400">{{ formatCurrency(result.selectedSystem.totalInterest) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Total pago:</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(result.selectedSystem.totalPaid) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Renda necessária:</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(result.affordabilityAnalysis.monthlyIncomeNeeded) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Imóvel máximo aprovável:</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(result.affordabilityAnalysis.maxAffordableValue) }}</span>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="text-center py-8 text-gray-400">
              <i class="fa-solid fa-piggy-bank text-4xl mb-3 opacity-50"></i>
              <p class="text-sm">Preencha os dados para simular</p>
            </div>
          </template>
        </div>

        <!-- Note -->
        <div class="card p-4 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/20">
          <p class="text-xs text-amber-800 dark:text-amber-300">
            <i class="fa-solid fa-triangle-exclamation mr-1"></i>
            <strong>Importante:</strong> Simulação para fins informativos. Consulte seu banco para condições exatas.
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
            <h3 class="text-2xl font-bold mb-4">Precisa de um Sistema Financeiro Personalizado?</h3>
            <p class="opacity-90 leading-relaxed">
              Desenvolvemos sistemas de cálculo, simuladores e plataformas web sob demanda para empresas do setor imobiliário e financeiro.
            </p>
          </div>
          <div class="p-8 flex flex-col justify-center">
            <ul class="space-y-3 mb-6">
              <li v-for="item in ['Simuladores de Crédito', 'Portais Imobiliários', 'Sistemas de Gestão', 'Aplicativos PWA']" :key="item" class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
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
