<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

type TabKey = 'hourly' | 'project' | 'deadline'
type Complexity = 'low' | 'medium' | 'high'

const activeTab = ref<TabKey>('hourly')

// Valor/hora
const hourly = reactive({ monthlyGoal: 8000, dailyHours: 8, workDays: 5, vacationDays: 30, profitMargin: 20, taxRate: 6, platformFee: 10 })
const hourlyRate = ref(0)
interface HourlyDetails { baseRate: number; billableHours: number; monthlyProjected: number; yearlyProjected: number }
interface DeadlineResult { workDays: number; deliveryDate: string }

const hourlyDetails  = ref<HourlyDetails | null>(null)

function calcHourly() {
  const { monthlyGoal, dailyHours, workDays, vacationDays, profitMargin, taxRate, platformFee } = hourly
  if (monthlyGoal <= 0 || dailyHours <= 0 || workDays <= 0) { Swal.fire({ icon: 'warning', title: 'Preencha os campos obrigatórios', confirmButtonColor: '#6366f1' }); return }
  const workDaysYear = 52 * workDays - vacationDays; const totalHours = workDaysYear * dailyHours
  const base = (monthlyGoal * 12) / totalHours; const withMargin = base * (1 + profitMargin / 100)
  const deductions = Math.min((taxRate + platformFee) / 100, 0.99); const rate = Math.round(withMargin / (1 - deductions))
  hourlyRate.value = rate
  hourlyDetails.value = { baseRate: Math.round(base), billableHours: Math.round(totalHours), monthlyProjected: Math.round(rate * totalHours / 12), yearlyProjected: Math.round(rate * totalHours) }
  Swal.fire({ icon: 'success', title: `Valor/hora: ${fmt(rate)}`, timer: 1800, showConfirmButton: false })
}

// Projeto
const project = reactive({ projectHours: 40, customHourlyRate: 0, complexity: 'medium' as Complexity, discount: 0, installments: 1 })
const projectResult = ref({ gross: 0, discountAmount: 0, total: 0 })
const COMPLEXITY_MULT = { low: 0.9, medium: 1, high: 1.3 }

function calcProject() {
  const rate = project.customHourlyRate || hourlyRate.value
  if (!project.projectHours || !rate) { Swal.fire({ icon: 'warning', title: 'Informe as horas e valor/hora', confirmButtonColor: '#6366f1' }); return }
  const gross = Math.round(project.projectHours * rate * COMPLEXITY_MULT[project.complexity])
  const discountAmount = Math.round(gross * Math.min(project.discount, 100) / 100)
  const total = gross - discountAmount
  projectResult.value = { gross, discountAmount, total }
  Swal.fire({ icon: 'success', title: `Projeto: ${fmt(total)}`, timer: 1800, showConfirmButton: false })
}
const installmentValue = computed(() => project.installments > 1 && projectResult.value.total > 0 ? projectResult.value.total / Math.max(1, project.installments) : 0)

// Prazo
const deadline = reactive({ totalHours: 40, dailyAvailability: 4, includeWeekends: false })
const deadlineResult = ref<DeadlineResult | null>(null)

function calcDeadline() {
  if (deadline.totalHours <= 0 || deadline.dailyAvailability <= 0) { Swal.fire({ icon: 'warning', title: 'Preencha as horas corretamente', confirmButtonColor: '#6366f1' }); return }
  const workDays = Math.ceil(deadline.totalHours / deadline.dailyAvailability)
  const base = new Date(); let added = 0
  while (added < workDays) { base.setDate(base.getDate() + 1); const d = base.getDay(); if (deadline.includeWeekends || (d !== 0 && d !== 6)) added++ }
  deadlineResult.value = { workDays, deliveryDate: base.toLocaleDateString('pt-BR') }
  Swal.fire({ icon: 'success', title: `${workDays} dias — ${deadlineResult.value.deliveryDate}`, timer: 2000, showConfirmButton: false })
}

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }) }
</script>

