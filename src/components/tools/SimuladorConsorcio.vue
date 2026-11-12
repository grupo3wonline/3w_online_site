<template>
  <ToolShell
    title="Simulador de Consórcio"
    description="Simule custos, parcelas e prazo de um consórcio comparando com financiamento direto."
    icon="fa-people-group"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['Sem juros no consórcio', 'Taxa de administração inclusa', 'Contemplação por lance ou sorteio']"
    :tips="[
      { title: 'Consórcio não tem juros', text: 'O consórcio cobra apenas taxa de administração (10-25%) e fundo de reserva. Não há incidência de juros como no financiamento.', type: 'info' },
      { title: 'Contemplação', text: 'A carta de crédito pode ser contemplada por sorteio mensal ou por lance. Lances aceleram o acesso ao bem.', type: 'info' },
      { title: 'Desvantagem principal', text: 'Você paga as parcelas mas pode esperar anos até ser contemplado — sem previsão exata de quando receberá o bem.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Carro R$ 50k, 60 meses', desc: 'Taxa adm: 20% | Fundo: 2% | 60 meses', result: 'Parcela: ~R$ 933/mês | Total: ~R$ 56.000' },
      { title: 'Imóvel R$ 300k, 180 meses', desc: 'Taxa adm: 15% | Fundo: 2% | 180 meses', result: 'Parcela: ~R$ 1.950/mês | Total: ~R$ 351.000' },
      { title: 'Moto R$ 15k, 36 meses', desc: 'Taxa adm: 25% | Fundo: 2% | 36 meses', result: 'Parcela: ~R$ 489/mês | Total: ~R$ 17.600' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Tipo -->
          <div>
            <label class="input-aurora-label mb-2">
              <i class="fas fa-people-group mr-1.5 text-purple-500"></i>
              Tipo de Consórcio
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="tipo in tiposConsorcio"
                :key="tipo.value"
                @click="tipoConsorcio = tipo.value"
                :class="['p-3 rounded-xl border-2 transition-all text-center', tipoConsorcio === tipo.value ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-purple-300']"
              >
                <i :class="['fas', tipo.icon, 'text-purple-600 dark:text-purple-400 mb-1 block text-xl']"></i>
                <div class="font-bold text-xs text-gray-900 dark:text-white">{{ tipo.label }}</div>
                <div class="text-[10px] text-gray-500">Taxa ~{{ tipo.taxaMedia }}</div>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="valorBem"    label="Valor do Bem (R$)"            type="number" :min="0"   step="1000"  icon="fa-tag"       tooltip="Valor total da carta de crédito/bem desejado." />
            <BaseInput v-model="prazoMeses"  label="Prazo (meses)"                type="number" :min="12"  :max="240"   step="12" icon="fa-calendar" hint="12 a 240 meses" />
            <BaseInput v-model="taxaAdmin"   label="Taxa de Administração (%)"    type="number" :min="10"  :max="30"    step="0.5" icon="fa-percentage" tooltip="Taxa paga à administradora — incide sobre o valor do bem." />
            <BaseInput v-model="fundoReserva"label="Fundo de Reserva (%)"         type="number" :min="0"   :max="5"     step="0.5" icon="fa-piggy-bank"  tooltip="Fundo de segurança do grupo, cobrado além da taxa de administração." />
          </div>

          <div class="flex gap-3">
            <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">Calcular Consórcio</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="resultado = null">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Parcela Mensal</p>
              <p class="text-5xl font-black text-white mb-2">{{ fmtBRL(resultado.parcelaMensal) }}</p>
              <p class="text-purple-300 text-sm font-semibold">
                <i class="fas fa-calendar-alt mr-1"></i>{{ prazoMeses }} meses ({{ resultado.anos }} anos)
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ fmtBRL(resultado.valorTotal) }}</div>
                <div class="metric-glass-label">Total a Pagar</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ fmtBRL(resultado.taxaTotal) }}</div>
                <div class="metric-glass-label">Taxas (adm + fundo)</div>
              </div>
              <div class="metric-glass ring-1 ring-violet-100 dark:ring-violet-900">
                <div class="metric-glass-value text-violet-600 dark:text-violet-400">{{ resultado.anos }}</div>
                <div class="metric-glass-label">Anos</div>
              </div>
              <div class="metric-glass ring-1 ring-pink-100 dark:ring-pink-900">
                <div class="metric-glass-value text-pink-600 dark:text-pink-400">{{ resultado.percentualExtra }}%</div>
                <div class="metric-glass-label">Acréscimo sobre o bem</div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-purple-500"></i>Composição da Parcela
              </h4>
              <div class="space-y-2 text-sm">
                <div v-for="item in breakdown" :key="item.label"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">{{ item.label }}</span>
                  <span :class="['font-bold', item.cls || 'text-gray-900 dark:text-white']">{{ item.value }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-warning">
              <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Lembre-se: você paga as parcelas mas pode aguardar anos para ser contemplado. Avalie se o prazo de espera é compatível com sua necessidade.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-people-group text-4xl mb-3 opacity-30 block text-purple-400"></i>
          <p class="text-sm">Configure o consórcio e clique em Calcular</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

interface ResultadoConsorcio {
  parcelaMensal: number; valorTotal: number; taxaTotal: number; anos: string; percentualExtra: string
}

const tipoConsorcio = ref('automovel')
const valorBem      = ref<number | ''>(50000)
const prazoMeses    = ref<number | ''>(60)
const taxaAdmin     = ref<number | ''>(20)
const fundoReserva  = ref<number | ''>(2)
const resultado     = ref<ResultadoConsorcio | null>(null)

const tiposConsorcio = [
  { value: 'imovel',    label: 'Imóvel',    icon: 'fa-home',       taxaMedia: '15–20%' },
  { value: 'automovel', label: 'Automóvel', icon: 'fa-car',        taxaMedia: '20–25%' },
  { value: 'moto',      label: 'Moto',      icon: 'fa-motorcycle', taxaMedia: '25–30%' },
]

const fmtBRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const breakdown = computed(() => {
  if (!resultado.value) return []
  const r = resultado.value
  const vBem = Number(valorBem.value) || 0
  const prazo = Number(prazoMeses.value) || 1
  return [
    { label: 'Valor do bem (carta)',    value: fmtBRL(vBem) },
    { label: 'Taxa de administração',  value: fmtBRL(vBem * (Number(taxaAdmin.value) / 100)),   cls: 'text-orange-600 dark:text-orange-400' },
    { label: 'Fundo de reserva',       value: fmtBRL(vBem * (Number(fundoReserva.value) / 100)),cls: 'text-orange-600 dark:text-orange-400' },
    { label: 'Total do consórcio',     value: fmtBRL(r.valorTotal),                              cls: 'text-purple-600 dark:text-purple-400' },
    { label: 'Parcela mensal',         value: fmtBRL(r.parcelaMensal),                           cls: 'text-primary-600 dark:text-primary-400' },
  ]
})

const calcular = () => {
  const valor = Number(valorBem.value) || 0
  const prazo = Number(prazoMeses.value) || 60
  const taxa  = Number(taxaAdmin.value) / 100
  const fundo = Number(fundoReserva.value) / 100

  const taxaTotal = valor * taxa
  const fundoTotal= valor * fundo
  const totalPagar= valor + taxaTotal + fundoTotal
  const parcela   = totalPagar / prazo
  const anos      = (prazo / 12).toFixed(1)
  const extra     = ((totalPagar / valor - 1) * 100).toFixed(1)

  resultado.value = { parcelaMensal: parcela, valorTotal: totalPagar, taxaTotal: taxaTotal + fundoTotal, anos, percentualExtra: extra }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
