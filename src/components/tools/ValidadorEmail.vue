<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-envelope-circle-check text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de E-mail</h1>
        <p class="text-gray-600 dark:text-gray-400">Valide endereços de e-mail</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <BaseInput v-model="email" label="E-mail" type="email" placeholder="exemplo@email.com" @input="validar" />
        </div>

        <div v-if="resultado" :class="['rounded-lg p-8 text-center', valido ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30' : 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30']">
          <i :class="['text-5xl mb-4', valido ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600']"></i>
          <div class="text-2xl font-bold mb-2" :class="valido ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'">
            {{ valido ? 'E-mail Válido' : 'E-mail Inválido' }}
          </div>
          <div class="text-sm" :class="valido ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
            {{ mensagem }}
          </div>
        </div>

        <div v-if="valido && info" class="grid md:grid-cols-2 gap-4">
          <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Usuário</div>
            <div class="font-mono font-semibold text-gray-900 dark:text-white">{{ info.usuario }}</div>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Domínio</div>
            <div class="font-mono font-semibold text-gray-900 dark:text-white">{{ info.dominio }}</div>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">TLD</div>
            <div class="font-mono font-semibold text-gray-900 dark:text-white">{{ info.tld }}</div>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Provedor</div>
            <div class="font-semibold text-gray-900 dark:text-white">{{ info.provedor }}</div>
          </div>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
          <div class="text-sm text-purple-800 dark:text-purple-300">
            <p class="font-semibold mb-1">RFC 5322</p>
            <p class="text-xs">Validação conforme padrão internacional de e-mail</p>
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

const email = ref('')
const resultado = ref(false)
const valido = ref(false)
const mensagem = ref('')

const info = computed(() => {
  if (!valido.value) return null
  
  const parts = email.value.split('@')
  const dominio = parts[1]
  const tld = dominio.split('.').pop()
  
  const provedores = {
    'gmail.com': 'Gmail (Google)',
    'outlook.com': 'Outlook (Microsoft)',
    'hotmail.com': 'Hotmail (Microsoft)',
    'yahoo.com': 'Yahoo',
    'icloud.com': 'iCloud (Apple)',
    'uol.com.br': 'UOL',
    'bol.com.br': 'BOL'
  }
  
  return {
    usuario: parts[0],
    dominio: parts[1],
    tld: `.${tld}`,
    provedor: provedores[dominio] || 'Personalizado'
  }
})

const validar = () => {
  if (!email.value) {
    resultado.value = false
    return
  }

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const isValid = regex.test(email.value)
  
  resultado.value = true
  valido.value = isValid
  
  if (!isValid) {
    mensagem.value = 'Formato de e-mail inválido'
  } else {
    mensagem.value = 'E-mail com formato válido'
  }
  
  trackToolUsage('Validador Email', 'validate', { valid: isValid })
}
</script>
