<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface FinancialInputs {
  revenue: number; ebit: number; depreciation: number; netIncome: number
  equity: number; totalAssets: number; marketCap: number; enterpriseValue: number
  dividends: number; currentAssets: number; currentLiabilities: number; inventory: number
}

interface IndicatorResult {
  key: string; name: string; value: number; formatted: string
  description: string; status: 'good' | 'warning' | 'bad' | 'neutral'
}

const fields: { key: keyof FinancialInputs; label: string }[] = [
  { key: 'revenue', label: 'Receita (R$)' },
  { key: 'ebit', label: 'EBIT (R$)' },
  { key: 'depreciation', label: 'Depreciação e Amortização (R$)' },
  { key: 'netIncome', label: 'Lucro Líquido (R$)' },
  { key: 'equity', label: 'Patrimônio Líquido (R$)' },
  { key: 'totalAssets', label: 'Total de Ativos (R$)' },
  { key: 'marketCap', label: 'Valor de Mercado (R$)' },
  { key: 'enterpriseValue', label: 'Valor da Empresa (R$)' },
  { key: 'dividends', label: 'Dividendos Pagos (R$)' },
  { key: 'currentAssets', label: 'Ativos Circulantes (R$)' },
  { key: 'currentLiabilities', label: 'Passivos Circulantes (R$)' },
  { key: 'inventory', label: 'Estoque (R$)' },
]

const form = reactive<FinancialInputs>({
  revenue: 0, ebit: 0, depreciation: 0, netIncome: 0,
  equity: 0, totalAssets: 0, marketCap: 0, enterpriseValue: 0,
  dividends: 0, currentAssets: 0, currentLiabilities: 0, inventory: 0,
})

const results = ref<IndicatorResult[]>([])
const calculatedAt = ref('')

