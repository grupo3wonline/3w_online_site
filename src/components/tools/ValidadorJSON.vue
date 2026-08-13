<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <i class="fas fa-code text-green-600 dark:text-green-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de JSON</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide e formate código JSON</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <textarea v-model="json" @input="validar" class="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm" placeholder='{"chave": "valor"}'></textarea>
        </div>

        <div v-if="resultado" :class="['rounded-lg p-6', valido ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
          <div class="flex items-center gap-3">
            <i :class="['text-3xl', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
            <div>
              <div class="font-bold text-lg" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
                {{ valido ? 'JSON Válido' : 'JSON Inválido' }}
              </div>
              <div class="text-sm" :class="valido ? 'text-green-700' : 'text-red-700'">{{ mensagem }}</div>
            </div>
          </div>
        </div>

        <div v-if="valido" class="space-y-3">
          <div class="flex gap-2">
            <BaseButton @click="formatar" variant="primary" class="flex-1">
              <i class="fas fa-indent mr-2"></i>Formatar
            </BaseButton>
            <BaseButton @click="minificar" variant="secondary" class="flex-1">
              <i class="fas fa-compress mr-2"></i>Minificar
            </BaseButton>
          </div>
          
          <div class="grid grid-cols-3 gap-3 text-sm">
            <div class="bg-white dark:bg-gray-700 rounded p-3 text-center">
              <div class="text-gray-500 dark:text-gray-400">Linhas</div>
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ stats.linhas }}</div>
            </div>
            <div class="bg-white dark:bg-gray-700 rounded p-3 text-center">
              <div class="text-gray-500 dark:text-gray-400">Caracteres</div>
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ stats.caracteres }}</div>
            </div>
            <div class="bg-white dark:bg-gray-700 rounded p-3 text-center">
              <div class="text-gray-500 dark:text-gray-400">Tamanho</div>
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ stats.tamanho }} KB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const json = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')

const stats = computed(() => {
  if (!valido.value) return { linhas: 0, caracteres: 0, tamanho: 0 }
  return {
    linhas: json.value.split('\n').length,
    caracteres: json.value.length,
    tamanho: (new Blob([json.value]).size / 1024).toFixed(2)
  }
})

const validar = () => {
  if (!json.value) {
    resultado.value = false
    return
  }

  try {
    JSON.parse(json.value)
    resultado.value = true
    valido.value = true
    mensagem.value = 'JSON válido e bem formado'
    trackToolUsage('Validador JSON', 'validate', { valid: true })
  } catch (e) {
    resultado.value = true
    valido.value = false
    mensagem.value = e.message
  }
}

const formatar = () => {
  try {
    const obj = JSON.parse(json.value)
    json.value = JSON.stringify(obj, null, 2)
    Swal.fire({ icon: 'success', title: 'Formatado!', timer: 1500 })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao formatar' })
  }
}

const minificar = () => {
  try {
    const obj = JSON.parse(json.value)
    json.value = JSON.stringify(obj)
    Swal.fire({ icon: 'success', title: 'Minificado!', timer: 1500 })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao minificar' })
  }
}
</script>
