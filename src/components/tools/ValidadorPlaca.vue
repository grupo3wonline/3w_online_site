<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
          <i class="fas fa-car text-teal-600 dark:text-teal-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de Placa</h1>
        <p class="text-gray-600 dark:text-gray-400">Placas brasileiras (antigas e Mercosul)</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <BaseInput v-model="placa" label="Placa" placeholder="ABC-1234 ou ABC1D23" @input="validar" maxlength="8" />
        </div>

        <div v-if="resultado" :class="['rounded-lg p-6 text-center', valido ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
          <i :class="['text-4xl mb-2', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
          <div class="text-xl font-bold" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
            {{ valido ? 'Placa Válida' : 'Placa Inválida' }}
          </div>
          <div class="text-sm mt-1" :class="valido ? 'text-green-700' : 'text-red-700'">{{ mensagem }}</div>
        </div>

        <div v-if="valido" class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <div class="text-center">
            <div class="text-3xl font-mono font-bold text-gray-900 dark:text-white mb-2">{{ placaFormatada }}</div>
            <div class="inline-block px-4 py-2 rounded-full" :class="tipo === 'Mercosul' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'">
              {{ tipo }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const placa = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')
const placaFormatada = ref('')
const tipo = ref('')

const validar = () => {
  if (!placa.value) {
    resultado.value = false
    return
  }

  const limpa = placa.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
  
  const antiga = /^[A-Z]{3}\d{4}$/
  const mercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/
  
  if (antiga.test(limpa)) {
    resultado.value = true
    valido.value = true
    mensagem.value = 'Placa no formato antigo'
    placaFormatada.value = `${limpa.slice(0,3)}-${limpa.slice(3)}`
    tipo.value = 'Antiga'
  } else if (mercosul.test(limpa)) {
    resultado.value = true
    valido.value = true
    mensagem.value = 'Placa no formato Mercosul'
    placaFormatada.value = `${limpa.slice(0,3)}${limpa.slice(3,4)}${limpa.slice(4,5)}${limpa.slice(5)}`
    tipo.value = 'Mercosul'
  } else {
    resultado.value = true
    valido.value = false
    mensagem.value = 'Formato inválido'
  }
  
  trackToolUsage('Validador Placa', 'validate', { valid: valido.value })
}
</script>
