<template>
  <ToolShell
    title="Simulador de Hora Extra"
    description="Calcule o valor de horas extras com 50% (dias úteis) e 100% (domingos e feriados) conforme a CLT."
    icon="fa-clock"
    icon-gradient="from-orange-500 to-amber-700"
    orb-color="orange"
    :quick-tips="['50%: dias úteis', '100%: dom. e feriados', 'Máx. 2h extras/dia']"
    :tips="[
      { title: '50% — Dias úteis e sábados', text: 'Horas extras em dias úteis (segunda a sábado) têm adicional mínimo de 50% sobre o valor da hora normal (CLT Art. 59).', type: 'info' },
      { title: '100% — Domingos e feriados', text: 'Horas trabalhadas em domingos e feriados têm adicional de 100%. Podem ser substituídas por folga compensatória.' },
      { title: 'Limite legal', text: 'A CLT limita a 2 horas extras por dia. Exceder isso é infração trabalhista e pode ser autuado pelo MTE.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Salário R$ 3.000, 44h semanais', desc: '10h extras 50% + 4h extras 100%', result: 'Hora normal: R$ 7,67 | Adicional: R$ 191,46' },
      { title: 'Salário R$ 5.000, 40h semanais', desc: '8h extras 50% no mês', result: 'Hora normal: R$ 11,36 | Extras 50%: R$ 136,36' },
      { title: 'Salário R$ 2.500, 44h semanais', desc: '20h extras 50%', result: 'Salário total: ~R$ 3.218 no mês' },
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
              tooltip="Salário bruto mensal contratual, sem horas extras."
              @input="calcularAuto"
            />
            <BaseInput
              v-model="horasSemanais"
              label="Horas Semanais Contratuais"
              type="number" :min="1" :max="44"
              icon="fa-business-time"
              placeholder="44"
              hint="Máximo legal: 44 horas semanais"
              tooltip="Carga horária contratual por semana. Padrão CLT: 44 horas."
              @input="calcularAuto"
            />
            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="horasExtras50"
                label="Horas Extras 50%"
                type="number" :min="0" step="0.5"
                icon="fa-clock"
                placeholder="10"
                hint="Dias úteis e sábados"
                tooltip="Horas extras realizadas em dias úteis (segunda a sábado)."
                @input="calcularAuto"
              />
              <BaseInput
                v-model="horasExtras100"
                label="Horas Extras 100%"
                type="number" :min="0" step="0.5"
                icon="fa-moon"
                placeholder="4"
                hint="Domingos e feriados"
                tooltip="Horas extras realizadas em domingos e feriados."
                @input="calcularAuto"
              />
            </div>
          </div>

          <div class="tip-card mt-4">
            <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
            <span class="text-xs">
              <strong>50%:</strong> dias úteis e sábados &nbsp;|&nbsp; <strong>100%:</strong> domingos e feriados
            </span>
          </div>

          <div class="flex gap-3 mt-3">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular Horas Extras
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
              <p class="text-sm text-blue-200 mb-1">Total Horas Extras no Mês</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.totalHorasExtras }}</p>
              <p class="text-orange-300 text-sm font-semibold">
                <i class="fas fa-clock mr-1"></i>
                {{ resultado.totalHoras }}h extras · Salário total: R$ {{ resultado.salarioTotal }}
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">R$ {{ resultado.valorHoraNormal }}</div>
                <div class="metric-glass-label">Hora normal</div>
              </div>
              <div class="metric-glass ring-1 ring-amber-100 dark:ring-amber-900">
                <div class="metric-glass-value text-amber-600 dark:text-amber-400">R$ {{ resultado.valorHora50 }}</div>
                <div class="metric-glass-label">Hora 50%</div>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-600 dark:text-red-400">R$ {{ resultado.valorHora100 }}</div>
                <div class="metric-glass-label">Hora 100%</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-orange-500"></i>
                Detalhamento
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Salário base</span>
                  <span class="font-bold">R$ {{ salarioBruto }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Extras 50% ({{ horasExtras50 }}h × R$ {{ resultado.valorHora50 }})</span>
                  <span class="font-bold text-amber-600 dark:text-amber-400">R$ {{ resultado.total50 }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Extras 100% ({{ horasExtras100 }}h × R$ {{ resultado.valorHora100 }})</span>
                  <span class="font-bold text-red-600 dark:text-red-400">R$ {{ resultado.total100 }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="font-bold text-gray-900 dark:text-white">Salário total</span>
                  <span class="font-black text-orange-600 dark:text-orange-400">R$ {{ resultado.salarioTotal }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-warning">
              <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Limite legal: máx. 2h extras por dia. Banco de horas exige convenção coletiva.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-clock text-4xl mb-3 opacity-30 block text-orange-400"></i>
          <p class="text-sm">Preencha os dados para calcular o valor das horas extras</p>
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

const salarioBruto  = ref(3000)
const horasSemanais = ref(44)
const horasExtras50 = ref(10)
const horasExtras100 = ref(4)
const resultado     = ref(null)

function calcular() {
  const salario      = Number(salarioBruto.value)
  const horasSemana  = Number(horasSemanais.value)
  const extras50     = Number(horasExtras50.value)
  const extras100    = Number(horasExtras100.value)

  if (!salario) { Swal.fire({ icon: 'warning', title: 'Informe o salário bruto', confirmButtonColor: '#2563eb' }); return }

  const horasMensais     = (horasSemana * 52) / 12
  const valorHoraNormal  = salario / horasMensais
  const valorHora50      = valorHoraNormal * 1.5
  const valorHora100     = valorHoraNormal * 2
  const total50          = extras50 * valorHora50
  const total100         = extras100 * valorHora100
  const totalHorasExtras = total50 + total100
  const totalHoras       = extras50 + extras100
  const salarioTotal     = salario + totalHorasExtras

  resultado.value = {
    valorHoraNormal:  valorHoraNormal.toFixed(2),
    valorHora50:      valorHora50.toFixed(2),
    valorHora100:     valorHora100.toFixed(2),
    total50:          total50.toFixed(2),
    total100:         total100.toFixed(2),
    totalHorasExtras: totalHorasExtras.toFixed(2),
    totalHoras:       totalHoras.toFixed(1),
    salarioTotal:     salarioTotal.toFixed(2),
  }
}

function calcularAuto() {
  if (salarioBruto.value && horasSemanais.value) calcular()
}

function limpar() {
  salarioBruto.value = 3000; horasSemanais.value = 44; horasExtras50.value = 10
  horasExtras100.value = 4; resultado.value = null
}

calcularAuto()
watch([salarioBruto, horasSemanais, horasExtras50, horasExtras100], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
