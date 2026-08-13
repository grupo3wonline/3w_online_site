<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <i class="fas fa-landmark text-green-600 dark:text-green-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador Tesouro Direto</h1>
        <p class="text-gray-600 dark:text-gray-400">Simule investimentos em títulos públicos</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Título</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button @click="tipoTitulo = 'selic'" class="p-4 rounded-lg border-2 transition-all" :class="tipoTitulo === 'selic' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-percent text-2xl mb-2 text-green-600 dark:text-green-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Tesouro Selic</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">100% da Selic</div>
            </button>
            <button @click="tipoTitulo = 'prefixado'" class="p-4 rounded-lg border-2 transition-all" :class="tipoTitulo === 'prefixado' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-lock text-2xl mb-2 text-green-600 dark:text-green-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Tesouro Prefixado</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Taxa fixa</div>
            </button>
            <button @click="tipoTitulo = 'ipca'" class="p-4 rounded-lg border-2 transition-all" :class="tipoTitulo === 'ipca' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-chart-line text-2xl mb-2 text-green-600 dark:text-green-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Tesouro IPCA+</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">IPCA + taxa</div>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="valorInicial" label="Valor Inicial (R$)" type="number" :min="30" step="100" icon="fa-solid fa-coins" />
          <BaseInput v-model="aportesMensais" label="Aportes Mensais (R$)" type="number" :min="0" step="100" icon="fa-solid fa-calendar-plus" />
          <BaseInput v-model="prazoAnos" label="Prazo (anos)" type="number" :min="1" :max="30" icon="fa-solid fa-hourglass-half" />
          <BaseInput v-if="tipoTitulo === 'prefixado'" v-model="taxaAnual" label="Taxa Anual (%)" type="number" step="0.1" icon="fa-solid fa-percentage" />
          <BaseInput v-if="tipoTitulo === 'selic'" v-model="taxaSelic" label="Taxa Selic (% a.a.)" type="number" step="0.1" icon="fa-solid fa-percentage" />
          <BaseInput v-if="tipoTitulo === 'ipca'" v-model="taxaIPCA" label="IPCA esperado (% a.a.)" type="number" step="0.1" icon="fa-solid fa-chart-area" />
          <BaseInput v-if="tipoTitulo === 'ipca'" v-model="taxaJuros" label="Taxa de Juros (% a.a.)" type="number" step="0.1" icon="fa-solid fa-plus" />
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Simular Investimento
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Valor Final (Líquido após IR)</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.valorLiquido }}</div>
            <div class="text-green-100">Em {{ prazoAnos }} anos</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.valorBruto }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Valor Bruto</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.totalInvestido }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Investido</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.rendimentoBruto }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Rendimento Bruto</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">R$ {{ resultado.impostoRenda }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">IR ({{ resultado.aliquotaIR }}%)</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Rentabilidade Líquida</div>
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ resultado.rentabilidadeLiquida }}%</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Taxa Anual Efetiva</div>
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ resultado.taxaEfetiva }}% a.a.</div>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-green-600 dark:text-green-400 mt-1 mr-3"></i>
              <div class="text-sm text-green-800 dark:text-green-300">
                <p class="font-semibold mb-2">Vantagens do Tesouro Direto:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Segurança:</strong> Garantido pelo Tesouro Nacional</li>
                  <li><strong>Liquidez:</strong> Resgate a qualquer dia útil (Tesouro Selic)</li>
                  <li><strong>Acessibilidade:</strong> Investimento mínimo de R$ 30</li>
                  <li><strong>Variedade:</strong> Títulos para diferentes perfis e objetivos</li>
                  <li><strong>IR Regressivo:</strong> 22,5% (≤180d), 20% (181-360d), 17,5% (361-720d), 15% (>720d)</li>
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

const tipoTitulo = ref('selic')
const valorInicial = ref(1000)
const aportesMensais = ref(500)
const prazoAnos = ref(5)
const taxaAnual = ref(12)
const taxaSelic = ref(13.25)
const taxaIPCA = ref(4.5)
const taxaJuros = ref(6.0)
const resultado = ref(null)

const calcular = () => {
  const valorInicio = Number(valorInicial.value)
  const aporteMensal = Number(aportesMensais.value)
  const anos = Number(prazoAnos.value)
  const meses = anos * 12
  
  let taxaMensal = 0
  
  if (tipoTitulo.value === 'selic') {
    taxaMensal = Math.pow(1 + Number(taxaSelic.value) / 100, 1/12) - 1
  } else if (tipoTitulo.value === 'prefixado') {
    taxaMensal = Math.pow(1 + Number(taxaAnual.value) / 100, 1/12) - 1
  } else if (tipoTitulo.value === 'ipca') {
    const taxaTotal = (1 + Number(taxaIPCA.value)/100) * (1 + Number(taxaJuros.value)/100) - 1
    taxaMensal = Math.pow(1 + taxaTotal, 1/12) - 1
  }
  
  let saldo = valorInicio
  for (let i = 0; i < meses; i++) {
    saldo = saldo * (1 + taxaMensal) + aporteMensal
  }
  
  const totalInvestido = valorInicio + (aporteMensal * meses)
  const rendimentoBruto = saldo - totalInvestido
  
  let aliquotaIR = 0.15
  const dias = anos * 365
  if (dias <= 180) aliquotaIR = 0.225
  else if (dias <= 360) aliquotaIR = 0.20
  else if (dias <= 720) aliquotaIR = 0.175
  else aliquotaIR = 0.15
  
  const impostoRenda = rendimentoBruto * aliquotaIR
  const valorLiquido = saldo - impostoRenda
  const rentabilidadeLiquida = ((valorLiquido / totalInvestido - 1) * 100)
  const taxaEfetiva = (Math.pow(valorLiquido / totalInvestido, 1/anos) - 1) * 100

  resultado.value = {
    valorBruto: saldo.toFixed(2),
    valorLiquido: valorLiquido.toFixed(2),
    totalInvestido: totalInvestido.toFixed(2),
    rendimentoBruto: rendimentoBruto.toFixed(2),
    impostoRenda: impostoRenda.toFixed(2),
    aliquotaIR: (aliquotaIR * 100).toFixed(1),
    rentabilidadeLiquida: rentabilidadeLiquida.toFixed(2),
    taxaEfetiva: taxaEfetiva.toFixed(2)
  }

  trackToolUsage('Simulador Tesouro Direto', 'calculate', { tipo: tipoTitulo.value })
}
</script>
