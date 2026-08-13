<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
          <i class="fas fa-credit-card text-orange-600 dark:text-orange-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Dívidas</h1>
        <p class="text-gray-600 dark:text-gray-400">Planeje a quitação das suas dívidas</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estratégia de Pagamento</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button @click="estrategia = 'bola-neve'" class="p-4 rounded-lg border-2 transition-all" :class="estrategia === 'bola-neve' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-snowflake text-2xl mb-2 text-orange-600 dark:text-orange-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Bola de Neve (Snowball)</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Menor saldo primeiro</div>
            </button>
            <button @click="estrategia = 'avalanche'" class="p-4 rounded-lg border-2 transition-all" :class="estrategia === 'avalanche' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-mountain text-2xl mb-2 text-orange-600 dark:text-orange-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Avalanche</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Maior juros primeiro</div>
            </button>
          </div>
        </div>

        <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-bold text-gray-900 dark:text-white">Minhas Dívidas</h3>
            <button @click="adicionarDivida" class="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm">
              <i class="fas fa-plus mr-1"></i> Adicionar
            </button>
          </div>
          
          <div v-if="dividas.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            Nenhuma dívida adicionada ainda
          </div>

          <div v-else class="space-y-3">
            <div v-for="(divida, index) in dividas" :key="index" class="bg-white dark:bg-gray-700 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input v-model="divida.nome" placeholder="Nome da dívida" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" />
                <input v-model="divida.saldo" type="number" placeholder="Saldo (R$)" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" />
                <input v-model="divida.juros" type="number" step="0.1" placeholder="Juros (% a.m.)" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" />
                <div class="flex gap-2">
                  <input v-model="divida.parcelaMin" type="number" placeholder="Parcela mín." class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" />
                  <button @click="removerDivida(index)" class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                    <i class="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BaseInput v-model="valorMensal" label="Valor Mensal Disponível (R$)" type="number" :min="0" step="100" icon="fa-solid fa-wallet" />

        <BaseButton @click="calcular" variant="primary" class="w-full" :disabled="dividas.length === 0">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Plano de Quitação
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Tempo para Quitar Todas</div>
            <div class="text-5xl font-bold mb-2">{{ resultado.meses }} meses</div>
            <div class="text-orange-100">{{ resultado.anos }} anos</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">R$ {{ resultado.totalDividas }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Dívidas</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">R$ {{ resultado.totalJuros }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Juros</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">R$ {{ resultado.totalPagar }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total a Pagar</div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
            <h3 class="font-bold text-gray-900 dark:text-white mb-3">Ordem de Pagamento ({{ estrategia === 'bola-neve' ? 'Bola de Neve' : 'Avalanche' }})</h3>
            <div class="space-y-2">
              <div v-for="(ordem, index) in resultado.ordem" :key="index" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">{{ index + 1 }}</div>
                  <div>
                    <div class="font-bold text-gray-900 dark:text-white">{{ ordem.nome }}</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Saldo: R$ {{ ordem.saldo }} | Juros: {{ ordem.juros }}% a.m.</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-orange-600 dark:text-orange-400">{{ ordem.mesesQuitacao }} meses</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">para quitar</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4">
            <div class="flex">
              <i class="fas fa-lightbulb text-orange-600 dark:text-orange-400 mt-1 mr-3"></i>
              <div class="text-sm text-orange-800 dark:text-orange-300">
                <p class="font-semibold mb-2">Dicas para quitar dívidas:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Bola de Neve:</strong> Pagamento psicológico - vitórias rápidas motivam</li>
                  <li><strong>Avalanche:</strong> Economiza mais dinheiro - elimina juros altos primeiro</li>
                  <li><strong>Evite novas dívidas:</strong> Suspenda cartões de crédito durante quitação</li>
                  <li><strong>Renda extra:</strong> Use 13º, bônus e rendas extras para acelerar</li>
                  <li><strong>Renegocie:</strong> Tente negociar taxas menores com credores</li>
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

const estrategia = ref('bola-neve')
const valorMensal = ref(2000)
const dividas = ref([])
const resultado = ref(null)

const adicionarDivida = () => {
  dividas.value.push({
    nome: `Dívida ${dividas.value.length + 1}`,
    saldo: 0,
    juros: 0,
    parcelaMin: 0
  })
}

const removerDivida = (index) => {
  dividas.value.splice(index, 1)
}

const calcular = () => {
  const valorDisponivel = Number(valorMensal.value)
  const listaDividas = dividas.value.map(d => ({
    nome: d.nome,
    saldo: Number(d.saldo),
    juros: Number(d.juros) / 100,
    parcelaMin: Number(d.parcelaMin)
  }))
  
  const totalDividas = listaDividas.reduce((sum, d) => sum + d.saldo, 0)
  
  let ordenadas = [...listaDividas]
  if (estrategia.value === 'bola-neve') {
    ordenadas.sort((a, b) => a.saldo - b.saldo)
  } else {
    ordenadas.sort((a, b) => b.juros - a.juros)
  }
  
  let mesesTotal = 0
  let totalJuros = 0
  const ordemPagamento = []
  
  ordenadas.forEach((divida, index) => {
    let saldo = divida.saldo
    let meses = 0
    let jurosAcumulados = 0
    
    while (saldo > 0 && meses < 600) {
      const jurosMes = saldo * divida.juros
      jurosAcumulados += jurosMes
      
      const pagamento = index === 0 ? valorDisponivel : divida.parcelaMin
      const pagamentoCapital = pagamento - jurosMes
      
      if (pagamentoCapital <= 0) break
      
      saldo -= pagamentoCapital
      meses++
    }
    
    totalJuros += jurosAcumulados
    mesesTotal = Math.max(mesesTotal, meses)
    
    ordemPagamento.push({
      nome: divida.nome,
      saldo: divida.saldo.toFixed(2),
      juros: (divida.juros * 100).toFixed(1),
      mesesQuitacao: meses
    })
  })
  
  resultado.value = {
    meses: mesesTotal,
    anos: (mesesTotal / 12).toFixed(1),
    totalDividas: totalDividas.toFixed(2),
    totalJuros: totalJuros.toFixed(2),
    totalPagar: (totalDividas + totalJuros).toFixed(2),
    ordem: ordemPagamento
  }

  trackToolUsage('Simulador Dívidas', 'calculate', { estrategia: estrategia.value, qtdDividas: dividas.value.length })
}

// Adicionar exemplo
if (dividas.value.length === 0) {
  dividas.value = [
    { nome: 'Cartão de Crédito', saldo: 5000, juros: 10, parcelaMin: 250 },
    { nome: 'Empréstimo Pessoal', saldo: 10000, juros: 3, parcelaMin: 500 },
    { nome: 'Cheque Especial', saldo: 2000, juros: 8, parcelaMin: 200 }
  ]
}
</script>
