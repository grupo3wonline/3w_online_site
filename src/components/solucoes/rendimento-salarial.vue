<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const salaryInput = ref('')
const isCalculating = ref(false)
const showResults = ref(false)
const notification = ref('')

interface SalaryData {
  mensal: number
  liquido: number
  semestral: number
  anual: number
  hora: number
  dia: number
  semana: number
  INSS: number
  IRRF: number
  feriasAnual: number
  decimoTerceiro: number
  fgts: number
}

const salaryData = ref<SalaryData | null>(null)

function calcINSS(salario: number): number {
  if (salario <= 1412.00) return salario * 0.075
  if (salario <= 2666.68) return salario * 0.09
  if (salario <= 4000.03) return salario * 0.12
  if (salario <= 7786.02) return salario * 0.14
  return 1065.59
}

function calcIRRF(base: number): number {
  if (base <= 2112.00) return 0
  if (base <= 2826.65) return base * 0.075 - 158.40
  if (base <= 3751.05) return base * 0.15 - 370.40
  if (base <= 4664.68) return base * 0.225 - 651.73
  return base * 0.275 - 884.96
}

async function calculateSalary() {
  const salary = parseFloat(salaryInput.value.replace(',', '.'))
  if (!salary || salary <= 0) {
    notification.value = 'Informe um salário válido'
    setTimeout(() => { notification.value = '' }, 2000)
    return
  }
  isCalculating.value = true
  await new Promise(r => setTimeout(r, 500))

  const inss = calcINSS(salary)
  const baseIRRF = salary - inss - 189.59 // desconto simplificado
  const irrf = Math.max(0, calcIRRF(baseIRRF))
  const liquido = salary - inss - irrf

  salaryData.value = {
    mensal: salary,
    liquido,
    INSS: inss,
    IRRF: irrf,
    hora: liquido / (22 * 8),
    dia: liquido / 22,
    semana: liquido / 4.33,
    semestral: liquido * 6,
    anual: liquido * 12,
    feriasAnual: (salary / 3) + salary,
    decimoTerceiro: salary,
    fgts: salary * 0.08 * 12,
  }

  showResults.value = true
  isCalculating.value = false
}

function reset() { showResults.value = false; salaryData.value = null; salaryInput.value = '' }

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const isValidInput = computed(() => {
  const v = parseFloat(salaryInput.value.replace(',', '.'))
  return !isNaN(v) && v > 0
})

