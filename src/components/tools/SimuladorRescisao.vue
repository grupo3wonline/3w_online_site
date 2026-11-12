<template>
  <ToolShell
    title="Simulador de Rescisão Trabalhista"
    description="Calcule as verbas rescisórias CLT para demissão sem justa causa, pedido de demissão ou acordo trabalhista."
    icon="fa-file-contract"
    icon-gradient="from-red-500 to-rose-700"
    orb-color="pink"
    :quick-tips="['Aviso prévio 30+3d/ano', 'FGTS + multa 40%', 'Pagamento em 10 dias']"
    :tips="[
      { title: 'Verbas rescisórias', text: 'Incluem: saldo de salário, 13º proporcional, férias proporcionais + 1/3, aviso prévio e, dependendo do tipo, o FGTS e multa.', type: 'info' },
      { title: 'Aviso prévio proporcional', text: 'O aviso prévio é de 30 dias + 3 dias por ano de empresa, limitado a 90 dias (Lei 12.506/2011).' },
      { title: 'Prazo de pagamento', text: 'O empregador deve pagar as verbas em até 10 dias após o desligamento. O não cumprimento gera multa de 1 salário do funcionário.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Demissão sem justa causa', desc: 'Salário R$ 3.000, 12 meses trabalhados', result: 'Total estimado: ~R$ 9.800 (inclui multa FGTS 40%)' },
      { title: 'Pedido de demissão', desc: 'Salário R$ 4.000, 24 meses trabalhados', result: 'Sem FGTS e seguro-desemprego — ~R$ 6.200' },
      { title: 'Acordo trabalhista', desc: 'Salário R$ 5.000, 36 meses trabalhados', result: '80% FGTS + multa 20% — sem seguro-desemprego' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="salarioBruto"
                label="Salário Bruto (R$)"
                type="number" :min="0" step="100"
                icon="fa-money-bill"
                placeholder="3000"
                tooltip="Salário bruto mensal contratual."
                @input="calcularAuto"
              />
              <BaseInput
                v-model="mesesTrabalhados"
                label="Meses Trabalhados"
                type="number" :min="1"
                icon="fa-calendar-days"
                placeholder="12"
                tooltip="Tempo total de empresa em meses."
                @input="calcularAuto"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="diasAviso"
                label="Dias Aviso Prévio"
                type="number" :min="0" :max="90"
                icon="fa-bell"
                placeholder="30"
                hint="30d + 3d por ano (max 90d)"
                @input="calcularAuto"
              />
              <BaseInput
                v-model="diasFeriasVencidas"
                label="Férias Vencidas (dias)"
                type="number" :min="0" :max="30"
                icon="fa-umbrella-beach"
                placeholder="0"
                hint="Se houver período não tirado"
                @input="calcularAuto"
              />
            </div>

            <!-- Tipo de rescisão -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-file-contract mr-1.5 text-red-500"></i>
                Tipo de Rescisão
              </label>
              <div class="grid grid-cols-1 gap-2 mt-1">
                <button
                  v-for="tipo in tiposRescisao" :key="tipo.value"
                  @click="tipoRescisao = tipo.value; calcularAuto()"
                  :class="['p-3 rounded-xl border-2 text-sm transition-all text-left flex items-start gap-3', tipoRescisao === tipo.value ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-slate-600']"
                >
                  <i :class="['fas', tipo.icon, 'mt-0.5 flex-shrink-0', tipoRescisao === tipo.value ? 'text-red-500' : 'text-gray-400']"></i>
                  <div>
                    <div class="font-bold">{{ tipo.label }}</div>
                    <div class="text-[10px] opacity-70 mt-0.5">{{ tipo.desc }}</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="danger" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular Rescisão
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
              <p class="text-sm text-blue-200 mb-1">Total a Receber na Rescisão</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.totalLiquido }}</p>
              <p class="text-red-300 text-sm font-semibold">
                <i class="fas fa-file-contract mr-1"></i>
                {{ getNomeRescisao() }}
              </p>
            </div>

            <!-- Verbas rescisórias -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-red-500"></i>
                Verbas Rescisórias
              </h4>
              <div class="space-y-2">
                <div
                  v-for="item in resultado.verbas" :key="item.nome"
                  class="flex justify-between items-start py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0 text-sm"
                >
                  <div>
                    <div class="font-semibold text-gray-800 dark:text-slate-200">{{ item.nome }}</div>
                    <div class="text-xs text-gray-500 dark:text-slate-400">{{ item.descricao }}</div>
                  </div>
                  <span class="font-bold text-red-600 dark:text-red-400 ml-2 shrink-0">R$ {{ item.valor }}</span>
                </div>
                <div class="flex justify-between items-center pt-2">
                  <span class="font-black text-gray-900 dark:text-white">Total</span>
                  <span class="font-black text-red-600 dark:text-red-400">R$ {{ resultado.totalLiquido }}</span>
                </div>
              </div>
            </div>

            <!-- Dicas por tipo -->
            <div class="tip-card-warning">
              <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
              <div class="text-xs space-y-1">
                <strong class="block">{{ getDicasRescisao() }}</strong>
                <span v-for="dica in getDicas()" :key="dica" class="block">• {{ dica }}</span>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-file-contract text-4xl mb-3 opacity-30 block text-red-400"></i>
          <p class="text-sm">Preencha os dados para calcular as verbas rescisórias</p>
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

