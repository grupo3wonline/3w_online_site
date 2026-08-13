<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full mb-4">
          <i class="fas fa-file-code text-rose-600 dark:text-rose-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de XML</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide estrutura XML</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <textarea v-model="xml" @input="validar" class="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm" placeholder="<root>...</root>"></textarea>
        </div>

        <div v-if="resultado" :class="['rounded-lg p-6 text-center', valido ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
          <i :class="['text-4xl mb-2', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
          <div class="text-xl font-bold" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
            {{ valido ? 'XML Válido' : 'XML Inválido' }}
          </div>
          <div class="text-sm mt-1" :class="valido ? 'text-green-700' : 'text-red-700'">{{ mensagem }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const xml = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')

const validar = () => {
  if (!xml.value) {
    resultado.value = false
    return
  }

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml.value, 'text/xml')
    const erros = doc.getElementsByTagName('parsererror')
    
    if (erros.length > 0) {
      resultado.value = true
      valido.value = false
      mensagem.value = 'XML mal formado'
    } else {
      resultado.value = true
      valido.value = true
      mensagem.value = 'XML bem formado'
    }
    
    trackToolUsage('Validador XML', 'validate', { valid: valido.value })
  } catch (e) {
    resultado.value = true
    valido.value = false
    mensagem.value = e.message
  }
}
</script>
