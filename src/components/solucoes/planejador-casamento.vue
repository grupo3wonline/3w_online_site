<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'

interface BudgetCategory {
  name: string
  icon: string
  basePrice: number
  perGuestMultiplier: number
  locationMultiplier: Record<string, number>
  tips: string[]
}

const guests = ref(100)
const location = ref('interior')
const maxBudget = ref(50000)
const activeTab = ref<'calculator' | 'breakdown' | 'tips'>('calculator')

const categories: BudgetCategory[] = [
  { name: 'Local da Cerimônia', icon: 'mdi:map-marker-outline', basePrice: 3000, perGuestMultiplier: 15,
    locationMultiplier: { capital: 1.5, interior: 1.0, praia: 1.3 },
    tips: ['Dias de semana têm desconto de até 40%', 'Locais municipais custam 70% menos', 'Verifique se inclui decoração básica'] },
  { name: 'Buffet e Bebidas', icon: 'mdi:food-fork-drink', basePrice: 2000, perGuestMultiplier: 45,
    locationMultiplier: { capital: 1.4, interior: 1.0, praia: 1.2 },
    tips: ['Buffet por pessoa sai mais barato', 'Limite bebidas importadas (economiza 30%)', 'Cardápio da estação reduz custos'] },
  { name: 'Fotografia e Filmagem', icon: 'mdi:camera-outline', basePrice: 2500, perGuestMultiplier: 8,
    locationMultiplier: { capital: 1.3, interior: 1.0, praia: 1.1 },
    tips: ['Contrate só foto OU vídeo', 'Fotógrafos iniciantes cobram 50% menos', 'Pacotes digitais custam menos'] },
  { name: 'Decoração e Flores', icon: 'mdi:flower-outline', basePrice: 1500, perGuestMultiplier: 12,
    locationMultiplier: { capital: 1.3, interior: 1.0, praia: 1.2 },
    tips: ['Flores da estação custam 60% menos', 'Reutilize arranjos da cerimônia na festa', 'DIY economiza até R$ 3.000'] },
  { name: 'Música e Entretenimento', icon: 'mdi:music-note', basePrice: 1200, perGuestMultiplier: 5,
    locationMultiplier: { capital: 1.2, interior: 1.0, praia: 1.1 },
    tips: ['DJ custa 70% menos que banda', 'Playlist própria elimina custos', 'Som básico para cerimônia é suficiente'] },
  { name: 'Transporte', icon: 'mdi:car-outline', basePrice: 800, perGuestMultiplier: 2,
    locationMultiplier: { capital: 1.2, interior: 1.0, praia: 1.3 },
    tips: ['Carro de amigo decorado é charmoso', 'Uber pode ser mais barato', 'Transporte só para os noivos reduz custos'] },
]

const budget = computed(() => {
  return categories.map(c => {
    const mult = c.locationMultiplier[location.value] ?? 1
    const amount = (c.basePrice + c.perGuestMultiplier * guests.value) * mult
    return { ...c, amount }
  })
})

const totalBudget = computed(() => budget.value.reduce((s, c) => s + c.amount, 0))

const budgetStatus = computed(() => {
  const pct = totalBudget.value / maxBudget.value
  if (pct <= 0.8) return { text: 'Orçamento excelente!', color: 'text-emerald-400', barColor: 'bg-emerald-500' }
  if (pct <= 1.0) return { text: 'Dentro do orçamento', color: 'text-blue-400', barColor: 'bg-blue-500' }
  if (pct <= 1.2) return { text: 'Ligeiramente acima', color: 'text-yellow-400', barColor: 'bg-yellow-500' }
  return { text: 'Acima do orçamento!', color: 'text-red-400', barColor: 'bg-red-500' }
})

const budgetPct = computed(() => Math.min((totalBudget.value / maxBudget.value) * 100, 100))