function fmtMoeda(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function fmtPct(v: number) { return `${(v * 100).toFixed(2)}%` }
function fmtDec(v: number) { return v.toFixed(2) }

function calcular() {
  const f = form
  const ebitda = f.ebit + f.depreciation
  const roe = f.equity !== 0 ? f.netIncome / f.equity : 0
  const roa = f.totalAssets !== 0 ? f.netIncome / f.totalAssets : 0
  const pl = f.netIncome !== 0 ? f.marketCap / f.netIncome : 0
  const evEbitda = ebitda !== 0 ? f.enterpriseValue / ebitda : 0
  const profitMargin = f.revenue !== 0 ? f.netIncome / f.revenue : 0
  const dividendYield = f.marketCap !== 0 ? f.dividends / f.marketCap : 0
  const currentRatio = f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : 0
  const quickRatio = f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : 0

  function status(key: string, v: number): 'good' | 'warning' | 'bad' | 'neutral' {
    if (key === 'roe') return v > 0.15 ? 'good' : v > 0.08 ? 'warning' : 'bad'
    if (key === 'roa') return v > 0.08 ? 'good' : v > 0.03 ? 'warning' : 'bad'
    if (key === 'profitMargin') return v > 0.15 ? 'good' : v > 0.05 ? 'warning' : 'bad'
    if (key === 'currentRatio') return v >= 2 ? 'good' : v >= 1 ? 'warning' : 'bad'
    if (key === 'quickRatio') return v >= 1.5 ? 'good' : v >= 1 ? 'warning' : 'bad'
    if (key === 'dividendYield') return v > 0.06 ? 'good' : v > 0.03 ? 'warning' : 'neutral'
    return 'neutral'
  }

  results.value = [
    { key: 'ebitda', name: 'EBITDA', value: ebitda, formatted: fmtMoeda(ebitda), description: 'Lucro antes de juros, impostos, depreciação e amortização', status: ebitda > 0 ? 'good' : 'bad' },
    { key: 'roe', name: 'ROE', value: roe, formatted: fmtPct(roe), description: 'Retorno sobre o Patrimônio Líquido', status: status('roe', roe) },
    { key: 'roa', name: 'ROA', value: roa, formatted: fmtPct(roa), description: 'Retorno sobre os Ativos', status: status('roa', roa) },
    { key: 'pl', name: 'P/L', value: pl, formatted: fmtDec(pl), description: 'Preço/Lucro — quanto o mercado paga por R$1 de lucro', status: pl > 0 && pl < 20 ? 'good' : pl < 30 ? 'warning' : 'neutral' },
    { key: 'evEbitda', name: 'EV/EBITDA', value: evEbitda, formatted: fmtDec(evEbitda), description: 'Valor da Empresa / EBITDA', status: evEbitda > 0 && evEbitda < 10 ? 'good' : evEbitda < 15 ? 'warning' : 'neutral' },
    { key: 'profitMargin', name: 'Margem de Lucro', value: profitMargin, formatted: fmtPct(profitMargin), description: 'Lucro Líquido / Receita', status: status('profitMargin', profitMargin) },
    { key: 'dividendYield', name: 'Dividend Yield', value: dividendYield, formatted: fmtPct(dividendYield), description: 'Dividendos / Valor de Mercado', status: status('dividendYield', dividendYield) },
    { key: 'currentRatio', name: 'Liquidez Corrente', value: currentRatio, formatted: fmtDec(currentRatio), description: 'Ativos Circulantes / Passivos Circulantes', status: status('currentRatio', currentRatio) },
    { key: 'quickRatio', name: 'Liquidez Seca', value: quickRatio, formatted: fmtDec(quickRatio), description: '(Ativos Circulantes − Estoque) / Passivos Circulantes', status: status('quickRatio', quickRatio) },
  ]
  calculatedAt.value = new Date().toLocaleString('pt-BR')
  Swal.fire({ icon: 'success', title: 'Indicadores calculados!', timer: 1600, showConfirmButton: false })
}

function limpar() { Object.keys(form).forEach(k => (form as any)[k] = 0); results.value = [] }

const statusClasses = { good: 'bg-green-900/20 border-green-500/30 text-green-400', warning: 'bg-yellow-900/20 border-yellow-500/30 text-yellow-400', bad: 'bg-red-900/20 border-red-500/30 text-red-400', neutral: 'bg-blue-900/20 border-blue-500/30 text-blue-400' }
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:chart-finance" class="text-cyan-400 w-7 h-7" />
        Calculadora de Indicadores Financeiros
      </h1>
      <p class="text-blue-200 text-sm">Calcule EBITDA, ROE, ROA, P/L, EV/EBITDA, Margens e Liquidez</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Formulário -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <h2 class="text-white font-semibold text-sm flex items-center gap-2">
          <Icon icon="mdi:pencil-outline" class="text-cyan-400 w-4 h-4" />
          Dados Financeiros
        </h2>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="f in fields" :key="f.key">
            <label class="text-blue-200 text-xs font-medium block mb-0.5">{{ f.label }}</label>
            <input v-model.number="form[f.key]" type="number" autocomplete="off" placeholder="0,00"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
          </div>
        </div>
        <div class="flex gap-3 pt-1">
          <button @click="calcular"
            class="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular Indicadores
          </button>
          <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-lg transition-colors text-sm">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Resultados -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-white font-semibold text-sm flex items-center gap-2">
            <Icon icon="mdi:poll" class="text-cyan-400 w-4 h-4" />
            Resultados
          </h2>
          <span v-if="calculatedAt" class="text-blue-300 text-xs">{{ calculatedAt }}</span>
        </div>

        <div v-if="results.length" class="space-y-2">
          <div v-for="r in results" :key="r.key" :class="['border rounded-lg p-3', statusClasses[r.status]]">
            <div class="flex items-center justify-between mb-0.5">
              <span class="font-semibold text-sm">{{ r.name }}</span>
              <span class="font-bold text-sm">{{ r.formatted }}</span>
            </div>
            <p class="text-xs opacity-80">{{ r.description }}</p>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-10 text-center">
          <Icon icon="mdi:chart-line" class="w-12 h-12 text-cyan-400/20 mb-3" />
          <p class="text-blue-200 text-sm">Preencha os dados financeiros e calcule</p>
        </div>
      </div>
    </div>
  </div>
</template>
