<template>
  <ToolShell
    title="Simulador de Pensão Alimentícia"
    description="Calcule o valor de pensão alimentícia com base na renda, número de filhos e percentual aplicado."
    icon="fa-child-reaching"
    icon-gradient="from-pink-500 to-rose-700"
    orb-color="pink"
    :quick-tips="['Calculada sobre salário líquido', '10% a 40% da renda', '13º salário proporcional']"
    :tips="[
      { title: 'Base de cálculo', text: 'A pensão alimentícia é calculada sobre o salário líquido (após INSS e IR). O juiz pode incluir benefícios como FGTS, PLR e 13º.', type: 'info' },
      { title: 'Percentual por filho', text: '1 filho: 20–30% | 2 filhos: 25–35% | 3 ou mais: 30–40%. O percentual varia conforme o padrão de vida e as necessidades.' },
      { title: 'Inadimplência e prisão', text: 'O não pagamento de pensão alimentícia pode resultar em prisão civil de até 3 meses por período. Revisar é possível a qualquer momento.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Renda R$ 3.000, 1 filho (25%)', desc: 'Cálculo percentual sobre renda mensal', result: 'Pensão: R$ 750/mês | Anual (c/ 13º): R$ 9.750' },
      { title: 'Renda R$ 5.000, 2 filhos (30%)', desc: 'Cálculo percentual sobre renda mensal', result: 'Pensão: R$ 1.500/mês | Por filho: R$ 750' },
      { title: '0,5 salário mínimo por filho', desc: 'Base em salário mínimo (R$ 1.412)', result: 'Pensão: R$ 706/filho/mês' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <!-- Tipo de cálculo -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-calculator mr-1.5 text-pink-500"></i>
                Tipo de Cálculo
              </label>
              <div class="grid grid-cols-2 gap-2 mt-1">
                <button
                  @click="tipoCalculo = 'percentual'; calcularAuto()"
                  :class="['p-3 rounded-xl border-2 text-sm transition-all text-center', tipoCalculo === 'percentual' ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'border-gray-200 dark:border-slate-600']"
                >
                  <i class="fas fa-percentage text-lg mb-1 block text-pink-600 dark:text-pink-400"></i>
                  <div class="font-bold">Percentual</div>
                  <div class="text-[10px] opacity-70">% sobre a renda</div>
                </button>
                <button
                  @click="tipoCalculo = 'salario-minimo'; calcularAuto()"
                  :class="['p-3 rounded-xl border-2 text-sm transition-all text-center', tipoCalculo === 'salario-minimo' ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'border-gray-200 dark:border-slate-600']"
                >
                  <i class="fas fa-coins text-lg mb-1 block text-pink-600 dark:text-pink-400"></i>
                  <div class="font-bold">Salário Mínimo</div>
                  <div class="text-[10px] opacity-70">Múltiplo do SM</div>
                </button>
              </div>
            </div>

            <!-- Campos percentual -->
            <div v-if="tipoCalculo === 'percentual'" class="space-y-3">
              <BaseInput
                v-model="rendaMensal"
                label="Renda Mensal (R$)"
                type="number" :min="0" step="100"
                icon="fa-dollar-sign"
                placeholder="3000"
                tooltip="Renda mensal líquida (salário após INSS e IR)."
                @input="calcularAuto"
              />
              <BaseInput
                v-model="numeroFilhos"
                label="Número de Filhos"
                type="number" :min="1" :max="10"
                icon="fa-users"
                placeholder="1"
                @input="calcularAuto"
              />
              <BaseInput
                v-model="percentual"
                label="Percentual (%)"
                type="number" :min="10" :max="70"
                icon="fa-percentage"
                placeholder="25"
                hint="Sugestão: 20-30% por 1 filho, 25-35% por 2"
                @input="calcularAuto"
              />
              <div class="flex flex-wrap gap-2">
                <button @click="percentual = 20; calcularAuto()" class="px-3 py-1 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-medium">1 filho: 20%</button>
                <button @click="percentual = 25; calcularAuto()" class="px-3 py-1 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-medium">1 filho: 25%</button>
                <button @click="percentual = 30; calcularAuto()" class="px-3 py-1 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-medium">2 filhos: 30%</button>
                <button @click="percentual = 35; calcularAuto()" class="px-3 py-1 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-medium">3+ filhos: 35%</button>
              </div>
            </div>

            <!-- Campos salário mínimo -->
            <div v-else class="space-y-3">
              <BaseInput
                v-model="salarioMinimo"
                label="Salário Mínimo (R$)"
                type="number" :min="0" step="10"
                icon="fa-landmark"
                placeholder="1412"
                hint="Salário mínimo 2025: R$ 1.412"
                @input="calcularAuto"
              />
              <BaseInput
                v-model="numeroFilhos"
                label="Número de Filhos"
                type="number" :min="1" :max="10"
                icon="fa-users"
                placeholder="1"
                @input="calcularAuto"
              />
              <BaseInput
                v-model="multiploSM"
                label="Múltiplo do Salário Mínimo"
                type="number" step="0.1"
                icon="fa-times"
                placeholder="0.5"
                hint="Por filho. Ex: 0,5 = R$ 706 por filho"
                @input="calcularAuto"
              />
              <div class="flex flex-wrap gap-2">
                <button @click="multiploSM = 0.3; calcularAuto()" class="px-3 py-1 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-medium">0,3 SM</button>
                <button @click="multiploSM = 0.5; calcularAuto()" class="px-3 py-1 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-medium">0,5 SM</button>
                <button @click="multiploSM = 1; calcularAuto()"   class="px-3 py-1 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-medium">1 SM</button>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular Pensão
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
              <p class="text-sm text-blue-200 mb-1">Pensão Mensal Estimada</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.valorMensal }}</p>
              <p class="text-pink-300 text-sm font-semibold">
                <i class="fas fa-child mr-1"></i>
                {{ numeroFilhos }} {{ numeroFilhos > 1 ? 'filhos' : 'filho' }} · {{ resultado.percentualRenda }}% da renda
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-pink-100 dark:ring-pink-900">
                <div class="metric-glass-value text-pink-600 dark:text-pink-400">R$ {{ resultado.valorPorFilho }}</div>
                <div class="metric-glass-label">Por filho/mês</div>
              </div>
              <div class="metric-glass ring-1 ring-rose-100 dark:ring-rose-900">
                <div class="metric-glass-value text-rose-600 dark:text-rose-400">R$ {{ resultado.valorAnual }}</div>
                <div class="metric-glass-label">Anual (c/ 13º)</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ resultado.percentualRenda }}%</div>
                <div class="metric-glass-label">% da renda</div>
              </div>
              <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
                <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">R$ {{ resultado.valor5Anos }}</div>
                <div class="metric-glass-label">Total 5 anos</div>
              </div>
            </div>

            <div class="tip-card-warning">
              <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Este é um valor estimado. O juiz decide com base nas necessidades do filho e na capacidade financeira do responsável. Consulte um advogado.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-child-reaching text-4xl mb-3 opacity-30 block text-pink-400"></i>
          <p class="text-sm">Informe os dados para estimar o valor da pensão alimentícia</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const tipoCalculo  = ref('percentual')
