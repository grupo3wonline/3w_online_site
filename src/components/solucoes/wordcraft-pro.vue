<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type Mode = 'write' | 'improve' | 'tips'

const mode = ref<Mode>('write')
const text = ref('')
const genre = ref('narrativo')
const copied = ref(false)

const genres = [
  { value: 'narrativo', label: 'Narrativo / Conto', icon: 'mdi:book-open-page-variant-outline' },
  { value: 'poesia', label: 'Poesia / Lírico', icon: 'mdi:feather' },
  { value: 'cronica', label: 'Crônica', icon: 'mdi:pencil-outline' },
  { value: 'roteiro', label: 'Roteiro / Diálogo', icon: 'mdi:script-text-outline' },
  { value: 'artigo', label: 'Artigo / Blog', icon: 'mdi:newspaper-variant-outline' },
]

const stats = computed(() => {
  const t = text.value
  const words = t.trim() ? t.trim().split(/\s+/).length : 0
  const chars = t.length
  const sentences = t.trim() ? (t.match(/[.!?]+/g) ?? []).length || (t.trim().length > 0 ? 1 : 0) : 0
  const paragraphs = t.trim() ? t.split(/\n\s*\n/).filter(p => p.trim()).length : 0
  const readMin = words > 0 ? Math.ceil(words / 200) : 0
  return { words, chars, sentences, paragraphs, readMin }
})

const writingTips: Record<string, string[]> = {
  narrativo: [
    'Comece in medias res — no meio da ação, não no começo',
    'Mostre, não conte: use cenas vívidas ao invés de descrever sentimentos',
    'Cada personagem deve ter desejo + obstáculo + mudança',
    'Use o ponto de vista de forma consistente',
    'Revise os diálogos: cada fala deve revelar caráter ou avançar o plot',
    'O final deve ser inevitável mas surpreendente',
  ],
  poesia: [
    'Prefira imagens concretas a abstrações',
    'Experimente com ritmo, mas não sacrifique a imagem por rima',
    'Cada palavra precisa ganhar seu lugar — corte o supérfluo',
    'Trabalhe com sonoridade: aliteração, assonância, ritmo',
    'Uma boa metáfora vale mais que mil adjetivos',
    'Leia em voz alta — o poema é feito para ser ouvido',
  ],
  cronica: [
    'Parta de um detalhe cotidiano e encontre o universal',
    'Tom é tudo: humor, melancolia, ironia — mantenha consistência',
    'Seja breve: crônicas pedem concisão e punch final',
    'Personagens vivos emergem de observações do dia a dia',
    'O leitor se identifica com o conflito interno, não o externo',
  ],
  roteiro: [
    'Formato importa: siga as convenções de formatação de roteiro',
    'Cada cena tem entrada, desenvolvimento e saída',
    'Diálogos revelam conflito submerso — evite on-the-nose',
    'Ação visual: mostre estado emocional por comportamento físico',
    'Economize nas didascálias — confie no ator e diretor',
  ],
  artigo: [
    'A primeira frase deve fisgar — use dado, pergunta ou declaração ousada',
    'Estruture com H2/H3 claros para leitura por escaneamento',
    'Uma ideia por parágrafo; termine com transição para o próximo',
    'Cite fontes e dados confiáveis para ganhar autoridade',
    'Termine com chamada para ação ou reflexão memorável',
  ],
}

const currentTips = computed(() => writingTips[genre.value] ?? writingTips.narrativo)

