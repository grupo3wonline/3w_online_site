<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-network-wired text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de IP</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide endereços IPv4 e IPv6</p>
      </div>

      <div class="space-y-6">
        <BaseInput v-model="ip" label="Endereço IP" placeholder="192.168.0.1 ou 2001:0db8::1" @input="validar" />

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
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="text-xs text-gray-500 mb-1">Versão</div>
                <div class="text-lg font-semibold text-gray-900 dark:text-white">
                  <span :class="['px-2 py-1 rounded text-sm', tipo === 'IPv4' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800']">
                    {{ tipo }}
                  </span>
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">Formato</div>
                <div class="text-lg font-semibold text-gray-900 dark:text-white font-mono">{{ ipFormatado }}</div>
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

const ip = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')
const tipo = ref('')

const ipFormatado = computed(() => ip.value)

const validar = () => {
  if (!ip.value) {
    resultado.value = false
    return
  }

  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){7}[0-9a-fA-F]{0,4}$|^([0-9a-fA-F]{0,4}:){1,7}:|^:((:[0-9a-fA-F]{0,4}){1,7}|:)$/

  if (ipv4Regex.test(ip.value)) {
    const partes = ip.value.split('.')
    const todosValidos = partes.every(p => {
      const num = parseInt(p)
      return num >= 0 && num <= 255
    })
    
    if (todosValidos) {
      valido.value = true
      tipo.value = 'IPv4'
      mensagem.value = 'Endereço IPv4 válido'
    } else {
      valido.value = false
      mensagem.value = 'Endereço IPv4 inválido - Octetos fora do intervalo (0-255)'
    }
  } else if (ipv6Regex.test(ip.value)) {
    valido.value = true
    tipo.value = 'IPv6'
    mensagem.value = 'Endereço IPv6 válido'
  } else {
    valido.value = false
    mensagem.value = 'Endereço IP inválido'
  }

  resultado.value = true
  trackToolUsage('Validador IP', 'validate', { valido: valido.value, tipo: tipo.value })
}
</script>
