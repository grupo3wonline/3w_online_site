<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

type CalcMode = 'landing' | 'rendimentos' | 'ferias' | 'decimo' | 'fgts' | 'ir' | 'investimentos'
const currentCalc = ref<CalcMode>('landing')

// Helpers
function calcINSS(s: number) {
  if (s <= 1412)    return s * 0.075
  if (s <= 2666.68) return s * 0.09
  if (s <= 4000.03) return s * 0.12
  if (s <= 7786.02) return s * 0.14
  return 7786.02 * 0.14
}
function calcIR(base: number) {
  if (base <= 2259.20) return 0
  if (base <= 2826.65) return base * 0.075 - 169.44
  if (base <= 3751.05) return base * 0.15  - 381.44
  if (base <= 4664.68) return base * 0.225 - 662.77
  return base * 0.275 - 896.00
}
const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Rendimentos
const salarioBruto = ref(5000); const horasDia = ref(8); const diasSemana = ref(5)
const rendimentos = computed(() => {
  const s = salarioBruto.value; if (s <= 0) return null
  const hm = horasDia.value * diasSemana.value * 4.33
  return { hora: s / hm, dia: (s / hm) * horasDia.value, semana: (s / hm) * horasDia.value * diasSemana.value, mes: s, ano: s * 12 }
})

// Férias
const salarioFerias = ref(5000); const mesesAquisitivos = ref(12)
const ferias = computed(() => {
  const s = salarioFerias.value; const p = Math.min(mesesAquisitivos.value, 12) / 12
  const val = s * p; const adicional = val / 3
  return { valorFerias: val, adicionalUmTerco: adicional, totalFerias: val + adicional, abono: s / 3 }
})

// 13°
const salario13 = ref(5000); const meses13 = ref(12)
const decimoTerceiro = computed(() => {
  const valor = (salario13.value / 12) * Math.min(meses13.value, 12)
  const inss = calcINSS(salario13.value); const ir = calcIR(salario13.value - inss)
  return { valorBruto: valor, valorLiquido: Math.max(0, valor - inss * (meses13.value / 12) - ir * (meses13.value / 12)) }
})

// FGTS
const salarioFgts = ref(5000); const mesesFgts = ref(12)
const fgts = computed(() => {
  const dep = salarioFgts.value * 0.08; const total = dep * mesesFgts.value
  return { deposito: dep, totalAcumulado: total, multaRescisao: total * 0.4 }
})

// IR
const salarioIR = ref(5000)
const impostoRenda = computed(() => {
  const inss = calcINSS(salarioIR.value); const ir = calcIR(salarioIR.value - inss)
  const liquido = salarioIR.value - inss - ir
  return { salarioBruto: salarioIR.value, inss, ir, liquido, aliquota: salarioIR.value > 0 ? (ir / salarioIR.value) * 100 : 0 }
})

// Investimentos
const aporteMensal = ref(500); const aporteInicial = ref(0); const taxaMensal = ref(0.9); const mesesInvest = ref(60)
const investimentos = computed(() => {
  const r = taxaMensal.value / 100; const n = mesesInvest.value; const ci = aporteInicial.value; const pmt = aporteMensal.value
  if (r === 0) { const t = ci + pmt * n; return { montante: t, juros: 0, total: t } }
  const montante = ci * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r)
  const total = ci + pmt * n
  return { montante, juros: montante - total, total }
})

const calculators = [
  { id: 'rendimentos', label: 'Rendimentos',   icon: 'fa-coins',         desc: 'Valor por hora, dia, semana e mês' },
  { id: 'ferias',      label: 'Férias',         icon: 'fa-umbrella-beach',desc: 'Cálculo completo de férias + 1/3'  },
  { id: 'decimo',      label: '13° Salário',    icon: 'fa-gift',          desc: 'Valor do décimo terceiro'          },
  { id: 'fgts',        label: 'FGTS',           icon: 'fa-piggy-bank',    desc: 'Depósitos e multa rescisória'      },
  { id: 'ir',          label: 'Imposto de Renda',icon: 'fa-receipt',       desc: 'Simulação do desconto IR'          },
  { id: 'investimentos',label: 'Investimentos', icon: 'fa-chart-line',    desc: 'Juros compostos e aportes'         },
]
</script>

