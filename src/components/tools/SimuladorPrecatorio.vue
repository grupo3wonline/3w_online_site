<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <i class="fas fa-gavel text-amber-600 dark:text-amber-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Precatórios</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule correção monetária e juros de precatórios judiciais</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Precatório</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button @click="tipoPrecatorio = 'alimentar'" class="p-4 rounded-lg border-2 transition-all" :class="tipoPrecatorio === 'alimentar' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-utensils text-2xl mb-2 text-amber-600 dark:text-amber-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Alimentar</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Preferencial (salários, pensões)</div>
            </button>
            <button @click="tipoPrecatorio = 'comum'" class="p-4 rounded-lg border-2 transition-all" :class="tipoPrecatorio === 'comum' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-landmark text-2xl mb-2 text-amber-600 dark:text-amber-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Comum</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Outros créditos</div>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="valorOriginal" label="Valor Original (R$)" type="number" :min="0" step="100" icon="fa-solid fa-money-bill" />
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data da Dívida</label>
            <input v-model="dataInicial" type="date" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data de Cálculo</label>
            <input v-model="dataFinal" type="date" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <BaseInput v-model="taxaJuros" label="Taxa de Juros (% a.a.)" type="number" step="0.1" icon="fa-solid fa-percentage" />
        </div>

        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Índices de correção mais usados:</div>
          <div class="flex flex-wrap gap-2">
            <button @click="taxaJuros = 6" class="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm">Poupança: 6% a.a.</button>
            <button @click="taxaJuros = 12" class="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm">IPCA + 6%</button>
            <button @click="taxaJuros = 13.75" class="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm">Selic: 13,75% a.a.</button>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Precatório
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Valor Atualizado do Precatório</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.valorAtualizado }}</div>
            <div class="text-amber-100">{{ resultado.mesesDecorridos }} meses decorridos</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">R$ {{ resultado.valorOriginal }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Valor Original</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.jurosAcumulados }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Juros</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ resultado.anosDecorridos }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Anos</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ resultado.multiplicador }}x</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Multiplicador</div>
            </div>
          </div>

          <div v-if="resultado.valorLiquido" class="bg-white dark:bg-gray-700 rounded-lg p-4">
            <h3 class="font-bold text-gray-900 dark:text-white mb-3">Valores após Descontos</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400">IR ({{ resultado.aliquotaIR }}%)</div>
                <div class="text-xl font-bold text-red-600 dark:text-red-400">R$ {{ resultado.impostoRenda }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Honorários ({{ resultado.aliquotaHonorarios }}%)</div>
                <div class="text-xl font-bold text-red-600 dark:text-red-400">R$ {{ resultado.honorarios }}</div>
              </div>
              <div class="col-span-2">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Valor Líquido a Receber</div>
                <div class="text-3xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.valorLiquido }}</div>
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <button @click="calcularComDescontos(20)" class="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm">
              Calcular com Honorários 20%
            </button>
            <button @click="calcularComDescontos(30)" class="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm">
              Calcular com Honorários 30%
            </button>
          </div>

          <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-amber-600 dark:text-amber-400 mt-1 mr-3"></i>
              <div class="text-sm text-amber-800 dark:text-amber-300">
                <p class="font-semibold mb-2">Informações sobre precatórios:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Precatório:</strong> Dívida judicial do governo reconhecida por sentença</li>
                  <li><strong>Alimentar:</strong> Tem prioridade de pagamento (idosos e doentes primeiro)</li>
                  <li><strong>Comum:</strong> Segue ordem cronológica normal</li>
                  <li><strong>Prazo:</strong> Pode levar anos para receber (varia por estado)</li>
                  <li><strong>IR:</strong> Incide sobre rendimentos/juros (tabela progressiva)</li>
                  <li><strong>Cessão:</strong> Possível vender o precatório com deságio</li>
                  <li><strong>RPV:</strong> Valores até 60 salários mínimos podem ser RPV (mais rápido)</li>
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
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const tipoPrecatorio = ref('alimentar')
const valorOriginal = ref(50000)
const dataInicial = ref('2020-01-01')
const dataFinal = ref(new Date().toISOString().split('T')[0])
const taxaJuros = ref(6)
const resultado = ref(null)

const calcular = () => {
  const valor = Number(valorOriginal.value)
  const dataInicio = new Date(dataInicial.value)
  const dataFim = new Date(dataFinal.value)
  const taxa = Number(taxaJuros.value) / 100
  
  const diffTime = Math.abs(dataFim - dataInicio)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const meses = Math.floor(diffDays / 30)
  const anos = (diffDays / 365).toFixed(1)
  
  const taxaMensal = Math.pow(1 + taxa, 1/12) - 1
  const valorAtualizado = valor * Math.pow(1 + taxaMensal, meses)
  const juros = valorAtualizado - valor
  const multiplicador = (valorAtualizado / valor).toFixed(2)

  resultado.value = {
    valorOriginal: valor.toFixed(2),
    valorAtualizado: valorAtualizado.toFixed(2),
    jurosAcumulados: juros.toFixed(2),
    mesesDecorridos: meses,
    anosDecorridos: anos,
    multiplicador: multiplicador
  }

  trackToolUsage('Simulador Precatório', 'calculate', { tipo: tipoPrecatorio.value })
}

const calcularComDescontos = (percentualHonorarios) => {
  if (!resultado.value) return
  
  const valorAtual = Number(resultado.value.valorAtualizado)
  const valorOrig = Number(resultado.value.valorOriginal)
  const rendimento = valorAtual - valorOrig
  
  let aliquotaIR = 0
  if (rendimento <= 1903.98) aliquotaIR = 0
  else if (rendimento <= 2826.65) aliquotaIR = 0.075
  else if (rendimento <= 3751.05) aliquotaIR = 0.15
  else if (rendimento <= 4664.68) aliquotaIR = 0.225
  else aliquotaIR = 0.275
  
  const ir = rendimento * aliquotaIR
  const honorarios = valorAtual * (percentualHonorarios / 100)
  const valorLiquido = valorAtual - ir - honorarios
  
  resultado.value = {
    ...resultado.value,
    impostoRenda: ir.toFixed(2),
    honorarios: honorarios.toFixed(2),
    valorLiquido: valorLiquido.toFixed(2),
    aliquotaIR: (aliquotaIR * 100).toFixed(1),
    aliquotaHonorarios: percentualHonorarios
  }
}
</script>
