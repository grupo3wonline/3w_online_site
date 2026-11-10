<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

type CalcMode = 'landing' | 'rendimentos' | 'ferias' | 'decimo' | 'rescisao' | 'fgts' | 'ir' | 'investimentos'

const currentCalc = ref<CalcMode>('landing')

// --- Rendimentos ---
const salarioBruto = ref(5000)
const horasDia = ref(8)
const diasSemana = ref(5)

const rendimentos = computed(() => {
  const sb = salarioBruto.value
  if (sb <= 0) return null
  const horasMes = horasDia.value * diasSemana.value * 4.33
  const valorHora = sb / horasMes
  const valorDia = valorHora * horasDia.value
  const valorSemana = valorDia * diasSemana.value
  const valorAno = sb * 12
  return {
    hora: valorHora,
    dia: valorDia,
    semana: valorSemana,
    mes: sb,
    ano: valorAno,
  }
})

// --- Férias ---
const salarioFerias = ref(5000)
const mesesAquisitivos = ref(12)

const ferias = computed(() => {
  const s = salarioFerias.value
  const proporcao = Math.min(mesesAquisitivos.value, 12) / 12
  const valorFerias = s * proporcao
  const adicionalUmTerco = valorFerias / 3
  const totalFerias = valorFerias + adicionalUmTerco
  const abono = s / 3
  return { valorFerias, adicionalUmTerco, totalFerias, abono }
})

// --- 13° Salário ---
const salario13 = ref(5000)
const meses13 = ref(12)

const decimoTerceiro = computed(() => {
  const valor = (salario13.value / 12) * Math.min(meses13.value, 12)
  const inss = calcINSS(salario13.value)
  const ir = calcIR(salario13.value - inss)
  const valorLiquido = valor - (inss * (meses13.value / 12)) - (ir * (meses13.value / 12))
  return { valorBruto: valor, valorLiquido: Math.max(0, valorLiquido) }
})

// --- FGTS ---
const salarioFgts = ref(5000)
const mesesFgts = ref(12)

const fgts = computed(() => {
  const deposito = salarioFgts.value * 0.08
  const totalAcumulado = deposito * mesesFgts.value
  const multaRescisao = totalAcumulado * 0.4
  return { deposito, totalAcumulado, multaRescisao }
})

// --- IR ---
const salarioIR = ref(5000)

const impostoRenda = computed(() => {
  const inss = calcINSS(salarioIR.value)
  const baseCalculo = salarioIR.value - inss
  const ir = calcIR(baseCalculo)
  const liquido = salarioIR.value - inss - ir
  const aliquotaEfetiva = salarioIR.value > 0 ? (ir / salarioIR.value) * 100 : 0
  return { salarioBruto: salarioIR.value, inss, ir, liquido, aliquotaEfetiva }
})

// --- Investimentos ---
const aporteMensal = ref(500)
const aporteinicial = ref(0)
const taxaMensal = ref(0.9)
const mesesInvest = ref(60)

const investimentos = computed(() => {
  const r = taxaMensal.value / 100
  const n = mesesInvest.value
  const ci = aporteinicial.value
  const pmt = aporteMensal.value
  if (r === 0) return { montante: ci + pmt * n, juros: 0, total: ci + pmt * n }
  const montante = ci * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r)
  const totalAportado = ci + pmt * n
  const juros = montante - totalAportado
  return { montante, juros, total: totalAportado }
})

// Helpers INSS / IR
function calcINSS(salario: number): number {
  if (salario <= 1412) return salario * 0.075
  if (salario <= 2666.68) return salario * 0.09
  if (salario <= 4000.03) return salario * 0.12
  if (salario <= 7786.02) return salario * 0.14
  return 7786.02 * 0.14
}

function calcIR(base: number): number {
  if (base <= 2259.20) return 0
  if (base <= 2826.65) return base * 0.075 - 169.44
  if (base <= 3751.05) return base * 0.15 - 381.44
  if (base <= 4664.68) return base * 0.225 - 662.77
  return base * 0.275 - 896.00
}

