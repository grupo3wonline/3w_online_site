<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const salaryInput = ref('')
const activeTab = ref<'personal' | 'family' | 'methods'>('personal')

function fmt(v: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
}

const salary = computed(() => {
  const digits = salaryInput.value.replace(/\D/g, '')
  return parseFloat(digits) / 100
})

const personal = computed(() => {
  const s = salary.value
  if (!s || s <= 0) return null
  return {
    base: fmt(s),
    aposentadoria: fmt(s * 0.05),
    emergencia: fmt(s * 0.05),
    educacao: fmt(s * 0.15),
    sonhos: fmt(s * 0.15),
    essenciais: fmt(s * 0.50),
    extras: fmt(s * 0.10),
    hora: fmt(s / 900),
    dia: fmt(s / 30),
    semana: fmt(s / 4),
    mes: fmt(s),
    trimestre: fmt(s * 3),
    semestre: fmt(s * 6),
    ano: fmt(s * 12),
  }
})

const family = computed(() => {
  const s = salary.value
  if (!s || s <= 0) return null
  return {
    alimentacao: fmt(s * 0.25),
    contas: fmt(s * 0.35),
    transporte: fmt(s * 0.20),
    poupanca: fmt(s * 0.10),
    outros: fmt(s * 0.10),
  }
})

const methods = computed(() => {
  const s = salary.value
  if (!s || s <= 0) return []
  return [
    { titulo: 'Divisão 50/30/20', items: { 'Despesas Fixas': fmt(s*0.5), 'Gastos Eventuais': fmt(s*0.3), 'Poupança': fmt(s*0.2) } },
    { titulo: 'Método 70/20/10', items: { 'Despesas Regulares': fmt(s*0.7), 'Dívidas': fmt(s*0.2), 'Investimentos': fmt(s*0.1) } },
    { titulo: 'Método 50/15/35', items: { 'Despesas Fixas': fmt(s*0.5), 'Saúde Financeira': fmt(s*0.15), 'Gastos Livres': fmt(s*0.35) } },
    { titulo: 'Método 60/10/10/20', items: { 'Despesas Regulares': fmt(s*0.6), 'Curto Prazo': fmt(s*0.1), 'Longo Prazo': fmt(s*0.1), 'Gastos Livres': fmt(s*0.2) } },
  ]
})

function formatSalary(e: Event) {
  const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  const val = parseFloat(digits) / 100
  salaryInput.value = isNaN(val) ? '' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(val)
}

function calculate() {
  if (!salary.value || salary.value <= 0) {
    Swal.fire({ icon: 'warning', title: 'Valor inválido!', text: 'Informe um salário válido.', confirmButtonColor: '#3b82f6' })
    return
  }
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1800 })
    .fire({ icon: 'success', title: 'Orçamento calculado!' })
  activeTab.value = 'personal'
}

const personalCards = computed(() => personal.value ? [
  { label: 'Aposentadoria', desc: '5%', value: personal.value.aposentadoria, icon: 'mdi:piggy-bank-outline', cls: 'text-blue-400' },
  { label: 'Reserva de Emergência', desc: '5%', value: personal.value.emergencia, icon: 'mdi:shield-check-outline', cls: 'text-green-400' },
  { label: 'Educação', desc: '15%', value: personal.value.educacao, icon: 'mdi:school-outline', cls: 'text-yellow-400' },
  { label: 'Sonhos', desc: '15%', value: personal.value.sonhos, icon: 'mdi:heart-outline', cls: 'text-pink-400' },
  { label: 'Gastos Essenciais', desc: '50%', value: personal.value.essenciais, icon: 'mdi:home-outline', cls: 'text-purple-400' },
  { label: 'Gastos Extras', desc: '10%', value: personal.value.extras, icon: 'mdi:coffee-outline', cls: 'text-orange-400' },
] : [])

const rendimentos = computed(() => personal.value ? [
  { label: 'Por Hora', value: personal.value.hora },
  { label: 'Por Dia', value: personal.value.dia },
  { label: 'Por Semana', value: personal.value.semana },
  { label: 'Por Mês', value: personal.value.mes },
  { label: 'Trimestre', value: personal.value.trimestre },
  { label: 'Semestre', value: personal.value.semestre },
  { label: 'Anual', value: personal.value.ano },
] : [])

const familyCards = computed(() => family.value ? [
  { label: 'Alimentação', desc: '25%', value: family.value.alimentacao, icon: 'mdi:cart-outline', cls: 'text-orange-400' },
  { label: 'Contas e Moradia', desc: '35%', value: family.value.contas, icon: 'mdi:home-outline', cls: 'text-blue-400' },
  { label: 'Transporte', desc: '20%', value: family.value.transporte, icon: 'mdi:car-outline', cls: 'text-purple-400' },
  { label: 'Poupança Familiar', desc: '10%', value: family.value.poupanca, icon: 'mdi:piggy-bank-outline', cls: 'text-green-400' },
  { label: 'Outros Gastos', desc: '10%', value: family.value.outros, icon: 'mdi:receipt-outline', cls: 'text-yellow-400' },
] : [])
</script>

