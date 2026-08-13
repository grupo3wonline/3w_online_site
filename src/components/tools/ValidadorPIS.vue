<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <i class="fas fa-id-card-alt text-amber-600 dark:text-amber-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de PIS/PASEP</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide números de PIS/PASEP</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <BaseInput v-model="pis" label="PIS/PASEP" placeholder="000.00000.00-0" @input="validar" maxlength="14" />
        </div>

        <div v-if="resultado" :class="['rounded-lg p-6 text-center', valido ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
          <i :class="['text-4xl mb-2', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
          <div class="text-xl font-bold" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
            {{ valido ? 'PIS Válido' : 'PIS Inválido' }}
          </div>
        </div>

        <div v-if="valido" class="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
          <div class="font-mono text-2xl text-gray-900 dark:text-white">{{ pisFormatado }}</div>
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

const pis = ref('')
const resultado = ref(false)
const valido = ref(false)

const pisFormatado = computed(() => {
  const nums = pis.value.replace(/\D/g, '')
  if (nums.length !== 11) return nums
  return `${nums.slice(0,3)}.${nums.slice(3,8)}.${nums.slice(8,10)}-${nums.slice(10)}`
})

const validarPIS = (pisStr) => {
  pisStr = pisStr.replace(/\D/g, '')
  if (pisStr.length !== 11) return false
  
  const multiplicadores = [3,2,9,8,7,6,5,4,3,2]
  let soma = 0
  
  for (let i = 0; i < 10; i++) {
    soma += Number.parseInt(pisStr[i]) * multiplicadores[i]
  }
  
  const resto = soma % 11
  const digito = resto < 2 ? 0 : 11 - resto
  
  return digito === Number.parseInt(pisStr[10])
}

const validar = () => {
  if (!pis.value) {
    resultado.value = false
    return
  }

  const nums = pis.value.replace(/\D/g, '')
  
  if (nums.length !== 11) {
    resultado.value = true
    valido.value = false
    return
  }

  valido.value = validarPIS(nums)
  resultado.value = true
  
  trackToolUsage('Validador PIS', 'validate', { valid: valido.value })
}
</script>
