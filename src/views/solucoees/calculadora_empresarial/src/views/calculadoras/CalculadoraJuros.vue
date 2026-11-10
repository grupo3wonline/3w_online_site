<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <AppBreadcrumb :items="breadcrumbs" />

      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="gradient-hero rounded-full p-3">
            <i class="fa-solid fa-chart-line text-white text-2xl"></i>
          </div>
        </div>
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Calculadora de Juros Compostos
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Calcule o rendimento de seus investimentos ou o custo de financiamentos
          com juros compostos de forma precisa e rápida.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <i class="fa-solid fa-dollar-sign text-primary-600"></i>
            Dados do Cálculo
          </h2>
          <form @submit.prevent="calcular" autocomplete="off" class="space-y-5">
            <div>
              <label for="capital" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor Inicial (Capital)</label>
              <input id="capital" v-model="capital" type="number" step="0.01" placeholder="Ex: 10000" autocomplete="off" class="input-field" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Valor em reais (R$)</p>
            </div>
            <div>
              <label for="tempo" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Período</label>
              <input id="tempo" v-model="tempo" type="number" placeholder="Ex: 12" autocomplete="off" class="input-field" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Tempo em meses</p>
            </div>
            <div>
              <label for="taxa" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Taxa de Juros</label>
              <input id="taxa" v-model="taxaJuros" type="number" step="0.01" placeholder="Ex: 1.5" autocomplete="off" class="input-field" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Taxa mensal em porcentagem (%)</p>
            </div>
            <div class="flex gap-3 pt-4">
              <button type="submit" class="flex-1 btn-primary" :disabled="loading">
                <i class="fa-solid fa-calculator mr-2"></i>
                {{ loading ? 'Calculando...' : 'Calcular Juros' }}
              </button>
              <button type="button" @click="limpar" class="btn-secondary">Limpar</button>
            </div>
          </form>
        </div>

        <div v-if="resultado" class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <i class="fa-solid fa-percent text-secondary-500"></i>
            Resultados do Cálculo
          </h2>
          <div class="space-y-4">
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Valor Inicial:</span>
              <span class="font-bold text-gray-900 dark:text-white">R$ {{ resultado.valorInicial }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Taxa de Juros:</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ resultado.taxa }}% ao mês</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Período:</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ resultado.periodo }} meses</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Juros Ganhos:</span>
              <span class="font-bold text-green-600 dark:text-green-400 text-lg">R$ {{ resultado.jurosGanhos }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Valor Final:</span>
              <span class="font-bold text-primary-600 dark:text-primary-400 text-xl">R$ {{ resultado.valorFinal }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 grid md:grid-cols-2 gap-8">
        <div class="card p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-circle-info text-primary-600"></i> Como Usar
          </h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• <strong>Valor Inicial:</strong> Digite o valor que quer investir ou financiar</li>
            <li>• <strong>Período:</strong> Informe por quantos meses o dinheiro ficará aplicado</li>
            <li>• <strong>Taxa de Juros:</strong> Use a taxa mensal (ex: 1,5% = 1.5)</li>
            <li>• <strong>Resultado:</strong> Veja quanto você ganhará ou pagará de juros</li>
          </ul>
        </div>
        <div class="card p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-lightbulb text-secondary-500"></i> Dicas Importantes
          </h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Juros compostos fazem o dinheiro crescer exponencialmente</li>
            <li>• Quanto maior o período, maior o efeito dos juros compostos</li>
            <li>• Use para comparar diferentes investimentos ou empréstimos</li>
            <li>• Considere a inflação ao analisar investimentos de longo prazo</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { useSeo, calculatorJsonLd } from '@/composables/useSeo'
import { useUiStore } from '@/stores/ui'
import { jurosCompostos, parseNumber } from '@/utils/finance'

const ui = useUiStore()

useSeo({
  title: 'Calculadora de Juros Compostos',
  description: 'Calcule juros compostos de investimentos e financiamentos. Simule rendimentos, montante final e o total de juros de forma rápida e gratuita.',
  keywords: 'calculadora de juros compostos, simulador de juros, cálculo de rendimento, montante, investimento, financiamento',
  jsonLd: calculatorJsonLd({
    name: 'Calculadora de Juros Compostos',
    description: 'Calcule juros compostos de investimentos e financiamentos, simulando rendimentos e montante final.',
    path: '/calculadora-juros'
  })
})

const breadcrumbs = [
  { label: 'Início', path: '/' },
  { label: 'Calculadoras', path: '/calculadoras' },
  { label: 'Juros Compostos', path: '/calculadora-juros' }
]

const capital = ref('')
const tempo = ref('')
const taxaJuros = ref('')
const resultado = ref(null)
const loading = ref(false)

async function calcular() {
  if (!capital.value || !tempo.value || !taxaJuros.value) {
    Swal.fire({ icon: 'warning', title: 'Campos obrigatórios', text: 'Por favor, preencha todos os campos.', confirmButtonColor: '#2563eb' })
    return
  }
  const c = parseNumber(capital.value)
  const t = parseInt(tempo.value, 10)
  const tx = parseNumber(taxaJuros.value)

  if (!(c > 0) || !(t > 0) || !(tx >= 0)) {
    Swal.fire({ icon: 'error', title: 'Valores inválidos', text: 'Insira valores válidos e positivos.', confirmButtonColor: '#2563eb' })
    return
  }

  loading.value = true
  await ui.withLoading(async () => {
    await new Promise((r) => setTimeout(r, 400))
    const { montante, juros } = jurosCompostos(c, tx, t)
    resultado.value = {
      valorInicial: c.toFixed(2),
      taxa: tx.toFixed(2),
      periodo: t,
      jurosGanhos: juros.toFixed(2),
      valorFinal: montante.toFixed(2)
    }
  }, 'Calculando juros...')
  loading.value = false
  Swal.fire({ icon: 'success', title: 'Cálculo realizado!', text: 'Confira os resultados.', confirmButtonColor: '#2563eb', timer: 2000, showConfirmButton: false })
}

function limpar() {
  capital.value = ''
  tempo.value = ''
  taxaJuros.value = ''
  resultado.value = null
}
</script>