const rendaMensal  = ref(3000)
const numeroFilhos = ref(1)
const percentual   = ref(25)
const salarioMinimo = ref(1412)
const multiploSM   = ref(0.5)
const resultado    = ref(null)

function calcular() {
  let valorMensal = 0, rendaBase = 0

  if (tipoCalculo.value === 'percentual') {
    rendaBase = Number(rendaMensal.value)
    if (!rendaBase) { Swal.fire({ icon: 'warning', title: 'Informe a renda mensal', confirmButtonColor: '#2563eb' }); return }
    valorMensal = rendaBase * (Number(percentual.value) / 100)
  } else {
    valorMensal = Number(salarioMinimo.value) * Number(multiploSM.value) * Number(numeroFilhos.value)
    rendaBase = rendaMensal.value || salarioMinimo.value * 3
  }

  const valorAnual      = valorMensal * 13
  const valorPorFilho   = valorMensal / Number(numeroFilhos.value)
  const percentualRenda = rendaBase > 0 ? ((valorMensal / rendaBase) * 100) : 0
  const valor5Anos      = valorAnual * 5

  resultado.value = {
    valorMensal:     valorMensal.toFixed(2),
    valorAnual:      valorAnual.toFixed(2),
    valorPorFilho:   valorPorFilho.toFixed(2),
    percentualRenda: percentualRenda.toFixed(1),
    valor5Anos:      valor5Anos.toFixed(2),
  }
}

function calcularAuto() {
  if ((tipoCalculo.value === 'percentual' && rendaMensal.value) ||
      (tipoCalculo.value === 'salario-minimo' && salarioMinimo.value)) {
    calcular()
  }
}

function limpar() {
  rendaMensal.value = 3000; numeroFilhos.value = 1; percentual.value = 25
  salarioMinimo.value = 1412; multiploSM.value = 0.5; resultado.value = null
}

calcularAuto()
watch(tipoCalculo, () => { resultado.value = null })
watch([rendaMensal, numeroFilhos, percentual, salarioMinimo, multiploSM], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
