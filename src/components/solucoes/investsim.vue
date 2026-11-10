<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'

const form = reactive({ montante: '', tempo: '', aporte: '', taxa: '0.75' })
const resultado = ref<{ investido: number; total: number; lucro: number; rendimento: number } | null>(null)
const isCalculating = ref(false)
const notification = ref('')

const taxasPreDefinidas = [
  { label: 'CDB 100% CDI (~0.75% a.m.)', value: '0.75' },
  { label: 'Poupança (~0.5% a.m.)', value: '0.5' },
  { label: 'Renda Fixa Premium (~1% a.m.)', value: '1.0' },
  { label: 'FII / Fundos (~0.9% a.m.)', value: '0.9' },
  { label: 'Custom', value: 'custom' },
]
const customTaxa = ref('')
const taxaSelected = ref('0.75')

function getTaxa(): number {
  const v = taxaSelected.value === 'custom' ? parseFloat(customTaxa.value) : parseFloat(taxaSelected.value)
  return isNaN(v) ? 0.75 : v
}

function parse(s: string) { return parseFloat(s.replace(',', '.')) || 0 }

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function simular() {
  const m0 = parse(form.montante)
  const anos = parse(form.tempo)
  const aporte = parse(form.aporte)

  if (m0 < 0 || anos <= 0) {
    notification.value = 'Preencha os valores corretamente'
    setTimeout(() => { notification.value = '' }, 2000)
    return
  }

  isCalculating.value = true
  await new Promise(r => setTimeout(r, 400))

  const taxaMensal = getTaxa() / 100
  const meses = anos * 12
  let total = m0

  // Juros compostos com aportes mensais
  for (let i = 0; i < meses; i++) {
    total = total * (1 + taxaMensal) + aporte
  }

  const investido = m0 + aporte * meses
  const lucro = total - investido
  const rendimento = investido > 0 ? (lucro / investido) * 100 : 0

  resultado.value = { investido, total, lucro, rendimento }
  isCalculating.value = false
}

function resetar() {
  Object.assign(form, { montante: '', tempo: '', aporte: '', taxa: '0.75' })
  resultado.value = null
}

// Chart data for growth visualization
const evolucaoAnos = computed(() => {
  if (!resultado.value) return []
  const m0 = parse(form.montante)
  const anos = parse(form.tempo)
  const aporte = parse(form.aporte)
  const taxaMensal = getTaxa() / 100
  const steps = Math.min(Math.ceil(anos), 20)
  const data: { ano: number; total: number; investido: number }[] = []

  for (let ano = 0; ano <= steps; ano++) {
    let t = m0
    const meses = ano * 12
    for (let i = 0; i < meses; i++) t = t * (1 + taxaMensal) + aporte
    data.push({ ano, total: Math.round(t), investido: Math.round(m0 + aporte * meses) })
  }
  return data
})

