<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-full mb-4">
          <i class="fas fa-home text-fuchsia-600 dark:text-fuchsia-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador: Alugar ou Comprar?</h1>
        <p class="text-gray-600 dark:text-gray-400">Compare custos de aluguel vs compra de imóvel</p>
      </div>

      <div class="space-y-6">
        <div class="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-4">
          <h3 class="font-bold text-gray-900 dark:text-white mb-3">Opção 1: Comprar Imóvel</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput v-model="valorImovel" label="Valor do Imóvel (R$)" type="number" :min="0" step="10000" icon="fa-solid fa-home" />
            <BaseInput v-model="entrada" label="Entrada (R$)" type="number" :min="0" step="5000" icon="fa-solid fa-hand-holding-dollar" />
            <BaseInput v-model="prazoFinanciamento" label="Prazo Financiamento (anos)" type="number" :min="1" :max="35" icon="fa-solid fa-calendar" />
            <BaseInput v-model="taxaFinanciamento" label="Taxa de Juros (% a.a.)" type="number" step="0.1" icon="fa-solid fa-percentage" />
            <BaseInput v-model="iptu" label="IPTU Anual (R$)" type="number" :min="0" step="100" icon="fa-solid fa-file-invoice-dollar" />
            <BaseInput v-model="condominio" label="Condomínio Mensal (R$)" type="number" :min="0" step="50" icon="fa-solid fa-building" />
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 class="font-bold text-gray-900 dark:text-white mb-3">Opção 2: Alugar Imóvel</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput v-model="valorAluguel" label="Valor do Aluguel (R$)" type="number" :min="0" step="100" icon="fa-solid fa-key" />
            <BaseInput v-model="reajusteAluguel" label="Reajuste Anual (%)" type="number" step="0.5" icon="fa-solid fa-arrow-up" />
            <BaseInput v-model="rendimentoInvestimento" label="Rendimento da Entrada (%)" type="number" step="0.5" icon="fa-solid fa-chart-line" />
            <BaseInput v-model="prazoAnalise" label="Prazo de Análise (anos)" type="number" :min="1" :max="30" icon="fa-solid fa-hourglass" />
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Comparar Opções
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 rounded-2xl p-6 text-center text-white">
              <div class="text-sm font-medium mb-2">COMPRAR</div>
              <div class="text-4xl font-bold mb-2">R$ {{ resultado.custoCompra }}</div>
              <div class="text-fuchsia-100">Custo total em {{ prazoAnalise }} anos</div>
            </div>

            <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-center text-white">
              <div class="text-sm font-medium mb-2">ALUGAR</div>
              <div class="text-4xl font-bold mb-2">R$ {{ resultado.custoAluguel }}</div>
              <div class="text-blue-100">Custo total em {{ prazoAnalise }} anos</div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-500">
            <div class="text-center">
              <div class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ resultado.melhorOpcao }}</div>
              <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{{ resultado.vantagem }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ resultado.mensagem }}</div>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-fuchsia-600 dark:text-fuchsia-400">R$ {{ resultado.parcelaMedia }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Parcela Média</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.aluguelTotal }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Aluguel Total</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.patrimonioFinal }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Patrimônio Final</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ resultado.retornoInvestimento }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Retorno Entrada</div>
            </div>
          </div>

          <div class="bg-fuchsia-50 dark:bg-fuchsia-900/20 border-l-4 border-fuchsia-500 p-4">
            <div class="flex">
              <i class="fas fa-lightbulb text-fuchsia-600 dark:text-fuchsia-400 mt-1 mr-3"></i>
              <div class="text-sm text-fuchsia-800 dark:text-fuchsia-300">
                <p class="font-semibold mb-2">Fatores a considerar:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Comprar:</strong> Constrói patrimônio, custos de manutenção, menos flexibilidade</li>
                  <li><strong>Alugar:</strong> Mais flexibilidade, sem responsabilidade por manutenção</li>
                  <li><strong>Localização:</strong> Aluguel pode ser melhor em áreas caras</li>
                  <li><strong>Prazo:</strong> Compra geralmente compensa no longo prazo (10+ anos)</li>
                  <li><strong>Oportunidade:</strong> Entrada investida pode render mais que valorização do imóvel</li>
                  <li><strong>Estilo de vida:</strong> Considere mudanças de carreira/cidade</li>
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

