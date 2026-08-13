<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <i class="fas fa-id-card text-blue-600 dark:text-blue-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de CPF</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide números de CPF brasileiros</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <BaseInput v-model="cpf" label="CPF" placeholder="000.000.000-00" @input="validar" maxlength="14" />
        </div>

        <div v-if="resultado" class="space-y-4">
          <div :class="['rounded-lg p-8 text-center', valido ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30' : 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30']">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" :class="valido ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'">
              <i :class="['text-4xl', valido ? 'fas fa-check text-green-600 dark:text-green-400' : 'fas fa-times text-red-600 dark:text-red-400']"></i>
            </div>
            <div class="text-2xl font-bold mb-2" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
              {{ valido ? 'CPF Válido' : 'CPF Inválido' }}
            </div>
            <div class="text-sm" :class="valido ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
              {{ mensagem }}
            </div>
          </div>

          <div v-if="valido" class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Informações</h4>
            <div class="space-y-3">
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">CPF Formatado</span>
                <span class="font-mono font-semibold text-gray-900 dark:text-white">{{ cpfFormatado }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Apenas Números</span>
                <span class="font-mono font-semibold text-gray-900 dark:text-white">{{ cpfNumeros }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="text-gray-600 dark:text-gray-400">Dígitos Verificadores</span>
                <span class="font-mono font-semibold text-blue-600 dark:text-blue-400">{{ digitos }}</span>
              </div>
            </div>
            
            <BaseButton @click="copiar" variant="secondary" class="w-full mt-4">
              <i class="fas fa-copy mr-2"></i>Copiar CPF
            </BaseButton>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
            <div class="text-sm text-blue-800 dark:text-blue-300">
              <p class="font-semibold mb-1">Formato Válido</p>
              <p class="text-xs">000.000.000-00 ou 00000000000</p>
            </div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
            <div class="text-sm text-purple-800 dark:text-purple-300">
              <p class="font-semibold mb-1">Algoritmo</p>
              <p class="text-xs">Validação por dígitos verificadores</p>
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
import BaseInput from './common/BaseInput.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const cpf = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')

const cpfNumeros = computed(() => cpf.value.replace(/\D/g, ''))

const cpfFormatado = computed(() => {
  const num = cpfNumeros.value
  if (num.length !== 11) return num
  return `${num.slice(0,3)}.${num.slice(3,6)}.${num.slice(6,9)}-${num.slice(9)}`
})

const digitos = computed(() => {
  const num = cpfNumeros.value
  if (num.length !== 11) return ''
  return num.slice(9)
})

const validarCPF = (cpfStr) => {
  cpfStr = cpfStr.replace(/\D/g, '')
  
  if (cpfStr.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpfStr)) return false

  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += Number.parseInt(cpfStr.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  let digito1 = resto >= 10 ? 0 : resto

  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += Number.parseInt(cpfStr.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  let digito2 = resto >= 10 ? 0 : resto

  return Number.parseInt(cpfStr.charAt(9)) === digito1 && Number.parseInt(cpfStr.charAt(10)) === digito2
}

const validar = () => {
  const num = cpfNumeros.value
  
  if (num.length === 0) {
    resultado.value = false
    return
  }

  if (num.length !== 11) {
    resultado.value = true
    valido.value = false
    mensagem.value = 'CPF deve ter 11 dígitos'
    return
  }

  const isValid = validarCPF(num)
  resultado.value = true
  valido.value = isValid
  mensagem.value = isValid ? 'CPF válido e verificado' : 'CPF inválido ou dígitos verificadores incorretos'
  
  trackToolUsage('Validador CPF', 'validate', { valid: isValid })
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(cpfFormatado.value)
    Swal.fire({ icon: 'success', title: 'Copiado!', text: 'CPF copiado para a área de transferência', timer: 2000 })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}
</script>
