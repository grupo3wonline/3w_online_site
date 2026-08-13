<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <i class="fas fa-bullhorn text-orange-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Calculadora de Anúncios</h1>
        <p class="text-gray-600">Analise o ROI e desempenho das suas campanhas</p>
      </div>

      <div class="space-y-6">
        <!-- Modo de Cálculo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            <i class="fas fa-cogs mr-2 text-orange-600"></i>
            Tipo de Análise
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="modo = 'roi'"
              :class="[
                'p-4 rounded-lg border-2 transition',
                modo === 'roi'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-300 hover:border-orange-300'
              ]"
            >
              <i class="fas fa-chart-line mb-2"></i>
              <div class="font-semibold">ROI e Conversão</div>
            </button>
            <button
              @click="modo = 'metricas'"
              :class="[
                'p-4 rounded-lg border-2 transition',
                modo === 'metricas'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-300 hover:border-orange-300'
              ]"
            >
              <i class="fas fa-chart-bar mb-2"></i>
              <div class="font-semibold">Métricas Detalhadas</div>
            </button>
          </div>
        </div>

        <!-- ROI e Conversão -->
        <div v-if="modo === 'roi'" class="space-y-4">
          <BaseInput
            v-model="investimento"
            label="Investimento Total (R$)"
            type="number"
            :min="0"
            step="0.01"
            icon="fa-solid fa-dollar-sign"
          />
          
          <BaseInput
            v-model="conversoes"
            label="Número de Conversões"
            type="number"
            :min="0"
            icon="fa-solid fa-shopping-cart"
          />
          
          <BaseInput
            v-model="ticketMedio"
            label="Ticket Médio por Venda (R$)"
            type="number"
            :min="0"
            step="0.01"
            icon="fa-solid fa-money-bill"
          />
        </div>

        <!-- Métricas Detalhadas -->
        <div v-if="modo === 'metricas'" class="space-y-4">
          <BaseInput
            v-model="investimento"
            label="Investimento Total (R$)"
            type="number"
            :min="0"
            step="0.01"
            icon="fa-solid fa-dollar-sign"
          />
          
          <BaseInput
            v-model="impressoes"
            label="Impressões"
            type="number"
            :min="0"
            icon="fa-solid fa-eye"
          />
          
          <BaseInput
            v-model="cliques"
            label="Cliques"
            type="number"
            :min="0"
            icon="fa-solid fa-mouse-pointer"
          />
          
          <BaseInput
            v-model="conversoes"
            label="Conversões"
            type="number"
            :min="0"
            icon="fa-solid fa-check-circle"
          />
          
          <BaseInput
            v-model="faturamento"
            label="Faturamento Gerado (R$)"
            type="number"
            :min="0"
            step="0.01"
            icon="fa-solid fa-chart-line"
          />
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="calcular" variant="primary" class="flex-1">
            <i class="fas fa-calculator mr-2"></i>
            Calcular Resultados
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">{{ resultado.titulo }}</div>
            <div class="text-5xl font-bold mb-2">{{ resultado.valorPrincipal }}</div>
            <div class="text-orange-100">{{ resultado.subtitulo }}</div>
          </div>

          <!-- Métricas Principais -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="metrica in resultado.metricas" :key="metrica.label" class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold" :class="metrica.cor">{{ metrica.valor }}</div>
              <div class="text-sm text-gray-600">{{ metrica.label }}</div>
            </div>
          </div>

          <!-- Detalhamento -->
          <div class="bg-gray-50 rounded-lg p-6 space-y-3">
            <h4 class="font-semibold text-gray-900 mb-4">Análise Detalhada</h4>
            
            <div v-for="item in resultado.detalhes" :key="item.label" class="flex justify-between text-sm">
              <span class="text-gray-600">{{ item.label }}:</span>
              <span class="font-medium">{{ item.valor }}</span>
            </div>
          </div>

          <!-- Performance -->
          <div :class="[
            'border-l-4 p-4 rounded',
            resultado.performance === 'Excelente' ? 'bg-green-50 border-green-500' :
            resultado.performance === 'Bom' ? 'bg-blue-50 border-blue-500' :
            resultado.performance === 'Regular' ? 'bg-yellow-50 border-yellow-500' :
            'bg-red-50 border-red-500'
          ]">
            <div class="flex items-start">
              <i :class="[
                'fas mt-1 mr-3',
                resultado.performance === 'Excelente' ? 'fa-check-circle text-green-600' :
                resultado.performance === 'Bom' ? 'fa-thumbs-up text-blue-600' :
                resultado.performance === 'Regular' ? 'fa-exclamation-triangle text-yellow-600' :
                'fa-times-circle text-red-600'
              ]"></i>
              <div class="text-sm">
                <p class="font-semibold mb-2">Performance: {{ resultado.performance }}</p>
                <p class="text-gray-700">{{ resultado.recomendacao }}</p>
              </div>
            </div>
          </div>

          <!-- Dicas -->
          <div class="bg-orange-50 border-l-4 border-orange-500 p-4">
            <div class="flex">
              <i class="fas fa-lightbulb text-orange-600 mt-1 mr-3"></i>
              <div class="text-sm text-orange-800">
                <p class="font-semibold mb-2">Dicas para Melhorar:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="dica in resultado.dicas" :key="dica">{{ dica }}</li>
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

