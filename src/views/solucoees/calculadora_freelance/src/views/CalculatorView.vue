<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useStorage, useClipboard } from '@vueuse/core'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import FieldTooltip from '@/components/shared/FieldTooltip.vue'
import CtaAgency from '@/components/shared/CtaAgency.vue'
import { notify } from '@/lib/notify'
import { useLoadingStore } from '@/stores/loading'
import {
  calculateHourlyRate,
  calculateProjectValue,
  calculateInstallments,
  calculateDeadline,
  formatCurrency,
  formatDate,
  type Complexity,
  type HourlyRateResult,
} from '@/lib/calculations'
import { hourlyRateSchema, projectSchema, deadlineSchema } from '@/lib/schemas'
import { buildQuoteText } from '@/lib/quote'
import { COMPANY } from '@/lib/constants'

const loading = useLoadingStore()
const { copy, copied, isSupported: clipboardSupported } = useClipboard()

type TabKey = 'hourly' | 'project' | 'deadline' | 'quote'
const activeTab = ref<TabKey>('hourly')

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'hourly', label: 'Valor/Hora', icon: 'fa-dollar-sign' },
  { key: 'project', label: 'Projeto', icon: 'fa-calculator' },
  { key: 'deadline', label: 'Prazo', icon: 'fa-clock' },
  { key: 'quote', label: 'Orçamento', icon: 'fa-file-invoice' },
]

// ---- Valor/Hora ----
const emptyHourly = {
  monthlyGoal: '',
  dailyHours: '',
  workDays: '',
  vacationDays: '',
  profitMargin: '',
  taxRate: '',
  platformFee: '',
}
const hourly = reactive({ ...emptyHourly })
const hourlyRate = useStorage('calc-hourly-rate', 0)
const hourlyBreakdown = useStorage<HourlyRateResult | null>(
  'calc-hourly-breakdown',
  null,
  undefined,
  {
    serializer: {
      read: (v) => (v ? JSON.parse(v) : null),
      write: (v) => JSON.stringify(v),
    },
  }
)

// ---- Projeto ----
const emptyProject = {
  projectHours: '',
  customHourlyRate: '',
  complexity: '' as '' | Complexity,
  discount: '',
  installments: '1',
}
const project = reactive({ ...emptyProject })
const projectResult = useStorage('calc-project-result', { gross: 0, discountAmount: 0, total: 0 })

// ---- Prazo ----
const emptyDeadline = { totalHours: '', dailyAvailability: '', includeWeekends: false }
const deadline = reactive({ ...emptyDeadline })
const estimatedDays = useStorage('calc-deadline-days', 0)
const deliveryDate = ref('')

// ---- Orçamento ----
const quote = reactive({ name: '', description: '', observations: '' })

const effectiveRate = computed(() =>
  project.customHourlyRate ? Number(project.customHourlyRate) : hourlyRate.value
)

const installmentCount = computed(() => Math.max(1, Number(project.installments) || 1))
const installmentValues = computed(() =>
  calculateInstallments(projectResult.value.total, installmentCount.value)
)

async function withLoader<T>(fn: () => T): Promise<T> {
  loading.start('Calculando...')
  await new Promise((r) => setTimeout(r, 300))
  const result = fn()
  loading.stop()
  return result
}

async function onCalculateHourly() {
  const parsed = hourlyRateSchema.safeParse(hourly)
  if (!parsed.success) {
    notify.warning('Campos incompletos', parsed.error.issues[0]?.message)
    return
  }
  const result = await withLoader(() => calculateHourlyRate(parsed.data))
  hourlyRate.value = result.rate
  hourlyBreakdown.value = result
  notify.success(
    'Cálculo realizado!',
    `Seu valor ideal por hora é: <strong>${formatCurrency(result.rate)}</strong>`
  )
}

