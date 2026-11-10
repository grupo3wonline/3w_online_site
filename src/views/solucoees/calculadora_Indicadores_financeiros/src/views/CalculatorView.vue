<script setup lang="ts">
import { computed, reactive } from 'vue'
import { vMaska } from 'maska/vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import VueApexCharts from 'vue3-apexcharts'

import { useSeo } from '@/composables/useSeo'
import { useCalculatorStore } from '@/stores/calculator'
import { useUiStore } from '@/stores/ui'
import { FIELD_META } from '@/lib/fieldMeta'
import { EXAMPLE_DATA, FIELD_IDS, type FieldId } from '@/lib/calculator'
import { parseCurrency } from '@/lib/format'
import ResultCard from '@/components/ResultCard.vue'

useSeo({
  title: 'Calculadora',
  path: '/calculadora',
  description:
    'Calcule EBITDA, ROE, ROA, P/L, EV/EBITDA, Margem de Lucro, Dividend Yield e liquidez a partir dos dados financeiros da empresa.',
  keywords: 'calculadora EBITDA, ROE, ROA, P/L, EV/EBITDA, liquidez corrente, dividend yield',
})

const store = useCalculatorStore()
const ui = useUiStore()

// Modelo do formulário: strings mascaradas.
const form = reactive<Record<FieldId, string>>(
  FIELD_IDS.reduce(
    (acc, id) => {
      acc[id] = ''
      return acc
    },
    {} as Record<FieldId, string>,
  ),
)
const errors = reactive<Partial<Record<FieldId, boolean>>>({})

const maskOptions = {
  number: { locale: 'pt-BR', fraction: 2, unsigned: false },
}

const resultsList = computed(() => store.results)
const calculatedLabel = computed(() =>
  store.calculatedAt
    ? `Calculado em ${format(store.calculatedAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`
    : '',
)