type Period = { label: string; value: keyof SalaryData; color: string; icon: string }
const periods = computed<Period[]>(() => !salaryData.value ? [] : [
  { label: 'Por hora', value: 'hora', color: 'text-blue-300', icon: 'mdi:clock' },
  { label: 'Por dia', value: 'dia', color: 'text-cyan-300', icon: 'mdi:calendar-today' },
  { label: 'Por semana', value: 'semana', color: 'text-teal-300', icon: 'mdi:calendar-week' },
  { label: 'Líquido mensal', value: 'liquido', color: 'text-green-300', icon: 'mdi:cash' },
  { label: 'Semestral', value: 'semestral', color: 'text-yellow-300', icon: 'mdi:calendar-range' },
  { label: 'Anual', value: 'anual', color: 'text-orange-300', icon: 'mdi:calendar' },
])
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 space-y-5">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:cash-multiple" class="text-blue-400 w-7 h-7" />
        Calculadora de Rendimento Salarial
      </h1>
      <p class="text-blue-200 text-sm">Descubra quanto você ganha por hora, dia, semana e ano com cálculo de descontos CLT</p>
    </div>

    <!-- Input form -->
    <div v-if="!showResults" class="max-w-lg mx-auto">
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-8 text-center space-y-5">
        <div class="bg-blue-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <Icon icon="mdi:calculator-variant" class="w-10 h-10 text-blue-400" />
        </div>
        <div class="text-left space-y-1">
          <label class="text-white text-sm font-semibold">Salário Mensal Bruto (R$)</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-sm font-medium">R$</span>
            <input v-model="salaryInput" type="number" step="0.01" min="0" placeholder="2.500,00" id="salary" autocomplete="off"
              @keyup.enter="isValidInput && calculateSalary()"
              class="w-full bg-[#0a1628] text-white border-2 border-white/10 rounded-xl pl-10 pr-4 py-4 text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20" />
          </div>
          <p v-if="salaryInput && !isValidInput" class="text-red-400 text-xs">Informe um valor válido maior que zero.</p>
        </div>
        <button @click="calculateSalary" :disabled="!isValidInput || isCalculating"
          :class="['w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all', !isValidInput ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl hover:scale-[1.02]']">
          <Icon :icon="isCalculating ? 'mdi:loading' : 'mdi:calculator'" :class="['w-5 h-5', isCalculating ? 'animate-spin' : '']" />
          {{ isCalculating ? 'Calculando...' : 'Calcular Rendimento' }}
        </button>
        <div class="flex flex-wrap justify-center gap-3 text-xs text-blue-200">
          <span class="flex items-center gap-1"><Icon icon="mdi:check-circle" class="w-3.5 h-3.5 text-green-400" /> Gratuito</span>
          <span class="flex items-center gap-1"><Icon icon="mdi:check-circle" class="w-3.5 h-3.5 text-green-400" /> Instantâneo</span>
          <span class="flex items-center gap-1"><Icon icon="mdi:check-circle" class="w-3.5 h-3.5 text-green-400" /> INSS + IRRF</span>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="showResults && salaryData" class="space-y-5">
      <!-- Breakdown cards -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div v-for="p in periods" :key="p.value" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 text-center">
          <Icon :icon="p.icon" class="w-6 h-6 mx-auto mb-1" :class="p.color" />
          <p class="text-blue-200 text-xs mb-1">{{ p.label }}</p>
          <p class="font-bold text-lg" :class="p.color">{{ fmt(salaryData[p.value] as number) }}</p>
        </div>
      </div>

      <!-- Deductions -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5">
        <h2 class="text-white font-semibold mb-3 flex items-center gap-2"><Icon icon="mdi:file-document-outline" class="text-blue-400 w-5 h-5" /> Detalhamento Mensal (CLT)</h2>
        <div class="space-y-2">
          <div class="flex justify-between py-1.5 border-b border-white/5">
            <span class="text-blue-200">Salário Bruto</span>
            <span class="text-white font-medium">{{ fmt(salaryData.mensal) }}</span>
          </div>
          <div class="flex justify-between py-1.5 border-b border-white/5">
            <span class="text-blue-200">(-) INSS</span>
            <span class="text-red-300 font-medium">-{{ fmt(salaryData.INSS) }}</span>
          </div>
          <div class="flex justify-between py-1.5 border-b border-white/10">
            <span class="text-blue-200">(-) IRRF</span>
            <span class="text-red-300 font-medium">-{{ fmt(salaryData.IRRF) }}</span>
          </div>
          <div class="flex justify-between py-2 text-lg font-bold">
            <span class="text-white">= Salário Líquido</span>
            <span class="text-green-400">{{ fmt(salaryData.liquido) }}</span>
          </div>
        </div>
      </div>

      <!-- Extras -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5">
        <h2 class="text-white font-semibold mb-3 flex items-center gap-2"><Icon icon="mdi:gift" class="text-blue-400 w-5 h-5" /> Benefícios Anuais (Base Bruto)</h2>
        <div class="grid sm:grid-cols-3 gap-3">
          <div class="text-center">
            <p class="text-blue-200 text-xs mb-1">Férias + 1/3</p>
            <p class="text-yellow-300 font-bold">{{ fmt(salaryData.feriasAnual) }}</p>
          </div>
          <div class="text-center">
            <p class="text-blue-200 text-xs mb-1">13º Salário</p>
            <p class="text-yellow-300 font-bold">{{ fmt(salaryData.decimoTerceiro) }}</p>
          </div>
          <div class="text-center">
            <p class="text-blue-200 text-xs mb-1">FGTS Anual (8%)</p>
            <p class="text-yellow-300 font-bold">{{ fmt(salaryData.fgts) }}</p>
          </div>
        </div>
      </div>

      <button @click="reset" class="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
        <Icon icon="mdi:calculator" class="w-4 h-4" /> Novo Cálculo
      </button>
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
