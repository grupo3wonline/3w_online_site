<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface EventInput {
  vlr_diaria: number
  qtd_pessoas: number
  qtd_pagante: number
  duracao_dias: number
  outras_despesas: number
  n_vezes: number
}

interface EventResult {
  participantes: number; dias: number; valor_diaria: number
  total_estadia: number; total_alimentacao: number; valor_reserva: number
  gastos_adicionais: number; total_geral: number
  pagantes: number; parcelas: number; valor_parcela: number
}

const MEAL_COST = 42.83
const MEALS_PER_DAY = 2
const RESERVE_RATE = 0.11

const form = reactive<EventInput>({
  vlr_diaria: 1500, qtd_pessoas: 40, qtd_pagante: 10, duracao_dias: 5, outras_despesas: 3000, n_vezes: 5,
})

const resultado = ref<EventResult | null>(null)

function calcular() {
  if (form.vlr_diaria < 0 || form.qtd_pessoas < 1 || form.qtd_pagante < 1 || form.duracao_dias < 1) {
    Swal.fire({ icon: 'warning', title: 'Dados inválidos', text: 'Preencha todos os campos corretamente.', confirmButtonColor: '#22c55e' })
    return
  }
  if (form.qtd_pagante > form.qtd_pessoas) {
    Swal.fire({ icon: 'warning', title: 'Pagantes maior que participantes', confirmButtonColor: '#22c55e' })
    return
  }
  const total_estadia = form.vlr_diaria * form.duracao_dias
  const total_alimentacao = form.qtd_pessoas * MEAL_COST * form.duracao_dias * MEALS_PER_DAY
  const subtotal = total_estadia + total_alimentacao + form.outras_despesas
  const valor_reserva = subtotal * RESERVE_RATE
  const total_geral = subtotal + valor_reserva
  const valor_parcela = Math.ceil(total_geral / form.qtd_pagante / form.n_vezes)
  resultado.value = {
    participantes: form.qtd_pessoas, dias: form.duracao_dias, valor_diaria: form.vlr_diaria,
    total_estadia, total_alimentacao, valor_reserva, gastos_adicionais: form.outras_despesas,
    total_geral, pagantes: form.qtd_pagante, parcelas: form.n_vezes, valor_parcela,
  }
  Swal.fire({ icon: 'success', title: 'Orçamento calculado!', timer: 1600, showConfirmButton: false })
}

async function copiar() {
  if (!resultado.value) return
  const r = resultado.value
  const text = [
    'Orçamento do Evento',
    `Participantes: ${r.participantes}`, `Duração: ${r.dias} dia(s)`,
    `Valor diária: ${fmt(r.valor_diaria)}`, `Total estadia: ${fmt(r.total_estadia)}`,
    `Total alimentação: ${fmt(r.total_alimentacao)}`, `Gastos adicionais: ${fmt(r.gastos_adicionais)}`,
    `Reserva (11%): ${fmt(r.valor_reserva)}`, `Total geral: ${fmt(r.total_geral)}`,
    `${r.parcelas}x de ${fmt(r.valor_parcela)} por pagante`,
  ].join('\n')
  try {
    await navigator.clipboard.writeText(text)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1200, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao copiar' })
  }
}

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
function limpar() { resultado.value = null }
</script>

