<template>
  <ToolShell
    title="Calculadora de Depreciação"
    description="Calcule a depreciação de ativos pelos métodos Linear e Acelerado (saldo decrescente)."
    icon="fa-chart-line"
    icon-gradient="from-slate-500 to-gray-700"
    orb-color="blue"
    :quick-tips="['Método Linear e Acelerado', 'Tabela anual completa', 'Taxa e valor mensal']"
    :tips="[
      { title: 'Vida útil contábil', text: 'Equipamentos de TI: 5 anos | Veículos: 5 anos | Móveis: 10 anos | Imóveis: 25 anos (Receita Federal).', type: 'info' },
      { title: 'Depreciação Linear', text: 'Distribui o custo igualmente ao longo da vida útil. Método mais simples e comum para contabilidade.', type: 'info' },
      { title: 'Depreciação Acelerada', text: 'Deprecia mais nos primeiros anos. Adequado para tecnologia e equipamentos que perdem valor rápido.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Notebook', desc: 'Valor: R$ 5.000, Residual: R$ 500, Vida útil: 5 anos, Linear', result: 'Depreciação anual: R$ 900 | Mensal: R$ 75' },
      { title: 'Veículo', desc: 'Valor: R$ 80.000, Residual: R$ 10.000, 5 anos, Acelerado', result: '1º ano: R$ 28.000 | 2º ano: R$ 16.800' },
      { title: 'Maquinário', desc: 'Valor: R$ 200.000, Residual: R$ 20.000, 10 anos, Linear', result: 'Depreciação anual: R$ 18.000' },
    ]"
  >
    <!-- Método -->
    <div class="glass-panel p-4 mb-4">
      <label class="input-aurora-label mb-3">
        <i class="fas fa-sliders mr-1.5 text-amber-500"></i>
        Método de Depreciação
      </label>
      <div class="grid grid-cols-2 gap-3">
        <button
          @click="metodo = 'linear'"
          :class="['p-4 rounded-xl border-2 transition-all text-center', metodo === 'linear' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-200 dark:border-slate-600 hover:border-amber-300']"
        >
          <i :class="['fas fa-equals text-2xl mb-2 block', metodo === 'linear' ? 'text-amber-600' : 'text-gray-400']"></i>
          <span :class="['text-sm font-semibold', metodo === 'linear' ? 'text-amber-700 dark:text-amber-300' : 'text-gray-600']">Linear</span>
          <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Valor constante</p>
        </button>
        <button
          @click="metodo = 'acelerada'"
          :class="['p-4 rounded-xl border-2 transition-all text-center', metodo === 'acelerada' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-200 dark:border-slate-600 hover:border-amber-300']"
        >
          <i :class="['fas fa-arrow-down text-2xl mb-2 block', metodo === 'acelerada' ? 'text-amber-600' : 'text-gray-400']"></i>
          <span :class="['text-sm font-semibold', metodo === 'acelerada' ? 'text-amber-700 dark:text-amber-300' : 'text-gray-600']">Acelerada</span>
          <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Maior nos 1os anos</p>
        </button>
      </div>
    </div>

    <!-- Inputs -->
    <div class="tool-body space-y-3">
      <BaseInput v-model="valorInicial" label="Valor Inicial do Ativo (R$)" type="number" step="0.01" icon="fa-dollar-sign" tooltip="Custo de aquisição do bem." />
      <BaseInput v-model="valorResidual" label="Valor Residual (R$)" type="number" step="0.01" icon="fa-coins" tooltip="Valor estimado ao final da vida útil. Pode ser zero." />
      <BaseInput v-model="vidaUtil" label="Vida Útil (anos)" type="number" icon="fa-calendar-alt" hint="Período durante o qual o bem será utilizado" />

      <BaseButton variant="primary" icon="fa-calculator" @click="calcular" fullWidth>
        Calcular Depreciação
      </BaseButton>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in">
      <div v-if="calculado" class="space-y-4 mt-4">
        <div class="tool-header text-center py-7">
          <p class="text-sm text-blue-200 mb-1">Depreciação Anual ({{ metodo === 'linear' ? 'Linear' : 'Acelerada' }})</p>
          <p class="text-5xl font-black text-white mb-2">{{ fmt(resultado.depreciacaoAnual) }}</p>
          <p class="text-amber-300 text-sm font-semibold">
            <i class="fas fa-calendar mr-1"></i>
            Mensal: {{ fmt(resultado.depreciacaoMensal) }}
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div class="metric-glass ring-1 ring-amber-100 dark:ring-amber-900">
            <span class="metric-glass-value text-amber-600 dark:text-amber-400">{{ resultado.taxaAnual.toFixed(2) }}%</span>
            <span class="metric-glass-label">Taxa Anual</span>
          </div>
          <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
            <span class="metric-glass-value text-blue-600 dark:text-blue-400">{{ fmt(resultado.depreciacaoMensal) }}</span>
            <span class="metric-glass-label">Depr. Mensal</span>
          </div>
          <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
            <span class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ fmt(Number(valorResidual)) }}</span>
            <span class="metric-glass-label">Valor Final</span>
          </div>
        </div>

        <!-- Tabela -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-table text-amber-500"></i>
            Tabela de Depreciação
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="bg-amber-50 dark:bg-amber-900/20">
                  <th class="px-3 py-2 text-left text-gray-700 dark:text-gray-300 font-semibold">Ano</th>
                  <th class="px-3 py-2 text-right text-gray-700 dark:text-gray-300 font-semibold">Depreciação</th>
                  <th class="px-3 py-2 text-right text-gray-700 dark:text-gray-300 font-semibold">Acumulada</th>
                  <th class="px-3 py-2 text-right text-gray-700 dark:text-gray-300 font-semibold">Valor Contábil</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
                <tr v-for="linha in resultado.tabela" :key="linha.ano" class="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td class="px-3 py-2 font-semibold text-gray-900 dark:text-white">{{ linha.ano }}</td>
                  <td class="px-3 py-2 text-right font-mono text-gray-700 dark:text-slate-200">{{ fmt(linha.depreciacao) }}</td>
                  <td class="px-3 py-2 text-right font-mono text-gray-700 dark:text-slate-200">{{ fmt(linha.acumulada) }}</td>
                  <td class="px-3 py-2 text-right font-mono font-semibold text-amber-600 dark:text-amber-400">{{ fmt(linha.valorContabil) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-3">
          <div class="tip-card">
            <i class="fas fa-equals text-blue-500 flex-shrink-0 mt-0.5"></i>
            <div>
              <strong class="block text-xs mb-0.5">Depreciação Linear</strong>
              <span class="text-xs">Valor constante todo ano. Método mais simples e comum.</span>
            </div>
          </div>
          <div class="tip-card-warning">
            <i class="fas fa-arrow-down text-amber-500 flex-shrink-0 mt-0.5"></i>
            <div>
              <strong class="block text-xs mb-0.5">Depreciação Acelerada</strong>
              <span class="text-xs">Maior nos primeiros anos. Recomendada para tecnologia.</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="!calculado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
      <i class="fas fa-chart-line text-4xl mb-3 opacity-30 block text-amber-400"></i>
      <p class="text-sm">Informe os dados do ativo para gerar a tabela de depreciação</p>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const metodo = ref('linear')
const valorInicial = ref(50000)
const valorResidual = ref(5000)
const vidaUtil = ref(5)
const calculado = ref(false)
const resultado = ref({})

const fmt = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const calcular = () => {
  const valorDepreciavel = Number(valorInicial.value) - Number(valorResidual.value)
  const taxaAnual = 100 / Number(vidaUtil.value)
  let depreciacaoAnual = valorDepreciavel / Number(vidaUtil.value)

  if (metodo.value === 'acelerada') {
    depreciacaoAnual = valorDepreciavel * 2 / Number(vidaUtil.value)
  }

  const tabela = []
  let acumulada = 0

  for (let ano = 1; ano <= Number(vidaUtil.value); ano++) {
    let depreciacao
    if (metodo.value === 'linear') {
      depreciacao = valorDepreciavel / Number(vidaUtil.value)
    } else {
      const saldoInicial = Number(valorInicial.value) - acumulada
      depreciacao = Math.min(saldoInicial * (taxaAnual / 100) * 2, saldoInicial - Number(valorResidual.value))
    }

    acumulada += depreciacao
    const valorContabil = Number(valorInicial.value) - acumulada

    tabela.push({
      ano,
      depreciacao,
      acumulada,
      valorContabil: Math.max(valorContabil, Number(valorResidual.value)),
    })
  }

  resultado.value = {
    depreciacaoAnual: metodo.value === 'linear' ? depreciacaoAnual : tabela[0].depreciacao,
    depreciacaoMensal: (metodo.value === 'linear' ? depreciacaoAnual : tabela[0].depreciacao) / 12,
    taxaAnual,
    tabela,
  }

  calculado.value = true
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
