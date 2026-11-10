<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type TextType = 'lorem' | 'hipster' | 'mussum' | 'creative'
type Format = 'paragraphs' | 'words' | 'lists'
type Size = 'small' | 'medium' | 'large'

const textType = ref<TextType>('lorem')
const format = ref<Format>('paragraphs')
const size = ref<Size>('medium')
const quantity = ref(3)
const generatedText = ref('')

const loremWords = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum']
const hipsterWords = ['artisan','craft','authentic','organic','sustainable','vinyl','fixie','beard','mustache','brooklyn','artisanal','locavore','farm','table','kale','quinoa','kombucha','meditation','yoga','mindfulness','vintage','retro','aesthetic','minimalist','curated','handcrafted','small','batch','indie','underground','alternative','conscious','eco','friendly','ethically','sourced','fair','trade','bicycle','coffee','roastery','third','wave','pour','over','single','origin']
const mussumWords = ['mussum','ipsum','cacilds','vidis','litro','abertis','consetis','adipiscin','mé','faiz','elementum','girarzis','nisi','eros','vermeio','tá','deprimidis','facilisi','nam','liber','tempor','cum','soluta','nobis','eleifend','option','congue','nihil','imperdiet','doming','placerat','facer','possim','assum','posuere','interdum']
const creativeWords = ['magical','wizard','wand','spell','potion','enchanted','mystical','ancient','dragon','phoenix','unicorn','castle','kingdom','quest','adventure','hero','destiny','prophecy','legend','mythical','ethereal','celestial','divine','sacred','powerful','mysterious','forbidden','secret','hidden','lost','treasure','artifact','relic','scroll','tome','grimoire','crystal','gem']
const mussumPhrases = ['Tá tranquilo, tá favorável!','Suco de cevadiss, é um leite divinis!','Manduma pindureta quium dia nois paga!','Todo mundo vê os porris que eu tomo!','Casamentiss faiz malandris se pirulitá!']
const hipsterPhrases = ['This is artisanal content.','Sustainably sourced text.','Craft beer for your eyes.','Locally sourced lorem ipsum.']
const creativeStarters = ['In a realm far beyond mortal comprehension','The ancient prophecy spoke of','Through the mists of time','In the heart of the enchanted forest']

function getWords(type: TextType) {
  return type === 'hipster' ? hipsterWords : type === 'mussum' ? mussumWords : type === 'creative' ? creativeWords : loremWords
}

function getPhrases(type: TextType) {
  return type === 'mussum' ? mussumPhrases : type === 'hipster' ? hipsterPhrases : type === 'creative' ? creativeStarters : []
}

function getSizeRange(s: Size) {
  return s === 'small' ? [20, 40] : s === 'large' ? [100, 150] : [50, 80]
}

function genParagraphs(type: TextType, qty: number, s: Size) {
  const words = getWords(type)
  const phrases = getPhrases(type)
  const [min, max] = getSizeRange(s)
  return Array.from({ length: qty }, () => {
    const len = Math.floor(Math.random() * (max - min + 1)) + min
    const result: string[] = []
    if (type === 'creative' && Math.random() < 0.4) result.push(phrases[Math.floor(Math.random() * phrases.length)])
    if (type === 'mussum' && Math.random() < 0.3) result.push(phrases[Math.floor(Math.random() * phrases.length)])
    while (result.length < len) {
      if ((type === 'mussum' || type === 'hipster') && Math.random() < 0.07 && result.length > 5) {
        result.push(phrases[Math.floor(Math.random() * phrases.length)])
      } else {
        result.push(words[Math.floor(Math.random() * words.length)])
      }
    }
    const text = result.join(' ')
    return text.charAt(0).toUpperCase() + text.slice(1) + '.'
  }).join('\n\n')
}

function genWords(type: TextType, qty: number) {
  const words = getWords(type)
  const result = Array.from({ length: qty }, () => words[Math.floor(Math.random() * words.length)])
  return result.join(' ') + '.'
}

function genLists(type: TextType, qty: number) {
  const words = getWords(type)
  return Array.from({ length: qty }, () => {
    const len = Math.floor(Math.random() * 8) + 3
    const result = Array.from({ length: len }, () => words[Math.floor(Math.random() * words.length)])
    const text = result.join(' ')
    return '• ' + text.charAt(0).toUpperCase() + text.slice(1)
  }).join('\n')
}

function generate() {
  if (format.value === 'paragraphs') generatedText.value = genParagraphs(textType.value, quantity.value, size.value)
  else if (format.value === 'words') generatedText.value = genWords(textType.value, quantity.value)
  else generatedText.value = genLists(textType.value, quantity.value)

  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1200 })
    .fire({ icon: 'success', title: 'Texto gerado!' })
}

