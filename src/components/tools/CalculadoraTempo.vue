<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <i class="fas fa-clock text-blue-600 dark:text-blue-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Tempo</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule diferenças entre datas e adicione/subtraia períodos</p>
      </div>

      <div class="space-y-6">
        <!-- Modo de Cálculo -->
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button
            @click="modo = 'diferenca'"
            class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
            :class="modo === 'diferenca' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            Diferença entre Datas
          </button>
          <button
            @click="modo = 'adicionar'"
            class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
            :class="modo === 'adicionar' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            Adicionar/Subtrair Tempo
          </button>
        </div>

        <!-- Modo: Diferença entre Datas -->
        <div v-if="modo === 'diferenca'" class="space-y-4">
          <BaseInput
            v-model="dataInicio"
            label="Data Inicial"
            type="date"
            icon="fa-solid fa-calendar-days"
          />

          <BaseInput
            v-model="dataFim"
            label="Data Final"
            type="date"
            icon="fa-solid fa-calendar-check"
          />

          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              id="diasUteis"
              v-model="considerarDiasUteis"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            >
            <label for="diasUteis" class="text-sm text-gray-700 dark:text-gray-300">
              Considerar apenas dias úteis (seg-sex)
            </label>
          </div>
        </div>

        <!-- Modo: Adicionar/Subtrair Tempo -->
        <div v-else class="space-y-4">
          <BaseInput
            v-model="dataBase"
            label="Data Base"
            type="date"
            icon="fa-solid fa-calendar"
          />

          <div class="grid grid-cols-2 gap-4">
            <BaseInput
              v-model="anos"
              label="Anos"
              type="number"
              icon="fa-solid fa-calendar-days"
            />
            <BaseInput
              v-model="meses"
              label="Meses"
              type="number"
              icon="fa-solid fa-calendar"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <BaseInput
              v-model="dias"
              label="Dias"
              type="number"
              icon="fa-solid fa-calendar-day"
            />
            <BaseInput
              v-model="horas"
              label="Horas"
              type="number"
              icon="fa-solid fa-clock"
            />
          </div>

          <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <button
              @click="operacao = 'adicionar'"
              class="flex-1 py-2 px-4 rounded-lg font-medium transition-colors"
              :class="operacao === 'adicionar' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
            >
              <i class="fas fa-plus mr-2"></i>Adicionar
            </button>
            <button
              @click="operacao = 'subtrair'"
              class="flex-1 py-2 px-4 rounded-lg font-medium transition-colors"
              :class="operacao === 'subtrair' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
            >
              <i class="fas fa-minus mr-2"></i>Subtrair
            </button>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="calcular" variant="primary" class="flex-1">
            <i class="fas fa-calculator mr-2"></i>
            Calcular
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">{{ resultado.titulo }}</div>
            <div class="text-5xl font-bold mb-2">{{ resultado.principal }}</div>
            <div class="text-blue-100">{{ resultado.subtitulo }}</div>
          </div>

          <!-- Métricas -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(metrica, index) in resultado.metricas" :key="index" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ metrica.valor }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ metrica.label }}</div>
            </div>
          </div>

          <!-- Detalhamento -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-3">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Detalhamento</h4>
            
            <div v-for="(detalhe, index) in resultado.detalhes" :key="index" class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">{{ detalhe.label }}:</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ detalhe.valor }}</span>
            </div>
          </div>

          <!-- Dicas -->
          <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
            <div class="flex">
              <i class="fas fa-lightbulb text-blue-600 dark:text-blue-400 mt-1 mr-3"></i>
              <div class="text-sm text-blue-800 dark:text-blue-300">
                <p class="font-semibold mb-2">Informações Úteis:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Anos bissextos têm 366 dias (fevereiro com 29 dias)</li>
                  <li>Dias úteis consideram segunda a sexta-feira</li>
                  <li>Feriados não são descontados automaticamente</li>
                  <li>Use para prazos de contratos, projetos e entregas</li>
                </ul>
              </div>
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
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const modo = ref('diferenca')

