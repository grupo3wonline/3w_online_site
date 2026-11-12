<template>
  <ToolShell
    title="Simulador de FGTS"
    description="Calcule o saldo projetado do FGTS com depósitos mensais e rendimentos acumulados."
    icon="fa-piggy-bank"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['8% do salário bruto', 'TR + 3% a.a.', 'Saque em situações legais']"
    :tips="[
      { title: 'Depósito mensal', text: 'O empregador deposita 8% do salário bruto no FGTS mensalmente. Domésticos têm alíquota de 7,2%.', type: 'info' },
      { title: 'Rendimento do FGTS', text: 'O FGTS rende 3% ao ano + TR (Taxa Referencial). Em 2025 o FGTS também distribui 50% do lucro para trabalhadores com saldo.' },
      { title: 'Quando sacar', text: 'Saque permitido em: demissão sem justa causa, aposentadoria, compra de imóvel, doenças graves, desastres naturais e aniversário.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Salário R$ 3.000, 2 anos', desc: 'Sem saldo inicial, 24 meses', result: 'Depósito: R$ 240/mês, Saldo projetado ~R$ 5.978' },
      { title: 'Salário R$ 5.000, 5 anos', desc: 'Com saldo inicial de R$ 2.000', result: 'Saldo projetado ~R$ 27.600 (inclui rendimentos)' },
      { title: 'Salário R$ 8.000, 10 anos', desc: 'Sem saldo inicial', result: 'Depósito: R$ 640/mês, Saldo projetado ~R$ 95.000' },
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
              tooltip="Salário bruto mensal. O FGTS é calculado sobre este valor."
              @input="calcularAuto"
            />
            <BaseInput
              v-model="mesesTrabalhados"
              label="Meses a Simular"
              type="number" :min="1" :max="600"
              icon="fa-calendar"
              placeholder="24"
              hint="Quantos meses deseja projetar"
              tooltip="Período de simulação em meses. Ex: 24 = 2 anos."
              @input="calcularAuto"
            />
            <BaseInput
              v-model="saldoAtual"
              label="Saldo Atual FGTS (R$)"
              type="number" :min="0" step="100"
              icon="fa-piggy-bank"
              placeholder="0"
              hint="Informe 0 se não sabe ou não possui"
              tooltip="Saldo já existente na conta do FGTS. Consulte pelo app FGTS ou extrato bancário."
              @input="calcularAuto"
            />
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Simular FGTS
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
              <p class="text-sm text-blue-200 mb-1">Saldo Projetado do FGTS</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.saldoProjetado }}</p>
              <p class="text-emerald-300 text-sm font-semibold">
                <i class="fas fa-trending-up mr-1"></i>
                {{ mesesTrabalhados }} meses · Rendimento: R$ {{ resultado.rendimentos }}
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.depositosMensais }}</div>
                <div class="metric-glass-label">Depósito mensal</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.totalDepositado }}</div>
                <div class="metric-glass-label">Total depositado</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">R$ {{ resultado.rendimentos }}</div>
                <div class="metric-glass-label">Rendimentos</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">R$ {{ resultado.multaFGTS }}</div>
                <div class="metric-glass-label">Multa 40% (demissão)</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-emerald-500"></i>
                Detalhamento
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Saldo inicial</span>
                  <span class="font-bold">R$ {{ saldoAtual }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Total depositado</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.totalDepositado }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Rendimentos (TR + 3% a.a.)</span>
                  <span class="font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.rendimentos }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="font-bold text-gray-900 dark:text-white">Saldo projetado</span>
                  <span class="font-black text-emerald-600 dark:text-emerald-400">R$ {{ resultado.saldoProjetado }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-info-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Em caso de demissão sem justa causa, você recebe o saldo + multa de 40% = <strong>R$ {{ resultado.totalDemissao }}</strong>
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-piggy-bank text-4xl mb-3 opacity-30 block text-emerald-400"></i>
          <p class="text-sm">Informe os dados para simular o saldo do FGTS</p>
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

const salarioBruto     = ref(3000)
const mesesTrabalhados = ref(24)
const saldoAtual       = ref(0)
const resultado        = ref(null)

function calcular() {
  const salario = Number(salarioBruto.value)
  const meses   = Number(mesesTrabalhados.value)
  const saldo   = Number(saldoAtual.value)

  if (!salario) { Swal.fire({ icon: 'warning', title: 'Informe o salário bruto', confirmButtonColor: '#2563eb' }); return }
  if (!meses)   { Swal.fire({ icon: 'warning', title: 'Informe o período de simulação', confirmButtonColor: '#2563eb' }); return }

  const depositoMensal    = salario * 0.08
  const totalDepositado   = depositoMensal * meses
  const rendimentoMensal  = 0.03 / 12

  let saldoFinal = saldo
  for (let i = 0; i < meses; i++) {
    saldoFinal = saldoFinal * (1 + rendimentoMensal) + depositoMensal
  }

  const rendimentos  = saldoFinal - saldo - totalDepositado
  const multa        = saldoFinal * 0.4
  const totalDemissao = saldoFinal + multa

  resultado.value = {
    depositosMensais: depositoMensal.toFixed(2),
    totalDepositado:  totalDepositado.toFixed(2),
    rendimentos:      rendimentos.toFixed(2),
    saldoProjetado:   saldoFinal.toFixed(2),
    multaFGTS:        multa.toFixed(2),
    totalDemissao:    totalDemissao.toFixed(2),
  }
}

function calcularAuto() {
  if (salarioBruto.value && mesesTrabalhados.value) calcular()
}

function limpar() {
  salarioBruto.value = 3000; mesesTrabalhados.value = 24; saldoAtual.value = 0; resultado.value = null
}

calcularAuto()
watch([salarioBruto, mesesTrabalhados, saldoAtual], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