function fmt(val: number) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function downloadReport() {
  const lines = [
    'ORÇAMENTO DE CASAMENTO',
    '',
    `Convidados: ${guests.value}`,
    `Localização: ${location.value}`,
    '',
    'Detalhamento:',
    ...budget.value.map(c => `  ${c.name}: ${fmt(c.amount)}`),
    '',
    `TOTAL: ${fmt(totalBudget.value)}`,
    `ORÇAMENTO MÁXIMO: ${fmt(maxBudget.value)}`,
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'orcamento-casamento.txt'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:heart" class="text-pink-400 w-7 h-7" />
        Planejador de Casamento
      </h1>
      <p class="text-blue-300/70 text-sm">Calcule o orçamento do seu casamento</p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 bg-[#111d3a] border border-white/10 rounded-xl p-1 mb-5">
      <button v-for="tab in [
        { id: 'calculator', label: 'Calculadora', icon: 'mdi:calculator-variant-outline' },
        { id: 'breakdown', label: 'Detalhamento', icon: 'mdi:chart-bar' },
        { id: 'tips', label: 'Dicas', icon: 'mdi:lightbulb-outline' },
      ]" :key="tab.id"
        @click="activeTab = tab.id as any"
        :class="activeTab === tab.id ? 'bg-pink-600 text-white shadow' : 'text-blue-300 hover:text-white hover:bg-white/5'"
        class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
      >
        <Icon :icon="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Calculator Tab -->
    <div v-if="activeTab === 'calculator'" class="space-y-4">
      <!-- Configuration -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Configuração do Casamento</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="text-blue-300 text-xs block mb-1">Convidados: <span class="text-white font-semibold">{{ guests }}</span></label>
            <input type="range" v-model.number="guests" min="10" max="500" step="5" class="w-full accent-pink-500" />
            <div class="flex justify-between text-xs text-blue-400/60 mt-1"><span>10</span><span>500</span></div>
          </div>
          <div>
            <label class="text-blue-300 text-xs block mb-1">Localização</label>
            <select v-model="location"
              class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-pink-500 focus:outline-none">
              <option value="interior">Interior/Cidade Pequena</option>
              <option value="capital">Capital/Grande Centro</option>
              <option value="praia">Destino de Praia</option>
            </select>
          </div>
          <div>
            <label class="text-blue-300 text-xs block mb-1">Orçamento máximo: <span class="text-white font-semibold">{{ fmt(maxBudget) }}</span></label>
            <input type="range" v-model.number="maxBudget" min="10000" max="200000" step="5000" class="w-full accent-pink-500" />
            <div class="flex justify-between text-xs text-blue-400/60 mt-1"><span>R$10k</span><span>R$200k</span></div>
          </div>
        </div>
      </div>

      <!-- Budget Status -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-3">
        <div class="flex items-center justify-between">
          <span :class="`font-semibold text-sm ${budgetStatus.color}`">{{ budgetStatus.text }}</span>
          <div class="text-right">
            <div class="text-2xl font-bold text-pink-400">{{ fmt(totalBudget) }}</div>
            <div class="text-xs text-blue-300/60">Limite: {{ fmt(maxBudget) }}</div>
          </div>
        </div>
        <div class="w-full bg-white/10 rounded-full h-3">
          <div :class="`${budgetStatus.barColor} h-3 rounded-full transition-all duration-500`" :style="`width: ${budgetPct}%`" />
        </div>
        <p class="text-blue-300/60 text-xs">{{ budgetPct.toFixed(1) }}% do orçamento máximo utilizado</p>
      </div>

      <!-- Category Cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="c in budget" :key="c.name" class="bg-[#111d3a] border border-white/10 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <Icon :icon="c.icon" class="w-5 h-5 text-pink-400" />
            <span class="text-white text-sm font-medium">{{ c.name }}</span>
          </div>
          <div class="text-pink-300 text-lg font-bold">{{ fmt(c.amount) }}</div>
          <div class="text-blue-300/50 text-xs mt-1">
            {{ totalBudget > 0 ? ((c.amount / totalBudget) * 100).toFixed(1) : 0 }}% do total
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="downloadReport"
          class="flex items-center gap-2 px-5 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-sm transition-colors">
          <Icon icon="mdi:download" class="w-4 h-4" />
          Baixar Relatório
        </button>
      </div>
    </div>

    <!-- Breakdown Tab -->
    <div v-if="activeTab === 'breakdown'" class="space-y-4">
      <div class="grid grid-cols-3 gap-3">
        <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4 text-center">
          <div class="text-pink-400 font-bold text-xl">{{ fmt(totalBudget) }}</div>
          <div class="text-blue-300/60 text-xs mt-1">Total Estimado</div>
        </div>
        <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4 text-center">
          <div class="text-pink-400 font-bold text-xl">{{ fmt(guests > 0 ? totalBudget / guests : 0) }}</div>
          <div class="text-blue-300/60 text-xs mt-1">Por Convidado</div>
        </div>
        <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4 text-center">
          <div :class="`font-bold text-xl ${maxBudget >= totalBudget ? 'text-emerald-400' : 'text-red-400'}`">
            {{ maxBudget >= totalBudget ? fmt(maxBudget - totalBudget) : `-${fmt(totalBudget - maxBudget)}` }}
          </div>
          <div class="text-blue-300/60 text-xs mt-1">{{ maxBudget >= totalBudget ? 'Economia Possível' : 'Acima do Limite' }}</div>
        </div>
      </div>
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-3">
        <h3 class="text-blue-200 text-sm font-semibold">Distribuição por Categoria</h3>
        <div v-for="c in [...budget].sort((a, b) => b.amount - a.amount)" :key="c.name" class="space-y-1">
          <div class="flex justify-between text-xs">
            <span class="text-blue-300">{{ c.name }}</span>
            <span class="text-white">{{ fmt(c.amount) }} ({{ totalBudget > 0 ? ((c.amount / totalBudget) * 100).toFixed(1) : 0 }}%)</span>
          </div>
          <div class="w-full bg-white/10 rounded-full h-1.5">
            <div class="bg-pink-500 h-1.5 rounded-full" :style="`width: ${totalBudget > 0 ? (c.amount / totalBudget) * 100 : 0}%`" />
          </div>
        </div>
      </div>
    </div>

    <!-- Tips Tab -->
    <div v-if="activeTab === 'tips'" class="grid sm:grid-cols-2 gap-4">
      <div v-for="c in budget" :key="c.name" class="bg-[#111d3a] border border-white/10 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-3">
          <Icon :icon="c.icon" class="w-5 h-5 text-pink-400" />
          <span class="text-white text-sm font-semibold">{{ c.name }}</span>
        </div>
        <div class="text-pink-300 text-sm font-semibold mb-2">{{ fmt(c.amount) }}</div>
        <ul class="space-y-1.5">
          <li v-for="tip in c.tips" :key="tip" class="flex items-start gap-2 text-xs text-blue-300/70">
            <Icon icon="mdi:check-circle-outline" class="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
            {{ tip }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