<template>
  <ToolShell
    title="Meu Bolso Mensal"
    description="6 calculadoras trabalhistas e financeiras: rendimentos, férias, 13°, FGTS, IR e investimentos."
    icon="fa-wallet"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['6 calculadoras', 'INSS + IRRF 2025', 'Juros compostos']"
    :tips="[
      { title: 'Tabela INSS 2025', text: 'Cálculo progressivo: 7,5% (até R$ 1.412) | 9% (até R$ 2.667) | 12% (até R$ 4.000) | 14% (até R$ 7.786).' },
      { title: 'Férias proporcionais', text: 'Para períodos parciais, informe os meses trabalhados. O cálculo inclui o 1/3 constitucional.' },
      { title: 'Investimentos', text: 'O cálculo usa a fórmula de juros compostos com aportes mensais. Taxa de 0,9% ao mês equivale a aproximadamente 11,4% ao ano.' },
    ]"
    :examples="[
      { title: 'Rendimento por hora', desc: 'Salário R$ 5.000 | 8h/dia | 5 dias/semana', result: '≈ R$ 28,65 / hora' },
      { title: 'Férias completas', desc: 'Salário R$ 3.000 | 12 meses aquisitivos', result: 'Total ≈ R$ 4.000 (incluindo 1/3)' },
      { title: 'Investindo 5 anos', desc: 'R$ 500/mês | 0,9% a.m. | 60 meses', result: 'Montante ≈ R$ 38.967' },
    ]"
  >
    <!-- Botão voltar -->
    <div v-if="currentCalc !== 'landing'" class="mb-4">
      <button @click="currentCalc = 'landing'"
        class="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:underline font-semibold">
        <i class="fas fa-arrow-left text-xs"></i>
        Voltar ao menu
      </button>
    </div>

    <!-- Menu -->
    <div v-if="currentCalc === 'landing'" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button v-for="c in calculators" :key="c.id" @click="currentCalc = c.id as CalcMode"
        class="glass-panel p-4 text-left hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all group">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
            <i :class="['fas', c.icon, 'text-sm text-emerald-600 dark:text-emerald-400 group-hover:text-white']"></i>
          </div>
          <span class="font-bold text-sm text-gray-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{{ c.label }}</span>
        </div>
        <p class="text-xs text-gray-500 dark:text-slate-400">{{ c.desc }}</p>
      </button>
    </div>

    <!-- Rendimentos -->
    <div v-if="currentCalc === 'rendimentos'" class="max-w-lg mx-auto space-y-4">
      <div class="tool-body !mb-0 space-y-3">
        <BaseInput v-model="salarioBruto" label="Salário Bruto (R$)" type="number" :min="0" icon="fa-coins" />
        <div class="grid grid-cols-2 gap-3">
          <BaseInput v-model="horasDia"   label="Horas por dia"    type="number" :min="1" :max="24" icon="fa-clock" />
          <BaseInput v-model="diasSemana" label="Dias por semana"  type="number" :min="1" :max="7"  icon="fa-calendar-week" />
        </div>
      </div>
      <div v-if="rendimentos" class="glass-panel p-4 space-y-2">
        <div v-for="row in [
          { label: 'Por hora',   val: rendimentos.hora   },
          { label: 'Por dia',    val: rendimentos.dia    },
          { label: 'Por semana', val: rendimentos.semana },
          { label: 'Por mês',    val: rendimentos.mes    },
          { label: 'Por ano',    val: rendimentos.ano    },
        ]" :key="row.label" class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0 text-sm">
          <span class="text-gray-600 dark:text-slate-300">{{ row.label }}</span>
          <span class="font-bold text-gray-900 dark:text-white">{{ fmt(row.val) }}</span>
        </div>
      </div>
    </div>

    <!-- Férias -->
    <div v-if="currentCalc === 'ferias'" class="max-w-lg mx-auto space-y-4">
      <div class="tool-body !mb-0 space-y-3">
        <BaseInput v-model="salarioFerias"     label="Salário Bruto (R$)"             type="number" :min="0"  icon="fa-coins"           />
        <BaseInput v-model="mesesAquisitivos"  label="Meses aquisitivos trabalhados"   type="number" :min="1" :max="12" icon="fa-calendar" />
      </div>
      <div class="glass-panel p-4 space-y-2">
        <div v-for="row in [
          { label: 'Valor das férias',    val: ferias.valorFerias      },
          { label: '1/3 constitucional',  val: ferias.adicionalUmTerco },
          { label: 'Total a receber',     val: ferias.totalFerias      },
          { label: 'Abono pecuniário',    val: ferias.abono            },
        ]" :key="row.label" class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0 text-sm">
          <span class="text-gray-600 dark:text-slate-300">{{ row.label }}</span>
          <span :class="['font-bold', row.label === 'Total a receber' ? 'text-emerald-600 dark:text-emerald-400 text-base' : 'text-gray-900 dark:text-white']">{{ fmt(row.val) }}</span>
        </div>
      </div>
    </div>

    <!-- 13° Salário -->
    <div v-if="currentCalc === 'decimo'" class="max-w-lg mx-auto space-y-4">
      <div class="tool-body !mb-0 space-y-3">
        <BaseInput v-model="salario13" label="Salário Bruto (R$)"           type="number" :min="0"  icon="fa-coins"   />
        <BaseInput v-model="meses13"   label="Meses trabalhados no ano"     type="number" :min="1" :max="12" icon="fa-calendar" />
      </div>
      <div class="glass-panel p-4 space-y-2">
        <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 text-sm">
          <span class="text-gray-600 dark:text-slate-300">Valor bruto</span>
          <span class="font-bold text-gray-900 dark:text-white">{{ fmt(decimoTerceiro.valorBruto) }}</span>
        </div>
        <div class="flex justify-between py-1.5 text-sm">
          <span class="text-gray-600 dark:text-slate-300">Valor líquido estimado</span>
          <span class="font-black text-emerald-600 dark:text-emerald-400 text-base">{{ fmt(decimoTerceiro.valorLiquido) }}</span>
        </div>
      </div>
    </div>

    <!-- FGTS -->
    <div v-if="currentCalc === 'fgts'" class="max-w-lg mx-auto space-y-4">
      <div class="tool-body !mb-0 space-y-3">
        <BaseInput v-model="salarioFgts" label="Salário Bruto (R$)"       type="number" :min="0" icon="fa-coins"   />
        <BaseInput v-model="mesesFgts"   label="Meses de contribuição"    type="number" :min="1" icon="fa-calendar" />
      </div>
      <div class="glass-panel p-4 space-y-2">
        <div v-for="row in [
          { label: 'Depósito mensal (8%)',  val: fgts.deposito        },
          { label: 'Total acumulado',       val: fgts.totalAcumulado  },
          { label: 'Multa rescisória (40%)',val: fgts.multaRescisao   },
        ]" :key="row.label" class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0 text-sm">
          <span class="text-gray-600 dark:text-slate-300">{{ row.label }}</span>
          <span :class="['font-bold', row.label === 'Total acumulado' ? 'text-emerald-600 dark:text-emerald-400 text-base' : 'text-gray-900 dark:text-white']">{{ fmt(row.val) }}</span>
        </div>
      </div>
    </div>

    <!-- IR -->
    <div v-if="currentCalc === 'ir'" class="max-w-lg mx-auto space-y-4">
      <div class="tool-body !mb-0">
        <BaseInput v-model="salarioIR" label="Salário Bruto (R$)" type="number" :min="0" icon="fa-coins" />
      </div>
      <div class="glass-panel p-4 space-y-2 text-sm">
        <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
          <span class="text-gray-600 dark:text-slate-300">Salário bruto</span>
          <span class="font-bold text-gray-900 dark:text-white">{{ fmt(impostoRenda.salarioBruto) }}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
          <span class="text-gray-600 dark:text-slate-300">(-) INSS</span>
          <span class="font-bold text-red-600 dark:text-red-400">-{{ fmt(impostoRenda.inss) }}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
          <span class="text-gray-600 dark:text-slate-300">(-) IRRF</span>
          <span class="font-bold text-red-600 dark:text-red-400">-{{ fmt(impostoRenda.ir) }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="font-bold text-gray-800 dark:text-white">= Salário Líquido</span>
          <span class="font-black text-emerald-600 dark:text-emerald-400 text-base">{{ fmt(impostoRenda.liquido) }}</span>
        </div>
        <p class="text-xs text-gray-400 dark:text-slate-500">Alíquota efetiva: {{ impostoRenda.aliquota.toFixed(1) }}%</p>
      </div>
    </div>

    <!-- Investimentos -->
    <div v-if="currentCalc === 'investimentos'" class="max-w-lg mx-auto space-y-4">
      <div class="tool-body !mb-0 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <BaseInput v-model="aporteInicial" label="Aporte inicial (R$)"   type="number" :min="0"       icon="fa-coins"       />
          <BaseInput v-model="aporteMensal"  label="Aporte mensal (R$)"    type="number" :min="0"       icon="fa-plus-circle" />
          <BaseInput v-model="taxaMensal"    label="Taxa mensal (%)"        type="number" :min="0" step="0.01" icon="fa-percent"     />
          <BaseInput v-model="mesesInvest"   label="Período (meses)"        type="number" :min="1"       icon="fa-calendar"    />
        </div>
      </div>
      <div class="glass-panel p-4 space-y-2 text-sm">
        <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
          <span class="text-gray-600 dark:text-slate-300">Total investido</span>
          <span class="font-bold text-gray-900 dark:text-white">{{ fmt(investimentos.total) }}</span>
        </div>
        <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
          <span class="text-gray-600 dark:text-slate-300">Juros ganhos</span>
          <span class="font-bold text-blue-600 dark:text-blue-400">{{ fmt(investimentos.juros) }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="font-bold text-gray-800 dark:text-white">= Montante final</span>
          <span class="font-black text-emerald-600 dark:text-emerald-400 text-base">{{ fmt(investimentos.montante) }}</span>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
