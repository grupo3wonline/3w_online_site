<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import Tooltip from './Tooltip.vue'
import { calcularMetragem, validarCampos } from '@/utils/calculo'
import { showInfo, showToast } from '@/utils/sweetalert'
import { useUiStore } from '@/stores/ui'
import { useCalculatorHistory } from '@/composables/useCalculatorHistory'
import type { CalculoInput, CalculoResultado } from '@/types'

const { t } = useI18n()
const ui = useUiStore()
const { history, addToHistory, removeFromHistory, clearHistory, formatDate } =
  useCalculatorHistory()

type FieldKey = keyof CalculoInput

const form = reactive<CalculoInput>({
  lanceLongo: 0,
  lanceCurto: 0,
  numeroPontos: 0,
  peDireito: 0,
})

const erros = ref<FieldKey[]>([])
const resultado = ref<CalculoResultado | null>(null)

const inputsDisabled = computed(() => resultado.value !== null)

const fields: Array<{ key: FieldKey; step?: string; min: string; icon: string }> = [
  { key: 'lanceLongo', step: '0.01', min: '0.01', icon: 'ph:arrows-out-line-horizontal-bold' },
  { key: 'lanceCurto', step: '0.01', min: '0.01', icon: 'ph:arrows-in-line-horizontal-bold' },
  { key: 'numeroPontos', min: '1', icon: 'ph:list-numbers-bold' },
  { key: 'peDireito', step: '0.01', min: '0.01', icon: 'ph:arrow-up-bold' },
]

const quickTips: FieldKey[] = ['lanceLongo', 'lanceCurto', 'peDireito']

const resultCards: Array<{
  key: keyof CalculoResultado
  unit: 'meters' | 'points'
  color: string
  icon: string
}> = [
  {
    key: 'maiorDistancia',
    unit: 'meters',
    color: 'blue',
    icon: 'ph:arrows-out-line-horizontal-bold',
  },
  {
    key: 'menorDistancia',
    unit: 'meters',
    color: 'purple',
    icon: 'ph:arrows-in-line-horizontal-bold',
  },
  { key: 'alturaMaxima', unit: 'meters', color: 'orange', icon: 'ph:arrow-up-bold' },
  { key: 'quantidadePontos', unit: 'points', color: 'accent', icon: 'ph:list-numbers-bold' },
  { key: 'metragemMinima', unit: 'meters', color: 'primary', icon: 'ph:arrow-down-bold' },
  { key: 'metragemMaxima', unit: 'meters', color: 'red', icon: 'ph:arrow-up-bold' },
]

const colorClasses: Record<string, string> = {
  blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-900 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-700/50 dark:text-blue-300',
  purple:
    'from-purple-50 to-purple-100 border-purple-200 text-purple-900 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-700/50 dark:text-purple-300',
  orange:
    'from-orange-50 to-orange-100 border-orange-200 text-orange-900 dark:from-orange-900/20 dark:to-orange-800/20 dark:border-orange-700/50 dark:text-orange-300',
  accent:
    'from-accent-50 to-accent-100 border-accent-200 text-accent-900 dark:from-accent-900/20 dark:to-accent-800/20 dark:border-accent-700/50 dark:text-accent-300',
  primary:
    'from-primary-50 to-primary-100 border-primary-200 text-primary-900 dark:from-primary-900/20 dark:to-primary-800/20 dark:border-primary-700/50 dark:text-primary-300',
  red: 'from-red-50 to-red-100 border-red-200 text-red-900 dark:from-red-900/20 dark:to-red-800/20 dark:border-red-700/50 dark:text-red-300',
}

function ajuda(field: FieldKey): void {
  showInfo(t(`calculator.fields.${field}`), t(`calculator.help.${field}`))
}

function calcular(): void {
  erros.value = validarCampos(form)
  if (erros.value.length > 0) {
    resultado.value = null
    return
  }
  ui.startLoading(t('common.loading'))
  window.setTimeout(() => {
    resultado.value = calcularMetragem(form)
    addToHistory({ ...form, ...resultado.value })
    ui.stopLoading()
  }, 250)
}

function limpar(): void {
  form.lanceLongo = 0
  form.lanceCurto = 0
  form.numeroPontos = 0
  form.peDireito = 0
  resultado.value = null
  erros.value = []
}

