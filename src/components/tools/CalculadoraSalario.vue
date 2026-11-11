<template>
  <ToolShell
    title="Calculadora de Salário Líquido"
    description="Calcule o salário líquido CLT com INSS 2025 (tabela progressiva), IRRF, dependentes e outros descontos."
    icon="fa-money-bill-wave"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['Tabela INSS 2025', 'IRRF progressivo', 'Dependentes incluídos']"
    :tips="[
      { title: 'INSS 2025 — tabela progressiva', text: 'Até R$ 1.412: 7,5% | R$ 1.412–2.667: 9% | R$ 2.667–4.000: 12% | R$ 4.000–7.786: 14%. As faixas são progressivas (como o IR).' },
      { title: 'Deduções IRRF', text: 'Cada dependente deduz R$ 189,59 da base de cálculo do IRRF, reduzindo o imposto de renda retido.', type: 'info' },
      { title: 'Vale Transporte', text: 'O desconto do VT é limitado a 6% do salário bruto. Se o VT fornecido for menor que 6% do salário, desconta apenas o valor real.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Salário mínimo 2025', desc: 'R$ 1.412 bruto, 0 dependentes', result: 'Líquido: ~R$ 1.305,90 (desconto de 7,5% INSS, IR isento)' },
      { title: 'Salário médio', desc: 'R$ 3.500 bruto, 1 dependente', result: 'Líquido: ~R$ 2.979,10 (INSS R$ 324,76 + IRRF R$ 196,14)' },
      { title: 'Salário alto', desc: 'R$ 8.000 bruto, 2 dependentes, VT R$ 300', result: 'Líquido: ~R$ 6.237,00 aprox.' },
    ]"
  >

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="tool-body !mb-0 space-y-3">
        <BaseInput
          v-model="salarioBruto"
          label="Salário Bruto (R$)"
          type="number" :min="0" step="100"
          icon="fa-money-bill"
          placeholder="3500"
          tooltip="Valor bruto antes de qualquer desconto. Informe o valor pactuado em contrato."
          @input="calcularAuto"
        />
        <BaseInput
          v-model="dependentes"
          label="Número de Dependentes"
          type="number" :min="0" :max="10"
          icon="fa-users"
          placeholder="0"
          tooltip="Dependentes legais (filhos, cônjuge) deduzem R$ 189,59 cada da base do IRRF."
          @input="calcularAuto"
        />

        <div class="divider-label">
          <span class="text-xs text-gray-400 dark:text-slate-500 font-medium">Descontos opcionais</span>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <BaseInput
            v-model="valeTransporte"
            label="Vale Transporte (R$)"
            type="number" :min="0" step="10"
            icon="fa-bus"
            placeholder="0"
            hint="Valor mensal do benefício"
            @input="calcularAuto"
          />
          <BaseInput
            v-model="planoSaude"
            label="Plano de Saúde (R$)"
            type="number" :min="0" step="10"
            icon="fa-heart-pulse"
            placeholder="0"
            hint="Desconto mensal"
            @input="calcularAuto"
          />
        </div>
        <BaseInput
          v-model="outrosDescontos"
          label="Outros descontos (R$)"
          type="number" :min="0" step="10"
          icon="fa-minus-circle"
          placeholder="0"
          hint="Alimentação, previdência privada, etc."
          @input="calcularAuto"
        />

        <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="w-full mt-2">
          Calcular Salário Líquido
        </BaseButton>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- Destaque -->
            <div class="tool-header text-center py-6">
              <p class="text-sm text-blue-200 mb-1">Salário Líquido</p>
              <p class="text-5xl font-black text-white mb-2">{{ fmt(resultado.salarioLiquido) }}</p>
              <p class="text-teal-300 text-sm font-semibold">
                <i class="fas fa-arrow-down mr-1"></i>
                {{ resultado.percentualDesconto }}% de desconto total
              </p>
            </div>

            <!-- Holerite visual -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-receipt text-primary-500"></i>
                Holerite Simplificado
              </h4>
              <div class="space-y-2 text-sm">
                <!-- Bruto -->
                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                  <span class="font-semibold text-gray-700 dark:text-slate-200">
                    <i class="fas fa-plus mr-1.5 text-emerald-400"></i>Salário Bruto
                  </span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ fmt(Number(salarioBruto) || 0) }}</span>
                </div>
                <!-- Descontos -->
                <div v-for="d in descontos" :key="d.label"
                  class="flex justify-between items-center py-1.5 text-xs border-b border-gray-100/60 dark:border-slate-700/40 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">
                    <i class="fas fa-minus mr-1 text-red-400 text-[10px]"></i>
                    {{ d.label }}
                    <span v-if="d.sub" class="text-gray-400 dark:text-slate-500 ml-1">({{ d.sub }})</span>
                  </span>
                  <span class="font-semibold text-red-500 dark:text-red-400">– {{ fmt(d.valor) }}</span>
                </div>
                <!-- Líquido -->
                <div class="flex justify-between items-center py-2.5 mt-1 bg-teal-50 dark:bg-teal-900/20 rounded-xl px-3 border border-teal-200 dark:border-teal-800">
                  <span class="font-black text-gray-800 dark:text-white">Salário Líquido</span>
                  <span class="font-black text-teal-600 dark:text-teal-400 text-base">{{ fmt(resultado.salarioLiquido) }}</span>
                </div>
              </div>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-3 gap-2.5">
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-500 text-lg">{{ fmt(resultado.inss) }}</div>
                <div class="metric-glass-label">INSS ({{ resultado.aliquotaINSS }}%)</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-500 text-lg">{{ fmt(resultado.irrf) }}</div>
                <div class="metric-glass-label">IRRF</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-500 text-lg">{{ fmt(resultado.totalDescontos) }}</div>
                <div class="metric-glass-label">Total descontos</div>
              </div>
            </div>

          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel p-6 text-center text-gray-400 dark:text-slate-500">
          <i class="fas fa-money-bill-wave text-3xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Informe o salário bruto para calcular</p>
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