const maxTotal = computed(() => evolucaoAnos.value.length ? Math.max(...evolucaoAnos.value.map(d => d.total)) : 1)
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 space-y-5">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:trending-up" class="text-green-400 w-7 h-7" />
        InvestSim
      </h1>
      <p class="text-blue-200 text-sm">Simulador de investimentos com juros compostos — visualize seu futuro financeiro</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-5">
      <!-- Form -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:calculator" class="text-green-400 w-5 h-5" /> Dados do Investimento</h2>

        <div>
          <label class="text-blue-200 text-xs font-medium block mb-1">Montante inicial (R$)</label>
          <input v-model="form.montante" type="number" step="100" min="0" placeholder="10.000,00" autocomplete="off"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Tempo (anos)</label>
            <input v-model="form.tempo" type="number" step="0.5" min="0.5" placeholder="10" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50" />
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Aporte mensal (R$)</label>
            <input v-model="form.aporte" type="number" step="50" min="0" placeholder="500,00" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50" />
          </div>
        </div>

        <div>
          <label class="text-blue-200 text-xs font-medium block mb-2">Taxa de Rentabilidade</label>
          <div class="space-y-1.5">
            <button v-for="t in taxasPreDefinidas" :key="t.value" @click="taxaSelected = t.value"
              :class="['w-full text-left px-3 py-2 rounded-lg text-xs transition-all border', taxaSelected === t.value ? 'bg-green-600/20 border-green-500 text-green-300' : 'border-white/10 text-blue-200 hover:bg-white/5']">
              {{ t.label }}
            </button>
          </div>
          <div v-if="taxaSelected === 'custom'" class="mt-2">
            <input v-model="customTaxa" type="number" step="0.01" placeholder="Taxa mensal %" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50" />
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="simular" :disabled="isCalculating"
            :class="['flex-1 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors', isCalculating ? 'bg-gray-700 text-gray-500' : 'bg-green-600 hover:bg-green-500 text-white']">
            <Icon :icon="isCalculating ? 'mdi:loading' : 'mdi:chart-line'" :class="['w-4 h-4', isCalculating ? 'animate-spin' : '']" />
            {{ isCalculating ? 'Calculando...' : 'Simular' }}
          </button>
          <button @click="resetar" class="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg text-sm transition-colors">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Result -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:chart-bar" class="text-green-400 w-5 h-5" /> Resultado</h2>

        <template v-if="resultado">
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-blue-900/30 rounded-xl p-4 text-center">
              <p class="text-blue-300 text-xs mb-1">Valor Investido</p>
              <p class="text-white font-bold text-lg">{{ fmt(resultado.investido) }}</p>
            </div>
            <div class="bg-green-900/30 rounded-xl p-4 text-center">
              <p class="text-green-300 text-xs mb-1">Montante Final</p>
              <p class="text-green-300 font-bold text-lg">{{ fmt(resultado.total) }}</p>
            </div>
            <div class="bg-yellow-900/30 rounded-xl p-4 text-center">
              <p class="text-yellow-300 text-xs mb-1">Lucro</p>
              <p class="text-yellow-300 font-bold text-lg">{{ fmt(resultado.lucro) }}</p>
            </div>
            <div class="bg-purple-900/30 rounded-xl p-4 text-center">
              <p class="text-purple-300 text-xs mb-1">Rendimento</p>
              <p class="text-purple-300 font-bold text-lg">{{ resultado.rendimento.toFixed(1) }}%</p>
            </div>
          </div>

          <!-- Simple bar chart -->
          <div v-if="evolucaoAnos.length > 1" class="space-y-1">
            <p class="text-blue-200 text-xs font-semibold">Evolução por ano:</p>
            <div class="space-y-1 max-h-48 overflow-y-auto">
              <div v-for="d in evolucaoAnos" :key="d.ano" class="flex items-center gap-2 text-xs">
                <span class="text-blue-300 w-12 shrink-0">Ano {{ d.ano }}</span>
                <div class="flex-1 relative h-4 bg-gray-800 rounded">
                  <div class="absolute inset-y-0 left-0 bg-blue-700 rounded"
                    :style="{ width: (d.investido / maxTotal * 100) + '%' }"></div>
                  <div class="absolute inset-y-0 left-0 bg-green-500 rounded opacity-70"
                    :style="{ width: (d.total / maxTotal * 100) + '%' }"></div>
                </div>
                <span class="text-green-300 w-24 shrink-0 text-right">{{ fmt(d.total) }}</span>
              </div>
            </div>
            <div class="flex gap-4 text-xs mt-1">
              <span class="flex items-center gap-1"><span class="w-3 h-2 bg-blue-700 rounded inline-block"></span> Investido</span>
              <span class="flex items-center gap-1"><span class="w-3 h-2 bg-green-500 rounded inline-block opacity-70"></span> Total</span>
            </div>
          </div>
        </template>

        <div v-else class="flex flex-col items-center justify-center h-48">
          <Icon icon="mdi:chart-line-variant" class="w-12 h-12 text-green-400/20 mb-2" />
          <p class="text-blue-200 text-sm">Preencha os dados e simule</p>
          <p class="text-blue-300/50 text-xs mt-1">Cálculo de juros compostos com aportes mensais</p>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
      <p class="text-blue-300 text-xs font-semibold mb-2">💡 Dicas de Investimento</p>
      <ul class="text-blue-200 text-xs space-y-1">
        <li>• Diversifique entre renda fixa, fundos e ações para equilibrar risco e retorno.</li>
        <li>• Aportes mensais regulares potencializam o efeito dos juros compostos.</li>
        <li>• Tenha sempre uma reserva de emergência de 3-6 meses de gastos antes de investir.</li>
        <li>• Os resultados são estimativas — consulte um assessor financeiro para decisões reais.</li>
      </ul>
    </div>

    <Transition name="fade">
      <div v-if="notification" class="fixed bottom-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">{{ notification }}</div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
