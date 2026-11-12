<template>
  <ToolShell
    title="Simulador de Precatórios"
    description="Calcule a atualização monetária de precatórios com juros de mora e correção pelo IPCA-E ou Selic."
    icon="fa-gavel"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['Alimentar tem prioridade', 'IR sobre rendimentos', 'Cessão com deságio possível']"
    :tips="[
      { title: 'O que é precatório', text: 'Precatório é uma requisição judicial de pagamento pelo poder público (federal, estadual ou municipal) após sentença definitiva.', type: 'info' },
      { title: 'RPV vs Precatório', text: 'Valores até 60 salários mínimos podem ser pagos como RPV (Requisição de Pequeno Valor), que é pago mais rapidamente que o precatório comum.' },
      { title: 'Correção monetária', text: 'A correção dos precatórios segue o IPCA-E ou Selic, dependendo da natureza da dívida e da decisão judicial. Sempre confira com o advogado.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Precatório R$ 50.000, 5 anos', desc: 'Taxa 6% a.a. (poupança)', result: 'Valor atualizado: ~R$ 66.911 (multiplicador 1,34x)' },
      { title: 'Precatório R$ 100.000, 3 anos', desc: 'Taxa 12% a.a. (IPCA+6)', result: 'Valor atualizado: ~R$ 140.493 (multiplicador 1,40x)' },
      { title: 'Precatório R$ 30.000, 10 anos', desc: 'Taxa Selic 13,75% a.a.', result: 'Valor atualizado: ~R$ 108.000 (3,6x o original)' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <!-- Tipo de Precatório -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-gavel mr-1.5 text-indigo-500"></i>
                Tipo de Precatório
              </label>
              <div class="grid grid-cols-2 gap-2 mt-1">
                <button
                  @click="tipoPrecatorio = 'alimentar'"
                  :class="['p-3 rounded-xl border-2 text-sm transition-all text-center', tipoPrecatorio === 'alimentar' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-200 dark:border-slate-600']"
                >
                  <i class="fas fa-utensils text-lg mb-1 block text-amber-600 dark:text-amber-400"></i>
                  <div class="font-bold">Alimentar</div>
                  <div class="text-[10px] opacity-70">Prioridade de pagamento</div>
                </button>
                <button
                  @click="tipoPrecatorio = 'comum'"
                  :class="['p-3 rounded-xl border-2 text-sm transition-all text-center', tipoPrecatorio === 'comum' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-200 dark:border-slate-600']"
                >
                  <i class="fas fa-landmark text-lg mb-1 block text-amber-600 dark:text-amber-400"></i>
                  <div class="font-bold">Comum</div>
                  <div class="text-[10px] opacity-70">Ordem cronológica</div>
                </button>
              </div>
            </div>

            <BaseInput
              v-model="valorOriginal"
              label="Valor Original (R$)"
              type="number" :min="0" step="100"
              icon="fa-money-bill"
              placeholder="50000"
              tooltip="Valor original reconhecido na sentença judicial."
              @input="calcularAuto"
            />

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="input-aurora-label">
                  <i class="fas fa-calendar mr-1.5 text-indigo-500"></i>
                  Data da Dívida
                </label>
                <input v-model="dataInicial" type="date" class="input-aurora" @change="calcularAuto" />
              </div>
              <div>
                <label class="input-aurora-label">
                  <i class="fas fa-calendar-check mr-1.5 text-indigo-500"></i>
                  Data de Cálculo
                </label>
                <input v-model="dataFinal" type="date" class="input-aurora" @change="calcularAuto" />
              </div>
            </div>

            <BaseInput
              v-model="taxaJuros"
              label="Taxa de Juros (% a.a.)"
              type="number" step="0.1"
              icon="fa-percentage"
              placeholder="6"
              hint="IPCA-E, Selic ou 6% a.a. (poupança)"
              tooltip="Taxa anual de correção monetária aplicada pelo juízo."
              @input="calcularAuto"
            />

            <div class="flex flex-wrap gap-2">
              <button @click="taxaJuros = 6; calcularAuto()"    class="px-3 py-1 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-medium">Poupança: 6%</button>
              <button @click="taxaJuros = 12; calcularAuto()"   class="px-3 py-1 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-medium">IPCA+6%: 12%</button>
              <button @click="taxaJuros = 13.75; calcularAuto()" class="px-3 py-1 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-medium">Selic: 13,75%</button>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular Precatório
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- Descontos -->
        <div v-if="resultado" class="glass-panel p-4">
          <p class="text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">Calcular com Honorários</p>
          <div class="flex gap-2">
            <BaseButton variant="warning" size="sm" icon="fa-calculator" @click="calcularComDescontos(20)" class="flex-1">
              Honorários 20%
            </BaseButton>
            <BaseButton variant="warning" size="sm" icon="fa-calculator" @click="calcularComDescontos(30)" class="flex-1">
              Honorários 30%
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
              <p class="text-sm text-blue-200 mb-1">Valor Atualizado do Precatório</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.valorAtualizado }}</p>
              <p class="text-amber-300 text-sm font-semibold">
                <i class="fas fa-clock mr-1"></i>
                {{ resultado.mesesDecorridos }} meses · Multiplicador: {{ resultado.multiplicador }}x
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-amber-100 dark:ring-amber-900">
                <div class="metric-glass-value text-amber-600 dark:text-amber-400">R$ {{ resultado.valorOriginal }}</div>
                <div class="metric-glass-label">Valor original</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.jurosAcumulados }}</div>
                <div class="metric-glass-label">Juros acumulados</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ resultado.anosDecorridos }} anos</div>
                <div class="metric-glass-label">Tempo decorrido</div>
              </div>
              <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
                <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ resultado.multiplicador }}x</div>
                <div class="metric-glass-label">Multiplicador</div>
              </div>
            </div>

            <!-- Com descontos -->
            <div v-if="resultado.valorLiquido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-scissors text-red-500"></i>
                Valor após Descontos
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">IR ({{ resultado.aliquotaIR }}% sobre rendimentos)</span>
                  <span class="font-bold text-red-600 dark:text-red-400">− R$ {{ resultado.impostoRenda }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Honorários ({{ resultado.aliquotaHonorarios }}%)</span>
                  <span class="font-bold text-red-600 dark:text-red-400">− R$ {{ resultado.honorarios }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="font-bold text-gray-900 dark:text-white">Valor líquido a receber</span>
                  <span class="font-black text-emerald-600 dark:text-emerald-400">R$ {{ resultado.valorLiquido }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-warning">
              <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Este cálculo é estimativo. Consulte o advogado e o sistema do tribunal para valores oficiais.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-gavel text-4xl mb-3 opacity-30 block text-indigo-400"></i>
          <p class="text-sm">Informe o valor e as datas para calcular a atualização do precatório</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

interface ResultadoPrecatorio {
  valorOriginal: string; valorAtualizado: string; jurosAcumulados: string
  mesesDecorridos: number; anosDecorridos: string; multiplicador: string
  impostoRenda?: string; honorarios?: string; valorLiquido?: string
  aliquotaIR?: string; aliquotaHonorarios?: number
}

const tipoPrecatorio = ref('alimentar')
const valorOriginal  = ref(50000)
const dataInicial    = ref('2020-01-01')
const dataFinal      = ref(new Date().toISOString().split('T')[0])
const taxaJuros      = ref(6)
const resultado      = ref<ResultadoPrecatorio | null>(null)

function calcular() {
  const valor      = Number(valorOriginal.value)
  const dataInicio = new Date(dataInicial.value)
  const dataFim    = new Date(dataFinal.value)
  const taxa       = Number(taxaJuros.value) / 100

  if (!valor) { Swal.fire({ icon: 'warning', title: 'Informe o valor original', confirmButtonColor: '#2563eb' }); return }
  if (dataFim <= dataInicio) { Swal.fire({ icon: 'warning', title: 'A data final deve ser após a data inicial', confirmButtonColor: '#2563eb' }); return }

  const diffTime   = Math.abs(dataFim.getTime() - dataInicio.getTime())
  const diffDays   = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const meses      = Math.floor(diffDays / 30)
  const anos       = (diffDays / 365).toFixed(1)

  const taxaMensal     = Math.pow(1 + taxa, 1/12) - 1
  const valorAtualizado = valor * Math.pow(1 + taxaMensal, meses)
  const juros          = valorAtualizado - valor
  const multiplicador  = (valorAtualizado / valor).toFixed(2)

  resultado.value = {
    valorOriginal:    valor.toFixed(2),
    valorAtualizado:  valorAtualizado.toFixed(2),
    jurosAcumulados:  juros.toFixed(2),
    mesesDecorridos:  meses,
    anosDecorridos:   anos,
    multiplicador:    multiplicador,
  }
}

function calcularAuto() {
  if (valorOriginal.value && dataInicial.value && dataFinal.value && taxaJuros.value) calcular()
}

function calcularComDescontos(percentualHonorarios: number) {
  if (!resultado.value) return
  const valorAtual  = Number(resultado.value.valorAtualizado)
  const valorOrig   = Number(resultado.value.valorOriginal)
  const rendimento  = valorAtual - valorOrig

  let aliquotaIR = 0
  if (rendimento <= 1903.98)      aliquotaIR = 0
  else if (rendimento <= 2826.65) aliquotaIR = 0.075
  else if (rendimento <= 3751.05) aliquotaIR = 0.15
  else if (rendimento <= 4664.68) aliquotaIR = 0.225
  else                            aliquotaIR = 0.275

  const ir        = rendimento * aliquotaIR
  const honorarios = valorAtual * (percentualHonorarios / 100)
  const valorLiquido = valorAtual - ir - honorarios

  resultado.value = {
    ...(resultado.value as ResultadoPrecatorio),
    impostoRenda:        ir.toFixed(2),
    honorarios:          honorarios.toFixed(2),
    valorLiquido:        valorLiquido.toFixed(2),
    aliquotaIR:          (aliquotaIR * 100).toFixed(1),
    aliquotaHonorarios:  percentualHonorarios,
  }
}

function limpar() {
  valorOriginal.value = 50000; taxaJuros.value = 6; resultado.value = null
  dataInicial.value = '2020-01-01'; dataFinal.value = new Date().toISOString().split('T')[0]
}

calcularAuto()
watch([tipoPrecatorio, valorOriginal, dataInicial, dataFinal, taxaJuros], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
