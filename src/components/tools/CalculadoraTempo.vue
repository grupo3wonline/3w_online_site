<template>
  <ToolShell
    title="Calculadora de Tempo"
    description="Calcule a diferença entre datas, some ou subtraia períodos e conte dias úteis."
    icon="fa-clock"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['Diferença entre datas', 'Adicionar/subtrair', 'Dias úteis']"
    :tips="[
      { title: 'Anos bissextos', text: 'Fevereiro tem 29 dias em anos divisíveis por 4 (exceto séculos não divisíveis por 400).' },
      { title: 'Dias úteis', text: 'O cálculo de dias úteis considera segunda a sexta-feira. Feriados não são descontados automaticamente.', type: 'info' },
      { title: 'Prazos contratuais', text: 'Para contratos, verifique se o prazo é em dias corridos ou úteis — a diferença pode ser grande.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Prazo de projeto', desc: 'Início 01/01/2024 — Fim 31/03/2024', result: '90 dias corridos · 65 dias úteis' },
      { title: 'Data de vencimento', desc: 'Hoje + 90 dias', result: 'Data exata e dia da semana' },
      { title: 'Idade de contrato', desc: 'Assinatura há 2 anos e 7 meses', result: 'Total em dias, horas e minutos' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <!-- Seleção de modo -->
          <div class="mb-4">
            <label class="input-aurora-label">
              <i class="fas fa-sliders-h mr-1.5 text-purple-500"></i>
              Modo de Cálculo
            </label>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <button
                @click="modo = 'diferenca'; resultado = null"
                :class="['p-3 rounded-xl border-2 transition-all text-center', modo === 'diferenca' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-md' : 'border-gray-200 dark:border-slate-700 hover:border-purple-300']"
              >
                <i :class="['fas fa-arrows-alt-h text-xl mb-1 block', modo === 'diferenca' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400']"></i>
                <span :class="['text-xs font-medium', modo === 'diferenca' ? 'text-purple-900 dark:text-purple-300' : 'text-gray-500']">Diferença entre Datas</span>
              </button>
              <button
                @click="modo = 'adicionar'; resultado = null"
                :class="['p-3 rounded-xl border-2 transition-all text-center', modo === 'adicionar' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-md' : 'border-gray-200 dark:border-slate-700 hover:border-purple-300']"
              >
                <i :class="['fas fa-calendar-plus text-xl mb-1 block', modo === 'adicionar' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400']"></i>
                <span :class="['text-xs font-medium', modo === 'adicionar' ? 'text-purple-900 dark:text-purple-300' : 'text-gray-500']">Adicionar / Subtrair</span>
              </button>
            </div>
          </div>

          <!-- Diferença -->
          <div v-if="modo === 'diferenca'" class="glass-panel p-4 space-y-3">
            <BaseInput v-model="dataInicio" label="Data Inicial" type="date" icon="fa-calendar-day" tooltip="Data de início do intervalo." />
            <BaseInput v-model="dataFim"    label="Data Final"   type="date" icon="fa-calendar-check" tooltip="Data final do intervalo." />
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="considerarDiasUteis" class="checkbox-aurora" />
              <span class="text-sm text-gray-700 dark:text-slate-300">Contar apenas dias úteis (seg–sex)</span>
            </label>
          </div>

          <!-- Adicionar/Subtrair -->
          <div v-else class="glass-panel p-4 space-y-3">
            <BaseInput v-model="dataBase" label="Data Base" type="date" icon="fa-calendar" tooltip="Data de partida para o cálculo." />
            <div class="grid grid-cols-2 gap-3">
              <BaseInput v-model="anosAdd"  label="Anos"  type="number" icon="fa-calendar-alt" />
              <BaseInput v-model="mesesAdd" label="Meses" type="number" icon="fa-calendar" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <BaseInput v-model="diasAdd"  label="Dias"  type="number" icon="fa-calendar-day" />
              <BaseInput v-model="horasAdd" label="Horas" type="number" icon="fa-clock" />
            </div>
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-exchange-alt mr-1.5 text-purple-500"></i>
                Operação
              </label>
              <div class="grid grid-cols-2 gap-2 mt-1">
                <button @click="operacao = 'adicionar'" :class="['py-2 px-3 rounded-xl border-2 text-sm font-medium transition-all', operacao === 'adicionar' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'border-gray-200 dark:border-slate-700']">
                  <i class="fas fa-plus mr-1"></i>Adicionar
                </button>
                <button @click="operacao = 'subtrair'" :class="['py-2 px-3 rounded-xl border-2 text-sm font-medium transition-all', operacao === 'subtrair' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'border-gray-200 dark:border-slate-700']">
                  <i class="fas fa-minus mr-1"></i>Subtrair
                </button>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">
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
            <!-- Destaque -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ resultado.titulo }}</p>
              <p class="text-4xl font-black text-white mb-2">{{ resultado.principal }}</p>
              <p class="text-purple-300 text-sm">{{ resultado.subtitulo }}</p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="(metrica, idx) in resultado.metricas"
                :key="idx"
                class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900"
              >
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ metrica.valor }}</div>
                <div class="metric-glass-label">{{ metrica.label }}</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-purple-500"></i>
                Detalhamento
              </h4>
              <div class="space-y-2 text-sm">
                <div
                  v-for="(detalhe, idx) in resultado.detalhes"
                  :key="idx"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0"
                >
                  <span class="text-gray-600 dark:text-slate-400">{{ detalhe.label }}</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ detalhe.valor }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-purple-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Dias úteis desconsideram sábados e domingos. Feriados nacionais não são deduzidos automaticamente.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-clock text-4xl mb-3 opacity-30 block text-purple-400"></i>
          <p class="text-sm">Selecione o modo e informe as datas</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const modo  = ref('diferenca')
