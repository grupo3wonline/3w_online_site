<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
          <i class="fas fa-umbrella-beach text-violet-600 dark:text-violet-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Aposentadoria</h1>
        <p class="text-gray-600 dark:text-gray-400">Planeje sua aposentadoria financeira</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="idadeAtual" label="Idade Atual (anos)" type="number" :min="18" :max="80" icon="fa-solid fa-user" />
          <BaseInput v-model="idadeAposentadoria" label="Idade para Aposentar" type="number" :min="50" :max="85" icon="fa-solid fa-umbrella-beach" />
          <BaseInput v-model="gastoMensal" label="Gasto Mensal Desejado (R$)" type="number" :min="0" step="100" icon="fa-solid fa-money-bill-wave" />
          <BaseInput v-model="expectativaVida" label="Expectativa de Vida (anos)" type="number" :min="60" :max="120" icon="fa-solid fa-heart" />
          <BaseInput v-model="patrimonioAtual" label="Patrimônio Atual (R$)" type="number" :min="0" step="1000" icon="fa-solid fa-piggy-bank" />
          <BaseInput v-model="taxaRetorno" label="Taxa de Retorno (% ao ano)" type="number" step="0.1" icon="fa-solid fa-percent" />
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Aposentadoria
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Aporte Mensal Necessário</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.aporteMensal }}</div>
            <div class="text-violet-100">Para aposentar em {{ anosAteAposentadoria }} anos</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-violet-600 dark:text-violet-400">R$ {{ resultado.patrimonioNecessario }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Patrimônio Necessário</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-violet-600 dark:text-violet-400">R$ {{ resultado.totalAportado }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total a Investir</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-violet-600 dark:text-violet-400">{{ anosAteAposentadoria }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Anos até Aposentar</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-violet-600 dark:text-violet-400">{{ anosAposentado }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Anos Aposentado</div>
            </div>
          </div>

          <div class="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-violet-600 dark:text-violet-400 mt-1 mr-3"></i>
              <div class="text-sm text-violet-800 dark:text-violet-300">
                <p class="font-semibold mb-2">Como Funciona:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Calculamos o patrimônio necessário para viver de renda</li>
                  <li>Consideramos inflação e rendimentos durante aposentadoria</li>
                  <li>Regra dos 4%: gaste 4% do patrimônio por ano</li>
                  <li>Diversifique investimentos: ações, FIIs, renda fixa</li>
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
import { ref, computed } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const idadeAtual = ref(30)
const idadeAposentadoria = ref(60)
const gastoMensal = ref(5000)
const expectativaVida = ref(85)
const patrimonioAtual = ref(50000)
const taxaRetorno = ref(8)
const resultado = ref(null)

const anosAteAposentadoria = computed(() => Number(idadeAposentadoria.value) - Number(idadeAtual.value))
const anosAposentado = computed(() => Number(expectativaVida.value) - Number(idadeAposentadoria.value))

const calcular = () => {
  if (anosAteAposentadoria.value <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Idade de aposentadoria deve ser maior que idade atual' })
    return
  }

  const gastoAnual = Number(gastoMensal.value) * 12
  const patrimonioNecessario = gastoAnual * 25 // Regra dos 4%
  
  const taxa = Number(taxaRetorno.value) / 100 / 12
  const meses = anosAteAposentadoria.value * 12
  const patrimonioInicial = Number(patrimonioAtual.value)
  
  // Patrimônio inicial crescendo
  const patrimonioFuturo = patrimonioInicial * Math.pow(1 + taxa, meses)
  
  // Quanto falta acumular
  const faltaAcumular = Math.max(0, patrimonioNecessario - patrimonioFuturo)
  
  // PMT - Parcela necessária
  let aporteMensal = 0
  if (faltaAcumular > 0) {
    aporteMensal = (faltaAcumular * taxa) / (Math.pow(1 + taxa, meses) - 1)
  }
  
  const totalAportado = aporteMensal * meses

  resultado.value = {
    patrimonioNecessario: patrimonioNecessario.toFixed(2),
    aporteMensal: aporteMensal.toFixed(2),
    totalAportado: totalAportado.toFixed(2)
  }

  trackToolUsage('Calculadora Aposentadoria', 'calculate')
}
</script>
