<template>
  <div class="card p-5 md:p-6 animate-slide-up">
    <!-- Header -->
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2 mb-3">
        <i class="fa-solid fa-code-compare text-primary-600" aria-hidden="true"></i> Resultado da Comparação
      </h3>
      <span v-if="comparison.identical" class="badge badge-success px-4 py-1.5 text-sm">
        <i class="fa-solid fa-equals mr-1.5" aria-hidden="true"></i> Textos idênticos
      </span>
      <span v-else class="badge badge-warning px-4 py-1.5 text-sm">
        <i class="fa-solid fa-not-equal mr-1.5" aria-hidden="true"></i> Textos diferentes
      </span>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table class="w-full text-sm">
        <caption class="sr-only">Comparação de métricas entre o Texto A e o Texto B</caption>
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-700/50">
            <th scope="col" class="text-left py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-200">Métrica</th>
            <th scope="col" class="text-center py-3.5 px-4 font-semibold text-primary-700 dark:text-primary-400">Texto A</th>
            <th scope="col" class="text-center py-3.5 px-4 font-semibold text-primary-700 dark:text-primary-400">Texto B</th>
            <th scope="col" class="text-center py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-200">Diferença</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
          <tr
            v-for="row in rows"
            :key="row.key"
            class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <td class="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-200">
              <i :class="row.icon" class="mr-2 text-slate-400 text-xs" aria-hidden="true"></i>{{ row.label }}
            </td>
            <td class="text-center py-3.5 px-4">
              <span class="inline-flex items-center justify-center min-w-[40px] badge badge-primary">
                {{ comparison.metrics[row.key].a.toLocaleString('pt-BR') }}
              </span>
            </td>
            <td class="text-center py-3.5 px-4">
              <span class="inline-flex items-center justify-center min-w-[40px] badge badge-primary">
                {{ comparison.metrics[row.key].b.toLocaleString('pt-BR') }}
              </span>
            </td>
            <td class="text-center py-3.5 px-4">
              <span :class="diffClass(row.key)" class="inline-flex items-center gap-1">
                <i :class="diffIcon(row.key)" class="text-[10px]" aria-hidden="true"></i>
                {{ diffText(row.key) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Interpretation -->
    <div class="mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-600/50">
      <h4 class="font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2 text-sm">
        <i class="fa-solid fa-circle-info text-primary-500" aria-hidden="true"></i> Como interpretar
      </h4>
      <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {{
          comparison.identical
            ? 'Os textos são idênticos em todas as métricas analisadas.'
            : 'Valores positivos (+) indicam que o Texto A possui mais elementos que o Texto B. Valores negativos (-) indicam que o Texto B possui mais. A porcentagem mostra a proporção da diferença.'
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ComparisonResult, MetricKey } from '@/lib/text/types'

const props = defineProps<{ comparison: ComparisonResult }>()
const { t } = useI18n()

const rows: { key: MetricKey; label: string; icon: string }[] = [
  { key: 'characters', label: t('metrics.characters'), icon: 'fa-solid fa-font' },
  { key: 'charactersNoSpaces', label: t('metrics.charactersNoSpaces'), icon: 'fa-solid fa-text-width' },
  { key: 'words', label: t('metrics.words'), icon: 'fa-solid fa-spell-check' },
  { key: 'sentences', label: t('metrics.sentences'), icon: 'fa-solid fa-align-left' },
  { key: 'paragraphs', label: t('metrics.paragraphs'), icon: 'fa-solid fa-paragraph' },
  { key: 'lines', label: t('metrics.lines'), icon: 'fa-solid fa-list' }
]

function diffText(key: MetricKey): string {
  const m = props.comparison.metrics[key]
  if (m.diff === 0) return 'Igual'
  const sign = m.diff > 0 ? '+' : ''
  return `${sign}${m.diff.toLocaleString('pt-BR')} (${sign}${m.pct}%)`
}

function diffClass(key: MetricKey): string {
  const dir = props.comparison.metrics[key].direction
  if (dir === 'equal') return 'badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
  return dir === 'up' ? 'badge badge-success' : 'badge badge-danger'
}

function diffIcon(key: MetricKey): string {
  const dir = props.comparison.metrics[key].direction
  if (dir === 'equal') return 'fa-solid fa-equals'
  return dir === 'up' ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'
}
</script>
