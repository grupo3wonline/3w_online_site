<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-hands-helping text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de INSS</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule suas contribuições e benefícios previdenciários</p>
      </div>

      <div class="space-y-6">
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="tipoCalculo = 'contribuicao'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="tipoCalculo === 'contribuicao' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-money-bill-wave mr-2"></i>
            Contribuição Mensal
          </button>
          <button @click="tipoCalculo = 'beneficio'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="tipoCalculo === 'beneficio' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-gift mr-2"></i>
            Benefício Futuro
          </button>
        </div>

        <div v-if="tipoCalculo === 'contribuicao'" class="space-y-4">
          <BaseInput v-model="salarioBruto" label="Salário Bruto (R$)" type="number" :min="0" step="100" icon="fa-solid fa-money-bill" />
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Segurado</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button @click="tipoSegurado = 'empregado'" class="p-4 rounded-lg border-2 transition-all text-left" :class="tipoSegurado === 'empregado' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600'">
                <div class="font-bold text-gray-900 dark:text-white">Empregado CLT</div>
                <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Desconto de 7,5% a 14%</div>
              </button>
              <button @click="tipoSegurado = 'autonomo'" class="p-4 rounded-lg border-2 transition-all text-left" :class="tipoSegurado === 'autonomo' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600'">
                <div class="font-bold text-gray-900 dark:text-white">Autônomo/MEI</div>
                <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Contribuição variável</div>
              </button>
            </div>
          </div>

          <BaseButton @click="calcularContribuicao" variant="primary" class="w-full">
            <i class="fas fa-calculator mr-2"></i>
            Calcular Contribuição
          </BaseButton>
        </div>

        <div v-else class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput v-model="idadeAtual" label="Idade Atual" type="number" :min="18" :max="80" icon="fa-solid fa-user" />
            <BaseInput v-model="tempoContribuicao" label="Tempo de Contribuição (anos)" type="number" :min="0" :max="50" icon="fa-solid fa-calendar-check" />
            <BaseInput v-model="mediaSalarial" label="Média Salarial Histórica (R$)" type="number" :min="0" step="100" icon="fa-solid fa-chart-line" />
          </div>

          <BaseButton @click="calcularBeneficio" variant="primary" class="w-full">
            <i class="fas fa-calculator mr-2"></i>
            Simular Benefício
          </BaseButton>
        </div>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">{{ resultado.titulo }}</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.valor }}</div>
            <div class="text-purple-100">{{ resultado.subtitulo }}</div>
          </div>

          <div v-if="resultado.detalhes" class="space-y-3">
            <div v-for="item in resultado.detalhes" :key="item.label" class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">{{ item.label }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ item.descricao }}</div>
              </div>
              <div class="text-xl font-bold text-purple-600 dark:text-purple-400">{{ item.valor }}</div>
            </div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
              <div class="text-sm text-purple-800 dark:text-purple-300">
                <p class="font-semibold mb-2">{{ resultado.infoTitulo }}</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li v-for="info in resultado.infos" :key="info">{{ info }}</li>
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

const tipoCalculo = ref('contribuicao')
const salarioBruto = ref(3000)
const tipoSegurado = ref('empregado')
const idadeAtual = ref(35)
const tempoContribuicao = ref(15)
const mediaSalarial = ref(3500)
const resultado = ref(null)

