<template>
  <ToolShell
    title="Calculadora de Margem de Lucro"
    description="Calcule margem bruta, margem líquida, markup e ponto de equilíbrio para precificação."
    icon="fa-chart-bar"
    icon-gradient="from-amber-500 to-orange-700"
    orb-color="orange"
    :quick-tips="['Margem bruta e líquida', 'Markup sobre custo', 'Análise de viabilidade']"
    :tips="[
      { title: 'Margem vs Markup', text: 'Margem é calculada sobre o preço de venda. Markup é calculado sobre o custo. Markup 100% = Margem 50%.', type: 'warning' },
      { title: 'Margem saudável', text: 'Varejo: 20–40%. Serviços: 40–60%. SaaS: 60–80%. Abaixo de 15% é arriscado para a maioria dos negócios.', type: 'info' },
      { title: 'Despesas operacionais', text: 'Inclua aluguel, salários, marketing e tributos para calcular a margem líquida real do negócio.', type: 'info' },
    ]"
    :examples="[
      { title: 'Produto de varejo', desc: 'Custo: R$ 50, Venda: R$ 90, Despesas: R$ 15', result: 'Margem bruta: 44,4% | Margem líquida: 27,8% | Markup: 80%' },
      { title: 'Serviço de TI', desc: 'Custo hora: R$ 80, Cobrança: R$ 200, Despesas: R$ 30', result: 'Margem bruta: 60% | Markup: 150%' },
      { title: 'Restaurante', desc: 'Custo prato: R$ 12, Venda: R$ 35, Despesas: R$ 8', result: 'Margem bruta: 65,7% | Margem líquida: 42,9%' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="tool-body !mb-0 space-y-3">
        <BaseInput v-model="custoTotal" label="Custo Total (R$)" type="number" step="0.01" icon="fa-tags" tooltip="Custo direto do produto ou serviço." />
        <BaseInput v-model="precoVenda" label="Preço de Venda (R$)" type="number" step="0.01" icon="fa-dollar-sign" tooltip="Preço que você cobra do cliente." />
        <BaseInput v-model="despesasOperacionais" label="Despesas Operacionais (R$)" type="number" step="0.01" icon="fa-building" hint="Opcional: aluguel, salários, marketing, tributos" tooltip="Despesas fixas e variáveis para calcular margem líquida." />

        <div class="flex gap-3">
          <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">
            Calcular Margens
          </BaseButton>
          <BaseButton variant="outline" icon="fa-eraser" @click="limpar" />
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="calculado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Margem Bruta</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.margemBruta.toFixed(2) }}%</p>
              <p class="text-amber-300 text-sm font-semibold">
                Lucro bruto: {{ formatarMoeda(resultado.lucroBruto) }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <span class="metric-glass-value text-blue-600 dark:text-blue-400">{{ formatarMoeda(resultado.lucroBruto) }}</span>
                <span class="metric-glass-label">Lucro Bruto</span>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <span class="metric-glass-value text-purple-600 dark:text-purple-400">{{ resultado.markup.toFixed(2) }}%</span>
                <span class="metric-glass-label">Markup</span>
              </div>
              <div v-if="Number(despesasOperacionais) > 0" class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <span class="metric-glass-value" :class="resultado.margemLiquida >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                  {{ resultado.margemLiquida.toFixed(2) }}%
                </span>
                <span class="metric-glass-label">Margem Líquida</span>
              </div>
              <div v-if="Number(despesasOperacionais) > 0" class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <span class="metric-glass-value" :class="resultado.lucroLiquido >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-red-600 dark:text-red-400'">
                  {{ formatarMoeda(resultado.lucroLiquido) }}
                </span>
                <span class="metric-glass-label">Lucro Líquido</span>
              </div>
            </div>

            <!-- Barra de margem bruta -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-chart-bar text-amber-500"></i>
                Análise Visual
              </h4>
              <div class="space-y-3">
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-xs text-gray-600 dark:text-slate-300">Margem Bruta</span>
                    <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">{{ resultado.margemBruta.toFixed(2) }}%</span>
                  </div>
                  <div class="strength-track">
                    <div
                      class="strength-bar"
                      :class="resultado.margemBruta >= 30 ? 'bg-emerald-500' : resultado.margemBruta >= 15 ? 'bg-amber-500' : 'bg-red-500'"
                      :style="{ width: `${Math.min(resultado.margemBruta, 100)}%` }"
                    ></div>
                  </div>
                </div>
                <div v-if="Number(despesasOperacionais) > 0">
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-xs text-gray-600 dark:text-slate-300">Margem Líquida</span>
                    <span class="text-xs font-bold" :class="resultado.margemLiquida >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ resultado.margemLiquida.toFixed(2) }}%</span>
                  </div>
                  <div class="strength-track">
                    <div
                      class="strength-bar"
                      :class="resultado.margemLiquida >= 0 ? 'bg-emerald-500' : 'bg-red-500'"
                      :style="{ width: `${Math.min(Math.abs(resultado.margemLiquida), 100)}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <div class="space-y-1.5 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Custo Total</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ formatarMoeda(custoTotal) }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Preço de Venda</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ formatarMoeda(precoVenda) }}</span>
                </div>
                <div v-if="Number(despesasOperacionais) > 0" class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Despesas Operacionais</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ formatarMoeda(despesasOperacionais) }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Lucro Bruto</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ formatarMoeda(resultado.lucroBruto) }}</span>
                </div>
              </div>
            </div>

            <div :class="resultado.margemBruta >= 30 ? 'tip-card-success' : resultado.margemBruta >= 15 ? 'tip-card' : 'tip-card-warning'">
              <i :class="['fas flex-shrink-0 mt-0.5', resultado.margemBruta >= 30 ? 'fa-check-circle text-emerald-500' : resultado.margemBruta >= 15 ? 'fa-exclamation-triangle text-amber-500' : 'fa-times-circle text-red-500']"></i>
              <div>
                <strong class="block text-xs mb-0.5">{{ obterTituloAnalise() }}</strong>
                <span class="text-xs">{{ obterDescricaoAnalise() }}</span>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!calculado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-chart-bar text-4xl mb-3 opacity-30 block text-amber-400"></i>
          <p class="text-sm">Informe o custo e o preço de venda para calcular as margens</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const custoTotal = ref(100)
