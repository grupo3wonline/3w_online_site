<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <i class="fas fa-building text-green-600 dark:text-green-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de CNPJ</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide números de CNPJ brasileiros</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <BaseInput v-model="cnpj" label="CNPJ" placeholder="00.000.000/0000-00" @input="validar" maxlength="18" />
        </div>

        <div v-if="resultado" class="space-y-4">
          <div :class="['rounded-lg p-8 text-center', valido ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30' : 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30']">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" :class="valido ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'">
              <i :class="['text-4xl', valido ? 'fas fa-check text-green-600 dark:text-green-400' : 'fas fa-times text-red-600 dark:text-red-400']"></i>
            </div>
            <div class="text-2xl font-bold mb-2" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
              {{ valido ? 'CNPJ Válido' : 'CNPJ Inválido' }}
            </div>
            <div class="text-sm" :class="valido ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
              {{ mensagem }}
            </div>
          </div>

          <div v-if="valido" class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Informações</h4>
            <div class="space-y-3">
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">CNPJ Formatado</span>
                <span class="font-mono font-semibold text-gray-900 dark:text-white">{{ cnpjFormatado }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Raiz</span>
                <span class="font-mono text-gray-900 dark:text-white">{{ cnpjNumeros.slice(0,8) }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Filial</span>
                <span class="font-mono text-gray-900 dark:text-white">{{ cnpjNumeros.slice(8,12) }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="text-gray-600 dark:text-gray-400">Dígitos Verificadores</span>
                <span class="font-mono font-semibold text-green-600 dark:text-green-400">{{ cnpjNumeros.slice(12) }}</span>
              </div>
            </div>
            
            <BaseButton @click="copiar" variant="secondary" class="w-full mt-4">
              <i class="fas fa-copy mr-2"></i>Copiar CNPJ
            </BaseButton>
          </div>
        </div>

        <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
          <div class="text-sm text-green-800 dark:text-green-300">
            <p class="font-semibold mb-1">Formato: 00.000.000/0000-00</p>
            <p class="text-xs">14 dígitos com validação por módulo 11</p>
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

const cnpj = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')

const cnpjNumeros = computed(() => cnpj.value.replace(/\D/g, ''))

const cnpjFormatado = computed(() => {
  const num = cnpjNumeros.value
  if (num.length !== 14) return num
  return `${num.slice(0,2)}.${num.slice(2,5)}.${num.slice(5,8)}/${num.slice(8,12)}-${num.slice(12)}`
})

const validarCNPJ = (cnpjStr) => {
  cnpjStr = cnpjStr.replace(/\D/g, '')
  
  if (cnpjStr.length !== 14) return false
  if (/^(\d)\1{13}$/.test(cnpjStr)) return false

  const calcularDigito = (cnpj, peso) => {
    let soma = 0
    for (let i = 0; i < peso.length; i++) {
      soma += Number.parseInt(cnpj.charAt(i)) * peso[i]
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const peso1 = [5,4,3,2,9,8,7,6,5,4,3,2]
  const peso2 = [6,5,4,3,2,9,8,7,6,5,4,3,2]

  const digito1 = calcularDigito(cnpjStr, peso1)
  const digito2 = calcularDigito(cnpjStr, peso2)

  return Number.parseInt(cnpjStr.charAt(12)) === digito1 && Number.parseInt(cnpjStr.charAt(13)) === digito2
}

const validar = () => {
  const num = cnpjNumeros.value
  
  if (num.length === 0) {
    resultado.value = false
    return
  }

  if (num.length !== 14) {
    resultado.value = true
    valido.value = false
    mensagem.value = 'CNPJ deve ter 14 dígitos'
    return
  }

  const isValid = validarCNPJ(num)
  resultado.value = true
  valido.value = isValid
  mensagem.value = isValid ? 'CNPJ válido e verificado' : 'CNPJ inválido ou dígitos verificadores incorretos'
  
  trackToolUsage('Validador CNPJ', 'validate', { valid: isValid })
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(cnpjFormatado.value)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 2000 })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}
</script>
