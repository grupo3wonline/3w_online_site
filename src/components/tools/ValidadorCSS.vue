<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <i class="fab fa-css3-alt text-blue-600 dark:text-blue-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de CSS</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide código CSS</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <textarea v-model="css" @input="validar" class="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm" placeholder="body { color: #000; }"></textarea>
        </div>

        <div v-if="resultado" class="space-y-4">
          <div :class="['rounded-lg p-6 text-center', valido ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
            <div class="flex items-center justify-center mb-2">
              <i :class="['text-4xl', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
            </div>
            <div :class="['font-semibold', valido ? 'text-green-700' : 'text-red-700']">
              {{ mensagem }}
            </div>
          </div>

          <div v-if="valido" class="grid grid-cols-3 gap-3">
            <div class="bg-white dark:bg-gray-700 rounded p-3 text-center">
              <div class="text-xs text-gray-500">Seletores</div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.seletores }}</div>
            </div>
            <div class="bg-white dark:bg-gray-700 rounded p-3 text-center">
              <div class="text-xs text-gray-500">Propriedades</div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.propriedades }}</div>
            </div>
            <div class="bg-white dark:bg-gray-700 rounded p-3 text-center">
              <div class="text-xs text-gray-500">Linhas</div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.linhas }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const css = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')

const stats = computed(() => ({
  seletores: (css.value.match(/[^{}]+(?={)/g) || []).length,
  propriedades: (css.value.match(/[^:]+:[^;]+;/g) || []).length,
  linhas: css.value.split('\n').length
}))

const validar = () => {
  if (!css.value.trim()) {
    resultado.value = false
    return
  }

  let abreChaves = 0
  let fechaChaves = 0
  
  for (const char of css.value) {
    if (char === '{') abreChaves++
    if (char === '}') fechaChaves++
  }
  
  if (abreChaves !== fechaChaves) {
    valido.value = false
    mensagem.value = 'CSS inválido - Chaves não balanceadas'
  } else {
    valido.value = true
    mensagem.value = 'CSS válido'
  }
  
  resultado.value = true
  trackToolUsage('Validador CSS', 'validate', { valido: valido.value })
}
</script>
