<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type TabKey = 'hourly' | 'project' | 'deadline'
type Complexity = 'low' | 'medium' | 'high'

const activeTab = ref<TabKey>('hourly')

// ---- Valor/Hora ----
const hourly = reactive({ monthlyGoal: 8000, dailyHours: 8, workDays: 5, vacationDays: 30, profitMargin: 20, taxRate: 6, platformFee: 10 })
const hourlyRate = ref(0)
const hourlyDetails = ref<{ baseRate: number; billableHours: number; monthlyProjected: number; yearlyProjected: number } | null>(null)

function calcHourly() {
  const { monthlyGoal, dailyHours, workDays, vacationDays, profitMargin, taxRate, platformFee } = hourly
  if (monthlyGoal <= 0 || dailyHours <= 0 || workDays <= 0) {
    Swal.fire({ icon: 'warning', title: 'Preencha os campos obrigatórios', confirmButtonColor: '#6366f1' }); return
  }
  const workingDaysPerYear = 52 * workDays - vacationDays
  const totalHoursPerYear = workingDaysPerYear * dailyHours
  const baseRate = (monthlyGoal * 12) / totalHoursPerYear
  const rateWithMargin = baseRate * (1 + profitMargin / 100)
  const deductions = Math.min((taxRate + platformFee) / 100, 0.99)
  const finalRate = rateWithMargin / (1 - deductions)
  const rate = Math.round(finalRate)
  const monthlyHours = totalHoursPerYear / 12
  hourlyRate.value = rate
  hourlyDetails.value = {
    baseRate: Math.round(baseRate), billableHours: Math.round(totalHoursPerYear),
    monthlyProjected: Math.round(rate * monthlyHours), yearlyProjected: Math.round(rate * totalHoursPerYear),
  }
  Swal.fire({ icon: 'success', title: 'Calculado!', html: `Valor/hora: <strong>${fmt(rate)}</strong>`, timer: 1800, showConfirmButton: false })
}

// ---- Projeto ----
const project = reactive({ projectHours: 40, customHourlyRate: 0, complexity: 'medium' as Complexity, discount: 0, installments: 1 })
const projectResult = ref({ gross: 0, discountAmount: 0, total: 0 })
const COMPLEXITY_MULT: Record<Complexity, number> = { low: 0.9, medium: 1, high: 1.3 }

function calcProject() {
  const rate = project.customHourlyRate || hourlyRate.value
  if (!project.projectHours || !rate) {
    Swal.fire({ icon: 'warning', title: 'Informe as horas e valor/hora', confirmButtonColor: '#6366f1' }); return
  }
  const gross = Math.round(project.projectHours * rate * COMPLEXITY_MULT[project.complexity])
  const discountAmount = Math.round(gross * Math.min(project.discount, 100) / 100)
  const total = gross - discountAmount
  projectResult.value = { gross, discountAmount, total }
  Swal.fire({ icon: 'success', title: 'Projeto calculado!', html: `Valor: <strong>${fmt(total)}</strong>`, timer: 1800, showConfirmButton: false })
}

const installmentValue = computed(() => {
  const count = Math.max(1, project.installments)
  return projectResult.value.total > 0 ? projectResult.value.total / count : 0
})

// ---- Prazo ----
const deadline = reactive({ totalHours: 40, dailyAvailability: 4, includeWeekends: false })
const deadlineResult = ref<{ workDays: number; deliveryDate: string } | null>(null)

