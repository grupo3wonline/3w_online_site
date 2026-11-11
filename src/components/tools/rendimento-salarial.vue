<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const salaryInput = ref<number | ''>('')
const isCalculating = ref(false)
const showResults   = ref(false)

interface SalaryData {
  mensal: number; liquido: number; semestral: number; anual: number
  hora: number; dia: number; semana: number
  INSS: number; IRRF: number; feriasAnual: number; decimoTerceiro: number; fgts: number
}
const salaryData = ref<SalaryData | null>(null)

function calcINSS(s: number) {
  if (s <= 1412.00) return s * 0.075
  if (s <= 2666.68) return s * 0.09
  if (s <= 4000.03) return s * 0.12
  if (s <= 7786.02) return s * 0.14
  return 1065.59
}
function calcIRRF(base: number) {
  if (base <= 2112.00) return 0
  if (base <= 2826.65) return base * 0.075 - 158.40
  if (base <= 3751.05) return base * 0.15  - 370.40
  if (base <= 4664.68) return base * 0.225 - 651.73
  return base * 0.275 - 884.96
}

async function calculateSalary() {
  const salary = Number(salaryInput.value)
  if (!salary || salary <= 0) return
  isCalculating.value = true
  await new Promise(r => setTimeout(r, 350))
  const inss = calcINSS(salary)
  const irrf = Math.max(0, calcIRRF(salary - inss - 189.59))
  const liquido = salary - inss - irrf
  salaryData.value = {
    mensal: salary, liquido, INSS: inss, IRRF: irrf,
    hora: liquido / (22 * 8), dia: liquido / 22, semana: liquido / 4.33,
    semestral: liquido * 6, anual: liquido * 12,
    feriasAnual: (salary / 3) + salary, decimoTerceiro: salary, fgts: salary * 0.08 * 12,
  }
  showResults.value = true
  isCalculating.value = false
}

function reset() { showResults.value = false; salaryData.value = null; salaryInput.value = '' }
const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const isValid = computed(() => Number(salaryInput.value) > 0)
</script>