// Modo diferença
const dataInicio = ref(new Date().toISOString().split('T')[0])
const dataFim = ref(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
const considerarDiasUteis = ref(false)

// Modo adicionar/subtrair
const dataBase = ref(new Date().toISOString().split('T')[0])
const anos = ref(0)
const meses = ref(1)
const dias = ref(0)
const horas = ref(0)
const operacao = ref('adicionar')

const resultado = ref(null)

const calcularDiasUteis = (inicio, fim) => {
  let count = 0
  const current = new Date(inicio)
  while (current <= fim) {
    const dia = current.getDay()
    if (dia !== 0 && dia !== 6) count++
    current.setDate(current.getDate() + 1)
  }
  return count
}

const formatarData = (data) => {
  return data.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
}

const calcular = () => {
  if (modo.value === 'diferenca') {
    if (!dataInicio.value || !dataFim.value) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Preencha as duas datas' })
      return
    }

    const inicio = new Date(dataInicio.value + 'T00:00:00')
    const fim = new Date(dataFim.value + 'T00:00:00')

    if (fim < inicio) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Data final deve ser posterior à data inicial' })
      return
    }

    const diffMs = fim - inicio
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutos = Math.floor(diffMs / (1000 * 60))

    const anos = Math.floor(diffDias / 365)
    const meses = Math.floor((diffDias % 365) / 30)
    const dias = diffDias % 30

    const diasUteis = considerarDiasUteis.value ? calcularDiasUteis(inicio, fim) : 0

    resultado.value = {
      titulo: 'Diferença Total',
      principal: `${diffDias} dias`,
      subtitulo: `${anos} anos, ${meses} meses e ${dias} dias`,
      metricas: [
        { label: 'Anos', valor: anos },
        { label: 'Meses', valor: Math.floor(diffDias / 30) },
        { label: 'Semanas', valor: Math.floor(diffDias / 7) },
        { label: 'Dias', valor: diffDias }
      ],
      detalhes: [
        { label: 'Data Inicial', valor: formatarData(inicio) },
        { label: 'Data Final', valor: formatarData(fim) },
        { label: 'Total em Horas', valor: diffHoras.toLocaleString() },
        { label: 'Total em Minutos', valor: diffMinutos.toLocaleString() },
        ...(considerarDiasUteis.value ? [{ label: 'Dias Úteis', valor: diasUteis }] : [])
      ]
    }

  } else {
    if (!dataBase.value) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Preencha a data base' })
      return
    }

    const base = new Date(dataBase.value + 'T00:00:00')
    const novaData = new Date(base)

    const multiplicador = operacao.value === 'adicionar' ? 1 : -1

    novaData.setFullYear(novaData.getFullYear() + (Number(anos.value) * multiplicador))
    novaData.setMonth(novaData.getMonth() + (Number(meses.value) * multiplicador))
    novaData.setDate(novaData.getDate() + (Number(dias.value) * multiplicador))
    novaData.setHours(novaData.getHours() + (Number(horas.value) * multiplicador))

    const diffMs = Math.abs(novaData - base)
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    resultado.value = {
      titulo: 'Nova Data',
      principal: formatarData(novaData),
      subtitulo: `${operacao.value === 'adicionar' ? 'Adicionado' : 'Subtraído'}: ${anos.value}a ${meses.value}m ${dias.value}d ${horas.value}h`,
      metricas: [
        { label: 'Dia da Semana', valor: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][novaData.getDay()] },
        { label: 'Dias de Diferença', valor: diffDias },
        { label: 'Semanas', valor: Math.floor(diffDias / 7) },
        { label: 'Ano', valor: novaData.getFullYear() }
      ],
      detalhes: [
        { label: 'Data Base', valor: formatarData(base) },
        { label: 'Nova Data', valor: formatarData(novaData) },
        { label: 'Operação', valor: operacao.value === 'adicionar' ? 'Adição' : 'Subtração' },
        { label: 'Diferença Total', valor: `${diffDias} dias` }
      ]
    }
  }

  trackToolUsage('Calculadora Tempo', 'calculate')
}

const limpar = () => {
  dataInicio.value = new Date().toISOString().split('T')[0]
  dataFim.value = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  considerarDiasUteis.value = false
  dataBase.value = new Date().toISOString().split('T')[0]
  anos.value = 0
  meses.value = 1
  dias.value = 0
  horas.value = 0
  operacao.value = 'adicionar'
  resultado.value = null
}
</script>
