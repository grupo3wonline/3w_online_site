<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-percent text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Desconto</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule descontos e economia de forma rápida e precisa</p>
      </div>

      <div class="space-y-6">
        <!-- Modo de Cálculo -->
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button
            @click="modo = 'porcentagem'"
            class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
            :class="modo === 'porcentagem' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            Desconto em %
          </button>
          <button
            @click="modo = 'valor'"
            class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
            :class="modo === 'valor' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            Desconto em R$
          </button>
        </div>

        <!-- Preço Original -->
        <BaseInput
          v-model="precoOriginal"
          label="Preço Original (R$)"
          type="number"
          :min="0"
          step="0.01"
          icon="fa-solid fa-tag"
        />

        <!-- Desconto -->
        <BaseInput
          v-if="modo === 'porcentagem'"
          v-model="descontoPorcentagem"
          label="Desconto (%)"
          type="number"
          :min="0"
          :max="100"
          step="0.01"
          icon="fa-solid fa-percent"
        />

        <BaseInput
          v-else
          v-model="descontoValor"
          label="Desconto (R$)"
          type="number"
          :min="0"
          step="0.01"
          icon="fa-solid fa-dollar-sign"
        />

        <!-- Descontos Adicionais -->
        <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <label class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <i class="fas fa-layer-group text-purple-600 dark:text-purple-400"></i>
              Descontos Cascata
            </label>
            <button
              @click="descontosCascata = !descontosCascata"
              class="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              {{ descontosCascata ? 'Desativar' : 'Ativar' }}
            </button>
          </div>
          
          <div v-if="descontosCascata" class="space-y-3">
            <BaseInput
              v-model="desconto2"
              label="2º Desconto (%)"
              type="number"
              :min="0"
              :max="100"
              step="0.01"
              icon="fa-solid fa-percent"
            />
            <BaseInput
              v-model="desconto3"
              label="3º Desconto (%)"
              type="number"
              :min="0"
              :max="100"
              step="0.01"
              icon="fa-solid fa-percent"
            />
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
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Preço Final</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.precoFinal }}</div>
            <div class="text-purple-100">Você economiza: R$ {{ resultado.economia }}</div>
          </div>

          <!-- Métricas -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ resultado.descontoTotal }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Desconto Total</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {{ resultado.economia }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Economia</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {{ resultado.precoFinal }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Valor Final</div>
            </div>
          </div>

          <!-- Detalhamento -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-3">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Cálculo Detalhado</h4>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Preço Original:</span>
              <span class="font-medium text-gray-900 dark:text-white">R$ {{ Number(precoOriginal).toFixed(2) }}</span>
            </div>
            
            <div v-for="(etapa, index) in resultado.etapas" :key="index" class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">{{ etapa.label }}:</span>
              <span class="font-medium text-purple-600 dark:text-purple-400">- R$ {{ etapa.valor }}</span>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-600 pt-3 flex justify-between font-semibold">
              <span class="text-gray-900 dark:text-white">Preço Final:</span>
              <span class="text-purple-600 dark:text-purple-400">R$ {{ resultado.precoFinal }}</span>
            </div>
          </div>

          <!-- Dicas -->
          <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
            <div class="flex">
              <i class="fas fa-lightbulb text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
              <div class="text-sm text-purple-800 dark:text-purple-300">
                <p class="font-semibold mb-2">Atenção:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Descontos cascata são aplicados um após o outro</li>
                  <li>2 descontos de 50% não equivalem a 100% de desconto</li>
                  <li>Compare sempre o preço final, não apenas a porcentagem</li>
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

const modo = ref('porcentagem')
const precoOriginal = ref(100)
const descontoPorcentagem = ref(20)
const descontoValor = ref(20)
const descontosCascata = ref(false)
const desconto2 = ref(0)
const desconto3 = ref(0)

const resultado = ref(null)

const calcular = () => {
  const preco = Number(precoOriginal.value)
  
  if (preco <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite o preço original' })
    return
  }
  
  let precoAtual = preco
  const etapas = []
  
  // Primeiro desconto
  let desconto1 = 0
  if (modo.value === 'porcentagem') {
    desconto1 = Number(descontoPorcentagem.value)
    const valorDesconto = (preco * desconto1) / 100
    etapas.push({ label: `Desconto ${desconto1}%`, valor: valorDesconto.toFixed(2) })
    precoAtual = preco - valorDesconto
  } else {
    const valorDesconto = Number(descontoValor.value)
    desconto1 = (valorDesconto / preco) * 100
    etapas.push({ label: 'Desconto', valor: valorDesconto.toFixed(2) })
    precoAtual = preco - valorDesconto
  }
  
  // Descontos cascata
  if (descontosCascata.value) {
    const desc2 = Number(desconto2.value)
    if (desc2 > 0) {
      const valorDesconto = (precoAtual * desc2) / 100
      etapas.push({ label: `2º Desconto ${desc2}%`, valor: valorDesconto.toFixed(2) })
      precoAtual -= valorDesconto
    }
    
    const desc3 = Number(desconto3.value)
    if (desc3 > 0) {
      const valorDesconto = (precoAtual * desc3) / 100
      etapas.push({ label: `3º Desconto ${desc3}%`, valor: valorDesconto.toFixed(2) })
      precoAtual -= valorDesconto
    }
  }
  
  const economia = preco - precoAtual
  const descontoTotal = ((economia / preco) * 100).toFixed(2)
  
  resultado.value = {
    precoFinal: precoAtual.toFixed(2),
    economia: economia.toFixed(2),
    descontoTotal,
    etapas
  }
  
  trackToolUsage('Calculadora Desconto', 'calculate')
}

const limpar = () => {
  modo.value = 'porcentagem'
  precoOriginal.value = 100
  descontoPorcentagem.value = 20
  descontoValor.value = 20
  descontosCascata.value = false
  desconto2.value = 0
  desconto3.value = 0
  resultado.value = null
}
</script>
