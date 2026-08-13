<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <i class="fas fa-handshake-slash text-red-600 dark:text-red-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Rescisão Trabalhista</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule os valores da rescisão de contrato</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="salarioBruto" label="Salário Bruto (R$)" type="number" :min="0" step="100" icon="fa-solid fa-money-bill" />
          <BaseInput v-model="mesesTrabalhados" label="Meses Trabalhados" type="number" :min="1" icon="fa-solid fa-calendar-days" />
          <BaseInput v-model="diasAviso" label="Dias Aviso Prévio" type="number" :min="0" :max="90" icon="fa-solid fa-bell" />
          <BaseInput v-model="diasFeriasVencidas" label="Dias Férias Vencidas" type="number" :min="0" :max="30" icon="fa-solid fa-umbrella-beach" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Rescisão</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button @click="tipoRescisao = 'semJustaCausa'" class="p-4 rounded-lg border-2 transition-all" :class="tipoRescisao === 'semJustaCausa' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">Demissão sem Justa Causa</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Empresa demite</div>
            </button>
            <button @click="tipoRescisao = 'pedido'" class="p-4 rounded-lg border-2 transition-all" :class="tipoRescisao === 'pedido' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">Pedido de Demissão</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Funcionário pede</div>
            </button>
            <button @click="tipoRescisao = 'acordo'" class="p-4 rounded-lg border-2 transition-all" :class="tipoRescisao === 'acordo' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">Acordo Trabalhista</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Comum acordo</div>
            </button>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Rescisão
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Total a Receber</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.totalLiquido }}</div>
            <div class="text-red-100">{{ getNomeRescisao() }}</div>
          </div>

          <div class="space-y-3">
            <div v-for="item in resultado.verbas" :key="item.nome" class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">{{ item.nome }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ item.descricao }}</div>
              </div>
              <div class="text-xl font-bold text-red-600 dark:text-red-400">R$ {{ item.valor }}</div>
            </div>
          </div>

          <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-red-600 dark:text-red-400 mt-1 mr-3"></i>
              <div class="text-sm text-red-800 dark:text-red-300">
                <p class="font-semibold mb-2">{{ getDicasRescisao() }}</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li v-for="dica in getDicas()" :key="dica">{{ dica }}</li>
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

const salarioBruto = ref(3000)
const mesesTrabalhados = ref(12)
const diasAviso = ref(30)
const diasFeriasVencidas = ref(0)
const tipoRescisao = ref('semJustaCausa')
const resultado = ref(null)

const getNomeRescisao = () => {
  const nomes = {
    semJustaCausa: 'Demissão sem Justa Causa',
    pedido: 'Pedido de Demissão',
    acordo: 'Acordo Trabalhista'
  }
  return nomes[tipoRescisao.value]
}

const getDicasRescisao = () => {
  const dicas = {
    semJustaCausa: 'Verbas Rescisórias - Demissão sem Justa Causa:',
    pedido: 'Verbas Rescisórias - Pedido de Demissão:',
    acordo: 'Verbas Rescisórias - Acordo Trabalhista:'
  }
  return dicas[tipoRescisao.value]
}

const getDicas = () => {
  const dicas = {
    semJustaCausa: [
      'Saque de 100% do saldo do FGTS',
      'Multa de 40% do FGTS depositada pela empresa',
      'Direito ao Seguro-Desemprego',
      'Pagamento em até 10 dias após desligamento'
    ],
    pedido: [
      'Não tem direito ao saque do FGTS',
      'Não recebe multa de 40% do FGTS',
      'Não tem direito ao Seguro-Desemprego',
      'Pode descontar aviso prévio não cumprido'
    ],
    acordo: [
      'Saque de 80% do saldo do FGTS',
      'Multa de 20% do FGTS (metade da empresa)',
      'Não tem direito ao Seguro-Desemprego',
      'Modalidade criada pela Reforma Trabalhista 2017'
    ]
  }
  return dicas[tipoRescisao.value]
}

const calcular = () => {
  const salario = Number(salarioBruto.value)
  const meses = Number(mesesTrabalhados.value)
  const aviso = Number(diasAviso.value)
  const feriasVencidas = Number(diasFeriasVencidas.value)
  
  const salarioDia = salario / 30
  const verbas = []
  
  // Saldo de Salário (proporcional)
  const diasTrabalhados = 15 // exemplo
  const saldoSalario = salarioDia * diasTrabalhados
  verbas.push({ nome: 'Saldo de Salário', descricao: `${diasTrabalhados} dias trabalhados`, valor: saldoSalario.toFixed(2) })
  
  // 13º Proporcional
  const decimoTerceiro = (salario / 12) * (meses % 12)
  verbas.push({ nome: '13º Salário Proporcional', descricao: `${meses % 12} meses`, valor: decimoTerceiro.toFixed(2) })
  
  // Férias Proporcionais
  const feriasProporcionais = ((salario / 12) * (meses % 12)) * (4/3)
  verbas.push({ nome: 'Férias Proporcionais + 1/3', descricao: `${meses % 12} meses`, valor: feriasProporcionais.toFixed(2) })
  
  // Férias Vencidas
  if (feriasVencidas > 0) {
    const feriasVencidasValor = (salarioDia * feriasVencidas) * (4/3)
    verbas.push({ nome: 'Férias Vencidas + 1/3', descricao: `${feriasVencidas} dias`, valor: feriasVencidasValor.toFixed(2) })
  }
  
  // Aviso Prévio
  if (tipoRescisao.value !== 'pedido') {
    const avisoPrevio = salarioDia * aviso
    verbas.push({ nome: 'Aviso Prévio', descricao: `${aviso} dias`, valor: avisoPrevio.toFixed(2) })
  }
  
  // FGTS (8% mensal)
  const anosTrabalhados = Math.floor(meses / 12)
  const saldoFGTS = salario * meses * 0.08
  
  if (tipoRescisao.value === 'semJustaCausa') {
    verbas.push({ nome: 'Saldo FGTS', descricao: `${meses} meses de depósitos`, valor: saldoFGTS.toFixed(2) })
    verbas.push({ nome: 'Multa 40% FGTS', descricao: 'Indenização da empresa', valor: (saldoFGTS * 0.4).toFixed(2) })
  } else if (tipoRescisao.value === 'acordo') {
    verbas.push({ nome: 'Saque 80% FGTS', descricao: 'Acordo trabalhista', valor: (saldoFGTS * 0.8).toFixed(2) })
    verbas.push({ nome: 'Multa 20% FGTS', descricao: 'Metade da multa', valor: (saldoFGTS * 0.2).toFixed(2) })
  }
  
  const totalLiquido = verbas.reduce((sum, v) => sum + Number(v.valor), 0)
  
  resultado.value = {
    verbas,
    totalLiquido: totalLiquido.toFixed(2)
  }

  trackToolUsage('Simulador Rescisão', 'calculate', { tipo: tipoRescisao.value })
}
</script>
