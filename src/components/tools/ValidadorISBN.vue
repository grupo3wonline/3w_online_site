<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <i class="fas fa-book text-amber-600 dark:text-amber-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de ISBN</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide códigos ISBN-10 e ISBN-13</p>
      </div>

      <div class="space-y-6">
        <BaseInput v-model="isbn" label="ISBN" placeholder="978-3-16-148410-0" @input="validar" />

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
            <div class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4 font-mono">
              {{ isbnFormatado }}
            </div>
            <div class="text-center">
              <span :class="['px-3 py-1 rounded text-sm font-semibold', tipo === 'ISBN-13' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800']">
                {{ tipo }}
              </span>
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

const isbn = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')
const tipo = ref('')

const isbnFormatado = computed(() => {
  const nums = isbn.value.replace(/\D/g, '')
  if (nums.length === 10) {
    return nums
  } else if (nums.length === 13) {
    return `${nums.slice(0, 3)}-${nums.slice(3, 4)}-${nums.slice(4, 6)}-${nums.slice(6, 12)}-${nums.slice(12)}`
  }
  return isbn.value
})

const validarISBN10 = (nums) => {
  if (nums.length !== 10) return false
  
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += Number.parseInt(nums[i]) * (10 - i)
  }
  
  const checkDigit = nums[9].toUpperCase() === 'X' ? 10 : Number.parseInt(nums[9])
  soma += checkDigit
  
  return soma % 11 === 0
}

const validarISBN13 = (nums) => {
  if (nums.length !== 13) return false
  
  let soma = 0
  for (let i = 0; i < 12; i++) {
    soma += Number.parseInt(nums[i]) * (i % 2 === 0 ? 1 : 3)
  }
  
  const checkDigit = (10 - (soma % 10)) % 10
  return checkDigit === Number.parseInt(nums[12])
}

const validar = () => {
  if (!isbn.value) {
    resultado.value = false
    return
  }

  const nums = isbn.value.replace(/\D/g, '').toUpperCase()

  if (nums.length === 10) {
    if (validarISBN10(nums)) {
      valido.value = true
      tipo.value = 'ISBN-10'
      mensagem.value = 'ISBN-10 válido'
    } else {
      valido.value = false
      mensagem.value = 'ISBN-10 inválido'
    }
  } else if (nums.length === 13) {
    if (validarISBN13(nums)) {
      valido.value = true
      tipo.value = 'ISBN-13'
      mensagem.value = 'ISBN-13 válido'
    } else {
      valido.value = false
      mensagem.value = 'ISBN-13 inválido'
    }
  } else {
    valido.value = false
    mensagem.value = 'ISBN deve ter 10 ou 13 dígitos'
  }

  resultado.value = true
  trackToolUsage('Validador ISBN', 'validate', { valido: valido.value, tipo: tipo.value })
}
</script>