const dataInicio = ref(new Date().toISOString().split('T')[0])
const dataFim    = ref(new Date(Date.now() + 30 * 864e5).toISOString().split('T')[0])
const considerarDiasUteis = ref(false)
const dataBase  = ref(new Date().toISOString().split('T')[0])
const anosAdd   = ref(0)
const mesesAdd  = ref(1)
const diasAdd   = ref(0)
const horasAdd  = ref(0)
const operacao  = ref('adicionar')
const resultado = ref(null)

const fmtData = (d) => d.toLocaleDateString('pt-BR')

const calcularDiasUteis = (inicio, fim) => {
  let count = 0
  const cur = new Date(inicio)
  while (cur <= fim) { const d = cur.getDay(); if (d !== 0 && d !== 6) count++; cur.setDate(cur.getDate() + 1) }
  return count
}

const calcular = () => {
  if (modo.value === 'diferenca') {
    if (!dataInicio.value || !dataFim.value) { Swal.fire({ icon: 'error', title: 'Preencha as duas datas', confirmButtonColor: '#2563eb' }); return }
    const inicio = new Date(dataInicio.value + 'T00:00:00')
    const fim    = new Date(dataFim.value    + 'T00:00:00')
    if (fim < inicio) { Swal.fire({ icon: 'error', title: 'Data final deve ser posterior', confirmButtonColor: '#2563eb' }); return }

    const ms       = fim - inicio
    const dias     = Math.floor(ms / 864e5)
    const horas    = Math.floor(ms / 36e5)
    const minutos  = Math.floor(ms / 6e4)
    const anos     = Math.floor(dias / 365)
    const meses    = Math.floor((dias % 365) / 30)
    const diasR    = dias % 30
    const uteis    = considerarDiasUteis.value ? calcularDiasUteis(inicio, fim) : null

    resultado.value = {
      titulo: 'Diferença Total',
      principal: `${dias} dias`,
      subtitulo: `${anos} ano(s), ${meses} mês(es) e ${diasR} dia(s)`,
      metricas: [
        { label: 'Anos',    valor: anos },
        { label: 'Meses',   valor: Math.floor(dias / 30) },
        { label: 'Semanas', valor: Math.floor(dias / 7) },
        { label: 'Dias',    valor: dias },
      ],
      detalhes: [
        { label: 'Data inicial',    valor: fmtData(inicio) },
        { label: 'Data final',      valor: fmtData(fim) },
        { label: 'Total em horas',  valor: horas.toLocaleString('pt-BR') },
        { label: 'Total em minutos', valor: minutos.toLocaleString('pt-BR') },
        ...(uteis !== null ? [{ label: 'Dias úteis', valor: uteis }] : []),
      ],
    }
  } else {
    if (!dataBase.value) { Swal.fire({ icon: 'error', title: 'Informe a data base', confirmButtonColor: '#2563eb' }); return }
    const base  = new Date(dataBase.value + 'T00:00:00')
    const nova  = new Date(base)
    const mult  = operacao.value === 'adicionar' ? 1 : -1
    nova.setFullYear(nova.getFullYear() + Number(anosAdd.value)  * mult)
    nova.setMonth(nova.getMonth()       + Number(mesesAdd.value) * mult)
    nova.setDate(nova.getDate()         + Number(diasAdd.value)  * mult)
    nova.setHours(nova.getHours()       + Number(horasAdd.value) * mult)

    const dias = Math.floor(Math.abs(nova - base) / 864e5)
    const diasDaSemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']

    resultado.value = {
      titulo: 'Nova Data',
      principal: fmtData(nova),
      subtitulo: `${operacao.value === 'adicionar' ? 'Somado' : 'Subtraído'}: ${anosAdd.value}a ${mesesAdd.value}m ${diasAdd.value}d ${horasAdd.value}h`,
      metricas: [
        { label: 'Dia da semana', valor: diasDaSemana[nova.getDay()] },
        { label: 'Dias de diff',  valor: dias },
        { label: 'Semanas',       valor: Math.floor(dias / 7) },
        { label: 'Ano',           valor: nova.getFullYear() },
      ],
      detalhes: [
        { label: 'Data base',      valor: fmtData(base) },
        { label: 'Nova data',      valor: fmtData(nova) },
        { label: 'Operação',       valor: operacao.value === 'adicionar' ? 'Adição' : 'Subtração' },
        { label: 'Diferença total', valor: `${dias} dias` },
      ],
    }
  }
}

const limpar = () => {
  dataInicio.value = new Date().toISOString().split('T')[0]
  dataFim.value    = new Date(Date.now() + 30 * 864e5).toISOString().split('T')[0]
  considerarDiasUteis.value = false
  dataBase.value = new Date().toISOString().split('T')[0]
  anosAdd.value = 0; mesesAdd.value = 1; diasAdd.value = 0; horasAdd.value = 0
  operacao.value = 'adicionar'; resultado.value = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
