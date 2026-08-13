<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
          <i class="fas fa-lock text-yellow-600 dark:text-yellow-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Validador de Senha</h1>
        <p class="text-gray-600 dark:text-gray-400">Analise a força da sua senha</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <BaseInput v-model="senha" label="Senha" type="password" placeholder="Digite sua senha" @input="validar" />
        </div>

        <div v-if="resultado" class="space-y-4">
          <div :class="['rounded-lg p-6', getCorForca()]">
            <div class="flex items-center justify-between mb-4">
              <div>
                <div class="text-2xl font-bold">{{ getForcaTexto() }}</div>
                <div class="text-sm opacity-75">Pontuação: {{ forca }}/100</div>
              </div>
              <div class="text-5xl">{{ getIconeForca() }}</div>
            </div>
            <div class="w-full bg-white/30 rounded-full h-3">
              <div :class="['h-3 rounded-full transition-all', getBarraColor()]" :style="`width: ${forca}%`"></div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-3">
            <div v-for="check in checklist" :key="check.nome" :class="['p-3 rounded-lg flex items-center gap-3', check.ok ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-700']">
              <i :class="['text-lg', check.ok ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-gray-400']"></i>
              <span :class="['text-sm', check.ok ? 'text-green-900 dark:text-green-300' : 'text-gray-600']">{{ check.nome }}</span>
            </div>
          </div>

          <div v-if="sugestoes.length > 0" class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div class="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">💡 Sugestões</div>
            <ul class="text-sm text-yellow-800 dark:text-yellow-400 space-y-1">
              <li v-for="(sug, i) in sugestoes" :key="i">• {{ sug }}</li>
            </ul>
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

const senha = ref('')
const resultado = ref(false)
const forca = ref(0)

const checklist = computed(() => [
  { nome: 'Mínimo 8 caracteres', ok: senha.value.length >= 8 },
  { nome: 'Letras maiúsculas', ok: /[A-Z]/.test(senha.value) },
  { nome: 'Letras minúsculas', ok: /[a-z]/.test(senha.value) },
  { nome: 'Números', ok: /\d/.test(senha.value) },
  { nome: 'Caracteres especiais', ok: /[!@#$%^&*(),.?":{}|<>]/.test(senha.value) },
  { nome: 'Mínimo 12 caracteres', ok: senha.value.length >= 12 }
])

const sugestoes = computed(() => {
  const sugs = []
  if (senha.value.length < 8) sugs.push('Use pelo menos 8 caracteres')
  if (!/[A-Z]/.test(senha.value)) sugs.push('Adicione letras maiúsculas')
  if (!/[a-z]/.test(senha.value)) sugs.push('Adicione letras minúsculas')
  if (!/\d/.test(senha.value)) sugs.push('Adicione números')
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha.value)) sugs.push('Adicione caracteres especiais')
  if (senha.value.length < 12) sugs.push('Senhas com 12+ caracteres são mais seguras')
  return sugs
})

const validar = () => {
  if (!senha.value) {
    resultado.value = false
    return
  }

  let pontos = 0
  
  if (senha.value.length >= 8) pontos += 20
  if (senha.value.length >= 12) pontos += 15
  if (senha.value.length >= 16) pontos += 10
  if (/[a-z]/.test(senha.value)) pontos += 15
  if (/[A-Z]/.test(senha.value)) pontos += 15
  if (/\d/.test(senha.value)) pontos += 10
  if (/[!@#$%^&*(),.?":{}|<>]/.test(senha.value)) pontos += 15
  
  forca.value = Math.min(pontos, 100)
  resultado.value = true
  
  trackToolUsage('Validador Senha', 'validate', { strength: forca.value })
}

const getForcaTexto = () => {
  if (forca.value < 40) return 'Fraca'
  if (forca.value < 70) return 'Média'
  if (forca.value < 90) return 'Forte'
  return 'Muito Forte'
}

const getIconeForca = () => {
  if (forca.value < 40) return '😟'
  if (forca.value < 70) return '😐'
  if (forca.value < 90) return '😊'
  return '🎉'
}

const getCorForca = () => {
  if (forca.value < 40) return 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300'
  if (forca.value < 70) return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-300'
  if (forca.value < 90) return 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300'
  return 'bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-300'
}

const getBarraColor = () => {
  if (forca.value < 40) return 'bg-red-500'
  if (forca.value < 70) return 'bg-yellow-500'
  if (forca.value < 90) return 'bg-blue-500'
  return 'bg-green-500'
}
</script>