const modo = ref('roi')
const investimento = ref(1000)
const conversoes = ref(50)
const ticketMedio = ref(100)
const impressoes = ref(50000)
const cliques = ref(1000)
const faturamento = ref(5000)

const resultado = ref(null)

const calcular = () => {
  const invest = Number(investimento.value)
  const conv = Number(conversoes.value)
  
  if (invest <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite o investimento' })
    return
  }

  if (modo.value === 'roi') {
    const ticket = Number(ticketMedio.value)
    
    if (conv <= 0 || ticket <= 0) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Preencha todos os campos' })
      return
    }

    const receitaTotal = conv * ticket
    const lucro = receitaTotal - invest
    const roi = ((lucro / invest) * 100).toFixed(2)
    const cpa = (invest / conv).toFixed(2)
    
    let performance = 'Ruim'
    let recomendacao = 'ROI negativo. Revise estratégia de anúncios.'
    
    if (Number(roi) >= 300) {
      performance = 'Excelente'
      recomendacao = 'Campanha muito lucrativa! Considere aumentar investimento.'
    } else if (Number(roi) >= 150) {
      performance = 'Bom'
      recomendacao = 'Bom retorno. Otimize para melhorar ainda mais.'
    } else if (Number(roi) >= 50) {
      performance = 'Regular'
      recomendacao = 'Retorno moderado. Teste novas segmentações.'
    }

    const dicas = []
    if (Number(cpa) > ticket * 0.3) {
      dicas.push('CPA alto - otimize palavras-chave e segmentação')
    }
    if (Number(roi) < 100) {
      dicas.push('Teste diferentes criativos e públicos')
    }
    dicas.push('Monitore métricas diariamente para ajustes rápidos')

    resultado.value = {
      titulo: 'ROI da Campanha',
      valorPrincipal: `${roi}%`,
      subtitulo: `Lucro: R$ ${lucro.toFixed(2)}`,
      metricas: [
        { label: 'Investimento', valor: `R$ ${invest.toFixed(2)}`, cor: 'text-orange-600' },
        { label: 'Receita', valor: `R$ ${receitaTotal.toFixed(2)}`, cor: 'text-green-600' },
        { label: 'CPA', valor: `R$ ${cpa}`, cor: 'text-blue-600' },
        { label: 'Conversões', valor: conv, cor: 'text-purple-600' }
      ],
      detalhes: [
        { label: 'Investimento Total', valor: `R$ ${invest.toFixed(2)}` },
        { label: 'Número de Conversões', valor: conv },
        { label: 'Ticket Médio', valor: `R$ ${ticket.toFixed(2)}` },
        { label: 'Receita Total', valor: `R$ ${receitaTotal.toFixed(2)}` },
        { label: 'Lucro Líquido', valor: `R$ ${lucro.toFixed(2)}` },
        { label: 'ROI', valor: `${roi}%` },
        { label: 'Custo por Aquisição', valor: `R$ ${cpa}` }
      ],
      performance,
      recomendacao,
      dicas
    }
  } else {
    const impr = Number(impressoes.value)
    const clicks = Number(cliques.value)
    const fat = Number(faturamento.value)
    
    if (impr <= 0 || clicks <= 0 || conv <= 0 || fat <= 0) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Preencha todos os campos' })
      return
    }

    const ctr = ((clicks / impr) * 100).toFixed(2)
    const taxaConversao = ((conv / clicks) * 100).toFixed(2)
    const cpc = (invest / clicks).toFixed(2)
    const cpm = ((invest / impr) * 1000).toFixed(2)
    const cpa = (invest / conv).toFixed(2)
    const lucro = fat - invest
    const roi = ((lucro / invest) * 100).toFixed(2)
    
    let performance = 'Ruim'
    let recomendacao = 'Métricas abaixo do esperado.'
    
    if (Number(roi) >= 200 && Number(ctr) >= 2 && Number(taxaConversao) >= 3) {
      performance = 'Excelente'
      recomendacao = 'Todas as métricas em níveis ótimos!'
    } else if (Number(roi) >= 100 && Number(ctr) >= 1) {
      performance = 'Bom'
      recomendacao = 'Boas métricas. Continue otimizando.'
    } else if (Number(roi) >= 0) {
      performance = 'Regular'
      recomendacao = 'Campanha equilibrada. Há espaço para melhorias.'
    }

    const dicas = []
    if (Number(ctr) < 1) {
      dicas.push('CTR baixo - melhore títulos e criativos')
    }
    if (Number(taxaConversao) < 2) {
      dicas.push('Taxa de conversão baixa - otimize landing page')
    }
    if (Number(cpc) > 2) {
      dicas.push('CPC alto - refine segmentação de público')
    }

    resultado.value = {
      titulo: 'ROI da Campanha',
      valorPrincipal: `${roi}%`,
      subtitulo: `Lucro: R$ ${lucro.toFixed(2)}`,
      metricas: [
        { label: 'CTR', valor: `${ctr}%`, cor: 'text-blue-600' },
        { label: 'Taxa Conv.', valor: `${taxaConversao}%`, cor: 'text-green-600' },
        { label: 'CPC', valor: `R$ ${cpc}`, cor: 'text-orange-600' },
        { label: 'CPA', valor: `R$ ${cpa}`, cor: 'text-purple-600' }
      ],
      detalhes: [
        { label: 'Impressões', valor: impr.toLocaleString('pt-BR') },
        { label: 'Cliques', valor: clicks.toLocaleString('pt-BR') },
        { label: 'CTR', valor: `${ctr}%` },
        { label: 'Conversões', valor: conv },
        { label: 'Taxa de Conversão', valor: `${taxaConversao}%` },
        { label: 'CPC', valor: `R$ ${cpc}` },
        { label: 'CPM', valor: `R$ ${cpm}` },
        { label: 'CPA', valor: `R$ ${cpa}` },
        { label: 'Faturamento', valor: `R$ ${fat.toFixed(2)}` },
        { label: 'ROI', valor: `${roi}%` }
      ],
      performance,
      recomendacao,
      dicas
    }
  }
}

const limpar = () => {
  investimento.value = 1000
  conversoes.value = 50
  ticketMedio.value = 100
  impressoes.value = 50000
  cliques.value = 1000
  faturamento.value = 5000
  resultado.value = null
}
</script>
