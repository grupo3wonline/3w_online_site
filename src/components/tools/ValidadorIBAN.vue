<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
          <i class="fas fa-university text-emerald-600 dark:text-emerald-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de IBAN</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide números IBAN internacionais</p>
      </div>

      <div class="space-y-6">
        <BaseInput v-model="iban" label="IBAN" placeholder="BR1800000000141455123924100C2" @input="validar" />

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
            <div class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4 font-mono break-all">
              {{ ibanFormatado }}
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-gray-50 dark:bg-gray-600 rounded p-3 text-center">
                <div class="text-xs text-gray-500 dark:text-gray-400">País</div>
                <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ pais }}</div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-600 rounded p-3 text-center">
                <div class="text-xs text-gray-500 dark:text-gray-400">Check Digits</div>
                <div class="text-lg font-semibold text-gray-900 dark:text-white font-mono">{{ checkDigits }}</div>
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
import { useAnalytics } from '../../composables/useAnalytics'
import BaseInput from './common/BaseInput.vue'

const { trackToolUsage } = useAnalytics()

const iban = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')
const pais = ref('')
const checkDigits = ref('')

const ibanFormatado = computed(() => {
  const limpo = iban.value.toUpperCase().replace(/\s/g, '')
  return limpo.match(/.{1,4}/g)?.join(' ') || limpo
})

const mod97 = (str) => {
  let remainder = str
  while (remainder.length > 2) {
    const block = remainder.slice(0, 9)
    remainder = (Number.parseInt(block, 10) % 97).toString() + remainder.slice(block.length)
  }
  return Number.parseInt(remainder, 10) % 97
}

const validar = () => {
  if (!iban.value) {
    resultado.value = false
    return
  }

  const limpo = iban.value.toUpperCase().replace(/\s/g, '')

  if (limpo.length < 15 || limpo.length > 34) {
    valido.value = false
    mensagem.value = 'IBAN deve ter entre 15 e 34 caracteres'
    resultado.value = true
    return
  }

  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(limpo)) {
    valido.value = false
    mensagem.value = 'Formato IBAN inválido'
    resultado.value = true
    return
  }

  const rearranged = limpo.slice(4) + limpo.slice(0, 4)
  const numeric = rearranged.replace(/[A-Z]/g, char => char.charCodeAt(0) - 55)

  if (mod97(numeric) === 1) {
    valido.value = true
    mensagem.value = 'IBAN válido'
    pais.value = limpo.slice(0, 2)
    checkDigits.value = limpo.slice(2, 4)
  } else {
    valido.value = false
    mensagem.value = 'IBAN inválido'
  }

  resultado.value = true
  trackToolUsage('Validador IBAN', 'validate', { valido: valido.value })
}
</script>
