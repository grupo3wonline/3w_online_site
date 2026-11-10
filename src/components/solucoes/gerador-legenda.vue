<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

type Platform = 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'twitter' | 'youtube'
type Tone = 'informal' | 'formal' | 'motivacional' | 'divertido' | 'educativo'

const topic = ref('')
const platform = ref<Platform>('instagram')
const tone = ref<Tone>('informal')
const includeHashtags = ref(true)
const includeEmoji = ref(true)
const isGenerating = ref(false)
const result = ref('')
const notification = ref('')

const platforms: { id: Platform; label: string; icon: string; limit: number }[] = [
  { id: 'instagram', label: 'Instagram', icon: 'mdi:instagram', limit: 2200 },
  { id: 'tiktok', label: 'TikTok', icon: 'mdi:music-note', limit: 2200 },
  { id: 'facebook', label: 'Facebook', icon: 'mdi:facebook', limit: 63206 },
  { id: 'linkedin', label: 'LinkedIn', icon: 'mdi:linkedin', limit: 3000 },
  { id: 'twitter', label: 'Twitter/X', icon: 'mdi:twitter', limit: 280 },
  { id: 'youtube', label: 'YouTube', icon: 'mdi:youtube', limit: 5000 },
]

const tones: { id: Tone; label: string }[] = [
  { id: 'informal', label: 'Informal' },
  { id: 'formal', label: 'Formal' },
  { id: 'motivacional', label: 'Motivacional' },
  { id: 'divertido', label: 'Divertido' },
  { id: 'educativo', label: 'Educativo' },
]

const emojiSets: Record<Tone, string[]> = {
  informal: ['😊', '👋', '💬', '✨', '🔥', '💡', '🎯'],
  formal: ['📌', '✅', '💼', '📊', '🎯', '🌟', '🔑'],
  motivacional: ['🚀', '💪', '🌟', '⚡', '🏆', '🎯', '✨'],
  divertido: ['😂', '🎉', '🤪', '😎', '🔥', '💥', '🎊'],
  educativo: ['📚', '💡', '🎓', '🧠', '📝', '✏️', '🔍'],
}

const hashtagSets: Record<Platform, string[]> = {
  instagram: ['#instabrasil', '#conteudo', '#marketing', '#digital', '#brasil'],
  tiktok: ['#fyp', '#viral', '#paravocê', '#trending', '#brasil'],
  facebook: ['#facebook', '#social', '#marketing', '#brasil', '#novidade'],
  linkedin: ['#linkedin', '#marketing', '#negócios', '#profissional', '#brasil'],
  twitter: ['#trending', '#brasil', '#twitter'],
  youtube: ['#youtube', '#video', '#canal', '#brasil', '#conteudo'],
}

