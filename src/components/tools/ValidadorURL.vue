<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
          <i class="fas fa-link text-cyan-600 dark:text-cyan-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de URL</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide e analise URLs completas</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <BaseInput v-model="url" label="URL" placeholder="https://exemplo.com" @input="validar" />
        </div>

        <div v-if="resultado" :class="['rounded-lg p-6 text-center', valido ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
          <i :class="['text-4xl mb-3', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
          <div class="text-xl font-bold mb-1" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
            {{ valido ? 'URL Válida' : 'URL Inválida' }}
          </div>
          <div class="text-sm" :class="valido ? 'text-green-700' : 'text-red-700'">{{ mensagem }}</div>
        </div>

        <div v-if="valido && info" class="space-y-3">
          <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div><span class="text-gray-600 dark:text-gray-400">Protocolo:</span> <strong>{{ info.protocolo }}</strong></div>
              <div><span class="text-gray-600 dark:text-gray-400">Domínio:</span> <strong>{{ info.dominio }}</strong></div>
              <div><span class="text-gray-600 dark:text-gray-400">Porta:</span> <strong>{{ info.porta || 'Padrão' }}</strong></div>
              <div><span class="text-gray-600 dark:text-gray-400">Caminho:</span> <strong>{{ info.caminho || '/' }}</strong></div>
            </div>
          </div>
          <div v-if="info.parametros.length > 0" class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
            <div class="font-semibold text-gray-900 dark:text-white mb-2">Parâmetros ({{ info.parametros.length }})</div>
            <div class="space-y-1 text-xs">
              <div v-for="param in info.parametros" :key="param.chave" class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">{{ param.chave }}:</span>
                <span class="font-mono text-gray-900 dark:text-white">{{ param.valor }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseInput from './common/BaseInput.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const url = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')

const info = computed(() => {
  if (!valido.value) return null
  
  try {
    const urlObj = new URL(url.value)
    const params = []
    urlObj.searchParams.forEach((valor, chave) => {
      params.push({ chave, valor })
    })
    
    return {
      protocolo: urlObj.protocol.replace(':', ''),
      dominio: urlObj.hostname,
      porta: urlObj.port,
      caminho: urlObj.pathname,
      parametros: params
    }
  } catch {
    return null
  }
})

const validar = () => {
  if (!url.value) {
    resultado.value = false
    return
  }

  try {
    new URL(url.value)
    resultado.value = true
    valido.value = true
    mensagem.value = 'URL válida e bem formada'
  } catch {
    resultado.value = true
    valido.value = false
    mensagem.value = 'URL inválida ou mal formada'
  }
  
  trackToolUsage('Validador URL', 'validate', { valid: valido.value })
}
</script>