async function copyText() {
  if (!generatedText.value) return
  await navigator.clipboard.writeText(generatedText.value)
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1400 })
    .fire({ icon: 'success', title: 'Texto copiado!' })
}

function downloadText() {
  if (!generatedText.value) return
  const blob = new Blob([generatedText.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'texto-gerado.txt'; a.click()
  URL.revokeObjectURL(url)
}

const wordCount = computed(() => {
  if (!generatedText.value.trim()) return 0
  return generatedText.value.trim().split(/\s+/).length
})

const textTypeOptions: { value: TextType; label: string; desc: string }[] = [
  { value: 'lorem', label: 'Lorem Ipsum', desc: 'Clássico placeholder' },
  { value: 'hipster', label: 'Hipster', desc: 'Artisanal vibes' },
  { value: 'mussum', label: 'Mussum', desc: 'Brasileiro' },
  { value: 'creative', label: 'Fantasy', desc: 'Mundo mágico' },
]
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:text-box-multiple-outline" class="text-blue-400 w-7 h-7" />
        Ipsum Generator Plus
      </h1>
      <p class="text-blue-200 text-sm">Gerador de texto placeholder com múltiplos estilos</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Config -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-5">
        <h2 class="text-white font-semibold">Configurações</h2>

        <!-- Text type -->
        <div class="space-y-2">
          <label class="text-sm text-blue-200">Tipo de Texto</label>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="opt in textTypeOptions" :key="opt.value"
              @click="textType = opt.value"
              :class="textType === opt.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/5 text-blue-300 hover:text-white border-white/10'"
              class="p-3 rounded-xl border text-left transition-colors">
              <div class="text-sm font-medium">{{ opt.label }}</div>
              <div class="text-xs opacity-60">{{ opt.desc }}</div>
            </button>
          </div>
        </div>

        <!-- Format -->
        <div class="space-y-2">
          <label class="text-sm text-blue-200">Formato</label>
          <div class="flex gap-2">
            <button v-for="f in [['paragraphs','Parágrafos'],['words','Palavras'],['lists','Listas']]" :key="f[0]"
              @click="format = f[0] as Format"
              :class="format === f[0] ? 'bg-blue-600 text-white' : 'bg-white/5 text-blue-300 hover:text-white border border-white/10'"
              class="flex-1 py-2 rounded-lg text-xs font-medium transition-colors">
              {{ f[1] }}
            </button>
          </div>
        </div>

        <!-- Size (only for paragraphs) -->
        <div v-if="format === 'paragraphs'" class="space-y-2">
          <label class="text-sm text-blue-200">Tamanho</label>
          <div class="flex gap-2">
            <button v-for="s in [['small','Pequeno'],['medium','Médio'],['large','Grande']]" :key="s[0]"
              @click="size = s[0] as Size"
              :class="size === s[0] ? 'bg-blue-600 text-white' : 'bg-white/5 text-blue-300 hover:text-white border border-white/10'"
              class="flex-1 py-2 rounded-lg text-xs font-medium transition-colors">
              {{ s[1] }}
            </button>
          </div>
        </div>

        <!-- Quantity -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="text-sm text-blue-200">Quantidade ({{ format === 'paragraphs' ? 'parágrafos' : format === 'words' ? 'palavras' : 'itens' }})</label>
            <span class="text-xs text-blue-300">{{ quantity }}</span>
          </div>
          <input type="range" v-model.number="quantity" min="1" max="20" step="1"
            class="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500" />
          <div class="flex justify-between text-xs text-blue-300/50">
            <span>1</span><span>20</span>
          </div>
        </div>

        <button @click="generate"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Icon icon="mdi:flash" class="w-5 h-5" />
          Gerar Texto
        </button>
      </div>

      <!-- Output -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-white font-semibold">Resultado</h2>
          <span v-if="wordCount" class="text-xs text-blue-300">{{ wordCount }} palavras</span>
        </div>

        <div v-if="generatedText" class="space-y-3">
          <div class="max-h-80 overflow-y-auto bg-[#0a1628] border border-white/5 rounded-lg p-4">
            <p class="text-blue-100 text-sm leading-relaxed whitespace-pre-wrap font-mono">{{ generatedText }}</p>
          </div>

          <div class="flex gap-2">
            <button @click="copyText"
              class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors">
              <Icon icon="mdi:content-copy" class="w-4 h-4" />
              Copiar
            </button>
            <button @click="downloadText"
              class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors">
              <Icon icon="mdi:download-outline" class="w-4 h-4" />
              Baixar .TXT
            </button>
          </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center h-48 text-center">
          <Icon icon="mdi:text-box-multiple-outline" class="w-12 h-12 text-blue-300/30 mb-4" />
          <p class="text-blue-300/60 text-sm">Configure as opções e clique em Gerar Texto</p>
        </div>
      </div>
    </div>
  </div>
</template>
