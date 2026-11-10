<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const inputText = ref('')
const activeTypes = ref({
  emails: true,
  urls: true,
  phones: true,
  numbers: true,
  dates: true,
  cpf: false,
  cnpj: false,
  keywords: false,
})

interface Extracted {
  emails: string[]
  urls: string[]
  phones: string[]
  numbers: string[]
  dates: string[]
  cpf: string[]
  cnpj: string[]
  keywords: string[]
}

const extracted = ref<Extracted | null>(null)

const EMAIL_RE   = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
const URL_RE     = /https?:\/\/[^\s\)\"\'<>]+/g
const PHONE_RE   = /(?:\+55\s?)?(?:\(?\d{2}\)?[\s-]?)(?:9\d{4}|\d{4})[-\s]?\d{4}/g
const NUMBER_RE  = /\b\d[\d.,]*\b/g
const DATE_RE    = /\b(?:\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}|\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2})\b/g
const CPF_RE     = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g
const CNPJ_RE    = /\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g
const STOPWORDS  = new Set(['de','a','o','que','e','do','da','em','um','para','é','com','uma','os','no','se','na','por','mais','as','dos','como','mas','foi','ao','ele','das','à','seu','sua','ou','ser','quando','muito','há','nos','já','está','eu','também','só','pelo','pela','até','isso','ela','entre','era','depois','sem','mesmo','aos','ter','seus','quem','nas','me','esse','eles','estão','você','tinha','foram','esse','num','nem','suas','meu','às','minha','têm','numa','pelos','elas','havia','seja','qual','será','nós','tenho','lhe','deles','essas','esses','pelas','este','dele','tu','te','vocês','vos','lhes','meus','minhas','teu','tua','teus','tuas','nosso','nossa','nossos','nossas','the','of','to','and','a','in','is','it','you','that','he','was','for','on','are','with','as','I','his','they','be','at','one','have','this','from','or','had','by','not','but','what','all','were','we','when','your','can','said','there','use','an','each','which','she','do','how','their','if','will','up','other','about','out','many','then','them','these','so','some','her','would','make','like','him','into','time','has','look','two','more','write','go','see','number','no','way','could','people','my','than','first','water','been','call','who','its','now','find','long','down','day','did','get','come','made','may','part'])

function extractAll(text: string): Extracted {
  const unique = (arr: string[]) => Array.from(new Set(arr.map(s => s.trim()).filter(Boolean)))

  const extractKeywords = (t: string) => {
    const words = t.toLowerCase().match(/\b[a-záàâãéêíóôõúüç]{4,}\b/g) || []
    const freq = new Map<string, number>()
    for (const w of words) {
      if (!STOPWORDS.has(w)) freq.set(w, (freq.get(w) || 0) + 1)
    }
    return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([w]) => w)
  }

  return {
    emails: unique(text.match(EMAIL_RE) || []),
    urls: unique(text.match(URL_RE) || []),
    phones: unique(text.match(PHONE_RE) || []),
    numbers: unique(text.match(NUMBER_RE) || []).slice(0, 50),
    dates: unique(text.match(DATE_RE) || []),
    cpf: unique(text.match(CPF_RE) || []),
    cnpj: unique(text.match(CNPJ_RE) || []),
    keywords: extractKeywords(text),
  }
}

function extract() {
  if (!inputText.value.trim()) {
    Swal.fire({ icon: 'warning', title: 'Texto vazio!', text: 'Cole um texto para extrair dados.', confirmButtonColor: '#3b82f6' })
    return
  }
  extracted.value = extractAll(inputText.value)
  const total = Object.values(extracted.value).reduce((a, b) => a + b.length, 0)
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1800 })
    .fire({ icon: 'success', title: `${total} itens extraídos!` })
}

async function copySection(key: keyof Extracted) {
  if (!extracted.value) return
  const items = extracted.value[key]
  if (!items.length) return
  await navigator.clipboard.writeText(items.join('\n'))
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1400 })
    .fire({ icon: 'success', title: 'Copiado!' })
}

function downloadAll() {
  if (!extracted.value) return
  const lines: string[] = []
  for (const [key, items] of Object.entries(extracted.value) as [keyof Extracted, string[]][]) {
    if (items.length) {
      lines.push(`=== ${key.toUpperCase()} (${items.length}) ===`)
      lines.push(...items)
      lines.push('')
    }
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'dados-extraidos.txt'; a.click()
  URL.revokeObjectURL(url)
}

const sections: { key: keyof Extracted; label: string; icon: string; color: string }[] = [
  { key: 'emails', label: 'E-mails', icon: 'mdi:email-outline', color: 'text-blue-400' },
  { key: 'urls', label: 'URLs', icon: 'mdi:link-variant', color: 'text-purple-400' },
  { key: 'phones', label: 'Telefones', icon: 'mdi:phone-outline', color: 'text-green-400' },
  { key: 'numbers', label: 'Números', icon: 'mdi:numeric', color: 'text-yellow-400' },
  { key: 'dates', label: 'Datas', icon: 'mdi:calendar-outline', color: 'text-orange-400' },
  { key: 'cpf', label: 'CPFs', icon: 'mdi:card-account-details-outline', color: 'text-cyan-400' },
  { key: 'cnpj', label: 'CNPJs', icon: 'mdi:office-building-outline', color: 'text-pink-400' },
  { key: 'keywords', label: 'Palavras-chave', icon: 'mdi:tag-outline', color: 'text-emerald-400' },
]
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:file-search-outline" class="text-blue-400 w-7 h-7" />
        Extrator de Texto
      </h1>
      <p class="text-blue-200 text-sm">Extraia e-mails, URLs, telefones, datas, números e palavras-chave de qualquer texto</p>
    </div>

    <!-- Input -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
      <h2 class="text-white font-semibold">Texto de Entrada</h2>
      <textarea
        v-model="inputText"
        rows="8"
        placeholder="Cole aqui o texto para extrair informações..."
        class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg p-3 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      ></textarea>

      <div class="flex flex-wrap gap-3 items-center justify-between">
        <span class="text-xs text-blue-300">{{ inputText.length.toLocaleString() }} caracteres</span>
        <div class="flex gap-2">
          <button v-if="extracted" @click="downloadAll"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-xs transition-colors">
            <Icon icon="mdi:download-outline" class="w-3.5 h-3.5" />
            Baixar Tudo
          </button>
          <button @click="extract" :disabled="!inputText.trim()"
            class="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm">
            <Icon icon="mdi:text-search" class="w-4 h-4" />
            Extrair Dados
          </button>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="extracted" class="grid sm:grid-cols-2 gap-4">
      <div v-for="sec in sections" :key="sec.key"
        class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon :icon="sec.icon" class="w-4 h-4" :class="sec.color" />
            {{ sec.label }}
            <span class="text-xs bg-white/10 text-blue-300 px-1.5 py-0.5 rounded-full">{{ extracted[sec.key].length }}</span>
          </h3>
          <button v-if="extracted[sec.key].length" @click="copySection(sec.key)"
            class="p-1 text-blue-300 hover:text-white hover:bg-white/10 rounded transition-colors">
            <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" />
          </button>
        </div>

        <div v-if="extracted[sec.key].length" class="max-h-32 overflow-y-auto space-y-1">
          <div v-for="(item, i) in extracted[sec.key]" :key="i"
            class="bg-[#0a1628] border border-white/5 rounded px-2 py-1 text-xs text-blue-200 font-mono truncate">
            {{ item }}
          </div>
        </div>
        <p v-else class="text-xs text-blue-300/50 italic">Nenhum resultado</p>
      </div>
    </div>
  </div>
</template>
