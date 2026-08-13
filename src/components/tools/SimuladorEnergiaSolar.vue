<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <i class="fas fa-sun text-indigo-600 dark:text-indigo-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Energia Solar</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o retorno do investimento em painéis solares</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="consumoMensal" label="Consumo Mensal (kWh)" type="number" :min="0" step="50" icon="fa-solid fa-bolt" />
          <BaseInput v-model="tarifaEnergia" label="Tarifa (R$ por kWh)" type="number" step="0.01" icon="fa-solid fa-dollar-sign" />
          <BaseInput v-model="potenciaSistema" label="Potência do Sistema (kWp)" type="number" step="0.5" icon="fa-solid fa-solar-panel" />
          <BaseInput v-model="custoInstalacao" label="Custo de Instalação (R$)" type="number" :min="0" step="1000" icon="fa-solid fa-tag" />
          <BaseInput v-model="taxaAumento" label="Aumento Anual da Tarifa (%)" type="number" step="0.5" icon="fa-solid fa-chart-line" />
          <BaseInput v-model="degradacao" label="Degradação Anual (%)" type="number" step="0.1" icon="fa-solid fa-arrow-down" />
        </div>

        <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Geração Estimada</div>
              <div class="text-xl font-bold text-indigo-600 dark:text-indigo-400">{{ geracaoMensal }} kWh/mês</div>
            </div>
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Economia Mensal</div>
              <div class="text-xl font-bold text-green-600 dark:text-green-400">R$ {{ economiaMensal }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400">% de Redução</div>
              <div class="text-xl font-bold text-indigo-600 dark:text-indigo-400">{{ percentualReducao }}%</div>
            </div>
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Custo por kWp</div>
              <div class="text-xl font-bold text-gray-600 dark:text-gray-400">R$ {{ custoPorkWp }}</div>
            </div>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Retorno do Investimento
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Payback (Retorno do Investimento)</div>
            <div class="text-5xl font-bold mb-2">{{ resultado.paybackAnos }} anos</div>
            <div class="text-indigo-100">{{ resultado.paybackMeses }} meses</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.economia5Anos }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Economia 5 anos</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.economia10Anos }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Economia 10 anos</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.economia25Anos }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Economia 25 anos</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ resultado.roi }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">ROI em 25 anos</div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-bold text-gray-900 dark:text-white mb-3">Análise Anual</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Economia Ano 1:</span>
                  <span class="font-bold text-green-600 dark:text-green-400">R$ {{ resultado.economiaAno1 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Economia Ano 10:</span>
                  <span class="font-bold text-green-600 dark:text-green-400">R$ {{ resultado.economiaAno10 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Economia Ano 25:</span>
                  <span class="font-bold text-green-600 dark:text-green-400">R$ {{ resultado.economiaAno25 }}</span>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-bold text-gray-900 dark:text-white mb-3">Impacto Ambiental</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">CO₂ evitado (25 anos):</span>
                  <span class="font-bold text-green-600 dark:text-green-400">{{ resultado.co2Evitado }} ton</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Árvores equivalentes:</span>
                  <span class="font-bold text-green-600 dark:text-green-400">{{ resultado.arvores }} árvores</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Energia total gerada:</span>
                  <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ resultado.energiaTotal }} MWh</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-indigo-600 dark:text-indigo-400 mt-1 mr-3"></i>
              <div class="text-sm text-indigo-800 dark:text-indigo-300">
                <p class="font-semibold mb-2">Informações sobre energia solar:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Vida útil:</strong> Painéis solares duram 25-30 anos</li>
                  <li><strong>Manutenção:</strong> Baixa - limpeza periódica dos painéis</li>
                  <li><strong>Financiamento:</strong> Muitos bancos oferecem linhas especiais</li>
                  <li><strong>Valorização:</strong> Imóvel com energia solar vale mais</li>
                  <li><strong>IPTU Verde:</strong> Alguns municípios oferecem desconto</li>
                  <li><strong>Geração Distribuída:</strong> Créditos podem ser usados em outras unidades</li>
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
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const consumoMensal = ref(500)
const tarifaEnergia = ref(0.85)
const potenciaSistema = ref(5)
const custoInstalacao = ref(25000)
const taxaAumento = ref(5)
const degradacao = ref(0.5)
const resultado = ref(null)

// 1 kWp gera aproximadamente 130 kWh/mês no Brasil (média)
const geracaoMensal = computed(() => {
  return (Number(potenciaSistema.value) * 130).toFixed(0)
})

const economiaMensal = computed(() => {
  const geracao = Number(geracaoMensal.value)
  const consumo = Number(consumoMensal.value)
  const economiaKwh = Math.min(geracao, consumo)
  return (economiaKwh * Number(tarifaEnergia.value)).toFixed(2)
})

const percentualReducao = computed(() => {
  const geracao = Number(geracaoMensal.value)
  const consumo = Number(consumoMensal.value)
  return ((Math.min(geracao, consumo) / consumo) * 100).toFixed(0)
})

const custoPorkWp = computed(() => {
  return (Number(custoInstalacao.value) / Number(potenciaSistema.value)).toFixed(2)
})

const calcular = () => {
  const custo = Number(custoInstalacao.value)
  const economiaInicial = Number(economiaMensal.value)
  const taxaAnual = Number(taxaAumento.value) / 100
  const degradacaoAnual = Number(degradacao.value) / 100
  
  let economiaAcumulada = 0
  let paybackAnos = 0
  let economia5 = 0
  let economia10 = 0
  let economia25 = 0
  let economiaAno1 = 0
  let economiaAno10 = 0
  let economiaAno25 = 0
  
  for (let ano = 1; ano <= 25; ano++) {
    const fatorTarifa = Math.pow(1 + taxaAnual, ano - 1)
    const fatorDegradacao = Math.pow(1 - degradacaoAnual, ano - 1)
    const economiaAnual = economiaInicial * 12 * fatorTarifa * fatorDegradacao
    
    economiaAcumulada += economiaAnual
    
    if (economiaAcumulada >= custo && paybackAnos === 0) {
      paybackAnos = ano
    }
    
    if (ano === 1) economiaAno1 = economiaAnual
    if (ano === 5) economia5 = economiaAcumulada
    if (ano === 10) {
      economia10 = economiaAcumulada
      economiaAno10 = economiaAnual
    }
    if (ano === 25) {
      economia25 = economiaAcumulada
      economiaAno25 = economiaAnual
    }
  }
  
  const paybackMeses = paybackAnos * 12
  const roi = ((economia25 / custo - 1) * 100)
  
  // Impacto ambiental
  const energiaTotalKwh = Number(geracaoMensal.value) * 12 * 25
  const energiaTotalMWh = (energiaTotalKwh / 1000).toFixed(1)
  const co2Evitado = (energiaTotalKwh * 0.0008).toFixed(1) // 0.8 kg CO2 por kWh
  const arvores = Math.round(Number(co2Evitado) / 0.021) // 1 árvore absorve ~21kg CO2/ano

  resultado.value = {
    paybackAnos: paybackAnos.toFixed(1),
    paybackMeses: paybackMeses,
    economia5Anos: economia5.toFixed(2),
    economia10Anos: economia10.toFixed(2),
    economia25Anos: economia25.toFixed(2),
    economiaAno1: economiaAno1.toFixed(2),
    economiaAno10: economiaAno10.toFixed(2),
    economiaAno25: economiaAno25.toFixed(2),
    roi: roi.toFixed(0),
    co2Evitado: co2Evitado,
    arvores: arvores,
    energiaTotal: energiaTotalMWh
  }

  trackToolUsage('Simulador Energia Solar', 'calculate')
}
</script>
