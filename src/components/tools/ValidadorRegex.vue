<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-4">
          <i class="fas fa-search text-pink-600 dark:text-pink-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Testador de Regex</h1>
        <p class="text-gray-600 dark:text-gray-400">Teste expressões regulares</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <BaseInput v-model="pattern" label="Expressão Regular" placeholder="[A-Z]{3}-\d{4}" @input="testar" />
          <div class="flex gap-2">
            <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input v-model="flags.g" type="checkbox" @change="testar" class="rounded"> Global (g)
            </label>
            <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input v-model="flags.i" type="checkbox" @change="testar" class="rounded"> Case-insensitive (i)
            </label>
            <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input v-model="flags.m" type="checkbox" @change="testar" class="rounded"> Multiline (m)
            </label>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Texto para Testar</label>
          <textarea v-model="texto" @input="testar" class="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Digite o texto aqui"></textarea>
        </div>

        <div v-if="resultado" class="space-y-4">
          <div :class="['rounded-lg p-6', matches.length > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20']">
            <div class="text-center">
              <div class="text-3xl font-bold mb-2" :class="matches.length > 0 ? 'text-green-600' : 'text-yellow-600'">
                {{ matches.length }}
              </div>
              <div class="text-sm" :class="matches.length > 0 ? 'text-green-700' : 'text-yellow-700'">
                {{ matches.length === 0 ? 'Nenhuma correspondência' : matches.length === 1 ? 'correspondência encontrada' : 'correspondências encontradas' }}
              </div>
            </div>
          </div>

          <div v-if="matches.length > 0" class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Correspondências</h4>
            <div class="space-y-2">
              <div v-for="(match, i) in matches" :key="i" class="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <div class="font-mono text-green-900 dark:text-green-300">{{ match }}</div>
              </div>
            </div>
          </div>

          <div v-if="textoHighlighted" class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Texto com Destaques</h4>
            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm whitespace-pre-wrap" v-html="textoHighlighted"></div>
          </div>
        </div>

        <div v-if="erro" class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
          <div class="text-sm text-red-800 dark:text-red-300">
            <p class="font-semibold">Erro na Regex</p>
            <p class="text-xs">{{ erro }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const pattern = ref('')
const texto = ref('')
const flags = ref({ g: true, i: false, m: false })
const resultado = ref(false)
const matches = ref([])
const erro = ref('')
const textoHighlighted = ref('')

const testar = () => {
  if (!pattern.value || !texto.value) {
    resultado.value = false
    return
  }

  try {
    const flagStr = (flags.value.g ? 'g' : '') + (flags.value.i ? 'i' : '') + (flags.value.m ? 'm' : '')
    const regex = new RegExp(pattern.value, flagStr)
    
    const found = texto.value.match(regex) || []
    matches.value = found
    
    let highlighted = texto.value
    if (found.length > 0) {
      found.forEach(match => {
        highlighted = highlighted.replace(match, `<mark class="bg-yellow-300 dark:bg-yellow-600">${match}</mark>`)
      })
    }
    textoHighlighted.value = highlighted
    
    resultado.value = true
    erro.value = ''
    
    trackToolUsage('Validador Regex', 'test', { matches: found.length })
  } catch (e) {
    erro.value = e.message
    resultado.value = false
  }
}
</script>