const calcularContribuicao = () => {
  const salario = Number(salarioBruto.value)
  
  if (tipoSegurado.value === 'empregado') {
    // Tabela progressiva INSS 2025
    let inss = 0
    if (salario <= 1412) {
      inss = salario * 0.075
    } else if (salario <= 2666.68) {
      inss = 1412 * 0.075 + (salario - 1412) * 0.09
    } else if (salario <= 4000.03) {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salario - 2666.68) * 0.12
    } else if (salario <= 7786.02) {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salario - 4000.03) * 0.14
    } else {
      inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14
    }
    
    const aliquotaEfetiva = (inss / salario) * 100
    const salarioLiquido = salario - inss
    const contribuicaoAnual = inss * 12
    
    resultado.value = {
      titulo: 'Contribuição Mensal INSS',
      valor: inss.toFixed(2),
      subtitulo: `Alíquota efetiva: ${aliquotaEfetiva.toFixed(2)}%`,
      detalhes: [
        { label: 'Salário Bruto', descricao: 'Valor antes dos descontos', valor: `R$ ${salario.toFixed(2)}` },
        { label: 'Desconto INSS', descricao: 'Contribuição progressiva', valor: `R$ ${inss.toFixed(2)}` },
        { label: 'Salário após INSS', descricao: 'Valor que recebe', valor: `R$ ${salarioLiquido.toFixed(2)}` },
        { label: 'Contribuição Anual', descricao: '12 meses × desconto', valor: `R$ ${contribuicaoAnual.toFixed(2)}` }
      ],
      infoTitulo: 'Tabela INSS 2025 (Progressiva):',
      infos: [
        'Até R$ 1.412,00: 7,5%',
        'De R$ 1.412,01 a R$ 2.666,68: 9%',
        'De R$ 2.666,69 a R$ 4.000,03: 12%',
        'De R$ 4.000,04 a R$ 7.786,02: 14%',
        'Teto máximo de contribuição: R$ 908,86'
      ]
    }
  } else {
    // Autônomo/MEI
    const contribuicaoMEI = 70.60 // 5% salário mínimo (R$ 1.412)
    const contribuicaoAutonomo20 = salario * 0.20 // 20% sobre salário
    const contribuicaoAutonomo11 = 1412 * 0.11 // 11% sobre salário mínimo
    
    resultado.value = {
      titulo: 'Opções de Contribuição',
      valor: contribuicaoAutonomo20.toFixed(2),
      subtitulo: 'Escolha a melhor modalidade para você',
      detalhes: [
        { label: 'MEI (5%)', descricao: 'Aposentadoria por idade apenas', valor: `R$ ${contribuicaoMEI.toFixed(2)}` },
        { label: 'Autônomo (11%)', descricao: 'Aposentadoria por idade apenas', valor: `R$ ${contribuicaoAutonomo11.toFixed(2)}` },
        { label: 'Autônomo (20%)', descricao: 'Todos os benefícios', valor: `R$ ${contribuicaoAutonomo20.toFixed(2)}` }
      ],
      infoTitulo: 'Diferenças entre modalidades:',
      infos: [
        'MEI: Apenas aposentadoria por idade (1 salário mínimo)',
        '11%: Apenas aposentadoria por idade (1 salário mínimo)',
        '20%: Aposentadoria por idade e por tempo de contribuição',
        'Complementação permitida para aumentar benefício'
      ]
    }
  }

  trackToolUsage('Simulador INSS', 'contribuicao', { tipo: tipoSegurado.value })
}

const calcularBeneficio = () => {
  const idade = Number(idadeAtual.value)
  const tempoContrib = Number(tempoContribuicao.value)
  const mediaSal = Number(mediaSalarial.value)
  
  // Regras de 2025 (EC 103/2019 - Reforma da Previdência)
  const idadeMinimaHomem = 65
  const idadeMinimaMulher = 62
  const tempoMinimoContribuicao = 15
  
  // Cálculo simplificado do benefício
  // 60% + 2% por ano acima de 15 anos de contribuição
  let percentual = 0.60
  if (tempoContrib > 15) {
    percentual += (tempoContrib - 15) * 0.02
  }
  percentual = Math.min(percentual, 1.0) // Máximo 100%
  
  const beneficioEstimado = mediaSal * percentual
  const anosRestantesHomem = Math.max(0, idadeMinimaHomem - idade)
  const anosRestantesMulher = Math.max(0, idadeMinimaMulher - idade)
  const tempoRestante = Math.max(0, tempoMinimoContribuicao - tempoContrib)
  
  resultado.value = {
    titulo: 'Benefício Estimado',
    valor: beneficioEstimado.toFixed(2),
    subtitulo: `${(percentual * 100).toFixed(0)}% da média salarial`,
    detalhes: [
      { label: 'Tempo de Contribuição', descricao: 'Anos contribuídos', valor: `${tempoContrib} anos` },
      { label: 'Percentual do Benefício', descricao: 'Com base no tempo', valor: `${(percentual * 100).toFixed(0)}%` },
      { label: 'Idade para Aposentar (Homem)', descricao: 'Requisito mínimo', valor: `${idadeMinimaHomem} anos` },
      { label: 'Idade para Aposentar (Mulher)', descricao: 'Requisito mínimo', valor: `${idadeMinimaMulher} anos` }
    ],
    infoTitulo: 'Requisitos para Aposentadoria (2025):',
    infos: [
      `Homens: ${idadeMinimaHomem} anos de idade + ${tempoMinimoContribuicao} anos de contribuição`,
      `Mulheres: ${idadeMinimaMulher} anos de idade + ${tempoMinimoContribuicao} anos de contribuição`,
      `Faltam ${tempoRestante > 0 ? tempoRestante : 0} anos de contribuição para requisito mínimo`,
      `Benefício = 60% + 2% por ano acima de 15 anos de contribuição`,
      'Média de 100% dos salários desde julho/1994'
    ]
  }

  trackToolUsage('Simulador INSS', 'beneficio')
}
</script>