const valorImovel = ref(500000)
const entrada = ref(100000)
const prazoFinanciamento = ref(30)
const taxaFinanciamento = ref(10)
const iptu = ref(3000)
const condominio = ref(500)
const valorAluguel = ref(2000)
const reajusteAluguel = ref(6)
const rendimentoInvestimento = ref(12)
const prazoAnalise = ref(10)
const resultado = ref(null)

const calcular = () => {
  const valorFinanciar = Number(valorImovel.value) - Number(entrada.value)
  const mesesFinanciamento = Number(prazoFinanciamento.value) * 12
  const taxaMensal = Number(taxaFinanciamento.value) / 100 / 12
  
  // Parcela do financiamento (PRICE)
  const parcela = valorFinanciar * (taxaMensal * Math.pow(1 + taxaMensal, mesesFinanciamento)) / (Math.pow(1 + taxaMensal, mesesFinanciamento) - 1)
  
  const anos = Number(prazoAnalise.value)
  const mesesAnalise = anos * 12
  const mesesPagar = Math.min(mesesAnalise, mesesFinanciamento)
  
  // Custos de compra
  let custoTotalCompra = Number(entrada.value)
  custoTotalCompra += parcela * mesesPagar
  custoTotalCompra += (Number(iptu.value) * anos)
  custoTotalCompra += (Number(condominio.value) * mesesAnalise)
  
  // Custos de aluguel
  let custoTotalAluguel = 0
  let aluguelAtual = Number(valorAluguel.value)
  const taxaReajuste = Number(reajusteAluguel.value) / 100
  
  for (let ano = 0; ano < anos; ano++) {
    custoTotalAluguel += aluguelAtual * 12
    aluguelAtual *= (1 + taxaReajuste)
  }
  
  // Investimento da entrada
  const taxaInvest = Number(rendimentoInvestimento.value) / 100
  const patrimonioInvestimento = Number(entrada.value) * Math.pow(1 + taxaInvest, anos)
  const retornoPercentual = ((patrimonioInvestimento / Number(entrada.value) - 1) * 100)
  
  // Patrimônio final (imóvel)
  const valorizacaoImovel = 1.05 // 5% a.a. (estimativa conservadora)
  const patrimonioImovel = Number(valorImovel.value) * Math.pow(valorizacaoImovel, anos)
  
  const diferenca = Math.abs(custoTotalCompra - custoTotalAluguel)
  const melhorOpcao = custoTotalCompra < custoTotalAluguel ? '✅ COMPRAR é mais vantajoso!' : '✅ ALUGAR é mais vantajoso!'
  const vantagem = custoTotalCompra < custoTotalAluguel ? 
    `Economia de R$ ${diferenca.toFixed(2)}` : 
    `Economia de R$ ${diferenca.toFixed(2)}`

  resultado.value = {
    custoCompra: custoTotalCompra.toFixed(2),
    custoAluguel: custoTotalAluguel.toFixed(2),
    melhorOpcao: melhorOpcao,
    vantagem: vantagem,
    mensagem: custoTotalCompra < custoTotalAluguel ? 
      'Comprar permite construir patrimônio no longo prazo' : 
      'Alugar oferece mais flexibilidade e liquidez',
    parcelaMedia: parcela.toFixed(2),
    aluguelTotal: custoTotalAluguel.toFixed(2),
    patrimonioFinal: patrimonioImovel.toFixed(2),
    retornoInvestimento: retornoPercentual.toFixed(1)
  }

  trackToolUsage('Simulador Aluguel', 'calculate')
}
</script>
