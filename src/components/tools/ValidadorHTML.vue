<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
          <i class="fab fa-html5 text-orange-600 dark:text-orange-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de HTML</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide estrutura HTML</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <textarea v-model="html" @input="validar" class="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm" placeholder="<!DOCTYPE html>..."></textarea>
        </div>

        <div v-if="resultado" class="space-y-4">
          <div :class="['rounded-lg p-6 text-center', problemas.length === 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20']">
            <div class="text-3xl font-bold mb-2" :class="problemas.length === 0 ? 'text-green-600' : 'text-yellow-600'">
              {{ problemas.length }}
            </div>
            <div class="text-sm" :class="problemas.length === 0 ? 'text-green-700' : 'text-yellow-700'">
              {{ problemas.length === 0 ? 'Nenhum problema encontrado' : 'problemas encontrados' }}
            </div>
          </div>

          <div v-if="problemas.length > 0" class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Problemas</h4>
            <div class="space-y-2">
              <div v-for="(prob, i) in problemas" :key="i" class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm text-yellow-900 dark:text-yellow-300">
                <i class="fas fa-exclamation-triangle mr-2"></i>{{ prob }}
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="bg-white dark:bg-gray-700 rounded p-3 text-center">
              <div class="text-xs text-gray-500">Tags</div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.tags }}</div>
            </div>
            <div class="bg-white dark:bg-gray-700 rounded p-3 text-center">
              <div class="text-xs text-gray-500">Linhas</div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.linhas }}</div>
            </div>
            <div class="bg-white dark:bg-gray-700 rounded p-3 text-center">
              <div class="text-xs text-gray-500">Caracteres</div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.caracteres }}</div>
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

const html = ref('')
const resultado = ref(false)
const problemas = ref([])

const stats = computed(() => ({
  tags: (html.value.match(/<[^>]+>/g) || []).length,
  linhas: html.value.split('\n').length,
  caracteres: html.value.length
}))

const validar = () => {
  if (!html.value) {
    resultado.value = false
    return
  }

  const probs = []
  
  if (!html.value.includes('<!DOCTYPE')) probs.push('DOCTYPE não declarado')
  if (!html.value.includes('<html')) probs.push('Tag <html> não encontrada')
  if (!html.value.includes('<head')) probs.push('Tag <head> não encontrada')
  if (!html.value.includes('<body')) probs.push('Tag <body> não encontrada')
  
  const tagsAbertura = (html.value.match(/<(\w+)(?:\s|>)/g) || []).map(t => t.match(/<(\w+)/)[1])
  const tagsFechamento = (html.value.match(/<\/(\w+)>/g) || []).map(t => t.match(/<\/(\w+)>/)[1])
  
  const autoFechamento = ['img', 'br', 'hr', 'input', 'meta', 'link']
  tagsAbertura.forEach(tag => {
    if (!autoFechamento.includes(tag) && !tagsFechamento.includes(tag)) {
      probs.push(`Tag <${tag}> não foi fechada`)
    }
  })
  
  problemas.value = probs
  resultado.value = true
  
  trackToolUsage('Validador HTML', 'validate', { problems: probs.length })
}
</script>