const templates: Record<Tone, string[]> = {
  informal: [
    'Ei, {topico}! Conta pra mim: o que você acha disso?',
    'Olha só o que a gente preparou sobre {topico} 👀',
    'Tem gente aqui que precisa ver isso sobre {topico}...',
    'Se você se interessa por {topico}, você vai amar isso!',
  ],
  formal: [
    'Hoje abordamos um tema fundamental: {topico}.',
    'Compartilhamos nossa perspectiva sobre {topico}.',
    'Prezamos pela sua informação sobre {topico}. Confira.',
    'Trouxemos conteúdo relevante sobre {topico} para você.',
  ],
  motivacional: [
    'Você é capaz de muito mais! {topico} pode transformar sua jornada.',
    'Não desista! {topico} é o próximo passo para o seu sucesso.',
    'Acredite no seu potencial! {topico} está ao seu alcance.',
    'Hoje é o dia certo para começar com {topico}. Vamos juntos!',
  ],
  divertido: [
    'Alô alô! Alguém aí tá manjando de {topico}? 😂',
    'Spoiler: {topico} vai mudar sua vida (ou não, mas tenta) 😎',
    'Juro que não é clickbait, mas {topico} é incrível de verdade!',
    'Ei, {topico} é a nova moda e a gente adora! 🎉',
  ],
  educativo: [
    'Você sabia que {topico} pode fazer diferença no seu dia a dia?',
    'Hoje vamos aprender juntos sobre {topico}. Anota aí!',
    'Conhecimento é poder! Hoje: {topico} explicado de forma simples.',
    '{topico}: tudo o que você precisa saber resumido aqui.',
  ],
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function generateCaption() {
  if (!topic.value.trim()) return
  isGenerating.value = true
  await new Promise(r => setTimeout(r, 600))

  const templateArr = templates[tone.value]
  let caption = getRandomElement(templateArr).replace(/{topico}/g, topic.value.trim())

  const curPlatform = platforms.find(p => p.id === platform.value)!

  // Add emojis
  if (includeEmoji.value) {
    const emojis = emojiSets[tone.value]
    caption = `${getRandomElement(emojis)} ${caption} ${getRandomElement(emojis)}`
  }

  // Add call to action
  const ctas = [
    '\n\n💬 Conta nos comentários o que você pensa!',
    '\n\n👉 Salva esse post para não esquecer!',
    '\n\n🔗 Compartilha com alguém que precisa ver!',
    '\n\n✅ Curte se você concorda!',
  ]
  caption += getRandomElement(ctas)

  // Add hashtags
  if (includeHashtags.value) {
    const tags = hashtagSets[platform.value]
    const topicTag = '#' + topic.value.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')
    const allTags = [topicTag, ...tags]
    const tagStr = allTags.slice(0, platform.value === 'twitter' ? 3 : 8).join(' ')
    caption += `\n\n${tagStr}`
  }

  // Trim to platform limit
  if (caption.length > curPlatform.limit) {
    caption = caption.substring(0, curPlatform.limit - 3) + '...'
  }

  result.value = caption
  isGenerating.value = false
}

async function copyResult() {
  if (!result.value) return
  await navigator.clipboard.writeText(result.value)
  notification.value = 'Legenda copiada!'
  setTimeout(() => { notification.value = '' }, 2000)
}

function clear() { result.value = ''; topic.value = '' }
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 space-y-5">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:pencil-box" class="text-pink-400 w-7 h-7" />
        Gerador de Legendas
      </h1>
      <p class="text-blue-200 text-sm">Crie legendas para redes sociais de forma rápida e criativa</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-5">
      <!-- Config panel -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:cog" class="text-pink-400 w-5 h-5" /> Configuração</h2>

        <div>
          <label class="text-blue-200 text-xs font-medium block mb-1">Tema / Tópico *</label>
          <input v-model="topic" type="text" placeholder="Ex: marketing digital, academia, receita..." autocomplete="off"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50" />
        </div>

        <div>
          <label class="text-blue-200 text-xs font-medium block mb-2">Plataforma</label>
          <div class="grid grid-cols-3 gap-2">
            <button v-for="p in platforms" :key="p.id" @click="platform = p.id"
              :class="['flex flex-col items-center gap-1 py-2 rounded-lg text-xs border transition-all', platform === p.id ? 'bg-pink-600/30 border-pink-500 text-pink-300' : 'border-white/10 text-blue-200 hover:bg-white/5']">
              <Icon :icon="p.icon" class="w-5 h-5" />{{ p.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="text-blue-200 text-xs font-medium block mb-2">Tom</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="t in tones" :key="t.id" @click="tone = t.id"
              :class="['px-3 py-1.5 rounded-full text-xs font-medium border transition-all', tone === t.id ? 'bg-pink-600 border-pink-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/10']">
              {{ t.label }}
            </button>
          </div>
        </div>

        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="includeEmoji" class="rounded accent-pink-500" />
            <span class="text-blue-200 text-sm">Emojis</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="includeHashtags" class="rounded accent-pink-500" />
            <span class="text-blue-200 text-sm">Hashtags</span>
          </label>
        </div>

        <button @click="generateCaption" :disabled="!topic.trim() || isGenerating"
          :class="['w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors', !topic.trim() ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-500 text-white']">
          <Icon :icon="isGenerating ? 'mdi:loading' : 'mdi:magic-staff'" :class="['w-4 h-4', isGenerating ? 'animate-spin' : '']" />
          {{ isGenerating ? 'Gerando...' : 'Gerar Legenda' }}
        </button>
      </div>

      <!-- Result panel -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-white font-semibold flex items-center gap-2">
            <Icon icon="mdi:text-box" class="text-pink-400 w-5 h-5" /> Legenda Gerada
          </h2>
          <span class="text-blue-300/50 text-xs" v-if="result">{{ result.length }} chars</span>
        </div>

        <div v-if="result" class="space-y-3">
          <textarea :value="result" @input="e => result = (e.target as HTMLTextAreaElement).value" rows="12"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/50 leading-relaxed" />
          <div class="flex gap-2">
            <button @click="copyResult" class="flex-1 bg-green-700 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
              <Icon icon="mdi:content-copy" class="w-4 h-4" /> Copiar
            </button>
            <button @click="generateCaption" :disabled="isGenerating" class="flex-1 bg-pink-700 hover:bg-pink-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
              <Icon icon="mdi:refresh" class="w-4 h-4" /> Regenerar
            </button>
            <button @click="clear" class="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
              <Icon icon="mdi:trash-can" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center h-48">
          <Icon icon="mdi:pencil-box-outline" class="w-12 h-12 text-pink-400/20 mb-2" />
          <p class="text-blue-200 text-sm">Preencha o tema e clique em "Gerar"</p>
        </div>

        <!-- Platform info -->
        <div class="bg-pink-900/20 border border-pink-500/30 rounded-lg p-3 mt-auto">
          <p class="text-pink-300 text-xs font-semibold mb-1">
            <Icon icon="mdi:information" class="w-3.5 h-3.5 inline mr-1" /> Limite: {{ platforms.find(p => p.id === platform)?.label }} = {{ platforms.find(p => p.id === platform)?.limit.toLocaleString() }} caracteres
          </p>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="notification" class="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">{{ notification }}</div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
