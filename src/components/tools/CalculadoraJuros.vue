<template>
  <ToolShell
    title="Calculadora de Juros Compostos"
    description="Simule o crescimento do seu investimento com aportes periódicos e taxa de juros compostos."
    icon="fa-chart-line"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['Juros compostos reais', 'Aportes periódicos', 'Rentabilidade total']"
    :tips="[
      { title: 'Regra dos 72', text: 'Divida 72 pela taxa de juros anual para saber em quantos anos o capital dobra. Ex: 10% ao ano → 7,2 anos.' },
      { title: 'Einstein sobre juros compostos', text: 'Juros compostos são a oitava maravilha do mundo. Quem entende, ganha; quem não entende, paga.', type: 'info' },
      { title: 'Comece cedo', text: 'Investir R$ 300/mês dos 25 aos 65 anos com 10% a.a. gera R$ 1,9 milhão. Começando aos 35, apenas R$ 678 mil.', type: 'warning' },
    ]"
    :examples="[
      { title: 'CDB simples', desc: 'R$ 10.000, 10% a.a., 12 meses, sem aportes', result: 'Montante: R$ 11.047,13 (R$ 1.047,13 de juros)' },
      { title: 'Poupança com aportes', desc: 'R$ 1.000 inicial + R$ 500/mês, 6% a.a., 24 meses', result: 'Montante: R$ 13.831,97 (rentabilidade 15,3%)' },
      { title: 'Tesouro Direto', desc: 'R$ 5.000, 12% a.a., 36 meses, R$ 200/mês', result: 'Montante: R$ 18.439,02' },
    ]"
  >

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <BaseInput
              v-model="capitalInicial"
              label="Capital Inicial (R$)"
              type="number" :min="0" step="100"
              icon="fa-coins"
              placeholder="10000"
              tooltip="Valor que você já tem para começar a investir."
              @input="calcularAuto"
            />
            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="taxaJuros"
                label="Taxa de Juros (%)"
                type="number" :min="0" step="0.01"
                icon="fa-percent"
                placeholder="10"
                tooltip="Taxa percentual por período. Se escolher mensal, informe a taxa mensal; se anual, a anual."
                @input="calcularAuto"
              />
              <div>
                <label class="input-aurora-label">
                  <i class="fas fa-clock mr-1.5 text-teal-500"></i>
                  Frequência
                </label>
                <select v-model="frequencia" class="input-aurora" @change="calcularAuto">
                  <option value="mensal">Mensal</option>
                  <option value="anual">Anual</option>
                  <option value="diaria">Diária</option>
                </select>
              </div>
            </div>
            <BaseInput
              v-model="periodo"
              label="Período"
              type="number" :min="1"
              icon="fa-calendar-alt"
              :placeholder="frequencia === 'anual' ? 'Ex: 5 (anos)' : frequencia === 'diaria' ? 'Ex: 365 (dias)' : 'Ex: 12 (meses)'"
              :hint="`Em ${frequencia === 'mensal' ? 'meses' : frequencia === 'anual' ? 'anos' : 'dias'}`"
              @input="calcularAuto"
            />
            <BaseInput
              v-model="aporteMensal"
              label="Aporte Periódico (R$)"
              type="number" :min="0" step="50"
              icon="fa-plus-circle"
              placeholder="500"
              hint="Valor adicional investido a cada período (opcional)"
              tooltip="Quanto você vai adicionar ao investimento a cada período. Pode ser 0 se não houver aportes."
              @input="calcularAuto"
            />
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular
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

            <!-- Destaque principal -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Montante Final</p>
              <p class="text-5xl font-black text-white mb-2">{{ fmt(resultado.montanteFinal) }}</p>
              <p class="text-emerald-300 text-sm font-semibold">
                <i class="fas fa-arrow-up mr-1"></i>
                +{{ fmt(resultado.jurosGanhos) }} em juros ({{ resultado.rentabilidade }}%)
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ fmt(resultado.totalInvestido) }}</div>
                <div class="metric-glass-label">Total investido</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ fmt(resultado.jurosGanhos) }}</div>
                <div class="metric-glass-label">Juros ganhos</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ resultado.rentabilidade }}%</div>
                <div class="metric-glass-label">Rentabilidade total</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ fmt(resultado.aportesTotais) }}</div>
                <div class="metric-glass-label">Aportes totais</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-primary-500"></i>
                Detalhamento
              </h4>
              <div class="space-y-2 text-sm">
                <div v-for="item in breakdown" :key="item.label"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">{{ item.label }}</span>
                  <span :class="['font-bold', item.cls || 'text-gray-900 dark:text-white']">{{ item.value }}</span>
                </div>
              </div>
            </div>

            <!-- Dica final -->
            <div class="tip-card-success">
              <i class="fas fa-seedling text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Os juros compostos respondem por <strong>{{ pctJuros }}%</strong> do seu montante final.
                Quanto maior o prazo, maior essa proporção.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel p-6 text-center text-gray-400 dark:text-slate-500">
          <i class="fas fa-chart-line text-3xl mb-3 opacity-30 block text-green-400"></i>
          <p class="text-sm">Preencha os campos para simular o investimento</p>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const capitalInicial = ref<number | ''>(10000)