const precoVenda = ref(150)
const despesasOperacionais = ref(0)
const calculado = ref(false)
const resultado = ref({
  lucroBruto: 0,
  lucroLiquido: 0,
  margemBruta: 0,
  margemLiquida: 0,
  markup: 0,
})

const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)

const calcular = () => {
  const custo = Number(custoTotal.value)
  const preco = Number(precoVenda.value)
  const despesas = Number(despesasOperacionais.value)

  const lucroBruto = preco - custo
  const lucroLiquido = lucroBruto - despesas
  const margemBruta = (lucroBruto / preco) * 100
  const margemLiquida = (lucroLiquido / preco) * 100
  const markup = ((preco - custo) / custo) * 100

  resultado.value = { lucroBruto, lucroLiquido, margemBruta, margemLiquida, markup }
  calculado.value = true
}

const limpar = () => {
  custoTotal.value = 100
  precoVenda.value = 150
  despesasOperacionais.value = 0
  calculado.value = false
}

const obterTituloAnalise = () => {
  const m = resultado.value.margemBruta
  if (m >= 30) return 'Excelente margem de lucro!'
  if (m >= 15) return 'Margem aceitável, mas pode melhorar'
  return 'Margem baixa — atenção necessária'
}

const obterDescricaoAnalise = () => {
  const m = resultado.value.margemBruta
  if (m >= 30) return 'Sua margem está acima da média. Continue monitorando custos e mantendo a qualidade.'
  if (m >= 15) return 'Próxima à média do mercado. Considere reduzir custos ou aumentar o valor percebido.'
  return 'Margem abaixo do ideal. Revise custos, fornecedores e estratégia de precificação urgentemente.'
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
