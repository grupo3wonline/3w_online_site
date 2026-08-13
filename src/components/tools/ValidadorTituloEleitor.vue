<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <i class="fas fa-vote-yea text-indigo-600 dark:text-indigo-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de Título de Eleitor</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide títulos de eleitor brasileiros</p>
      </div>

      <div class="space-y-6">
        <BaseInput v-model="titulo" label="Título de Eleitor" placeholder="0000 0000 0000" @input="validar" />

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
              {{ tituloFormatado }}
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-gray-50 dark:bg-gray-600 rounded p-3 text-center">
                <div class="text-xs text-gray-500 dark:text-gray-400">Estado</div>
                <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ uf }}</div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-600 rounded p-3 text-center">
                <div class="text-xs text-gray-500 dark:text-gray-400">Dígitos</div>
                <div class="text-lg font-semibold text-gray-900 dark:text-white font-mono">{{ digitos }}</div>
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

const titulo = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')
const uf = ref('')
const digitos = ref('')

const tituloFormatado = computed(() => {
  const nums = titulo.value.replace(/\D/g, '')
  if (nums.length === 12) {
    return `${nums.slice(0, 4)} ${nums.slice(4, 8)} ${nums.slice(8, 12)}`
  }
  return titulo.value
})

const validar = () => {
  if (!titulo.value) {
    resultado.value = false
    return
  }

  const nums = titulo.value.replace(/\D/g, '')

  if (nums.length !== 12) {
    valido.value = false
    mensagem.value = 'O título deve ter 12 dígitos'
    resultado.value = true
    return
  }

  const ufCodes = {
    '01': 'SP', '02': 'MG', '03': 'RJ', '04': 'RS', '05': 'BA', '06': 'PR',
    '07': 'CE', '08': 'PE', '09': 'SC', '10': 'GO', '11': 'PB', '12': 'MT',
    '13': 'ES', '14': 'PI', '15': 'RN', '16': 'AL', '17': 'MA', '18': 'MS',
    '19': 'DF', '20': 'SE', '21': 'RO', '22': 'AC', '23': 'AM', '24': 'RR',
    '25': 'AP', '26': 'PA', '27': 'TO', '28': 'EX'
  }

  const codigoUF = nums.slice(8, 10)
  const d1 = parseInt(nums[10])
  const d2 = parseInt(nums[11])

  const primeiroDigito = (parseInt(nums.slice(0, 8)) % 11) % 10
  const segundoDigito = (parseInt(nums.slice(8, 11)) % 11) % 10

  if (primeiroDigito === d1 && segundoDigito === d2 && ufCodes[codigoUF]) {
    valido.value = true
    mensagem.value = 'Título de Eleitor válido'
    uf.value = ufCodes[codigoUF]
    digitos.value = `${d1}${d2}`
  } else {
    valido.value = false
    mensagem.value = 'Título de Eleitor inválido'
  }

  resultado.value = true
  trackToolUsage('Validador Título de Eleitor', 'validate', { valido: valido.value })
}
</script>
