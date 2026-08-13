<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
          <i class="fas fa-map-marked-alt text-orange-600 dark:text-orange-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de CEP</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide CEPs brasileiros</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <BaseInput v-model="cep" label="CEP" placeholder="00000-000" @input="validar" maxlength="9" />
        </div>

        <div v-if="resultado" :class="['rounded-lg p-6 text-center', valido ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
          <i :class="['text-4xl mb-2', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
          <div class="text-xl font-bold" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
            {{ valido ? 'CEP Válido' : 'CEP Inválido' }}
          </div>
          <div class="text-sm mt-1" :class="valido ? 'text-green-700' : 'text-red-700'">{{ mensagem }}</div>
        </div>

        <div v-if="valido" class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="font-mono text-center text-2xl text-gray-900 dark:text-white">{{ cepFormatado }}</div>
        </div>

        <div class="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4">
          <div class="text-sm text-orange-800 dark:text-orange-300">
            <p class="font-semibold">Formato: 00000-000</p>
            <p class="text-xs mt-1">8 dígitos numéricos</p>
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

const cep = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')

const cepFormatado = computed(() => {
  const nums = cep.value.replace(/\D/g, '')
  if (nums.length !== 8) return nums
  return `${nums.slice(0,5)}-${nums.slice(5)}`
})

const validar = () => {
  if (!cep.value) {
    resultado.value = false
    return
  }

  const nums = cep.value.replace(/\D/g, '')
  
  if (nums.length !== 8) {
    resultado.value = true
    valido.value = false
    mensagem.value = 'CEP deve ter 8 dígitos'
    return
  }

  resultado.value = true
  valido.value = true
  mensagem.value = 'CEP com formato válido'
  
  trackToolUsage('Validador CEP', 'validate', { valid: true })
}
</script>
