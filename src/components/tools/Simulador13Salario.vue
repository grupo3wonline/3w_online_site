<template>
  <ToolShell
    title="Simulador de 13º Salário"
    description="Calcule o 13º salário com parcelas, descontos de INSS e IRRF conforme a legislação brasileira."
    icon="fa-gift"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['Tabela INSS 2024', 'IR retido na fonte', 'Proporcional por meses']"
    :tips="[
      { title: '1ª Parcela — novembro', text: 'Paga até 30/11. Corresponde a 50% do salário bruto, sem descontos de INSS ou IR.', type: 'info' },
      { title: '2ª Parcela — dezembro', text: 'Paga até 20/12. Calculada sobre o restante com desconto de INSS e IRRF.', type: 'info' },
      { title: 'Mês incompleto', text: 'Meses com 15 dias trabalhados ou mais contam como mês completo para cálculo proporcional.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Salário R$ 3.000, 12 meses', desc: 'Sem outros adicionais', result: '1ª Parcela: R$ 1.500 | 2ª Parcela: ~R$ 1.145' },
      { title: 'Salário R$ 5.000, 6 meses', desc: 'Proporcional 6/12', result: '13º Bruto: R$ 2.500 | Líquido: ~R$ 2.090' },
      { title: 'Salário R$ 10.000, 12 meses', desc: 'Incidência de IRRF', result: '13º Bruto: R$ 10.000 | Descontos: ~R$ 2.600' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BaseInput
              v-model="salarioBruto"
              label="Salário Bruto (R$)"
              type="number"
              :min="0"
              step="100"
              icon="fa-money-bill"
              tooltip="Salário bruto mensal (inclua horas extras e adicionais fixos)."
            />
            <BaseInput
              v-model="mesesTrabalhados"
              label="Meses Trabalhados"
              type="number"
              :min="1"
              :max="12"
              icon="fa-calendar-days"
              hint="1 a 12 meses no ano"
              tooltip="Meses trabalhados no ano corrente. Mês com 15+ dias = mês completo."
            />
          </div>

          <!-- Seleção de parcela -->
          <div>
            <label class="input-aurora-label mb-2">
              <i class="fas fa-calendar-check mr-1.5 text-emerald-500"></i>
              Parcela a Calcular
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="parcela = 1"
                :class="['p-4 rounded-xl border-2 transition-all text-left', parcela === 1 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300']"
              >
                <div class="font-bold text-gray-900 dark:text-white text-sm mb-0.5">1ª Parcela</div>
                <div class="text-xs text-gray-500 dark:text-slate-400">Até 30 de novembro</div>
              </button>
              <button
                @click="parcela = 2"
                :class="['p-4 rounded-xl border-2 transition-all text-left', parcela === 2 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300']"
              >
                <div class="font-bold text-gray-900 dark:text-white text-sm mb-0.5">2ª Parcela</div>
                <div class="text-xs text-gray-500 dark:text-slate-400">Até 20 de dezembro</div>
              </button>
            </div>
          </div>

          <div class="flex gap-3">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">Calcular 13º</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="resultado = null">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <!-- Header -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ parcela === 1 ? '1ª Parcela (Bruta)' : '2ª Parcela (Líquida)' }}</p>
              <p class="text-5xl font-black text-white mb-2">
                {{ fmtBRL(parcela === 1 ? resultado.primeiraParcela : resultado.segundaParcela) }}
              </p>
              <p class="text-emerald-300 text-sm font-semibold">
                <i class="fas fa-calendar-alt mr-1"></i>{{ mesesTrabalhados }}/12 meses
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ fmtBRL(resultado.decimoTerceiroBruto) }}</div>
                <div class="metric-glass-label">13º Bruto</div>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-600 dark:text-red-400">{{ fmtBRL(resultado.inss) }}</div>
                <div class="metric-glass-label">INSS</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ fmtBRL(resultado.irrf) }}</div>
                <div class="metric-glass-label">IRRF</div>
              </div>
              <div class="metric-glass ring-1 ring-green-100 dark:ring-green-900">
                <div class="metric-glass-value text-green-600 dark:text-green-400">{{ fmtBRL(resultado.decimoTerceiroLiquido) }}</div>
                <div class="metric-glass-label">Total Líquido</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-emerald-500"></i>Detalhamento
              </h4>
              <div class="space-y-2 text-sm">
                <div v-for="item in breakdown" :key="item.label"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">{{ item.label }}</span>
                  <span :class="['font-bold', item.cls || 'text-gray-900 dark:text-white']">{{ item.value }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-info-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <div class="text-xs">
                <strong>Como funciona o 13º:</strong> A 1ª parcela é 50% do bruto sem descontos.
                A 2ª parcela desconta INSS (tabela progressiva) e IRRF sobre a base calculada.
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-gift text-4xl mb-3 opacity-30 block text-green-400"></i>
          <p class="text-sm">Informe o salário e os meses trabalhados para calcular</p>
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
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

interface Resultado13 {
  decimoTerceiroBruto:    number
  inss:                   number
  irrf:                   number
  decimoTerceiroLiquido:  number
  primeiraParcela:        number
  segundaParcela:         number
}

const salarioBruto     = ref<number | ''>(3000)
const mesesTrabalhados = ref<number | ''>(12)
const parcela          = ref<1 | 2>(1)
const resultado        = ref<Resultado13 | null>(null)

const fmtBRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const breakdown = computed(() => {
  if (!resultado.value) return []
  const r = resultado.value
  return [
    { label: '13º Bruto',        value: fmtBRL(r.decimoTerceiroBruto) },
    { label: '(-) INSS',         value: `- ${fmtBRL(r.inss)}`,           cls: 'text-red-600 dark:text-red-400' },
    { label: '(-) IRRF',         value: `- ${fmtBRL(r.irrf)}`,           cls: 'text-orange-600 dark:text-orange-400' },
    { label: '13º Líquido',      value: fmtBRL(r.decimoTerceiroLiquido), cls: 'text-emerald-600 dark:text-emerald-400' },
    { label: '1ª Parcela (bruta)',value: fmtBRL(r.primeiraParcela) },
    { label: '2ª Parcela (líq.)', value: fmtBRL(r.segundaParcela),       cls: 'text-primary-600 dark:text-primary-400' },
  ]
})

const calcular = () => {
  const salario = Number(salarioBruto.value) || 0
  const meses   = Number(mesesTrabalhados.value) || 0
  if (!salario) { Swal.fire({ icon: 'warning', title: 'Informe o salário bruto', confirmButtonColor: '#16a34a' }); return }
  if (!meses)   { Swal.fire({ icon: 'warning', title: 'Informe os meses trabalhados', confirmButtonColor: '#16a34a' }); return }

  const bruto = (salario / 12) * meses

  // INSS progressivo 2024
  let inss = 0
  if      (bruto <= 1412.00)   inss = bruto * 0.075
  else if (bruto <= 2666.68)   inss = 1412 * 0.075 + (bruto - 1412) * 0.09
  else if (bruto <= 4000.03)   inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (bruto - 2666.68) * 0.12
  else if (bruto <= 7786.02)   inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (bruto - 4000.03) * 0.14
  else                         inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14

  // IRRF 2024
  const baseIR = bruto - inss
  let irrf = 0
  if      (baseIR > 4664.68) irrf = baseIR * 0.275 - 896.00
  else if (baseIR > 3751.05) irrf = baseIR * 0.225 - 662.77
  else if (baseIR > 2826.65) irrf = baseIR * 0.15  - 381.44
  else if (baseIR > 2259.20) irrf = baseIR * 0.075 - 169.44
  irrf = Math.max(irrf, 0)

  const liquido        = bruto - inss - irrf
  const primeiraParcela= bruto / 2
  const segundaParcela = liquido - primeiraParcela

  resultado.value = { decimoTerceiroBruto: bruto, inss, irrf, decimoTerceiroLiquido: liquido, primeiraParcela, segundaParcela }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