const improveSuggestions = computed((): string[] => {
  const t = text.value
  const suggestions: string[] = []
  if (!t.trim()) return suggestions
  if (stats.value.words < 50) suggestions.push('💡 Texto muito curto — desenvolva mais as ideias antes de revisar')
  if ((t.match(/\b(muito|bastante|extremamente|super)\b/gi) ?? []).length > 2) suggestions.push('✂️ Reduza advérbios de intensidade (muito, bastante, super) — eles enfraquecem o texto')
  if ((t.match(/\b(coisa|negócio|troço|algo)\b/gi) ?? []).length > 1) suggestions.push('🎯 Substitua palavras vagas ("coisa", "negócio") por termos específicos')
  if (!t.includes('\n')) suggestions.push('📄 Considere dividir em parágrafos para melhorar a leitura')
  if (stats.value.sentences > 0 && stats.value.words / stats.value.sentences > 30) suggestions.push('✂️ Algumas frases parecem longas — considere quebrá-las')
  if ((t.match(/\b(foi|era|estava|ficou)\b/gi) ?? []).length > 5) suggestions.push('⚡ Prefira verbos ativos — verbos de estado enfraquecem a narrativa')
  if (suggestions.length === 0) suggestions.push('✅ O texto parece bem estruturado! Continue revisando com atenção ao ritmo e à voz.')
  return suggestions
})