<template>
  <ToolShell

    title="Finance Flow"

    description="Controle seu fluxo de caixa pessoal, registre receitas e despesas."

    icon="fa-money-bill-transfer"

    icon-gradient="from-green-500 to-emerald-700"

    orb-color="emerald"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:chart-line" class="text-blue-400 w-7 h-7" />
        Finance Flow — Simulador de Orçamento
      </h1>
      <p class="text-blue-200 text-sm">Descubra como dividir seu salário de forma inteligente</p>
    </div>

    <!-- Input -->
    <div class="glass-panel p-6 max-w-lg mx-auto space-y-4">
      <h2 class="text-white font-semibold flex items-center gap-2">
        <Icon icon="mdi:calculator-variant-outline" class="text-blue-400 w-5 h-5" />
        Calcular Divisão Orçamentária
      </h2>
      <div class="space-y-2">
        <label class="text-sm text-blue-200">Salário Mensal Líquido</label>
        <input
          :value="salaryInput"
          @input="formatSalary"
          type="text"
          inputmode="numeric"
          placeholder="R$ 0,00"
          class="w-full input-aurora text-lg"
        />
      </div>
      <button @click="calculate" :disabled="!salaryInput"
        class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
        <Icon icon="mdi:calculator-variant-outline" class="w-5 h-5" />
        Calcular Orçamento
      </button>
    </div>

    <!-- Results -->
    <template v-if="personal">
      <!-- Tabs -->
      <div class="flex gap-2 bg-[#0f1e3c] border border-white/10 rounded-xl p-1 max-w-lg mx-auto">
        <button v-for="t in [['personal','Pessoal'],['family','Familiar'],['methods','Métodos']]" :key="t[0]"
          @click="activeTab = t[0] as any"
          :class="activeTab === t[0] ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'"
          class="flex-1 py-2 rounded-lg text-sm font-medium transition-colors">
          {{ t[1] }}
        </button>
      </div>

      <!-- Personal Tab -->
      <template v-if="activeTab === 'personal'">
        <div class="text-center">
          <h2 class="text-white font-bold text-lg mb-1">Divisão Recomendada</h2>
          <p class="text-blue-300 text-sm">Baseada em seu salário de {{ personal.base }}</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="card in personalCards" :key="card.label"
            class="glass-panel p-4 flex items-start gap-3">
            <Icon :icon="card.icon" class="w-8 h-8 mt-0.5 shrink-0" :class="card.cls" />
            <div>
              <p class="text-xs text-blue-300">{{ card.label }} ({{ card.desc }})</p>
              <p class="text-white font-bold text-lg">{{ card.value }}</p>
            </div>
          </div>
        </div>

        <h2 class="text-white font-bold text-lg text-center">Rendimento por Período</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div v-for="r in rendimentos" :key="r.label"
            class="glass-panel p-3 text-center">
            <p class="text-blue-300 text-xs mb-1">{{ r.label }}</p>
            <p class="text-white font-bold">{{ r.value }}</p>
          </div>
        </div>
      </template>

      <!-- Family Tab -->
      <template v-else-if="activeTab === 'family'">
        <div class="text-center">
          <h2 class="text-white font-bold text-lg mb-1">Orçamento Familiar</h2>
          <p class="text-blue-300 text-sm">Divisão estratégica para gastos domésticos</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="card in familyCards" :key="card.label"
            class="glass-panel p-4 flex items-start gap-3">
            <Icon :icon="card.icon" class="w-8 h-8 mt-0.5 shrink-0" :class="card.cls" />
            <div>
              <p class="text-xs text-blue-300">{{ card.label }} ({{ card.desc }})</p>
              <p class="text-white font-bold text-lg">{{ card.value }}</p>
            </div>
          </div>
        </div>
      </template>

      <!-- Methods Tab -->
      <template v-else>
        <div class="text-center">
          <h2 class="text-white font-bold text-lg mb-1">Métodos Alternativos</h2>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="m in methods" :key="m.titulo"
            class="glass-panel p-5 space-y-3">
            <h3 class="text-blue-400 font-bold">{{ m.titulo }}</h3>
            <div v-for="(val, key) in m.items" :key="String(key)" class="flex justify-between text-sm">
              <span class="text-blue-300">{{ key }}:</span>
              <span class="text-white font-semibold">{{ val }}</span>
            </div>
          </div>
        </div>
      </template>
    </template>
  


  </ToolShell></template>