<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

type Tab = 'empresa' | 'precificacao' | 'marketing' | 'saude'
const activeTab = ref<Tab>('empresa')
const notification = ref('')

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
function parse(s: string | number) { return typeof s === 'number' ? s : parseFloat(String(s).replace(',', '.')) || 0 }

// === EMPRESA ===
const emp = ref({ faturamento: '', custoFixo: '', custoVariavel: '', setor: 'servicos' as const })
const empResult = ref<{ margemBruta: number; ptoEq: number; lucrat: number; projecaoAnual: number; vendas: number; operacional: number; producao: number } | null>(null)

const setores: Record<string, { vendas: number; op: number; prod: number }> = {
  servicos: { vendas: 0.40, op: 0.35, prod: 0.25 },
  comercio: { vendas: 0.35, op: 0.30, prod: 0.35 },
  industria: { vendas: 0.30, op: 0.30, prod: 0.40 },
  tecnologia: { vendas: 0.45, op: 0.40, prod: 0.15 },
}

function calcEmpresa() {
  const fat = parse(emp.value.faturamento)
  const cf = parse(emp.value.custoFixo)
  const cv = parse(emp.value.custoVariavel)
  if (fat <= 0) return
  const s = setores[emp.value.setor] || setores.servicos
  const lucroB = fat - cf - cv
  empResult.value = {
    margemBruta: ((fat - cv) / fat) * 100,
    ptoEq: cf > 0 && fat > cv ? cf / (1 - cv / fat) : 0,
    lucrat: (lucroB / fat) * 100,
    projecaoAnual: fat * 12,
    vendas: fat * s.vendas,
    operacional: fat * s.op,
    producao: fat * s.prod,
  }
  toast('Calculado!')
}

// === PRECIFICAÇÃO ===
const prec = ref({ custo: '', metodo: 'margem', percentual: '' })
const precResult = computed(() => {
  const c = parse(prec.value.custo)
  const p = parse(prec.value.percentual)
  if (c <= 0 || p <= 0) return null
  const pv = prec.value.metodo === 'markup' ? c * (1 + p / 100) : c / (1 - p / 100)
  return { pv, lucro: pv - c, markup: pv / c, margem: ((pv - c) / pv) * 100 }
})

// === MARKETING ===
const mkt = ref({ investimento: '', alcance: '', conversao: '', ticketMedio: '' })
const mktResult = computed(() => {
  const inv = parse(mkt.value.investimento)
  const alc = parse(mkt.value.alcance)
  const conv = parse(mkt.value.conversao) / 100
  const ticket = parse(mkt.value.ticketMedio)
  if (!inv || !alc || !conv || !ticket) return null
  const leads = Math.round(alc * conv)
  const receita = leads * ticket
  const roi = ((receita - inv) / inv) * 100
  const cpa = leads > 0 ? inv / leads : 0
  return { leads, receita, roi, cpa }
})

// === SAÚDE FINANCEIRA ===
const saude = ref({ receitaBruta: '', despesasFixas: '', despesasVariaveis: '', impostos: '' })
const saudeResult = computed(() => {
  const rb = parse(saude.value.receitaBruta)
  const df = parse(saude.value.despesasFixas)
  const dv = parse(saude.value.despesasVariaveis)
  const imp = parse(saude.value.impostos)
  if (rb <= 0) return null
  const totalDespesas = df + dv + imp
  const lucroLiq = rb - totalDespesas
  const margemLiq = (lucroLiq / rb) * 100
  const indiceEnd = totalDespesas / rb * 100
  const reserva = lucroLiq > 0 ? lucroLiq * 0.2 : 0
  return { lucroLiq, margemLiq, indiceEnd, reserva, totalDespesas }
})

