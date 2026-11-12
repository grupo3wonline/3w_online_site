<template>
  <ToolShell
    title="Simulador de Dívidas"
    description="Planeje a quitação de múltiplas dívidas com as estratégias Avalanche (menor custo) e Bola de Neve (maior motivação)."
    icon="fa-hand-holding-dollar"
    icon-gradient="from-orange-500 to-red-700"
    orb-color="pink"
    :quick-tips="['Estratégia Avalanche e Bola de Neve', 'Múltiplas dívidas simultâneas', 'Plano de quitação ordenado']"
    :tips="[
      { title: 'Avalanche — economiza mais', text: 'Prioriza a dívida com maior taxa de juros. Matematicamente superior: você paga menos juros no total.', type: 'info' },
      { title: 'Bola de Neve — mais motivador', text: 'Prioriza a menor dívida. Quitações rápidas geram senso de conquista que ajuda a manter a disciplina.', type: 'info' },
      { title: 'Evite novas dívidas', text: 'Corte gastos supérfluos durante o plano de quitação. Use 13º, férias e rendas extras para acelerar.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Cartão + Empréstimo', desc: 'Cartão R$ 5k (10%/mês) + Empréstimo R$ 10k (3%/mês) | R$ 2k/mês', result: 'Avalanche: quita cartão primeiro (juros maiores)' },
      { title: 'Bola de Neve', desc: '3 dívidas: R$ 2k, R$ 5k, R$ 10k | R$ 1.5k/mês', result: 'Quita a menor primeiro — vitórias rápidas motivam' },
      { title: 'Renegociação', text: 'Reduza a taxa do cheque especial (8%/mês → 2%/mês)', result: 'Economia de centenas de reais em juros mensais', desc: '' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Estratégia -->
          <div>
            <label class="input-aurora-label mb-2">
              <i class="fas fa-chess mr-1.5 text-orange-500"></i>
              Estratégia de Pagamento
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="estrategia = 'bola-neve'"
                :class="['p-3 rounded-xl border-2 transition-all text-left', estrategia === 'bola-neve' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-orange-300']"
              >
                <i class="fas fa-snowflake text-orange-600 dark:text-orange-400 text-xl mb-1 block"></i>
                <div class="font-bold text-sm text-gray-900 dark:text-white">Bola de Neve</div>
                <div class="text-xs text-gray-500 dark:text-slate-400">Menor saldo primeiro</div>
              </button>
              <button
                @click="estrategia = 'avalanche'"
                :class="['p-3 rounded-xl border-2 transition-all text-left', estrategia === 'avalanche' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-red-300']"
              >
                <i class="fas fa-mountain text-red-600 dark:text-red-400 text-xl mb-1 block"></i>
                <div class="font-bold text-sm text-gray-900 dark:text-white">Avalanche</div>
                <div class="text-xs text-gray-500 dark:text-slate-400">Maior juros primeiro</div>
              </button>
            </div>
          </div>

          <!-- Lista de dívidas -->
          <div class="glass-panel p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                <i class="fas fa-list text-orange-500"></i>Minhas Dívidas
              </h4>
              <BaseButton variant="warning" icon="fa-plus" size="xs" @click="adicionarDivida">Adicionar</BaseButton>
            </div>

            <div v-if="dividas.length === 0" class="text-center py-6 text-gray-400 dark:text-slate-500 text-sm">
              <i class="fas fa-plus-circle text-2xl mb-2 block opacity-30"></i>
              Nenhuma dívida adicionada
            </div>

            <div v-else class="space-y-3 max-h-72 overflow-y-auto pr-1">
              <div v-for="(divida, index) in dividas" :key="index" class="p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                <div class="grid grid-cols-2 gap-2 mb-2">
                  <input v-model="divida.nome" placeholder="Nome da dívida" class="input-aurora text-sm col-span-2" />
                  <input v-model="divida.saldo" type="number" placeholder="Saldo (R$)" class="input-aurora text-sm" />
                  <input v-model="divida.juros" type="number" step="0.1" placeholder="Juros % a.m." class="input-aurora text-sm" />
                </div>
                <div class="flex gap-2">
                  <input v-model="divida.parcelaMin" type="number" placeholder="Parcela mínima" class="input-aurora text-sm flex-1" />
                  <button @click="removerDivida(index)"
                    class="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 transition-colors flex-shrink-0">
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <BaseInput
            v-model="valorMensal"
            label="Valor Mensal Disponível (R$)"
            type="number"
            :min="0"
            step="100"
            icon="fa-wallet"
            tooltip="Quanto você pode destinar mensalmente para quitar dívidas."
          />

          <div class="flex gap-3">
            <BaseButton variant="danger" icon="fa-calculator" @click="calcular" :disabled="dividas.length === 0" class="flex-1">Calcular Plano</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="resultado = null">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Tempo para quitar todas</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.meses }}</p>
              <p class="text-orange-300 text-sm font-semibold">
                <i class="fas fa-calendar-alt mr-1"></i>meses ({{ resultado.anos }} anos) — {{ estrategia === 'bola-neve' ? 'Bola de Neve' : 'Avalanche' }}
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ fmtBRL(resultado.totalDividas) }}</div>
                <div class="metric-glass-label">Total Dívidas</div>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-600 dark:text-red-400">{{ fmtBRL(resultado.totalJuros) }}</div>
                <div class="metric-glass-label">Total Juros</div>
              </div>
              <div class="metric-glass ring-1 ring-pink-100 dark:ring-pink-900">
                <div class="metric-glass-value text-pink-600 dark:text-pink-400">{{ fmtBRL(resultado.totalPagar) }}</div>
                <div class="metric-glass-label">Total a Pagar</div>
              </div>
            </div>

            <!-- Ordem de pagamento -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-sort-amount-down text-orange-500"></i>
                Ordem de Pagamento ({{ estrategia === 'bola-neve' ? 'Bola de Neve' : 'Avalanche' }})
              </h4>
              <div class="space-y-2">
                <div v-for="(ordem, index) in resultado.ordem" :key="index"
                  class="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">
                      {{ index + 1 }}
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900 dark:text-white text-sm">{{ ordem.nome }}</div>
                      <div class="text-xs text-gray-500 dark:text-slate-400">
                        R$ {{ ordem.saldo }} • {{ ordem.juros }}% a.m.
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-orange-600 dark:text-orange-400 text-sm">{{ ordem.mesesQuitacao }} meses</div>
                    <div class="text-xs text-gray-500">para quitar</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-lightbulb text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Dica: Use bônus, 13º e rendas extras para pagamentos adicionais e reduza ainda mais o prazo e os juros.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-hand-holding-dollar text-4xl mb-3 opacity-30 block text-orange-400"></i>
          <p class="text-sm">Adicione suas dívidas e calcule o plano de quitação</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