async function copiarResultados(): Promise<void> {
  if (!resultado.value) return
  const r = resultado.value
  const texto = [
    'Resultados do Cálculo de Metragem de Cabos:',
    `Maior Distância: ${r.maiorDistancia} m`,
    `Menor Distância: ${r.menorDistancia} m`,
    `Altura Máxima: ${r.alturaMaxima} m`,
    `Quantidade de Pontos: ${r.quantidadePontos}`,
    `Metragem Mínima: ${r.metragemMinima} m`,
    `Metragem Máxima: ${r.metragemMaxima} m`,
  ].join('\n')

  try {
    await navigator.clipboard.writeText(texto)
    showToast(t('calculator.copySuccess'), 'success')
  } catch {
    showToast(t('calculator.copyError'), 'error')
  }
}
</script>

<template>
  <div class="relative overflow-hidden bg-gray-50 py-12 dark:bg-gray-950">
    <div class="absolute inset-0 bg-grid opacity-40" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Cabeçalho -->
      <div class="mb-10 text-center">
        <h1
          class="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-5xl"
        >
          {{ t('calculator.title') }}
          <span class="text-gradient">{{ t('calculator.titleHighlight') }}</span>
        </h1>
        <p class="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          {{ t('calculator.subtitle') }}
        </p>

        <div
          class="mx-auto mt-8 flex max-w-4xl items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left dark:border-amber-700/50 dark:bg-amber-900/20"
        >
          <Icon
            icon="ph:warning-bold"
            class="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-600 dark:text-amber-500"
            aria-hidden="true"
          />
          <div>
            <p class="font-medium text-amber-800 dark:text-amber-300">
              {{ t('calculator.importantTitle') }}
            </p>
            <p class="mt-1 text-sm text-amber-700 dark:text-amber-200">
              {{ t('calculator.importantText') }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <!-- Coluna dicas + histórico -->
        <aside class="space-y-6">
          <div class="card p-6">
            <div
              class="rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-6 dark:from-primary-900/20 dark:to-accent-900/20"
            >
              <h2
                class="flex items-center gap-2 font-display text-lg font-semibold text-gray-900 dark:text-white"
              >
                <Icon
                  icon="ph:lightbulb-bold"
                  class="h-5 w-5 text-primary-600"
                  aria-hidden="true"
                />
                {{ t('calculator.tipsTitle') }}
              </h2>
              <ul class="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li v-for="tip in quickTips" :key="tip" class="flex items-start gap-3">
                  <span
                    class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500"
                    aria-hidden="true"
                  ></span>
                  <span>{{ t(`calculator.quickTips.${tip}`) }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Histórico -->
          <div v-if="history.length" class="card p-6">
            <div class="mb-4 flex items-center justify-between">
              <h2
                class="flex items-center gap-2 font-display text-lg font-semibold text-gray-900 dark:text-white"
              >
                <Icon
                  icon="ph:clock-counter-clockwise-bold"
                  class="h-5 w-5 text-primary-600"
                  aria-hidden="true"
                />
                {{ t('calculator.historyTitle') }}
              </h2>
              <button
                type="button"
                class="inline-flex items-center gap-1 text-xs font-medium text-red-600 transition-colors hover:text-red-700"
                @click="clearHistory"
              >
                <Icon icon="ph:trash-bold" class="h-4 w-4" aria-hidden="true" />
                {{ t('calculator.historyClear') }}
              </button>
            </div>
            <ul class="space-y-2">
              <li
                v-for="item in history"
                :key="item.id"
                class="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm dark:bg-gray-800"
              >
                <div class="min-w-0">
                  <p class="truncate font-medium text-gray-900 dark:text-gray-100">
                    {{ item.metragemMinima }}m – {{ item.metragemMaxima }}m
                    <span class="text-gray-500 dark:text-gray-400"
                      >({{ item.quantidadePontos }} pts)</span
                    >
                  </p>
                  <p class="text-xs text-gray-400">{{ formatDate(item.timestamp) }}</p>
                </div>
                <button
                  type="button"
                  class="flex-shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-red-600 dark:hover:bg-gray-700"
                  :aria-label="t('calculator.historyRemove')"
                  @click="removeFromHistory(item.id)"
                >
                  <Icon icon="ph:x-bold" class="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Coluna formulário -->
        <div class="card overflow-hidden">
          <div
            class="relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-5"
          >
            <div class="absolute inset-0 bg-grid opacity-20" aria-hidden="true"></div>
            <h2 class="relative flex items-center gap-2 font-display text-xl font-bold text-white">
              <Icon icon="ph:sliders-bold" class="h-6 w-6" aria-hidden="true" />
              {{ t('calculator.formTitle') }}
            </h2>
            <p class="relative mt-1 text-sm text-primary-50">{{ t('calculator.formSubtitle') }}</p>
          </div>

          <div class="p-6">
            <form autocomplete="off" class="space-y-5" @submit.prevent="calcular">
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div v-for="field in fields" :key="field.key" class="space-y-1.5">
                  <div class="flex items-center justify-between">
                    <label
                      :for="field.key"
                      class="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      <Icon
                        :icon="field.icon"
                        class="h-4 w-4 text-primary-500"
                        aria-hidden="true"
                      />
                      {{ t(`calculator.fields.${field.key}`) }}
                    </label>
                    <Tooltip :text="t('common.help')" position="left">
                      <button
                        type="button"
                        class="text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
                        :aria-label="`${t('common.help')}: ${t(`calculator.fields.${field.key}`)}`"
                        @click="ajuda(field.key)"
                      >
                        <Icon icon="ph:question-bold" class="h-4 w-4" aria-hidden="true" />
                      </button>
                    </Tooltip>
                  </div>
                  <input
                    :id="field.key"
                    v-model.number="form[field.key]"
                    type="number"
                    :step="field.step"
                    :min="field.min"
                    autocomplete="off"
                    inputmode="decimal"
                    :disabled="inputsDisabled"
                    :placeholder="t(`calculator.placeholders.${field.key}`)"
                    required
                    class="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 transition-colors focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
                  />
                </div>
              </div>

              <div class="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  :disabled="inputsDisabled"
                  class="btn-primary flex-1 !py-3.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Icon icon="ph:calculator-bold" class="h-5 w-5" aria-hidden="true" />
                  {{ t('calculator.calcBtn') }}
                </button>
                <button type="button" class="btn-secondary flex-1 !py-3.5" @click="limpar">
                  <Icon icon="ph:eraser-bold" class="h-5 w-5" aria-hidden="true" />
                  {{ t('calculator.clearBtn') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Erros -->
      <div
        v-if="erros.length"
        class="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-700/50 dark:bg-red-900/20"
        role="alert"
      >
        <div class="flex items-start gap-3">
          <Icon
            icon="ph:x-circle-bold"
            class="mt-0.5 h-6 w-6 flex-shrink-0 text-red-600"
            aria-hidden="true"
          />
          <div>
            <h3 class="mb-2 font-medium text-red-800 dark:text-red-300">
              {{ t('calculator.errorsTitle') }}
            </h3>
            <ul class="space-y-1">
              <li
                v-for="erro in erros"
                :key="erro"
                class="flex items-center gap-2 text-sm text-red-700 dark:text-red-400"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true"></span>
                {{ t(`calculator.errors.${erro}`) }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Resultados -->
      <div v-if="resultado" v-motion-slide-bottom class="mt-10">
        <div class="card overflow-hidden">
          <div
            class="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-5"
          >
            <div class="absolute inset-0 bg-grid opacity-20" aria-hidden="true"></div>
            <h2 class="relative flex items-center gap-2 font-display text-xl font-bold text-white">
              <Icon icon="ph:check-circle-bold" class="h-6 w-6" aria-hidden="true" />
              {{ t('calculator.resultsTitle') }}
            </h2>
            <p class="relative mt-1 text-sm text-primary-50">
              {{ t('calculator.resultsSubtitle') }}
            </p>
          </div>

          <div class="p-6">
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="card in resultCards"
                :key="card.key"
                class="rounded-xl border bg-gradient-to-br p-5"
                :class="colorClasses[card.color]"
              >
                <div class="mb-2 flex items-center justify-between">
                  <h3 class="text-xs font-semibold uppercase tracking-wide opacity-80">
                    {{ t(`calculator.results.${card.key}`) }}
                  </h3>
                  <Icon :icon="card.icon" class="h-5 w-5 opacity-70" aria-hidden="true" />
                </div>
                <p class="font-display text-3xl font-bold">
                  {{ resultado[card.key] }}
                  <span class="text-lg opacity-70">{{ t(`calculator.units.${card.unit}`) }}</span>
                </p>
              </div>
            </div>

            <div class="mt-8 flex justify-center">
              <button type="button" class="btn-primary !px-8 !py-3.5" @click="copiarResultados">
                <Icon icon="ph:copy-bold" class="h-5 w-5" aria-hidden="true" />
                {{ t('calculator.copyBtn') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
