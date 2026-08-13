<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <i class="fas fa-coins text-amber-600 dark:text-amber-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Margem de Lucro</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule margem, markup e lucro do seu produto</p>
      </div>

      <div class="space-y-6">
        <!-- Modo de Cálculo -->
        <div class="grid grid-cols-3 gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button
            @click="modo = 'custo-venda'"
            class="py-3 px-2 rounded-lg font-medium text-sm transition-colors"
            :class="modo === 'custo-venda' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            Custo + Venda
          </button>
          <button
            @click="modo = 'custo-margem'"
            class="py-3 px-2 rounded-lg font-medium text-sm transition-colors"
            :class="modo === 'custo-margem' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            Custo + Margem
          </button>
          <button
            @click="modo = 'custo-markup'"
            class="py-3 px-2 rounded-lg font-medium text-sm transition-colors"
            :class="modo === 'custo-markup' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            Custo + Markup
          </button>
        </div>

        <!-- Custo -->
        <BaseInput
          v-model="precoCusto"
          label="Preço de Custo (R$)"
          type="number"
          :min="0"
          step="0.01"
          icon="fa-solid fa-dollar-sign"
          hint="Quanto você paga pelo produto"
        />

        <!-- Preço de Venda (modo custo-venda) -->
        <BaseInput
          v-if="modo === 'custo-venda'"
          v-model="precoVenda"
          label="Preço de Venda (R$)"
          type="number"
          :min="0"
          step="0.01"
          icon="fa-solid fa-tag"
          hint="Quanto você vende o produto"
        />

        <!-- Margem (modo custo-margem) -->
        <BaseInput
          v-if="modo === 'custo-margem'"
          v-model="margemDesejada"
          label="Margem Desejada (%)"
          type="number"
          :min="0"
          :max="100"
          step="0.01"
          icon="fa-solid fa-percent"
          hint="Margem = (Venda - Custo) / Venda × 100"
        />

        <!-- Markup (modo custo-markup) -->
        <BaseInput
          v-if="modo === 'custo-markup'"
          v-model="markupDesejado"
          label="Markup Desejado (%)"
          type="number"
          :min="0"
          step="0.01"
          icon="fa-solid fa-arrow-up"
          hint="Markup = (Venda - Custo) / Custo × 100"
        />

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
          <div class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Preço de Venda Sugerido</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.precoVenda }}</div>
            <div class="text-amber-100">Lucro: R$ {{ resultado.lucro }}</div>
          </div>

          <!-- Métricas -->
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ resultado.margem }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Margem</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ resultado.markup }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Markup</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">R$ {{ resultado.lucro }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Lucro</div>
            </div>
          </div>

          <!-- Comparação Margem vs Markup -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Entenda a Diferença</h4>
            
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-percent text-amber-600 dark:text-amber-400"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">Margem de Lucro</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Porcentagem do lucro em relação ao <strong>preço de venda</strong>
                  </div>
                  <div class="text-xs font-mono text-amber-600 dark:text-amber-400 mt-1">
                    Margem = (Venda - Custo) ÷ Venda × 100
                  </div>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-arrow-up text-amber-600 dark:text-amber-400"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">Markup</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Porcentagem do lucro em relação ao <strong>custo</strong>
                  </div>
                  <div class="text-xs font-mono text-amber-600 dark:text-amber-400 mt-1">
                    Markup = (Venda - Custo) ÷ Custo × 100
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Detalhamento -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-3">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Cálculo Detalhado</h4>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Preço de Custo:</span>
              <span class="font-medium text-gray-900 dark:text-white">R$ {{ Number(precoCusto).toFixed(2) }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Lucro:</span>
              <span class="font-medium text-amber-600 dark:text-amber-400">+ R$ {{ resultado.lucro }}</span>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-600 pt-3 flex justify-between font-semibold">
              <span class="text-gray-900 dark:text-white">Preço de Venda:</span>
              <span class="text-amber-600 dark:text-amber-400">R$ {{ resultado.precoVenda }}</span>
            </div>
          </div>

          <!-- Dicas -->
          <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4">
            <div class="flex">
              <i class="fas fa-lightbulb text-amber-600 dark:text-amber-400 mt-1 mr-3"></i>
              <div class="text-sm text-amber-800 dark:text-amber-300">
                <p class="font-semibold mb-2">Dicas para Precificação:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Considere todos os custos: produto, frete, impostos, operação</li>
                  <li>Analise os preços da concorrência</li>
                  <li>A margem ideal varia por setor (geralmente 20-50%)</li>
                  <li>Markup é sempre maior que margem para o mesmo lucro</li>
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

const modo = ref('custo-venda')
const precoCusto = ref(50)
const precoVenda = ref(100)
const margemDesejada = ref(40)
const markupDesejado = ref(100)

const resultado = ref(null)

const calcular = () => {
  const custo = Number(precoCusto.value)
  
  if (custo <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite o preço de custo' })
    return
  }
  
  let venda = 0
  let lucro = 0
  let margem = 0
  let markup = 0
  
  if (modo.value === 'custo-venda') {
    venda = Number(precoVenda.value)
    if (venda <= custo) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Preço de venda deve ser maior que o custo' })
      return
    }
    lucro = venda - custo
    margem = ((lucro / venda) * 100).toFixed(2)
    markup = ((lucro / custo) * 100).toFixed(2)
    
  } else if (modo.value === 'custo-margem') {
    margem = Number(margemDesejada.value)
    if (margem >= 100) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Margem deve ser menor que 100%' })
      return
    }
    // Venda = Custo / (1 - Margem)
    venda = custo / (1 - (margem / 100))
    lucro = venda - custo
    markup = ((lucro / custo) * 100).toFixed(2)
    
  } else if (modo.value === 'custo-markup') {
    markup = Number(markupDesejado.value)
    // Venda = Custo × (1 + Markup)
    venda = custo * (1 + (markup / 100))
    lucro = venda - custo
    margem = ((lucro / venda) * 100).toFixed(2)
  }
  
  resultado.value = {
    precoVenda: venda.toFixed(2),
    lucro: lucro.toFixed(2),
    margem: margem,
    markup: markup
  }
  
  trackToolUsage('Calculadora Margem', 'calculate')
}

const limpar = () => {
  modo.value = 'custo-venda'
  precoCusto.value = 50
  precoVenda.value = 100
  margemDesejada.value = 40
  markupDesejado.value = 100
  resultado.value = null
}
</script>
