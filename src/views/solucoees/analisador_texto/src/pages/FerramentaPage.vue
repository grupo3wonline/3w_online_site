<template>
  <div class="bg-slate-50 dark:bg-slate-900 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <Breadcrumb :items="[{ label: t('nav.tool') }]" />

      <!-- Page Header -->
      <div v-motion-fade class="text-center mb-8">
        <h1 class="section-title mb-3">
          <i class="fa-solid fa-chart-bar text-primary-600 mr-2" aria-hidden="true"></i>{{ t('tool.title') }}
        </h1>
        <p class="section-subtitle">{{ t('tool.subtitle') }}</p>
        <div class="flex flex-wrap items-center justify-center gap-4 mt-4">
          <span class="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <i class="fa-solid fa-shield-halved text-green-500" aria-hidden="true"></i>
            {{ t('tool.localBadge') }}
          </span>
          <span class="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <i class="fa-solid fa-bolt text-amber-500" aria-hidden="true"></i>
            {{ t('tool.instantBadge') }}
          </span>
        </div>
      </div>

      <!-- Instructions -->
      <div
        class="card p-4 mb-6 bg-primary-50/50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-800/50"
      >
        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          >
            <i class="fa-solid fa-lightbulb text-primary-600 dark:text-primary-400 text-sm" aria-hidden="true"></i>
          </div>
          <div>
            <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Como usar:</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              1. Digite, cole ou importe um arquivo .txt. 2. Configure os filtros se necessário. 3. Clique em
              "Analisar" para ver as métricas. 4. Para comparar, preencha ambos e clique em "Comparar Textos".
            </p>
          </div>
        </div>
      </div>

      <!-- Analyzers -->
      <div class="grid lg:grid-cols-2 gap-6 mb-8">
        <TextAnalyzerCard
          v-model:text="textA"
          v-model:filters="filtersA"
          title="Texto A"
          :analysis="analysisA"
          @analyze="analyze('A')"
          @file-upload="handleFileUpload($event, 'A')"
          @copy="copyText('A')"
          @clear="clearText('A')"
        />
        <TextAnalyzerCard
          v-model:text="textB"
          v-model:filters="filtersB"
          title="Texto B"
          :analysis="analysisB"
          @analyze="analyze('B')"
          @file-upload="handleFileUpload($event, 'B')"
          @copy="copyText('B')"
          @clear="clearText('B')"
        />
      </div>

      <!-- Compare -->
      <div class="flex justify-center mb-8">
        <button class="btn-primary text-lg px-10 py-4 shadow-lg" @click="compare()">
          <i class="fa-solid fa-code-compare" aria-hidden="true"></i> {{ t('tool.compare') }}
        </button>
      </div>

      <!-- Comparison Results -->
      <transition name="results">
        <ComparisonResults v-if="showComparison && comparison" :comparison="comparison" />
      </transition>

      <!-- Busca de termos (fuzzy) -->
      <div class="mt-8 card p-5 md:p-6">
        <h2 class="font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
          <i class="fa-solid fa-magnifying-glass text-primary-500" aria-hidden="true"></i>
          {{ t('tool.searchTitle') }}
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">{{ t('tool.searchHint') }}</p>

        <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex items-center gap-2 shrink-0">
            <label for="search-target" class="text-sm text-slate-600 dark:text-slate-300">
              {{ t('tool.searchInText') }}
            </label>
            <select
              id="search-target"
              v-model="searchTarget"
              class="input-field py-2 w-auto"
              autocomplete="off"
            >
              <option value="A">Texto A</option>
              <option value="B">Texto B</option>
            </select>
          </div>
          <div class="relative flex-1">
            <i
              class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
              aria-hidden="true"
            ></i>
            <input
              v-model="searchQuery"
              type="search"
              :placeholder="t('tool.searchPlaceholder')"
              class="input-field pl-9"
              autocomplete="off"
              :aria-label="t('tool.searchTitle')"
            />
          </div>
        </div>

        <div v-if="searchQuery.trim()" class="mt-4">
          <p v-if="searchResults.length === 0" class="text-sm text-slate-500 dark:text-slate-400">
            <i class="fa-solid fa-circle-info mr-1" aria-hidden="true"></i>{{ t('tool.searchNoResults') }}
          </p>
          <div v-else>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">
              {{ searchResults.length }} {{ t('tool.searchResultsCount') }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(match, i) in searchResults"
                :key="`${match.index}-${i}`"
                class="badge badge-primary"
                :title="`Posição da palavra: ${match.index + 1}`"
              >
                {{ match.word }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips -->
      <div class="mt-12 card p-6">
        <h2 class="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <i class="fa-solid fa-lightbulb text-amber-500" aria-hidden="true"></i> Dicas para Melhor Análise
        </h2>
        <ul class="grid sm:grid-cols-2 gap-3">
          <li
            v-for="(tip, i) in tips"
            :key="i"
            class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
          >
            <i class="fa-solid fa-circle-check text-green-500 mt-0.5 shrink-0" aria-hidden="true"></i>
            {{ tip }}
          </li>
        </ul>
      </div>

      <!-- Developer CTA -->
      <div class="mt-12 text-center">
        <div class="card p-8 md:p-10 border-2 border-primary-100 dark:border-primary-900/50">
          <h2 class="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-3">
            Precisa de uma solução personalizada?
          </h2>
          <p class="text-slate-600 dark:text-slate-300 mb-6 max-w-lg mx-auto">
            O <strong>Grupo 3W Online</strong> desenvolve ferramentas, sites e sistemas sob medida para sua empresa.
            Da ideia ao produto final com qualidade e performance.
          </p>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary px-8 py-3"
          >
            <i class="fa-solid fa-globe" aria-hidden="true"></i> Fale com a 3W Online
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Breadcrumb from '@/components/Breadcrumb.vue'
import TextAnalyzerCard from '@/components/TextAnalyzerCard.vue'
import ComparisonResults from '@/components/ComparisonResults.vue'
import { useTextAnalyzer } from '@/composables/useTextAnalyzer'

const { t } = useI18n()
const {
  textA,
  textB,
  filtersA,
  filtersB,
  analysisA,
  analysisB,
  comparison,
  showComparison,
  searchQuery,
  searchTarget,
  searchResults,
  analyze,
  compare,
  handleFileUpload,
  copyText,
  clearText
} = useTextAnalyzer()

const tips = [
  'Use filtros para ignorar espaços, pontuação ou números conforme a necessidade.',
  'Faça upload de arquivos .txt para analisar textos longos sem copiar e colar.',
  'Compare duas versões de um texto para verificar diferenças após edições.',
  'Resultados são calculados instantaneamente e com total privacidade.',
  'Para SEO, verifique títulos (50-60 chars) e meta descriptions (150-160 chars).',
  'A ferramenta funciona offline após o primeiro carregamento da página.'
]
</script>

<style scoped>
.results-enter-active,
.results-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.results-enter-from,
.results-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