const salarioBruto       = ref(3000)
const mesesTrabalhados   = ref(12)
const diasAviso          = ref(30)
const diasFeriasVencidas = ref(0)
const tipoRescisao       = ref('semJustaCausa')
const resultado          = ref(null)

const tiposRescisao = [
  { value: 'semJustaCausa', label: 'Demissão sem Justa Causa', desc: 'Empresa demite — FGTS + multa 40% + seguro-desemprego', icon: 'fa-building-circle-xmark' },
  { value: 'pedido',        label: 'Pedido de Demissão',       desc: 'Funcionário pede — sem FGTS nem seguro-desemprego',    icon: 'fa-person-walking-arrow-right' },
  { value: 'acordo',        label: 'Acordo Trabalhista',       desc: '80% FGTS + multa 20% — sem seguro-desemprego',         icon: 'fa-handshake' },
]

function getNomeRescisao() {
  return tiposRescisao.find(t => t.value === tipoRescisao.value)?.label || ''
}

function getDicasRescisao() {
  const m = { semJustaCausa: 'Demissão sem Justa Causa:', pedido: 'Pedido de Demissão:', acordo: 'Acordo Trabalhista:' }
  return m[tipoRescisao.value]
}

function getDicas() {
  const d = {
    semJustaCausa: ['Saque de 100% do FGTS', 'Multa de 40% do FGTS pela empresa', 'Direito ao Seguro-Desemprego', 'Pagamento em até 10 dias'],
    pedido:        ['Sem direito ao saque do FGTS', 'Sem multa de 40% do FGTS', 'Sem direito ao Seguro-Desemprego', 'Pode descontar aviso prévio não cumprido'],
    acordo:        ['Saque de 80% do saldo do FGTS', 'Multa de 20% do FGTS (metade)', 'Sem direito ao Seguro-Desemprego', 'Modalidade criada pela Reforma Trabalhista 2017'],
  }
  return d[tipoRescisao.value]
}

function calcular() {
  const salario       = Number(salarioBruto.value)
  const meses         = Number(mesesTrabalhados.value)
  const aviso         = Number(diasAviso.value)
  const feriasVencidas = Number(diasFeriasVencidas.value)

  if (!salario) { Swal.fire({ icon: 'warning', title: 'Informe o salário bruto', confirmButtonColor: '#2563eb' }); return }

  const salarioDia    = salario / 30
  const verbas        = []
  const diasTrabalhados = 15 // simplificado

  verbas.push({ nome: 'Saldo de Salário',           descricao: `${diasTrabalhados} dias trabalhados no mês`,  valor: (salarioDia * diasTrabalhados).toFixed(2) })

  const mesesProporcionais = meses % 12
  verbas.push({ nome: '13º Salário Proporcional',   descricao: `${mesesProporcionais} meses`,                valor: ((salario / 12) * mesesProporcionais).toFixed(2) })
  verbas.push({ nome: 'Férias Proporcionais + 1/3', descricao: `${mesesProporcionais} meses`,                valor: (((salario / 12) * mesesProporcionais) * (4/3)).toFixed(2) })

  if (feriasVencidas > 0) {
    verbas.push({ nome: 'Férias Vencidas + 1/3', descricao: `${feriasVencidas} dias não tirados`, valor: ((salarioDia * feriasVencidas) * (4/3)).toFixed(2) })
  }

  if (tipoRescisao.value !== 'pedido') {
    verbas.push({ nome: 'Aviso Prévio', descricao: `${aviso} dias indenizados`, valor: (salarioDia * aviso).toFixed(2) })
  }

  const saldoFGTS = salario * meses * 0.08
  if (tipoRescisao.value === 'semJustaCausa') {
    verbas.push({ nome: 'Saldo FGTS',   descricao: `${meses} meses de depósitos (8%)`, valor: saldoFGTS.toFixed(2) })
    verbas.push({ nome: 'Multa 40% FGTS', descricao: 'Indenização da empresa',           valor: (saldoFGTS * 0.4).toFixed(2) })
  } else if (tipoRescisao.value === 'acordo') {
    verbas.push({ nome: 'Saque 80% FGTS', descricao: 'Acordo trabalhista',   valor: (saldoFGTS * 0.8).toFixed(2) })
    verbas.push({ nome: 'Multa 20% FGTS', descricao: 'Metade da multa',      valor: (saldoFGTS * 0.2).toFixed(2) })
  }

  const totalLiquido = verbas.reduce((sum, v) => sum + Number(v.valor), 0)
  resultado.value = { verbas, totalLiquido: totalLiquido.toFixed(2) }
}

function calcularAuto() {
  if (salarioBruto.value && mesesTrabalhados.value) calcular()
}

function limpar() {
  salarioBruto.value = 3000; mesesTrabalhados.value = 12; diasAviso.value = 30
  diasFeriasVencidas.value = 0; tipoRescisao.value = 'semJustaCausa'; resultado.value = null
}

calcularAuto()
watch([salarioBruto, mesesTrabalhados, diasAviso, diasFeriasVencidas, tipoRescisao], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