<template>
  <ToolShell

    title="Calculadora de Evento"

    description="Calcule custos totais, divida por convidado e organize o orçamento do seu evento."

    icon="fa-calendar-star"

    icon-gradient="from-pink-500 to-purple-700"

    orb-color="purple"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:calendar-star" class="text-green-400 w-7 h-7" />
        Calculadora de Evento
      </h1>
      <p class="text-blue-200 text-sm">Calcule o custo total do evento e divida entre os participantes</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Formulário -->
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:format-list-bulleted" class="text-green-400 w-5 h-5" />
          Dados do Evento
        </h2>
        <div class="space-y-3">
          <div v-for="field in [
            { key: 'vlr_diaria', label: 'Valor da Diária (R$)', icon: 'mdi:cash', placeholder: '1500' },
            { key: 'duracao_dias', label: 'Duração (dias)', icon: 'mdi:calendar-range', placeholder: '5' },
            { key: 'qtd_pessoas', label: 'Total de Participantes', icon: 'mdi:account-group', placeholder: '40' },
            { key: 'qtd_pagante', label: 'Participantes Pagantes', icon: 'mdi:credit-card-outline', placeholder: '10' },
            { key: 'outras_despesas', label: 'Outras Despesas (R$)', icon: 'mdi:receipt-outline', placeholder: '3000' },
            { key: 'n_vezes', label: 'Número de Parcelas', icon: 'mdi:numeric', placeholder: '5' },
          ]" :key="field.key">
            <label class="text-blue-200 text-xs font-medium block mb-1 flex items-center gap-1">
              <Icon :icon="field.icon" class="w-3.5 h-3.5" />
              {{ field.label }}
            </label>
            <input v-model.number="(form as any)[field.key]" type="number" min="0" :placeholder="field.placeholder" autocomplete="off"
              class="w-full input-aurora" />
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="calcular"
            class="btn-aurora btn-aurora-success flex-1">
            <Icon icon="mdi:calculator" class="w-4 h-4" />
            Calcular Orçamento
          </button>
          <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-lg transition-colors text-sm">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Resultado -->
      <div v-if="resultado" class="glass-panel p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-white font-semibold flex items-center gap-2">
            <Icon icon="mdi:chart-pie" class="text-green-400 w-5 h-5" />
            Resumo do Orçamento
          </h2>
          <button @click="copiar" class="text-blue-300 hover:text-white text-xs flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg transition-colors">
            <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar
          </button>
        </div>

        <!-- Total destaque -->
        <div class="bg-green-900/20 border border-green-500/20 rounded-xl p-5 text-center">
          <div class="text-green-300 text-sm mb-1">Total Geral</div>
          <div class="text-3xl font-black text-green-400">{{ fmt(resultado.total_geral) }}</div>
          <div class="text-blue-200 text-xs mt-2">
            {{ resultado.parcelas }}x de <span class="text-white font-semibold">{{ fmt(resultado.valor_parcela) }}</span> por pagante
          </div>
        </div>

        <!-- Breakdown -->
        <div class="space-y-2">
          <div v-for="(item, i) in [
            { label: 'Hospedagem/Diária', value: fmt(resultado.total_estadia), icon: 'mdi:hotel' },
            { label: 'Alimentação (R$ 42,83/pessoa/refeição)', value: fmt(resultado.total_alimentacao), icon: 'mdi:food' },
            { label: 'Gastos Adicionais', value: fmt(resultado.gastos_adicionais), icon: 'mdi:receipt' },
            { label: 'Reserva de Emergência (11%)', value: fmt(resultado.valor_reserva), icon: 'mdi:shield-check' },
          ]" :key="i" class="flex items-center justify-between text-sm">
            <span class="text-blue-200 flex items-center gap-1.5">
              <Icon :icon="item.icon" class="w-3.5 h-3.5 text-blue-400" />
              {{ item.label }}
            </span>
            <span class="text-white font-medium">{{ item.value }}</span>
          </div>
        </div>

        <!-- Info -->
        <div class="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
          <div class="text-blue-200 text-xs flex items-start gap-2">
            <Icon icon="mdi:information-outline" class="w-4 h-4 mt-0.5 shrink-0" />
            Divisão entre <strong class="text-white">{{ resultado.pagantes }} pagantes</strong> em <strong class="text-white">{{ resultado.parcelas }}x</strong> de <strong class="text-white">{{ fmt(resultado.valor_parcela) }}</strong>
          </div>
        </div>
      </div>
      <div v-else class="glass-panel flex items-center justify-center p-12">
        <div class="text-center">
          <Icon icon="mdi:calendar-clock" class="w-16 h-16 text-green-400/20 mx-auto mb-3" />
          <p class="text-blue-200 text-sm">Preencha os dados e calcule o orçamento</p>
        </div>
      </div>
    </div>
  


  </ToolShell></template>