function toast(msg: string) { notification.value = msg; setTimeout(() => { notification.value = '' }, 2000) }

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'empresa', label: 'Empresarial', icon: 'mdi:office-building' },
  { id: 'precificacao', label: 'Precificação', icon: 'mdi:tag' },
  { id: 'marketing', label: 'Marketing', icon: 'mdi:bullhorn' },
  { id: 'saude', label: 'Saúde Financeira', icon: 'mdi:heart-pulse' },
]
</script>

<template>
  <ToolShell

    title="Simuladores Empresariais"

    description="Simule cenários de negócio e tome decisões estratégicas com dados."

    icon="fa-building-columns"

    icon-gradient="from-indigo-500 to-blue-700"

    orb-color="blue"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:chart-areaspline" class="text-indigo-400 w-7 h-7" />
        Simuladores Empresariais
      </h1>
      <p class="text-blue-200 text-sm">Ferramentas de gestão e análise para tomada de decisão</p>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2">
      <button v-for="t in tabs" :key="t.id" @click="activeTab = t.id"
        :class="['flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all border',
          activeTab === t.id ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-[#0f1e3c] border-white/10 text-blue-200 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-4 h-4" />{{ t.label }}
      </button>
    </div>

    <!-- Empresarial -->
    <div v-if="activeTab === 'empresa'" class="grid lg:grid-cols-2 gap-4">
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:office-building" class="text-indigo-400 w-5 h-5" /> Orçamento Empresarial</h2>
        <div class="space-y-3">
          <div>
            <label class="input-aurora-label">Faturamento Mensal (R$)</label>
            <input v-model="emp.faturamento" type="number" min="0" placeholder="50.000" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Setor</label>
            <select v-model="emp.setor" class="w-full input-aurora">
              <option value="servicos">Serviços</option>
              <option value="comercio">Comércio</option>
              <option value="industria">Indústria</option>
              <option value="tecnologia">Tecnologia</option>
            </select>
          </div>
          <div>
            <label class="input-aurora-label">Custos Fixos Mensais (R$)</label>
            <input v-model="emp.custoFixo" type="number" min="0" placeholder="15.000" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Custos Variáveis Mensais (R$)</label>
            <input v-model="emp.custoVariavel" type="number" min="0" placeholder="20.000" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <button @click="calcEmpresa" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
            <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular
          </button>
        </div>
      </div>
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold">Resultado</h2>
        <template v-if="empResult">
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-[#0a1628] rounded-lg p-3 text-center">
              <p class="text-blue-200 text-xs">Margem Bruta</p>
              <p class="text-green-400 font-bold">{{ empResult.margemBruta.toFixed(1) }}%</p>
            </div>
            <div class="bg-[#0a1628] rounded-lg p-3 text-center">
              <p class="text-blue-200 text-xs">Lucratividade</p>
              <p :class="[empResult.lucrat >= 0 ? 'text-green-400' : 'text-red-400', 'font-bold']">{{ empResult.lucrat.toFixed(1) }}%</p>
            </div>
            <div class="bg-[#0a1628] rounded-lg p-3 text-center">
              <p class="text-blue-200 text-xs">Ponto de Equilíbrio</p>
              <p class="text-yellow-300 font-bold text-sm">{{ empResult.ptoEq > 0 ? fmt(empResult.ptoEq) : 'Inatingível' }}</p>
            </div>
            <div class="bg-[#0a1628] rounded-lg p-3 text-center">
              <p class="text-blue-200 text-xs">Projeção Anual</p>
              <p class="text-indigo-300 font-bold text-sm">{{ fmt(empResult.projecaoAnual) }}</p>
            </div>
          </div>
          <div class="space-y-1.5">
            <div v-for="[k, v, c] in [['Vendas', empResult.vendas, 'bg-green-600'],['Operacional', empResult.operacional, 'bg-blue-600'],['Produção', empResult.producao, 'bg-yellow-600']] as const" :key="k"
              class="flex items-center gap-2 text-xs">
              <span class="text-blue-200 w-20 shrink-0">{{ k }}</span>
              <div class="flex-1 h-4 bg-gray-800 rounded relative">
                <div :class="['h-4 rounded', c]" :style="{ width: `${(v / parse(emp.faturamento)) * 100}%` }"></div>
              </div>
              <span class="text-white w-24 shrink-0 text-right">{{ fmt(v) }}</span>
            </div>
          </div>
        </template>
        <div v-else class="flex flex-col items-center justify-center h-40">
          <Icon icon="mdi:chart-donut" class="w-10 h-10 text-indigo-400/20 mb-2" />
          <p class="text-blue-200 text-sm">Preencha e calcule</p>
        </div>
      </div>
    </div>

    <!-- Precificação -->
    <div v-if="activeTab === 'precificacao'" class="grid lg:grid-cols-2 gap-4">
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:tag" class="text-indigo-400 w-5 h-5" /> Simulador de Preço</h2>
        <div class="space-y-3">
          <div>
            <label class="input-aurora-label">Custo (R$)</label>
            <input v-model="prec.custo" type="number" min="0" placeholder="100" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-2">Método</label>
            <div class="flex gap-2">
              <button @click="prec.metodo = 'margem'" :class="['flex-1 py-2 rounded-lg text-sm font-medium transition-all border', prec.metodo === 'margem' ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/5']">Margem sobre venda</button>
              <button @click="prec.metodo = 'markup'" :class="['flex-1 py-2 rounded-lg text-sm font-medium transition-all border', prec.metodo === 'markup' ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/5']">Markup</button>
            </div>
          </div>
          <div>
            <label class="input-aurora-label">{{ prec.metodo === 'markup' ? 'Markup' : 'Margem' }} (%)</label>
            <input v-model="prec.percentual" type="number" min="0" max="99" placeholder="30" autocomplete="off"
              class="w-full input-aurora" />
          </div>
        </div>
      </div>
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold">Resultado</h2>
        <template v-if="precResult">
          <div class="text-center bg-indigo-600/20 rounded-xl p-4 mb-2">
            <p class="text-blue-200 text-sm">Preço de Venda</p>
            <p class="text-indigo-300 text-3xl font-extrabold">{{ fmt(precResult.pv) }}</p>
          </div>
          <div class="space-y-1.5 text-sm">
            <div class="flex justify-between"><span class="text-blue-200">Lucro:</span><span class="text-green-400">{{ fmt(precResult.lucro) }}</span></div>
            <div class="flex justify-between"><span class="text-blue-200">Markup:</span><span class="text-white">{{ precResult.markup.toFixed(2) }}x</span></div>
            <div class="flex justify-between"><span class="text-blue-200">Margem líquida:</span><span class="text-white">{{ precResult.margem.toFixed(1) }}%</span></div>
          </div>
        </template>
        <div v-else class="flex items-center justify-center h-28"><p class="text-blue-200 text-sm">Preencha os dados</p></div>
      </div>
    </div>

    <!-- Marketing -->
    <div v-if="activeTab === 'marketing'" class="grid lg:grid-cols-2 gap-4">
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:bullhorn" class="text-indigo-400 w-5 h-5" /> Simulador de Marketing</h2>
        <div class="space-y-3">
          <div>
            <label class="input-aurora-label">Investimento em anúncios (R$)</label>
            <input v-model="mkt.investimento" type="number" min="0" placeholder="1000" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Alcance estimado (pessoas)</label>
            <input v-model="mkt.alcance" type="number" min="0" placeholder="5000" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Taxa de conversão (%)</label>
            <input v-model="mkt.conversao" type="number" min="0" max="100" step="0.1" placeholder="2" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Ticket médio (R$)</label>
            <input v-model="mkt.ticketMedio" type="number" min="0" placeholder="150" autocomplete="off"
              class="w-full input-aurora" />
          </div>
        </div>
      </div>
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold">Resultado</h2>
        <template v-if="mktResult">
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-[#0a1628] rounded-lg p-3 text-center"><p class="text-blue-200 text-xs">Leads</p><p class="text-blue-300 font-bold text-xl">{{ mktResult.leads }}</p></div>
            <div class="bg-[#0a1628] rounded-lg p-3 text-center"><p class="text-blue-200 text-xs">Receita</p><p class="text-green-400 font-bold">{{ fmt(mktResult.receita) }}</p></div>
            <div class="bg-[#0a1628] rounded-lg p-3 text-center"><p class="text-blue-200 text-xs">ROI</p><p :class="[mktResult.roi >= 0 ? 'text-green-400' : 'text-red-400', 'font-bold text-xl']">{{ mktResult.roi.toFixed(1) }}%</p></div>
            <div class="bg-[#0a1628] rounded-lg p-3 text-center"><p class="text-blue-200 text-xs">Custo/Lead</p><p class="text-yellow-300 font-bold">{{ fmt(mktResult.cpa) }}</p></div>
          </div>
        </template>
        <div v-else class="flex items-center justify-center h-28"><p class="text-blue-200 text-sm">Preencha os dados</p></div>
      </div>
    </div>

    <!-- Saúde Financeira -->
    <div v-if="activeTab === 'saude'" class="grid lg:grid-cols-2 gap-4">
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:heart-pulse" class="text-indigo-400 w-5 h-5" /> Saúde Financeira</h2>
        <div class="space-y-3">
          <div><label class="input-aurora-label">Receita Bruta (R$)</label>
            <input v-model="saude.receitaBruta" type="number" min="0" placeholder="100.000" autocomplete="off" class="w-full input-aurora" /></div>
          <div><label class="input-aurora-label">Despesas Fixas (R$)</label>
            <input v-model="saude.despesasFixas" type="number" min="0" placeholder="30.000" autocomplete="off" class="w-full input-aurora" /></div>
          <div><label class="input-aurora-label">Despesas Variáveis (R$)</label>
            <input v-model="saude.despesasVariaveis" type="number" min="0" placeholder="20.000" autocomplete="off" class="w-full input-aurora" /></div>
          <div><label class="input-aurora-label">Impostos (R$)</label>
            <input v-model="saude.impostos" type="number" min="0" placeholder="6.000" autocomplete="off" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold">Resultado</h2>
        <template v-if="saudeResult">
          <div class="text-center bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl p-4 mb-2">
            <p class="text-blue-200 text-sm">Lucro Líquido</p>
            <p :class="[saudeResult.lucroLiq >= 0 ? 'text-green-400' : 'text-red-400', 'text-3xl font-extrabold']">{{ fmt(saudeResult.lucroLiq) }}</p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-[#0a1628] rounded-lg p-3 text-center"><p class="text-blue-200 text-xs">Margem Líquida</p><p :class="[saudeResult.margemLiq >= 10 ? 'text-green-400' : 'text-orange-400', 'font-bold text-lg']">{{ saudeResult.margemLiq.toFixed(1) }}%</p></div>
            <div class="bg-[#0a1628] rounded-lg p-3 text-center"><p class="text-blue-200 text-xs">Índice de Endividamento</p><p :class="[saudeResult.indiceEnd <= 70 ? 'text-green-400' : 'text-red-400', 'font-bold text-lg']">{{ saudeResult.indiceEnd.toFixed(1) }}%</p></div>
            <div class="bg-[#0a1628] rounded-lg p-3 text-center col-span-2"><p class="text-blue-200 text-xs">Reserva Sugerida (20% do lucro)</p><p class="text-yellow-300 font-bold">{{ fmt(saudeResult.reserva) }}</p></div>
          </div>
        </template>
        <div v-else class="flex items-center justify-center h-28"><p class="text-blue-200 text-sm">Preencha os dados</p></div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="notification" class="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">{{ notification }}</div>
    </Transition>
  


  </ToolShell></template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>