<template>
  <ToolShell
    title="Ponto de Equilíbrio"
    description="Calcule o break-even: volume mínimo de vendas para cobrir todos os custos."
    icon="fa-balance-scale"
    icon-gradient="from-emerald-500 to-teal-700"
    orb-color="emerald"
    :quick-tips="['Break-even em unidades', 'Margem de contribuição', 'Simulação de vendas']"
    :tips="[
      { title: 'O que é PE?', text: 'É o ponto em que receita = custo total. Abaixo dele há prejuízo; acima, lucro.' },
      { title: 'Margem de contribuição', text: 'MC = Preço de venda − Custo variável unitário. Quanto maior a MC, menor o ponto de equilíbrio.', type: 'info' },
      { title: 'Estratégia', text: 'Reduzir custos fixos ou aumentar a margem de contribuição são os caminhos para abaixar o PE.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Produto simples', desc: 'Custos fixos R$ 10.000, preço R$ 50, custo variável R$ 20', result: 'PE = 334 unidades (R$ 16.700)' },
      { title: 'Serviço mensal', desc: 'Fixos R$ 5.000, diária R$ 200, custo R$ 50/h', result: 'PE = 34 unidades' },
      { title: 'E-commerce', desc: 'Fixos R$ 3.000, ticket R$ 120, custo R$ 70', result: 'PE = 60 vendas (R$ 7.200)' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <BaseInput
              v-model="custosFixos"
              label="Custos Fixos Mensais (R$)"
              type="number"
              step="0.01"
              icon="fa-building"
              placeholder="10000"
              tooltip="Custos que não variam com o volume de vendas: aluguel, salários, seguros."
              hint="Ex.: aluguel, salários fixos, seguros"
            />
            <BaseInput
              v-model="precoVenda"
              label="Preço de Venda por Unidade (R$)"
              type="number"
              step="0.01"
              icon="fa-tag"
              placeholder="50"
              tooltip="Valor pelo qual cada unidade é vendida ao cliente."
            />
            <BaseInput
              v-model="custoVariavel"
              label="Custo Variável por Unidade (R$)"
              type="number"
              step="0.01"
              icon="fa-boxes"
              placeholder="20"
              tooltip="Custo que cresce proporcionalmente às vendas: matéria-prima, comissões, embalagem."
              hint="Ex.: matéria-prima, comissões"
            />
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular PE
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- Simulação de vendas inline -->
        <div v-if="calculado" class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-chart-bar text-emerald-500"></i>
            Simulação de Vendas
          </h4>
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="(sim, i) in simulacao"
              :key="i"
              :class="['rounded-xl p-3 text-center border', sim.cor]"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400 mb-1">{{ sim.unidades }} un.</div>
              <div :class="['font-bold text-sm', sim.textoCor]">{{ sim.situacao }}</div>
              <div class="text-xs text-gray-600 dark:text-slate-400">{{ sim.pct }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="calculado" class="space-y-4">
            <!-- Destaque -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Ponto de Equilíbrio</p>
              <p class="text-5xl font-black text-white mb-2">{{ Math.ceil(resultado.unidades) }}</p>
              <p class="text-emerald-300 text-sm font-semibold">unidades por mês</p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ fmt(resultado.receita) }}</div>
                <div class="metric-glass-label">Receita no PE</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ fmt(resultado.margemContribuicao) }}</div>
                <div class="metric-glass-label">Margem de Contrib.</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ resultado.indiceMC }}%</div>
                <div class="metric-glass-label">Índice MC</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ fmt(Number(custosFixos)) }}</div>
                <div class="metric-glass-label">Custos Fixos</div>
              </div>
            </div>

            <!-- Fórmula -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-square-root-alt text-emerald-500"></i>
                Análise Detalhada
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-400">Custos Fixos</span>
                  <span class="font-bold">{{ fmt(Number(custosFixos)) }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-400">Preço de Venda</span>
                  <span class="font-bold">{{ fmt(Number(precoVenda)) }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-400">Custo Variável</span>
                  <span class="font-bold">{{ fmt(Number(custoVariavel)) }}</span>
                </div>
                <div class="flex justify-between py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded px-2">
                  <span class="text-gray-700 dark:text-slate-300 font-medium">Margem de Contribuição Unit.</span>
                  <span class="font-black text-emerald-600 dark:text-emerald-400">{{ fmt(resultado.margemContribuicao) }}</span>
                </div>
              </div>
              <p class="text-xs text-gray-500 dark:text-slate-400 mt-3 font-mono bg-gray-50 dark:bg-slate-800 rounded p-2">
                PE = {{ Number(custosFixos).toFixed(2) }} ÷ {{ resultado.margemContribuicao.toFixed(2) }} = {{ resultado.unidades.toFixed(2) }} un.
              </p>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Vender <strong>{{ Math.ceil(resultado.unidades) + 1 }} ou mais unidades</strong> por mês garante lucro.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!calculado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-balance-scale text-4xl mb-3 opacity-30 block text-emerald-400"></i>
          <p class="text-sm">Informe custos fixos, preço e custo variável</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const custosFixos   = ref(10000)
const precoVenda    = ref(50)
const custoVariavel = ref(20)
const calculado     = ref(false)
const resultado     = ref({ unidades: 0, receita: 0, margemContribuicao: 0, indiceMC: 0 })

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const simulacao = computed(() => {
  if (!calculado.value) return []
  const pe = Math.ceil(resultado.value.unidades)
  return [
    { unidades: Math.ceil(pe * 0.5), situacao: 'Prejuízo', pct: 50,  cor: 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10',       textoCor: 'text-red-600 dark:text-red-400'    },
    { unidades: pe,                   situacao: 'Equilíbrio', pct: 100, cor: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10', textoCor: 'text-yellow-600 dark:text-yellow-400' },
    { unidades: Math.ceil(pe * 1.5), situacao: 'Lucro',     pct: 150, cor: 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10',   textoCor: 'text-green-600 dark:text-green-400'  },
  ]
})

const calcular = () => {
  const fixos   = Number(custosFixos.value)
  const preco   = Number(precoVenda.value)
  const variavel = Number(custoVariavel.value)

  if (!fixos)   { Swal.fire({ icon: 'warning', title: 'Informe os custos fixos',    confirmButtonColor: '#2563eb' }); return }
  if (!preco)   { Swal.fire({ icon: 'warning', title: 'Informe o preço de venda',   confirmButtonColor: '#2563eb' }); return }
  if (!variavel) { Swal.fire({ icon: 'warning', title: 'Informe o custo variável',  confirmButtonColor: '#2563eb' }); return }
  if (preco <= variavel) {
    Swal.fire({ icon: 'error', title: 'Dados inválidos', text: 'O preço de venda deve ser maior que o custo variável.', confirmButtonColor: '#2563eb' })
    return
  }

  const margem  = preco - variavel
  const unidades = fixos / margem
  const receita  = unidades * preco
  const indiceMC = Number(((margem / preco) * 100).toFixed(1))

  resultado.value = { unidades, receita, margemContribuicao: margem, indiceMC }
  calculado.value = true
}

const limpar = () => {
  custosFixos.value   = 10000
  precoVenda.value    = 50
  custoVariavel.value = 20
  calculado.value     = false
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
