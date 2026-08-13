<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <i class="fas fa-phone text-indigo-600 dark:text-indigo-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de Telefone</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide números brasileiros (fixo e celular)</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <BaseInput v-model="telefone" label="Telefone" placeholder="(00) 00000-0000" @input="validar" maxlength="15" />
        </div>

        <div v-if="resultado" :class="['rounded-lg p-6', valido ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
          <div class="text-center">
            <i :class="['text-4xl mb-2', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
            <div class="text-xl font-bold" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
              {{ valido ? 'Telefone Válido' : 'Telefone Inválido' }}
            </div>
            <div class="text-sm mt-1" :class="valido ? 'text-green-700' : 'text-red-700'">{{ mensagem }}</div>
          </div>
        </div>

        <div v-if="valido && info" class="grid md:grid-cols-3 gap-3">
          <div class="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-xs text-gray-500 dark:text-gray-400">DDD</div>
            <div class="text-2xl font-bold text-indigo-600">{{ info.ddd }}</div>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-xs text-gray-500 dark:text-gray-400">Número</div>
            <div class="text-xl font-mono text-gray-900 dark:text-white">{{ info.numero }}</div>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-xs text-gray-500 dark:text-gray-400">Tipo</div>
            <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ info.tipo }}</div>
          </div>
        </div>

        <div class="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4">
          <div class="text-sm text-indigo-800 dark:text-indigo-300">
            <p class="font-semibold mb-1">Formatos aceitos:</p>
            <p class="text-xs">• Celular: (00) 90000-0000 ou (00) 00000-0000</p>
            <p class="text-xs">• Fixo: (00) 0000-0000</p>
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

const telefone = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')

const info = computed(() => {
  if (!valido.value) return null
  
  const nums = telefone.value.replace(/\D/g, '')
  const ddd = nums.slice(0, 2)
  const numero = nums.slice(2)
  const tipo = numero.length === 9 ? 'Celular' : 'Fixo'
  
  return { ddd, numero, tipo }
})

const validar = () => {
  if (!telefone.value) {
    resultado.value = false
    return
  }

  const nums = telefone.value.replace(/\D/g, '')
  
  if (nums.length < 10 || nums.length > 11) {
    resultado.value = true
    valido.value = false
    mensagem.value = 'Telefone deve ter 10 ou 11 dígitos'
    return
  }

  const ddd = Number.parseInt(nums.slice(0, 2))
  const dddsValidos = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99]
  
  if (!dddsValidos.includes(ddd)) {
    resultado.value = true
    valido.value = false
    mensagem.value = 'DDD inválido'
    return
  }

  if (nums.length === 11 && nums[2] !== '9') {
    resultado.value = true
    valido.value = false
    mensagem.value = 'Celular deve começar com 9'
    return
  }

  resultado.value = true
  valido.value = true
  mensagem.value = `Telefone ${nums.length === 11 ? 'celular' : 'fixo'} válido`
  
  trackToolUsage('Validador Telefone', 'validate', { valid: true })
}
</script>