async function onCalculateProject() {
  const parsed = projectSchema.safeParse({
    projectHours: project.projectHours,
    hourlyRate: effectiveRate.value,
    complexity: project.complexity,
    discount: project.discount || 0,
  })
  if (!parsed.success) {
    notify.warning('Dados insuficientes', parsed.error.issues[0]?.message)
    return
  }
  projectResult.value = await withLoader(() => calculateProjectValue(parsed.data))
  notify.success(
    'Projeto calculado!',
    `Valor do projeto: <strong>${formatCurrency(projectResult.value.total)}</strong>`
  )
}

function useProjectHoursInDeadline() {
  if (project.projectHours) {
    deadline.totalHours = project.projectHours
    activeTab.value = 'deadline'
    notify.info('Horas importadas', 'Usamos as horas do projeto no cálculo de prazo.')
  } else {
    notify.warning('Sem horas', 'Informe as horas do projeto primeiro.')
  }
}

async function onCalculateDeadline() {
  const parsed = deadlineSchema.safeParse(deadline)
  if (!parsed.success) {
    notify.warning('Campos incompletos', parsed.error.issues[0]?.message)
    return
  }
  const result = await withLoader(() =>
    calculateDeadline({ ...parsed.data, includeWeekends: deadline.includeWeekends })
  )
  estimatedDays.value = result.workDays
  deliveryDate.value = formatDate(result.deliveryDate)
  notify.success(
    'Prazo calculado!',
    `Prazo: <strong>${result.workDays} dias</strong><br>Entrega prevista: <strong>${deliveryDate.value}</strong>`
  )
}

function currentQuote() {
  return {
    name: quote.name,
    description: quote.description,
    observations: quote.observations,
    projectHours: project.projectHours,
    hourlyRate: effectiveRate.value,
    gross: projectResult.value.gross,
    discountAmount: projectResult.value.discountAmount,
    estimatedDays: estimatedDays.value,
    deliveryDate: deliveryDate.value,
    total: projectResult.value.total,
    installments: installmentValues.value,
  }
}

function validateQuote(): boolean {
  if (!quote.name.trim() || projectResult.value.total <= 0) {
    notify.warning(
      'Dados incompletos',
      'Preencha o nome do projeto e calcule o valor na aba "Projeto" antes de gerar o orçamento.'
    )
    return false
  }
  return true
}

async function onCopyQuote() {
  if (!validateQuote()) return
  const text = buildQuoteText(currentQuote(), COMPANY.legalName)
  await copy(text)
  notify.success(
    'Orçamento copiado!',
    'O resumo do orçamento foi copiado para a área de transferência.'
  )
}

function onPrintQuote() {
  if (!validateQuote()) return
  window.print()
}

// ---- Reset por aba ----
function resetHourly() {
  Object.assign(hourly, emptyHourly)
  hourlyRate.value = 0
  hourlyBreakdown.value = null
}
function resetProject() {
  Object.assign(project, emptyProject)
  projectResult.value = { gross: 0, discountAmount: 0, total: 0 }
}
function resetDeadline() {
  Object.assign(deadline, emptyDeadline)
  estimatedDays.value = 0
  deliveryDate.value = ''
}
</script>

