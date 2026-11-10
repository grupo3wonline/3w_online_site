<template>
  <ToolShell
    title="Calculadora de Precificação"
    description="Precifique produtos e serviços com 3 estratégias: custo+margem, competitiva e valor percebido."
    icon="fa-tags"
    icon-gradient="from-pink-500 to-rose-700"
    orb-color="pink"
    :quick-tips="['3 estratégias', 'Comparativo visual', 'Preço sugerido']"
    :tips="[
      { title: 'Custo + Margem (Cost-Plus)', text: 'Mais simples: soma os custos e aplica a margem desejada. Garante lucro mas pode não refletir o mercado.', type: 'info' },
      { title: 'Precificação Competitiva', text: 'Baseada em preços de concorrentes. Útil em mercados maduros com muita comparação de preços.' },
      { title: 'Valor Percebido', text: 'O preço reflete o valor que o cliente enxerga, não apenas o custo. Permite margens maiores.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Produto físico', desc: 'Custo R$ 30, margem 60%, impostos 15%', result: 'Preço final: R$ 70,59' },
      { title: 'Serviço digital', desc: 'Hora de trabalho R$ 80, overhead 30%, margem 50%', result: 'Preço hora: R$ 156,00' },
      { title: 'SaaS mensal', desc: 'Custo operacional R$ 5/usuário, valor percebido R$ 49', result: 'Margem: 89,8%' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-4">
            <!-- Seleção de estratégia -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-chess mr-1.5 text-pink-500"></i>
                Estratégia de Precificação
              </label>
              <div class="grid grid-cols-3 gap-2 mt-2">
                <button
                  v-for="est in estrategias"
                  :key="est.id"
                  @click="estrategia = est.id; resultado = null"
                  :class="[
                    'p-3 rounded-xl border-2 transition-all text-center',
                    estrategia === est.id
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 shadow-md'
                      : 'border-gray-200 dark:border-slate-700 hover:border-pink-300',
                  ]"
                >
                  <i :class="[est.icon, 'text-xl mb-1 block', estrategia === est.id ? 'text-pink-600 dark:text-pink-400' : 'text-gray-400']"></i>
                  <span :class="['text-xs font-medium leading-tight', estrategia === est.id ? 'text-pink-900 dark:text-pink-300' : 'text-gray-500 dark:text-slate-400']">
                    {{ est.nome }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Campos comuns -->
            <div class="glass-panel p-4 space-y-3">
              <BaseInput
                v-model="custo"
                label="Custo Total (R$)"
                type="number"
                step="0.01"
                icon="fa-box"
                placeholder="50.00"
                tooltip="Custo total para produzir ou prestar o serviço (matéria-prima, mão de obra, etc.)."
              />

              <!-- Cost-Plus -->
              <template v-if="estrategia === 'custo'">
                <BaseInput
                  v-model="margemDesejada"
                  label="Margem de Lucro Desejada (%)"
                  type="number"
                  :min="0"
                  icon="fa-percent"
                  hint="Ex.: 40% é uma margem comum em varejo"
                  tooltip="Percentual de lucro desejado sobre o preço de venda."
                />
                <BaseInput
                  v-model="impostoCusto"
                  label="Impostos e Taxas (%)"
                  type="number"
                  :min="0"
                  icon="fa-receipt"
                  hint="ISS, ICMS, Simples, marketplace..."
                  tooltip="Total de impostos e taxas incidentes sobre o preço de venda."
                />
              </template>

              <!-- Competitiva -->
              <template v-if="estrategia === 'competitiva'">
                <BaseInput
                  v-model="precoMercado"
                  label="Preço Médio do Mercado (R$)"
                  type="number"
                  step="0.01"
                  icon="fa-store"
                  tooltip="Preço médio praticado pelos concorrentes diretos."
                />
                <div>
                  <label class="input-aurora-label">
                    <i class="fas fa-sliders-h mr-1.5 text-pink-500"></i>
                    Posicionamento
                  </label>
                  <select v-model="posicionamento" class="input-aurora mt-1">
                    <option value="abaixo">Abaixo do mercado (−15%)</option>
                    <option value="igual">Igual ao mercado (0%)</option>
                    <option value="acima">Acima do mercado (+15%)</option>
                    <option value="premium">Premium (+30%)</option>
                  </select>
                </div>
              </template>

              <!-- Valor percebido -->
              <template v-if="estrategia === 'valor'">
                <BaseInput
                  v-model="valorPercebido"
                  label="Valor Percebido pelo Cliente (R$)"
                  type="number"
                  step="0.01"
                  icon="fa-heart"
                  tooltip="Quanto o cliente acredita valer o produto/serviço. Pesquise ou estime pelo mercado."
                />
                <BaseInput
                  v-model="descontoValor"
                  label="Desconto sobre Valor Percebido (%)"
                  type="number"
                  :min="0"
                  :max="80"
                  icon="fa-percent"
                  hint="0% = cobra tudo que vale"
                  tooltip="Percentual de desconto em relação ao valor percebido (posicionamento competitivo)."
                />
              </template>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-tags" @click="calcular" class="flex-1">
              Calcular Preço
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <!-- Destaque -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Preço Sugerido</p>
              <p class="text-5xl font-black text-white mb-2">{{ fmt(resultado.precoFinal) }}</p>
              <p class="text-pink-300 text-sm font-semibold">
                <i class="fas fa-arrow-up mr-1"></i>
                Margem real: {{ resultado.margemReal }}%
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-pink-100 dark:ring-pink-900">
                <div class="metric-glass-value text-pink-600 dark:text-pink-400">{{ fmt(resultado.precoFinal) }}</div>
                <div class="metric-glass-label">Preço final</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ fmt(resultado.lucro) }}</div>
                <div class="metric-glass-label">Lucro unit.</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ resultado.margemReal }}%</div>
                <div class="metric-glass-label">Margem real</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ resultado.markup }}×</div>
                <div class="metric-glass-label">Markup</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-pink-500"></i>
                Composição do Preço
              </h4>
              <div class="space-y-2 text-sm">
                <div v-for="(item, i) in resultado.breakdown" :key="i"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-400">{{ item.label }}</span>
                  <span :class="['font-bold', item.cls || 'text-gray-900 dark:text-white']">{{ item.valor }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-lightbulb text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Estratégia: <strong>{{ estrategiaLabel }}</strong> ·
                Descontar até <strong>{{ resultado.descontoMax }}%</strong> sem prejuízo.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-tags text-4xl mb-3 opacity-30 block text-pink-400"></i>
          <p class="text-sm">Escolha a estratégia, informe os dados e calcule</p>
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

const estrategias = [
  { id: 'custo',       nome: 'Custo + Margem', icon: 'fas fa-layer-group' },
  { id: 'competitiva', nome: 'Competitiva',    icon: 'fas fa-store' },
  { id: 'valor',       nome: 'Valor Percebido', icon: 'fas fa-heart' },
]

const estrategia     = ref('custo')
const custo          = ref(50)
const margemDesejada = ref(40)
const impostoCusto   = ref(15)
const precoMercado   = ref(100)
const posicionamento = ref('igual')
const valorPercebido = ref(120)
const descontoValor  = ref(10)
const resultado      = ref(null)

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const estrategiaLabel = computed(() => ({ custo: 'Custo + Margem', competitiva: 'Competitiva', valor: 'Valor Percebido' }[estrategia.value]))

const posicMap = { abaixo: -0.15, igual: 0, acima: 0.15, premium: 0.30 }

const calcular = () => {
  const custoV = Number(custo.value)
  if (!custoV || custoV <= 0) {
    Swal.fire({ icon: 'warning', title: 'Informe o custo', text: 'O custo deve ser maior que zero.', confirmButtonColor: '#2563eb' })
    return
  }

  let precoFinal = 0
  let breakdown = []

  if (estrategia.value === 'custo') {
    const pct = (Number(margemDesejada.value) + Number(impostoCusto.value)) / 100
    if (pct >= 1) { Swal.fire({ icon: 'error', title: 'Margem inválida', text: 'A soma de margem + impostos não pode ser ≥ 100%.', confirmButtonColor: '#2563eb' }); return }
    precoFinal = custoV / (1 - pct)
    breakdown = [
      { label: 'Custo base',      valor: fmt(custoV) },
      { label: `Margem (${margemDesejada.value}%)`, valor: fmt(precoFinal * Number(margemDesejada.value) / 100), cls: 'text-emerald-600 dark:text-emerald-400' },
      { label: `Impostos (${impostoCusto.value}%)`, valor: fmt(precoFinal * Number(impostoCusto.value) / 100), cls: 'text-orange-600 dark:text-orange-400' },
      { label: 'Preço final',     valor: fmt(precoFinal), cls: 'text-pink-600 dark:text-pink-400' },
    ]
  } else if (estrategia.value === 'competitiva') {
    const pmkt = Number(precoMercado.value)
    if (!pmkt) { Swal.fire({ icon: 'warning', title: 'Informe o preço de mercado', confirmButtonColor: '#2563eb' }); return }
    const fator = 1 + posicMap[posicionamento.value]
    precoFinal  = pmkt * fator
    breakdown = [
      { label: 'Preço de mercado',           valor: fmt(pmkt) },
      { label: `Ajuste (${(posicMap[posicionamento.value]*100).toFixed(0)}%)`, valor: fmt(pmkt * posicMap[posicionamento.value]) },
      { label: 'Custo base',                 valor: fmt(custoV) },
      { label: 'Preço posicionado',          valor: fmt(precoFinal), cls: 'text-pink-600 dark:text-pink-400' },
    ]
  } else {
    const percebido = Number(valorPercebido.value)
    const descV     = Number(descontoValor.value) / 100
    if (!percebido) { Swal.fire({ icon: 'warning', title: 'Informe o valor percebido', confirmButtonColor: '#2563eb' }); return }
    precoFinal = percebido * (1 - descV)
    breakdown = [
      { label: 'Valor percebido', valor: fmt(percebido) },
      { label: `Desconto (${descontoValor.value}%)`, valor: `- ${fmt(percebido * descV)}`, cls: 'text-red-500' },
      { label: 'Custo base',      valor: fmt(custoV) },
      { label: 'Preço praticado', valor: fmt(precoFinal), cls: 'text-pink-600 dark:text-pink-400' },
    ]
  }

  if (precoFinal < custoV) {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'O preço calculado está abaixo do custo! Revise os parâmetros.', confirmButtonColor: '#2563eb' })
  }

  const lucro     = precoFinal - custoV
  const margemReal = custoV > 0 ? Number(((lucro / precoFinal) * 100).toFixed(1)) : 0
  const markup     = custoV > 0 ? Number((precoFinal / custoV).toFixed(2)) : 0
  const descontoMax = Number(Math.max(0, margemReal - 5).toFixed(0))

  resultado.value = { precoFinal, lucro, margemReal, markup, descontoMax, breakdown }
}

const limpar = () => {
  custo.value          = 50
  margemDesejada.value = 40
  impostoCusto.value   = 15
  precoMercado.value   = 100
  posicionamento.value = 'igual'
  valorPercebido.value = 120
  descontoValor.value  = 10
  resultado.value      = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