function fmt(val: number): string {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const calculators = [
  { id: 'rendimentos', label: 'Rendimentos', icon: 'mdi:currency-brl', desc: 'Valor por hora, dia, semana e mês' },
  { id: 'ferias', label: 'Férias', icon: 'mdi:beach', desc: 'Cálculo completo de férias + 1/3' },
  { id: 'decimo', label: '13° Salário', icon: 'mdi:gift-outline', desc: 'Valor do décimo terceiro' },
  { id: 'fgts', label: 'FGTS', icon: 'mdi:bank-outline', desc: 'Depósitos e multa rescisória' },
  { id: 'ir', label: 'Imposto de Renda', icon: 'mdi:receipt-text-outline', desc: 'Simulação do desconto IR' },
  { id: 'investimentos', label: 'Investimentos', icon: 'mdi:trending-up', desc: 'Juros compostos e aportes' },
]
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:wallet-outline" class="text-green-400 w-7 h-7" />
        Meu Bolso Mensal
      </h1>
      <p class="text-blue-300/70 text-sm">Simulador financeiro e trabalhista</p>
    </div>

    <!-- Back Button (when in a calculator) -->
    <div v-if="currentCalc !== 'landing'" class="mb-4">
      <button @click="currentCalc = 'landing'"
        class="flex items-center gap-2 text-blue-300 hover:text-white text-sm transition-colors">
        <Icon icon="mdi:arrow-left" class="w-4 h-4" />
        Voltar ao menu
      </button>
    </div>

    <!-- Landing: Calculator Grid -->
    <div v-if="currentCalc === 'landing'" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="c in calculators" :key="c.id"
        @click="currentCalc = c.id as CalcMode"
        class="bg-[#111d3a] border border-white/10 hover:border-blue-500/50 rounded-xl p-5 text-left transition-all group"
      >
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
            <Icon :icon="c.icon" class="w-5 h-5 text-green-400" />
          </div>
          <span class="font-semibold text-white group-hover:text-green-300 transition-colors">{{ c.label }}</span>
        </div>
        <p class="text-blue-300/70 text-xs">{{ c.desc }}</p>
      </button>
    </div>

    <!-- Rendimentos Calculator -->
    <div v-if="currentCalc === 'rendimentos'" class="max-w-xl mx-auto space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Calculadora de Rendimentos</h2>
        <div>
          <label class="text-blue-300 text-xs block mb-1">Salário Bruto (R$)</label>
          <input type="number" v-model.number="salarioBruto" min="0"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-blue-300 text-xs block mb-1">Horas/dia</label>
            <input type="number" v-model.number="horasDia" min="1" max="24"
              class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
          </div>
          <div>
            <label class="text-blue-300 text-xs block mb-1">Dias/semana</label>
            <input type="number" v-model.number="diasSemana" min="1" max="7"
              class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
          </div>
        </div>
      </div>
      <div v-if="rendimentos" class="bg-[#111d3a] border border-green-500/30 rounded-xl p-5 space-y-3">
        <h3 class="text-green-400 text-sm font-semibold mb-3">Projeção de Ganhos</h3>
        <div v-for="row in [
          { label: 'Por hora', val: rendimentos.hora },
          { label: 'Por dia', val: rendimentos.dia },
          { label: 'Por semana', val: rendimentos.semana },
          { label: 'Por mês', val: rendimentos.mes },
          { label: 'Por ano', val: rendimentos.ano },
        ]" :key="row.label" class="flex justify-between items-center">
          <span class="text-blue-300 text-sm">{{ row.label }}</span>
          <span class="text-white font-semibold text-sm">{{ fmt(row.val) }}</span>
        </div>
      </div>
    </div>

    <!-- Férias Calculator -->
    <div v-if="currentCalc === 'ferias'" class="max-w-xl mx-auto space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Calculadora de Férias</h2>
        <div>
          <label class="text-blue-300 text-xs block mb-1">Salário Bruto (R$)</label>
          <input type="number" v-model.number="salarioFerias" min="0"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
        </div>
        <div>
          <label class="text-blue-300 text-xs block mb-1">Meses aquisitivos trabalhados</label>
          <input type="number" v-model.number="mesesAquisitivos" min="1" max="12"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
        </div>
      </div>
      <div class="bg-[#111d3a] border border-green-500/30 rounded-xl p-5 space-y-3">
        <h3 class="text-green-400 text-sm font-semibold">Resultado</h3>
        <div v-for="row in [
          { label: 'Valor das férias', val: ferias.valorFerias },
          { label: '1/3 constitucional', val: ferias.adicionalUmTerco },
          { label: 'Total a receber', val: ferias.totalFerias },
          { label: 'Abono pecuniário (1/3)', val: ferias.abono },
        ]" :key="row.label" class="flex justify-between items-center">
          <span class="text-blue-300 text-sm">{{ row.label }}</span>
          <span :class="row.label === 'Total a receber' ? 'text-green-400 font-bold text-base' : 'text-white font-semibold text-sm'">{{ fmt(row.val) }}</span>
        </div>
      </div>
    </div>

    <!-- 13° Calculator -->
    <div v-if="currentCalc === 'decimo'" class="max-w-xl mx-auto space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Calculadora de 13° Salário</h2>
        <div>
          <label class="text-blue-300 text-xs block mb-1">Salário Bruto (R$)</label>
          <input type="number" v-model.number="salario13" min="0"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
        </div>
        <div>
          <label class="text-blue-300 text-xs block mb-1">Meses trabalhados no ano</label>
          <input type="number" v-model.number="meses13" min="1" max="12"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
        </div>
      </div>
      <div class="bg-[#111d3a] border border-green-500/30 rounded-xl p-5 space-y-3">
        <h3 class="text-green-400 text-sm font-semibold">Resultado</h3>
        <div class="flex justify-between"><span class="text-blue-300 text-sm">Valor bruto</span><span class="text-white font-semibold text-sm">{{ fmt(decimoTerceiro.valorBruto) }}</span></div>
        <div class="flex justify-between"><span class="text-blue-300 text-sm">Valor líquido estimado</span><span class="text-green-400 font-bold">{{ fmt(decimoTerceiro.valorLiquido) }}</span></div>
      </div>
    </div>

    <!-- FGTS Calculator -->
    <div v-if="currentCalc === 'fgts'" class="max-w-xl mx-auto space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Calculadora de FGTS</h2>
        <div>
          <label class="text-blue-300 text-xs block mb-1">Salário Bruto (R$)</label>
          <input type="number" v-model.number="salarioFgts" min="0"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
        </div>
        <div>
          <label class="text-blue-300 text-xs block mb-1">Meses de contribuição</label>
          <input type="number" v-model.number="mesesFgts" min="1"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
        </div>
      </div>
      <div class="bg-[#111d3a] border border-green-500/30 rounded-xl p-5 space-y-3">
        <h3 class="text-green-400 text-sm font-semibold">Resultado</h3>
        <div class="flex justify-between"><span class="text-blue-300 text-sm">Depósito mensal (8%)</span><span class="text-white font-semibold text-sm">{{ fmt(fgts.deposito) }}</span></div>
        <div class="flex justify-between"><span class="text-blue-300 text-sm">Total acumulado</span><span class="text-white font-semibold text-sm">{{ fmt(fgts.totalAcumulado) }}</span></div>
        <div class="flex justify-between"><span class="text-blue-300 text-sm">Multa rescisória (40%)</span><span class="text-green-400 font-bold">{{ fmt(fgts.multaRescisao) }}</span></div>
      </div>
    </div>

    <!-- IR Calculator -->
    <div v-if="currentCalc === 'ir'" class="max-w-xl mx-auto space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Simulador de Imposto de Renda</h2>
        <div>
          <label class="text-blue-300 text-xs block mb-1">Salário Bruto (R$)</label>
          <input type="number" v-model.number="salarioIR" min="0"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
        </div>
      </div>
      <div class="bg-[#111d3a] border border-green-500/30 rounded-xl p-5 space-y-3">
        <h3 class="text-green-400 text-sm font-semibold">Resultado</h3>
        <div class="flex justify-between"><span class="text-blue-300 text-sm">Salário bruto</span><span class="text-white font-semibold text-sm">{{ fmt(impostoRenda.salarioBruto) }}</span></div>
        <div class="flex justify-between"><span class="text-blue-300 text-sm">Desconto INSS</span><span class="text-red-400 text-sm font-semibold">-{{ fmt(impostoRenda.inss) }}</span></div>
        <div class="flex justify-between"><span class="text-blue-300 text-sm">Desconto IR</span><span class="text-red-400 text-sm font-semibold">-{{ fmt(impostoRenda.ir) }}</span></div>
        <div class="border-t border-white/10 pt-2 flex justify-between"><span class="text-blue-200 text-sm font-medium">Salário líquido</span><span class="text-green-400 font-bold text-base">{{ fmt(impostoRenda.liquido) }}</span></div>
        <p class="text-blue-300/60 text-xs">Alíquota efetiva: {{ impostoRenda.aliquotaEfetiva.toFixed(1) }}%</p>
      </div>
    </div>

    <!-- Investimentos Calculator -->
    <div v-if="currentCalc === 'investimentos'" class="max-w-xl mx-auto space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Simulador de Investimentos (Juros Compostos)</h2>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-blue-300 text-xs block mb-1">Aporte inicial (R$)</label>
            <input type="number" v-model.number="aporteinicial" min="0"
              class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
          </div>
          <div>
            <label class="text-blue-300 text-xs block mb-1">Aporte mensal (R$)</label>
            <input type="number" v-model.number="aporteMensal" min="0"
              class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
          </div>
          <div>
            <label class="text-blue-300 text-xs block mb-1">Taxa mensal (%)</label>
            <input type="number" v-model.number="taxaMensal" min="0" step="0.01"
              class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
          </div>
          <div>
            <label class="text-blue-300 text-xs block mb-1">Período (meses)</label>
            <input type="number" v-model.number="mesesInvest" min="1"
              class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
          </div>
        </div>
      </div>
      <div class="bg-[#111d3a] border border-green-500/30 rounded-xl p-5 space-y-3">
        <h3 class="text-green-400 text-sm font-semibold">Resultado</h3>
        <div class="flex justify-between"><span class="text-blue-300 text-sm">Total investido</span><span class="text-white font-semibold text-sm">{{ fmt(investimentos.total) }}</span></div>
        <div class="flex justify-between"><span class="text-blue-300 text-sm">Juros ganhos</span><span class="text-blue-300 font-semibold text-sm">{{ fmt(investimentos.juros) }}</span></div>
        <div class="border-t border-white/10 pt-2 flex justify-between"><span class="text-blue-200 text-sm font-medium">Montante final</span><span class="text-green-400 font-bold text-base">{{ fmt(investimentos.montante) }}</span></div>
      </div>
    </div>
  </div>
</template>
