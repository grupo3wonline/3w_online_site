<template>
  <ToolShell
    title="Simulador de Férias"
    description="Calcule o valor das férias CLT com 1/3 constitucional e abono opcional."
    icon="fa-umbrella-beach"
    icon-gradient="from-blue-500 to-cyan-700"
    orb-color="blue"
    :quick-tips="['1/3 constitucional', 'Abono pecuniário', 'INSS sobre férias']"
    :tips="[
      { title: '1/3 de férias', text: 'O adicional de 1/3 sobre as férias é garantia constitucional (Art. 7°, XVII). É calculado sobre o valor das férias + abono.', type: 'info' },
      { title: 'Abono pecuniário', text: 'O empregado pode vender até 10 dias de férias por dinheiro (abono). A solicitação deve ser feita com até 15 dias de antecedência.' },
      { title: 'Prazo de pagamento', text: 'O empregador deve pagar as férias 2 dias antes do início do período. O não cumprimento gera obrigação de pagar em dobro.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Salário R$ 3.000, 30 dias', desc: 'Sem abono pecuniário', result: 'Férias: R$ 3.000 + 1/3 R$ 1.000 = R$ 4.000 bruto' },
      { title: 'Salário R$ 3.000, vendendo 10 dias', desc: 'Com abono pecuniário', result: 'Férias (20d) + 1/3 + abono = R$ 4.000 bruto' },
      { title: 'Salário R$ 5.000, 30 dias', desc: 'Com desconto INSS 11%', result: 'Líquido: R$ 5.945 (bruto) − INSS = ~R$ 5.291' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <BaseInput
              v-model="salarioBruto"
              label="Salário Bruto (R$)"
              type="number" :min="0" step="100"
              icon="fa-money-bill"
              placeholder="3000"
              tooltip="Informe seu salário bruto mensal (antes dos descontos)."
              @input="calcularAuto"
            />
            <BaseInput
              v-model="diasFerias"
              label="Dias de Férias"
              type="number" :min="1" :max="30"
              icon="fa-calendar-days"
              placeholder="30"
              hint="Mínimo 20 dias se vender 10 dias de abono"
              tooltip="Número de dias de férias a usufruir. Máximo 30 dias."
              @input="calcularAuto"
            />

            <label class="input-aurora-label mt-2">
              <i class="fas fa-toggle-on mr-1.5 text-cyan-500"></i>
              Abono Pecuniário
            </label>
            <label class="checkbox-aurora cursor-pointer select-none">
              <input type="checkbox" v-model="venderFerias" class="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500" @change="calcularAuto" />
              <span class="text-sm font-medium">Vender 10 dias de férias (abono pecuniário)</span>
            </label>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular Férias
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
              <p class="text-sm text-blue-200 mb-1">Valor Líquido das Férias</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.valorTotal }}</p>
              <p class="text-cyan-300 text-sm font-semibold">
                <i class="fas fa-calendar-check mr-1"></i>
                {{ diasFerias }} dias · Bruto: R$ {{ resultado.valorBruto }}
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-cyan-100 dark:ring-cyan-900">
                <div class="metric-glass-value text-cyan-600 dark:text-cyan-400">R$ {{ resultado.valorFerias }}</div>
                <div class="metric-glass-label">Valor Férias</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">R$ {{ resultado.tercoFerias }}</div>
                <div class="metric-glass-label">1/3 Constitucional</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.abonoPecuniario }}</div>
                <div class="metric-glass-label">Abono Pecuniário</div>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-600 dark:text-red-400">R$ {{ resultado.descontoINSS }}</div>
                <div class="metric-glass-label">Desconto INSS</div>
              </div>
            </div>

            <!-- Composição -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-blue-500"></i>
                Composição do Valor
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Valor das férias</span>
                  <span class="font-bold">R$ {{ resultado.valorFerias }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">1/3 constitucional</span>
                  <span class="font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.tercoFerias }}</span>
                </div>
                <div v-if="venderFerias" class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Abono pecuniário (10d)</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.abonoPecuniario }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Total bruto</span>
                  <span class="font-bold">R$ {{ resultado.valorBruto }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Desconto INSS</span>
                  <span class="font-bold text-red-600 dark:text-red-400">− R$ {{ resultado.descontoINSS }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="font-bold text-gray-900 dark:text-white">Valor líquido</span>
                  <span class="font-black text-cyan-600 dark:text-cyan-400">R$ {{ resultado.valorTotal }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                O INSS incide sobre férias + 1/3 + abono (alíquota de 11% neste cálculo). Valores sujeitos à tabela progressiva vigente.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-umbrella-beach text-4xl mb-3 opacity-30 block text-cyan-400"></i>
          <p class="text-sm">Informe o salário para calcular o valor das férias</p>
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

const salarioBruto = ref(3000)
const diasFerias   = ref(30)
const venderFerias = ref(false)
const resultado    = ref(null)

function calcular() {
  const salario = Number(salarioBruto.value)
  const dias    = Number(diasFerias.value)

  if (!salario) { Swal.fire({ icon: 'warning', title: 'Informe o salário bruto', confirmButtonColor: '#2563eb' }); return }

  let valorFerias = (salario / 30) * dias
  let abono = 0

  if (venderFerias.value) {
    abono       = (salario / 30) * 10
    valorFerias = (salario / 30) * (dias - 10)
  }

  const terco        = (valorFerias + abono) / 3
  const totalBruto   = valorFerias + terco + abono
  const inss         = totalBruto * 0.11
  const valorLiquido = totalBruto - inss

  resultado.value = {
    valorFerias:     valorFerias.toFixed(2),
    tercoFerias:     terco.toFixed(2),
    abonoPecuniario: abono.toFixed(2),
    descontoINSS:    inss.toFixed(2),
    valorBruto:      totalBruto.toFixed(2),
    valorTotal:      valorLiquido.toFixed(2),
  }
}

function calcularAuto() {
  if (salarioBruto.value && diasFerias.value) calcular()
}

function limpar() {
  salarioBruto.value = 3000; diasFerias.value = 30; venderFerias.value = false; resultado.value = null
}

calcularAuto()
watch([salarioBruto, diasFerias, venderFerias], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
