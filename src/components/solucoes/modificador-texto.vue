<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type TransformationType =
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'alternating'
  | 'sentence'
  | 'title'
  | 'inverse'
  | 'reverse'

const inputText = ref('')
const outputText = ref('')
const transformation = ref<TransformationType>('uppercase')
const useFilter = ref(false)
const minLength = ref(3)
const copied = ref(false)

const transformations = [
  { value: 'uppercase', label: 'MAIÚSCULAS', example: 'HELLO WORLD' },
  { value: 'lowercase', label: 'minúsculas', example: 'hello world' },
  { value: 'capitalize', label: 'Primeira Letra Maiúscula', example: 'Hello World' },
  { value: 'alternating', label: 'fOrMaTo aLtErNaDo', example: 'hElLo WoRlD' },
  { value: 'sentence', label: 'Formato Frase', example: 'Hello world. How are you?' },
  { value: 'title', label: 'Title Case', example: 'Hello World Title' },
  { value: 'inverse', label: 'InVeRsE CaSe', example: 'hELLO wORLD' },
  { value: 'reverse', label: 'Inverter Texto', example: 'dlrow olleh' },
]

const smallWords = new Set(['and','or','but','the','a','an','in','on','at','to','for','of','by','with'])

function applyTransformation(text: string, type: TransformationType, filter: boolean, minLen: number): string {
  if (!text) return ''
  const words = text.split(/(\s+)/)
  const processed = words.map(word => {
    if (/^\s+$/.test(word)) return word
    if (filter && word.length < minLen && /\w/.test(word)) return word
    switch (type) {
      case 'uppercase': return word.toUpperCase()
      case 'lowercase': return word.toLowerCase()
      case 'capitalize': return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      case 'alternating': return word.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')
      case 'sentence': return word
      case 'title':
        if (word.length <= 3 && smallWords.has(word.toLowerCase())) return word.toLowerCase()
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      case 'inverse': return word.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('')
      case 'reverse': return word.split('').reverse().join('')
      default: return word
    }
  })
  let result = processed.join('')
  if (type === 'sentence') {
    result = result.toLowerCase().replace(/(^|\. )([a-z])/g, (_, prefix, letter) => prefix + letter.toUpperCase())
  }
  return result
}

watch([inputText, transformation, useFilter, minLength], () => {
  outputText.value = applyTransformation(inputText.value, transformation.value, useFilter.value, minLength.value)
})

const inputStats = computed(() => ({
  chars: inputText.value.length,
  words: inputText.value.trim() ? inputText.value.trim().split(/\s+/).length : 0,
}))

const outputStats = computed(() => ({
  chars: outputText.value.length,
  words: outputText.value.trim() ? outputText.value.trim().split(/\s+/).length : 0,
}))

async function copyOutput() {
  if (!outputText.value) {
    Swal.fire({ icon: 'warning', title: 'Nada para copiar', text: 'O campo de resultado está vazio.', confirmButtonColor: '#3b82f6' })
    return
  }
  await navigator.clipboard.writeText(outputText.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function clearAll() {
  inputText.value = ''
  outputText.value = ''
}
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:format-letter-case" class="text-blue-400 w-7 h-7" />
        Modificador de Texto
      </h1>
      <p class="text-blue-300/70 text-sm">Transforme seu texto com facilidade</p>
    </div>

    <!-- Transformation Select -->
    <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4 mb-4">
      <label class="block text-blue-200 text-sm font-medium mb-2">Tipo de Transformação</label>
      <select
        v-model="transformation"
        class="w-full bg-[#0a1628] border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      >
        <option v-for="t in transformations" :key="t.value" :value="t.value">
          {{ t.label }} — Ex: {{ t.example }}
        </option>
      </select>
    </div>

    <!-- Filter Options -->
    <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4 mb-4">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" v-model="useFilter" class="w-4 h-4 accent-blue-500" />
        <span class="text-blue-200 text-sm font-medium">Ignorar palavras menores que X caracteres</span>
      </label>
      <div v-if="useFilter" class="mt-3 flex items-center gap-3">
        <span class="text-blue-300 text-sm">Mínimo:</span>
        <input
          type="number" v-model.number="minLength" min="1" max="10"
          class="w-20 bg-[#0a1628] border border-white/20 text-white rounded px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
        />
        <span class="text-blue-300 text-sm">caracteres</span>
      </div>
    </div>

    <!-- Text Areas -->
    <div class="grid md:grid-cols-2 gap-4 mb-4">
      <!-- Input -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-blue-200 text-sm font-medium">Texto Original</span>
          <span class="text-blue-400/60 text-xs">{{ inputStats.chars }} chars · {{ inputStats.words }} palavras</span>
        </div>
        <textarea
          v-model="inputText"
          placeholder="Cole ou digite seu texto aqui..."
          rows="8"
          class="w-full bg-[#0a1628] border border-white/10 text-white rounded-lg px-3 py-2 text-sm resize-none focus:border-blue-500 focus:outline-none placeholder-blue-300/30"
        />
      </div>

      <!-- Output -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-blue-200 text-sm font-medium">Resultado</span>
          <span class="text-blue-400/60 text-xs">{{ outputStats.chars }} chars · {{ outputStats.words }} palavras</span>
        </div>
        <textarea
          :value="outputText"
          readonly
          rows="8"
          class="w-full bg-[#0a1628]/60 border border-white/10 text-blue-100 rounded-lg px-3 py-2 text-sm resize-none cursor-default focus:outline-none"
          placeholder="Seu texto transformado aparecerá aqui..."
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 justify-end">
      <button
        @click="clearAll"
        class="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-blue-200 hover:bg-white/5 text-sm transition-colors"
      >
        <Icon icon="mdi:trash-can-outline" class="w-4 h-4" />
        Limpar
      </button>
      <button
        @click="copyOutput"
        :class="copied ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-500'"
        class="flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-medium transition-colors"
      >
        <Icon :icon="copied ? 'mdi:check' : 'mdi:content-copy'" class="w-4 h-4" />
        {{ copied ? 'Copiado!' : 'Copiar Texto' }}
      </button>
    </div>
  </div>
</template>