const chartSeries = computed(() => [
  {
    name: 'Valor',
    data: store.results
      .filter((r) => ['roe', 'roa', 'profitMargin', 'dividendYield'].includes(r.key))
      .map((r) => Number(r.value.toFixed(2))),
  },
])
const chartOptions = computed(() => ({
  chart: { toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
  colors: ['#3366ff'],
  dataLabels: { enabled: true, formatter: (v: number) => `${v}%` },
  xaxis: {
    categories: store.results
      .filter((r) => ['roe', 'roa', 'profitMargin', 'dividendYield'].includes(r.key))
      .map((r) => r.name),
  },
  yaxis: { labels: { formatter: (v: number) => `${v}%` } },
  tooltip: { theme: 'dark' },
}))

function toNumbers() {
  return FIELD_IDS.reduce(
    (acc, id) => {
      acc[id] = parseCurrency(form[id])
      return acc
    },
    {} as Record<FieldId, number>,
  )
}

function validate(): FieldId[] {
  const invalid: FieldId[] = []
  for (const id of FIELD_IDS) {
    const empty = !form[id]?.trim()
    const nan = Number.isNaN(parseCurrency(form[id]))
    errors[id] = empty || nan
    if (empty || nan) invalid.push(id)
  }
  return invalid
}

async function onSubmit() {
  const invalid = validate()
  if (invalid.length > 0) {
    await Swal.fire({
      icon: 'error',
      title: 'Campos obrigatórios',
      text: `Preencha corretamente ${invalid.length} campo(s) destacado(s).`,
      confirmButtonColor: '#3366ff',
    })
    return
  }

  ui.startLoading('Calculando indicadores...')
  await new Promise((r) => setTimeout(r, 350)) // feedback visual de processamento

  const result = store.compute(toNumbers())
  ui.stopLoading()

  if (!result.ok) {
    await Swal.fire({
      icon: 'error',
      title: 'Dados inválidos',
      text: result.error,
      confirmButtonColor: '#3366ff',
    })
    return
  }
  document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function loadExample() {
  for (const id of FIELD_IDS) {
    form[id] = EXAMPLE_DATA[id]
    errors[id] = false
  }
  Swal.fire({
    icon: 'success',
    title: 'Dados de exemplo carregados!',
    toast: true,
    position: 'top-end',
    timer: 2200,
    showConfirmButton: false,
  })
}

async function clearForm() {
  const res = await Swal.fire({
    icon: 'warning',
    title: 'Limpar formulário?',
    text: 'Todos os campos e resultados serão apagados.',
    showCancelButton: true,
    confirmButtonText: 'Sim, limpar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
  })
  if (!res.isConfirmed) return
  for (const id of FIELD_IDS) {
    form[id] = ''
    errors[id] = false
  }
  store.reset()
  Swal.fire({
    icon: 'success',
    title: 'Formulário limpo!',
    toast: true,
    position: 'top-end',
    timer: 1500,
    showConfirmButton: false,
  })
}

function printResults() {
  window.print()
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <!-- Descrição e orientações -->
    <section class="mb-6" aria-label="Descrição da ferramenta">
      <div
        class="relative overflow-hidden rounded-2xl bg-brand-gradient p-5 text-white shadow-glow sm:p-6"
      >
        <div
          class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        ></div>
        <div class="relative flex items-start gap-3">
          <Icon icon="mdi:information-outline" class="mt-1 flex-shrink-0 text-2xl opacity-80" />
          <div>
            <h2 class="mb-2 text-lg font-bold sm:text-xl">Sobre esta Ferramenta</h2>
            <p class="text-sm leading-relaxed opacity-90 sm:text-base">
              Analise a saúde financeira de empresas calculando os principais indicadores do
              mercado:
              <strong>EBITDA</strong>, <strong>ROE</strong>, <strong>ROA</strong>,
              <strong>P/L</strong>, <strong>EV/EBITDA</strong>, <strong>Margem de Lucro</strong>,
              <strong>Dividend Yield</strong>, <strong>Liquidez Corrente</strong> e
              <strong>Liquidez Seca</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dicas -->
    <section class="mb-6" aria-label="Dicas de uso">
      <div
        class="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20"
      >
        <div class="flex items-start gap-3">
          <Icon
            icon="mdi:lightbulb-on-outline"
            class="mt-0.5 flex-shrink-0 text-lg text-amber-500"
          />
          <div class="text-sm text-amber-800 dark:text-amber-200">
            <strong class="mb-1 block">Dicas:</strong>
            <ul class="list-inside list-disc space-y-1 text-xs sm:text-sm">
              <li>Utilize dados do Balanço Patrimonial e DRE da empresa.</li>
              <li>Passe o mouse sobre o ícone de informação de cada campo para ver a descrição.</li>
              <li>Os valores usam máscara de moeda automática (ex: 1.500.000,50).</li>
              <li>Todos os campos são obrigatórios para o cálculo completo.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulário -->
    <section aria-label="Formulário de dados financeiros">
      <form autocomplete="off" novalidate @submit.prevent="onSubmit">
        <div class="surface overflow-hidden">
          <div
            class="flex items-center justify-between border-b border-ink-200/60 bg-ink-50/60 px-4 py-4 dark:border-ink-700/60 dark:bg-ink-900/40 sm:px-6"
          >
            <div class="flex items-center gap-2">
              <Icon icon="mdi:calculator" class="text-primary-600 dark:text-primary-400" />
              <h2 class="text-base font-bold text-ink-900 dark:text-white sm:text-lg">
                Dados Financeiros
              </h2>
            </div>
            <button
              type="button"
              class="flex items-center gap-1 text-sm text-ink-500 transition-colors hover:text-red-500 dark:text-ink-400"
              @click="clearForm"
            >
              <Icon icon="mdi:eraser" />
              <span class="hidden sm:inline">Limpar</span>
            </button>
          </div>

          <div class="p-4 sm:p-6">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              <div v-for="field in FIELD_META" :key="field.id" class="relative">
                <label :for="field.id" class="form-label">
                  {{ field.label }}
                  <span class="inline-flex cursor-help items-center" :title="field.tooltip">
                    <Icon
                      icon="mdi:information-outline"
                      class="text-primary-400 hover:text-primary-600"
                    />
                  </span>
                </label>
                <div class="relative">
                  <span class="input-prefix">R$</span>
                  <input
                    :id="field.id"
                    v-model="form[field.id]"
                    v-maska="maskOptions.number"
                    type="text"
                    inputmode="decimal"
                    autocomplete="off"
                    :name="field.id"
                    :placeholder="field.placeholder"
                    :aria-describedby="`${field.id}-desc`"
                    :aria-invalid="errors[field.id] ? 'true' : 'false'"
                    class="form-input pl-10"
                    :class="{ 'input-error': errors[field.id] }"
                  />
                </div>
                <small :id="`${field.id}-desc`" class="form-hint">{{ field.hint }}</small>
              </div>
            </div>

            <div
              class="mt-6 flex flex-col gap-3 border-t border-ink-200/60 pt-6 dark:border-ink-700/60 sm:flex-row"
            >
              <button type="submit" class="btn-primary flex-1">
                <Icon icon="mdi:calculator" /> Calcular Indicadores
              </button>
              <button type="button" class="btn-accent sm:w-auto" @click="loadExample">
                <Icon icon="mdi:auto-fix" /> Exemplo
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>

    <!-- Resultados -->
    <section v-if="store.hasResults" id="results" class="mt-8" aria-label="Resultados dos cálculos">
      <div class="surface mb-6 overflow-hidden">
        <div
          class="flex items-center justify-between border-b border-ink-200/60 bg-ink-50/60 px-4 py-4 dark:border-ink-700/60 dark:bg-ink-900/40 sm:px-6"
        >
          <div class="flex items-center gap-2">
            <Icon icon="mdi:chart-box-outline" class="text-accent-600 dark:text-accent-400" />
            <h2 class="text-base font-bold text-ink-900 dark:text-white sm:text-lg">
              Resultados dos Indicadores
            </h2>
          </div>
          <span class="text-xs text-ink-500 dark:text-ink-400">{{ calculatedLabel }}</span>
        </div>
        <div class="p-4 sm:p-6">
          <!-- Legenda de status para orientar a interpretação -->
          <div class="mb-4 flex flex-wrap items-center gap-3 text-xs">
            <span class="text-ink-500 dark:text-ink-400">Legenda:</span>
            <span class="result-status status-good">Bom</span>
            <span class="text-ink-500 dark:text-ink-400">dentro do saudável</span>
            <span class="result-status status-warning">Alerta</span>
            <span class="text-ink-500 dark:text-ink-400">requer atenção</span>
            <span class="result-status status-bad">Atenção</span>
            <span class="text-ink-500 dark:text-ink-400">ponto crítico</span>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard v-for="r in resultsList" :key="r.key" :result="r" />
          </div>
          <p class="mt-4 text-xs text-ink-400 dark:text-ink-500">
            <Icon icon="mdi:information-outline" class="mr-1 inline" />
            Os status são referências gerais de mercado e não substituem a análise de um
            profissional de finanças.
          </p>
        </div>
      </div>

      <div class="surface mb-6 overflow-hidden">
        <div
          class="flex items-center gap-2 border-b border-ink-200/60 bg-ink-50/60 px-4 py-4 dark:border-ink-700/60 dark:bg-ink-900/40 sm:px-6"
        >
          <Icon icon="mdi:chart-bar" class="text-primary-600 dark:text-primary-400" />
          <h2 class="text-base font-bold text-ink-900 dark:text-white sm:text-lg">
            Gráfico Comparativo (%)
          </h2>
        </div>
        <div class="p-4 sm:p-6">
          <div class="chart-container mx-auto max-w-3xl">
            <VueApexCharts type="bar" height="320" :options="chartOptions" :series="chartSeries" />
          </div>
        </div>
      </div>

      <div class="no-print mb-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" class="btn-neutral flex-1" @click="printResults">
          <Icon icon="mdi:printer" /> Imprimir Resultados
        </button>
      </div>
    </section>
  </div>
</template>