interface Divida { nome: string; saldo: number; juros: number; parcelaMin: number }
interface ResultadoDivida {
  meses: number; anos: string; totalDividas: number; totalJuros: number; totalPagar: number
  ordem: { nome: string; saldo: string; juros: string; mesesQuitacao: number }[]
}

const estrategia   = ref<'bola-neve' | 'avalanche'>('bola-neve')
const valorMensal  = ref<number | ''>(2000)
const dividas      = ref<Divida[]>([
  { nome: 'Cartão de Crédito',  saldo: 5000,  juros: 10, parcelaMin: 250 },
  { nome: 'Empréstimo Pessoal', saldo: 10000, juros: 3,  parcelaMin: 500 },
  { nome: 'Cheque Especial',    saldo: 2000,  juros: 8,  parcelaMin: 200 },
])
const resultado = ref<ResultadoDivida | null>(null)

const fmtBRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const adicionarDivida = () => {
  dividas.value.push({ nome: `Dívida ${dividas.value.length + 1}`, saldo: 0, juros: 0, parcelaMin: 0 })
}

const removerDivida = (index: number) => { dividas.value.splice(index, 1) }

const calcular = () => {
  const disponivel = Number(valorMensal.value) || 0
  const lista = dividas.value.map(d => ({ nome: d.nome, saldo: Number(d.saldo), juros: Number(d.juros) / 100, parcelaMin: Number(d.parcelaMin) }))
  const totalDividas = lista.reduce((s, d) => s + d.saldo, 0)

  const ordenadas = [...lista].sort((a, b) => estrategia.value === 'bola-neve' ? a.saldo - b.saldo : b.juros - a.juros)

  let mesesTotal = 0; let totalJuros = 0
  const ordemPag: ResultadoDivida['ordem'] = []

  ordenadas.forEach((divida, idx) => {
    let saldo = divida.saldo; let meses = 0; let jurosAcum = 0
    while (saldo > 0 && meses < 600) {
      const jm = saldo * divida.juros
      jurosAcum += jm
      const pag = idx === 0 ? disponivel : divida.parcelaMin
      const cap = pag - jm
      if (cap <= 0) break
      saldo -= cap; meses++
    }
    totalJuros += jurosAcum
    mesesTotal  = Math.max(mesesTotal, meses)
    ordemPag.push({ nome: divida.nome, saldo: divida.saldo.toFixed(2), juros: (divida.juros * 100).toFixed(1), mesesQuitacao: meses })
  })

  resultado.value = {
    meses: mesesTotal, anos: (mesesTotal / 12).toFixed(1),
    totalDividas, totalJuros, totalPagar: totalDividas + totalJuros, ordem: ordemPag,
  }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