<template>
  <ToolShell
    title="Calculadora Freelancer"
    description="Calcule seu valor por hora, precifique projetos e estime prazos de entrega com precisão profissional."
    icon="fa-laptop-code"
    icon-gradient="from-purple-500 to-indigo-700"
    orb-color="purple"
    :quick-tips="['Valor/hora justo', 'Precificação de projeto', 'Estimativa de prazo']"
    :tips="[
      { title: 'Valor/hora ideal', text: 'Inclua na fórmula: meta de receita, dias trabalhados, férias, margem de lucro e todos os impostos/taxas de plataforma.' },
      { title: 'Complexidade do projeto', text: 'Baixa (-10%) = manutenções simples. Alta (+30%) = funcionalidades novas, integrações, pesquisa.' },
      { title: 'Horas faturáveis', text: 'Nenhum freelancer trabalha 100% do tempo em projetos. Descontos por reuniões, prospecção e admin reduzem o total.' },
    ]"
    :examples="[
      { title: 'Desenvolvedor sênior', desc: 'Meta R$ 12.000/mês | 8h/dia | 5 dias/semana | 30% margem', result: 'Valor/hora ≈ R$ 125–140' },
      { title: 'Projeto de e-commerce', desc: '120 horas | complexidade alta | valor/hora R$ 100', result: 'Projeto ≈ R$ 15.600' },
      { title: 'Prazo de landing page', desc: '20 horas | disponibilidade 4h/dia | sem fins de semana', result: '5 dias úteis' },
    ]"
  >
    <!-- Abas -->
    <div class="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-xl p-1 mb-5">
      <button v-for="tab in [
        { key: 'hourly',   label: 'Valor/Hora', icon: 'fa-clock'          },
        { key: 'project',  label: 'Projeto',    icon: 'fa-folder-open'    },
        { key: 'deadline', label: 'Prazo',      icon: 'fa-calendar-check' },
      ]" :key="tab.key" @click="activeTab = tab.key as TabKey"
        :class="['flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all', activeTab === tab.key ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700']">
        <i :class="['fas', tab.icon, 'text-xs']"></i>{{ tab.label }}
      </button>
    </div>

    <!-- Valor/Hora -->
    <div v-show="activeTab === 'hourly'" class="grid md:grid-cols-2 gap-5">
      <div class="tool-body !mb-0 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <BaseInput v-model="hourly.monthlyGoal"   label="Receita/mês (R$)"    type="number" :min="0" icon="fa-coins"       />
          <BaseInput v-model="hourly.dailyHours"    label="Horas/dia"           type="number" :min="1" icon="fa-clock"       />
          <BaseInput v-model="hourly.workDays"      label="Dias/semana"         type="number" :min="1" icon="fa-calendar"    />
          <BaseInput v-model="hourly.vacationDays"  label="Férias/ano (dias)"   type="number" :min="0" icon="fa-umbrella-beach" />
          <BaseInput v-model="hourly.profitMargin"  label="Margem de lucro (%)" type="number" :min="0" icon="fa-percent"     />
          <BaseInput v-model="hourly.taxRate"       label="Impostos (%)"        type="number" :min="0" icon="fa-file-invoice"/>
        </div>
        <BaseButton variant="purple" icon="fa-calculator" @click="calcHourly" class="w-full">Calcular Valor/Hora</BaseButton>
      </div>
      <div class="space-y-4">
        <div class="tool-header text-center py-7">
          <p class="text-xs text-purple-200 mb-1">Valor ideal por hora</p>
          <p class="text-5xl font-black text-white">{{ fmt(hourlyRate) }}</p>
          <p class="text-purple-300 text-xs mt-1">Inclui margem, impostos e taxas</p>
        </div>
        <div v-if="hourlyDetails" class="glass-panel p-4 space-y-2 text-sm">
          <div class="flex justify-between border-b border-gray-100 dark:border-slate-700 py-1.5"><span class="text-gray-600 dark:text-slate-300">Valor base/hora</span><span class="font-bold">{{ fmt(hourlyDetails.baseRate) }}</span></div>
          <div class="flex justify-between border-b border-gray-100 dark:border-slate-700 py-1.5"><span class="text-gray-600 dark:text-slate-300">Horas faturáveis/ano</span><span class="font-bold">{{ hourlyDetails.billableHours }} h</span></div>
          <div class="flex justify-between border-b border-gray-100 dark:border-slate-700 py-1.5"><span class="text-gray-600 dark:text-slate-300">Faturamento mensal</span><span class="font-bold text-purple-600 dark:text-purple-400">{{ fmt(hourlyDetails.monthlyProjected) }}</span></div>
          <div class="flex justify-between py-1.5"><span class="text-gray-600 dark:text-slate-300">Faturamento anual</span><span class="font-bold text-purple-600 dark:text-purple-400">{{ fmt(hourlyDetails.yearlyProjected) }}</span></div>
        </div>
        <div v-else class="glass-panel p-8 text-center text-gray-400 dark:text-slate-500"><i class="fas fa-clock text-3xl mb-2 block opacity-30"></i><p class="text-sm">Calcule o valor/hora primeiro</p></div>
      </div>
    </div>

    <!-- Projeto -->
    <div v-show="activeTab === 'project'" class="grid md:grid-cols-2 gap-5">
      <div class="tool-body !mb-0 space-y-3">
        <BaseInput v-model="project.projectHours"      label="Estimativa de horas"              type="number" :min="0" icon="fa-hourglass" />
        <BaseInput v-model="project.customHourlyRate"  label="Valor/hora (0 = usar calculado)"  type="number" :min="0" icon="fa-coins"     />
        <div>
          <label class="input-aurora-label"><i class="fas fa-gauge-high mr-1.5 text-purple-500"></i>Complexidade</label>
          <select v-model="project.complexity" class="input-aurora mt-1">
            <option value="low">Baixa (−10%)</option>
            <option value="medium">Média (padrão)</option>
            <option value="high">Alta (+30%)</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <BaseInput v-model="project.discount"     label="Desconto (%)"  type="number" :min="0" :max="100" icon="fa-percent"  />
          <BaseInput v-model="project.installments" label="Parcelas"      type="number" :min="1" :max="24"  icon="fa-credit-card" />
        </div>
        <BaseButton variant="primary" icon="fa-calculator" @click="calcProject" class="w-full">Calcular Projeto</BaseButton>
      </div>
      <div>
        <div v-if="projectResult.total > 0" class="space-y-4">
          <div class="tool-header text-center py-7">
            <p class="text-xs text-blue-200 mb-1">Valor do Projeto</p>
            <p class="text-5xl font-black text-white">{{ fmt(projectResult.total) }}</p>
            <p v-if="projectResult.discountAmount > 0" class="text-blue-300 text-xs mt-1">De {{ fmt(projectResult.gross) }} com desconto de {{ fmt(projectResult.discountAmount) }}</p>
          </div>
          <div v-if="installmentValue > 0" class="glass-panel p-4 text-center">
            <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">{{ project.installments }}x de</p>
            <p class="text-2xl font-black text-primary-600 dark:text-primary-400">{{ fmt(installmentValue) }}</p>
          </div>
        </div>
        <div v-else class="glass-panel p-8 text-center text-gray-400 dark:text-slate-500"><i class="fas fa-folder-open text-3xl mb-2 block opacity-30"></i><p class="text-sm">Informe as horas e calcule</p></div>
      </div>
    </div>

    <!-- Prazo -->
    <div v-show="activeTab === 'deadline'" class="grid md:grid-cols-2 gap-5">
      <div class="tool-body !mb-0 space-y-3">
        <BaseInput v-model="deadline.totalHours"       label="Total de horas estimadas"      type="number" :min="0"  icon="fa-hourglass"      />
        <BaseInput v-model="deadline.dailyAvailability" label="Horas disponíveis por dia"   type="number" :min="0" :max="24" icon="fa-clock"  />
        <label class="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-200 dark:border-slate-700">
          <input v-model="deadline.includeWeekends" type="checkbox" class="checkbox-aurora" />
          <span class="text-sm text-gray-700 dark:text-slate-200">Trabalhar nos fins de semana</span>
        </label>
        <BaseButton variant="success" icon="fa-calendar-check" @click="calcDeadline" class="w-full">Calcular Prazo</BaseButton>
      </div>
      <div>
        <div v-if="deadlineResult" class="space-y-3">
          <div class="tool-header text-center py-7">
            <p class="text-xs text-green-200 mb-1">Prazo estimado</p>
            <p class="text-6xl font-black text-white">{{ deadlineResult.workDays }}</p>
            <p class="text-green-300 mt-1">{{ deadline.includeWeekends ? 'dias corridos' : 'dias úteis' }}</p>
          </div>
          <div class="glass-panel p-4 text-center">
            <p class="text-xs text-gray-500 dark:text-slate-400 mb-1"><i class="fas fa-calendar-check mr-1 text-green-500"></i>Data de entrega</p>
            <p class="text-xl font-black text-gray-900 dark:text-white">{{ deadlineResult.deliveryDate }}</p>
          </div>
        </div>
        <div v-else class="glass-panel p-8 text-center text-gray-400 dark:text-slate-500"><i class="fas fa-calendar text-3xl mb-2 block opacity-30"></i><p class="text-sm">Informe as horas e calcule</p></div>
      </div>
    </div>
  </ToolShell>
</template>