const taxaJuros      = ref<number | ''>(10)
const periodo        = ref<number | ''>(12)
const frequencia     = ref<'mensal' | 'anual' | 'diaria'>('mensal')
const aporteMensal   = ref<number | ''>(500)

interface Resultado {
  montanteFinal: number; totalInvestido: number
  jurosGanhos: number; aportesTotais: number; rentabilidade: string
}

const resultado  = ref<Resultado | null>(null)
const pctJuros   = computed(() => {
  if (!resultado.value) return 0
  return ((resultado.value.jurosGanhos / resultado.value.montanteFinal) * 100).toFixed(0)
})

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const breakdown = computed(() => [
  { label: 'Capital inicial',   value: fmt(Number(capitalInicial.value) || 0) },
  { label: 'Aportes totais',    value: fmt(resultado.value?.aportesTotais ?? 0) },
  { label: 'Total investido',   value: fmt(resultado.value?.totalInvestido ?? 0) },
  { label: 'Juros compostos',   value: fmt(resultado.value?.jurosGanhos ?? 0), cls: 'text-emerald-600 dark:text-emerald-400' },
  { label: 'Montante final',    value: fmt(resultado.value?.montanteFinal ?? 0), cls: 'text-primary-600 dark:text-primary-400' },
])

function calcular() {
  const capital = Number(capitalInicial.value) || 0
  const taxa    = Number(taxaJuros.value) || 0
  const tempo   = Number(periodo.value)   || 0
  const aporte  = Number(aporteMensal.value) || 0

  if (!capital) { Swal.fire({ icon: 'warning', title: 'Informe o capital inicial', confirmButtonColor: '#2563eb' }); return }
  if (!taxa)    { Swal.fire({ icon: 'warning', title: 'Informe a taxa de juros', confirmButtonColor: '#2563eb' }); return }
  if (!tempo)   { Swal.fire({ icon: 'warning', title: 'Informe o período', confirmButtonColor: '#2563eb' }); return }

  let taxaAdj = taxa / 100
  if (frequencia.value === 'mensal') taxaAdj = taxaAdj / 12
  else if (frequencia.value === 'diaria') taxaAdj = taxaAdj / 365

  const montanteSemAporte = capital * Math.pow(1 + taxaAdj, tempo)
  let montante = montanteSemAporte
  if (aporte > 0) {
    const fator = (Math.pow(1 + taxaAdj, tempo) - 1) / taxaAdj
    montante = montanteSemAporte + (aporte * fator)
  }

  const aportesTotais = aporte * tempo
  const totalInvestido = capital + aportesTotais
  const jurosGanhos = montante - totalInvestido
  const rentabilidade = ((montante / totalInvestido - 1) * 100).toFixed(2)

  resultado.value = { montanteFinal: montante, totalInvestido, jurosGanhos, aportesTotais, rentabilidade }
}

function calcularAuto() {
  if (capitalInicial.value && taxaJuros.value && periodo.value) calcular()
}

function limpar() {
  capitalInicial.value = 10000; taxaJuros.value = 10; periodo.value = 12
  frequencia.value = 'mensal'; aporteMensal.value = 500; resultado.value = null
}

calcularAuto()
watch([capitalInicial, taxaJuros, periodo, frequencia, aporteMensal], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
