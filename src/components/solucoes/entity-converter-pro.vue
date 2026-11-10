<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const inputText = ref('')
const outputText = ref('')
const isConverting = ref(false)
const notification = ref('')
const mode = ref<'encode' | 'decode'>('encode')

// HTML entities map
const entitiesMap: [string, string][] = [
  ['&', '&amp;'], ['<', '&lt;'], ['>', '&gt;'], ['"', '&quot;'], ["'", '&#39;'],
  ['á', '&aacute;'], ['Á', '&Aacute;'], ['à', '&agrave;'], ['À', '&Agrave;'],
  ['â', '&acirc;'], ['Â', '&Acirc;'], ['ã', '&atilde;'], ['Ã', '&Atilde;'],
  ['ä', '&auml;'], ['Ä', '&Auml;'], ['å', '&aring;'], ['Å', '&Aring;'],
  ['æ', '&aelig;'], ['Æ', '&AElig;'], ['ç', '&ccedil;'], ['Ç', '&Ccedil;'],
  ['é', '&eacute;'], ['É', '&Eacute;'], ['è', '&egrave;'], ['È', '&Egrave;'],
  ['ê', '&ecirc;'], ['Ê', '&Ecirc;'], ['ë', '&euml;'], ['Ë', '&Euml;'],
  ['í', '&iacute;'], ['Í', '&Iacute;'], ['ì', '&igrave;'], ['Ì', '&Igrave;'],
  ['î', '&icirc;'], ['Î', '&Icirc;'], ['ï', '&iuml;'], ['Ï', '&Iuml;'],
  ['ñ', '&ntilde;'], ['Ñ', '&Ntilde;'], ['ó', '&oacute;'], ['Ó', '&Oacute;'],
  ['ò', '&ograve;'], ['Ò', '&Ograve;'], ['ô', '&ocirc;'], ['Ô', '&Ocirc;'],
  ['õ', '&otilde;'], ['Õ', '&Otilde;'], ['ö', '&ouml;'], ['Ö', '&Ouml;'],
  ['ú', '&uacute;'], ['Ú', '&Uacute;'], ['ù', '&ugrave;'], ['Ù', '&Ugrave;'],
  ['û', '&ucirc;'], ['Û', '&Ucirc;'], ['ü', '&uuml;'], ['Ü', '&Uuml;'],
  ['©', '&copy;'], ['®', '&reg;'], ['™', '&trade;'], ['€', '&euro;'],
  ['£', '&pound;'], ['¥', '&yen;'], ['§', '&sect;'], ['°', '&deg;'],
  ['±', '&plusmn;'], ['×', '&times;'], ['÷', '&divide;'], ['¡', '&iexcl;'],
  ['¿', '&iquest;'], ['«', '&laquo;'], ['»', '&raquo;'], ['–', '&ndash;'],
  ['\u2014', '&mdash;'], ['\u2018', '&lsquo;'], ['\u2019', '&rsquo;'], ['\u201C', '&ldquo;'], ['\u201D', '&rdquo;'],
]

function encodeEntities(text: string): string {
  let result = text
  // Sort by string length descending to avoid partial replacements
  for (const [char, entity] of entitiesMap) {
    result = result.split(char).join(entity)
  }
  return result
}

function decodeEntities(text: string): string {
  const div = document.createElement('div')
  div.innerHTML = text
  return div.textContent || div.innerText || ''
}

async function convert() {
  if (!inputText.value.trim()) return
  isConverting.value = true
  await new Promise(r => setTimeout(r, 200))
  outputText.value = mode.value === 'encode' ? encodeEntities(inputText.value) : decodeEntities(inputText.value)
  isConverting.value = false
  toast('Convertido com sucesso!')
}

async function copyOutput() {
  if (!outputText.value) return
  await navigator.clipboard.writeText(outputText.value)
  toast('Copiado para a área de transferência!')
}

function clear() {
  inputText.value = ''
  outputText.value = ''
}

function toast(msg: string) {
  notification.value = msg; setTimeout(() => { notification.value = '' }, 2000)
}

const charCount = computed(() => ({
  input: inputText.value.length,
  output: outputText.value.length,
}))

// Sample entity table (most common)
const sampleEntities = entitiesMap.slice(2, 20)
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 space-y-5">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:code-tags" class="text-yellow-400 w-7 h-7" />
        Entity Converter Pro
      </h1>
      <p class="text-blue-200 text-sm">Converta caracteres especiais para HTML Entities e vice-versa</p>
    </div>

    <!-- Mode toggle -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4">
      <div class="flex gap-3 mb-4">
        <button @click="mode = 'encode'" :class="['flex-1 py-2 rounded-lg text-sm font-medium transition-all border', mode === 'encode' ? 'bg-yellow-600 border-yellow-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/10']">
          <Icon icon="mdi:arrow-right" class="w-4 h-4 inline mr-1" /> Texto → Entities
        </button>
        <button @click="mode = 'decode'" :class="['flex-1 py-2 rounded-lg text-sm font-medium transition-all border', mode === 'decode' ? 'bg-blue-600 border-blue-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/10']">
          <Icon icon="mdi:arrow-left" class="w-4 h-4 inline mr-1" /> Entities → Texto
        </button>
      </div>

      <div class="grid lg:grid-cols-2 gap-4">
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="text-blue-200 text-xs font-medium">{{ mode === 'encode' ? 'Texto com caracteres especiais' : 'HTML Entities' }}</label>
            <span class="text-blue-300/50 text-xs">{{ charCount.input }} chars</span>
          </div>
          <textarea v-model="inputText" rows="8" spellcheck="false" autocomplete="off"
            :placeholder="mode === 'encode' ? 'Ex: Olá, como você está? © 2024' : 'Ex: Ol&aacute;, como voc&ecirc; est&aacute;?'"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500/50" />
          <div class="flex gap-2 mt-2">
            <button v-if="inputText" @click="clear" class="text-red-400 hover:text-red-300 text-xs flex items-center gap-1">
              <Icon icon="mdi:trash-can" class="w-3.5 h-3.5" /> Limpar
            </button>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="text-blue-200 text-xs font-medium">{{ mode === 'encode' ? 'HTML Entities geradas' : 'Texto decodificado' }}</label>
            <span class="text-blue-300/50 text-xs">{{ charCount.output }} chars</span>
          </div>
          <textarea :value="outputText" readonly rows="8" spellcheck="false"
            placeholder="O resultado aparecerá aqui..."
            class="w-full bg-gray-950 text-green-300 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono resize-none" />
          <div class="flex gap-2 mt-2">
            <button @click="convert" :disabled="!inputText.trim() || isConverting"
              :class="['flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors', !inputText.trim() ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500 text-white']">
              <Icon :icon="isConverting ? 'mdi:loading' : 'mdi:swap-horizontal'" :class="['w-4 h-4', isConverting ? 'animate-spin' : '']" />
              {{ isConverting ? 'Convertendo...' : 'Converter' }}
            </button>
            <button v-if="outputText" @click="copyOutput" class="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
              <Icon icon="mdi:content-copy" class="w-4 h-4" /> Copiar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Entity reference table -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5">
      <h2 class="text-white font-semibold mb-3 flex items-center gap-2">
        <Icon icon="mdi:table" class="text-yellow-400 w-5 h-5" /> Referência de Entities
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        <div v-for="[char, entity] in sampleEntities" :key="entity" class="bg-[#0a1628] rounded-lg px-3 py-2 flex items-center justify-between">
          <span class="text-white font-bold text-sm">{{ char }}</span>
          <span class="text-blue-300 text-xs font-mono ml-2">{{ entity }}</span>
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
