<template>
  <ToolShell
    title="Calculadora de Preço de Produto"
    description="Calcule o preço de venda ideal: custos, markup, impostos e comissão em um só lugar."
    icon="fa-box"
    icon-gradient="from-orange-500 to-amber-700"
    orb-color="orange"
    :quick-tips="['Markup automático', 'Impostos e comissão', 'Desconto máximo']"
    :tips="[
      { title: 'Margem × Markup', text: 'Margem de 40% significa R$ 40 de lucro em R$ 100 vendidos. Markup 1,67× significa vender por 1,67 vezes o custo.', type: 'info' },
      { title: 'Inclua tudo', text: 'Frete, embalagem, marketplace e impostos devem entrar no cálculo para evitar vender com prejuízo.' },
      { title: 'Preço de atacado', text: 'Tipicamente 25–35% abaixo do varejo. Use com cautela para não comprometer a margem.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Produto físico', desc: 'Custo R$ 50 + frete R$ 10 + embalagem R$ 5, margem 40%, impostos 15%', result: 'Preço final: R$ 136,36' },
      { title: 'Marketplace', desc: 'Custo R$ 30, comissão 15%, margem 30%', result: 'Preço: R$ 54,55' },
      { title: 'Artesanato', desc: 'Custo de materiais R$ 25, margem 60%', result: 'Preço mínimo: R$ 62,50' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <p class="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">Custos do Produto</p>
            <BaseInput
              v-model="custoProduto"
              label="Custo de Produção / Aquisição (R$)"
              type="number"
              :min="0"
              step="0.01"
              icon="fa-box"
              tooltip="Custo de fabricação ou preço de compra do produto."
              hint="Custo direto principal"
            />
            <div class="grid grid-cols-3 gap-3">
              <BaseInput
                v-model="custoFrete"
                label="Frete (R$)"
                type="number"
                :min="0"
                step="0.01"
                icon="fa-truck"
                tooltip="Custo de frete de envio ao cliente."
              />
              <BaseInput
                v-model="custoEmbalagem"
                label="Embalagem (R$)"
                type="number"
                :min="0"
                step="0.01"
                icon="fa-box-open"
                tooltip="Custo de embalagem e materiais de proteção."
              />
              <BaseInput
                v-model="outrosCustos"
                label="Outros (R$)"
                type="number"
                :min="0"
                step="0.01"
                icon="fa-plus-circle"
                tooltip="Outros custos diretos não listados acima."
              />
            </div>

            <p class="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide pt-1">Margens e Deduções</p>
            <div class="grid grid-cols-3 gap-3">
              <BaseInput
                v-model="margemLucro"
                label="Margem (%)"
                type="number"
                :min="0"
                :max="95"
                icon="fa-percent"
                tooltip="Lucro desejado como % do preço de venda (não do custo)."
              />
              <BaseInput
                v-model="impostos"
                label="Impostos (%)"
                type="number"
                :min="0"
                :max="50"
                icon="fa-receipt"
                tooltip="Impostos sobre o faturamento (Simples, ICMS, etc.)."
              />
              <BaseInput
                v-model="comissaoVenda"
                label="Comissão (%)"
                type="number"
                :min="0"
                :max="30"
                icon="fa-handshake"
                tooltip="Comissão de vendedores ou taxa de marketplace."
              />
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
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
              <p class="text-sm text-blue-200 mb-1">Preço de Venda Sugerido</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.precoVenda }}</p>
              <p class="text-orange-300 text-sm font-semibold">
                <i class="fas fa-dollar-sign mr-1"></i>
                Lucro: R$ {{ resultado.lucroUnitario }} por unidade
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">R$ {{ resultado.custoTotal }}</div>
                <div class="metric-glass-label">Custo total</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ resultado.margemRealPct }}%</div>
                <div class="metric-glass-label">Margem real</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ resultado.markup }}×</div>
                <div class="metric-glass-label">Markup</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ resultado.descontoMax }}%</div>
                <div class="metric-glass-label">Desc. máximo</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-orange-500"></i>
                Composição do Preço
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-400">Custo total</span>
                  <span class="font-bold">R$ {{ resultado.custoTotal }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-400">Margem ({{ margemLucro }}%)</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">+ R$ {{ resultado.valorMargem }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-400">Impostos ({{ impostos }}%)</span>
                  <span class="font-bold text-red-500">+ R$ {{ resultado.valorImpostos }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-400">Comissão ({{ comissaoVenda }}%)</span>
                  <span class="font-bold text-orange-600 dark:text-orange-400">+ R$ {{ resultado.valorComissao }}</span>
                </div>
                <div class="flex justify-between py-2 bg-orange-50 dark:bg-orange-900/20 rounded px-2">
                  <span class="font-bold text-gray-900 dark:text-white">Preço Final</span>
                  <span class="font-black text-orange-600 dark:text-orange-400">R$ {{ resultado.precoVenda }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-orange-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Preço de atacado sugerido (−30%): <strong>R$ {{ resultado.precoAtacado }}</strong>
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-box text-4xl mb-3 opacity-30 block text-orange-400"></i>
          <p class="text-sm">Informe os custos e margens para calcular</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const custoProduto  = ref(50)
const custoFrete    = ref(10)
const custoEmbalagem = ref(5)
const outrosCustos  = ref(5)
const margemLucro   = ref(40)
const impostos      = ref(15)
interface ResultadoPrecoProduto {
  custoTotal: string; valorMargem: string; valorImpostos: string; valorComissao: string
  precoVenda: string; lucroUnitario: string; margemRealPct: number; markup: number; precoAtacado: number; descontoMax: number
}

const comissaoVenda = ref(10)
const resultado     = ref<ResultadoPrecoProduto | null>(null)

const calcular = () => {
  const custo = Number(custoProduto.value)
  if (!custo || custo <= 0) {
    Swal.fire({ icon: 'error', title: 'Informe o custo', text: 'O custo de produção/aquisição é obrigatório.', confirmButtonColor: '#2563eb' })
    return
  }

  const custoTotal = custo + Number(custoFrete.value) + Number(custoEmbalagem.value) + Number(outrosCustos.value)
  const pctTotal   = (Number(margemLucro.value) + Number(impostos.value) + Number(comissaoVenda.value)) / 100

  if (pctTotal >= 1) {
    Swal.fire({ icon: 'error', title: 'Dados inválidos', text: 'A soma de margem + impostos + comissão não pode ser ≥ 100%.', confirmButtonColor: '#2563eb' })
    return
  }

  const precoVenda    = custoTotal / (1 - pctTotal)
  const valorMargem   = precoVenda * (Number(margemLucro.value) / 100)
  const valorImpostos = precoVenda * (Number(impostos.value) / 100)
  const valorComissao = precoVenda * (Number(comissaoVenda.value) / 100)
  const lucroUnitario = precoVenda - custoTotal - valorImpostos - valorComissao

  const margemRealPct = Number(((lucroUnitario / precoVenda) * 100).toFixed(2))
  const markup        = Number((precoVenda / custoTotal).toFixed(2))
  const precoAtacado  = Number((precoVenda * 0.7).toFixed(2))
  const descontoMax   = Number(Math.max(0, margemRealPct - 5).toFixed(0))

  resultado.value = {
    custoTotal: custoTotal.toFixed(2),
    valorMargem: valorMargem.toFixed(2),
    valorImpostos: valorImpostos.toFixed(2),
    valorComissao: valorComissao.toFixed(2),
    precoVenda: precoVenda.toFixed(2),
    lucroUnitario: lucroUnitario.toFixed(2),
    margemRealPct,
    markup,
    precoAtacado,
    descontoMax,
  }
}

const limpar = () => {
  custoProduto.value   = 50
  custoFrete.value     = 10
  custoEmbalagem.value = 5
  outrosCustos.value   = 5
  margemLucro.value    = 40
  impostos.value       = 15
  comissaoVenda.value  = 10
  resultado.value      = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