const salarioBruto    = ref<number | ''>(3500)
const dependentes     = ref<number | ''>(0)
const valeTransporte  = ref<number | ''>(0)
const planoSaude      = ref<number | ''>(0)
const outrosDescontos = ref<number | ''>(0)

interface Resultado {
  salarioLiquido: number; inss: number; irrf: number
  aliquotaINSS: string; descontoVT: number; totalDescontos: number; percentualDesconto: string
}

const resultado = ref<Resultado | null>(null)
const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const descontos = computed(() => {
  if (!resultado.value) return []
  const r = resultado.value
  const list = [
    { label: 'INSS', sub: `${r.aliquotaINSS}% progressivo`, valor: r.inss },
    { label: 'IRRF', sub: 'Imposto de Renda', valor: r.irrf },
  ]
  if (r.descontoVT > 0) list.push({ label: 'Vale Transporte', sub: 'max 6%', valor: r.descontoVT })
  if ((planoSaude.value as number) > 0) list.push({ label: 'Plano de Saude', sub: '', valor: Number(planoSaude.value) })
  if ((outrosDescontos.value as number) > 0) list.push({ label: 'Outros descontos', sub: '', valor: Number(outrosDescontos.value) })
  return list
})

function calcular() {
  const salario = Number(salarioBruto.value) || 0
  const deps    = Number(dependentes.value)  || 0
  if (!salario) return

  // INSS 2025 — progressiva
  let inss = 0
  if (salario <= 1412)      inss = salario * 0.075
  else if (salario <= 2666.68) inss = 1412 * 0.075 + (salario - 1412) * 0.09
  else if (salario <= 4000.03) inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salario - 2666.68) * 0.12
  else if (salario <= 7786.02) inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salario - 4000.03) * 0.14
  else                         inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14

  const aliquotaINSS = ((inss / salario) * 100).toFixed(2)

  // IRRF 2025
  const baseIRRF = salario - inss - deps * 189.59
  let irrf = 0
  if (baseIRRF > 2259.20) {
    if      (baseIRRF <= 2826.65) irrf = baseIRRF * 0.075 - 169.44
    else if (baseIRRF <= 3751.05) irrf = baseIRRF * 0.15  - 381.44
    else if (baseIRRF <= 4664.68) irrf = baseIRRF * 0.225 - 662.77
    else                           irrf = baseIRRF * 0.275 - 896.00
  }

  const descontoVT = (valeTransporte.value as number) > 0
    ? Math.min(salario * 0.06, Number(valeTransporte.value)) : 0

  const totalDescontos = inss + irrf + descontoVT + Number(planoSaude.value) + Number(outrosDescontos.value)
  const salarioLiquido = salario - totalDescontos
  const percentualDesconto = ((totalDescontos / salario) * 100).toFixed(2)

  resultado.value = { salarioLiquido, inss, irrf, aliquotaINSS, descontoVT, totalDescontos, percentualDesconto }
}

function calcularAuto() {
  if (salarioBruto.value) calcular()
}

calcularAuto()
watch([salarioBruto, dependentes, valeTransporte, planoSaude, outrosDescontos], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