<template>
  <ToolShell
    title="Rendimento Salarial"
    description="Calcule quanto você ganha por hora, dia, semana e ano com desconto de INSS e IRRF (tabela 2025)."
    icon="fa-money-bill-trend-up"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Por hora/dia/semana', 'INSS progressivo', 'IRRF 2025']"
    :tips="[
      { title: 'INSS progressivo 2025', text: 'Faixas: até R$ 1.412 → 7,5% | até R$ 2.667 → 9% | até R$ 4.000 → 12% | até R$ 7.786 → 14%. Cada faixa incide apenas sobre a parcela dentro dela.' },
      { title: 'Base de cálculo do IR', text: 'O IR incide sobre o salário bruto menos o INSS e o desconto simplificado (R$ 189,59). Resultado abaixo de R$ 2.112 é isento.' },
      { title: 'Horas trabalhadas', text: 'O cálculo assume 22 dias úteis e 8h/dia (176h mensais), padrão CLT.' },
    ]"
    :examples="[
      { title: 'Salário mínimo 2025', desc: 'R$ 1.412,00', result: 'Líquido ≈ R$ 1.305,89 (INSS R$ 105,90, IR R$ 0)' },
      { title: 'Salário médio', desc: 'R$ 3.500,00', result: 'Líquido ≈ R$ 2.945,47 · por hora ≈ R$ 16,74' },
      { title: 'Executivo', desc: 'R$ 8.000,00', result: 'Líquido ≈ R$ 6.167 · por hora ≈ R$ 35' },
    ]"
  >
    <!-- Entrada -->
    <div v-if="!showResults" class="max-w-sm mx-auto">
      <div class="tool-body space-y-4">
        <div class="text-center py-4">
          <div class="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-calculator-simple text-2xl text-blue-600 dark:text-blue-400"></i>
          </div>
          <p class="text-sm text-gray-500 dark:text-slate-400">Informe seu salário bruto mensal</p>
        </div>
        <BaseInput v-model="salaryInput" label="Salário Bruto (R$)" type="number" :min="0" step="0.01"
          icon="fa-coins" placeholder="3500" @keyup.enter="isValid && calculateSalary()" />
        <BaseButton variant="success" icon="fa-calculator" @click="calculateSalary" :disabled="!isValid || isCalculating" class="w-full">
          {{ isCalculating ? 'Calculando...' : 'Calcular Rendimento' }}
        </BaseButton>
      </div>
    </div>

    <!-- Resultados -->
    <Transition name="scale-in" appear>
      <div v-if="showResults && salaryData" class="space-y-5">
        <!-- Destaque principal -->
        <div class="tool-header text-center py-6">
          <p class="text-xs text-blue-200 mb-1">Salário Líquido Mensal</p>
          <p class="text-5xl font-black text-white">{{ fmt(salaryData.liquido) }}</p>
          <p class="text-blue-300 text-sm mt-1">{{ fmt(salaryData.hora) }} / hora</p>
        </div>

        <!-- Métricas de período -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div v-for="p in [
            { label: 'Por hora',    val: salaryData.hora,     cls: 'text-sky-600 dark:text-sky-400'     },
            { label: 'Por dia',     val: salaryData.dia,      cls: 'text-cyan-600 dark:text-cyan-400'   },
            { label: 'Por semana',  val: salaryData.semana,   cls: 'text-teal-600 dark:text-teal-400'   },
            { label: 'Líquido/mês', val: salaryData.liquido,  cls: 'text-blue-600 dark:text-blue-400'   },
            { label: 'Semestral',   val: salaryData.semestral,cls: 'text-indigo-600 dark:text-indigo-400'},
            { label: 'Anual',       val: salaryData.anual,    cls: 'text-violet-600 dark:text-violet-400'},
          ]" :key="p.label" class="metric-glass">
            <div class="metric-glass-value text-sm font-bold" :class="p.cls">{{ fmt(p.val) }}</div>
            <div class="metric-glass-label">{{ p.label }}</div>
          </div>
        </div>

        <!-- Descontos -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-file-invoice text-blue-500"></i>
            Descontos Mensais (CLT)
          </h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
              <span class="text-gray-600 dark:text-slate-300">Salário Bruto</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ fmt(salaryData.mensal) }}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
              <span class="text-gray-600 dark:text-slate-300">(-) INSS</span>
              <span class="font-bold text-red-600 dark:text-red-400">-{{ fmt(salaryData.INSS) }}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
              <span class="text-gray-600 dark:text-slate-300">(-) IRRF</span>
              <span class="font-bold text-red-600 dark:text-red-400">-{{ fmt(salaryData.IRRF) }}</span>
            </div>
            <div class="flex justify-between py-2 text-base">
              <span class="font-bold text-gray-800 dark:text-white">= Salário Líquido</span>
              <span class="font-black text-emerald-600 dark:text-emerald-400">{{ fmt(salaryData.liquido) }}</span>
            </div>
          </div>
        </div>

        <!-- Benefícios -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-gift text-blue-500"></i>
            Benefícios Anuais (Base Bruto)
          </h4>
          <div class="grid sm:grid-cols-3 gap-3 text-center">
            <div class="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
              <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">Férias + 1/3</p>
              <p class="font-bold text-yellow-600 dark:text-yellow-400">{{ fmt(salaryData.feriasAnual) }}</p>
            </div>
            <div class="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
              <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">13º Salário</p>
              <p class="font-bold text-yellow-600 dark:text-yellow-400">{{ fmt(salaryData.decimoTerceiro) }}</p>
            </div>
            <div class="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
              <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">FGTS Anual (8%)</p>
              <p class="font-bold text-yellow-600 dark:text-yellow-400">{{ fmt(salaryData.fgts) }}</p>
            </div>
          </div>
        </div>

        <BaseButton variant="outline" icon="fa-calculator" @click="reset" class="w-full">Novo Cálculo</BaseButton>
      </div>
    </Transition>
  </ToolShell>
</template>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all .3s ease; }
.scale-in-enter-from { transform: scale(.97); opacity: 0; }
.scale-in-leave-to  { opacity: 0; }
</style>