async function copyText() {
  if (!text.value.trim()) return
  await navigator.clipboard.writeText(text.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function downloadText() {
  if (!text.value.trim()) return
  const blob = new Blob([text.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `wordcraft-${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
  Swal.fire({ icon: 'success', title: 'Texto salvo!', timer: 1200, showConfirmButton: false })
}
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:feather" class="text-purple-400 w-7 h-7" />
        WordCraft Pro
      </h1>
      <p class="text-blue-300/70 text-sm">Assistente de escrita criativa</p>
    </div>

    <!-- Genre Selector -->
    <div class="flex gap-2 overflow-x-auto pb-1 mb-4">
      <button
        v-for="g in genres" :key="g.value"
        @click="genre = g.value"
        :class="genre === g.value ? 'bg-purple-600 text-white border-purple-500' : 'border-white/20 text-blue-300 hover:border-purple-400'"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0"
      >
        <Icon :icon="g.icon" class="w-3.5 h-3.5" />
        {{ g.label }}
      </button>
    </div>

    <!-- Mode Tabs -->
    <div class="flex gap-1 bg-[#111d3a] border border-white/10 rounded-xl p-1 mb-4">
      <button v-for="tab in [
        { id: 'write', label: 'Escrever', icon: 'mdi:pencil-outline' },
        { id: 'improve', label: 'Melhorar', icon: 'mdi:magic-staff' },
        { id: 'tips', label: 'Dicas', icon: 'mdi:lightbulb-outline' },
      ]" :key="tab.id"
        @click="mode = tab.id as Mode"
        :class="mode === tab.id ? 'bg-purple-600 text-white shadow' : 'text-blue-300 hover:text-white hover:bg-white/5'"
        class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
      >
        <Icon :icon="tab.icon" class="w-3.5 h-3.5" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Write Mode -->
    <div v-if="mode === 'write'" class="space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-3">
        <!-- Stats -->
        <div class="flex gap-4 text-xs text-blue-300/60 pb-2 border-b border-white/5">
          <span>{{ stats.words }} palavras</span>
          <span>{{ stats.chars }} caracteres</span>
          <span>{{ stats.sentences }} frases</span>
          <span>{{ stats.paragraphs }} parágrafos</span>
          <span v-if="stats.readMin > 0">~{{ stats.readMin }} min leitura</span>
        </div>

        <textarea
          v-model="text"
          rows="14"
          :placeholder="`Comece a escrever seu ${genre === 'poesia' ? 'poema' : genre === 'roteiro' ? 'roteiro' : genre === 'artigo' ? 'artigo' : genre === 'cronica' ? 'crônica' : 'conto'} aqui...`"
          class="w-full bg-[#0a1628]/60 border border-white/5 text-white rounded-lg px-4 py-3 text-sm leading-relaxed resize-none focus:border-purple-500 focus:outline-none placeholder-blue-300/20"
        />

        <div class="flex gap-2 justify-end">
          <button @click="copyText" :disabled="!text.trim()"
            :class="copied ? 'bg-emerald-700' : 'bg-white/10 hover:bg-white/20'"
            class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <Icon :icon="copied ? 'mdi:check' : 'mdi:content-copy'" class="w-3.5 h-3.5" />
            {{ copied ? 'Copiado' : 'Copiar' }}
          </button>
          <button @click="downloadText" :disabled="!text.trim()"
            class="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <Icon icon="mdi:download" class="w-3.5 h-3.5" />
            Salvar TXT
          </button>
        </div>
      </div>
    </div>

    <!-- Improve Mode -->
    <div v-if="mode === 'improve'" class="space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-3">
        <h2 class="text-sm font-semibold text-blue-200">Cole seu texto para análise</h2>
        <textarea
          v-model="text"
          rows="8"
          placeholder="Cole aqui o texto que você quer melhorar..."
          class="w-full bg-[#0a1628] border border-white/10 text-white rounded-lg px-3 py-2 text-sm resize-none focus:border-purple-500 focus:outline-none placeholder-blue-300/30"
        />
      </div>

      <div v-if="text.trim()" class="bg-[#111d3a] border border-purple-500/30 rounded-xl p-5 space-y-3">
        <h3 class="text-purple-300 text-sm font-semibold flex items-center gap-2">
          <Icon icon="mdi:magic-staff" class="w-4 h-4" />
          Sugestões de Melhoria
        </h3>
        <div v-for="(sug, i) in improveSuggestions" :key="i"
          class="bg-[#0a1628] border border-white/10 rounded-lg p-3 text-sm text-blue-200">
          {{ sug }}
        </div>
      </div>
      <div v-else class="text-center text-blue-300/40 py-10">
        <Icon icon="mdi:magic-staff" class="w-10 h-10 mx-auto mb-2" />
        <p class="text-sm">Cole seu texto acima para receber sugestões</p>
      </div>
    </div>

    <!-- Tips Mode -->
    <div v-if="mode === 'tips'" class="space-y-3">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4">
        <h2 class="text-sm font-semibold text-blue-200 mb-3 flex items-center gap-2">
          <Icon icon="mdi:lightbulb-on-outline" class="w-4 h-4 text-yellow-400" />
          Dicas para escrita {{ genres.find(g => g.value === genre)?.label ?? '' }}
        </h2>
        <ul class="space-y-2">
          <li v-for="(tip, i) in currentTips" :key="i"
            class="flex items-start gap-3 bg-[#0a1628] border border-white/5 rounded-lg p-3 text-sm text-blue-200">
            <span class="w-5 h-5 rounded-full bg-purple-600/50 flex items-center justify-center text-xs flex-shrink-0 font-bold">{{ i + 1 }}</span>
            {{ tip }}
          </li>
        </ul>
      </div>

      <!-- Starters -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4">
        <h3 class="text-sm font-semibold text-blue-200 mb-3">Frases de abertura para inspiração:</h3>
        <div class="space-y-2 text-sm text-blue-300 italic">
          <p v-if="genre === 'narrativo'">"Era a segunda vez que ela voltava para aquela casa que não era mais sua."</p>
          <p v-if="genre === 'narrativo'">"Ninguém sabia que o carteiro carregava uma carta que nunca foi enviada."</p>
          <p v-if="genre === 'poesia'">"Choveu sobre as pedras da memória / e o nome que você tinha / virou silêncio."</p>
          <p v-if="genre === 'poesia'">"Não sei onde começa o mar / e onde termina o que eu queria te dizer."</p>
          <p v-if="genre === 'cronica'">"Faz três semanas que a mesma pomba pousa na mesma grade às oito da manhã."</p>
          <p v-if="genre === 'roteiro'">"INTERIOR - APARTAMENTO - NOITE / MARCOS, 34, está sentado no chão cercado de caixas abertas."</p>
          <p v-if="genre === 'artigo'">"Em 2024, mais de 60% dos consumidores mudaram seus hábitos de compra. O que isso significa para o seu negócio?"</p>
        </div>
      </div>
    </div>
  </div>
</template>
