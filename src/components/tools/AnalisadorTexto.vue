<template>
  <ToolShell
    title="Analisador de Texto"
    description="Analise palavras, caracteres, frases, parágrafos, tempo de leitura e fala em tempo real."
    icon="fa-align-left"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['Processamento local', '~200 palavras/min de leitura', '8 métricas instantâneas']"
    :tips="[
      { title: 'Tempo de leitura', text: 'Calculado com base em ~200 palavras por minuto, velocidade média de leitura de um adulto.' },
      { title: 'Tempo de fala', text: 'Usa ~150 palavras por minuto, ritmo padrão para apresentações e podcasts.', type: 'info' },
      { title: 'Privacidade', text: 'O texto é processado 100% localmente no navegador. Nenhum dado é enviado a servidores externos.', type: 'success' },
    ]"
    :examples="[
      { title: 'Post para blog', desc: '800 palavras, 5 parágrafos, 50 frases', result: '~4 min de leitura, ~5 min de fala' },
      { title: 'E-mail corporativo', desc: '150 palavras, 3 parágrafos', result: '~1 min de leitura, ~1 min de fala' },
      { title: 'Artigo técnico longo', desc: '2.000 palavras, 10 parágrafos', result: '~10 min de leitura, ~13 min de fala' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Input -->
      <div class="tool-body !mb-0 space-y-3">
        <label class="input-aurora-label">
          <i class="fas fa-keyboard mr-1.5 text-indigo-500"></i>
          Texto para análise
        </label>
        <textarea
          v-model="texto"
          @input="analisar"
          rows="12"
          class="input-aurora w-full resize-y"
          placeholder="Cole ou digite seu texto aqui para análise em tempo real..."
        ></textarea>
        <BaseButton variant="danger" icon="fa-trash" @click="limpar" fullWidth>
          Limpar texto
        </BaseButton>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="texto" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Total de palavras</p>
              <p class="text-5xl font-black text-white mb-2">{{ stats.palavras }}</p>
              <p class="text-indigo-300 text-sm font-semibold">
                <i class="fas fa-clock mr-1"></i>
                ~{{ stats.tempoLeitura }} min de leitura
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <span class="metric-glass-value text-blue-600 dark:text-blue-400">{{ stats.caracteres }}</span>
                <span class="metric-glass-label">Caracteres</span>
              </div>
              <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
                <span class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ stats.caracteresSemEspacos }}</span>
                <span class="metric-glass-label">Sem espaços</span>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <span class="metric-glass-value text-purple-600 dark:text-purple-400">{{ stats.frases }}</span>
                <span class="metric-glass-label">Frases</span>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <span class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ stats.paragrafos }}</span>
                <span class="metric-glass-label">Parágrafos</span>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <span class="metric-glass-value text-orange-600 dark:text-orange-400">{{ stats.linhas }}</span>
                <span class="metric-glass-label">Linhas</span>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <span class="metric-glass-value text-teal-600 dark:text-teal-400">{{ stats.tempoFala }}</span>
                <span class="metric-glass-label">min de fala</span>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-indigo-500"></i>
                Resumo
              </h4>
              <div class="space-y-1.5 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Palavras únicas</span>
                  <span class="font-bold text-gray-900 dark:text-white">~{{ uniqueWords }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Média palavras/frase</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ avgWordsPerSentence }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Média palavras/parágrafo</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ avgWordsPerPara }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-microphone text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Fala estimada: <strong>{{ stats.tempoFala }} min</strong> para <strong>{{ stats.palavras }}</strong> palavras a 150 ppm.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!texto" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-align-left text-4xl mb-3 opacity-30 block text-indigo-400"></i>
          <p class="text-sm">Cole ou digite seu texto para ver a análise instantânea</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, reactive, computed } from 'vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const texto = ref('')
const stats = reactive({
  caracteres: 0,
  caracteresSemEspacos: 0,
  palavras: 0,
  linhas: 0,
  paragrafos: 0,
  frases: 0,
  tempoLeitura: 0,
  tempoFala: 0,
})

const uniqueWords = computed(() => {
  if (!texto.value) return 0
  const words = texto.value.toLowerCase().trim().split(/\s+/).filter(p => p.length > 0)
  return new Set(words).size
})

const avgWordsPerSentence = computed(() => {
  if (!stats.frases) return 0
  return Math.round(stats.palavras / stats.frases)
})

const avgWordsPerPara = computed(() => {
  if (!stats.paragrafos) return 0
  return Math.round(stats.palavras / stats.paragrafos)
})

const analisar = () => {
  if (!texto.value) {
    Object.keys(stats).forEach((key) => (stats[key] = 0))
    return
  }

  stats.caracteres = texto.value.length
  stats.caracteresSemEspacos = texto.value.replace(/\s/g, '').length
  stats.palavras = texto.value.trim().split(/\s+/).filter((p) => p.length > 0).length
  stats.linhas = texto.value.split('\n').length
  stats.paragrafos = texto.value.split(/\n\n+/).filter((p) => p.trim().length > 0).length
  stats.frases = texto.value.split(/[.!?]+/).filter((f) => f.trim().length > 0).length
  stats.tempoLeitura = Math.ceil(stats.palavras / 200)
  stats.tempoFala = Math.ceil(stats.palavras / 150)
}

const limpar = () => {
  texto.value = ''
  analisar()
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
