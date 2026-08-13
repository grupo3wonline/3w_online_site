<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <i class="fas fa-credit-card text-red-600 dark:text-red-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de Cartão</h1>
        <p class="text-gray-600 dark:text-gray-400">Algoritmo de Luhn</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <BaseInput v-model="cartao" label="Número do Cartão" placeholder="0000 0000 0000 0000" @input="validar" maxlength="19" />
        </div>

        <div v-if="resultado" :class="['rounded-lg p-6 text-center', valido ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
          <i :class="['text-4xl mb-2', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
          <div class="text-xl font-bold" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
            {{ valido ? 'Cartão Válido' : 'Cartão Inválido' }}
          </div>
        </div>

        <div v-if="valido && bandeira" class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <div class="text-center">
            <div class="text-3xl font-bold mb-2" :class="getBandeiraColor()">{{ bandeira }}</div>
            <div class="font-mono text-lg text-gray-600">{{ cartaoFormatado }}</div>
          </div>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
          <div class="text-sm text-red-800 dark:text-red-300">
            <p class="font-semibold mb-1">Algoritmo de Luhn</p>
            <p class="text-xs">Valida checksum mas não verifica se o cartão existe</p>
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

const cartao = ref('')
const resultado = ref(false)
const valido = ref(false)
const bandeira = ref('')

const cartaoFormatado = computed(() => {
  const nums = cartao.value.replace(/\D/g, '')
  return nums.match(/.{1,4}/g)?.join(' ') || nums
})

const validarLuhn = (numero) => {
  let soma = 0
  let dobrar = false
  
  for (let i = numero.length - 1; i >= 0; i--) {
    let digito = Number.parseInt(numero[i])
    
    if (dobrar) {
      digito *= 2
      if (digito > 9) digito -= 9
    }
    
    soma += digito
    dobrar = !dobrar
  }
  
  return soma % 10 === 0
}

const detectarBandeira = (numero) => {
  if (/^4/.test(numero)) return 'Visa'
  if (/^5[1-5]/.test(numero)) return 'Mastercard'
  if (/^3[47]/.test(numero)) return 'American Express'
  if (/^6(?:011|5)/.test(numero)) return 'Discover'
  if (/^35/.test(numero)) return 'JCB'
  return 'Desconhecida'
}

const getBandeiraColor = () => {
  const cores = {
    'Visa': 'text-blue-600',
    'Mastercard': 'text-orange-600',
    'American Express': 'text-green-600',
    'Discover': 'text-purple-600',
    'JCB': 'text-red-600'
  }
  return cores[bandeira.value] || 'text-gray-600'
}

const validar = () => {
  if (!cartao.value) {
    resultado.value = false
    return
  }

  const nums = cartao.value.replace(/\D/g, '')
  
  if (nums.length < 13 || nums.length > 19) {
    resultado.value = true
    valido.value = false
    return
  }

  const isValid = validarLuhn(nums)
  resultado.value = true
  valido.value = isValid
  
  if (isValid) {
    bandeira.value = detectarBandeira(nums)
  }
  
  trackToolUsage('Validador Cartao', 'validate', { valid: isValid })
}
</script>