function calcDeadline() {
  if (deadline.totalHours <= 0 || deadline.dailyAvailability <= 0) {
    Swal.fire({ icon: 'warning', title: 'Preencha as horas corretamente', confirmButtonColor: '#6366f1' }); return
  }
  const workDays = Math.ceil(deadline.totalHours / deadline.dailyAvailability)
  const base = new Date()
  let added = 0
  while (added < workDays) {
    base.setDate(base.getDate() + 1)
    const day = base.getDay()
    if (deadline.includeWeekends || (day !== 0 && day !== 6)) added++
  }
  deadlineResult.value = {
    workDays,
    deliveryDate: base.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  }
  Swal.fire({ icon: 'success', title: 'Prazo calculado!', html: `${workDays} dias — entrega: <strong>${deadlineResult.value.deliveryDate}</strong>`, timer: 2000, showConfirmButton: false })
}

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:laptop" class="text-purple-400 w-7 h-7" />
        Calculadora Freelancer
      </h1>
      <p class="text-blue-200 text-sm">Calcule valor/hora, projetos e prazos com precisão profissional</p>
    </div>

    <!-- Tabs -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-1.5 grid grid-cols-3 gap-1">
      <button v-for="tab in [
        { key: 'hourly', label: 'Valor/Hora', icon: 'mdi:currency-usd' },
        { key: 'project', label: 'Projeto', icon: 'mdi:folder-outline' },
        { key: 'deadline', label: 'Prazo', icon: 'mdi:clock-outline' },
      ]" :key="tab.key" @click="activeTab = tab.key as TabKey"
        :class="['flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all', activeTab === tab.key ? 'bg-purple-600 text-white shadow' : 'text-blue-200 hover:bg-white/5']">
        <Icon :icon="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Valor/Hora -->
    <div v-show="activeTab === 'hourly'" class="grid md:grid-cols-2 gap-6">
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <h2 class="text-white font-semibold text-sm">Calcular Valor por Hora</h2>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="f in [
            { key: 'monthlyGoal', label: 'Receita/mês (R$)' }, { key: 'dailyHours', label: 'Horas/dia' },
            { key: 'workDays', label: 'Dias/semana' }, { key: 'vacationDays', label: 'Férias/ano (dias)' },
            { key: 'profitMargin', label: 'Lucro (%)' }, { key: 'taxRate', label: 'Impostos (%)' },
          ]" :key="f.key">
            <label class="text-blue-200 text-xs font-medium block mb-1">{{ f.label }}</label>
            <input v-model.number="(hourly as any)[f.key]" type="number" min="0" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
          </div>
        </div>
        <button @click="calcHourly" class="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
          <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular
        </button>
      </div>
      <div class="space-y-4">
        <div class="bg-gradient-to-br from-purple-700 to-indigo-700 rounded-xl p-6 text-center">
          <p class="text-purple-100 text-sm mb-2">Valor ideal por hora</p>
          <div class="text-5xl font-extrabold text-white">{{ fmt(hourlyRate) }}</div>
          <p class="text-purple-200 text-xs mt-2">Inclui margem, impostos e taxas</p>
        </div>
        <div v-if="hourlyDetails" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-blue-200">Valor base/hora</span><span class="text-white font-semibold">{{ fmt(hourlyDetails.baseRate) }}</span></div>
          <div class="flex justify-between"><span class="text-blue-200">Horas faturáveis/ano</span><span class="text-white font-semibold">{{ hourlyDetails.billableHours }} h</span></div>
          <div class="flex justify-between border-t border-white/5 pt-2"><span class="text-blue-200">Faturamento mensal</span><span class="text-purple-300 font-semibold">{{ fmt(hourlyDetails.monthlyProjected) }}</span></div>
          <div class="flex justify-between"><span class="text-blue-200">Faturamento anual</span><span class="text-purple-300 font-semibold">{{ fmt(hourlyDetails.yearlyProjected) }}</span></div>
        </div>
      </div>
    </div>

    <!-- Projeto -->
    <div v-show="activeTab === 'project'" class="grid md:grid-cols-2 gap-6">
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <h2 class="text-white font-semibold text-sm">Calcular Valor do Projeto</h2>
        <div class="space-y-3">
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Estimativa de Horas</label>
            <input v-model.number="project.projectHours" type="number" min="0" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Valor/hora (R$) — deixe 0 para usar o calculado</label>
            <input v-model.number="project.customHourlyRate" type="number" min="0" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Complexidade</label>
              <select v-model="project.complexity" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                <option value="low">Baixa (-10%)</option>
                <option value="medium">Média (padrão)</option>
                <option value="high">Alta (+30%)</option>
              </select>
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Desconto (%)</label>
              <input v-model.number="project.discount" type="number" min="0" max="100" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Parcelas</label>
            <input v-model.number="project.installments" type="number" min="1" max="24" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          </div>
          <button @click="calcProject" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
            <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular Projeto
          </button>
        </div>
      </div>
      <div class="bg-gradient-to-br from-blue-700 to-cyan-700 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3">
        <p class="text-blue-100 text-sm">Valor do projeto</p>
        <div class="text-5xl font-extrabold text-white">{{ fmt(projectResult.total) }}</div>
        <div v-if="projectResult.discountAmount > 0" class="text-sm text-white/70">
          <span class="line-through mr-1">{{ fmt(projectResult.gross) }}</span>
          Desconto: {{ fmt(projectResult.discountAmount) }}
        </div>
        <div v-if="project.installments > 1 && projectResult.total > 0" class="bg-white/15 rounded-xl px-4 py-2 text-sm">
          {{ project.installments }}x de <strong>{{ fmt(installmentValue) }}</strong>
        </div>
      </div>
    </div>

    <!-- Prazo -->
    <div v-show="activeTab === 'deadline'" class="grid md:grid-cols-2 gap-6">
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <h2 class="text-white font-semibold text-sm">Calcular Prazo</h2>
        <div>
          <label class="text-blue-200 text-xs font-medium block mb-1">Total de Horas Estimadas</label>
          <input v-model.number="deadline.totalHours" type="number" min="0" autocomplete="off"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50" />
        </div>
        <div>
          <label class="text-blue-200 text-xs font-medium block mb-1">Horas Disponíveis por Dia</label>
          <input v-model.number="deadline.dailyAvailability" type="number" min="0" max="24" autocomplete="off"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50" />
        </div>
        <label class="flex items-center gap-3 cursor-pointer border border-white/10 rounded-xl p-3">
          <input v-model="deadline.includeWeekends" type="checkbox" class="rounded h-4 w-4 accent-green-500" />
          <span class="text-blue-200 text-sm">Trabalhar também nos fins de semana</span>
        </label>
        <button @click="calcDeadline" class="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
          <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular Prazo
        </button>
      </div>
      <div class="bg-gradient-to-br from-green-700 to-emerald-700 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3">
        <p class="text-green-100 text-sm">Prazo estimado</p>
        <div class="text-6xl font-extrabold text-white">{{ deadlineResult?.workDays ?? 0 }}</div>
        <div class="text-xl font-semibold text-green-100">{{ deadline.includeWeekends ? 'dias corridos' : 'dias úteis' }}</div>
        <div v-if="deadlineResult?.deliveryDate" class="bg-white/15 rounded-xl px-4 py-2 text-sm text-white">
          <Icon icon="mdi:calendar-check" class="w-4 h-4 inline mr-1" /> Entrega: <strong>{{ deadlineResult.deliveryDate }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
