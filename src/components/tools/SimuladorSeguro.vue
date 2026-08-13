<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-900/30 rounded-full mb-4">
          <i class="fas fa-shield-alt text-slate-600 dark:text-slate-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Seguro</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o custo de seguros e coberturas</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Seguro</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button @click="tipoSeguro = 'auto'" class="p-4 rounded-lg border-2 transition-all" :class="tipoSeguro === 'auto' ? 'border-slate-500 bg-slate-50 dark:bg-slate-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-car text-2xl mb-2 text-slate-600 dark:text-slate-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Automóvel</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Seguro de carro</div>
            </button>
            <button @click="tipoSeguro = 'residencial'" class="p-4 rounded-lg border-2 transition-all" :class="tipoSeguro === 'residencial' ? 'border-slate-500 bg-slate-50 dark:bg-slate-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-home text-2xl mb-2 text-slate-600 dark:text-slate-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Residencial</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Seguro de casa</div>
            </button>
            <button @click="tipoSeguro = 'vida'" class="p-4 rounded-lg border-2 transition-all" :class="tipoSeguro === 'vida' ? 'border-slate-500 bg-slate-50 dark:bg-slate-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-heart text-2xl mb-2 text-slate-600 dark:text-slate-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Vida</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Seguro de vida</div>
            </button>
          </div>
        </div>

        <div v-if="tipoSeguro === 'auto'" class="space-y-4">
          <BaseInput v-model="valorVeiculo" label="Valor do Veículo (R$)" type="number" :min="0" step="1000" icon="fa-solid fa-car" />
          <BaseInput v-model="idadeCondutor" label="Idade do Condutor" type="number" :min="18" :max="100" icon="fa-solid fa-user" />
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Perfil de Uso</label>
            <select v-model="perfilUso" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="lazer">Lazer (uso eventual)</option>
              <option value="trabalho">Trabalho (uso diário)</option>
              <option value="uber">Uber/App (profissional)</option>
            </select>
          </div>
          <BaseInput v-model="franquia" label="Franquia (R$)" type="number" :min="0" step="500" icon="fa-solid fa-dollar-sign" />
        </div>

        <div v-if="tipoSeguro === 'residencial'" class="space-y-4">
          <BaseInput v-model="valorImovel" label="Valor do Imóvel (R$)" type="number" :min="0" step="10000" icon="fa-solid fa-home" />
          <BaseInput v-model="valorConteudo" label="Valor do Conteúdo (R$)" type="number" :min="0" step="5000" icon="fa-solid fa-couch" />
          <div>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input v-model="coberturaIncendio" type="checkbox" class="w-4 h-4 text-slate-600 border-gray-300 rounded focus:ring-slate-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Cobertura contra incêndio</span>
            </label>
          </div>
          <div>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input v-model="coberturaRoubo" type="checkbox" class="w-4 h-4 text-slate-600 border-gray-300 rounded focus:ring-slate-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Cobertura contra roubo</span>
            </label>
          </div>
        </div>

        <div v-if="tipoSeguro === 'vida'" class="space-y-4">
          <BaseInput v-model="capitalSegurado" label="Capital Segurado (R$)" type="number" :min="0" step="10000" icon="fa-solid fa-hand-holding-dollar" />
          <BaseInput v-model="idadeContratante" label="Idade do Contratante" type="number" :min="18" :max="80" icon="fa-solid fa-user" />
          <div>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input v-model="fumante" type="checkbox" class="w-4 h-4 text-slate-600 border-gray-300 rounded focus:ring-slate-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Fumante</span>
            </label>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Prêmio do Seguro
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Prêmio Anual do Seguro</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.premioAnual }}</div>
            <div class="text-slate-100">ou {{ resultado.parcelas }}x de R$ {{ resultado.premioMensal }}</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-slate-600 dark:text-slate-400">{{ resultado.percentual }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">% do Valor</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ resultado.cobertura }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Cobertura Total</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-slate-600 dark:text-slate-400">R$ {{ resultado.custoCincoAnos }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Custo 5 anos</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-slate-600 dark:text-slate-400">{{ resultado.perfil }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Perfil de Risco</div>
            </div>
          </div>

          <div class="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-slate-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-slate-600 dark:text-slate-400 mt-1 mr-3"></i>
              <div class="text-sm text-slate-800 dark:text-slate-300">
                <p class="font-semibold mb-2">Dicas sobre seguros:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Compare:</strong> Cotação em pelo menos 3 seguradoras diferentes</li>
                  <li><strong>Franquia:</strong> Franquia maior = prêmio menor</li>
                  <li><strong>Cobertura:</strong> Entenda o que está e o que não está coberto</li>
                  <li><strong>Perfil:</strong> Jovens e fumantes pagam mais (maior risco)</li>
                  <li><strong>Desconto:</strong> Bônus por não sinistro pode reduzir até 50%</li>
                  <li><strong>Renovação:</strong> Reavalie anualmente - pode conseguir melhor preço</li>
                  <li><strong>Carência:</strong> Alguns seguros têm período de carência</li>
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

const tipoSeguro = ref('auto')
const valorVeiculo = ref(50000)
const idadeCondutor = ref(30)
const perfilUso = ref('lazer')
const franquia = ref(2000)
const valorImovel = ref(300000)
const valorConteudo = ref(50000)
const coberturaIncendio = ref(true)
const coberturaRoubo = ref(true)
const capitalSegurado = ref(500000)
const idadeContratante = ref(35)
const fumante = ref(false)
const resultado = ref(null)

const calcular = () => {
  let premioAnual = 0
  let cobertura = 0
  let perfil = 'Médio'
  
  if (tipoSeguro.value === 'auto') {
    const valor = Number(valorVeiculo.value)
    const idade = Number(idadeCondutor.value)
    
    let taxa = 0.06 // 6% base
    
    if (idade < 25) taxa += 0.02
    else if (idade > 60) taxa += 0.01
    
    if (perfilUso.value === 'trabalho') taxa += 0.01
    else if (perfilUso.value === 'uber') taxa += 0.03
    
    if (Number(franquia.value) > 3000) taxa -= 0.01
    
    premioAnual = valor * taxa
    cobertura = valor
    perfil = idade < 25 || perfilUso.value === 'uber' ? 'Alto' : idade > 50 && perfilUso.value === 'lazer' ? 'Baixo' : 'Médio'
    
  } else if (tipoSeguro.value === 'residencial') {
    const valorIm = Number(valorImovel.value)
    const valorCont = Number(valorConteudo.value)
    
    let taxa = 0.003 // 0,3% base
    
    if (coberturaIncendio.value) taxa += 0.001
    if (coberturaRoubo.value) taxa += 0.002
    
    premioAnual = (valorIm + valorCont) * taxa
    cobertura = valorIm + valorCont
    perfil = coberturaIncendio.value && coberturaRoubo.value ? 'Completo' : 'Básico'
    
  } else if (tipoSeguro.value === 'vida') {
    const capital = Number(capitalSegurado.value)
    const idade = Number(idadeContratante.value)
    
    let taxa = 0.002 // 0,2% base
    
    if (idade < 30) taxa = 0.0015
    else if (idade > 50) taxa = 0.004
    else if (idade > 60) taxa = 0.007
    
    if (fumante.value) taxa *= 1.5
    
    premioAnual = capital * taxa
    cobertura = capital
    perfil = fumante.value || idade > 60 ? 'Alto' : idade < 40 ? 'Baixo' : 'Médio'
  }
  
  const premioMensal = premioAnual / 12
  const percentual = cobertura > 0 ? ((premioAnual / cobertura) * 100) : 0
  const custoCincoAnos = premioAnual * 5

  resultado.value = {
    premioAnual: premioAnual.toFixed(2),
    premioMensal: premioMensal.toFixed(2),
    parcelas: '12',
    cobertura: cobertura.toFixed(2),
    percentual: percentual.toFixed(2),
    custoCincoAnos: custoCincoAnos.toFixed(2),
    perfil: perfil
  }

  trackToolUsage('Simulador Seguro', 'calculate', { tipo: tipoSeguro.value })
}
</script>