<template>
  <div>
    <div class="container-app">
      <AppBreadcrumb :items="[{ label: 'Calculadora' }]" />
    </div>

    <section class="bg-mesh py-12">
      <div class="container-app">
        <header class="mb-10 text-center">
          <span class="eyebrow mb-4"><i class="fas fa-calculator"></i> Ferramenta gratuita</span>
          <h1 class="mb-3 font-display text-3xl font-bold md:text-4xl">
            <span class="gradient-text">Calculadora Freelancer</span>
          </h1>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Calcule seus valores e prazos com precisão profissional. Todos os cálculos são feitos no
            seu navegador.
          </p>
        </header>

        <!-- Abas -->
        <div
          role="tablist"
          aria-label="Tipos de cálculo"
          class="glass mx-auto mb-8 grid max-w-3xl grid-cols-2 gap-1.5 rounded-2xl p-1.5 shadow-soft md:grid-cols-4"
        >
          <button
            v-for="tab in tabs"
            :key="tab.key"
            role="tab"
            :aria-selected="activeTab === tab.key"
            type="button"
            class="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all"
            :class="
              activeTab === tab.key
                ? 'bg-brand-gradient text-white shadow-soft'
                : 'text-gray-600 hover:bg-white/60 dark:text-gray-300 dark:hover:bg-white/5'
            "
            @click="activeTab = tab.key"
          >
            <i class="fas" :class="tab.icon"></i>
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <div class="mx-auto max-w-5xl">
          <!-- VALOR/HORA -->
          <div v-show="activeTab === 'hourly'" class="grid gap-6 md:grid-cols-2">
            <form class="card-surface p-6" autocomplete="off" @submit.prevent="onCalculateHourly">
              <h2 class="mb-6 flex items-center gap-2 text-xl font-bold">
                <i class="fas fa-pen-to-square text-brand-600"></i> Calcular Valor/Hora
              </h2>
              <div class="space-y-4">
                <div>
                  <label for="monthlyGoal" class="field-label">
                    <i class="fas fa-bullseye text-brand-600"></i> Receita mensal desejada (R$)
                    <FieldTooltip
                      text="Quanto você quer receber por mês, líquido, para viver bem."
                    />
                  </label>
                  <input
                    id="monthlyGoal"
                    v-model="hourly.monthlyGoal"
                    type="number"
                    inputmode="decimal"
                    min="0"
                    placeholder="Ex: 8000"
                    autocomplete="off"
                    class="field"
                  />
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="dailyHours" class="field-label">
                      <i class="fas fa-business-time text-brand-600"></i> Horas/dia
                      <FieldTooltip text="Quantas horas produtivas você trabalha por dia." />
                    </label>
                    <input
                      id="dailyHours"
                      v-model="hourly.dailyHours"
                      type="number"
                      inputmode="decimal"
                      min="0"
                      max="24"
                      placeholder="Ex: 8"
                      autocomplete="off"
                      class="field"
                    />
                  </div>
                  <div>
                    <label for="workDays" class="field-label">
                      <i class="fas fa-calendar-week text-brand-600"></i> Dias/semana
                      <FieldTooltip text="Número de dias que você trabalha por semana (1 a 7)." />
                    </label>
                    <input
                      id="workDays"
                      v-model="hourly.workDays"
                      type="number"
                      inputmode="numeric"
                      min="1"
                      max="7"
                      placeholder="Ex: 5"
                      autocomplete="off"
                      class="field"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="vacationDays" class="field-label">
                      <i class="fas fa-umbrella-beach text-brand-600"></i> Férias/ano
                      <FieldTooltip
                        text="Dias que você não vai faturar no ano (férias e folgas)."
                      />
                    </label>
                    <input
                      id="vacationDays"
                      v-model="hourly.vacationDays"
                      type="number"
                      inputmode="numeric"
                      min="0"
                      placeholder="Ex: 30"
                      autocomplete="off"
                      class="field"
                    />
                  </div>
                  <div>
                    <label for="profitMargin" class="field-label">
                      <i class="fas fa-chart-line text-brand-600"></i> Lucro (%)
                      <FieldTooltip
                        text="Percentual extra sobre o custo. Recomenda-se de 20% a 30%."
                      />
                    </label>
                    <input
                      id="profitMargin"
                      v-model="hourly.profitMargin"
                      type="number"
                      inputmode="decimal"
                      min="0"
                      placeholder="Ex: 20"
                      autocomplete="off"
                      class="field"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="taxRate" class="field-label">
                      <i class="fas fa-receipt text-brand-600"></i> Impostos (%)
                      <FieldTooltip
                        text="Impostos sobre o faturamento (ex.: Simples/MEI). Deixe 0 se não se aplica."
                      />
                    </label>
                    <input
                      id="taxRate"
                      v-model="hourly.taxRate"
                      type="number"
                      inputmode="decimal"
                      min="0"
                      max="100"
                      placeholder="Ex: 6"
                      autocomplete="off"
                      class="field"
                    />
                  </div>
                  <div>
                    <label for="platformFee" class="field-label">
                      <i class="fas fa-percent text-brand-600"></i> Taxa plataforma (%)
                      <FieldTooltip
                        text="Taxa de marketplaces/intermediários (ex.: Workana, 99Freelas)."
                      />
                    </label>
                    <input
                      id="platformFee"
                      v-model="hourly.platformFee"
                      type="number"
                      inputmode="decimal"
                      min="0"
                      max="100"
                      placeholder="Ex: 10"
                      autocomplete="off"
                      class="field"
                    />
                  </div>
                </div>
                <div class="flex gap-3">
                  <button type="submit" class="btn-primary flex-1">
                    <i class="fas fa-calculator"></i> Calcular
                  </button>
                  <button
                    type="button"
                    class="btn-ghost"
                    title="Limpar campos"
                    @click="resetHourly"
                  >
                    <i class="fas fa-eraser"></i>
                  </button>
                </div>
              </div>
            </form>

            <div class="space-y-4">
              <div
                class="card-surface flex flex-col items-center justify-center bg-brand-gradient p-8 text-center text-white"
              >
                <p class="mb-2 text-white/80">Valor ideal por hora</p>
                <div class="mb-2 font-display text-5xl font-extrabold">
                  {{ formatCurrency(hourlyRate) }}
                </div>
                <p class="text-sm text-white/70">
                  <i class="fas fa-circle-info"></i> Já inclui margem, impostos e taxas
                </p>
              </div>

              <!-- Breakdown -->
              <div v-if="hourlyBreakdown && hourlyBreakdown.rate > 0" class="card-surface p-6">
                <h3 class="mb-4 flex items-center gap-2 font-bold">
                  <i class="fas fa-list-check text-brand-600"></i> Detalhamento
                </h3>
                <dl class="space-y-2.5 text-sm">
                  <div class="flex items-center justify-between">
                    <dt class="text-gray-500 dark:text-gray-400">Valor base (sem acréscimos)</dt>
                    <dd class="font-semibold">{{ formatCurrency(hourlyBreakdown.baseRate) }}/h</dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-gray-500 dark:text-gray-400">Horas faturáveis/ano</dt>
                    <dd class="font-semibold">{{ hourlyBreakdown.billableHours }} h</dd>
                  </div>
                  <div
                    class="flex items-center justify-between border-t border-gray-100 pt-2.5 dark:border-gray-800"
                  >
                    <dt class="text-gray-500 dark:text-gray-400">Faturamento mensal projetado</dt>
                    <dd class="font-semibold text-accent-600">
                      {{ formatCurrency(hourlyBreakdown.monthlyProjected) }}
                    </dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-gray-500 dark:text-gray-400">Faturamento anual projetado</dt>
                    <dd class="font-semibold text-accent-600">
                      {{ formatCurrency(hourlyBreakdown.yearlyProjected) }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <!-- PROJETO -->
          <div v-show="activeTab === 'project'" class="grid gap-6 md:grid-cols-2">
            <form class="card-surface p-6" autocomplete="off" @submit.prevent="onCalculateProject">
              <h2 class="mb-6 flex items-center gap-2 text-xl font-bold">
                <i class="fas fa-diagram-project text-blue-600"></i> Calcular Valor do Projeto
              </h2>
              <div class="space-y-4">
                <div>
                  <label for="projectHours" class="field-label">
                    <i class="fas fa-hourglass-half text-blue-600"></i> Estimativa de horas
                    <FieldTooltip text="Total de horas que você estima para concluir o projeto." />
                  </label>
                  <input
                    id="projectHours"
                    v-model="project.projectHours"
                    type="number"
                    inputmode="decimal"
                    min="0"
                    placeholder="Ex: 40"
                    autocomplete="off"
                    class="field"
                  />
                </div>
                <div>
                  <label for="customRate" class="field-label">
                    <i class="fas fa-coins text-blue-600"></i> Valor por hora (R$)
                    <FieldTooltip
                      text="Deixe em branco para usar o valor/hora calculado na aba anterior."
                    />
                  </label>
                  <input
                    id="customRate"
                    v-model="project.customHourlyRate"
                    type="number"
                    inputmode="decimal"
                    min="0"
                    :placeholder="`Padrão: ${formatCurrency(hourlyRate)}`"
                    autocomplete="off"
                    class="field"
                  />
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="complexity" class="field-label">
                      <i class="fas fa-sliders text-blue-600"></i> Complexidade
                      <FieldTooltip
                        text="Baixa reduz 10%, média mantém o valor e alta acrescenta 30%."
                      />
                    </label>
                    <select
                      id="complexity"
                      v-model="project.complexity"
                      autocomplete="off"
                      class="field"
                    >
                      <option value="" disabled>Selecione</option>
                      <option value="low">Baixa (-10%)</option>
                      <option value="medium">Média (padrão)</option>
                      <option value="high">Alta (+30%)</option>
                    </select>
                  </div>
                  <div>
                    <label for="discount" class="field-label">
                      <i class="fas fa-tag text-blue-600"></i> Desconto (%)
                      <FieldTooltip text="Desconto comercial aplicado ao valor final. Opcional." />
                    </label>
                    <input
                      id="discount"
                      v-model="project.discount"
                      type="number"
                      inputmode="decimal"
                      min="0"
                      max="100"
                      placeholder="Ex: 10"
                      autocomplete="off"
                      class="field"
                    />
                  </div>
                </div>
                <div>
                  <label for="installments" class="field-label">
                    <i class="fas fa-credit-card text-blue-600"></i> Parcelas
                    <FieldTooltip
                      text="Em quantas vezes o cliente vai pagar. Mostramos o valor de cada parcela."
                    />
                  </label>
                  <input
                    id="installments"
                    v-model="project.installments"
                    type="number"
                    inputmode="numeric"
                    min="1"
                    max="24"
                    placeholder="Ex: 3"
                    autocomplete="off"
                    class="field"
                  />
                </div>
                <div class="flex gap-3">
                  <button
                    type="submit"
                    class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <i class="fas fa-calculator"></i> Calcular Projeto
                  </button>
                  <button
                    type="button"
                    class="btn-ghost"
                    title="Limpar campos"
                    @click="resetProject"
                  >
                    <i class="fas fa-eraser"></i>
                  </button>
                </div>
                <button
                  type="button"
                  class="w-full text-sm font-medium text-blue-600 hover:underline"
                  @click="useProjectHoursInDeadline"
                >
                  <i class="fas fa-arrow-right-arrow-left"></i> Usar estas horas para calcular o
                  prazo
                </button>
              </div>
            </form>

            <div
              class="card-surface flex flex-col justify-center bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-center text-white"
            >
              <p class="mb-2 text-white/80">Valor do projeto</p>
              <div class="mb-3 font-display text-5xl font-extrabold">
                {{ formatCurrency(projectResult.total) }}
              </div>
              <div v-if="projectResult.discountAmount > 0" class="mb-3 text-sm text-white/80">
                <span class="line-through">{{ formatCurrency(projectResult.gross) }}</span>
                <span class="ml-2 rounded-full bg-white/20 px-2 py-0.5 font-semibold">
                  economia de {{ formatCurrency(projectResult.discountAmount) }}
                </span>
              </div>
              <div
                v-if="installmentCount > 1 && projectResult.total > 0"
                class="rounded-xl bg-white/15 p-3 text-sm"
              >
                <i class="fas fa-credit-card"></i>
                {{ installmentCount }}x de
                <strong>{{ formatCurrency(installmentValues[0], true) }}</strong>
              </div>
              <p class="mt-3 text-sm text-white/70">
                <i class="fas fa-circle-info"></i> Ajustado por complexidade e desconto
              </p>
            </div>
          </div>

          <!-- PRAZO -->
          <div v-show="activeTab === 'deadline'" class="grid gap-6 md:grid-cols-2">
            <form class="card-surface p-6" autocomplete="off" @submit.prevent="onCalculateDeadline">
              <h2 class="mb-6 flex items-center gap-2 text-xl font-bold">
                <i class="fas fa-stopwatch text-green-600"></i> Calcular Prazo
              </h2>
              <div class="space-y-4">
                <div>
                  <label for="totalHours" class="field-label">
                    <i class="fas fa-clock text-green-600"></i> Total de horas estimadas
                    <FieldTooltip text="Total de horas necessárias para entregar o projeto." />
                  </label>
                  <input
                    id="totalHours"
                    v-model="deadline.totalHours"
                    type="number"
                    inputmode="decimal"
                    min="0"
                    placeholder="Ex: 40"
                    autocomplete="off"
                    class="field"
                  />
                </div>
                <div>
                  <label for="dailyAvailability" class="field-label">
                    <i class="fas fa-calendar-day text-green-600"></i> Horas disponíveis por dia
                    <FieldTooltip text="Quantas horas por dia você pode dedicar a este projeto." />
                  </label>
                  <input
                    id="dailyAvailability"
                    v-model="deadline.dailyAvailability"
                    type="number"
                    inputmode="decimal"
                    min="0"
                    placeholder="Ex: 4"
                    autocomplete="off"
                    class="field"
                  />
                </div>
                <label
                  class="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-700"
                >
                  <input
                    v-model="deadline.includeWeekends"
                    type="checkbox"
                    class="h-4 w-4 rounded accent-green-600"
                  />
                  <span class="text-sm text-gray-600 dark:text-gray-300">
                    Trabalhar também nos fins de semana
                  </span>
                </label>
                <div class="flex gap-3">
                  <button
                    type="submit"
                    class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <i class="fas fa-calculator"></i> Calcular Prazo
                  </button>
                  <button
                    type="button"
                    class="btn-ghost"
                    title="Limpar campos"
                    @click="resetDeadline"
                  >
                    <i class="fas fa-eraser"></i>
                  </button>
                </div>
              </div>
            </form>

            <div
              class="card-surface flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-emerald-600 p-8 text-center text-white"
            >
              <p class="mb-2 text-white/80">Prazo estimado</p>
              <div class="mb-1 font-display text-6xl font-extrabold">{{ estimatedDays }}</div>
              <div class="mb-4 text-xl font-semibold text-white/90">
                {{ deadline.includeWeekends ? 'dias corridos' : 'dias úteis' }}
              </div>
              <div v-if="deliveryDate" class="rounded-xl bg-white/15 px-4 py-2 text-sm">
                <i class="fas fa-calendar-check"></i> Entrega prevista:
                <strong>{{ deliveryDate }}</strong>
              </div>
              <p class="mt-3 text-sm text-white/70">
                <i class="fas fa-circle-info"></i> Baseado na sua disponibilidade
              </p>
            </div>
          </div>

          <!-- ORÇAMENTO -->
          <div v-show="activeTab === 'quote'">
            <div class="card-surface p-6">
              <h2 class="mb-6 flex items-center gap-2 text-xl font-bold">
                <i class="fas fa-file-invoice-dollar text-orange-600"></i> Gerar Orçamento
              </h2>
              <form class="space-y-6" autocomplete="off" @submit.prevent="onCopyQuote">
                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label for="quoteName" class="field-label">
                      <i class="fas fa-tag text-orange-600"></i> Nome do projeto
                    </label>
                    <input
                      id="quoteName"
                      v-model="quote.name"
                      type="text"
                      placeholder="Ex: Website Corporativo"
                      autocomplete="off"
                      class="field"
                    />
                  </div>
                  <div>
                    <span class="field-label"
                      ><i class="fas fa-money-bill-wave text-orange-600"></i> Valor total
                      estimado</span
                    >
                    <div
                      class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text pt-2 font-display text-3xl font-bold text-transparent"
                    >
                      {{ formatCurrency(projectResult.total) }}
                    </div>
                  </div>
                </div>

                <div>
                  <label for="quoteDescription" class="field-label">
                    <i class="fas fa-align-left text-orange-600"></i> Descrição do projeto
                  </label>
                  <textarea
                    id="quoteDescription"
                    v-model="quote.description"
                    rows="4"
                    placeholder="Descreva o escopo do projeto..."
                    autocomplete="off"
                    class="field"
                  ></textarea>
                </div>

                <div>
                  <label for="quoteObs" class="field-label">
                    <i class="fas fa-note-sticky text-orange-600"></i> Observações / Termos
                  </label>
                  <textarea
                    id="quoteObs"
                    v-model="quote.observations"
                    rows="4"
                    placeholder="Condições de pagamento, prazos, etc..."
                    autocomplete="off"
                    class="field"
                  ></textarea>
                </div>

                <!-- Prévia -->
                <div
                  id="quote-preview"
                  class="rounded-2xl border border-orange-200 bg-orange-50/60 p-8 dark:border-orange-900/50 dark:bg-orange-950/20"
                >
                  <h3 class="mb-6 flex items-center gap-2 text-xl font-bold">
                    <i class="fas fa-eye text-orange-600"></i> Prévia do Orçamento
                  </h3>
                  <h4 class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ quote.name || 'Nome do Projeto' }}
                  </h4>
                  <p class="mt-2 text-gray-600 dark:text-gray-400">
                    {{ quote.description || 'A descrição do projeto aparecerá aqui...' }}
                  </p>
                  <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div class="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900">
                      <span class="text-xs text-gray-500 dark:text-gray-400">Horas estimadas</span>
                      <div class="mt-1 text-lg font-bold">{{ project.projectHours || '-' }} h</div>
                    </div>
                    <div class="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900">
                      <span class="text-xs text-gray-500 dark:text-gray-400">Valor/hora</span>
                      <div class="mt-1 text-lg font-bold">{{ formatCurrency(effectiveRate) }}</div>
                    </div>
                    <div class="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900">
                      <span class="text-xs text-gray-500 dark:text-gray-400">Prazo</span>
                      <div class="mt-1 text-lg font-bold">{{ estimatedDays || '-' }} dias</div>
                    </div>
                    <div class="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900">
                      <span class="text-xs text-gray-500 dark:text-gray-400">Valor total</span>
                      <div
                        class="mt-1 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-xl font-bold text-transparent"
                      >
                        {{ formatCurrency(projectResult.total) }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="installmentCount > 1 && projectResult.total > 0"
                    class="mt-4 rounded-xl bg-white p-4 text-sm shadow-sm dark:bg-gray-900"
                  >
                    <i class="fas fa-credit-card text-orange-600"></i>
                    Parcelamento:
                    <strong
                      >{{ installmentCount }}x de
                      {{ formatCurrency(installmentValues[0], true) }}</strong
                    >
                  </div>
                  <div
                    v-if="deliveryDate"
                    class="mt-4 rounded-xl bg-white p-4 text-sm shadow-sm dark:bg-gray-900"
                  >
                    <i class="fas fa-calendar-check text-orange-600"></i>
                    Entrega prevista: <strong>{{ deliveryDate }}</strong>
                  </div>
                  <div
                    v-if="quote.observations"
                    class="mt-4 rounded-xl bg-white p-4 dark:bg-gray-900"
                  >
                    <span class="mb-2 block text-xs text-gray-500 dark:text-gray-400"
                      >Observações</span
                    >
                    <p class="text-gray-700 dark:text-gray-300">{{ quote.observations }}</p>
                  </div>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row">
                  <button
                    v-if="clipboardSupported"
                    type="submit"
                    class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 text-lg font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <i class="fas" :class="copied ? 'fa-check' : 'fa-copy'"></i>
                    {{ copied ? 'Copiado!' : 'Copiar Orçamento' }}
                  </button>
                  <button
                    type="button"
                    class="btn-outline flex-1 py-4 text-lg"
                    @click="onPrintQuote"
                  >
                    <i class="fas fa-print"></i> Imprimir / Salvar PDF
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaAgency variant="compact" />
  </div>
</template>

<style>
@media print {
  header,
  footer,
  [role='tablist'],
  .btn-primary,
  .btn-outline,
  section:last-of-type {
    display: none !important;
  }
}
</style>
