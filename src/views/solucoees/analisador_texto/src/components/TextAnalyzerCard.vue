<template>
  <div class="card p-5 md:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 gap-2">
      <h2 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
        <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-file-lines text-primary-600 dark:text-primary-400 text-sm" aria-hidden="true"></i>
        </div>
        {{ title }}
      </h2>
      <div class="flex items-center gap-1.5">
        <button
          class="btn-ghost text-xs px-2.5 py-1.5 rounded-lg"
          :title="`Enviar arquivo .txt para o ${title}`"
          :aria-label="`Enviar arquivo de texto para o ${title}`"
          @click="triggerFileUpload"
        >
          <i class="fa-solid fa-file-arrow-up" aria-hidden="true"></i>
          <span class="hidden sm:inline ml-1">{{ t('tool.upload') }}</span>
        </button>
        <button
          class="btn-ghost text-xs px-2.5 py-1.5 rounded-lg"
          :title="`Copiar conteúdo do ${title}`"
          :aria-label="`Copiar conteúdo do ${title}`"
          @click="$emit('copy')"
        >
          <i class="fa-solid fa-copy" aria-hidden="true"></i>
          <span class="hidden sm:inline ml-1">{{ t('tool.copy') }}</span>
        </button>
        <button
          class="btn-ghost text-xs px-2.5 py-1.5 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          :title="`Limpar ${title}`"
          :aria-label="`Limpar ${title}`"
          @click="$emit('clear')"
        >
          <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
          <span class="hidden sm:inline ml-1">{{ t('tool.clear') }}</span>
        </button>
      </div>
    </div>

    <!-- Textarea -->
    <div class="mb-4">
      <label :for="textareaId" class="sr-only">{{ `Campo de entrada do ${title}` }}</label>
      <textarea
        :id="textareaId"
        :value="text"
        :placeholder="t('tool.placeholder')"
        class="input-field min-h-[180px] md:min-h-[220px] resize-y font-mono text-sm leading-relaxed"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="true"
        @input="$emit('update:text', ($event.target as HTMLTextAreaElement).value)"
      ></textarea>
      <div class="flex items-center justify-between mt-2 gap-2">
        <p class="text-xs text-slate-400 dark:text-slate-500">
          <i class="fa-solid fa-circle-info mr-1" aria-hidden="true"></i>
          Aceita texto digitado, colado ou importado (.txt)
        </p>
        <span class="text-xs text-slate-400 dark:text-slate-500 font-mono whitespace-nowrap">
          {{ text.length.toLocaleString('pt-BR') }} {{ t('tool.chars') }}
        </span>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="mb-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-600/50"
    >
      <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
        <i class="fa-solid fa-filter text-primary-500 text-xs" aria-hidden="true"></i> {{ t('tool.filters') }}
        <TooltipIcon text="Filtros permitem ignorar certos caracteres na contagem total" />
      </h3>
      <div class="flex flex-wrap gap-x-5 gap-y-3">
        <label
          v-for="f in filterOptions"
          :key="f.key"
          class="flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-slate-300 select-none"
        >
          <input
            type="checkbox"
            :checked="filters[f.key]"
            class="w-4 h-4 rounded border-slate-300 dark:border-slate-500 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
            @change="updateFilter(f.key, ($event.target as HTMLInputElement).checked)"
          />
          {{ f.label }}
        </label>
      </div>
    </div>

    <!-- Analyze Button -->
    <button class="btn-primary w-full py-3.5" @click="$emit('analyze')">
      <i class="fa-solid fa-magnifying-glass-chart" aria-hidden="true"></i> {{ t('tool.analyze') }} {{ title }}
    </button>

    <!-- Results -->
    <transition name="results">
      <div
        v-if="analysis"
        class="mt-5 p-4 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10 rounded-xl border border-primary-100 dark:border-primary-800/50"
      >
        <h3 class="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-4 flex items-center gap-2">
          <i class="fa-solid fa-chart-pie" aria-hidden="true"></i> {{ t('tool.resultsTitle') }}
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div v-for="metric in metrics" :key="metric.key" class="stat-card">
            <p class="stat-value">{{ formatMetric(metric.key) }}</p>
            <p class="stat-label">{{ metric.label }}</p>
          </div>
        </div>
      </div>
    </transition>

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      accept=".txt,text/plain"
      class="hidden"
      aria-hidden="true"
      tabindex="-1"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TooltipIcon from '@/components/TooltipIcon.vue'
import type { TextAnalysis, TextFilters } from '@/lib/text/types'

const props = defineProps<{
  title: string
  text: string
  filters: TextFilters
  analysis: TextAnalysis | null
}>()

const emit = defineEmits<{
  'update:text': [value: string]
  'update:filters': [value: TextFilters]
  analyze: []
  'file-upload': [file: File]
  copy: []
  clear: []
}>()

const { t } = useI18n()
const fileInput = ref<HTMLInputElement | null>(null)
const textareaId = `text-input-${Math.random().toString(36).slice(2, 8)}`

const filterOptions = computed(() => [
  { key: 'ignoreSpaces' as const, label: t('tool.ignoreSpaces') },
  { key: 'ignorePunctuation' as const, label: t('tool.ignorePunctuation') },
  { key: 'ignoreNumbers' as const, label: t('tool.ignoreNumbers') }
])

const metrics = computed(() => [
  { key: 'characters' as const, label: t('metrics.characters') },
  { key: 'words' as const, label: t('metrics.words') },
  { key: 'sentences' as const, label: t('metrics.sentences') },
  { key: 'paragraphs' as const, label: t('metrics.paragraphs') },
  { key: 'lines' as const, label: t('metrics.lines') },
  { key: 'readingTimeMinutes' as const, label: t('metrics.readingTime') }
])

function formatMetric(key: keyof TextAnalysis): string {
  if (!props.analysis) return '0'
  const value = props.analysis[key]
  if (key === 'readingTimeMinutes') return `${value} ${t('metrics.minutes')}`
  return value.toLocaleString('pt-BR')
}

function updateFilter(key: keyof TextFilters, value: boolean) {
  emit('update:filters', { ...props.filters, [key]: value })
}

function triggerFileUpload() {
  fileInput.value?.click()
}

function handleFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) emit('file-upload', file)
  input.value = ''
}
</script>

<style scoped>
.results-enter-active,
.results-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.results-enter-from,
.results-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
