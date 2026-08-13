<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
          <i class="fas fa-car text-teal-600 dark:text-teal-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de RENAVAM</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide códigos RENAVAM</p>
      </div>

      <div class="space-y-6">
        <BaseInput v-model="renavam" label="RENAVAM" placeholder="00000000000" @input="validar" />

        <div v-if="resultado" class="space-y-4">
          <div :class="['rounded-lg p-6 text-center', valido ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
            <div class="flex items-center justify-center mb-2">
              <i :class="['text-4xl', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
            </div>
            <div :class="['font-semibold', valido ? 'text-green-700' : 'text-red-700']">
              {{ mensagem }}
            </div>
          </div>

          <div v-if="valido" class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <div class="text-3xl font-bold text-center text-gray-900 dark:text-white font-mono">
              {{ renavamFormatado }}
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
import BaseInput from './common/BaseInput.vue'

const { trackToolUsage } = useAnalytics()

const renavam = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')

const renavamFormatado = computed(() => {
  const nums = renavam.value.replace(/\D/g, '')
  return nums.padStart(11, '0')
})

const validar = () => {
  if (!renavam.value) {
    resultado.value = false
    return
  }

  const nums = renavam.value.replace(/\D/g, '').padStart(11, '0')

  if (nums.length !== 11) {
    valido.value = false
    mensagem.value = 'O RENAVAM deve ter 11 dígitos'
    resultado.value = true
    return
  }

  const sequencia = '3298765432'
  let soma = 0

  for (let i = 0; i < 10; i++) {
    soma += parseInt(nums[i]) * parseInt(sequencia[i])
  }

  const digitoCalculado = (soma * 10) % 11
  const digitoFinal = digitoCalculado === 10 ? 0 : digitoCalculado
  const digitoInformado = parseInt(nums[10])

  if (digitoFinal === digitoInformado) {
    valido.value = true
    mensagem.value = 'RENAVAM válido'
  } else {
    valido.value = false
    mensagem.value = 'RENAVAM inválido'
  }

  resultado.value = true
  trackToolUsage('Validador RENAVAM', 'validate', { valido: valido.value })
}
</script>
